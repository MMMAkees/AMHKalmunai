import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHospital, FaUser, FaUserMd, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../services/auth';
import { roleDashboardPaths } from '../../routes/menuConfig';

const roles = [
  { id: 'patient', label: 'Patient', icon: FaUser, color: 'border-blue-400 bg-blue-50 text-blue-700' },
  { id: 'reception', label: 'Receptionist', icon: FaUserShield, color: 'border-purple-400 bg-purple-50 text-purple-700' },
  { id: 'doctor', label: 'Doctor', icon: FaUserMd, color: 'border-green-400 bg-green-50 text-green-700' },
  { id: 'admin', label: 'Admin', icon: FaUserShield, color: 'border-red-400 bg-red-50 text-red-700' },
];

export default function LoginPage() {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState(demoCredentials.patient.email);
  const [password, setPassword] = useState(demoCredentials.patient.password);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (r) => {
    setRole(r);
    setEmail(demoCredentials[r]?.email || '');
    setPassword(demoCredentials[r]?.password || '');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password, role);
    if (result.success) {
      navigate(roleDashboardPaths[role]);
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FaHospital className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">AMH Login Portal</h1>
          <p className="text-blue-200 text-sm mt-1">Smart Patient Flow & Queue Management</p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl">
          <p className="text-sm font-medium text-gray-600 mb-3">Select Role</p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  role === r.id ? r.color + ' border-current shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <r.icon /> {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 bg-white/80" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 bg-white/80" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 shadow-md disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">Connected to Laragon MySQL API — demo credentials auto-fill</p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to="/" className="text-primary-600 hover:underline">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
