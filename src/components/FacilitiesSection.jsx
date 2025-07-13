import React from 'react';
import fitnessImage from '../assets/Fitness.jpg';

export default function FacilitiesSection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading">Facilities</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
            Modern Amenities
          </h2>
          <p className="text-gray-600 mb-4">
            Enjoy a range of facilities including fitness center, spa, 24x7 front desk, free Wi-Fi, and more. We ensure a comfortable and convenient stay for all guests.
          </p>
        </div>
        <div>
          <img 
            src={fitnessImage} 
            alt="Facilities" 
            className="rounded-lg shadow-lg w-full h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
