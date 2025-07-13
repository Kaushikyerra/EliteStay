import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const connectivity = [
  { icon: '✈️', label: 'Airport', value: '30 Min' },
  { icon: '🚆', label: 'Railway Station', value: '10 Min' },
  { icon: '🚌', label: 'Bus Stand', value: '5 Min' },
];

const hubs = [
  { icon: '🏢', label: 'Nearby Corporate Hubs | Offices' },
  { icon: '🛍️', label: 'Malls & Shopping Centre In Walking Distance' },
  { icon: '🍽️', label: 'Varieties Of Restaurants | Cafes | Pubs' },
];

const attractions = [
  { icon: '🗺️', name: 'Triveni Sangam' },
  { icon: '🏛️', name: 'Khusro Bagh' },
  { icon: '🏠', name: 'Anand Bhawan' },
  { icon: '🏤', name: 'Allahabad Museam' },
  { icon: '🏯', name: 'Allahabad Fort' },
  { icon: '🗼', name: 'Allahabad Piller' },
  { icon: '⛪', name: 'All Saint Cathedral' },
  { icon: '🌉', name: 'New Yamuna Bridge' },
  { icon: '🔭', name: 'Jawahar Planetgrium' },
  { icon: '🏞️', name: 'Minto Park' },
  { icon: '🕉️', name: 'Mankashwar Temple' },
  { icon: '🕉️', name: 'Bade Hanuman' },
  { icon: '🕉️', name: 'Someshwar Mahadev Temple' },
  { icon: '🛕', name: 'ISKON Temple' },
  { icon: '🛕', name: 'Shree Narayan Ashram' },
  { icon: '🛕', name: 'Patal Puri Temple' },
  { icon: '🌳', name: 'Akshay Vat Tree' },
];

export default function NearbyAttractionsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-elitestay-beige/30 py-16">
      <ScrollAnimation>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Nearby Attractions & Connectivity</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-elitestay-teal">Connectivity</h3>
              <div className="flex flex-wrap gap-6 mb-8">
                {connectivity.map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white rounded-xl shadow p-4 mr-4 mb-4 min-w-[160px]">
                    <span className="text-3xl mr-3">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-lg">{item.label}</div>
                      <div className="text-[#FF8D41] font-bold text-xl">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-elitestay-teal">Corporate Hubs & Shopping</h3>
              <div className="flex flex-col gap-4">
                {hubs.map((item, idx) => (
                  <div key={idx} className="flex items-center text-lg">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-elitestay-teal">Nearby Tourist Attractions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {attractions.map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white rounded-xl shadow p-4">
                    <span className="text-3xl mr-4">{item.icon}</span>
                    <span className="font-semibold text-lg">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
} 