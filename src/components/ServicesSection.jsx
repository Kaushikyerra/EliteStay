import React, { useState } from 'react';
import { motion } from 'framer-motion';

import spaServiceImage from '../assets/Spa 1.jpg';
import diningServiceImage from '../assets/Dining 1.jpg';
import conciergeServiceImage from '../assets/Concierge.jpg';
import fitnessServiceImage from '../assets/Fitness.jpg';
import eventServiceImage from '../assets/Event Place1.jpg';

const services = [
  {
    name: 'Spa & Wellness',
    description: 'Indulge in rejuvenating treatments and world-class spa facilities.',
    icon: '💆‍♀️',
    image: spaServiceImage
  },
  {
    name: 'Gourmet Dining',
    description: 'Experience culinary excellence with our Michelin-star chefs.',
    icon: '🍽️',
    image: diningServiceImage
  },
  {
    name: 'Concierge',
    description: 'Personalized assistance for all your travel and local exploration needs.',
    icon: '🤵',
    image: conciergeServiceImage
  },
  {
    name: 'Fitness Center',
    description: 'State-of-the-art gym with personal training and group classes.',
    icon: '🏋️',
    image: fitnessServiceImage
  },
  {
    name: 'Event Spaces',
    description: 'Elegant venues for conferences, weddings, and special occasions.',
    icon: '🎉',
    image: eventServiceImage
  }
];

const specialOffers = [
  {
    title: '10% Off for New Users',
    code: 'NEWGUEST10',
    description: 'Enjoy 10% off your first booking with us!',
    icon: '🎁'
  },
  {
    title: 'Stay 3 Nights, Pay for 2',
    code: 'STAY3PAY2',
    description: 'Book 3 nights and only pay for 2. Limited time offer!',
    icon: '🏨'
  },
  {
    title: 'Free Spa Voucher',
    code: 'FREESPA',
    description: 'Get a complimentary spa voucher with every suite booking.',
    icon: '💆‍♀️'
  }
];

export default function ServicesSection() {
  const [currentService, setCurrentService] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  };

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % specialOffers.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + specialOffers.length) % specialOffers.length);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="section-heading">Services</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          key={currentService}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={services[currentService].image} 
            alt={services[currentService].name}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
        <div className="flex justify-center items-center">
          <motion.div 
            key={currentService}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-elitestay-beige p-8 rounded-lg max-w-lg mx-auto flex flex-col items-center"
          >
            <div className="text-6xl mb-4">{services[currentService].icon}</div>
            <h3 className="text-3xl font-serif text-elitestay-teal mb-4">
              {services[currentService].name}
            </h3>
            <p className="text-gray-600 mb-6">
              {services[currentService].description}
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={prevService}
                className="px-6 py-3 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold"
              >
                ← Previous
              </button>
              <button 
                onClick={nextService}
                className="px-6 py-3 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Special Offers Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif text-elitestay-teal mb-4">
            Special Offers
          </h3>
          <p className="text-gray-600">Exclusive deals for our valued guests</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prevOffer}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 bg-[#FF8D41] text-white rounded-full shadow-lg border border-[#FF8D41] hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 hover:scale-110"
            aria-label="Previous Offer"
          >
            ←
          </button>
          
          <motion.div
            key={currentOffer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#FF8D41] to-orange-500 text-white p-8 rounded-2xl shadow-2xl mx-16"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{specialOffers[currentOffer].icon}</div>
              <h4 className="text-2xl font-bold mb-3">{specialOffers[currentOffer].title}</h4>
              <p className="text-lg mb-6 opacity-90">{specialOffers[currentOffer].description}</p>
              <div className="bg-white text-[#FF8D41] px-6 py-3 rounded-full font-mono text-lg font-bold shadow-lg">
                {specialOffers[currentOffer].code}
              </div>
            </div>
          </motion.div>
          
          <button
            onClick={nextOffer}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 bg-[#FF8D41] text-white rounded-full shadow-lg border border-[#FF8D41] hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 hover:scale-110"
            aria-label="Next Offer"
          >
            →
          </button>
        </div>
        
        {/* Offer indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentOffer(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentOffer 
                  ? 'bg-[#FF8D41] scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
