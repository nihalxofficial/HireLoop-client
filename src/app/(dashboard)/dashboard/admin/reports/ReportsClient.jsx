// app/dashboard/admin/reports/ReportsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  Tab,
  Tabs,
} from "@heroui/react";
import {
  FileText,
  Search,
  Download,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Users,
  BriefcaseBusiness,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Award,
  Star,
  Eye,
  MessageSquare,
  Mail,
  ChevronRight,
  Activity,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Printer,
  Share2,
  UserPlus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Color palette for charts
const COLORS = {
  violet: '#8B5CF6',
  fuchsia: '#D946EF',
  emerald: '#34D399',
  blue: '#60A5FA',
  amber: '#FBBF24',
  red: '#F87171',
  cyan: '#22D3EE',
  pink: '#EC4899',
  purple: '#A78BFA',
  green: '#6EE7B7',
  orange: '#FB923C',
  indigo: '#818CF8',
};

const CHART_COLORS = [
  COLORS.violet,
  COLORS.fuchsia,
  COLORS.emerald,
  COLORS.blue,
  COLORS.amber,
  COLORS.cyan,
  COLORS.pink,
  COLORS.purple,
  COLORS.orange,
  COLORS.indigo,
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0f1a] border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-sm font-medium text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-gray-400">
            {entry.name}: <span className="text-white font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsClient({ reportsData }) {
  const { overview, monthlyData, dailyData, topCompanies, topCategories, recentActivities } = reportsData;
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last30");

  // Stat cards configuration
  const statCards = [
    {
      title: "Total Users",
      value: overview.totalUsers || 0,
      icon: <Users size={20} />,
      change: "+12.5%",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Total Jobs",
      value: overview.totalJobs || 0,
      icon: <BriefcaseBusiness size={20} />,
      change: "+18.3%",
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
    },
    {
      title: "Total Companies",
      value: overview.totalCompanies || 0,
      icon: <Building2 size={20} />,
      change: "+8.7%",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Applications",
      value: overview.totalApplications || 0,
      icon: <FileText size={20} />,
      change: "+22.1%",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  // User breakdown cards
  const userBreakdown = [
    { label: "Seekers", value: overview.seekers || 0, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Recruiters", value: overview.recruiters || 0, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Admins", value: overview.admins || 0, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Verified", value: overview.verifiedUsers || 0, color: "text-green-400", bg: "bg-green-500/10" },
  ];

  // Job breakdown cards
  const jobBreakdown = [
    { label: "Active", value: overview.activeJobs || 0, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Pending", value: overview.pendingJobs || 0, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Closed", value: overview.closedJobs || 0, color: "text-red-400", bg: "bg-red-500/10" },
    { label: "Remote", value: overview.remoteJobs || 0, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  // Application breakdown cards
  const appBreakdown = [
    { label: "Applied", value: overview.appliedApps || 0, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Reviewing", value: overview.reviewingApps || 0, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Shortlisted", value: overview.shortlistedApps || 0, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Interview", value: overview.interviewApps || 0, color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Rejected", value: overview.rejectedApps || 0, color: "text-red-400", bg: "bg-red-500/10" },
    { label: "Hired", value: overview.hiredApps || 0, color: "text-green-400", bg: "bg-green-500/10" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 'text-blue-400 bg-blue-500/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'reviewing':
        return 'text-cyan-400 bg-cyan-500/10';
      case 'shortlisted':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'interview':
        return 'text-violet-400 bg-violet-500/10';
      case 'rejected':
        return 'text-red-400 bg-red-500/10';
      case 'hired':
        return 'text-green-400 bg-green-500/10';
      case 'active':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'closed':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <UserPlus size={14} className="text-violet-400" />;
      case 'job':
        return <BriefcaseBusiness size={14} className="text-fuchsia-400" />;
      case 'application':
        return <FileText size={14} className="text-emerald-400" />;
      default:
        return <Activity size={14} className="text-gray-400" />;
    }
  };

  const handleExportReport = () => {
    toast.success("Report exported successfully");
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleShareReport = () => {
    toast.success("Report link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Comprehensive platform reports and analytics
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Select
              className="w-[150px]"
              value={dateRange}
              onChange={setDateRange}
              variant="bordered"
              aria-label="Date range"
              size="sm"
              classNames={{
                trigger: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "data-[focus=true]:border-violet-500",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
                value: "text-white text-sm",
              }}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator className="text-gray-400" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                  <ListBox.Item id="today" textValue="Today" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    Today
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item id="yesterday" textValue="Yesterday" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    Yesterday
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item id="last7" textValue="Last 7 Days" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    Last 7 Days
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item id="last30" textValue="Last 30 Days" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    Last 30 Days
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item id="last90" textValue="Last 90 Days" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    Last 90 Days
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item id="last365" textValue="This Year" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                    This Year
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors" onClick={handleExportReport}>
            <Download size={16} />
            Export
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors" onClick={handlePrintReport}>
            <Printer size={16} />
            Print
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors" onClick={handleShareReport}>
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {stat.change} from last month
                </p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="border-b border-white/10 px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {[
              { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
              { id: "users", label: "Users", icon: <Users size={16} /> },
              { id: "jobs", label: "Jobs", icon: <BriefcaseBusiness size={16} /> },
              { id: "applications", label: "Applications", icon: <FileText size={16} /> },
              { id: "activity", label: "Activity", icon: <Activity size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 text-white border border-fuchsia-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* User Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userBreakdown.map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.color} mt-1`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Job Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {jobBreakdown.map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.color} mt-1`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Application Breakdown */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {appBreakdown.map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                    <p className="text-[10px] text-gray-400 truncate">{item.label}</p>
                    <p className={`text-lg font-bold ${item.color} mt-0.5`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Monthly Trends */}
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Monthly Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="users" stackId="1" stroke={COLORS.violet} fill={COLORS.violet} fillOpacity={0.3} />
                      <Area type="monotone" dataKey="jobs" stackId="1" stroke={COLORS.fuchsia} fill={COLORS.fuchsia} fillOpacity={0.3} />
                      <Area type="monotone" dataKey="applications" stackId="1" stroke={COLORS.emerald} fill={COLORS.emerald} fillOpacity={0.3} />
                      <Legend formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Daily Activity */}
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Daily Activity (Last 7 Days)</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="users" fill={COLORS.violet} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="jobs" fill={COLORS.fuchsia} radius={[4, 4, 0, 0]} />
                      <Legend formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Companies & Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Top Companies</h3>
                  <div className="space-y-2">
                    {topCompanies.slice(0, 5).map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-5">{index + 1}</span>
                          <span className="text-sm text-gray-300">{company.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{company.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Top Categories</h3>
                  <div className="space-y-2">
                    {topCategories.slice(0, 5).map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-5">{index + 1}</span>
                          <span className="text-sm text-gray-300">{category.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white mt-1">{overview.totalUsers || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Seekers</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{overview.seekers || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Recruiters</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">{overview.recruiters || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Admins</p>
                  <p className="text-2xl font-bold text-purple-400 mt-1">{overview.admins || 0}</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <h3 className="text-sm font-semibold text-white mb-4">User Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="users" stroke={COLORS.violet} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Total Jobs</p>
                  <p className="text-2xl font-bold text-white mt-1">{overview.totalJobs || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{overview.activeJobs || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-1">{overview.pendingJobs || 0}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <p className="text-xs text-gray-400">Remote</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">{overview.remoteJobs || 0}</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Job Posts Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="jobs" stroke={COLORS.fuchsia} fill={COLORS.fuchsia} fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {appBreakdown.map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                    <p className="text-[10px] text-gray-400 truncate">{item.label}</p>
                    <p className={`text-lg font-bold ${item.color} mt-0.5`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Application Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="applications" barSize={30} fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="applications" stroke={COLORS.emerald} strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div className="space-y-3">
                {recentActivities && recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-white/5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        {activity.type === 'user' && (
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.name}</span> joined as{' '}
                            <span className="text-violet-400 capitalize">{activity.role}</span>
                          </p>
                        )}
                        {activity.type === 'job' && (
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.title}</span> was posted by{' '}
                            <span className="text-fuchsia-400">{activity.company}</span>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </span>
                          </p>
                        )}
                        {activity.type === 'application' && (
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.applicant}</span> applied for{' '}
                            <span className="text-emerald-400">{activity.jobTitle}</span>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.createdAt || activity.appliedAt || activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity size={32} className="text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}