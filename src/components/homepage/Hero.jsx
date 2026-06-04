"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Users,
  Star,
} from "lucide-react";

import globe from "@/assets/globe2.png";

const stats = [
  {
    icon: <BriefcaseBusiness size={14} />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <ChartNoAxesColumn size={14} />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: <Users size={14} />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <Star size={14} />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      {/* Top subtle linear */}
      <div className="absolute inset-x-0 top-0 z-10 h-75 bg-[radial-linear(circle_at_top,rgba(124,58,237,0.18),transparent_70%)]" />

      {/* Globe as Full Section Background - Only Upper Half Visible */}
      <div className="absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl">
          <Image
            src={globe}
            alt="Globe"
            priority
            className="h-auto w-full object-cover"
            style={{
              marginTop: '40%', // Adjust to show only upper half of globe
              transform: 'translateY(-10%)', // Fine-tune the visible portion
            }}
          />
          
          {/* linear overlay to fade out bottom of globe */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#050816] via-[#050816]/80 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 md:px-6 lg:px-8">
        {/* Badge */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            50,000+ New Jobs This Month
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mt-7 max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-gray-400 md:text-[15px]">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your
          next role — faster.
        </p>

        {/* Search */}
        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b0e18]/90 p-3 backdrop-blur-xl md:flex-row md:items-center">
          {/* Job Input */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-white/10 md:block" />

          {/* Location */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2">
            <MapPin size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <Button
            isIconOnly
            className="h-12 min-w-12 bg-violet-600 text-white"
          >
            <Search size={18} />
          </Button>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-gray-500">Trending Position</span>
          {["Product Designer", "AI Engineering", "Devops Engineer"].map(
            (item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-gray-300"
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Center Text Over Globe */}
        <div className="relative mt-20">
          <div className="absolute left-1/2 mt-35 top-1/2 z-30 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <h2 className="text-2xl font-semibold leading-tight text-white md:text-4xl">
              Assisting over 15,000 job seekers
              <br />
              find their dream positions.
            </h2>
          </div>
        </div>

        {/* Stats Cards - Below Globe Section */}
        <div className="relative z-30 mt-80 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 black/40 p-5 backdrop-blur-2xl"
            >
              <div className="mb-10 text-gray-400">{item.icon}</div>
              <h3 className="text-3xl font-semibold">{item.value}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-10" />
      </div>
    </section>
  );
}