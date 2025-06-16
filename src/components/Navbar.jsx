import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{ backgroundColor: 'var(--elitestay-teal)' }} className="text-white shadow-lg py-4 px-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4 px-2">
              <span style={{ color: 'var(--elitestay-gold)' }} className="font-serif text-2xl">EliteStay</span>
            </Link>
            
            <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
              <Link to="/" className="py-4 px-2 text-white hover:text-[var(--elitestay-gold)] transition duration-300">Home</Link>
              <Link to="/about" className="py-4 px-2 text-white hover:text-[var(--elitestay-gold)] transition duration-300">About</Link>
              <Link to="/rooms" className="py-4 px-2 text-white hover:text-[var(--elitestay-gold)] transition duration-300">Rooms</Link>
              <Link to="/services" className="py-4 px-2 text-white hover:text-[var(--elitestay-gold)] transition duration-300">Services</Link>
              <Link to="/contact" className="py-4 px-2 text-white hover:text-[var(--elitestay-gold)] transition duration-300">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <span className="text-white">Welcome, {user.displayName || user.email}</span>
            ) : (
              <Link 
                to="/auth" 
                style={{ backgroundColor: 'var(--elitestay-gold)' }}
                className="py-2 px-4 text-white rounded hover:bg-[var(--elitestay-teal)] transition duration-300"
              >
                Login
              </Link>
            )}

            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className="outline-none mobile-menu-button"
              >
                <svg 
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 