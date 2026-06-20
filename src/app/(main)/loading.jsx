// app/loading.js
"use client";

import React from 'react';
import { Briefcase, Sparkles } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative text-center max-w-sm mx-auto px-4 flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8">
          {/* Outer Glow Ring */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 blur-xl animate-pulse" />
          
          {/* Main Logo */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-2xl shadow-violet-500/30 mx-auto">
            <Briefcase className="h-12 w-12 text-white" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Spinning Ring */}
          <div className="absolute -inset-1 rounded-2xl border-2 border-transparent border-t-violet-400 border-r-fuchsia-400 animate-spin-slow" />
          
          {/* Second Ring */}
          <div className="absolute -inset-3 rounded-2xl border border-white/5 animate-pulse-ring" />
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
          HireLoop
        </h2>
        <p className="text-xs text-gray-400 mb-6 tracking-wider uppercase">
          Connecting Talent with Opportunity
        </p>

        {/* Loading Bar */}
        <div className="relative w-full max-w-xs mx-auto">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-fuchsia-500 animate-loading-bar" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-gray-400 mt-4 font-light">
          Loading your experience
          <span className="inline-flex ml-1">
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
          </span>
        </p>

        {/* Version */}
        <p className="text-[10px] text-gray-600 mt-8 tracking-wider">
          v2.0.1 • Secure Connection
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }

        @keyframes dot-1 {
          0%, 20% { opacity: 0; }
          40%, 100% { opacity: 1; }
        }

        @keyframes dot-2 {
          0%, 40% { opacity: 0; }
          60%, 100% { opacity: 1; }
        }

        @keyframes dot-3 {
          0%, 60% { opacity: 0; }
          80%, 100% { opacity: 1; }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 1.8s ease-in-out infinite;
        }

        .animate-dot-1 {
          animation: dot-1 2s ease-in-out infinite;
        }

        .animate-dot-2 {
          animation: dot-2 2s ease-in-out infinite;
        }

        .animate-dot-3 {
          animation: dot-3 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}