import React from 'react';
import ScrollAnimation from './ScrollAnimation';
import businessPortrait from '../assets/Business-portrait-23.webp';
import concierge from '../assets/Concierge.jpg';
import spa1 from '../assets/Spa 1.jpg';

const testimonials = [
  { name: 'Mary Watson', quote: 'EliteStay is the best! An extraordinary, affordable stay. Highly recommended.', rating: 5, photo: businessPortrait },
  { name: 'Rahul Sharma', quote: 'Amazing hospitality and beautiful rooms. Will visit again!', rating: 5, photo: concierge },
  { name: 'Aisha Khan', quote: 'Loved the amenities and the food. A perfect getaway.', rating: 4, photo: spa1 },
];

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Testimonials</h2>
          <div className="section-underline"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Hear from our happy guests!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border hover:shadow-xl transition">
              <img src={t.photo} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#FF8D41]" />
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <div className="font-bold text-elitestay-teal mb-2">{t.name}</div>
              <div className="flex justify-center mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#FF8D41] text-xl">★</span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-xl">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
} 