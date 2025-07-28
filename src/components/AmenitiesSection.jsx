import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const amenities = [
  { icon: '📶', title: 'Free WiFi' },
  { icon: '🅿️', title: 'Parking (50 Cars)' },
  { icon: '🛗', title: 'Elevator / Lift' },
  { icon: '🕒', title: '24x7 Front Desk' },
  { icon: '🧹', title: '24 Hrs Housekeeping' },
  { icon: '🔋', title: '24 Hrs Power Backup' },
  { icon: '🛡️', title: 'Security / CCTV' },
  { icon: '🧺', title: 'Laundry (Chargeable)' },
  { icon: '🚌', title: 'Airport Shuttle (Chargeable)' },
  { icon: '🚫', title: 'Pet Friendly: No' },
];

export default function AmenitiesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Our Top Amenities</h2>
          <div className="section-underline"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Enjoy a wide range of amenities designed for your comfort and convenience.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
              <span className="text-4xl mb-2">{amenity.icon}</span>
              <h3 className="text-lg font-semibold">{amenity.title}</h3>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
} 