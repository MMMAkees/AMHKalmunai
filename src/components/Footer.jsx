import { Link } from 'react-router-dom';
import { FaHospital, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { hospitalInfo, quickLinks } from '../data/hospital';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <FaHospital className="text-teal-300 text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{hospitalInfo.shortName}</h3>
                <p className="text-sm text-blue-200">{hospitalInfo.name}</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Digitizing healthcare for a healthier Eastern Province.
            </p>
            <div className="flex gap-3 mt-4">
              {[FaFacebook, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-teal-300 mt-0.5 shrink-0" />
                {hospitalInfo.address}
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-teal-300 shrink-0" />
                {hospitalInfo.phone}
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-teal-300 shrink-0" />
                {hospitalInfo.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Emergency Contact</h4>
            <div className="bg-red-600/20 border border-red-400/30 rounded-xl p-4">
              <p className="text-red-200 text-sm mb-1">24/7 Emergency Hotline</p>
              <p className="text-2xl font-bold text-white">{hospitalInfo.emergency}</p>
              <p className="text-red-200 text-xs mt-2">For medical emergencies only</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
          </p>
          <p className="text-blue-300 text-xs">AMH Smart Patient Flow & Queue Management System v1.0</p>
        </div>
      </div>
    </footer>
  );
}
