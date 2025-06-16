import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--elitestay-beige)', color: 'var(--elitestay-teal)' }} className="p-6">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          {/* This h3 will inherit color from footer's style */}
          <h3 className="text-2xl font-serif mb-4">EliteStay</h3>
          <p className="text-sm">Luxury hotel experience with unparalleled comfort and service.</p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            {/* These links will inherit base color and apply hover with arbitrary value */}
            <Link to="/" className="block hover:text-[var(--elitestay-gold)]">Home</Link>
            <Link to="/rooms" className="block hover:text-[var(--elitestay-gold)]">Rooms</Link>
            <Link to="/services" className="block hover:text-[var(--elitestay-gold)]">Services</Link>
            <Link to="/contact" className="block hover:text-[var(--elitestay-gold)]">Contact</Link>
          </nav>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <p>123 Luxury Lane, Elite City</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: reservations@elitestay.com</p>
          
          <div className="flex space-x-4 mt-4">
            {/* These links will inherit base color and apply hover with arbitrary value */}
            <a href="#" className="hover:text-[var(--elitestay-gold)]">Facebook</a>
            <a href="#" className="hover:text-[var(--elitestay-gold)]">Instagram</a>
            <a href="#" className="hover:text-[var(--elitestay-gold)]">Twitter</a>
          </div>
        </div>
      </div>
      
      <div style={{ borderColor: 'var(--elitestay-teal)' }} className="text-center mt-8 border-t pt-4">
        <p className="text-sm">&copy; 2024 EliteStay. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 