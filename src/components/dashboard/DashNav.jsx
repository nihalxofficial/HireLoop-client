"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Menu,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DashNav({ onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Menu Button (mobile) + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
              <span className="text-sm font-bold">HL</span>
            </div>
            <span className="font-semibold text-white hidden sm:inline">HireLoop</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-end px-4 lg:px-8">
          <div
            className={`flex items-center gap-2 rounded-xl border transition-all duration-300 w-full max-w-md ${
              searchFocused
                ? "border-violet-500/50 bg-white/10"
                : "border-white/10 bg-white/5"
            } px-3 py-1.5`}
          >
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, candidates..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white">
            <MessageSquare size={18} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[8px] font-bold text-white">
              3
            </span>
          </button>

          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white">
              5
            </span>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-2 py-1 transition-all duration-300 hover:bg-white/10"
            >
              <Image
                width={32}
                height={32}
                src={
                  user?.image ||
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                }
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-violet-500/30"
              />
              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-white">
                  {user?.name?.split(" ")[0] || "Job"} Sterling
                </p>
                <p className="text-[10px] text-gray-400 capitalize">Recruiter</p>
              </div>
              <ChevronDown
                size={14}
                className={`hidden lg:block text-gray-400 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-56 rounded-2xl border border-white/10 bg-[#0A0A12]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={
                          user?.image ||
                          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                        }
                        alt="avatar"
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/30"
                      />
                      <div>
                        <p className="font-semibold text-white text-sm">{user?.name || "Job Sterling"}</p>
                        <p className="text-xs text-gray-400">{user?.email || "job@hireloop.com"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <User size={16} className="text-violet-400" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Settings size={16} className="text-violet-400" />
                      Settings
                    </Link>
                    <Link
                      href="/dashboard/help"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <HelpCircle size={16} className="text-violet-400" />
                      Help Center
                    </Link>
                  </div>

                  <div className="border-t border-white/10">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}