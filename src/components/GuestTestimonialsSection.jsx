import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const testimonials = [
  { name: 'Priya S.', quote: 'A truly luxurious experience! The staff went above and beyond to make our stay memorable.' },
  { name: 'John D.', quote: 'The best hotel experience I have ever had. Highly recommended!' },
  { name: 'Aisha K.', quote: 'Beautiful rooms and excellent service. Will visit again!' },
];

export default function GuestTestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-8">
          <h2 className="section-heading">Guest Testimonials</h2>
          <div className="section-underline"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mb-6">
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl">&#8592;</button>
            <div className="text-center">
              <p className="italic text-lg mb-4">“{testimonials[current].quote}”</p>
              <div className="font-bold text-elitestay-teal">— {testimonials[current].name}</div>
            </div>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl">&#8594;</button>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
} 