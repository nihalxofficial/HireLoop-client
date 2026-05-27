"use client";

import { Button } from "@heroui/react";
import {
  ArrowUpRight,
  MapPin,
  BriefcaseBusiness,
  CircleDollarSign,
} from "lucide-react";

const jobs = Array(6).fill({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "$25-$40/hour",
});

export default function JobsSection() {
  return (
    <section className="bg-[#050816] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Smart Job Discovery
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          The roles you&apos;d never
          <br />
          find by searching
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-gray-400">
          Discover curated opportunities that match your skills and career aspirations
        </p>

        {/* Cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 hover:scale-[1.02]"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-white">
                {job.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-400">
                {job.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <MapPin size={12} className="text-violet-400" />
                  {job.location}
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <BriefcaseBusiness size={12} className="text-violet-400" />
                  {job.type}
                </div>
              </div>

              {/* Salary */}
              <div className="mt-2 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                <CircleDollarSign size={12} className="text-violet-400" />
                {job.salary}
              </div>

              {/* Apply Button */}
              <button className="mt-8 cursor-pointer flex items-center gap-1.5 text-sm text-gray-300 transition-all duration-300 group-hover:text-violet-400 group-hover:gap-2">
                Apply Now
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 flex justify-center">
          <Button className="h-11 cursor-pointer rounded-xl bg-white px-6 text-sm font-medium text-black shadow-lg shadow-white/10 transition-all duration-300 hover:bg-gray-100 hover:scale-105">
            View all job openings
          </Button>
        </div>
      </div>
    </section>
  );
}