"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" /> {/* teal-400 */}
            <stop offset="100%" stopColor="#0f766e" /> {/* teal-700 */}
          </linearGradient>
          <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>

        {/* House Outline - Static on mobile/default, animated only on desktop if needed, but keeping it simple for now */}
        <motion.path
          d="M50 10 L90 40 V90 H10 V40 L50 10Z"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          // Disable path animation on mobile by default using conditional rendering logic if passed prop, 
          // but simpler is to just remove the heavy draw animation or make it very fast/instant.
          // For max performance as requested:
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />

        {/* Inner B Shape */}
        <motion.path
          d="M35 35 H60 C70 35 70 50 60 50 H35 V35 M35 50 H65 C75 50 75 75 65 75 H35 V50"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Shine effect */}
        <path
          d="M50 10 L90 40 V90 H10 V40 L50 10Z"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>
    </div>
  );
}
