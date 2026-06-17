import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { hospitalInfo, quickLinks } from '../data/hospital';
import govtLogo from '../assets/govt_logo.png';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="relative bg-[#040810] border-t border-white/[0.04]">
      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-teal-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-white/10 flex-shrink-0">
                <img src={govtLogo} alt="Sri Lanka Government" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg leading-tight">{hospitalInfo.shortName}</h3>
                <p className="text-xs text-blue-300/50 font-medium">{hospitalInfo.name}</p>
              </div>
            </div>
            <p className="text-blue-200/40 text-sm leading-relaxed mb-5">
              Digitizing healthcare for a healthier Eastern Province. Smart solutions for modern patient care.
            </p>
            <div className="flex gap-2.5">
              {[FaFacebook, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass-dark flex items-center justify-center text-blue-200/50 hover:text-white hover:bg-primary-600/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-blue-200/40 hover:text-primary-300 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-600/50 group-hover:bg-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3.5 text-sm text-blue-200/40">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400/70 mt-0.5 shrink-0" />
                <span>{hospitalInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary-400/70 shrink-0" />
                <span>{hospitalInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-400/70 shrink-0" />
                <span>{hospitalInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Emergency</h4>
            <div className="glass-dark rounded-2xl p-5 border border-red-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl" />
              <p className="text-red-300/60 text-xs font-medium uppercase tracking-wider mb-1">24/7 Hotline</p>
              <p className="text-2xl font-extrabold text-white tracking-tight">{hospitalInfo.emergency}</p>
              <p className="text-red-300/40 text-[10px] mt-2 uppercase tracking-wider">Medical emergencies only</p>
              <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-red-500/30 via-red-400/50 to-transparent rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-blue-300/30 text-xs">
            &copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-blue-300/30 text-[10px] uppercase tracking-wider">
              AMH Smart Patient Flow v1.0
            </p>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg glass-dark flex items-center justify-center text-blue-200/40 hover:text-white hover:bg-primary-600/30 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
