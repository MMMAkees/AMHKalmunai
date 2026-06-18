import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaStream, FaHospital, FaUserMd, FaTicketAlt,
  FaSms, FaQrcode, FaRoute, FaLanguage, FaArrowRight, FaChevronDown,
  FaAmbulance, FaStethoscope, FaProcedures, FaBaby,
  FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills,
  FaHeartbeat, FaShieldAlt, FaClock, FaCheckCircle,
} from 'react-icons/fa';
import { hospitalInfo, statistics, services, features } from '../../data/hospital';
import { useCounter } from '../../hooks/useCounter';

/* ───── ICON MAP ───── */
const featureIcons = { FaCalendarCheck, FaTicketAlt, FaStream, FaUserMd, FaSms, FaQrcode, FaRoute, FaLanguage };
const deptIcons    = { FaHospital, FaAmbulance, FaStethoscope, FaProcedures, FaBaby, FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills };

/* ───── SCROLL REVEAL ───── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ───── MOUSE PARALLAX ───── */
function useMouseParallax(strength = 0.015) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [strength]);
  return offset;
}

/* ───── RIPPLE BUTTON ───── */
function RippleBtn({ children, className = '', onClick, to, as = 'button', ...props }) {
  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left  = `${e.clientX - rect.left  - radius}px`;
    circle.style.top   = `${e.clientY - rect.top   - radius}px`;
    circle.className   = 'ripple-effect';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
    if (onClick) onClick(e);
  };

  if (as === 'Link') {
    return <Link to={to} className={`ripple-btn ${className}`} onClick={handleRipple} {...props}>{children}</Link>;
  }
  return <button className={`ripple-btn ${className}`} onClick={handleRipple} {...props}>{children}</button>;
}

