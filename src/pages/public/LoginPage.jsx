import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHospital, FaUser, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft, FaBolt, FaLanguage } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../services/auth';
import { roleDashboardPaths } from '../../routes/menuConfig';
import loginHero from '../../assets/login_hero.png';

export default function LoginPage() {
  const [email, setEmail] = useState(demoCredentials.patient.email);
  const [password, setPassword] = useState(demoCredentials.patient.password);
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
        const { email } = event.data.user;
        setLoading(true);
        setError('');
        const result = await login(email, demoCredentials.patient.password, 'patient');
        if (result.success) {
          navigate(roleDashboardPaths.patient);
        } else {
          setError(result.error || 'Google Login failed');
        }
        setLoading(false);
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password, 'patient');
    if (result.success) {
      navigate(roleDashboardPaths.patient);
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
      `/google-mock-auth.html?type=patient`,
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050a18]">
      {/* Background gradient meshes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              opacity: 0.1 + Math.random() * 0.25,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl animate-slide-up z-10">
        <div className="glass-dark rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10">

          {/* Left Column: Form */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">

            {/* ── LOGIN VIEW ── */}
            {view === 'login' && (
              <div className="space-y-5">
                {/* Header */}
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-400">
                      <FaHospital className="text-lg" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      AMH Kalmunai
                    </h1>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    Patient Login
                  </span>
                  <p className="mt-2 text-xs text-blue-200/50">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-blue-300/70 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-blue-300/30 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-blue-300/70 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••••"
                        className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm text-white placeholder-blue-300/30 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/40 hover:text-blue-200 transition-colors"
                      >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium">
                    <label className="flex items-center gap-2 text-blue-200/50 cursor-pointer hover:text-blue-200/70 transition-colors">
                      <input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/30" />
                      <span>Remember me</span>
                    </label>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setView('forgot'); }}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3 mt-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none text-sm overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
                  </button>

                  <div className="relative flex py-0.5 items-center">
                    <div className="flex-grow border-t border-white/10" />
                    <span className="flex-shrink mx-3 text-blue-300/30 text-[9px] uppercase tracking-wider">or</span>
                    <div className="flex-grow border-t border-white/10" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-blue-100 bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                  >
                    <FcGoogle className="text-lg" />
                    Sign in with Google
                  </button>
                </form>

                <p className="text-center text-xs text-blue-200/40 pt-1">
                  <Link to="/" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors hover:underline">
                    ← Back to Home
                  </Link>
                </p>

                {/* Demo Credentials */}
                <div className="mt-2 rounded-xl bg-white/[0.04] border border-white/10 p-3">
                  <p className="text-[10px] font-semibold text-blue-300/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FaBolt className="text-amber-400" /> Demo Credentials
                  </p>
                  <button
                    type="button"
                    onClick={() => { setEmail(demoCredentials.patient.email); setPassword(demoCredentials.patient.password); }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                  >
                    <p className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">Patient Demo</p>
                    <p className="text-[10px] text-blue-200/40 font-mono mt-0.5">{demoCredentials.patient.email}</p>
                  </button>
                </div>
              </div>
            )}

            {/* ── FORGOT PASSWORD VIEW ── */}
            {view === 'forgot' && (
              <div className="space-y-5">
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-400">
                      <FaHospital className="text-lg" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      AMH Kalmunai
                    </h1>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs font-semibold uppercase tracking-widest">
                    Forgot Password
                  </span>
                  <p className="mt-2 text-xs text-blue-200/50">
                    Enter your email address to reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-blue-300/70 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      placeholder="Enter registered email"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-blue-300/30 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400/50 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="group relative w-full py-3 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 text-sm overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{resetLoading ? 'Sending Link...' : 'Send Reset Link'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-blue-200/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <FaArrowLeft className="text-[10px]" /> Back to Login
                  </button>
                </form>
              </div>
            )}

            {/* ── RESET SUCCESS VIEW ── */}
            {view === 'reset-success' && (
              <div className="space-y-5 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                  <FaCheckCircle className="text-4xl text-emerald-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Email Sent!</h3>
                  <p className="mt-2 text-xs text-blue-200/50 px-4">
                    We have sent a password reset link to{' '}
                    <strong className="text-blue-200/80">{resetEmail}</strong>.
                    Please check your inbox and spam folder.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => { setView('login'); setResetEmail(''); }}
                  className="group relative w-full py-3 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] text-sm overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Back to Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dark Illustration Panel */}
          <div className="hidden md:flex flex-col items-center justify-center p-10 relative overflow-hidden border-l border-white/5 bg-gradient-to-br from-primary-900/40 via-transparent to-teal-900/20">
            {/* Glow blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-6">
              <img
                src={loginHero}
                alt="Hospital Flow Illustration"
                className="w-full h-auto max-h-[38vh] object-contain drop-shadow-2xl"
                style={{ filter: 'brightness(0.9) saturate(0.8) hue-rotate(10deg)' }}
              />

              {/* Dark info cards */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 text-sm flex-shrink-0">
                    <FaUser />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Smart Queue System</p>
                    <p className="text-blue-200/40 text-[10px]">Real-time patient flow management</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 text-sm flex-shrink-0">
                    <FaHospital />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">AMH Digital Platform</p>
                    <p className="text-blue-200/40 text-[10px]">Ashraff Memorial Hospital, Kalmunai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm flex-shrink-0">
                    <FaLanguage />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Multilingual Support</p>
                    <p className="text-blue-200/40 text-[10px]">English · Tamil · Sinhala</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
