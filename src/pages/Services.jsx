import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    name: 'Spa & Wellness',
    description: 'Indulge in rejuvenating treatments and world-class spa facilities.',
    icon: '💆‍♀️',
    image: '/assets/spa-service.jpg'
  },
  {
    name: 'Gourmet Dining',
    description: 'Experience culinary excellence with our Michelin-star chefs.',
    icon: '🍽️',
    image: '/assets/dining-service.jpg'
  },
  {
    name: 'Concierge',
    description: 'Personalized assistance for all your travel and local exploration needs.',
    icon: '🤵',
    image: '/assets/concierge-service.jpg'
  },
  {
    name: 'Fitness Center',
    description: 'State-of-the-art gym with personal training and group classes.',
    icon: '🏋️',
    image: '/assets/fitness-service.jpg'
  },
  {
    name: 'Event Spaces',
    description: 'Elegant venues for conferences, weddings, and special occasions.',
    icon: '🎉',
    image: '/assets/event-service.jpg'
  }
];

function Services() {
  const [currentService, setCurrentService] = useState(0);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-serif text-elitestay-teal text-center mb-12">
        Our Services
      </h2>

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

        <div>
          <motion.div 
            key={currentService}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-elitestay-beige p-8 rounded-lg"
          >
            <div className="text-6xl mb-4">{services[currentService].icon}</div>
            <h3 className="text-3xl font-serif text-elitestay-teal mb-4">
              {services[currentService].name}
            </h3>
            <p className="text-gray-600 mb-6">
              {services[currentService].description}
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={prevService}
                className="px-4 py-2 bg-elitestay-teal text-white rounded-lg hover:bg-elitestay-gold transition"
              >
                Previous
              </button>
              <button 
                onClick={nextService}
                className="px-4 py-2 bg-elitestay-teal text-white rounded-lg hover:bg-elitestay-gold transition"
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-serif text-elitestay-teal mb-6">
          Special Offer
        </h3>
        <div className="bg-elitestay-gold text-white px-8 py-6 rounded-lg inline-block">
          <p className="text-xl">10% Off for New Users</p>
          <p className="text-sm">Use code: NEWGUEST10</p>
        </div>
      </div>
    </div>
  );
}

export default Services; 