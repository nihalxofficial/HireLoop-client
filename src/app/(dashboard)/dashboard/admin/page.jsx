// app/dashboard/admin/page.js
"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Building2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Shield,
  Settings,
  UserCog,
  Activity,
  BarChart3,
  PieChart,
  Mail,
  Bell,
  AlertTriangle,
  Star,
  UserPlus,
  Calendar,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const AdminPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // Get admin name from session
  const adminName = user?.name;
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Platform-wide stats
  const stats = [
    {
      title: "Total Users",
      value: "8,492",
      icon: <Users size={20} />,
      change: "+12.5%",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
      detail: "4,128 Seekers · 3,214 Recruiters · 1,150 Admins",
    },
    {
      title: "Total Jobs",
      value: "3,847",
      icon: <BriefcaseBusiness size={20} />,
      change: "+18.3%",
      bgColor: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
      detail: "2,156 Active · 1,691 Closed",
    },
    {
      title: "Total Companies",
      value: "1,234",
      icon: <Building2 size={20} />,
      change: "+8.7%",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      detail: "87 Verified · 1,147 Registered",
    },
    {
      title: "Applications",
      value: "24,891",
      icon: <FileText size={20} />,
      change: "+22.1%",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      detail: "This month: 3,247",
    },
  ];

  // Recent user registrations
  const recentUsers = [
    {
      id: 1,
      name: "Emily Watson",
      email: "emily@example.com",
      role: "Recruiter",
      company: "TechCorp",
      joined: "2024-01-15",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    {
      id: 2,
      name: "James Rodriguez",
      email: "james@example.com",
      role: "Seeker",
      company: "Freelancer",
      joined: "2024-01-14",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
    {
      id: 3,
      name: "Sarah Kim",
      email: "sarah@example.com",
      role: "Recruiter",
      company: "InnovateLabs",
      joined: "2024-01-14",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=22",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Admin",
      company: "HireLoop",
      joined: "2024-01-13",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=23",
    },
    {
      id: 5,
      name: "Jessica Lee",
      email: "jessica@example.com",
      role: "Seeker",
      company: "Freelancer",
      joined: "2024-01-13",
      status: "Suspended",
      avatar: "https://i.pravatar.cc/150?img=24",
    },
  ];

  // Recent job posts
  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      postedBy: "Emily Watson",
      postedDate: "2024-01-15",
      applicants: 47,
      status: "Active",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      location: "New York, NY",
      postedBy: "Sarah Kim",
      postedDate: "2024-01-14",
      applicants: 32,
      status: "Active",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "CloudNine",
      location: "San Francisco, CA",
      postedBy: "Emily Watson",
      postedDate: "2024-01-13",
      applicants: 28,
      status: "Closed",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "DataStream",
      location: "Remote",
      postedBy: "Sarah Kim",
      postedDate: "2024-01-12",
      applicants: 53,
      status: "Active",
    },
  ];

  // Platform metrics
  const platformMetrics = [
    {
      label: "Active Users",
      value: "3,247",
      change: "+15%",
      color: "text-emerald-400",
    },
    {
      label: "New Users Today",
      value: "89",
      change: "+8%",
      color: "text-violet-400",
    },
    {
      label: "Pending Approvals",
      value: "23",
      change: "-5%",
      color: "text-yellow-400",
    },
    {
      label: "Reports",
      value: "12",
      change: "+2",
      color: "text-red-400",
    },
  ];

  // System notifications
  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Server maintenance scheduled for Jan 20, 2024 at 2:00 AM",
      time: "2 hours ago",
      icon: <AlertTriangle size={14} />,
    },
    {
      id: 2,
      type: "info",
      message: "New company verification request from TechStart Inc.",
      time: "4 hours ago",
      icon: <Building2 size={14} />,
    },
    {
      id: 3,
      type: "success",
      message: "Database backup completed successfully",
      time: "6 hours ago",
      icon: <CheckCircle size={14} />,
    },
    {
      id: 4,
      type: "warning",
      message: "Storage usage at 85% - Consider upgrading plan",
      time: "12 hours ago",
      icon: <AlertTriangle size={14} />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "Suspended":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "Closed":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "text-purple-400 bg-purple-500/10";
      case "Recruiter":
        return "text-blue-400 bg-blue-500/10";
      case "Seeker":
        return "text-emerald-400 bg-emerald-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "warning":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "info":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "success":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-violet-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-gray-300">
                Admin Control Panel
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {greeting}, {adminName}! 🚀
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Oversee platform operations, manage users, monitor job posts, and ensure 
              everything runs smoothly across HireLoop.
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
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-500">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {platformMetrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30"
          >
            <p className="text-xs text-gray-400">{metric.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
            <p className={`text-xs ${metric.color} mt-1`}>{metric.change}</p>
          </div>
        ))}
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
                <p className="text-[10px] text-gray-500 mt-1">{stat.detail}</p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users & Jobs Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Users */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Recent User Registrations</h2>
                  <p className="text-sm text-gray-400 mt-1">New users on the platform</p>
                </div>
                <UserPlus size={18} className="text-violet-400" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      USER
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      ROLE
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      COMPANY
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      STATUS
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            width={500}
                            height={500}
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full ring-2 ring-violet-500/30 object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-300">{user.company}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(user.status)}`}>
                          {user.status}
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
              <button className="group flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 hover:gap-3">
                View All Users
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Recent Job Posts</h2>
                  <p className="text-sm text-gray-400 mt-1">Latest job listings on the platform</p>
                </div>
                <BriefcaseBusiness size={18} className="text-fuchsia-400" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      JOB TITLE
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      COMPANY
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      LOCATION
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      APPLICANTS
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr 
                      key={job.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-white">{job.title}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-300">{job.company}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-400">{job.location}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-300">{job.applicants}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-5 border-t border-white/10">
              <button className="group flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 hover:gap-3">
                View All Jobs
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Notifications & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* System Notifications */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    System Alerts
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                </div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
              </div>
              <Bell size={20} className="text-violet-400" />
            </div>

            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-xl bg-white/5 border ${getNotificationColor(notification.type)}`}
                >
                  <div className="mt-0.5">
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white">{notification.message}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group mt-4 w-full flex items-center justify-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 pt-3 border-t border-white/10">
              View All Notifications
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all duration-300 text-center">
                <UserCog size={18} className="text-violet-400 mx-auto" />
                <p className="text-xs text-white mt-1">Manage Users</p>
              </button>
              <button className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 transition-all duration-300 text-center">
                <BriefcaseBusiness size={18} className="text-fuchsia-400 mx-auto" />
                <p className="text-xs text-white mt-1">Manage Jobs</p>
              </button>
              <button className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 text-center">
                <Building2 size={18} className="text-emerald-400 mx-auto" />
                <p className="text-xs text-white mt-1">Companies</p>
              </button>
              <button className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300 text-center">
                <BarChart3 size={18} className="text-orange-400 mx-auto" />
                <p className="text-xs text-white mt-1">Analytics</p>
              </button>
              <button className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300 text-center">
                <Settings size={18} className="text-cyan-400 mx-auto" />
                <p className="text-xs text-white mt-1">Settings</p>
              </button>
              <button className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300 text-center">
                <Mail size={18} className="text-purple-400 mx-auto" />
                <p className="text-xs text-white mt-1">Send Email</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;