import React from 'react';
import hotelEntranceImage from '../assets/Hotel Entrance.jpg';
import ScrollAnimation from './ScrollAnimation';

export default function AboutSection() {
  return (
    <section className="container mx-auto px-4 py-16 overflow-hidden fade-in">
      <ScrollAnimation>
        <div className="text-center mb-12">
          <h2 className="section-heading">About</h2>
          <div className="section-underline"></div>
        </div>
      </ScrollAnimation>
      <div className="grid md:grid-cols-2 gap-16 items-center premium-card">
        <ScrollAnimation direction="left">
          <div>
            <h2 className="text-5xl font-display text-elitestay-gold mb-8 tracking-wide drop-shadow-lg">Our Story</h2>
            <p className="text-elitestay-teal mb-4 font-semibold text-lg">Year Established: 2013</p>
            <p className="text-gray-700 mb-4 text-lg">
              Hotel Imperia Blessings is a centrally located boutique property in Prayagraj, offering guests a blend of comfort, convenience, and modern amenities. Our commitment is to provide an unparalleled experience that combines modern comfort with timeless elegance.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              <span className="font-semibold text-elitestay-gold">Central Location Highlights:</span> Proximity To Airport – 30 Min | Railway Station – 10 Min | Business Hubs – 10 Min | Tourist Spots – 16 Min
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              <span className="font-semibold text-elitestay-gold">Unique Features:</span> Boutique Design, Personalized Service, Modern Comforts
            </p>
            <p className="text-gray-700 text-lg">
              From our meticulously designed rooms to our personalized services, every aspect of EliteStay is crafted to ensure our guests feel welcomed, pampered, and inspired.
            </p>
            <button className="premium-btn mt-8">Discover More</button>
          </div>
        </ScrollAnimation>
        <ScrollAnimation direction="right">
          <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-elitestay-gold">
            <img 
              src={hotelEntranceImage} 
              alt="EliteStay Entrance" 
              className="rounded-3xl w-full h-96 object-cover scale-105 hover:scale-100 transition-transform duration-700 ease-in-out"
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
