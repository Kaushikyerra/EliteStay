import React from 'react';
import dining from '../assets/Dining.jpg';
import spa from '../assets/Spa.jpg';
import eventPlace from '../assets/Event Place.jpg';
import hotelEntrance from '../assets/Hotel Entrance.jpg';
import garden from '../assets/gall.jpg';
import banquet from "./BanquetSection.jsx";

const images = [
  { src: dining, alt: 'Dining Area' },
  { src: spa, alt: 'Spa' },
  { src: eventPlace, alt: 'Event Place' },
  { src: hotelEntrance, alt: 'Hotel Entrance' },
  { src: garden, alt: 'Hotel Garden' },
];

export default function GallerySection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading">Gallery</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
