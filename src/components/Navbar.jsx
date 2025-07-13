import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/banquet', label: 'Banquet' },
  { to: '/dining', label: 'Dining' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/attractions', label: 'Attractions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white shadow-md py-3 px-6 flex items-center justify-between">
      <div className="font-bold text-xl tracking-widest text-yellow-800 uppercase">
        Hotel Imperia Blessings
      </div>
      <div className="hidden md:flex gap-4 items-center">
        {navLinks.map(link => (
          <Link
            key={link.label}
            to={link.to}
            className="text-gray-700 hover:text-yellow-700 font-medium transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <button className="px-4 py-2 bg-yellow-700 text-white rounded shadow hover:bg-yellow-800 transition font-semibold" style={{minWidth: '120px'}}>Book a Stay</button>
        {!user ? (
          <button
            className="px-4 py-2 border border-yellow-700 text-yellow-700 rounded hover:bg-yellow-700 hover:text-white transition font-semibold"
            onClick={() => navigate('/auth')}
          >
            Login/Signup
          </button>
        ) : (
          <button
            className="px-4 py-2 text-gray-700 hover:text-yellow-700 font-medium transition-colors duration-200 font-semibold bg-transparent border-none outline-none"
            onClick={() => navigate('/profile')}
          >
            My Account
          </button>
        )}
      </div>
      {/* Mobile menu can be added here if needed */}
    </nav>
  );
};

export default Navbar; 