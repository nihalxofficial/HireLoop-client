"use client";

import React from "react";
import {
  BriefcaseBusiness,
  Bookmark,
  Clock,
  CheckCircle,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  MapPin,
  DollarSign,
  Building2,
  Star,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const SeekerPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // Get seeker name from session
  const seekerName = "Michael Chen";
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Stats data for job seeker
  const stats = [
    {
      title: "Jobs Applied",
      value: "24",
      icon: <BriefcaseBusiness size={20} />,
      change: "+8%",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Saved Jobs",
      value: "12",
      icon: <Bookmark size={20} />,
      change: "+3",
      bgColor: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
    },
    {
      title: "Interviews",
      value: "5",
      icon: <Clock size={20} />,
      change: "+2",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Offers Received",
      value: "2",
      icon: <CheckCircle size={20} />,
      change: "+1",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  // Recommended jobs data
  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      logo: "https://i.pravatar.cc/150?img=10",
      matchScore: 92,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      location: "New York, NY",
      salary: "$130k - $160k",
      type: "Hybrid",
      posted: "3 days ago",
      logo: "https://i.pravatar.cc/150?img=11",
      matchScore: 88,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "CreativeMinds",
      location: "Remote",
      salary: "$90k - $120k",
      type: "Full-time",
      posted: "1 week ago",
      logo: "https://i.pravatar.cc/150?img=12",
      matchScore: 85,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudNine",
      location: "San Francisco, CA",
      salary: "$140k - $170k",
      type: "On-site",
      posted: "4 days ago",
      logo: "https://i.pravatar.cc/150?img=13",
      matchScore: 79,
    },
  ];

  // Recent activity data
  const recentActivities = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      action: "Applied",
      date: "2024-01-15",
      status: "Under Review",
      icon: <BriefcaseBusiness size={14} />,
    },
    {
      id: 2,
      jobTitle: "Full Stack Engineer",
      company: "InnovateLabs",
      action: "Interview Scheduled",
      date: "2024-01-14",
      status: "Interview",
      icon: <Clock size={14} />,
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "CreativeMinds",
      action: "Saved",
      date: "2024-01-13",
      status: "Saved",
      icon: <Bookmark size={14} />,
    },
    {
      id: 4,
      jobTitle: "DevOps Engineer",
      company: "CloudNine",
      action: "Applied",
      date: "2024-01-12",
      status: "Reviewing",
      icon: <BriefcaseBusiness size={14} />,
    },
  ];

  // Top skills in demand
  const topSkills = [
    { name: "React", demand: "+24%", bgColor: "bg-violet-500/10", textColor: "text-violet-400" },
    { name: "Node.js", demand: "+18%", bgColor: "bg-fuchsia-500/10", textColor: "text-fuchsia-400" },
    { name: "Python", demand: "+22%", bgColor: "bg-emerald-500/10", textColor: "text-emerald-400" },
    { name: "TypeScript", demand: "+31%", bgColor: "bg-orange-500/10", textColor: "text-orange-400" },
    { name: "AWS", demand: "+15%", bgColor: "bg-cyan-500/10", textColor: "text-cyan-400" },
  ];

  const getActivityColor = (status) => {
    switch (status) {
      case "Under Review":
        return "text-yellow-400 bg-yellow-400/10";
      case "Interview":
        return "text-violet-400 bg-violet-500/10";
      case "Saved":
        return "text-fuchsia-400 bg-fuchsia-500/10";
      case "Reviewing":
        return "text-emerald-400 bg-emerald-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-white/10 bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-violet-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-gray-300">
                Job Seeker Portal
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {greeting}, {user?.name}! 🎯
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Your next career opportunity is waiting. Track your applications, 
              discover matching jobs, and stay ahead in your job search journey.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs text-gray-400">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">Active job search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {stat.change} this month
                </p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Jobs & Top Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Recommended For You</h2>
                  <p className="text-sm text-gray-400 mt-1">Jobs matching your profile</p>
                </div>
                <Star size={18} className="text-violet-400" />
              </div>
            </div>
            
            <div className="divide-y divide-white/5">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl ring-2 ring-violet-500/30 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-linear-to-r from-fuchsia-500/10 to-violet-600/10 px-2 py-1 rounded-full">
                          <Star size={10} className="text-yellow-400" />
                          <span className="text-xs font-medium text-white">{job.matchScore}% Match</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin size={12} className="text-violet-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <DollarSign size={12} className="text-emerald-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Building2 size={12} className="text-fuchsia-400" />
                          {job.type}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">{job.posted}</span>
                        <button className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-all group-hover:gap-2">
                          View Details
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-5 border-t border-white/10">
              <button className="group flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 hover:gap-3">
                View All Recommended Jobs
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Skills & Activity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Skills in Demand */}
          {/* <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    Trending Skills
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Top Skills in Demand</h2>
              </div>
              <TrendingUp size={20} className="text-emerald-400" />
            </div>

            <div className="space-y-3">
              {topSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full ${skill.bgColor}`}>
                    <span className={`text-xs font-medium ${skill.textColor}`}>{skill.demand}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    Latest Updates
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              </div>
              <Clock size={20} className="text-violet-400" />
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
                >
                  <div className={`p-1.5 rounded-lg ${getActivityColor(activity.status)}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.jobTitle}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.company}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getActivityColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="group mt-4 w-full flex items-center justify-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 pt-3 border-t border-white/10">
              View All Activity
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerPage;