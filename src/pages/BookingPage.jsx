import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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
  const [isPaying, setIsPaying] = useState(false);

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

  // Razorpay handler
  const handleRazorpayPayment = async () => {
    if (!user) {
      alert('Please log in to complete your booking.');
      navigate('/auth');
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    setIsPaying(true);
    try {
      // Calculate amount (remove non-numeric chars, get per room, multiply by rooms)
      const priceStr = selectedRoomPrice.match(/\d+/g)?.join('') || '0';
      const amount = Number(priceStr) * editableRooms;
      if (!amount) {
        alert('Invalid room price.');
        setIsPaying(false);
        return;
      }
      // Create order on backend
      const { data } = await axios.post('http://localhost:5000/api/create-order', {
        amount,
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
      });
      if (!data.success) throw new Error('Failed to create order');
      const order = data.order;
      // Load Razorpay script if not present
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      // Open Razorpay Checkout
      const options = {
        key: order.key_id || 'rzp_test_KAl8RnTvPcZJiT', // fallback to test key
        amount: order.amount,
        currency: order.currency,
        name: 'EliteStay',
        description: 'Room Booking Payment',
        order_id: order.id,
        handler: async function (response) {
          // On payment success, save booking
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
              fullName: user.displayName || '',
              email: user.email || '',
              phone: '', // You may want to collect this before payment
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              timestamp: new Date(),
            };
            await addDoc(collection(firestore, 'bookings'), bookingData);
            setBookingSuccessful(true);
            alert('Booking successful! Thank you for choosing EliteStay.');
            reset();
          } catch (error) {
            console.error('Error during booking:', error);
            alert('There was an error processing your booking. Please contact support.');
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
        },
        theme: { color: '#FF8D41' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error initiating payment. Please try again.');
    } finally {
      setIsPaying(false);
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
          <button
            type="button"
            onClick={handleRazorpayPayment}
            disabled={isPaying}
            className="px-10 py-4 bg-gradient-to-r from-[#FFD700] to-[#FF8D41] text-white rounded-full shadow-xl border-0 font-semibold text-xl tracking-wide hover:scale-105 hover:from-[#FF8D41] hover:to-[#FFD700] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPaying ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
      {/* Guest Information Form (remove card fields and submit button) */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h3 className="text-2xl font-serif text-elitestay-teal mb-6">Guest Information</h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={user?.displayName || ''}
              readOnly
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              readOnly
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          {/* Optionally add phone number input here if needed */}
        </form>
      </div>
    </section>
  );
} 