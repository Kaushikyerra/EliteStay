import React from 'react';
import eventPlace1 from '../assets/Event Place1.jpg';
import dining1 from '../assets/Dining 1.jpg';
import meetings from '../assets/meetings.jpg';
import gardenRoom from '../assets/garden-room.jpg';

const attractions = [
  { src: eventPlace1, alt: 'Event Venue', label: 'Event Venue' },
  { src: dining1, alt: 'Fine Dining', label: 'Fine Dining' },
  { src: meetings, alt: 'Meeting Spaces', label: 'Meeting Spaces' },
  { src: gardenRoom, alt: 'Garden Room', label: 'Garden Room' },
];

export default function AttractionsSection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading">Attractions</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {attractions.map((item, idx) => (
          <div key={idx} className="rounded-xl shadow-lg overflow-hidden bg-white">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <span className="font-semibold text-elitestay-teal text-lg">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
