

export const Home = () => {
  return (
    <div className="w-1/2 h-screen flex flex-col items-start justify-center pl-12 text-[#E3E8F1]">
      {/* Content */}
      <div className="text-left">
        {/* Title */}
        <h1 className="text-6xl font-bold text-[#E3E8F1] mb-6 tracking-tight">
         <span className="text-[#3ABEF9]">   Amrita</span> Winter of Code
        </h1>

        {/* Subtitle */}
        <p className="text-base lg:text-lg text-white max-w-md mb-8 leading-relaxed">
          Participate in an exciting coding event at <span className="text-[#3ABEF9]">Amrita Vishwa Vidyapeetham</span>. 
          Collaborate,learn, and build projects in a vibrant coding community.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-8">
          <button className="px-8 py-3 bg-[#3ABEF9] text-[#070F2B] font-semibold text-lg rounded-lg hover:bg-[#3572EF] hover:text-[#E3E8F1] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9]">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
