import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-12 pb-6 border-t border-yellow-700/30 font-serif">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-serif mb-2 tracking-widest text-yellow-800 uppercase">EliteStay</h3>
          <p className="text-sm text-gray-600">Luxury hotel experience with unparalleled comfort and service.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-yellow-700 text-base">Quick Links</h4>
          <nav className="space-y-1">
            <Link to="/" className="block text-gray-700 hover:text-yellow-700 transition text-base">Home</Link>
            <Link to="/rooms" className="block text-gray-700 hover:text-yellow-700 transition text-base">Rooms</Link>
            <Link to="/services" className="block text-gray-700 hover:text-yellow-700 transition text-base">Services</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-yellow-700 transition text-base">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-yellow-700 text-base">Contact Info</h4>
          <p className="text-gray-600 text-sm">123 Luxury Lane, Elite City</p>
          <p className="text-gray-600 text-sm">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-600 text-sm">Email: reservations@elitestay.com</p>
          <div className="flex space-x-3 mt-3">
            <a href="#" className="hover:text-yellow-700 text-gray-700 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="#" className="hover:text-yellow-700 text-gray-700 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.333 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.353 2.393 1.333 3.373.98.98 2.092 1.274 3.373 1.333C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.353 3.373-1.333.98-.98 1.274-2.092 1.333-3.373.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.353-2.393-1.333-3.373-.98-.98-2.092-1.274-3.373-1.333C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="#" className="hover:text-yellow-700 text-gray-700 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-yellow-700/20 pt-4">
        <span className="text-yellow-800 text-lg font-serif font-bold tracking-widest uppercase">EliteStay</span>
        <span className="block text-xs text-gray-600 mt-1">&copy; 2024 EliteStay. All Rights Reserved.</span>
        <div className="flex flex-wrap justify-center items-center space-x-4 mt-3 text-sm">
          <Link to="/privacy-policy" className="text-gray-700 hover:text-yellow-700 transition">Privacy Policy</Link>
          <span className="text-yellow-700">|</span>
          <Link to="/terms-of-use" className="text-gray-700 hover:text-yellow-700 transition">Terms of Use</Link>
          <span className="text-yellow-700">|</span>
          <Link to="/refund-cancellation-policy" className="text-gray-700 hover:text-yellow-700 transition">Refund & Cancellation Policy</Link>
          <span className="text-yellow-700">|</span>
          <Link to="/cookie-policy" className="text-gray-700 hover:text-yellow-700 transition">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 