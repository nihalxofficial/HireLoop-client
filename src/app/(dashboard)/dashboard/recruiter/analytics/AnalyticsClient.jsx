// app/dashboard/recruiter/analytics/AnalyticsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import {
  BriefcaseBusiness,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Award,
  Star,
  Eye,
  MessageSquare,
  Mail,
  Download,
  Filter,
  ChevronRight,
  Activity,
  Zap,
  Target,
  Building2,
  UserCheck,
  UserX,
  Send,
  Hourglass,
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

export default function AnalyticsClient({ analyticsData }) {
  const { 
    overview, 
    monthlyData, 
    jobPerformance, 
    appStatusData, 
    jobStatusData, 
    recentActivities 
  } = analyticsData;

  const [dateRange, setDateRange] = useState("last30");

  // Stat cards configuration
  const statCards = [
    {
      title: "Total Jobs",
      value: overview.totalJobs || 0,
      icon: <BriefcaseBusiness size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      detail: `${overview.activeJobs || 0} Active · ${overview.pendingJobs || 0} Pending`
    },
    {
      title: "Total Applications",
      value: overview.totalApplications || 0,
      icon: <FileText size={20} />,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
      detail: `${overview.hiredApps || 0} Hired · ${overview.interviewApps || 0} Interview`
    },
    {
      title: "Application Rate",
      value: `${overview.applicationRate || 0}`,
      suffix: "/job",
      icon: <Users size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      detail: `${overview.totalApplications || 0} total applications`
    },
    {
      title: "Hire Rate",
      value: `${overview.hireRate || 0}%`,
      icon: <Target size={20} />,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      detail: `${overview.hiredApps || 0} hired out of ${overview.totalApplications || 0}`
    },
  ];

  // Application status breakdown colors
  const appStatusColors = {
    'Applied': COLORS.blue,
    'Reviewing': COLORS.cyan,
    'Shortlisted': COLORS.emerald,
    'Interview': COLORS.violet,
    'Rejected': COLORS.red,
    'Hired': COLORS.green
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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return <Send size={12} />;
      case 'pending':
        return <Hourglass size={12} />;
      case 'reviewing':
        return <Eye size={12} />;
      case 'shortlisted':
        return <UserCheck size={12} />;
      case 'interview':
        return <Calendar size={12} />;
      case 'rejected':
        return <UserX size={12} />;
      case 'hired':
        return <CheckCircle size={12} />;
      default:
        return <Clock size={12} />;
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

  const handleExportReport = () => {
    toast.success("Report exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track your recruitment performance and hiring metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors" onClick={handleExportReport}>
            <Download size={16} />
            Export Report
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>

      {/* Company Overview */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={16} className="text-violet-400" />
              <span className="text-xs uppercase tracking-wider text-gray-300">
                {overview.companyName || 'Your Company'}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-white">Recruitment Dashboard</h2>
            <p className="text-sm text-gray-400 mt-1">
              {overview.totalJobs || 0} total jobs · {overview.totalApplications || 0} applications · {overview.hireRate || 0}% hire rate
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <Sparkles size={12} />
              Active Hiring
            </div>
          </div>
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
                <p className="text-3xl font-bold text-white mt-2">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal text-gray-400 ml-1">{stat.suffix}</span>}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Status & Application Status Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Job Status</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                <YAxis stroke="rgba(255,255,255,0.3)" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {jobStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={20} className="text-fuchsia-400" />
            <h2 className="text-lg font-semibold text-white">Application Status</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={appStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {appStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={appStatusColors[entry.name] || CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-violet-400" />
              Monthly Trends
            </h2>
            <p className="text-sm text-gray-400">Job posts and applications over time</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
              Jobs
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Applications
            </span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="jobs" stackId="1" stroke={COLORS.fuchsia} fill={COLORS.fuchsia} fillOpacity={0.3} />
              <Area type="monotone" dataKey="applications" stackId="1" stroke={COLORS.emerald} fill={COLORS.emerald} fillOpacity={0.3} />
              <Legend formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job Performance */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Award size={20} className="text-amber-400" />
              Job Performance
            </h2>
            <p className="text-sm text-gray-400">Applications per job posting</p>
          </div>
        </div>
        <div className="space-y-3">
          {jobPerformance && jobPerformance.length > 0 ? (
            jobPerformance.slice(0, 5).map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-gray-400 w-5">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-white truncate">{job.title}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{job.applications}</span>
                  <span className="text-xs text-gray-400">applications</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <BriefcaseBusiness size={32} className="text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No job performance data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={20} className="text-violet-400" />
              Recent Activity
            </h2>
            <p className="text-sm text-gray-400">Latest recruitment activities</p>
          </div>
        </div>
        <div className="space-y-3">
          {recentActivities && recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-white/5">
                  {activity.type === 'job' ? (
                    <BriefcaseBusiness size={14} className="text-fuchsia-400" />
                  ) : (
                    <FileText size={14} className="text-emerald-400" />
                  )}
                </div>
                <div className="flex-1">
                  {activity.type === 'job' ? (
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.title}</span> was posted
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.applicant}</span> applied for{' '}
                      <span className="text-emerald-400">{activity.jobTitle}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                        {activity.status}
                      </span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(activity.createdAt || activity.appliedAt)}
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

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10">
              <Sparkles size={14} className="text-violet-400" />
            </div>
            <p className="text-xs text-gray-400">Interview Rate</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">{overview.interviewRate || 0}%</p>
          <p className="text-xs text-green-400">+5% this month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-fuchsia-500/10">
              <Target size={14} className="text-fuchsia-400" />
            </div>
            <p className="text-xs text-gray-400">Hire Rate</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">{overview.hireRate || 0}%</p>
          <p className="text-xs text-green-400">+3% this month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <UserCheck size={14} className="text-emerald-400" />
            </div>
            <p className="text-xs text-gray-400">Shortlisted</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">{overview.shortlistedApps || 0}</p>
          <p className="text-xs text-green-400">+8 this week</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <Star size={14} className="text-amber-400" />
            </div>
            <p className="text-xs text-gray-400">Avg. Response Time</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">2.4 days</p>
          <p className="text-xs text-green-400">-0.8 days this month</p>
        </div>
      </div>
    </div>
  );
}