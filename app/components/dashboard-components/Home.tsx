import React from 'react';

export const Home = () => {
  return (
    <div className="w-1/2 h-screen flex flex-col items-center justify-center text-[#E3E8F1]">
      {/* Content */}
      <div className="text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6">
          Amrita Winter of Code
        </h1>

        {/* Subtitle */}
        <p className="text-base lg:text-lg text-[#B0B8D8] max-w-md mx-auto">
          Participate in an exciting coding event at Amrita Vishwa Vidyapeetham.
          Collaborate, learn, and build projects in a vibrant coding community.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-8">
          <button className="px-6 py-2 lg:px-8 lg:py-3 bg-[#3ABEF9] text-[#070F2B] font-semibold text-sm lg:text-lg rounded-lg hover:bg-[#535C91] hover:text-[#E3E8F1] transition">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
