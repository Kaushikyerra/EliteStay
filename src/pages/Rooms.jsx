import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const roomTypes = [
  {
    name: 'Deluxe Room',
    description: 'Spacious room with city view, perfect for solo travelers or couples.',
    price: 199,
    image: '/assets/deluxe-room.jpg'
  },
  {
    name: 'Executive Suite',
    description: 'Luxurious suite with separate living area and panoramic views.',
    price: 349,
    image: '/assets/executive-suite.jpg'
  },
  {
    name: 'Family Room',
    description: 'Comfortable room with extra space and connecting options.',
    price: 279,
    image: '/assets/family-room.jpg'
  },
  {
    name: 'Presidential Suite',
    description: 'Ultimate luxury with private terrace, jacuzzi, and personal butler.',
    price: 599,
    image: '/assets/presidential-suite.jpg'
  },
  {
    name: 'Garden View Room',
    description: 'Serene room overlooking our lush hotel gardens.',
    price: 229,
    image: '/assets/garden-room.jpg'
  }
];

function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={room.image} 
        alt={room.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-serif text-elitestay-teal mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-elitestay-gold">${room.price}/night</span>
          <button className="px-4 py-2 bg-elitestay-teal text-white rounded-lg hover:bg-elitestay-gold transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  const [checkIn, setCheckIn] = React.useState(new Date());
  const [checkOut, setCheckOut] = React.useState(null);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-serif text-elitestay-teal text-center mb-12">
        Our Rooms
      </h2>
      
      <div className="flex justify-center mb-12">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-bold mb-2">Check-in</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Check-out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {roomTypes.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Rooms; 