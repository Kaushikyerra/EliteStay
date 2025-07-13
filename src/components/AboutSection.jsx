import React from 'react';
import hotelEntranceImage from '../assets/Hotel Entrance.jpg';
import ScrollAnimation from './ScrollAnimation';

export default function AboutSection() {
  return (
    <section className="container mx-auto px-4 py-8 overflow-hidden">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">About</h2>
          <div className="section-underline"></div>
        </div>
      </ScrollAnimation>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollAnimation direction="left">
          <div>
            <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 font-semibold">Year Established: 2013</p>
            <p className="text-gray-600 mb-4">
              Hotel Imperia Blessings is a centrally located boutique property in Prayagraj, offering guests a blend of comfort, convenience, and modern amenities. Our commitment is to provide an unparalleled experience that combines modern comfort with timeless elegance.
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Central Location Highlights:</span> Proximity To Airport – 30 Min | Railway Station – 10 Min | Business Hubs – 10 Min | Tourist Spots – 16 Min
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Unique Features:</span> Boutique Design, Personalized Service, Modern Comforts
            </p>
            <p className="text-gray-600">
              From our meticulously designed rooms to our personalized services, every aspect of EliteStay is crafted to ensure our guests feel welcomed, pampered, and inspired.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation direction="right">
          <div>
            <img 
              src={hotelEntranceImage} 
              alt="EliteStay Entrance" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
