import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { hospitalInfo, quickLinks } from '../data/hospital';
import govtLogo from '../assets/govt_logo.png';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="contact"
      className={`relative border-t transition-colors duration-500 ${
        isDark
          ? 'bg-[#040810] border-white/[0.04]'
          : 'bg-gray-50 border-gray-200/60'
      }`}
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-primary-900/20' : 'bg-primary-100/40'}`} />
        <div className={`absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] ${isDark ? 'bg-teal-900/10' : 'bg-teal-100/30'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 ring-1 ${isDark ? 'ring-white/10' : 'ring-primary-100'}`}>
                <img src={govtLogo} alt="Sri Lanka Government" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className={`font-extrabold text-lg leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{hospitalInfo.shortName}</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-blue-300/50' : 'text-gray-400'}`}>{hospitalInfo.name}</p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-blue-200/40' : 'text-gray-500'}`}>
              Digitizing healthcare for a healthier Eastern Province. Smart solutions for modern patient care.
            </p>
            <div className="flex gap-2.5">
              {[FaFacebook, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
                    isDark
                      ? 'glass-dark text-blue-200/50 hover:text-white hover:bg-primary-600/30'
                      : 'bg-white border border-gray-200 text-gray-400 hover:text-primary-600 hover:border-primary-200 shadow-sm'
                  }`}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold text-sm uppercase tracking-wider mb-5 ${isDark ? 'text-white' : 'text-gray-800'}`}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors duration-200 flex items-center gap-2 group ${
                      isDark ? 'text-blue-200/40 hover:text-primary-300' : 'text-gray-500 hover:text-primary-600'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full transition-colors ${isDark ? 'bg-primary-600/50 group-hover:bg-primary-400' : 'bg-gray-300 group-hover:bg-primary-500'}`} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-bold text-sm uppercase tracking-wider mb-5 ${isDark ? 'text-white' : 'text-gray-800'}`}>Contact</h4>
            <ul className={`space-y-3.5 text-sm ${isDark ? 'text-blue-200/40' : 'text-gray-500'}`}>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className={`mt-0.5 shrink-0 ${isDark ? 'text-primary-400/70' : 'text-primary-500'}`} />
                <span>{hospitalInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className={`shrink-0 ${isDark ? 'text-primary-400/70' : 'text-primary-500'}`} />
                <span>{hospitalInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className={`shrink-0 ${isDark ? 'text-primary-400/70' : 'text-primary-500'}`} />
                <span>{hospitalInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className={`font-bold text-sm uppercase tracking-wider mb-5 ${isDark ? 'text-white' : 'text-gray-800'}`}>Emergency</h4>
            <div className={`rounded-2xl p-5 border relative overflow-hidden ${
              isDark
                ? 'glass-dark border-red-500/10'
                : 'bg-red-50 border-red-100'
            }`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl" />
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDark ? 'text-red-300/60' : 'text-red-400'}`}>24/7 Hotline</p>
              <p className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{hospitalInfo.emergency}</p>
              <p className={`text-[10px] mt-2 uppercase tracking-wider ${isDark ? 'text-red-300/40' : 'text-red-400/60'}`}>Medical emergencies only</p>
              <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-red-500/30 via-red-400/50 to-transparent rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/[0.04]' : 'border-gray-200/60'}`}>
          <p className={`text-xs ${isDark ? 'text-blue-300/30' : 'text-gray-400'}`}>
            &copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-blue-300/30' : 'text-gray-400'}`}>
              AMH Smart Patient Flow v1.0
            </p>
            <button
              onClick={scrollToTop}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                  ? 'glass-dark text-blue-200/40 hover:text-white hover:bg-primary-600/30'
                  : 'bg-white border border-gray-200 text-gray-400 hover:text-primary-600 hover:border-primary-200 shadow-sm'
              }`}
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