/* ───── FLOATING PARTICLES ───── */
function Particles({ count = 20 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    delay:    `${Math.random() * 8}s`,
    duration: `${7 + Math.random() * 8}s`,
    size:     `${3 + Math.random() * 5}px`,
    opacity:  0.08 + Math.random() * 0.18,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ───── HERO ILLUSTRATION (MATERIAL LIGHT SVG) ───── */
function HeroIllustration() {
  const m = useMouseParallax(0.012);
  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ perspective: '1000px' }}>
      <div
        className="animate-float transition-transform duration-500 ease-out"
        style={{ transform: `rotateX(${m.y * -0.6}deg) rotateY(${m.x * 0.6}deg)` }}
      >
        <svg viewBox="0 0 480 420" className="w-full h-auto drop-shadow-2xl">
          <defs>
            <linearGradient id="skyLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f4fd" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id="buildLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="roofLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1976d2" />
              <stop offset="100%" stopColor="#00897b" />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2196f3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00897b" stopOpacity="0.08" />
            </linearGradient>
            <filter id="lightShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1565c0" floodOpacity="0.12" />
            </filter>
            <filter id="crossGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Sky background */}
          <rect width="480" height="420" fill="url(#skyLight)" rx="24" />

          {/* Background circles decoration */}
          <circle cx="60"  cy="80"  r="35" fill="url(#accentGrad)" />
          <circle cx="420" cy="60"  r="25" fill="url(#accentGrad)" />
          <circle cx="400" cy="340" r="40" fill="url(#accentGrad)" />

          {/* Ground */}
          <ellipse cx="240" cy="380" rx="200" ry="22" fill="rgba(25,118,210,0.06)" />

          {/* Main Building */}
          <g filter="url(#lightShadow)">
            <rect x="110" y="140" width="260" height="210" fill="url(#buildLight)" rx="6" stroke="#bbdefb" strokeWidth="1.5" />
            {/* 3D Right face */}
            <polygon points="370,140 400,118 400,330 370,350" fill="#e3f2fd" opacity="0.9" />
            {/* 3D Top face */}
            <polygon points="110,140 140,118 400,118 370,140" fill="#f0f9ff" opacity="0.9" />
            {/* Roof */}
            <rect x="88"  y="120" width="300" height="26" fill="url(#roofLight)" rx="5" />
            <polygon points="388,120 412,104 412,146 388,146" fill="#00695c" opacity="0.85" />
            <polygon points="88,120 110,104 412,104 388,120" fill="#0097a7" opacity="0.7" />
          </g>

          {/* Hospital Cross */}
          <g filter="url(#crossGlow)">
            <rect x="222" y="150" width="36" height="70" fill="#1976d2" rx="5" opacity="0.95" />
            <rect x="207" y="165" width="66" height="28" fill="#1976d2" rx="5" opacity="0.95" />
            <rect x="223" y="151" width="34" height="68" fill="white"   rx="4" opacity="0.3" />
          </g>

          {/* AMH Text */}
          <text x="240" y="114" textAnchor="middle" fill="white" fontSize="15" fontWeight="800" fontFamily="Inter,sans-serif" letterSpacing="4" opacity="0.95">A M H</text>

          {/* Windows - Material style */}
          {[
            [130,220],[172,220],[268,220],[310,220],
            [130,272],[172,272],[268,272],[310,272],
          ].map(([x,y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="32" height="34" fill="#e0f2fe" rx="4" stroke="#bbdefb" strokeWidth="1" />
              <rect x={x+3} y={y+3} width="26" height="28" fill={i % 2 === 0 ? '#fff9c4' : '#e3f2fd'} rx="2.5" opacity="0.9">
                <animate attributeName="opacity" values={`0.9;${i%2===0?'0.5':'0.7'};0.9`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
              </rect>
              {/* Reflection */}
              <rect x={x+3} y={y+3} width="8" height="28" fill="white" rx="2" opacity="0.25" />
            </g>
          ))}

          {/* Door */}
          <rect x="218" y="298" width="44" height="52" fill="#1565c0" rx="5" />
          <rect x="220" y="300" width="40" height="48" fill="#1976d2" rx="4" opacity="0.7" />
          <rect x="220" y="300" width="10" height="48" fill="white"   rx="4" opacity="0.15" />
          <circle cx="254" cy="326" r="3.5" fill="#ffd54f" />

          {/* Side buildings */}
          <g opacity="0.75">
            <rect x="22" y="262" width="66" height="88" fill="#f0f9ff" rx="4" stroke="#dbeafe" strokeWidth="1" />
            <polygon points="88,262 104,246 104,350 88,350" fill="#e0f2fe" />
            <rect x="32" y="280" width="18" height="20" fill="#bbdefb" rx="3" opacity="0.8" />
            <rect x="56" y="280" width="18" height="20" fill="#fff9c4" rx="3" opacity="0.9" />
          </g>
          <g opacity="0.75">
            <rect x="392" y="252" width="56" height="98" fill="#f0f9ff" rx="4" stroke="#dbeafe" strokeWidth="1" />
            <rect x="402" y="270" width="16" height="18" fill="#bbdefb" rx="3" opacity="0.8" />
            <rect x="424" y="270" width="16" height="18" fill="#fff9c4" rx="3" opacity="0.9" />
          </g>

          {/* Ground line */}
          <line x1="0" y1="350" x2="480" y2="350" stroke="#bbdefb" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />

          {/* Ambulance */}
          <g opacity="0.9">
            <rect x="50" y="332" width="50" height="22" fill="#ef5350" rx="5" />
            <rect x="55" y="335" width="12" height="6"  fill="white" rx="1.5" opacity="0.9" />
            <rect x="60" y="333" width="2.5" height="10" fill="white" rx="1" opacity="0.8" />
            <circle cx="62" cy="354" r="5" fill="#37474f" />
            <circle cx="90" cy="354" r="5" fill="#37474f" />
            <circle cx="62" cy="354" r="2" fill="#90a4ae" />
            <circle cx="90" cy="354" r="2" fill="#90a4ae" />
            <circle cx="42" cy="330" r="3" fill="#ef5350" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pulse ring */}
          <circle cx="240" cy="250" r="140" fill="none" stroke="#1976d2" strokeWidth="0.8" opacity="0.2">
            <animate attributeName="r" values="140;175;140" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Decorative dots */}
          {[[60,180],[420,200],[70,320],[440,300]].map(([cx,cy],i)=>(
            <circle key={i} cx={cx} cy={cy} r="4" fill="#2196f3" opacity="0.25">
              <animate attributeName="opacity" values="0.25;0.6;0.25" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      {/* Orbiting feature badges */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '800px' }}>
        <div className="absolute top-8 left-2 animate-orbit" style={{ animationDuration: '18s' }}>
          <div className="w-10 h-10 rounded-2xl bg-white mat-elevation-4 flex items-center justify-center">
            <FaHeartbeat className="text-red-400 text-sm" />
          </div>
        </div>
        <div className="absolute top-1/4 right-0 animate-orbit" style={{ animationDuration: '22s', animationDelay: '-6s' }}>
          <div className="w-10 h-10 rounded-2xl bg-white mat-elevation-4 flex items-center justify-center">
            <FaShieldAlt className="text-teal-500 text-sm" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-0 animate-orbit" style={{ animationDuration: '15s', animationDelay: '-10s' }}>
          <div className="w-10 h-10 rounded-2xl bg-white mat-elevation-4 flex items-center justify-center">
            <FaClock className="text-primary-500 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── STAT COUNTER ───── */
function StatCard({ end, label, suffix = '', icon: Icon, color, bgColor, delay = 0 }) {
  const count = useCounter(end);
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`stat-block mat-card p-6 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${bgColor}`}>
        <Icon className={`text-2xl ${color}`} />
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 animate-count">{count.toLocaleString()}{suffix}</p>
      <p className="text-sm text-gray-500 mt-1.5 font-medium">{label}</p>
    </div>
  );
}

/* ───── DEPT CARD ───── */
function DeptCard({ name, description, icon, delay = 0 }) {
  const Icon = deptIcons[icon] || FaHospital;
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card-3d mat-card p-5 animate-shimmer cursor-default transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 rounded-2xl bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
        <Icon className="text-primary-600 text-lg" />
      </div>
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{name}</h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{description}</p>
    </div>
  );
}

