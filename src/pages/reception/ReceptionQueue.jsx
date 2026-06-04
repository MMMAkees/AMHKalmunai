import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { queues } from '../../data/queues';
import { patients } from '../../data/patients';
import { departments } from '../../data/departments';
import { FaTicketAlt, FaPhone, FaForward, FaUndo, FaStepForward, FaCheck } from 'react-icons/fa';

export default function ReceptionQueue() {
  const [selectedQueue, setSelectedQueue] = useState(queues[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenForm, setTokenForm] = useState({ patientId: '', department: '' });
  const [generatedToken, setGeneratedToken] = useState(null);

  const searchResults = searchQuery
    ? patients.filter((p) =>
        [p.nic, p.id, p.mobile, p.name].some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleGenerateToken = (e) => {
    e.preventDefault();
    const dept = departments.find((d) => d.id === tokenForm.department);
    setGeneratedToken({
      token: `${dept?.code?.charAt(0) || 'A'}${Math.floor(Math.random() * 100 + 130)}`,
      department: dept?.name,
      position: Math.floor(Math.random() * 20 + 5),
    });
  };

  return (
    <div>
      <PageHeader title="Queue Management" subtitle="Generate tokens and control patient queues" />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Queue Control - {selectedQueue.department}</h2>
          <div className="flex items-center justify-center p-8 bg-primary-50 rounded-xl mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Now Serving</p>
              <p className="text-6xl font-bold text-primary-700">{selectedQueue.currentToken}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Call Next', icon: FaForward, color: 'bg-green-600 hover:bg-green-700' },
              { label: 'Recall', icon: FaUndo, color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'Skip', icon: FaStepForward, color: 'bg-orange-600 hover:bg-orange-700' },
              { label: 'Complete', icon: FaCheck, color: 'bg-primary-600 hover:bg-primary-700' },
            ].map((btn) => (
              <button key={btn.label} className={`flex items-center justify-center gap-2 py-3 text-white text-sm font-semibold rounded-xl ${btn.color} transition-colors`}>
                <btn.icon /> {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Generate Token</h3>
            <button onClick={() => setShowTokenModal(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors">
              <FaTicketAlt /> Generate Token
            </button>
            {generatedToken && (
              <div className="mt-4 p-4 bg-teal-50 rounded-xl text-center">
                <p className="text-sm text-gray-500">Token Generated</p>
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
                    <p className="text-gray-500 text-xs">{p.id} &middot; {p.nic}</p>
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
        {queues.map((q) => (
          <button
            key={q.id}
            onClick={() => setSelectedQueue(q)}
            className={`text-left p-5 rounded-xl border transition-all ${
              selectedQueue.id === q.id ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-gray-100 bg-white hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{q.department}</h3>
              <Badge variant="active">{q.status}</Badge>
            </div>
            <p className="text-2xl font-bold text-primary-700">{q.currentToken}</p>
            <p className="text-xs text-gray-500 mt-1">{q.totalWaiting} waiting &middot; {q.avgWaitTime}m avg</p>
          </button>
        ))}
      </div>

      <Modal isOpen={showTokenModal} onClose={() => setShowTokenModal(false)} title="Generate Queue Token">
        <form onSubmit={handleGenerateToken} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select value={tokenForm.patientId} onChange={(e) => setTokenForm({ ...tokenForm, patientId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select value={tokenForm.department} onChange={(e) => setTokenForm({ ...tokenForm, department: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Generate</button>
        </form>
      </Modal>
    </div>
  );
}
