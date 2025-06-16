import React from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/config';

function Contact() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(firestore, 'contact_submissions'), {
        ...data,
        timestamp: new Date()
      });
      alert('Thank you for your message! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-serif text-elitestay-teal mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions or special requests? We're here to help! 
            Fill out the form, and our team will get back to you promptly.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-elitestay-teal">Address</h4>
              <p>123 Luxury Lane, Elite City, Prestige State</p>
            </div>
            <div>
              <h4 className="font-bold text-elitestay-teal">Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-bold text-elitestay-teal">Email</h4>
              <p>reservations@elitestay.com</p>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2">Name</label>
              <input 
                type="text" 
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: 'Invalid email address' 
                  }
                })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block mb-2">Phone</label>
              <input 
                type="tel" 
                {...register('phone', { 
                  pattern: { 
                    value: /^[0-9]{10}$/, 
                    message: 'Phone number must be 10 digits' 
                  }
                })}
                className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            
            <div>
              <label className="block mb-2">Message</label>
              <textarea 
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
                className={`w-full px-3 py-2 border rounded-lg h-32 ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-elitestay-gold text-white py-3 rounded-lg hover:bg-elitestay-teal transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact; 