import React from 'react';
import galleryImage from '../assets/garden-room.jpg';

export default function GallerySection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading">Gallery</h2>
        <div className="section-underline"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
            Visual Tour
          </h2>
          <p className="text-gray-600 mb-4">
            Take a visual tour of our hotel, rooms, events, and surroundings. Browse our gallery to get a glimpse of the Hotel Imperia Blessings experience.
          </p>
        </div>
        <div>
          <img 
            src={galleryImage} 
            alt="Gallery" 
            className="rounded-lg shadow-lg w-full h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