/* ───── FEATURE CARD ───── */
function FeatureCard({ title, description, icon, delay = 0 }) {
  const Icon = featureIcons[icon] || FaHospital;
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card-3d mat-card p-6 cursor-default animate-border-glow transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-teal-50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
        <Icon className="text-primary-600 text-2xl" />
      </div>
      <h3 className="font-bold text-gray-800 text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN HOME PAGE — MATERIAL LIGHT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const [heroRef, heroVisible] = useReveal(0.08);
  const [aboutRef, aboutVisible] = useReveal();
  const [servRef, servVisible] = useReveal();
  const [featRef, featVisible] = useReveal();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0fdf9 100%)' }}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] bg-primary-100/60 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-15%] right-[-8%] w-[400px] h-[400px] bg-teal-100/60 rounded-full blur-[80px]" />
          <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-primary-50 rounded-full blur-[60px]" />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(25,118,210,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(25,118,210,0.4)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <Particles count={18} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Text */}
            <div>
              {/* Chip */}
              <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="mat-chip bg-primary-50 text-primary-700 border border-primary-100 mb-6 inline-flex">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-dot" />
                  Government Healthcare Digital Platform
                </span>
              </div>

              {/* Heading */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="block">AMH Smart</span>
                <span className="block bg-gradient-to-r from-primary-700 via-primary-500 to-teal-500 bg-clip-text text-transparent">
                  Patient Flow
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-400 mt-1">
                  & Queue System
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-lg text-gray-500 mt-6 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Reduce waiting times, improve patient experience, and digitize healthcare services at Ashraff Memorial Hospital, Kalmunai.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <RippleBtn
                  as="Link"
                  to="/login"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-semibold rounded-2xl mat-elevation-4 hover:mat-elevation-8 hover:-translate-y-1 transition-all duration-300 text-sm"
                >
                  <FaCalendarCheck />
                  Book Appointment
                </RippleBtn>

                <RippleBtn
                  as="Link"
                  to="/login"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-primary-700 font-semibold rounded-2xl mat-elevation-2 hover:mat-elevation-4 hover:-translate-y-0.5 border border-primary-100 transition-all duration-300 text-sm"
                >
                  <FaStream />
                  Track Queue
                </RippleBtn>
              </div>

              {/* Trust badges */}
              <div className={`flex flex-wrap gap-4 mt-10 transition-all duration-700 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  { icon: FaCheckCircle, text: 'Free for Patients', color: 'text-teal-600' },
                  { icon: FaCheckCircle, text: 'Real-time Updates', color: 'text-primary-600' },
                  { icon: FaCheckCircle, text: '24/7 Accessible', color: 'text-indigo-600' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <b.icon className={`${b.color} text-sm`} />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Illustration */}
            <div className={`hidden lg:block transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* Scroll down hint */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-primary-400/60 font-semibold">Scroll</span>
          <FaChevronDown className="text-primary-400/50 text-sm" />
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
            <path d="M0 60 Q360 20 720 60 Q1080 100 1440 60 L1440 80 L0 80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 lg:py-28 bg-white relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-[100px] opacity-60" />
        </div>

        <div ref={aboutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section label */}
          <div className={`text-center mb-14 transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="mat-chip bg-teal-50 text-teal-700 border border-teal-100 mb-4 inline-flex">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">{hospitalInfo.name}</h2>
            <p className="text-gray-400 mt-2 text-sm">{hospitalInfo.location} · Est. {hospitalInfo.established}</p>
          </div>

          <p className={`text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-14 transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {hospitalInfo.introduction}
          </p>

          {/* Mission & Vision */}
          <div className={`grid md:grid-cols-2 gap-6 mb-14 transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mat-card p-8 border-l-4 border-primary-500 card-3d">
              <h3 className="text-xl font-bold text-primary-700 mb-3">🎯 Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{hospitalInfo.mission}</p>
            </div>
            <div className="mat-card p-8 border-l-4 border-teal-500 card-3d">
              <h3 className="text-xl font-bold text-teal-700 mb-3">🔭 Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{hospitalInfo.vision}</p>
            </div>
          </div>

          {/* Core Values */}
          <h3 className={`text-lg font-bold text-gray-800 text-center mb-8 transition-all duration-700 delay-300 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hospitalInfo.coreValues.map((v, i) => (
              <div
                key={v.title}
                className={`mat-card p-5 text-center card-3d transition-all duration-500 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                  <FaCheckCircle className="text-primary-500 text-sm" />
                </div>
                <h4 className="font-semibold text-primary-700 text-sm">{v.title}</h4>
                <p className="text-xs text-gray-500 mt-1.5">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 lg:py-28 relative" style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #f0f7ff 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-teal-50 rounded-full blur-[100px] opacity-70" />
        </div>

        <div ref={servRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-14 transition-all duration-700 ${servVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="mat-chip bg-primary-50 text-primary-700 border border-primary-100 mb-4 inline-flex">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Comprehensive Healthcare</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto">
              Providing specialized medical care across {services.length} departments
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <DeptCard key={s.id} name={s.name} description={s.description} icon={s.icon} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats-section" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[120px] opacity-70" />
        </div>
        <Particles count={12} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="mat-chip bg-indigo-50 text-indigo-700 border border-indigo-100 mb-4 inline-flex">By the Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Hospital at a Glance</h2>
            <p className="text-gray-400 mt-2 text-sm">Real-time statistics from AMH digital platform</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard end={statistics.totalDoctors}  label="Total Doctors"   suffix="+" icon={FaUserMd}    color="text-primary-600" bgColor="bg-primary-50" delay={0} />
            <StatCard end={statistics.dailyPatients} label="Daily Patients"              icon={FaHeartbeat}  color="text-red-500"     bgColor="bg-red-50"     delay={100} />
            <StatCard end={statistics.departments}   label="Departments"                icon={FaHospital}   color="text-teal-600"    bgColor="bg-teal-50"    delay={200} />
            <StatCard end={statistics.activeQueues}  label="Active Queues"              icon={FaStream}     color="text-amber-600"   bgColor="bg-amber-50"   delay={300} />
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-20 lg:py-28 relative" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary-50 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-50  rounded-full blur-[80px]  opacity-60" />
        </div>

        <div ref={featRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-14 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="mat-chip bg-teal-50 text-teal-700 border border-teal-100 mb-4 inline-flex">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Smart Healthcare Technology</h2>
            <p className="text-gray-400 mt-2 text-sm">Powered by modern digital infrastructure</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.id} title={f.title} description={f.description} icon={f.icon} delay={i * 100} />
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center mt-14 transition-all duration-700 delay-500 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <RippleBtn
              as="Link"
              to="/login"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-700 via-primary-600 to-teal-600 text-white font-bold rounded-2xl mat-elevation-6 hover:mat-elevation-12 hover:-translate-y-1.5 transition-all duration-300 text-base"
            >
              Get Started
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </RippleBtn>

            <p className="text-gray-400 text-xs mt-4">Free for all patients · No registration required</p>
          </div>
        </div>
      </section>
    </>
  );
}
