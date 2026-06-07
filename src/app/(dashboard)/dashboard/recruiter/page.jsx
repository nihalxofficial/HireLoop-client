"use client";

import React from "react";
import {
  BriefcaseBusiness,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const RecruiterPage = () => {
  // Get recruiter name from session or props
  // For now using sample data - replace with actual user data from your auth
  const recruiterName = "Sarah Johnson";
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Stats data
  const stats = [
    {
      title: "Total Job Posts",
      value: "156",
      icon: <BriefcaseBusiness size={20} />,
      change: "+12%",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Total Applicants",
      value: "2,847",
      icon: <Users size={20} />,
      change: "+23%",
      bgColor: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
    },
    {
      title: "Active Jobs",
      value: "42",
      icon: <CheckCircle size={20} />,
      change: "+5%",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Jobs Closed",
      value: "114",
      icon: <XCircle size={20} />,
      change: "+18%",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  // Recent applicants data
  const recentApplicants = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      status: "Reviewing",
      email: "alice@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      appliedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Engineer",
      status: "Interview",
      email: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      appliedDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "UI/UX Designer",
      status: "Pending",
      email: "carol@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      appliedDate: "2024-01-14",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "DevOps Engineer",
      status: "Shortlisted",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      appliedDate: "2024-01-13",
    },
    {
      id: 5,
      name: "Emma Brown",
      role: "Product Manager",
      status: "Reviewing",
      email: "emma@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      appliedDate: "2024-01-13",
    },
  ];

  // Top companies data
  const topCompanies = [
    {
      id: 1,
      name: "TechCorp",
      logo: "https://i.pravatar.cc/150?img=10",
      jobsPosted: 24,
      applicants: 1247,
      growth: "+15%",
    },
    {
      id: 2,
      name: "InnovateLabs",
      logo: "https://i.pravatar.cc/150?img=11",
      jobsPosted: 18,
      applicants: 892,
      growth: "+22%",
    },
    {
      id: 3,
      name: "DataStream",
      logo: "https://i.pravatar.cc/150?img=12",
      jobsPosted: 15,
      applicants: 734,
      growth: "+8%",
    },
    {
      id: 4,
      name: "CloudNine",
      logo: "https://i.pravatar.cc/150?img=13",
      jobsPosted: 12,
      applicants: 567,
      growth: "+28%",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewing":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Interview":
        return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      case "Pending":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      case "Shortlisted":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
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
                Welcome Back
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {greeting}, {recruiterName}! 👋
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Here&apos;s what&apos;s happening with your recruitment activities today. 
              Track your job posts, review applicants, and monitor your hiring progress.
            </p>
          </div>
          {/* Optional: Add a decorative element or date */}
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
              <span className="text-xs text-gray-500">All systems operational</span>
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
                  {stat.change} from last month
                </p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applicants Table & Top Companies Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applicants Table */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Recent Applicants</h2>
              <p className="text-sm text-gray-400 mt-1">Latest candidates who applied to your jobs</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      APPLICANT
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      POSITION
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      STATUS
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      APPLIED DATE
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      ACTION
                    </th>
                   </tr>
                </thead>
                <tbody>
                  {recentApplicants.map((applicant) => (
                    <tr 
                      key={applicant.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            width={500}
                            height={500}
                            src={applicant.avatar}
                            alt={applicant.name}
                            className="w-9 h-9 rounded-full ring-2 ring-violet-500/30 object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{applicant.name}</p>
                            <p className="text-xs text-gray-400">{applicant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-300">{applicant.role}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-400">
                          {new Date(applicant.appliedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-5 border-t border-white/10">
              <button className="group cursor-pointer flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 hover:gap-3">
                View All Applicants
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Companies Section */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    Top Performers
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Top Companies</h2>
              </div>
              <Building2 size={20} className="text-violet-400" />
            </div>

            <div className="space-y-3">
              {topCompanies.map((company, index) => (
                <div
                  key={company.id}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        width={500}
                        height={500}
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-full ring-2 ring-violet-500/30 object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <span className="text-[9px] font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
                        {company.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{company.jobsPosted} jobs</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-xs text-gray-400">{company.applicants} applicants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    <TrendingUp size={10} />
                    <span className="text-xs font-medium">{company.growth}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="group cursor-pointer mt-5 w-full flex items-center justify-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 pt-4 border-t border-white/10">
              View All Companies
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;