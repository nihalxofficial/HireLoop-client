// app/dashboard/seeker/history/HistoryClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  History,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  FileText,
  DollarSign,
  ExternalLink,
  Building2,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  BriefcaseBusiness,
  User,
  Mail,
  Phone,
  Loader2,
  Filter,
  TrendingUp,
  Award,
  Star,
  Send,
  Hourglass,
  UserCheck,
  UserX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "C";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to format salary
const formatSalary = (min, max, currency) => {
  if (!min && !max) return "Not specified";
  const symbol = currency?.toUpperCase() === 'BDT' ? '৳' : '$';
  if (min && max) {
    return `${symbol}${parseInt(min).toLocaleString()} - ${symbol}${parseInt(max).toLocaleString()}`;
  }
  if (min) return `${symbol}${parseInt(min).toLocaleString()}`;
  if (max) return `${symbol}${parseInt(max).toLocaleString()}`;
  return "Not specified";
};

// Status configuration with icons and colors
const STATUS_CONFIG = {
  applied: {
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    icon: <Send size={14} />,
    label: "Applied"
  },
  pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: <Hourglass size={14} />,
    label: "Pending"
  },
  reviewing: {
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    icon: <Eye size={14} />,
    label: "Reviewing"
  },
  shortlisted: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <UserCheck size={14} />,
    label: "Shortlisted"
  },
  interview: {
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: <Calendar size={14} />,
    label: "Interview"
  },
  rejected: {
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: <UserX size={14} />,
    label: "Rejected"
  },
  hired: {
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: <CheckCircle size={14} />,
    label: "Hired"
  }
};

