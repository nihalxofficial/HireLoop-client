"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Briefcase,
  AlertCircle,
  Compass,
  Rocket,
} from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      {/* Add padding-top to account for fixed navbar (h-16 = 64px) */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center justify-center">
        
        {/* Main Content */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <div className="text-[120px] md:text-[180px] font-bold leading-none">
              <span className="bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                4
              </span>
              <span className="text-white/20">0</span>
              <span className="bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                4
              </span>
            </div>
            
            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 -right-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10 backdrop-blur-sm">
                <AlertCircle size={24} className="text-violet-400" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10 backdrop-blur-sm">
                <Compass size={20} className="text-violet-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
              Page Not Found
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-3xl md:text-4xl font-bold"
          >
            Oops! Page not found
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-gray-400 leading-relaxed"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track to find your dream job.
          </motion.p>

          {/* Search Suggestions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            <p className="text-sm text-gray-500 mb-3">You might be looking for:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Browse Jobs", "Company", "Pricing", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Browse Jobs" ? "/jobs" : `/${item.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button
                className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-medium shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                startContent={<Home size={16} />}
              >
                Back to Home
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                className="h-11 rounded-xl border border-white/10 bg-white/5 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
                startContent={<Search size={16} />}
              >
                Browse Jobs
              </Button>
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Rocket size={14} className="text-violet-400" />
                <span className="text-gray-500">Need help?</span>
              </div>
              <Link
                href="/contact"
                className="text-violet-400 hover:text-violet-300 transition"
              >
                Contact Support
              </Link>
              <span className="text-gray-600 hidden sm:block">•</span>
              <Link
                href="/faq"
                className="text-violet-400 hover:text-violet-300 transition"
              >
                Visit FAQ
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}