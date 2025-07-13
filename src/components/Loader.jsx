import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    {/* Animated ring loader */}
    <div className="w-20 h-20 mb-6 flex items-center justify-center">
      <span className="relative flex h-20 w-20">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-40"></span>
        <span className="relative inline-flex rounded-full h-20 w-20 border-4 border-yellow-700 border-t-transparent animate-spin"></span>
      </span>
    </div>
    <h1 className="text-2xl font-bold tracking-widest text-yellow-800 uppercase">Hotel Imperia Blessings</h1>
    <p className="mt-2 text-gray-500 text-sm tracking-wide">Loading, please wait...</p>
  </div>
);

export default Loader; 