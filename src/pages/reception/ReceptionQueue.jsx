import { useState, useEffect, useCallback } from 'react';
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
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenForm, setTokenForm] = useState({ patient_id: '', queue_id: '' });
  const [generatedToken, setGeneratedToken] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [actionLoading, setActionLoading] = useState('');

  const active = selectedQueue || queues?.[0];

  // Fetch tokens for the active queue
  const fetchTokens = useCallback(async () => {
    if (!active?.id) return;
    try {
      const data = await amhApi.getQueueTokens(active.id);
      setTokens(data || []);
    } catch {
      setTokens([]);
    }
  }, [active?.id]);

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

  const refreshAll = async () => {
    await refetch();
    await fetchTokens();
  };

  const searchResults = searchQuery
    ? patients?.filter((p) => [p.nic, p.patient_code, p.mobile, p.name].some((v) => String(v).toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  // Find the current token being served (Called or In Consultation)
  const currentToken = tokens.find((t) => t.status === 'Called' || t.status === 'In Consultation');
  // Find the last skipped token for recall
  const lastSkipped = [...tokens].reverse().find((t) => t.status === 'Skipped');

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    try {
      const queueId = tokenForm.queue_id || active?.id;
      const result = await amhApi.generateToken({ queue_id: queueId, patient_id: tokenForm.patient_id });
      setGeneratedToken({ token: result.token?.token_display, department: result.department, position: result.queuePosition });
      await refreshAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCallNext = async () => {
    if (!active) return;
    setActionLoading('call');
    try {
      await amhApi.callNext(active.id);
      await refreshAll();
    } catch (err) {
      alert(err.message);
    }
    setActionLoading('');
  };

  const handleUpdateTokenStatus = async (tokenId, status, actionName) => {
    if (!tokenId) {
      alert(`No token available to ${actionName}`);
      return;
    }
    setActionLoading(actionName);
    try {
      await amhApi.updateTokenStatus(tokenId, status);
      await refreshAll();
    } catch (err) {
      alert(err.message);
    }
    setActionLoading('');
  };

  const handleRecall = () => {
    if (lastSkipped) {
      handleUpdateTokenStatus(lastSkipped.id, 'Recalled', 'recall');
    } else {
      alert('No skipped patients to recall');
    }
  };

  const handleSkip = () => {
    if (currentToken) {
      handleUpdateTokenStatus(currentToken.id, 'Skipped', 'skip');
    } else {
      alert('No current patient to skip');
    }
  };

  const handleComplete = () => {
    if (currentToken) {
      handleUpdateTokenStatus(currentToken.id, 'Completed', 'complete');
    } else {
      alert('No current patient to complete');
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
                {currentToken && (
                  <p className="text-sm text-gray-500 mt-2">{currentToken.patientName || currentToken.patientId}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onClick={handleCallNext} disabled={actionLoading === 'call'}
                className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60 transition-colors">
                <FaForward /> {actionLoading === 'call' ? '...' : 'Call Next'}
              </button>
              <button onClick={handleRecall} disabled={actionLoading === 'recall'}
                className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60 transition-colors">
                <FaUndo /> {actionLoading === 'recall' ? '...' : 'Recall'}
              </button>
              <button onClick={handleSkip} disabled={actionLoading === 'skip'}
                className="flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60 transition-colors">
                <FaStepForward /> {actionLoading === 'skip' ? '...' : 'Skip'}
              </button>
              <button onClick={handleComplete} disabled={actionLoading === 'complete'}
                className="flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60 transition-colors">
                <FaCheck /> {actionLoading === 'complete' ? '...' : 'Complete'}
              </button>
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

        {/* Token List for active queue */}
        {tokens.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Queue Tokens — {active?.department}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Token</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Wait Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((t) => (
                    <tr key={t.id} className={`border-b border-gray-50 ${t.status === 'Called' || t.status === 'In Consultation' ? 'bg-blue-50' : ''}`}>
                      <td className="py-3 px-4 font-mono font-bold text-primary-600">{t.token_display}</td>
                      <td className="py-3 px-4">{t.patientName || t.patientId}</td>
                      <td className="py-3 px-4">{t.wait_time} min</td>
                      <td className="py-3 px-4"><Badge variant={t.status?.toLowerCase()}>{t.status}</Badge></td>
                      <td className="py-3 px-4">
                        {t.status !== 'Completed' && (
                          <div className="flex gap-1">
                            {(t.status === 'Called' || t.status === 'In Consultation') && (
                              <>
                                <button onClick={() => handleUpdateTokenStatus(t.id, 'Completed', 'complete')}
                                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium">Complete</button>
                                <button onClick={() => handleUpdateTokenStatus(t.id, 'Skipped', 'skip')}
                                  className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 font-medium">Skip</button>
                              </>
                            )}
                            {t.status === 'Skipped' && (
                              <button onClick={() => handleUpdateTokenStatus(t.id, 'Recalled', 'recall')}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium">Recall</button>
                            )}
                            {t.status === 'Waiting' && (
                              <span className="text-xs text-gray-400">Waiting...</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <h2 className="font-semibold text-gray-900 mb-4">All Active Queues</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {queues?.map((q) => (
            <button key={q.id} onClick={() => { setSelectedQueue(q); }}
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

