import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserMd, FaCalendarCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import govtLogo from '../assets/govt_logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/#about' },
    { label: 'Services', path: '/#services' },
    { label: 'Features', path: '/#features' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080e24]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-primary-400/30 transition-all duration-300 flex-shrink-0">
              <img
                src={govtLogo}
                alt="Sri Lanka Government"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base sm:text-lg leading-tight tracking-tight group-hover:text-primary-300 transition-colors duration-300">
                AMH Kalmunai
              </span>
              <span className="text-[10px] sm:text-xs text-blue-300/50 font-medium hidden sm:block">
                Ashraff Memorial Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.path}
                className="relative px-3.5 py-2 text-sm font-medium text-blue-200/70 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-300 group"
              >
                {l.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary-400 to-teal-400 rounded-full group-hover:w-4/5 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaCalendarCheck className="relative z-10 text-xs" />
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-blue-200/70 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#080e24]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.path}
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 text-blue-200/70 hover:text-white hover:bg-white/[0.06] font-medium rounded-lg transition-all duration-200 text-sm"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/20"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
