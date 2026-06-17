// app/dashboard/admin/jobs/JobsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  BriefcaseBusiness,
  Search,
  Eye,
  Mail,
  Download,
  UserPlus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Phone,
  FileText,
  DollarSign,
  ExternalLink,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  Building2,
  Edit,
  Trash2,
  Check,
  X as XIcon,
  AlertCircle,
  Loader2,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "J";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Status configuration with icons and colors
const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: <Clock size={14} />,
    label: "Pending"
  },
  active: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <CheckCircle size={14} />,
    label: "Active"
  },
  closed: {
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: <XCircle size={14} />,
    label: "Closed"
  },
  draft: {
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    icon: <FileText size={14} />,
    label: "Draft"
  }
};

export default function JobsClient({ initialJobs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Get unique values for filters
  const statuses = ["all", ...new Set(jobs.map(j => j.status).filter(Boolean))];
  const jobTypes = ["all", ...new Set(jobs.map(j => j.type).filter(Boolean))];

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" ||
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.createdAt) - new Date(a.createdAt);
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

  // Handle status change - ready for API integration
  const handleStatusChange = async (jobId, newStatus) => {
    setUpdatingStatus(jobId);
    
    try {
      const job = jobs.find(j => j._id === jobId);
      const previousStatus = job?.status;

      setJobs(jobs.map(j => 
        j._id === jobId ? { ...j, status: newStatus } : j
      ));
      
      toast.success(`Job status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/jobs/${jobId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      
    } catch (error) {
      console.error('Error updating job status:', error);
      const job = jobs.find(j => j._id === jobId);
      if (job) {
        setJobs(jobs.map(j => 
          j._id === jobId ? { ...j, status: job.status } : j
        ));
      }
      toast.error(error.message || 'Failed to update job status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
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

  const handleSort = (sortKey) => {
    if (sortBy === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

  const openDetailsModal = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const isUpdating = (jobId) => updatingStatus === jobId;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Jobs
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all job listings on the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <UserPlus size={16} />
            Add Job
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-2xl font-bold text-white mt-1">{jobs.length}</p>
          <p className="text-xs text-gray-400 mt-1">All jobs</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {jobs.filter(j => j.status?.toLowerCase() === "active").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Live jobs</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {jobs.filter(j => j.status?.toLowerCase() === "pending").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Awaiting review</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Closed</p>
          <p className="text-2xl font-bold text-red-400 mt-1">
            {jobs.filter(j => j.status?.toLowerCase() === "closed").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Not accepting</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search jobs by title, company, category, or location..."
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
                aria-label="Filter by job type"
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
                    {jobTypes.filter(t => t !== "all").map(type => (
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
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("title")}>
                  <div className="flex items-center gap-1">
                    Job
                    {sortBy === "title" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("company")}>
                  <div className="flex items-center gap-1">
                    Company
                    {sortBy === "company" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Type / Category
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
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Status / Actions
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Posted
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-16">
                    <BriefcaseBusiness size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No jobs found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                sortedJobs.map((job) => {
                  const statusConfig = getStatusConfig(job.status);
                  const isPending = job.status?.toLowerCase() === "pending";
                  const isLoading = isUpdating(job._id);
                  
                  return (
                    <tr key={job._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* Job - Title */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                            {job.title || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">{job.category || "No category"}</p>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="relative shrink-0">
                            {job.companyLogo ? (
                              <Image
                                width={32}
                                height={32}
                                src={job.companyLogo}
                                alt={job.companyName || "Company"}
                                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  const div = document.createElement('div');
                                  div.className = 'w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-[10px] font-semibold ring-1 ring-white/10';
                                  div.textContent = getInitials(job.companyName);
                                  parent.appendChild(div);
                                }}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-[10px] font-semibold ring-1 ring-white/10">
                                {getInitials(job.companyName)}
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-gray-300">{job.companyName}</span>
                        </div>
                      </td>

                      {/* Type / Category */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <span className="text-xs text-gray-300">{job.type || "N/A"}</span>
                          {job.isRemote && (
                            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                              Remote
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {job.location ? (
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-violet-400" />
                            <span className="text-sm text-gray-400">{job.location}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-emerald-400">
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </span>
                      </td>

                      {/* Status / Actions - Combined Column */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 size={14} className="text-violet-400 animate-spin" />
                            <span className="text-xs text-gray-400">Processing...</span>
                          </div>
                        ) : isPending ? (
                          <div className="flex flex-col items-start gap-1.5">
                            <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStatusChange(job._id, "active")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 flex items-center gap-1 text-[10px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Activate Job"
                              >
                                <Check size={12} />
                                Activate
                              </button>
                              <button
                                onClick={() => handleStatusChange(job._id, "closed")}
                                className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 flex items-center gap-1 text-[10px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Close Job"
                              >
                                <XIcon size={12} />
                                Close
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        )}
                      </td>

                      {/* Posted Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(job.createdAt)}</span>
                        {job.deadline && (
                          <div className="text-[10px] text-gray-500">
                            Deadline: {formatDate(job.deadline)}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {/* View Details */}
                          <button
                            onClick={() => openDetailsModal(job)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Edit Job"
                          >
                            <Edit size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Delete Job"
                          >
                            <Trash2 size={16} />
                          </button>
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
        {sortedJobs.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {isDetailsModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                {selectedJob.companyLogo ? (
                  <Image
                    width={48}
                    height={48}
                    src={selectedJob.companyLogo}
                    alt={selectedJob.companyName || "Company"}
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
                  <h3 className="text-lg font-semibold text-white">{selectedJob.title}</h3>
                  <p className="text-sm text-gray-400">{selectedJob.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedJob(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              {/* Status & Date */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusConfig(selectedJob.status).color}`}>
                  {getStatusConfig(selectedJob.status).icon}
                  {getStatusConfig(selectedJob.status).label}
                </span>
                <span className="text-sm text-gray-400">
                  Posted: {formatDate(selectedJob.createdAt)}
                </span>
                {selectedJob.deadline && (
                  <span className="text-sm text-gray-500">
                    Deadline: {formatDate(selectedJob.deadline)}
                  </span>
                )}
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Category</p>
                  <p className="text-sm text-white">{selectedJob.category || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-white">{selectedJob.type || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white">{selectedJob.location || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Remote</p>
                  <p className="text-sm text-white">{selectedJob.isRemote ? "Yes" : "No"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Salary Range</p>
                  <p className="text-sm text-emerald-400">
                    {formatSalary(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.currency)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Currency</p>
                  <p className="text-sm text-white">{selectedJob.currency?.toUpperCase() || "N/A"}</p>
                </div>
              </div>

              {/* Responsibilities */}
              {selectedJob.responsibilities && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Responsibilities</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedJob.responsibilities}</p>
                </div>
              )}

              {/* Requirements */}
              {selectedJob.requirements && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Requirements</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedJob.requirements}</p>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Benefits</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedJob.benefits}</p>
                </div>
              )}

              {/* Recruiter Info */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-2">Recruiter Info</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-violet-400" />
                    <span className="text-sm text-gray-300">Recruiter ID: {selectedJob.recruiterId || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedJob.status?.toLowerCase() === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedJob._id, "active");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedJob._id)}
                    className="flex-1 cursor-pointer px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedJob._id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Activate Job
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedJob._id, "closed");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedJob._id)}
                    className="flex-1 cursor-pointer px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedJob._id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XIcon size={16} />
                        Close Job
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}