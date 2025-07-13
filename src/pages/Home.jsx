import React, { useEffect } from 'react';
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import RoomsSection from '../components/RoomsSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import AmenitiesSection from '../components/AmenitiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SpecialOffersSection from '../components/SpecialOffersSection';
import GuestTestimonialsSection from '../components/GuestTestimonialsSection';
import HomeRoomsCarouselSection from '../components/HomeRoomsCarouselSection';
import NearbyAttractionsSection from '../components/NearbyAttractionsSection';
import PhotoGallerySection from '../components/PhotoGallerySection';
import BanquetSection from '../components/BanquetSection';
import DiningSection from '../components/DiningSection';
import { useLocation, Link } from 'react-router-dom';
import doubleRoom from '../assets/Double room.jpeg';
import eventPlace from '../assets/Event Place.jpg';
import diningImage from '../assets/Dining.jpg';
import fitnessImage from '../assets/Fitness.jpg';
import entranceImage from '../assets/Hotel Entrance.jpg';
import galleryImage from '../assets/garden-room.jpg';
import conciergeImage from '../assets/Concierge.jpg';

const Home = (props) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location.hash]);

  return (
    <>
      {/* Hero Section */}
      <HomeSection />
      <AboutSection />
      <WhyChooseUsSection />
      <AmenitiesSection />
      <HomeRoomsCarouselSection />
      <BanquetSection />
      <DiningSection />
      <ServicesSection />
      <TestimonialsSection />
      <NearbyAttractionsSection />
      <PhotoGallerySection />
      <ContactSection />
    </>
  );
};

export default Home; 