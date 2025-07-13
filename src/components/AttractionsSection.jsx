import React from 'react';
import entranceImage from '../assets/Hotel Entrance.jpg';

export default function AttractionsSection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading">Attractions</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
            Explore Prayagraj
          </h2>
          <p className="text-gray-600 mb-4">
            Discover the best of Prayagraj with easy access to tourist spots, shopping, and cultural landmarks. Our central location puts the city at your doorstep.
          </p>
        </div>
        <div>
          <img 
            src={entranceImage} 
            alt="Attractions" 
            className="rounded-lg shadow-lg w-full h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
