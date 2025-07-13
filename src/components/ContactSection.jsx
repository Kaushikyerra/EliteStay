import React from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(firestore, 'contact_submissions'), {
        ...data,
        timestamp: new Date(),
      });
      alert('Thank you for your message! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-2xl shadow-xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-elitestay-teal mb-2 tracking-wide">Contact Us</h2>
        <div className="mx-auto w-24 h-1 bg-[#FF8D41] rounded"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <FaMapMarkerAlt className="text-[#FF8D41] text-2xl mr-3" />
            <div>
              <span className="font-bold block">HOTEL IMPERIA BLESSINGS</span>
              <span className="text-gray-600 text-sm">20 L. B. SHASTRI MARG. CIVIL LINES. [ Near Heart Line Hospital ] Prayagraj. UP</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-[#FF8D41] text-xl mr-3" />
            <span className="text-gray-700 font-medium">+91-9415164170</span>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-[#FF8D41] text-xl mr-3" />
            <span className="text-gray-700 font-medium">imperiablessings@gmail.com</span>
          </div>
          <div className="flex items-center mb-4">
            <FaUser className="text-[#FF8D41] text-xl mr-3" />
            <span className="text-gray-700 font-medium">Mr. Abhishek Jain (Owner)</span>
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-[#FF8D41] text-xl mr-3" />
            <span className="text-gray-700 font-medium">+91-9839037181</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-[#FF8D41] font-bold mr-3">Preferred:</span>
            <span className="text-gray-700">10:00 AM – 8:00 PM | Over Call</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#FF8D41] focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#FF8D41] focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Phone</label>
              <input
                type="tel"
                {...register('phone', {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#FF8D41] focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Message</label>
              <textarea
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#FF8D41] focus:outline-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF8D41] text-white py-3 rounded-xl shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] border-2 border-transparent transition duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-elitestay-teal">Policies</h3>
          <ul className="mb-6 text-lg list-disc list-inside text-gray-700 space-y-2">
            <li>Check-In: <span className="font-semibold">12:00 Noon</span></li>
            <li>Check Out: <span className="font-semibold">11:00 AM</span></li>
            <li>Cancellation Policy: <span className="font-semibold">Non-Refundable [ Booking Against Advance ]</span></li>
            <li>ID Proof Requirements: <span className="font-semibold">Passport | Aadhar Card | Driving License</span></li>
            <li>Smoking Policy: <span className="font-semibold">Non-Smoking</span></li>
            <li>Pet Policy: <span className="font-semibold">Not Allowed</span></li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-elitestay-teal">Owner / Manager Contact For Listings</h3>
          <ul className="mb-6 text-lg text-gray-700 space-y-2">
            <li>Owner Name: <span className="font-semibold">Mr. Abhishek Jain</span></li>
            <li>Contact: <span className="font-semibold">+91-9839037181</span></li>
            <li>Preferred Time | Method to Reach: <span className="font-semibold">10:00 AM – 8:00 PM | Over Call</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
