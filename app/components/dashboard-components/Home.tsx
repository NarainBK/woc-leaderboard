"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export const Home = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Update the countdown timer
  useEffect(() => {
    const targetDate = new Date("2024-12-15T00:00:00"); // Replace with your event date

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center pl-12 text-[#E3E8F1] relative">
      {/* Content */}
      <div className="text-left z-10">
        {/* Title */}
        <h1 className="text-6xl font-bold text-[#E3E8F1] mb-6 tracking-tight">
          <span className="text-[#3ABEF9]">Amrita</span> Winter of Code
        </h1>

        {/* Subtitle */}
        <p className="text-base lg:text-lg text-white max-w-md mb-8 leading-relaxed">
          Participate in an exciting coding event at{" "}
          <span className="text-[#3ABEF9]">Amrita Vishwa Vidyapeetham</span>.
          Collaborate, learn, and build projects in a vibrant coding community.
        </p>

        {/* Countdown Timer */}
        <div className="mb-8 text-lg font-semibold">
          <div className="flex items-center gap-4 text-center">
            {/* Days */}
            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-16 h-16 rounded-lg shadow-md">
              <span className="text-3xl font-bold">{timeLeft.days}</span>
              <span className="text-sm">Days</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-16 h-16 rounded-lg shadow-md">
              <span className="text-3xl font-bold">{timeLeft.hours}</span>
              <span className="text-sm">Hours</span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-16 h-16 rounded-lg shadow-md">
              <span className="text-3xl font-bold">{timeLeft.minutes}</span>
              <span className="text-sm">Minutes</span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-16 h-16 rounded-lg shadow-md animate-pulse">
              <span className="text-3xl font-bold">{timeLeft.seconds}</span>
              <span className="text-sm">Seconds</span>
            </div>
          </div>
        </div>

        {/* GitHub Image */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-white text-sm leading-relaxed">
            Contribute to the event on our official{" "}
            <span className="text-[#3ABEF9] font-semibold">GitHub Repository</span>.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex gap-4">
          {/* GitHub Sign In Button */}
          <button className="px-8 py-3 bg-transparent border-2 border-[#3ABEF9] text-[#3ABEF9] font-semibold text-lg rounded-lg hover:bg-[#3ABEF9] hover:text-[#E3E8F1] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex items-center justify-center gap-3">
            Sign in with GitHub
          </button>

          {/* Register Button */}
          <button className="px-8 py-3 bg-transparent border-2 border-[#3ABEF9] text-[#3ABEF9] font-semibold text-lg rounded-lg hover:bg-[#3ABEF9] hover:text-[#E3E8F1] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex items-center justify-center gap-3">
            Register Now
          </button>
        </div>
      </div>

      {/* Snowflake Image with Fixed Position */}
      <div
  className="absolute z-0 animate-rotateSnowflake"
  style={{
    top: "60vh", 
    left: "40vw",
    transform: "translate(-50%, -50%)",
  }}
>
  <Image
    src="/snowflake.png"
    alt="Snowflake"
    width={50}
    height={50}
    priority
    className="object-cover opacity-40"
  />
</div>
<div
  className="absolute z-0 animate-rotateSnowflake"
  style={{
    top: "83vh",
    left: "3vw",
    transform: "translate(-50%, -50%)",
  }}
>
  <Image
    src="/snowflake.png"
    alt="Snowflake"
    width={50}
    height={50}
    priority
    className="object-cover opacity-40"
  />
</div>
<div
  className="absolute z-0 animate-rotateSnowflake"
  style={{
    top: "10vh",
    left: "5vw", 
    transform: "translate(-50%, -50%)",
  }}
>
  <Image
    src="/snowflake.png"
    alt="Snowflake"
    width={50}
    height={50}
    priority
    className="object-cover opacity-40"
  />
</div>
<div
  className="absolute z-0 animate-rotateSnowflake"
  style={{
    top: "7vh",
    left: "35vw", 
    transform: "translate(-50%, -50%)",
  }}
>
  <Image
    src="/snowflake.png"
    alt="Snowflake"
    width={50}
    height={50}
    priority
    className="object-cover opacity-40"
  />
</div>\<div
  className="absolute z-0 animate-rotateSnowflake"
  style={{
    top: "37vh",
    left: "65vw", 
    transform: "translate(-50%, -50%)",
  }}
>
  <Image
    src="/snowflake.png"
    alt="Snowflake"
    width={50}
    height={50}
    priority
    className="object-cover opacity-40"
  />
</div>


      <Image
  src="/snowbg.png"
  alt="Snow Floor"
  layout="fill" // Ensures it spans the full width of the screen
  objectFit="cover" // Keeps the image aspect ratio while covering the area
  priority
  className="absolute bottom-0 left-0 w-full h-[150px] opacity-80"
/>
    </div>
  );
};

export default Home;
