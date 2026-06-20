// app/dashboard/loading.js
"use client";

import React from 'react';
import { Briefcase } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="relative mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin" />
        </div>

        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-white mb-2">
          Loading Dashboard
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Getting your data ready...
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full animate-pulse" />
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}