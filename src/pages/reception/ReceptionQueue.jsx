import { useState } from 'react';
import { FaTicketAlt, FaPhone, FaForward, FaUndo, FaStepForward, FaCheck } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import SearchBar from '../../components/SearchBar';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapQueue } from '../../services/amhApi';

export default function ReceptionQueue() {
  const { data: queues, loading, error, refetch } = useFetch(() => amhApi.getQueues().then((q) => q.map(mapQueue)));
  const { data: patients } = useFetch(() => amhApi.getPatients());
  const { data: departments } = useFetch(() => amhApi.getDepartments());
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenForm, setTokenForm] = useState({ patient_id: '', queue_id: '' });
  const [generatedToken, setGeneratedToken] = useState(null);

  const active = selectedQueue || queues?.[0];
  const searchResults = searchQuery
    ? patients?.filter((p) => [p.nic, p.patient_code, p.mobile, p.name].some((v) => String(v).toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    try {
      const queueId = tokenForm.queue_id || active?.id;
      const result = await amhApi.generateToken({ queue_id: queueId, patient_id: tokenForm.patient_id });
      setGeneratedToken({ token: result.token?.token_display, department: result.department, position: result.queuePosition });
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCallNext = async () => {
    if (!active) return;
    try {
      await amhApi.callNext(active.id);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Queue Management" subtitle="Generate tokens and control patient queues" />
      <PageLoader loading={loading} error={error}>
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Queue Control - {active?.department || 'Select a queue'}</h2>
            <div className="flex items-center justify-center p-8 bg-primary-50 rounded-xl mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Now Serving</p>
                <p className="text-6xl font-bold text-primary-700">{active?.currentToken || '—'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onClick={handleCallNext} className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"><FaForward /> Call Next</button>
              <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl"><FaUndo /> Recall</button>
              <button className="flex items-center justify-center gap-2 py-3 bg-orange-600 text-white text-sm font-semibold rounded-xl"><FaStepForward /> Skip</button>
              <button className="flex items-center justify-center gap-2 py-3 bg-primary-600 text-white text-sm font-semibold rounded-xl"><FaCheck /> Complete</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Generate Token</h3>
              <button onClick={() => setShowTokenModal(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700">
                <FaTicketAlt /> Generate Token
              </button>
              {generatedToken && (
                <div className="mt-4 p-4 bg-teal-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-teal-700">{generatedToken.token}</p>
                  <p className="text-sm text-gray-600 mt-1">{generatedToken.department}</p>
                  <p className="text-xs text-gray-400">Queue Position: #{generatedToken.position}</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Search Patient</h3>
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="NIC / ID / Mobile" />
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((p) => (
                    <div key={p.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-gray-500 text-xs">{p.patient_code} · {p.nic}</p>
                      <p className="text-gray-400 text-xs flex items-center gap-1"><FaPhone className="text-[10px]" /> {p.mobile}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <h2 className="font-semibold text-gray-900 mb-4">All Active Queues</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {queues?.map((q) => (
            <button key={q.id} onClick={() => setSelectedQueue(q)}
              className={`text-left p-5 rounded-xl border transition-all ${active?.id === q.id ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-gray-100 bg-white hover:shadow-md'}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{q.department}</h3>
                <Badge variant="active">{q.status}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary-700">{q.currentToken}</p>
              <p className="text-xs text-gray-500 mt-1">{q.totalWaiting} waiting · {q.avgWaitTime}m avg</p>
            </button>
          ))}
        </div>
      </PageLoader>

      <Modal isOpen={showTokenModal} onClose={() => setShowTokenModal(false)} title="Generate Queue Token">
        <form onSubmit={handleGenerateToken} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select value={tokenForm.patient_id} onChange={(e) => setTokenForm({ ...tokenForm, patient_id: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Patient</option>
              {patients?.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.patient_code})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Queue / Department</label>
            <select value={tokenForm.queue_id || active?.id || ''} onChange={(e) => setTokenForm({ ...tokenForm, queue_id: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              {queues?.map((q) => <option key={q.id} value={q.id}>{q.department}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Generate</button>
        </form>
      </Modal>
    </div>
  );
}
