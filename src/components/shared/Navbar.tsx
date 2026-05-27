"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Browse Jobs", href: "#" },
  { name: "Company", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <span className="text-sm font-bold">HL</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold">HireLoop</h1>
            <p className="text-xs text-gray-300">Find Career Opportunities</p>
          </div>
        </Link>

        {/* Desktop Combined Container */}
        <div className="hidden items-center rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl lg:flex">
          {/* Nav Links */}
          <div className="flex items-center gap-6 px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-white/10" />

          {/* Buttons */}
          <div className="flex items-center gap-1">
            <Link
              href="/signin"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-violet-400 transition hover:bg-white/5 hover:text-violet-300"
            >
              Sign In
            </Link>

            <Button
              size="sm"
              className="bg-white px-4 font-medium text-black hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-gray-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/signin"
                className="rounded-lg border border-white/10 px-3 py-2.5 text-center text-violet-400 transition hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>

              <Button 
                className="w-full bg-white font-medium text-black"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}