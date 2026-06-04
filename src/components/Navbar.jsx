import { Link } from 'react-router-dom';
import { FaHospital, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/#about' },
    { label: 'Services', path: '/#services' },
    { label: 'Features', path: '/#features' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-md">
              <FaHospital className="text-white text-lg" />
            </div>
            <div>
              <span className="font-bold text-primary-700 text-lg leading-tight block">AMH</span>
              <span className="text-xs text-gray-500 hidden sm:block">Ashraff Memorial Hospital</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.label} href={l.path} className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Login
            </Link>
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md hover:shadow-lg transition-all">
              Book Appointment
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600" aria-label="Toggle menu">
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a key={l.label} href={l.path} onClick={() => setOpen(false)} className="block py-2 text-gray-600 font-medium">
                {l.label}
              </a>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="block w-full text-center py-2.5 bg-primary-600 text-white rounded-lg font-semibold">
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
