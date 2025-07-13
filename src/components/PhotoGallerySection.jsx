import React from 'react';
import ScrollAnimation from './ScrollAnimation';
import facade from '../assets/Hotel Entrance.jpg';
import reception from '../assets/Concierge.jpg';
import room from '../assets/Double room.jpeg';
import hall from '../assets/Event Place.jpg';
import dining from '../assets/Dining.jpg';
import common from '../assets/garden-room.jpg';

const gallery = [
  { label: 'Front Facade', image: facade },
  { label: 'Reception', image: reception },
  { label: 'Rooms', image: room },
  { label: 'Hall / Conference Room', image: hall },
  { label: 'Dining Area', image: dining },
  { label: 'Common Spaces', image: common },
  // Add more or event images as needed
];

export default function PhotoGallerySection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Photo Gallery</h2>
          <div className="section-underline"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gallery.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={item.image} alt={item.label} className="w-full h-56 object-cover" />
              <div className="p-4 text-center font-semibold text-elitestay-teal">{item.label}</div>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
} 