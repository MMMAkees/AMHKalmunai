import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaStream, FaHospital, FaUserMd, FaTicketAlt,
  FaSms, FaQrcode, FaRoute, FaLanguage, FaArrowRight,
  FaAmbulance, FaStethoscope, FaProcedures, FaBaby,
  FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills,
  FaHeartbeat, FaShieldAlt, FaClock,
} from 'react-icons/fa';
import { hospitalInfo, statistics, services, features } from '../../data/hospital';
import { useCounter } from '../../hooks/useCounter';

/* ───── ICON MAP ───── */
const featureIcons = {
  FaCalendarCheck, FaTicketAlt, FaStream, FaUserMd, FaSms, FaQrcode, FaRoute, FaLanguage,
};

const deptIcons = {
  FaHospital, FaAmbulance, FaStethoscope, FaProcedures, FaBaby,
  FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills,
};

/* ───── MOUSE PARALLAX HOOK ───── */
function useMouseParallax(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [strength]);
  return offset;
}

/* ───── SCROLL REVEAL HOOK ───── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ───── PARTICLES ───── */
function Particles({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
    opacity: 0.1 + Math.random() * 0.3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ───── 3D HOSPITAL SVG ───── */
function Hospital3D() {
  const m = useMouseParallax(0.015);
  return (
    <div className="relative w-full max-w-lg mx-auto scene-3d" style={{ perspective: '1000px' }}>
      <div
        className="animate-float preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${m.y * -1}deg) rotateY(${m.x}deg)` }}
      >
        <svg viewBox="0 0 420 380" className="w-full h-auto drop-shadow-2xl">
          <defs>
            <linearGradient id="skyG3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1628" />
              <stop offset="50%" stopColor="#0d2147" />
              <stop offset="100%" stopColor="#0a2a4a" />
            </linearGradient>
            <linearGradient id="buildG3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0d2147" />
            </linearGradient>
            <linearGradient id="roofG3d" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1565c0" />
              <stop offset="100%" stopColor="#00838f" />
            </linearGradient>
            <linearGradient id="glowG3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#42a5f5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#42a5f5" stopOpacity="0" />
            </linearGradient>
            <filter id="neonGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background */}
          <rect width="420" height="380" fill="url(#skyG3d)" rx="20" />

          {/* Stars */}
          {[
            [50, 30], [120, 50], [200, 25], [280, 55], [350, 35],
            [80, 80], [160, 70], [320, 75], [380, 45], [30, 60],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={1 + Math.random()} fill="#fff" opacity={0.2 + Math.random() * 0.4}>
              <animate attributeName="opacity" values={`${0.2};${0.7};${0.2}`} dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Ground glow */}
          <ellipse cx="210" cy="340" rx="180" ry="20" fill="url(#glowG3d)" />

          {/* Main Building - 3D isometric feel */}
          <g filter="url(#softShadow)">
            {/* Building body */}
            <rect x="100" y="130" width="220" height="190" fill="url(#buildG3d)" rx="4" />
            {/* 3D side face */}
            <polygon points="320,130 350,110 350,300 320,320" fill="#0a1a3a" opacity="0.8" />
            {/* 3D top face */}
            <polygon points="100,130 130,110 350,110 320,130" fill="#1a3a6a" opacity="0.7" />

            {/* Roof with gradient */}
            <rect x="80" y="115" width="260" height="22" fill="url(#roofG3d)" rx="4" />
            <polygon points="340,115 365,100 365,137 340,137" fill="#00695c" opacity="0.8" />
            <polygon points="80,115 100,100 365,100 340,115" fill="#0097a7" opacity="0.6" />
          </g>

          {/* Cross - neon glow */}
          <g filter="url(#neonGlow)">
            <rect x="197" y="140" width="26" height="55" fill="#42a5f5" rx="3" />
            <rect x="185" y="152" width="50" height="22" fill="#42a5f5" rx="3" />
          </g>

          {/* AMH Text */}
          <text x="210" y="108" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif" letterSpacing="3" opacity="0.9">
            A M H
          </text>

          {/* Windows - lit up with glow */}
          {[
            [120, 210], [160, 210], [250, 210], [290, 210],
            [120, 260], [160, 260], [250, 260], [290, 260],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="28" height="30" fill="#0a1628" rx="3" />
              <rect x={x + 2} y={y + 2} width="24" height="26" fill={i % 3 === 0 ? '#ffd54f' : '#90caf9'} rx="2" opacity={i % 3 === 0 ? 0.8 : 0.25}>
                <animate attributeName="opacity" values={`${i % 3 === 0 ? '0.8;0.4;0.8' : '0.25;0.5;0.25'}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              </rect>
            </g>
          ))}

          {/* Door */}
          <rect x="190" y="280" width="40" height="40" fill="#0a3d91" rx="4" />
          <rect x="192" y="282" width="36" height="36" fill="#1565c0" rx="3" opacity="0.6" />
          <circle cx="222" cy="300" r="3" fill="#ffd54f" opacity="0.8" />

          {/* Side buildings */}
          <g opacity="0.6">
            <rect x="30" y="240" width="55" height="80" fill="#0d2147" rx="3" />
            <polygon points="85,240 100,225 100,320 85,320" fill="#0a1628" />
            <rect x="38" y="260" width="16" height="18" fill="#90caf9" rx="2" opacity="0.2" />
            <rect x="60" y="260" width="16" height="18" fill="#ffd54f" rx="2" opacity="0.5" />
          </g>
          <g opacity="0.6">
            <rect x="340" y="230" width="50" height="90" fill="#0d2147" rx="3" />
            <rect x="350" y="250" width="14" height="16" fill="#90caf9" rx="2" opacity="0.3" />
            <rect x="370" y="250" width="14" height="16" fill="#ffd54f" rx="2" opacity="0.6" />
          </g>

          {/* Ground line */}
          <line x1="0" y1="320" x2="420" y2="320" stroke="#1e3a5f" strokeWidth="1" opacity="0.5" />

          {/* Ambulance */}
          <g opacity="0.7">
            <rect x="50" y="305" width="40" height="18" fill="#e53935" rx="4" />
            <rect x="55" y="308" width="8" height="5" fill="#fff" rx="1" />
            <rect x="58" y="306" width="2" height="9" fill="#fff" rx="0.5" />
            <circle cx="58" cy="323" r="4" fill="#37474f" />
            <circle cx="82" cy="323" r="4" fill="#37474f" />
            <circle cx="40" cy="303" r="2" fill="#e53935" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pulse ring around building */}
          <circle cx="210" cy="230" r="130" fill="none" stroke="#42a5f5" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="130;160;130" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Orbiting elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '800px' }}>
        <div className="absolute top-10 left-4 animate-orbit" style={{ animationDuration: '18s' }}>
          <div className="w-8 h-8 rounded-lg glass-dark flex items-center justify-center">
            <FaHeartbeat className="text-red-400 text-xs" />
          </div>
        </div>
        <div className="absolute top-1/4 right-0 animate-orbit" style={{ animationDuration: '22s', animationDelay: '-5s' }}>
          <div className="w-8 h-8 rounded-lg glass-dark flex items-center justify-center">
            <FaShieldAlt className="text-teal-400 text-xs" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-0 animate-orbit" style={{ animationDuration: '16s', animationDelay: '-10s' }}>
          <div className="w-8 h-8 rounded-lg glass-dark flex items-center justify-center">
            <FaClock className="text-yellow-400 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── STAT COUNTER ───── */
function StatCounter3D({ end, label, suffix = '', icon: Icon, color }) {
  const count = useCounter(end);
  return (
    <div className="stat-block glass-dark rounded-2xl p-6 text-center group cursor-default">
      <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        <Icon className="text-2xl" />
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-white animate-count glow-text">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-blue-300/80 mt-2 font-medium">{label}</p>
    </div>
  );
}

/* ───── 3D DEPARTMENT CARD ───── */
function DeptCard3D({ name, description, icon }) {
  const Icon = deptIcons[icon] || FaHospital;
  return (
    <div className="card-3d glass-dark rounded-2xl p-5 group cursor-default animate-shimmer">
      <div className="w-12 h-12 rounded-xl bg-primary-600/20 group-hover:bg-primary-500/30 flex items-center justify-center mb-4 transition-all duration-300">
        <Icon className="text-primary-400 text-xl group-hover:text-primary-300 transition-colors" />
      </div>
      <h3 className="font-semibold text-white text-sm mb-1">{name}</h3>
      <p className="text-xs text-blue-200/60 leading-relaxed line-clamp-2">{description}</p>
    </div>
  );
}

/* ───── 3D FEATURE CARD ───── */
function FeatureCard3D({ title, description, icon, index }) {
  const Icon = featureIcons[icon] || FaHospital;
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card-3d glass-dark rounded-2xl p-6 group cursor-default animate-border-glow transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600/30 to-teal-600/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
        <Icon className="text-primary-300 text-2xl group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-bold text-white text-base mb-2">{title}</h3>
      <p className="text-sm text-blue-200/60 leading-relaxed">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN HOME PAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const heroMouse = useMouseParallax(0.008);
  const [heroRef, heroVisible] = useReveal(0.1);
  const [aboutRef, aboutVisible] = useReveal();
  const [servRef, servVisible] = useReveal();
  const [featRef, featVisible] = useReveal();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#050a18]">
        {/* Gradient meshes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-700/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <Particles count={25} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <div className="scene-3d">
              <div
                className="preserve-3d"
                style={{ transform: `rotateX(${heroMouse.y * -0.5}deg) rotateY(${heroMouse.x * 0.5}deg)` }}
              >
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 glass-dark rounded-full text-teal-300 text-sm font-medium mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  Government Healthcare Digital Platform
                </span>

                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="block">AMH Smart</span>
                  <span className="block bg-gradient-to-r from-primary-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                    Patient Flow
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-200/70 mt-1">
                    & Queue System
                  </span>
                </h1>

                <p className={`text-lg text-blue-200/60 mt-6 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  Reduce waiting times, improve patient experience, and digitize healthcare services at Ashraff Memorial Hospital, Kalmunai.
                </p>

                <div className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Link
                    to="/login"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <FaCalendarCheck className="relative z-10" />
                    <span className="relative z-10">Book Appointment</span>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-7 py-3.5 glass-dark text-blue-200 font-semibold rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FaStream />
                    Track Queue
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - 3D Hospital */}
            <div className={`hidden lg:block transition-all duration-1000 delay-400 ${heroVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-90'}`}>
              <Hospital3D />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 80 Q360 40 720 80 Q1080 120 1440 80 L1440 120 L0 120 Z" fill="#080e24" />
          </svg>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 lg:py-28 bg-[#080e24] relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800/10 rounded-full blur-[120px]" />
        </div>

        <div ref={aboutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">{hospitalInfo.name}</h2>
            <p className="text-blue-200/50 mt-2 text-sm">{hospitalInfo.location} · Est. {hospitalInfo.established}</p>
          </div>

          <p className={`text-blue-200/60 text-center max-w-3xl mx-auto leading-relaxed mb-14 transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {hospitalInfo.introduction}
          </p>

          <div className={`grid md:grid-cols-2 gap-6 mb-14 scene-3d transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="card-3d glass-dark rounded-2xl p-8 animate-border-glow">
              <h3 className="text-xl font-bold text-primary-300 mb-3">🎯 Our Mission</h3>
              <p className="text-blue-200/60 leading-relaxed text-sm">{hospitalInfo.mission}</p>
            </div>
            <div className="card-3d glass-dark rounded-2xl p-8 animate-border-glow">
              <h3 className="text-xl font-bold text-teal-300 mb-3">🔭 Our Vision</h3>
              <p className="text-blue-200/60 leading-relaxed text-sm">{hospitalInfo.vision}</p>
            </div>
          </div>

          <h3 className={`text-lg font-bold text-white text-center mb-8 transition-all duration-700 delay-300 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 scene-3d">
            {hospitalInfo.coreValues.map((v, i) => (
              <div
                key={v.title}
                className={`card-3d glass-dark rounded-xl p-5 text-center transition-all duration-500 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <h4 className="font-semibold text-primary-300 text-sm">{v.title}</h4>
                <p className="text-xs text-blue-200/50 mt-2">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 bg-[#060c1e] relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-teal-800/10 rounded-full blur-[120px]" />
        </div>

        <div ref={servRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-14 transition-all duration-700 ${servVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Comprehensive Healthcare
            </h2>
            <p className="text-blue-200/50 mt-2 text-sm max-w-xl mx-auto">
              Providing specialized medical care across {services.length} departments
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 scene-3d">
            {services.map((s, i) => (
              <div
                key={s.id}
                className={`transition-all duration-500 ${servVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <DeptCard3D name={s.name} description={s.description} icon={s.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATISTICS ═══ */}
      <section id="stats-section" className="py-20 relative overflow-hidden bg-[#050a18]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-700/15 rounded-full blur-[120px]" />
        </div>
        <Particles count={15} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">By the Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Hospital at a Glance</h2>
            <p className="text-blue-200/50 mt-2 text-sm">Real-time statistics from AMH digital platform</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 scene-3d">
            <StatCounter3D end={statistics.totalDoctors} label="Total Doctors" suffix="+" icon={FaUserMd} color="bg-primary-600/20 text-primary-400" />
            <StatCounter3D end={statistics.dailyPatients} label="Daily Patients" icon={FaHeartbeat} color="bg-red-600/20 text-red-400" />
            <StatCounter3D end={statistics.departments} label="Departments" icon={FaHospital} color="bg-teal-600/20 text-teal-400" />
            <StatCounter3D end={statistics.activeQueues} label="Active Queues" icon={FaStream} color="bg-yellow-600/20 text-yellow-400" />
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-20 lg:py-28 bg-[#080e24] relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-800/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-800/10 rounded-full blur-[100px]" />
        </div>

        <div ref={featRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-14 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Smart Healthcare Technology
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 scene-3d">
            {features.map((f, i) => (
              <FeatureCard3D
                key={f.id}
                title={f.title}
                description={f.description}
                icon={f.icon}
                index={i}
              />
            ))}
          </div>

          <div className={`text-center mt-14 transition-all duration-700 delay-500 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 hover:shadow-primary-500/50 hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 text-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Get Started</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
