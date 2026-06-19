// app/dashboard/admin/page.js
"use client";

import React, { useState, useEffect } from "react";
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
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getApplications } from '@/lib/api/applications';

const AdminPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalCompanies: 0,
    totalApplications: 0,
    seekers: 0,
    recruiters: 0,
    admins: 0,
    activeJobs: 0,
    closedJobs: 0,
    approvedCompanies: 0,
    pendingCompanies: 0,
    rejectedCompanies: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [platformMetrics, setPlatformMetrics] = useState([
    { label: "Active Users", value: "0", change: "+0%", color: "text-emerald-400" },
    { label: "New Users Today", value: "0", change: "+0%", color: "text-violet-400" },
    { label: "Pending Approvals", value: "0", change: "0", color: "text-yellow-400" },
    { label: "Reports", value: "0", change: "0", color: "text-red-400" },
  ]);

  const adminName = user?.name || "Admin";
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Fetch real data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [usersData, jobsData, companiesData, applicationsData] = await Promise.all([
          getUsers(),
          getJobs(),
          getCompanies(),
          getApplications()
        ]);

        setUsers(usersData || []);
        setJobs(jobsData || []);
        setCompanies(companiesData || []);
        setApplications(applicationsData || []);

        // Calculate stats
        const totalUsers = usersData?.length || 0;
        const totalJobs = jobsData?.length || 0;
        const totalCompanies = companiesData?.length || 0;
        const totalApplications = applicationsData?.length || 0;

        const seekers = usersData?.filter(u => u.role?.toLowerCase() === 'seeker').length || 0;
        const recruiters = usersData?.filter(u => u.role?.toLowerCase() === 'recruiter').length || 0;
        const admins = usersData?.filter(u => u.role?.toLowerCase() === 'admin').length || 0;

        const activeJobs = jobsData?.filter(j => j.status?.toLowerCase() === 'active').length || 0;
        const closedJobs = jobsData?.filter(j => j.status?.toLowerCase() === 'closed').length || 0;
        const pendingJobs = jobsData?.filter(j => j.status?.toLowerCase() === 'pending').length || 0;

        const approvedCompanies = companiesData?.filter(c => c.status?.toLowerCase() === 'approved').length || 0;
        const pendingCompanies = companiesData?.filter(c => c.status?.toLowerCase() === 'pending').length || 0;
        const rejectedCompanies = companiesData?.filter(c => c.status?.toLowerCase() === 'rejected').length || 0;

        setStats({
          totalUsers,
          totalJobs,
          totalCompanies,
          totalApplications,
          seekers,
          recruiters,
          admins,
          activeJobs,
          closedJobs,
          pendingJobs,
          approvedCompanies,
          pendingCompanies,
          rejectedCompanies,
        });

        // Get recent users (last 5)
        const recentUsersList = usersData?.slice(0, 5).map(u => ({
          id: u._id,
          name: u.name || 'Unknown',
          email: u.email || '',
          role: u.role || 'Seeker',
          company: u.company || 'N/A',
          joined: u.createdAt,
          status: u.status || 'Active',
          avatar: u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=8B5CF6&color=fff&size=64`,
        })) || [];
        setRecentUsers(recentUsersList);

        // Get recent jobs (last 4)
        const recentJobsList = jobsData?.slice(0, 4).map(j => ({
          id: j._id,
          title: j.title || 'Unknown',
          company: j.companyName || 'Unknown',
          location: j.location || 'Remote',
          postedBy: j.recruiterId || 'Unknown',
          postedDate: j.createdAt,
          applicants: applicationsData?.filter(a => a.JobId === j._id).length || 0,
          status: j.status || 'Pending',
        })) || [];
        setRecentJobs(recentJobsList);

        // Calculate platform metrics
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const activeUsers = usersData?.filter(u => u.status?.toLowerCase() === 'active').length || 0;
        const newUsersToday = usersData?.filter(u => {
          const date = new Date(u.createdAt);
          return date >= today;
        }).length || 0;
        const pendingApprovals = companiesData?.filter(c => c.status?.toLowerCase() === 'pending').length || 0;
        const reports = 12; // Mock value - replace with actual reports count

        setPlatformMetrics([
          { label: "Active Users", value: activeUsers.toLocaleString(), change: "+15%", color: "text-emerald-400" },
          { label: "New Users Today", value: newUsersToday.toString(), change: "+8%", color: "text-violet-400" },
          { label: "Pending Approvals", value: pendingApprovals.toString(), change: "-5%", color: "text-yellow-400" },
          { label: "Reports", value: reports.toString(), change: "+2", color: "text-red-400" },
        ]);

      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "suspended":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "closed":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "text-purple-400 bg-purple-500/10";
      case "recruiter":
        return "text-blue-400 bg-blue-500/10";
      case "seeker":
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Stats cards data with real values
  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: <Users size={20} />,
      change: "+12.5%",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
      detail: `${stats.seekers} Seekers · ${stats.recruiters} Recruiters · ${stats.admins} Admins`,
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs.toLocaleString(),
      icon: <BriefcaseBusiness size={20} />,
      change: "+18.3%",
      bgColor: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
      detail: `${stats.activeJobs} Active · ${stats.closedJobs} Closed`,
    },
    {
      title: "Total Companies",
      value: stats.totalCompanies.toLocaleString(),
      icon: <Building2 size={20} />,
      change: "+8.7%",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      detail: `${stats.approvedCompanies} Approved · ${stats.pendingCompanies} Pending`,
    },
    {
      title: "Applications",
      value: stats.totalApplications.toLocaleString(),
      icon: <FileText size={20} />,
      change: "+22.1%",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      detail: `Total applications received`,
    },
  ];

  // System notifications (mock data for now)
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
      message: `New company verification request from ${companies[0]?.name || 'a company'}`,
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

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
        {statsCards.map((stat, index) => (
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
                      STATUS
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      JOINED
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
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-gray-400">{formatDate(user.joined)}</span>
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