"use client";

import {
  Search,
  BarChart3,
  Building2,
  Bookmark,
  Sparkles,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: <Search size={20} />,
    title: "Smart Search",
    description:
      "Find your ideal job with advanced filters.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Salary Insights",
    description:
      "Get real salary data to negotiate confidently.",
  },
  {
    icon: <Building2 size={20} />,
    title: "Top Companies",
    description:
      "Apply to vetted companies that are hiring.",
  },
  {
    icon: <Bookmark size={20} />,
    title: "Saved Jobs",
    description:
      "Manage apps & favorites on your dashboard.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "One-Click Apply",
    description:
      "Simplify your job applications for an easier process!",
  },
  {
    icon: <FileText size={20} />,
    title: "Resume Builder",
    description:
      "Create professional resumes with modern templates.",
  },
  {
    icon: <Hexagon size={20} />,
    title: "Skill-Based Matching",
    description:
      "Discover jobs that match your skills and experience.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Career Growth Resources",
    description:
      "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#13131F] py-24 text-white">
      {/* Left Glow */}
      {/* <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none" /> */}

      {/* Right Glow */}
      {/* <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none" /> */}

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Platform Features
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Everything you need
          <br />
          to succeed
        </h2>

        {/* Features Grid */}
        <div className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              {/* Icon Box */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-400 transition-all duration-300 group-hover:border-violet-500/50">
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-[15px] font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-52.5 text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}