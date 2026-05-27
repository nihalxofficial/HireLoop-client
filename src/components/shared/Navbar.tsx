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
    <nav className="w-full border-b border-white/10 bg-[#0b0b12] text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <span className="text-lg font-bold">P</span>
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold">Programming</h1>
            <p className="text-sm text-gray-300">Hero</p>
          </div>
        </Link>

        {/* Desktop Combined Container */}
        <div className="hidden items-center rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl lg:flex">
          {/* Nav Links */}
          <div className="flex items-center gap-8 px-4">
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
          <div className="mx-3 h-6 w-px bg-white/10" />

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-xl px-4 py-2 text-sm font-medium text-violet-400 transition hover:bg-white/5 hover:text-violet-300"
            >
              Sign In
            </Link>

            <Button
                variant="secondary"
              className="bg-white px-5 font-medium text-black hover:bg-gray-200"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0b0b12] px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-xl px-3 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/signin"
                className="rounded-xl border border-white/10 px-3 py-3 text-center text-violet-400 transition hover:bg-white/5"
              >
                Sign In
              </Link>

              <Button className="w-full bg-white font-medium text-black">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}