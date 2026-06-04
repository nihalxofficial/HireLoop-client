"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight, Sparkles } from "lucide-react";

import ctaBg from "@/assets/cta-bg.png";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={ctaBg}
          alt="CTA Background"
          fill
          priority
          className="object-cover object-top opacity-60"
        />
      </div>

      {/* Lighter Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-[#050816]/40 to-[#050816]/20" />

      {/* Subtle Purple Glow Effect */}
      <div className="absolute left-1/2 top-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center md:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Start Your Journey
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>

        {/* Heading */}
        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Your next role is
          <br />
          <span className="bg-linear-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
            already looking for you
          </span>
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button 
            className="h-12 rounded-xl bg-white px-6 text-sm font-medium text-black shadow-lg shadow-white/10 transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          >
            <Sparkles size={16} className="mr-2" />
            Create a free account
          </Button>

          <Button 
            className="h-12 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
          >
            View pricing
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex items-center gap-4 text-xs text-gray-400">
          <span>✨ No credit card required</span>
          <span>•</span>
          <span>🚀 Free forever plan</span>
          <span>•</span>
          <span>💡 Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}