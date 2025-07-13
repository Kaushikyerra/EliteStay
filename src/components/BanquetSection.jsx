import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const halls = [
  { name: 'Venus Hall', size: '4416 Sq Ft', capacity: 'Theatre: 250–300 | U-Shape: 120 | Cluster: 120–150', inclusions: 'AV System, Projector, Mics (On Request, Chargeable)', ideal: 'Weddings, Meetings, Seminars (200–400 Pax)', catering: 'Available On Request', photo: '' },
  { name: 'Jupiter Hall', size: '1998 Sq Ft', capacity: 'Theatre: 100–150 | U-Shape: 60 | Cluster: 60–80', inclusions: 'AV System, Projector, Mics (On Request, Chargeable)', ideal: 'Meetings, Seminars', catering: 'Available On Request', photo: '' },
  { name: 'Board Room', size: '714 Sq Ft', capacity: 'Board: 20–30', inclusions: 'AV System, Projector, Mics (On Request, Chargeable)', ideal: 'Board Meetings', catering: 'Available On Request', photo: '' },
];

export default function BanquetSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">Banquet & Conference Facilities</h2>
          <div className="section-underline"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {halls.map((hall, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border hover:shadow-xl transition">
              <div className="text-2xl font-bold text-elitestay-teal mb-2">{hall.name}</div>
              <div className="mb-2 text-gray-700">Size: {hall.size}</div>
              <div className="mb-2 text-gray-700">Capacity: {hall.capacity}</div>
              <div className="mb-2 text-gray-700">Inclusions: {hall.inclusions}</div>
              <div className="mb-2 text-gray-700">Ideal For: {hall.ideal}</div>
              <div className="mb-2 text-gray-700">Catering/Decoration: {hall.catering}</div>
              {/* Placeholder for photo */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mt-4 flex items-center justify-center text-gray-400">Photo</div>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
}
