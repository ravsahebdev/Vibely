import React from 'react';

/**
 * AuthLogo - High fidelity glowing squircle app logo with play icon
 */
export default function AuthLogo({ className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative group">
        {/* Ambient Outer Glow */}
        <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-pink-500 to-purple-600 opacity-60 blur-md group-hover:opacity-80 transition duration-300" />

        {/* Squircle Container */}
        <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-b from-[#241242] via-[#160b2c] to-[#0d061c] p-[1.5px] shadow-2xl flex items-center justify-center overflow-hidden border border-purple-500/40">
          
          {/* Subtle Top Gloss Reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[20px] pointer-events-none" />

          {/* Inner Play Icon with Pink/Orange Gradient */}
          <svg
            className="w-8 h-8 drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)] transform translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="vibelyPlayGradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff7a00" />
                <stop offset="45%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path
              d="M6 4.75V19.25C6 20.15 7.01 20.69 7.76 20.21L19.16 12.96C19.86 12.52 19.86 11.48 19.16 11.04L7.76 3.79C7.01 3.31 6 3.85 6 4.75Z"
              fill="url(#vibelyPlayGradient)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
