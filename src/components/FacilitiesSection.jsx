import React from 'react';
import fitness from '../assets/Fitness.jpg';
import spa from '../assets/Spa.jpg';
import dining from '../assets/Dining.jpg';
import concierge from '../assets/Concierge.jpg';
import eventPlace from '../assets/Event Place.jpg';
import garden from '../assets/gall.jpg';
import hotelEntrance from '../assets/Hotel Entrance.jpg';

const facilities = [
  {
    icon: '💆‍♀️',
    image: spa,
    title: 'Spa & Wellness',
    desc: 'Rejuvenate your senses at our world-class spa, offering a range of holistic therapies and treatments in a tranquil setting.'
  },
  {
    icon: '🏋️',
    image: fitness,
    title: 'Fitness Center',
    desc: 'Stay fit with state-of-the-art equipment, personal trainers, and group classes in our modern gym.'
  },
  {
    icon: '🍽️',
    image: dining,
    title: 'Gourmet Dining',
    desc: 'Savor culinary delights crafted by expert chefs, featuring global cuisines and local flavors in an elegant ambiance.'
  },
  {
    icon: '🤵',
    image: concierge,
    title: 'Concierge Service',
    desc: 'Our 24x7 concierge ensures every need is met, from travel arrangements to personalized recommendations.'
  },
  {
    icon: '💼',
    image: hotelEntrance,
    title: 'Business Center',
    desc: 'Fully equipped workspaces, high-speed internet, and secretarial services for seamless business operations.'
  },
  {
    icon: '🎉',
    image: eventPlace,
    title: 'Banquet & Conference Halls',
    desc: 'Host memorable events in our versatile venues, perfect for weddings, conferences, and celebrations.'
  },
  {
    icon: '📶',
    image: garden,
    title: 'Free High-Speed Wi-Fi',
    desc: 'Complimentary high-speed internet access throughout the property.'
  },
  {
    icon: '🛎️',
    image: concierge,
    title: '24x7 Room Service',
    desc: 'Enjoy gourmet meals and snacks delivered to your room, any time of day or night.'
  },
  {
    icon: '🅿️',
    image: hotelEntrance,
    title: 'Ample Parking',
    desc: 'Secure, spacious parking for guests and visitors.'
  },
  {
    icon: '🧹',
    image: garden,
    title: 'Housekeeping & Laundry',
    desc: 'Daily housekeeping and express laundry services for your comfort.'
  },
  {
    icon: '🛡️',
    image: hotelEntrance,
    title: '24x7 Security',
    desc: 'Advanced surveillance and professional security staff for your peace of mind.'
  },
];

export default function FacilitiesSection() {
  return (
    <section className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="section-heading text-4xl font-serif">Our Facilities</h2>
        <div className="section-underline mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">Experience a blend of luxury, comfort, and convenience with our thoughtfully curated facilities, designed to cater to every guest’s need.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {facilities.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center border border-gray-100 group">
            <div className="relative w-full h-40 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 left-2 text-3xl bg-white/80 rounded-full p-2 shadow">{item.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-elitestay-teal mb-2 font-serif">{item.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
