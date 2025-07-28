import React from 'react';
import AboutSection from '../components/AboutSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elitestay-beige via-elitestay-white to-elitestay-light-gold flex items-center justify-center py-16">
      <div className="w-full max-w-5xl premium-card fade-in">
        <AboutSection />
      </div>
    </div>
  );
};

export default About; 