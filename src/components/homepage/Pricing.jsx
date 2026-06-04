"use client";

import { Button } from "@heroui/react";
import {
  Crown,
  BarChart3,
  Zap,
  Check,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    icon: <Crown size={16} />,
    highlighted: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    price: "$17",
    icon: <BarChart3 size={16} />,
    highlighted: true,
    features: [
      "Everything in Starter",
      "Priority job alerts",
      "Resume review service",
      "Interview preparation kit",
    ],
  },
  {
    name: "Premium",
    price: "$99",
    icon: <Zap size={16} />,
    highlighted: false,
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Badge - Consistent with Hero Section */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Pricing Plans
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-2xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Pay for the leverage,
          <br />
          not the listings
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-gray-400">
          Choose the perfect plan that fits your career journey
        </p>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            <button className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-all">
              Monthly
            </button>
            <button className="px-4 py-1.5 text-xs text-gray-400 transition-all hover:text-white">
              Yearly
            </button>
            <div className="rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 px-3 py-1 text-[10px] font-medium text-white shadow-lg shadow-violet-500/30">
              Save 25%
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted
                  ? "border-violet-500/50 bg-linear-to-br from-white/10 to-white/5 shadow-2xl shadow-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-violet-500/30"
              }`}
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10 text-violet-400">
                    {plan.icon}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {plan.name}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="mt-1 ml-1 text-xs text-gray-400">
                    /month
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-sm text-gray-400">
                {plan.highlighted 
                  ? "Most popular choice for active job seekers" 
                  : plan.name === "Starter" 
                  ? "Perfect for getting started" 
                  : "Ultimate career acceleration"}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Check size={11} className="text-violet-400" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button
                className={`mt-8 h-11 w-full justify-between rounded-xl px-4 text-sm font-medium transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-white text-black hover:bg-gray-100 hover:scale-[1.02] shadow-lg shadow-white/10"
                    : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                }`}
              >
                Choose {plan.name}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 px-3 py-0.5 text-[10px] font-medium text-white shadow-lg shadow-violet-500/30">
                    RECOMMENDED
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}