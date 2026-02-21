import React from "react";
import Link from "next/link";
import { earthFullHarmonyImg } from "@public/images";
import Picture from "../picture/Picture";

const trustBadges = [
  {
    title: "High Quality",
    description: "crafted from top materials",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 22l2-4M18 22l-2-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Warranty Protection",
    description: "Over 2 years",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    description: "Order over ₦1500",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="2"
          y="7"
          width="20"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M17 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M2 13h20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "24 / 7 Support",
    description: "Dedicated support",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 11c0 5.523-4.477 10-10 10S1 16.523 1 11s4.477-10 10-10 10 4.477 10 10z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 6v5M11 11l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 11h2M3 11h2M11 17v2M11 3v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const TrustBadges = () => {
  return (
    <div className="w-full bg-[#FCFCFC]">
      {/* About Us Hero Selection */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
        {/* Left: Decorative Image */}
        <div className="relative w-full max-w-[450px] mx-auto lg:ml-auto">
          <div className="aspect-[4/5] rounded-t-[200px] overflow-hidden bg-gray-100 shadow-2xl">
            <Picture
              src={earthFullHarmonyImg}
              alt="About Us"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          {/* Subtle Decorative Elements (like sparkles from the design) */}
          <div className="absolute -top-10 -left-10 opacity-20 hidden md:block">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="1" fill="black" />
              <circle cx="20" cy="30" r="1.5" fill="black" />
              <circle cx="80" cy="40" r="1" fill="black" />
              <circle cx="40" cy="70" r="2" fill="black" />
            </svg>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col items-start text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6">
            About Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#8BA79F] leading-[1.1] tracking-tight mb-8">
            The Earth Is Full <br />
            Of Harmony
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg leading-relaxed mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo
            enim sit amet magna semper lacinia. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In commodo enim sit amet.
          </p>
          <Link
            href="/about-us"
            className="bg-[#D9DEDC] hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-widest px-10 py-3.5 rounded-lg transition-all">
            Explore
          </Link>
        </div>
      </div>

      {/* Modern Trust Bar */}
      <div className="border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-[1256px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-5 group">
              <div className="text-black text-4xl transition-transform duration-300 group-hover:scale-110 shrink-0">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-black font-bold text-sm tracking-tight mb-0.5 whitespace-nowrap">
                  {badge.title}
                </h4>
                <p className="text-gray-400 text-[10px] sm:text-xs">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
