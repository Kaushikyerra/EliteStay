import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const offers = [
  { title: 'Suite Surprises', desc: 'Enjoy exclusive deals and packages for your next stay. Limited time only!', code: 'SUITE2024' },
  { title: 'Stay 3 Nights, Pay for 2', desc: 'Book 3 nights and only pay for 2. Limited time offer!', code: 'STAY3PAY2' },
  { title: 'Free Spa Voucher', desc: 'Get a complimentary spa voucher with every suite booking.', code: 'FREESPA' },
];

export default function SpecialOffersSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % offers.length);
  const prev = () => setCurrent((current - 1 + offers.length) % offers.length);
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-8">
          <h2 className="section-heading">Special Offers</h2>
          <div className="section-underline"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-xl bg-gradient-to-br from-[#FF8D41] to-orange-400 text-white rounded-xl shadow-lg p-8 mb-6">
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl">&#8592;</button>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{offers[current].title}</h3>
              <p className="mb-4">{offers[current].desc}</p>
              <div className="bg-white text-[#FF8D41] px-6 py-2 rounded-lg font-semibold inline-block">{offers[current].code}</div>
            </div>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl">&#8594;</button>
          </div>
          <a href="/offers" className="inline-block px-6 py-2 bg-white text-[#FF8D41] rounded-lg font-semibold shadow hover:bg-[#FF8D41] hover:text-white border transition">See All Offers</a>
        </div>
      </ScrollAnimation>
    </section>
  );
} 