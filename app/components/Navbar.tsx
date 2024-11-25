'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mt-4 fixed top-0 left-10 z-50 w-1/2 flex items-center justify-between py-3 px-8 bg-transparent backdrop-blur-sm border rounded-xl border-[#A7E6FF] shadow-lg">
      {/* Left Side - ACM Logo, Home, Registration Form, Declaration */}
      <div className="flex justify-between space-x-6">
        {/* ACM Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
            <Image
              src="/acm.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#A7E6FF]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Declaration */}
          <div className="text-lg text-[#A7E6FF] font-semibold hover:text-[#3ABEF9] transition-all duration-300 ease-in-out">
            About AmWOC
          </div>
        </div>
      </div>

      {/* Right Side - GitHub Sign In */}
      <div className="flex items-center space-x-6">
        <button className="px-8 py-3 bg-transparent border-2 border-[#3ABEF9] text-[#3ABEF9] font-semibold text-lg rounded-full hover:bg-[#3ABEF9] hover:text-[#E3E8F1] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex items-center justify-center gap-3 shadow-md hover:shadow-xl">
          <Github size={20} /> {/* GitHub Icon */}
          Sign In
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-0 left-1/2 transform -translate-x-1/2 w-full bg-[#050C9C] text-white rounded-xl mt-8 py-4 shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="text-lg text-[#A7E6FF] font-semibold hover:text-[#3ABEF9] transition-all duration-300 ease-in-out">
              Home
            </Link>
            <Link href="/register" className="text-lg text-[#A7E6FF] font-semibold hover:text-[#3ABEF9] transition-all duration-300 ease-in-out">
              Registration
            </Link>
            <Link href="/declaration" className="text-lg text-[#A7E6FF] font-semibold hover:text-[#3ABEF9] transition-all duration-300 ease-in-out">
              Declaration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
