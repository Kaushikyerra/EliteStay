import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { state } = location;
  const selectedRoom = state?.room;
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [checkIn, setCheckIn] = useState(selectedRoom?.checkIn || null);
  const [checkOut, setCheckOut] = useState(selectedRoom?.checkOut || null);
  const [editableRoomType, setEditableRoomType] = useState(selectedRoom?.name || '');
  const [editableRooms, setEditableRooms] = useState(selectedRoom?.rooms || 1);
  const [editableAdults, setEditableAdults] = useState(selectedRoom?.adults || 1);
  const [editableChildren, setEditableChildren] = useState(selectedRoom?.children || 0);

  useEffect(() => {
    if (user) {
      setValue('fullName', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  if (!selectedRoom) {
    useEffect(() => {
      // Redirect if no room data is found, e.g., if user directly navigates
      navigate('/rooms', { replace: true });
    }, [navigate]);
    return null; // Or a loading/error message
  }

  const onSubmit = async (data) => {
    if (!user) {
      alert('Please log in to complete your booking.');
      navigate('/auth');
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        roomName: editableRoomType,
        roomPrice: selectedRoomPrice,
        checkInDate: checkIn ? checkIn.toDateString() : 'N/A',
        checkOutDate: checkOut ? checkOut.toDateString() : 'N/A',
        adults: editableAdults,
        children: editableChildren,
        rooms: editableRooms,
        promoCode: selectedRoom?.promoCode || '',
        ...data,
        timestamp: new Date(),
      };
      await addDoc(collection(firestore, 'bookings'), bookingData);
      setBookingSuccessful(true);
      alert('Booking successful! Thank you for choosing EliteStay.');
      reset();
    } catch (error) {
      console.error('Error during booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  useEffect(() => {
    if (bookingSuccessful) {
      navigate('/profile');
    }
  }, [bookingSuccessful, navigate]);

  if (bookingSuccessful) {
    return null;
  }

  // Room options (should match template)
  const roomOptions = [
    'Deluxe',
    'Super Deluxe',
    'Presidential Suite',
  ];

  // Find the selected room details from template
  const roomDetails = roomOptions.map(name =>
    name === 'Deluxe' ? {
      name: 'Deluxe',
      price: '₹3500 (Weekday) | ₹6000 (Weekend)',
    } : name === 'Super Deluxe' ? {
      name: 'Super Deluxe',
      price: '₹3500 (Weekday) | ₹6000 (Weekend)',
    } : {
      name: 'Presidential Suite',
      price: '₹6000 (Weekend)',
    }
  );
  const selectedRoomDetails = roomDetails.find(r => r.name === editableRoomType);

  // Helper to get correct price based on check-in date
  function getPrice(roomType, checkInDate) {
    if (!checkInDate) return '';
    const day = checkInDate.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;
    if (roomType === 'Presidential Suite') return '₹6000 (Weekend)';
    if (roomType === 'Deluxe' || roomType === 'Super Deluxe') {
      return isWeekend ? '₹6000 (Weekend)' : '₹3500 (Weekday)';
    }
    return '';
  }

  const selectedRoomPrice = getPrice(editableRoomType, checkIn);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="section-heading">Confirm Your Booking</h2>
        <div className="section-underline"></div>
      </div>
      {/* Booking Details Summary & Edit */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-8">
        <h3 className="text-2xl font-serif text-elitestay-teal mb-6">Booking Details</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors bg-white"
              value={editableRoomType}
              onChange={e => setEditableRoomType(e.target.value)}
            >
              {roomOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50">{selectedRoomPrice}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <DatePicker
              selected={checkIn}
              onChange={date => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
              placeholderText="Select check-in date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
            <DatePicker
              selected={checkOut}
              onChange={date => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
              placeholderText="Select check-out date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
            <input
              type="number"
              min={1}
              value={editableRooms}
              onChange={e => setEditableRooms(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              min={1}
              value={editableAdults}
              onChange={e => setEditableAdults(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
            <input
              type="number"
              min={0}
              value={editableChildren}
              onChange={e => setEditableChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="px-10 py-4 bg-gradient-to-r from-[#FFD700] to-[#FF8D41] text-white rounded-full shadow-xl border-0 font-semibold text-xl tracking-wide hover:scale-105 hover:from-[#FF8D41] hover:to-[#FFD700] transition-all duration-300">
            Proceed to Payment
          </button>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h3 className="text-2xl font-serif text-elitestay-teal mb-6">Guest Information</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', { required: 'Full Name is required' })}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs italic mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { required: 'Phone number is required' })}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone.message}</p>}
          </div>

          <h3 className="text-2xl font-serif text-elitestay-teal mt-10 mb-4">Payment Information</h3>
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              {...register('cardNumber', { 
                required: 'Card number is required',
                pattern: { value: /^\d{16}$/, message: 'Card number must be 16 digits' }
              })}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.cardNumber ? 'border-red-500' : ''}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-xs italic mt-1">{errors.cardNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-gray-700 text-sm font-bold mb-2">Expiry Date (MM/YY)</label>
              <input
                type="text"
                id="expiry"
                {...register('expiry', { 
                  required: 'Expiry date is required',
                  pattern: { value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: 'Format MM/YY' }
                })}
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.expiry ? 'border-red-500' : ''}`}
              />
              {errors.expiry && <p className="text-red-500 text-xs italic mt-1">{errors.expiry.message}</p>}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
              <input
                type="text"
                id="cvv"
                {...register('cvv', { 
                  required: 'CVV is required',
                  pattern: { value: /^\d{3,4}$/, message: 'CVV must be 3 or 4 digits' }
                })}
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.cvv ? 'border-red-500' : ''}`}
              />
              {errors.cvv && <p className="text-red-500 text-xs italic mt-1">{errors.cvv.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8D41] text-white py-3 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300 transform hover:scale-105 font-semibold mt-6"
          >
            Confirm Booking & Pay
          </button>
        </form>
      </div>
    </section>
  );
} 