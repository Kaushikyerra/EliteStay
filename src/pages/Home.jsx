import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import hotelAnimation from '../assets/hotel-animation.json'; // You'll need to add this Lottie file

function Home() {
  return (
    <div className="min-h-screen bg-elitestay-white">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center">
        <div>
          <h1 className="text-5xl font-serif text-elitestay-teal mb-6">
            Discover Luxury at EliteStay
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience unparalleled comfort, elegance, and world-class hospitality.
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/rooms" 
              className="px-6 py-3 bg-elitestay-gold text-white rounded-lg hover:bg-elitestay-teal transition duration-300"
            >
              View Rooms
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 border border-elitestay-teal text-elitestay-teal rounded-lg hover:bg-elitestay-teal hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <Lottie 
            animationData={hotelAnimation} 
            loop 
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Home; 