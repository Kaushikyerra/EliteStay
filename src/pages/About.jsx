import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 mb-4">
            EliteStay was founded with a vision to redefine luxury hospitality. 
            Our commitment is to provide an unparalleled experience that combines 
            modern comfort with timeless elegance.
          </p>
          <p className="text-gray-600">
            From our meticulously designed rooms to our personalized services, 
            every aspect of EliteStay is crafted to ensure our guests feel 
            welcomed, pampered, and inspired.
          </p>
        </div>
        <div>
          <img 
            src="/assets/hotel-interior.jpg" 
            alt="EliteStay Interior" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default About; 