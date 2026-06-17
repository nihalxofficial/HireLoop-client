// app/profile/ProfileClient.jsx
"use client";

import React, { useState } from "react";
import {
  Button,
} from "@heroui/react";
import {
  User,
  Mail,
  Calendar,
  Award,
  Shield,
  Crown,
  Sparkles,
  BriefcaseBusiness,
  Bookmark,
  Clock,
  CheckCircle,
  Star,
  Building2,
  MapPin,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default function ProfileClient({ userData }) {
  const [imageError, setImageError] = useState(false);

  if (!userData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#050816] flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return { color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: <Shield size={14} /> };
      case "recruiter":
        return { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: <Building2 size={14} /> };
      case "seeker":
        return { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <BriefcaseBusiness size={14} /> };
      default:
        return { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <User size={14} /> };
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan?.toLowerCase()) {
      case "premium":
        return { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <Crown size={14} />, label: "Premium" };
      case "pro":
        return { color: "text-violet-400 bg-violet-500/10 border-violet-500/20", icon: <Star size={14} />, label: "Pro" };
      default:
        return { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <User size={14} />, label: "Free" };
    }
  };

  const roleBadge = getRoleBadge(userData.role);
  const planBadge = getPlanBadge(userData.plan);

  // Get the avatar URL with fallback
  const avatarUrl = userData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=8B5CF6&color=fff&size=128&bold=true`;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050816] py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative rounded-2xl border border-white/10 bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6 md:p-8 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-600/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-fuchsia-600/5 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar - Full circle without padding */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full ring-4 ring-violet-500/30 overflow-hidden bg-linear-to-br from-violet-500/20 to-fuchsia-500/20">
                {!imageError && avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={userData.name || "User"}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-violet-500/20 to-fuchsia-500/20">
                    <span className="text-3xl font-semibold text-white">
                      {getInitials(userData.name)}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 border-2 border-[#050816]">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-semibold text-white">
                  {userData.name || "User"}
                </h1>
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${roleBadge.color}`}>
                  {roleBadge.icon}
                  {userData.role?.charAt(0).toUpperCase() + userData.role?.slice(1) || "User"}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${planBadge.color}`}>
                  {planBadge.icon}
                  {planBadge.label}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Mail size={14} className="text-violet-400" />
                  <span>{userData.email}</span>
                  {userData.emailVerified ? (
                    <CheckCircle size={14} className="text-emerald-400" />
                  ) : (
                    <span className="text-xs text-yellow-400">(Unverified)</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Calendar size={14} className="text-violet-400" />
                  <span>Joined {formatDate(userData.createdAt)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-violet-500/10">
                    <BriefcaseBusiness size={14} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">12</p>
                    <p className="text-[10px] text-gray-400">Applications</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-fuchsia-500/10">
                    <Bookmark size={14} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">8</p>
                    <p className="text-[10px] text-gray-400">Saved Jobs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                    <Clock size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">5</p>
                    <p className="text-[10px] text-gray-400">Interviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10">
                    <Award size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">2</p>
                    <p className="text-[10px] text-gray-400">Offers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button - Commented out */}
            {/* <Link href="/profile/edit">
              <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                Edit Profile
              </Button>
            </Link> */}
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About & Social */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <User size={16} className="text-violet-400" />
                About
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm text-white">{userData.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-white">{userData.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Role</p>
                  <p className="text-sm text-white capitalize">{userData.role || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="text-sm text-white">{formatDate(userData.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Plan</p>
                  <p className="text-sm text-white capitalize">{userData.plan || "Free"}</p>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <LinkIcon size={16} className="text-violet-400" />
                Social Links
              </h3>
              <div className="space-y-2">
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left">
                  <FaGithub size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-300">GitHub</span>
                  <span className="text-xs text-gray-500 ml-auto">Not linked</span>
                </button>
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left">
                  <FaLinkedin size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-300">LinkedIn</span>
                  <span className="text-xs text-gray-500 ml-auto">Not linked</span>
                </button>
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left">
                  <FaTwitter size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-300">Twitter</span>
                  <span className="text-xs text-gray-500 ml-auto">Not linked</span>
                </button>
                <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left">
                  <Globe size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-300">Portfolio</span>
                  <span className="text-xs text-gray-500 ml-auto">Not linked</span>
                </button>
              </div>
              <Link href="/profile/edit">
                <Button className="w-full mt-3 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm">
                  Add Social Links
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Clock size={16} className="text-violet-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
                    <div className={`p-2 rounded-lg ${
                      item === 1 ? "bg-emerald-500/10" :
                      item === 2 ? "bg-violet-500/10" :
                      item === 3 ? "bg-fuchsia-500/10" :
                      "bg-amber-500/10"
                    }`}>
                      {item === 1 && <CheckCircle size={16} className="text-emerald-400" />}
                      {item === 2 && <BriefcaseBusiness size={16} className="text-violet-400" />}
                      {item === 3 && <Bookmark size={16} className="text-fuchsia-400" />}
                      {item === 4 && <Clock size={16} className="text-amber-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        {item === 1 && "Applied for Senior Frontend Developer at TechCorp"}
                        {item === 2 && "Application viewed by InnovateLabs"}
                        {item === 3 && "Saved UI/UX Designer position"}
                        {item === 4 && "Interview scheduled with CloudNine"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item === 1 && "2 hours ago"}
                        {item === 2 && "5 hours ago"}
                        {item === 3 && "1 day ago"}
                        {item === 4 && "2 days ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/seeker/applications">
                <Button className="w-full mt-4 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm">
                  View All Activity
                </Button>
              </Link>
            </div>

            {/* Skills & Badges */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Award size={16} className="text-violet-400" />
                Skills & Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "Docker", "AWS", "GraphQL"].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Top Applicant", "5+ Applications", "Interview Ready", "Quick Learner"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1"
                  >
                    <Star size={12} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}