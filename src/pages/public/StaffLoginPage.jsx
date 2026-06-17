import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHospital, FaUserMd, FaUserShield, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../services/auth';
import { roleDashboardPaths } from '../../routes/menuConfig';
import loginHero from '../../assets/login_hero.png';

const roles = [
  { id: 'reception', label: 'Receptionist', icon: FaUserShield, color: 'border-purple-400 bg-purple-50 text-purple-700' },
  { id: 'doctor', label: 'Doctor', icon: FaUserMd, color: 'border-green-400 bg-green-50 text-green-700' },
  { id: 'admin', label: 'Admin', icon: FaUserShield, color: 'border-red-400 bg-red-50 text-red-700' },
];

export default function StaffLoginPage() {
  const [role, setRole] = useState('reception');
  const [email, setEmail] = useState(demoCredentials.reception.email);
  const [password, setPassword] = useState(demoCredentials.reception.password);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password / View states
  const [view, setView] = useState('login'); // 'login' | 'forgot' | 'reset-success'
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthMessage = async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.source === 'google-mock-auth' && event.data.status === 'success') {
        const { email, role: authRole } = event.data.user;
        const targetRole = authRole || role;
        setLoading(true);
        setError('');
        const result = await login(email, demoCredentials[targetRole].password, targetRole);
        if (result.success) {
          navigate(roleDashboardPaths[targetRole]);
        } else {
          setError(result.error || 'Google Login failed');
        }
        setLoading(false);
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [login, navigate, role]);

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

  const handleGoogleLogin = () => {
    const width = 450;
    const height = 580;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      `/google-mock-auth.html?type=staff`,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
    );
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResetLoading(false);
    setView('reset-success');
  };

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-primary-800 via-primary-900 to-teal-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Centered Rounded Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-slide-up">
        {/* Left Column: Login Form / Forgot Password Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          {view === 'login' && (
            <div className="space-y-5">
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                    <FaHospital className="text-base" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    AMH Kalmunai
                  </h1>
                </div>
                
                <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">
                  STAFF PORTAL
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Smart Patient Flow & Queue Management
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Select Staff Role</p>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleChange(r.id)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border-2 text-xs font-medium transition-all ${
                        role === r.id ? r.color + ' border-current shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <r.icon className="text-sm" /> {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1">Staff Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50" 
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPass ? 'text' : 'password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                      placeholder="**********"
                      className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50" 
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end text-xs font-medium pt-1">
                  <a href="#" onClick={(e) => { e.preventDefault(); setView('forgot'); }} className="text-primary-600 hover:text-primary-700">Forgot password?</a>
                </div>

                {error && <p className="text-red-600 text-xs bg-red-50 p-2 rounded-lg">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full py-2.5 mt-1 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 shadow-md transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none text-sm">
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-gray-150"></div>
                  <span className="flex-shrink mx-3 text-gray-400 text-[9px] uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-gray-150"></div>
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all active:scale-[0.98]"
                >
                  <FcGoogle className="text-lg" />
                  Sign in with Google
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 pt-1">
                <Link to="/" className="text-primary-600 font-semibold hover:underline">Back to Home</Link>
              </p>
            </div>
          )}

          {view === 'forgot' && (
            <div className="space-y-5">
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                    <FaHospital className="text-base" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    AMH Kalmunai
                  </h1>
                </div>
                
                <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">
                  Forgot Password
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your email address to reset your staff account password.
                </p>
              </div>

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1">Staff Email Address</label>
                  <input 
                    type="email" 
                    value={resetEmail} 
                    onChange={(e) => setResetEmail(e.target.value)} 
                    required
                    placeholder="Enter registered staff email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={resetLoading}
                  className="w-full py-2.5 mt-2 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 shadow-md transition-all active:scale-[0.98] disabled:opacity-60 text-sm"
                >
                  {resetLoading ? 'Sending Link...' : 'Send Reset Link'}
                </button>

                <button 
                  type="button"
                  onClick={() => setView('login')}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-150 rounded-xl text-xs font-semibold text-gray-500 bg-white hover:bg-gray-50 shadow-sm transition-all"
                >
                  <FaArrowLeft className="text-[10px]" /> Back to Login
                </button>
              </form>
            </div>
          )}

          {view === 'reset-success' && (
            <div className="space-y-5 text-center flex flex-col items-center">
              <FaCheckCircle className="text-5xl text-emerald-500 animate-bounce" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Email Sent!</h3>
                <p className="mt-2 text-xs text-gray-500 px-4">
                  We have sent a password reset link to <strong>{resetEmail}</strong>. Please check your staff inbox.
                </p>
              </div>

              <button 
                type="button"
                onClick={() => { setView('login'); setResetEmail(''); }}
                className="w-full py-2.5 mt-2 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 shadow-md transition-all active:scale-[0.98] text-sm"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Hero Image Illustration */}
        <div className="hidden md:flex bg-gradient-to-br from-primary-50/50 via-white to-teal-50/50 items-center justify-center p-8 relative overflow-hidden border-l border-gray-100">
          <div className="relative max-w-sm w-full z-10 flex items-center justify-center">
            <img 
              src={loginHero} 
              alt="Hospital Flow Illustration" 
              className="w-full h-auto max-h-[45vh] object-contain mix-blend-multiply" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
