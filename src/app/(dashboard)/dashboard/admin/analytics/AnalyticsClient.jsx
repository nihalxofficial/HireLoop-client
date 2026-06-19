// app/dashboard/admin/analytics/AnalyticsClient.js
"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
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
} from "recharts";
import Image from "next/image";
import Link from "next/link";

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
  const { overview, monthlyData, recentActivities } = analyticsData;

  // Stat cards configuration
  const statCards = [
    {
      title: "Total Users",
      value: overview.totalUsers || 0,
      icon: <Users size={20} />,
      change: "+12.5%",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      detail: `${overview.seekers || 0} Seekers · ${overview.recruiters || 0} Recruiters · ${overview.admins || 0} Admins`
    },
    {
      title: "Total Jobs",
      value: overview.totalJobs || 0,
      icon: <BriefcaseBusiness size={20} />,
      change: "+18.3%",
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
      borderColor: "border-fuchsia-500/20",
      detail: `${overview.activeJobs || 0} Active · ${overview.pendingJobs || 0} Pending · ${overview.closedJobs || 0} Closed`
    },
    {
      title: "Total Companies",
      value: overview.totalCompanies || 0,
      icon: <Building2 size={20} />,
      change: "+8.7%",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      detail: `${overview.approvedCompanies || 0} Approved · ${overview.pendingCompanies || 0} Pending`
    },
    {
      title: "Applications",
      value: overview.totalApplications || 0,
      icon: <FileText size={20} />,
      change: "+22.1%",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      detail: `${overview.hiredApps || 0} Hired · ${overview.interviewApps || 0} Interview`
    },
  ];

  // Job type data for pie chart
  const jobTypeData = [
    { name: 'Full-time', value: overview.fullTimeJobs || 0 },
    { name: 'Part-time', value: overview.partTimeJobs || 0 },
    { name: 'Contract', value: overview.contractJobs || 0 },
    { name: 'Internship', value: overview.internshipJobs || 0 },
  ].filter(item => item.value > 0);

  // Job status data for pie chart
  const jobStatusData = [
    { name: 'Active', value: overview.activeJobs || 0 },
    { name: 'Pending', value: overview.pendingJobs || 0 },
    { name: 'Closed', value: overview.closedJobs || 0 },
    { name: 'Draft', value: overview.draftJobs || 0 },
  ].filter(item => item.value > 0);

  // Application status data for pie chart
  const appStatusData = [
    { name: 'Applied', value: overview.appliedApps || 0 },
    { name: 'Reviewing', value: overview.reviewingApps || 0 },
    { name: 'Shortlisted', value: overview.shortlistedApps || 0 },
    { name: 'Interview', value: overview.interviewApps || 0 },
    { name: 'Rejected', value: overview.rejectedApps || 0 },
    { name: 'Hired', value: overview.hiredApps || 0 },
  ].filter(item => item.value > 0);

  // User role data for pie chart
  const userRoleData = [
    { name: 'Seekers', value: overview.seekers || 0 },
    { name: 'Recruiters', value: overview.recruiters || 0 },
    { name: 'Admins', value: overview.admins || 0 },
  ].filter(item => item.value > 0);

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Platform overview and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export Report
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filter
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
                <p className="text-[10px] text-gray-500 mt-1">{stat.detail}</p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border ${stat.borderColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trends Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-violet-400" />
              Monthly Trends
            </h2>
            <p className="text-sm text-gray-400">User growth, job posts, and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              Users
            </span>
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
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke={COLORS.violet}
                strokeWidth={3}
                dot={{ fill: COLORS.violet, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke={COLORS.fuchsia}
                strokeWidth={3}
                dot={{ fill: COLORS.fuchsia, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke={COLORS.emerald}
                strokeWidth={3}
                dot={{ fill: COLORS.emerald, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Type Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={20} className="text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Job Types</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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

        {/* Job Status Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-emerald-400" />
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

        {/* User Role Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">User Roles</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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

      {/* Recent Activity */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={20} className="text-violet-400" />
              Recent Activity
            </h2>
            <p className="text-sm text-gray-400">Latest platform activities</p>
          </div>
          <Button className="bg-white/5 text-white hover:bg-white/10 transition-colors text-sm">
            View All
            <ChevronRight size={16} />
          </Button>
        </div>
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

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10">
              <Sparkles size={14} className="text-violet-400" />
            </div>
            <p className="text-xs text-gray-400">Active Users</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">
            {overview.totalUsers ? Math.round(overview.totalUsers * 0.75) : 0}
          </p>
          <p className="text-xs text-green-400">+15% this week</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-fuchsia-500/10">
              <Target size={14} className="text-fuchsia-400" />
            </div>
            <p className="text-xs text-gray-400">Job Match Rate</p>
          </div>
          <p className="text-xl font-bold text-white mt-1">68%</p>
          <p className="text-xs text-green-400">+5% this month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Award size={14} className="text-emerald-400" />
            </div>
            <p className="text-xs text-gray-400">Top Industry</p>
          </div>
          <p className="text-xl font-bold text-white mt-1 truncate">Technology</p>
          <p className="text-xs text-gray-400">32% of jobs</p>
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