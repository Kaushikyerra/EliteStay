import React from 'react';
import ScrollAnimation from './ScrollAnimation';

export default function DiningSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Dining Options</h2>
          <div className="section-underline"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1">
            <div className="text-2xl font-bold text-elitestay-teal mb-2">On-Site Restaurant: <span className="font-normal">(Under Process)</span></div>
            <div className="mb-2 text-gray-700">Cuisine: Multi-Cuisine</div>
            <div className="mb-2 text-gray-700">Specialties: Indian, Mughlai, Chinese, European</div>
            <div className="mb-2 text-gray-700">Room Service: Till Midnight</div>
            <div className="mb-2 text-gray-700">Seating Capacity: -</div>
          </div>
          {/* Placeholder for photo */}
          <div className="w-64 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Photo</div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
