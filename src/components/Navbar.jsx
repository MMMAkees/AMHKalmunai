import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCalendarCheck, FaSun, FaMoon, FaUserShield } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import govtLogo from '../assets/govt_logo.png';
import { useTheme } from '../context/ThemeContext';

/* Staggered animation style helper */
const fadeIn = (delay) => ({
  animation: `navFadeIn 0.5s cubic-bezier(0.4,0,0.2,1) ${delay}ms both`,
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Home',     path: '/' },
    { label: 'About',    path: '/#about' },
    { label: 'Services', path: '/#services' },
    { label: 'Features', path: '/#features' },
    { label: 'Contact',  path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(21,101,192,0.10)] border-b border-blue-50'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" style={fadeIn(0)}>
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all duration-300 flex-shrink-0 mat-elevation-2">
              <img src={govtLogo} alt="Sri Lanka Government" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight tracking-tight group-hover:text-primary-700 transition-colors duration-300">
                AMH Kalmunai
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium hidden sm:block">
                Ashraff Memorial Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.path}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-700 rounded-xl hover:bg-primary-50 transition-all duration-200 group"
                style={fadeIn(80 + i * 60)}
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-600 rounded-full group-hover:w-3/4 transition-all duration-300 origin-center" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3" style={fadeIn(400)}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <FaSun className="text-amber-400" size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Staff Login */}
            <Link
              to="/staff-login"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary-700 rounded-xl border border-primary-200 hover:bg-primary-50 transition-all duration-200"
            >
              <FaUserShield className="text-xs" />
              Staff
            </Link>

            {/* Patient Login */}
            <Link
              to="/login"
              className="mat-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-700 to-primary-600 mat-elevation-2 hover:mat-elevation-4 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaCalendarCheck className="text-xs" />
              Patient Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-blue-50 px-4 py-3 space-y-1 shadow-lg">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.path}
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 text-gray-600 hover:text-primary-700 hover:bg-primary-50 font-medium rounded-xl transition-all duration-200 text-sm"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-blue-50 space-y-2">
            <Link
              to="/staff-login"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-2.5 border border-primary-200 text-primary-700 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors"
            >
              Staff Login
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-xl font-semibold text-sm mat-elevation-2"
            >
              Patient Login
            </Link>
            <button
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors"
            >
              {isDark ? <FaSun className="text-amber-400" /> : <FaMoon />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
