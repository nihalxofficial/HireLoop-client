"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { 
  LayoutDashboard, 
  Menu, 
  Settings, 
  X, 
  LogOut, 
  ChevronDown,
  Home,
  Briefcase,
  Building2,
  CreditCard,
  Info,
  Mail,
  UserCircle
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  // { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (isOpen) setIsOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    setIsOpen(false);
    router.push("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to check if link is active
  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105">
            <span className="text-sm font-bold">HL</span>
          </div>
          <div className="leading-tight hidden sm:block">
            <h1 className="text-sm font-semibold">HireLoop</h1>
            <p className="text-xs text-gray-400">Find Career Opportunities</p>
          </div>
        </Link>

        {/* Desktop Combined Container */}
        <div className="hidden items-center rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl lg:flex">
          {/* Nav Links */}
          <div className="flex items-center gap-1 px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all duration-300 ${
                    active
                      ? "bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={16} className={active ? "text-violet-400" : "text-gray-400"} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-white/20" />

          {/* Session Loading State */}
          {isPending ? (
            <div className="flex items-center gap-3 px-3">
              <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
            </div>
          ) : user ? (
            // User Dropdown - Desktop
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <Image
                  width={32}
                  height={32}
                  src={
                    user?.image ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/30 group-hover:ring-violet-500/50 transition-all"
                />
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-white truncate max-w-28">
                    {user?.name?.split(" ")[0] || user?.name || "User"}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                </div>
                <ChevronDown 
                  size={14} 
                  className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu - Desktop */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-72 rounded-2xl border border-white/10 bg-[#0A0A12]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Image
                          width={48}
                          height={48}
                          src={
                            user?.image ||
                            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                          }
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                        />
                        <div>
                          <p className="font-semibold text-white">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-48">
                            {user?.email}
                          </p>
                          <p className="text-xs text-violet-400 mt-1 capitalize">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-violet-400" />
                        Dashboard
                      </Link>
                      <Link
                        href={`/dashboard/${user?.role}/settings`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Settings size={16} className="text-violet-400" />
                        Settings
                      </Link>
                      <Link
                        href={`/profile/${user?.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <UserCircle size={16} className="text-violet-400" />
                        My Profile
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-white/10">
                      <button
                        onClick={handleSignOut}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Auth Buttons for Logged Out Users - Desktop
            <div className="flex items-center gap-1">
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-violet-400 transition-all duration-300 hover:bg-white/10 hover:text-violet-300"
              >
                Sign In
              </Link>

              <Button
                size="sm"
                className="bg-white px-4 font-medium text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Right Side - Profile and Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Profile (only when logged in) */}
          {!isPending && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Image
                  width={32}
                  height={32}
                  src={
                    user?.image ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/30"
                />
              </button>

              {/* Mobile Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-[#0A0A12]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Image
                          width={40}
                          height={40}
                          src={
                            user?.image ||
                            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-40">
                            {user?.email}
                          </p>
                          <p className="text-xs text-violet-400 mt-0.5 capitalize">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-violet-400" />
                        Dashboard
                      </Link>
                      <Link
                        href={`/dashboard/${user?.role}/settings`}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Settings size={16} className="text-violet-400" />
                        Settings
                      </Link>
                      <Link
                        href={`/profile/${user?.id}`}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <UserCircle size={16} className="text-violet-400" />
                        My Profile
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-white/10">
                      <button
                        onClick={handleSignOut}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Auth Buttons (when logged out) */}
          {!isPending && !user && (
            <div className="flex items-center gap-1">
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-violet-400 transition-all duration-300 hover:bg-white/10"
              >
                Sign In
              </Link>
              <Button
                size="sm"
                className="bg-white px-3 font-medium text-black hover:bg-gray-100 text-sm"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={handleMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen slide down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 ${
                        active
                          ? "bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={18} className={active ? "text-violet-400" : "text-gray-400"} />
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}