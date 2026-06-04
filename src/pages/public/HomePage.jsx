import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaStream, FaHospital, FaUserMd, FaTicketAlt,
  FaSms, FaQrcode, FaRoute, FaLanguage, FaArrowRight,
} from 'react-icons/fa';
import { hospitalInfo, statistics, services, features } from '../../data/hospital';
import DepartmentCard from '../../components/DepartmentCard';
import { useCounter } from '../../hooks/useCounter';

const featureIcons = {
  FaCalendarCheck, FaTicketAlt, FaStream, FaUserMd, FaSms, FaQrcode, FaRoute, FaLanguage,
};

function StatCounter({ end, label, suffix = '' }) {
  const count = useCounter(end);
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-white animate-count">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-blue-200 mt-2 text-sm font-medium">{label}</p>
    </div>
  );
}

function HospitalIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 350" className="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e3f2fd" />
            <stop offset="100%" stopColor="#bbdefb" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8eaf6" />
          </linearGradient>
        </defs>
        <rect width="400" height="350" fill="url(#skyGrad)" rx="16" />
        <ellipse cx="200" cy="320" rx="160" ry="15" fill="#000" opacity="0.08" />
        <rect x="80" y="120" width="240" height="180" fill="url(#buildingGrad)" rx="4" />
        <rect x="100" y="80" width="200" height="40" fill="#1565c0" rx="4" />
        <text x="200" y="108" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">AMH</text>
        <rect x="175" y="140" width="50" height="60" fill="#0d47a1" rx="2" />
        <text x="200" y="178" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Inter, sans-serif">+</text>
        {[110, 150, 230, 270].map((x, i) => (
          <g key={i}>
            <rect x={x} y={160 + (i % 2) * 40} width="30" height="25" fill="#90caf9" rx="2" opacity="0.8" />
            <rect x={x} y={220 + (i % 2) * 20} width="30" height="25" fill="#90caf9" rx="2" opacity="0.6" />
          </g>
        ))}
        <rect x="60" y="200" width="50" height="100" fill="#e0e0e0" rx="2" />
        <rect x="290" y="200" width="50" height="100" fill="#e0e0e0" rx="2" />
        <circle cx="340" cy="60" r="30" fill="#FFD54F" opacity="0.9" />
        <path d="M30 300 Q60 280 90 300" stroke="#4caf50" strokeWidth="3" fill="none" />
        <path d="M310 300 Q340 280 370 300" stroke="#4caf50" strokeWidth="3" fill="none" />
        <rect x="20" y="290" width="15" height="30" fill="#795548" rx="2" />
        <circle cx="27" cy="280" r="20" fill="#4caf50" opacity="0.7" />
        <rect x="365" y="290" width="15" height="30" fill="#795548" rx="2" />
        <circle cx="372" cy="280" r="20" fill="#4caf50" opacity="0.7" />
        <rect x="170" y="260" width="60" height="40" fill="#37474f" rx="2" />
        <circle cx="50" cy="50" r="3" fill="white" opacity="0.6" />
        <circle cx="350" cy="30" r="2" fill="white" opacity="0.4" />
        <circle cx="100" cy="40" r="2" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-1.5 bg-white/15 rounded-full text-teal-200 text-sm font-medium mb-6">
                Government Healthcare Digital Platform
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                AMH Smart Patient Flow & Queue Management System
              </h1>
              <p className="text-lg text-blue-100 mt-6 leading-relaxed max-w-xl">
                Reduce waiting times, improve patient experience, and digitize healthcare services at Ashraff Memorial Hospital, Kalmunai.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <FaCalendarCheck /> Book Appointment
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all">
                  <FaStream /> Track Queue
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in">
              <HospitalIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{hospitalInfo.name}</h2>
            <p className="text-gray-500 mt-2">{hospitalInfo.location} &middot; Est. {hospitalInfo.established}</p>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-12">{hospitalInfo.introduction}</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-xl font-bold text-primary-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">{hospitalInfo.mission}</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-xl font-bold text-teal-800 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">{hospitalInfo.vision}</p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hospitalInfo.coreValues.map((v) => (
              <div key={v.title} className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-primary-700">{v.title}</h4>
                <p className="text-sm text-gray-500 mt-2">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Comprehensive Healthcare Services</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Providing specialized medical care across {services.length} departments</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((s) => (
              <DepartmentCard key={s.id} name={s.name} description={s.description} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats-section" className="py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Hospital at a Glance</h2>
            <p className="text-blue-200 mt-2">Real-time statistics from AMH digital platform</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter end={statistics.totalDoctors} label="Total Doctors" suffix="+" />
            <StatCounter end={statistics.dailyPatients} label="Daily Patients" />
            <StatCounter end={statistics.departments} label="Departments" />
            <StatCounter end={statistics.activeQueues} label="Active Queues" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Platform Features</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Smart Healthcare Technology</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = featureIcons[f.icon] || FaHospital;
              return (
                <div key={f.id} className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="text-primary-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{f.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 shadow-md transition-all">
              Get Started <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
