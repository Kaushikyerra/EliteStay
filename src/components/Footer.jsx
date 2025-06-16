import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-elitestay-beige text-elitestay-teal py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-serif mb-4">EliteStay</h3>
          <p className="text-sm">Luxury hotel experience with unparalleled comfort and service.</p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link to="/" className="block hover:text-elitestay-gold">Home</Link>
            <Link to="/rooms" className="block hover:text-elitestay-gold">Rooms</Link>
            <Link to="/services" className="block hover:text-elitestay-gold">Services</Link>
            <Link to="/contact" className="block hover:text-elitestay-gold">Contact</Link>
          </nav>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <p>123 Luxury Lane, Elite City</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: reservations@elitestay.com</p>
          
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-elitestay-teal hover:text-elitestay-gold">Facebook</a>
            <a href="#" className="text-elitestay-teal hover:text-elitestay-gold">Instagram</a>
            <a href="#" className="text-elitestay-teal hover:text-elitestay-gold">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 border-t border-elitestay-teal pt-4">
        <p className="text-sm">&copy; 2024 EliteStay. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 