import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/Hotel Entrance.jpg';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const goldAccentVariants = {
  animate: {
    y: [0, -20, 0],
    boxShadow: [
      '0 0 60px 10px #FFD70044',
      '0 0 80px 20px #FFD70088',
      '0 0 60px 10px #FFD70044',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function HomeSection() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    navigate('/booking', {
      state: {
        checkIn,
        checkOut,
        rooms,
        adults,
        children,
        promoCode,
      },
    });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Parallax overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-0" style={{backdropFilter: 'blur(2px)'}}></div>
      {/* Floating gold accent */}
      <motion.div
        className="absolute left-1/2 top-1/3 w-32 h-32 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#FF8D41] opacity-40 blur-2xl z-10"
        variants={goldAccentVariants}
        animate="animate"
        initial={false}
        style={{ x: '-50%' }}
      />
      <motion.div
        className="relative z-20 text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-lg"
          variants={itemVariants}
        >
          EliteStay
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl font-light text-gray-200 mb-10 max-w-3xl mx-auto tracking-wide drop-shadow"
          variants={itemVariants}
        >
          Where Luxury Meets Experience
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/rooms"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#FFD700] to-[#FF8D41] text-white rounded-full shadow-xl border-0 font-semibold text-xl tracking-wide hover:scale-105 hover:from-[#FF8D41] hover:to-[#FFD700] transition-all duration-300"
          >
            Explore Our Rooms
          </Link>
        </motion.div>
      </motion.div>
      {/* Booking Form - Simple, Clean, Compact */}
      {/* (Booking form removed as per user request) */}
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-30"
        style={{ x: '-50%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <svg className="w-7 h-7 text-[#FFD700] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}