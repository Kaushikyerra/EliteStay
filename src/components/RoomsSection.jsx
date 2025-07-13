import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

import singleRoomView from '../assets/single-room-view.jpg';
import singleRoom from '../assets/single room.jpeg';
import luxuryRoom from '../assets/Luxury room.jpg';
import doubleRoom from '../assets/Double room.jpeg';
import presidentialSuite from '../assets/presidential-suite.jpg';
import gardenRoom from '../assets/garden-room.jpg';

const roomTypes = [
  'Deluxe',
  'Super Deluxe',
  'Presidential Suite',
];

const roomData = [
  {
    name: 'Deluxe',
    description: 'Spacious Deluxe room with city view, perfect for solo travelers or couples.',
    size: '250 Sq Ft',
    bed: 'Double Bed',
    max: '35 Pax',
    amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers',
    bath: 'Attached Bathroom',
    view: 'City',
    price: '₹5000', // Single price
    image: singleRoomView
  },
  {
    name: 'Super Deluxe',
    description: 'Luxurious Super Deluxe room with extra space and modern amenities.',
    size: '325 Sq Ft',
    bed: 'Double Bed',
    max: '35 Pax',
    amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers',
    bath: 'Attached Bathroom',
    view: 'City',
    price: '₹7000', // Single price
    image: luxuryRoom
  },
  {
    name: 'Presidential Suite',
    description: 'Ultimate luxury with private terrace, jacuzzi, and personal butler.',
    size: '400 Sq Ft',
    bed: 'Double Bed',
    max: '35 Pax',
    amenities: 'Wi-Fi, AC, TV, Luggage Rack, Work Desk, Wardrobe, Tea & Coffee Makers',
    bath: 'Attached Bathroom',
    view: 'City',
    price: '₹12000', // Single price
    image: presidentialSuite
  },
];

function Counter({ label, value, setValue, min = 1 }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-600 mb-2 font-medium">{label}</span>
      <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm">
        <button
          type="button"
          className="px-3 text-lg text-gray-600 hover:text-elitestay-teal hover:bg-gray-50 rounded-full transition-colors"
          onClick={() => setValue(Math.max(min, value - 1))}
        >
          -
        </button>
        <span className="mx-4 w-6 text-center font-semibold text-gray-800">{value}</span>
        <button
          type="button"
          className="px-3 text-lg text-gray-600 hover:text-elitestay-teal hover:bg-gray-50 rounded-full transition-colors"
          onClick={() => setValue(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function RoomsSection() {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState(roomData);

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = roomData;
    if (selectedRoomType) {
      filtered = filtered.filter((room) => room.name === selectedRoomType);
    }
    setFilteredRooms(filtered);
  };

  const handleBookNow = (room) => {
    if (!user) {
      alert('Please log in to book a room.');
      navigate('/auth');
      return;
    }
    navigate('/booking', {
      state: {
        room: {
          ...room,
          checkIn,
          checkOut,
          rooms,
          adults,
          children,
          promoCode,
        },
      },
    });
  };

  return (
    <section className="py-16 px-4 md:px-8 scroll-mt-24" id="rooms-section">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="section-heading">Rooms</h2>
        <div className="section-underline"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover our luxurious accommodations designed for your ultimate comfort and relaxation
        </p>
      </div>
      
      {/* Booking/Search Bar */}
      <form onSubmit={handleSearch} className="mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-serif text-elitestay-teal mb-6 text-center">Find Your Perfect Stay</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Room Type Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Room Type</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors bg-white"
                  value={selectedRoomType}
                  onChange={e => setSelectedRoomType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Check-in Date Picker */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Check-in</label>
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left focus:outline-none focus:border-elitestay-teal transition-colors bg-white"
                  onClick={() => {
                    setShowCheckIn(v => !v);
                    setShowCheckOut(false);
                  }}
                >
                  {checkIn ? checkIn.toLocaleDateString() : 'Select Date'}
                </button>
                {showCheckIn && (
                  <div className="absolute z-50 top-full left-0 mt-2 bg-white shadow-xl rounded-lg border">
                    <DatePicker
                      selected={checkIn}
                      onChange={date => {
                        setCheckIn(date);
                        setShowCheckIn(false);
                      }}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={new Date()}
                      inline
                    />
                  </div>
                )}
              </div>
              
              {/* Check-out Date Picker */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Check-out</label>
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left focus:outline-none focus:border-elitestay-teal transition-colors bg-white"
                  onClick={() => {
                    setShowCheckOut(v => !v);
                    setShowCheckIn(false);
                  }}
                >
                  {checkOut ? checkOut.toLocaleDateString() : 'Select Date'}
                </button>
                {showCheckOut && (
                  <div className="absolute z-50 top-full left-0 mt-2 bg-white shadow-xl rounded-lg border">
                    <DatePicker
                      selected={checkOut}
                      onChange={date => {
                        setCheckOut(date);
                        setShowCheckOut(false);
                      }}
                      selectsEnd
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn || new Date()}
                      inline
                    />
                  </div>
                )}
              </div>
              
              {/* Promo Code */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Promo Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                />
              </div>
            </div>
            
            {/* Counters Row */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Counter label="Rooms" value={rooms} setValue={setRooms} min={1} />
              <Counter label="Adults" value={adults} setValue={setAdults} min={1} />
              <Counter label="Children" value={children} setValue={setChildren} min={0} />
            </div>
            
            {/* Search Button */}
            <div className="mt-8 text-center">
              <button 
                type="submit" 
                className="bg-[#FF8D41] text-white px-12 py-4 font-semibold rounded-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 shadow-lg border border-[#FF8D41]"
              >
                Search Available Rooms
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Room cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 flex flex-col">
            <div className="flex-1 w-full h-80 overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover object-center" />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-serif text-elitestay-teal mb-3 font-bold">{room.name}</h3>
              <div className="mb-2 text-gray-700">Room Size: <span className="font-semibold">{room.size}</span></div>
              <div className="mb-2 text-gray-700">Bed Type: <span className="font-semibold">{room.bed}</span></div>
              <div className="mb-2 text-gray-700">Max Occupancy: <span className="font-semibold">{room.max}</span></div>
              <div className="mb-2 text-gray-700">Amenities: <span className="font-semibold">{room.amenities}</span></div>
              <div className="mb-2 text-gray-700">Bathroom: <span className="font-semibold">{room.bath}</span></div>
              <div className="mb-2 text-gray-700">View: <span className="font-semibold">{room.view}</span></div>
              <p className="text-gray-600 mb-4 leading-relaxed">{room.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-3xl font-bold text-[#FFD700] font-serif drop-shadow">{room.price}</span>
                <button 
                  onClick={() => handleBookNow(room)}
                  className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FF8D41] text-white rounded-full shadow-lg hover:scale-105 hover:from-[#FF8D41] hover:to-[#FFD700] transition-all duration-300 border-0 font-semibold text-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/*
.section-heading {
  @apply text-3xl md:text-4xl font-bold text-black mb-2;
}
.section-underline {
  @apply mx-auto w-20 h-1 rounded bg-[#FF8D41];
}
*/ 