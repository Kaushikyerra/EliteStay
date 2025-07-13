import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import singleRoomView from '../assets/single-room-view.jpg';
import luxuryRoom from '../assets/Luxury room.jpg';
import presidentialSuite from '../assets/presidential-suite.jpg';
import { Link } from 'react-router-dom';

const rooms = [
  { name: 'Deluxe', category: 'Deluxe', size: '250 Sq Ft', bed: 'Double Bed', max: '35 Pax', amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers', bath: 'Attached Bathroom', view: 'City', price: '₹3500 (Weekday) | ₹6000 (Weekend)', image: singleRoomView, desc: 'Spacious Deluxe room with city view, perfect for solo travelers or couples.' },
  { name: 'Super Deluxe', category: 'Super Deluxe', size: '325 Sq Ft', bed: 'Double Bed', max: '35 Pax', amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers', bath: 'Attached Bathroom', view: 'City', price: '₹3500 (Weekday) | ₹6000 (Weekend)', image: luxuryRoom, desc: 'Luxurious Super Deluxe room with extra space and modern amenities.' },
  { name: 'Presidential Suite', category: 'Presidential Suite', size: '400 Sq Ft', bed: 'Double Bed', max: '35 Pax', amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers', bath: 'Attached Bathroom', view: 'City', price: '₹6000 (Weekend)', image: presidentialSuite, desc: 'Ultimate luxury with private terrace, jacuzzi, and personal butler.' },
];

export default function HomeRoomsCarouselSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % rooms.length);
  const prev = () => setCurrent((current - 1 + rooms.length) % rooms.length);
  return (
    <section className="w-full bg-gradient-to-b from-white to-elitestay-beige/30 py-16">
      <ScrollAnimation>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Rooms</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto bg-white/80 rounded-3xl shadow-2xl p-0 mb-8 overflow-hidden">
            {/* Left: Image with carousel arrows */}
            <div className="relative w-full h-80 flex items-center justify-center">
              <img src={rooms[current].image} alt={rooms[current].name} className="w-full h-80 object-cover rounded-l-3xl transition-all duration-500" />
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#FF8D41] hover:text-white text-[#FF8D41] shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all border-2 border-[#FF8D41] z-10">
                &#8592;
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#FF8D41] hover:text-white text-[#FF8D41] shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all border-2 border-[#FF8D41] z-10">
                &#8594;
              </button>
              <div className="absolute top-4 left-4 bg-[#FF8D41] text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold tracking-wide backdrop-blur-md">
                {rooms[current].name}
              </div>
            </div>
            {/* Right: Room details */}
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-2 text-2xl font-bold text-elitestay-teal">{rooms[current].category}</div>
              <div className="mb-2 text-lg text-gray-700">Room Size: <span className="font-semibold">{rooms[current].size}</span></div>
              <div className="mb-2 text-lg text-gray-700">Bed Type: <span className="font-semibold">{rooms[current].bed}</span></div>
              <div className="mb-2 text-lg text-gray-700">Max Occupancy: <span className="font-semibold">{rooms[current].max}</span></div>
              <div className="mb-2 text-lg text-gray-700">Amenities: <span className="font-semibold">{rooms[current].amenities}</span></div>
              <div className="mb-2 text-lg text-gray-700">Bathroom: <span className="font-semibold">{rooms[current].bath}</span></div>
              <div className="mb-2 text-lg text-gray-700">View: <span className="font-semibold">{rooms[current].view}</span></div>
              <div className="mb-2 text-lg text-gray-700">{rooms[current].desc}</div>
              <div className="text-2xl font-bold text-[#FF8D41] mb-2 mt-4">{rooms[current].price}</div>
              <Link to="/rooms" className="inline-block mt-4 px-10 py-4 bg-gradient-to-r from-[#FFD700] to-[#FF8D41] text-white rounded-full shadow-xl border-0 font-semibold text-xl tracking-wide hover:scale-105 hover:from-[#FF8D41] hover:to-[#FFD700] transition-all duration-300">
                View More
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
} 