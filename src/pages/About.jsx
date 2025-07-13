import React from 'react';
import AboutSection from '../components/AboutSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <AboutSection />
      </div>
    </div>
  );
};

export default About; 