export default function HistoryClient({ initialApplications, initialStats }) {
  const [applications, setApplications] = useState(initialApplications);
  const [stats] = useState(initialStats);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(applications.map(a => a.status).filter(Boolean))];

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === "" ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.appliedAt) - new Date(a.appliedAt);
    } else if (sortBy === "job") {
      comparison = (a.jobTitle || "").localeCompare(b.jobTitle || "");
    } else if (sortBy === "company") {
      comparison = (a.companyName || "").localeCompare(b.companyName || "");
    } else if (sortBy === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (sortKey) => {
    if (sortBy === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.applied;
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "job": return "Job Title";
      case "company": return "Company";
      case "status": return "Status";
      default: return "Most Recent";
    }
  };

  const openDetailsModal = (app) => {
    setSelectedApplication(app);
    setIsDetailsModalOpen(true);
  };

  // Stats cards
  const statCards = [
    {
      title: "Total Applications",
      value: stats.total || 0,
      icon: <FileText size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Under Review",
      value: stats.pending + stats.reviewing || 0,
      icon: <Clock size={20} />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Interviews",
      value: stats.interview || 0,
      icon: <Calendar size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Hired",
      value: stats.hired || 0,
      icon: <Award size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Application History
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track all your job applications and their status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/jobs">
            <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
              <BriefcaseBusiness size={16} />
              Browse Jobs
            </Button>
          </Link>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`rounded-lg ${stat.bgColor} p-2`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by job title, company, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search size={16} className="text-gray-400" />}
              variant="bordered"
              fullWidth
              classNames={{
                input: "text-white placeholder:text-gray-500 text-sm",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-[140px]">
              <Select
                className="w-full"
                value={statusFilter}
                onChange={setStatusFilter}
                variant="bordered"
                aria-label="Filter by status"
                placeholder="Status"
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
                  placeholder: "text-gray-500 text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value>{getStatusLabel(statusFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Statuses"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Statuses
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {statuses.filter(s => s !== "all").map(status => {
                      const config = getStatusConfig(status);
                      return (
                        <ListBox.Item
                          key={status}
                          id={status}
                          textValue={config.label}
                          className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            {config.icon}
                            {config.label}
                          </span>
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-[140px]">
              <Select
                className="w-full"
                value={sortBy}
                onChange={setSortBy}
                variant="bordered"
                aria-label="Sort applications"
                placeholder="Sort"
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
                  placeholder: "text-gray-500 text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value>{getSortLabel(sortBy)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="recent"
                      textValue="Most Recent"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Most Recent
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="job"
                      textValue="Job Title"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Job Title
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="company"
                      textValue="Company"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Company
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="status"
                      textValue="Status"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Status
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("job")}>
                  <div className="flex items-center gap-1">
                    Job / Company
                    {sortBy === "job" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-1">
                    Status
                    {sortBy === "status" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Salary
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Applied
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No applications found</p>
                    <p className="text-sm text-gray-500">Start applying to jobs to track your history</p>
                  </td>
                </tr>
              ) : (
                sortedApplications.map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  const avatarUrl = app.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.companyName || 'Company')}&background=8B5CF6&color=fff&size=64&bold=true`;
                  
                  return (
                    <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* Job / Company */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {app.companyLogo ? (
                              <Image
                                width={40}
                                height={40}
                                src={app.companyLogo}
                                alt={app.companyName || "Company"}
                                className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10';
                                  div.textContent = getInitials(app.companyName);
                                  parent.appendChild(div);
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10">
                                {getInitials(app.companyName)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                              {app.jobTitle || "Unknown Position"}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Building2 size={12} className="text-violet-400" />
                              <span className="text-xs text-gray-400">{app.companyName}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{app.jobLocation || app.companyLocation || "N/A"}</span>
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-emerald-400">
                          {formatSalary(app.salaryMin, app.salaryMax, app.currency)}
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(app.appliedAt)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openDetailsModal(app)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {app.cv?.name && (
                            <Link href={app.cv?.url || `/api/applications/${app._id}/cv`}>
                              <button
                                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                                title="Download CV"
                              >
                                <Download size={16} />
                              </button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {sortedApplications.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedApplications.length} application{sortedApplications.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {isDetailsModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                {selectedApplication.companyLogo ? (
                  <Image
                    width={48}
                    height={48}
                    src={selectedApplication.companyLogo}
                    alt={selectedApplication.companyName || "Company"}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/30"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-white/10">
                    <Building2 size={24} className="text-violet-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedApplication.jobTitle}</h3>
                  <p className="text-sm text-gray-400">{selectedApplication.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedApplication(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              {/* Status & Date */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusConfig(selectedApplication.status).color}`}>
                  {getStatusConfig(selectedApplication.status).icon}
                  {getStatusConfig(selectedApplication.status).label}
                </span>
                <span className="text-sm text-gray-400">
                  Applied: {formatDate(selectedApplication.appliedAt)}
                </span>
                {selectedApplication.updatedAt && selectedApplication.updatedAt !== selectedApplication.appliedAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {formatDate(selectedApplication.updatedAt)}
                  </span>
                )}
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Position</p>
                  <p className="text-sm text-white">{selectedApplication.jobTitle}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Company</p>
                  <p className="text-sm text-white">{selectedApplication.companyName}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white">{selectedApplication.jobLocation || selectedApplication.companyLocation || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Salary Range</p>
                  <p className="text-sm text-emerald-400">
                    {formatSalary(selectedApplication.salaryMin, selectedApplication.salaryMax, selectedApplication.currency)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Job Type</p>
                  <p className="text-sm text-white">{selectedApplication.jobType || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Application ID</p>
                  <p className="text-sm text-gray-400 text-xs break-all">{selectedApplication._id || "N/A"}</p>
                </div>
              </div>

              {/* CV */}
              {selectedApplication.cv?.name && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">CV / Resume</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FileText size={16} className="text-violet-400" />
                      <span>{selectedApplication.cv.name}</span>
                    </div>
                    <Link href={selectedApplication.cv?.url || `/api/applications/${selectedApplication._id}/cv`}>
                      <button className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                        <Download size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Cover Letter</p>
                  <div className="max-h-48 overflow-y-auto">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-3">Application Status</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <span
                      key={key}
                      className={`text-xs px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 ${selectedApplication.status === key ? config.color : 'text-gray-500 bg-gray-500/10 border-gray-500/20'}`}
                    >
                      {config.icon}
                      {config.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}