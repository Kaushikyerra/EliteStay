import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
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
    price: '₹5000',
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
    price: '₹7000',
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
    price: '₹12000',
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
    <section className="relative min-h-screen bg-gradient-to-br from-elitestay-beige via-elitestay-white to-elitestay-light-gold overflow-x-hidden">
      {/* Parallax Hero Section */}
      <div className="relative h-[420px] md:h-[520px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${luxuryRoom})`, transform: 'translateZ(0)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" style={{backdropFilter: 'blur(2px)'}}></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight drop-shadow-lg animate-fade-in">Our Rooms</h1>
          <p className="text-2xl md:text-3xl font-light text-gray-200 mb-10 max-w-3xl mx-auto tracking-wide drop-shadow animate-fade-in">Luxury, Comfort, and Style Await</p>
        </div>
      </div>

      {/* Booking/Search Bar - Floating over hero */}
      <form onSubmit={handleSearch} className="absolute left-1/2 top-[380px] md:top-[480px] -translate-x-1/2 z-30 w-full max-w-5xl">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-elitestay-gold px-8 py-6 flex flex-col md:flex-row gap-4 items-center premium-card animate-fade-in">
          {/* Room Type Dropdown */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-medium text-gray-700 mb-1">Room Type</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-gold transition-colors bg-white"
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
          <div className="flex-1 min-w-[160px] relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
            <button
              type="button"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left focus:outline-none focus:border-elitestay-gold transition-colors bg-white"
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
          <div className="flex-1 min-w-[160px] relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
            <button
              type="button"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left focus:outline-none focus:border-elitestay-gold transition-colors bg-white"
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
          {/* Counters */}
          <div className="flex flex-row gap-4">
            <Counter label="Rooms" value={rooms} setValue={setRooms} min={1} />
            <Counter label="Adults" value={adults} setValue={setAdults} min={1} />
            <Counter label="Children" value={children} setValue={setChildren} min={0} />
          </div>
          {/* Search Button */}
          <div className="flex-1 min-w-[160px] text-center">
            <button 
              type="submit" 
              className="premium-btn w-full py-3 text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Room Carousel Section */}
      <div className="pt-[320px] md:pt-[400px] pb-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading animate-fade-in">Our Luxury Rooms</h2>
          <div className="section-underline animate-fade-in"></div>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto animate-fade-in">
            Discover our luxurious accommodations designed for your ultimate comfort and relaxation
          </p>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.15}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 200, modifier: 2.5, slideShadows: false }}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-5xl mx-auto premium-card bg-white/80 shadow-2xl rounded-3xl animate-fade-in"
          style={{ padding: '2rem 0' }}
          breakpoints={{
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 2.5 },
          }}
        >
          {filteredRooms.map((room, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-lg border-2 border-elitestay-gold transition-transform duration-500 hover:scale-105">
                <div className="relative w-full h-80 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-block bg-elitestay-gold/90 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold tracking-wide backdrop-blur-md">
                      {room.name}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <h3 className="text-2xl font-display text-elitestay-gold mb-3 font-bold drop-shadow-lg">{room.name}</h3>
                  <div className="mb-2 text-gray-700">Room Size: <span className="font-semibold">{room.size}</span></div>
                  <div className="mb-2 text-gray-700">Bed Type: <span className="font-semibold">{room.bed}</span></div>
                  <div className="mb-2 text-gray-700">Max Occupancy: <span className="font-semibold">{room.max}</span></div>
                  <div className="mb-2 text-gray-700">Amenities: <span className="font-semibold">{room.amenities}</span></div>
                  <div className="mb-2 text-gray-700">Bathroom: <span className="font-semibold">{room.bath}</span></div>
                  <div className="mb-2 text-gray-700">View: <span className="font-semibold">{room.view}</span></div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{room.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-3xl font-bold text-elitestay-gold font-display drop-shadow">{room.price}</span>
                    <button 
                      onClick={() => handleBookNow(room)}
                      className="premium-btn px-8 py-3 text-lg shadow-xl hover:scale-105 transition-transform"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 