import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const usps = [
  { icon: '📍', title: 'Central Location', desc: 'Prime city center access for convenience.' },
  { icon: '🛏️', title: 'Luxury Rooms', desc: 'Elegantly designed rooms for comfort.' },
  { icon: '🤵', title: '24x7 Concierge', desc: 'Personalized service around the clock.' },
  { icon: '🍽️', title: 'Gourmet Dining', desc: 'World-class cuisine and dining experiences.' },
];

export default function WhyChooseUsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Why Choose Us</h2>
          <div className="section-underline"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover what sets EliteStay apart and why guests love staying with us.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border hover:shadow-xl transition">
              <span className="text-5xl mb-4">{usp.icon}</span>
              <h3 className="text-xl font-bold mb-2">{usp.title}</h3>
              <p className="text-gray-600">{usp.desc}</p>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
} 