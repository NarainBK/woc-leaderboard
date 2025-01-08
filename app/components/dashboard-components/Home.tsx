"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import UserCard from "./usercard"; // Adjust the path based on your project structure

export const Home = () => {
  const [showUserCard, setShowUserCard] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-02-14T00:00:00");

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

    return () => clearInterval(timer);
  }, []);

  const handleSignIn = async () => {
    // Trigger the GitHub sign-in process
    // Show the UserCard after successful sign-in
    setShowUserCard(true);
  };

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center pt-10 px-6 md:pl-12 text-[#E3E8F1] relative">
      {showUserCard ? (
        <UserCard />
      ) : (
        <div className="text-left z-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#E3E8F1] mb-6 tracking-tight">
            <span className="text-[#3ABEF9]">Amrita</span> Winter of Code
          </h1>

          <p className="text-md sm:text-base cl:text-lg text-white max-w-md mb-6 sm:mb-8 leading-relaxed">
            Join us for an exciting coding journey at{" "}
            <span className="text-[#3ABEF9]">Amrita Vishwa Vidyapeetham</span>.
            Collaborate, learn, and build innovative projects with a passionate
            coding community.
          </p>

          <div className="mb-8 text-lg font-semibold">
            <p className=" mb-2 text-sm font-light">Winter Of Code ends in</p>
            <div className="flex items-center gap-4 text-center">
              {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                const value = Object.values(timeLeft)[i];
                return (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center bg-[#3ABEF9] text-[#070F2B] w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md"
                  >
                    <span className="text-xl sm:text-3xl font-bold">{value}</span>
                    <span className="text-xs sm:text-sm">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 flex gap-4">
            {/* GitHub Sign In Button */}
            <button
              onClick={handleSignIn}
              className="px-4 py-2 sm:px-8 sm:py-3 bg-gray-800 border border-gray-400 text-white
                text-[#00000] font-semibold text-sm sm:text-lg rounded-lg
                hover:bg-[#3ABEF9] hover:text-[#E3E8F1] transition duration-300 ease-in-out 
                transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex
                items-center justify-center gap-2 sm:gap-3"
            >
              <Github size={20} /> {/* GitHub Icon */}
              Log in with GitHub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
