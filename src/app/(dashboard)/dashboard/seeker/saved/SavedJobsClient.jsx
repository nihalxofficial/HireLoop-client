// app/dashboard/recruiter/saved/SavedJobsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  Bookmark,
  Search,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  Heart,
  HeartOff,
  ExternalLink,
  Eye,
  Trash2,
  Filter,
  Download,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

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

// Helper function to get status config
const getStatusConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle size={14} />, label: 'Active' };
    case 'pending':
      return { color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: <Clock size={14} />, label: 'Pending' };
    case 'closed':
      return { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: <XCircle size={14} />, label: 'Closed' };
    case 'draft':
      return { color: 'text-gray-400 bg-gray-500/10 border-gray-500/20', icon: <Clock size={14} />, label: 'Draft' };
    default:
      return { color: 'text-gray-400 bg-gray-500/10 border-gray-500/20', icon: <Clock size={14} />, label: status || 'Unknown' };
  }
};

// Helper function to get type color
const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'full-time':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'part-time':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'contract':
      return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    case 'internship':
      return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
};

export default function SavedJobsClient({ initialSavedJobs, initialStats }) {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [stats] = useState(initialStats);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);

  // Get unique values for filters
  const statuses = ["all", ...new Set(savedJobs.map(j => j.status).filter(Boolean))];
  const types = ["all", ...new Set(savedJobs.map(j => j.type).filter(Boolean))];

  // Filter saved jobs
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = searchTerm === "" ||
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.savedAt || b.createdAt) - new Date(a.savedAt || a.createdAt);
    } else if (sortBy === "title") {
      comparison = (a.title || "").localeCompare(b.title || "");
    } else if (sortBy === "company") {
      comparison = (a.companyName || "").localeCompare(b.companyName || "");
    } else if (sortBy === "salary") {
      const aSalary = parseInt(a.salaryMax?.replace(/[^0-9]/g, '') || '0');
      const bSalary = parseInt(b.salaryMax?.replace(/[^0-9]/g, '') || '0');
      comparison = aSalary - bSalary;
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

  const handleRemoveSaved = (jobId) => {
    if (confirm("Are you sure you want to remove this job from saved?")) {
      setSavedJobs(savedJobs.filter(j => j._id !== jobId));
      toast.success("Job removed from saved");
    }
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getTypeLabel = (type) => {
    if (type === "all") return "All Types";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "title": return "Job Title";
      case "company": return "Company";
      case "salary": return "Highest Salary";
      case "status": return "Status";
      default: return "Most Recent";
    }
  };

  // Stats cards
  const statCards = [
    {
      title: "Saved Jobs",
      value: stats.total || 0,
      icon: <Bookmark size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Active",
      value: stats.active || 0,
      icon: <CheckCircle size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending",
      value: stats.pending || 0,
      icon: <Clock size={20} />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Closed",
      value: stats.closed || 0,
      icon: <XCircle size={20} />,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and track jobs you&apos;ve saved
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/recruiter/jobs">
            <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <BriefcaseBusiness size={16} />
              Browse Jobs
            </Button>
          </Link>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer">
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
              placeholder="Search saved jobs by title, company, or location..."
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
                value={typeFilter}
                onChange={setTypeFilter}
                variant="bordered"
                aria-label="Filter by type"
                placeholder="Type"
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
                  <Select.Value>{getTypeLabel(typeFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Types"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Types
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {types.filter(t => t !== "all").map(type => (
                      <ListBox.Item
                        key={type}
                        id={type}
                        textValue={type.charAt(0).toUpperCase() + type.slice(1)}
                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    ))}
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
                aria-label="Sort jobs"
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
                      id="title"
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
                      id="salary"
                      textValue="Highest Salary"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Highest Salary
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

            <div className="flex items-center gap-1 bg-white/5 rounded-xl border border-white/10 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "grid" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "list" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:text-white"
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Jobs Grid/List */}
      {savedJobs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <Bookmark size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">No saved jobs</h3>
          <p className="text-sm text-gray-400 mt-1">
            Start saving jobs to track them here
          </p>
          <Link href="/dashboard/recruiter/jobs">
            <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              Browse Jobs
            </Button>
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedJobs.map((job) => {
            const statusConfig = getStatusConfig(job.status);
            const avatarUrl = job.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.companyName || 'Company')}&background=8B5CF6&color=fff&size=64&bold=true`;
            
            return (
              <div
                key={job._id}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 hover:scale-[1.02] cursor-pointer"
              >
                {/* Status & Remove Button */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </span>
                  <button
                    onClick={() => handleRemoveSaved(job._id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                    title="Remove from saved"
                  >
                    <HeartOff size={16} />
                  </button>
                </div>

                {/* Company Logo & Job Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative shrink-0">
                    {job.companyLogo ? (
                      <Image
                        width={48}
                        height={48}
                        src={job.companyLogo}
                        alt={job.companyName || "Company"}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const div = document.createElement('div');
                          div.className = 'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10';
                          div.textContent = getInitials(job.companyName);
                          parent.appendChild(div);
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10">
                        {getInitials(job.companyName)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">
                      {job.title || "Unknown Position"}
                    </h3>
                    <p className="text-sm text-gray-400">{job.companyName || "Unknown Company"}</p>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={14} className="text-violet-400" />
                    <span>{job.location || "Remote"}</span>
                    {job.isRemote && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        Remote
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <DollarSign size={14} />
                    <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getTypeColor(job.type)}`}>
                    {job.type || "N/A"}
                  </span>
                  {job.category && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {job.category}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    Saved {formatDate(job.savedAt || job.createdAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link href={`/dashboard/recruiter/jobs/${job._id}`}>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        title="View Job"
                      >
                        <Eye size={14} />
                      </button>
                    </Link>
                    <Link href={`/dashboard/recruiter/jobs/${job._id}/edit`}>
                      <button
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:opacity-90 transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("title")}>
                    <div className="flex items-center gap-1">
                      Job Title
                      {sortBy === "title" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("company")}>
                    <div className="flex items-center gap-1">
                      Company
                      {sortBy === "company" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("salary")}>
                    <div className="flex items-center gap-1">
                      Salary
                      {sortBy === "salary" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      {sortBy === "status" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                    <div className="flex items-center gap-1">
                      Saved
                      {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedJobs.map((job) => {
                  const statusConfig = getStatusConfig(job.status);
                  return (
                    <tr key={job._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                          {job.title || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">{job.category || "N/A"}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {job.companyLogo ? (
                            <Image
                              width={24}
                              height={24}
                              src={job.companyLogo}
                              alt={job.companyName || "Company"}
                              className="w-6 h-6 rounded-lg object-cover ring-1 ring-white/10"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-[8px] font-semibold ring-1 ring-white/10">
                              {getInitials(job.companyName)}
                            </div>
                          )}
                          <span className="text-sm text-gray-300">{job.companyName || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{job.location || "Remote"}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-emerald-400">
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(job.savedAt || job.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/dashboard/recruiter/jobs/${job._id}`}>
                            <button
                              className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                              title="View Job"
                            >
                              <Eye size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleRemoveSaved(job._id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                            title="Remove from saved"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {sortedJobs.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-gray-400">
                Showing {sortedJobs.length} saved job{sortedJobs.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}