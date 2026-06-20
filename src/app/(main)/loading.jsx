// app/loading.js
"use client";

import React from 'react';
import { Briefcase } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="relative mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          {/* Spinner ring */}
          <div className="absolute -inset-1 rounded-2xl border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin" />
          {/* Outer ring */}
          <div className="absolute -inset-3 rounded-2xl border border-white/5 animate-pulse" />
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Loading...
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Please wait while we prepare your experience
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full animate-progress" />
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Version/Tagline */}
        <p className="text-[10px] text-gray-600 mt-6">
          © 2024 HireLoop • Connecting Talent with Opportunity
        </p>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}