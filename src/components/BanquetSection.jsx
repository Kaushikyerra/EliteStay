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
        <div className="grid md:grid-cols-3 gap-16">
          {halls.map((hall, idx) => (
            <div key={idx} className="flex flex-col items-start text-left space-y-2">
              <div className="text-2xl font-bold text-elitestay-teal mb-1">{hall.name}</div>
              <div className="text-gray-700"><span className="font-semibold">Size:</span> {hall.size}</div>
              <div className="text-gray-700"><span className="font-semibold">Capacity:</span> {hall.capacity}</div>
              <div className="text-gray-700"><span className="font-semibold">Inclusions:</span> {hall.inclusions}</div>
              <div className="text-gray-700"><span className="font-semibold">Ideal For:</span> {hall.ideal}</div>
              <div className="text-gray-700"><span className="font-semibold">Catering/Decoration:</span> {hall.catering}</div>
            </div>
          ))}
        </div>
      </ScrollAnimation>
    </section>
  );
}
