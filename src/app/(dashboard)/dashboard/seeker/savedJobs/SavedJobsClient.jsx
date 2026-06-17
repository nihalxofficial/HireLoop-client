// app/dashboard/seeker/saved/SavedJobsClient.js
"use client";

import React, { useState, useEffect } from "react";
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
  Building2,
  Heart,
  HeartOff,
  ExternalLink,
  X,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// API function to toggle save status - Replace with your actual API call
const toggleSaveJob = async (jobId, userId) => {
  // This is a mock function - replace with your actual API call
  // Example: await fetch(`/api/saved-jobs/${jobId}`, { method: 'POST' });
  return { success: true };
};

// API function to check if job is saved - Replace with your actual API call
const checkSavedStatus = async (jobId, userId) => {
  // This is a mock function - replace with your actual API call
  // Example: const res = await fetch(`/api/saved-jobs/${jobId}/status`);
  // return res.json();
  return { isSaved: false };
};

export default function SavedJobsClient({ initialSavedJobs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [sortDirection, setSortDirection] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Get user ID from session if needed
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/auth/get-session');
        const session = await response.json();
        setUserId(session?.user?.id || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);

  // Get unique job types and categories for filters
  const jobTypes = ["all", ...new Set(savedJobs.map(job => job.type).filter(Boolean))];
  const jobCategories = ["all", ...new Set(savedJobs.map(job => job.category).filter(Boolean))];

  // Filter saved jobs
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = searchTerm === "" ||
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
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
      comparison = (parseInt(a.salaryMax) || 0) - (parseInt(b.salaryMax) || 0);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "part-time":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "contract":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "internship":
        return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      case "remote":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "closed":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "draft":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const handleToggleSave = async (jobId) => {
    setLoading(true);
    try {
      // Call your API to toggle save status
      const result = await toggleSaveJob(jobId, userId);
      
      if (result.success) {
        setSavedJobs(savedJobs.map(job => 
          job._id === jobId ? { ...job, isSaved: !job.isSaved } : job
        ));
        const job = savedJobs.find(j => j._id === jobId);
        toast.success(job?.isSaved ? "Removed from saved" : "Added to saved");
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      toast.error("Failed to update saved status");
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    if (type === "all") return "All Types";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getCategoryLabel = (category) => {
    if (category === "all") return "All Categories";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "title": return "Job Title";
      case "company": return "Company";
      case "salary": return "Highest Salary";
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

  // Loading state
  if (!savedJobs && loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={48} className="text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track and manage jobs you&apos;ve saved for later
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/jobs">
            <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
              <BriefcaseBusiness size={16} />
              Browse More Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Total Jobs</p>
          <p className="text-2xl font-bold text-white mt-1">{savedJobs.length}</p>
          <p className="text-xs text-gray-400 mt-1">All jobs</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Full-time</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {savedJobs.filter(job => job.type?.toLowerCase() === "full-time").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Permanent roles</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Remote</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">
            {savedJobs.filter(job => job.isRemote).length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Work from anywhere</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Active</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {savedJobs.filter(job => job.status?.toLowerCase() === "active").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Currently hiring</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search size={16} className="text-gray-400" />}
              variant="bordered"
              fullWidth
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              className="w-full"
              value={typeFilter}
              onChange={setTypeFilter}
              variant="bordered"
              aria-label="Filter by job type"
              placeholder="Job Type"
              classNames={{
                trigger: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "data-[focus=true]:border-violet-500",
                  "data-[focus=true]:ring-1",
                  "data-[focus=true]:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
                value: "text-white",
                placeholder: "text-gray-500",
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

          <div className="w-full sm:w-48">
            <Select
              className="w-full"
              value={categoryFilter}
              onChange={setCategoryFilter}
              variant="bordered"
              aria-label="Filter by category"
              placeholder="Category"
              classNames={{
                trigger: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "data-[focus=true]:border-violet-500",
                  "data-[focus=true]:ring-1",
                  "data-[focus=true]:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
                value: "text-white",
                placeholder: "text-gray-500",
              }}
            >
              <Select.Trigger>
                <Select.Value>{getCategoryLabel(categoryFilter)}</Select.Value>
                <Select.Indicator className="text-gray-400" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                  <ListBox.Item
                    id="all"
                    textValue="All Categories"
                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                  >
                    All Categories
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  {jobCategories.filter(c => c !== "all").map(category => (
                    <ListBox.Item
                      key={category}
                      id={category}
                      textValue={category.charAt(0).toUpperCase() + category.slice(1)}
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select
              className="w-full"
              value={sortBy}
              onChange={setSortBy}
              variant="bordered"
              aria-label="Sort jobs"
              placeholder="Sort by"
              classNames={{
                trigger: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "data-[focus=true]:border-violet-500",
                  "data-[focus=true]:ring-1",
                  "data-[focus=true]:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
                value: "text-white",
                placeholder: "text-gray-500",
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
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {sortedJobs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <Bookmark size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">No saved jobs found</h3>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm || typeFilter !== "all" || categoryFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Start exploring jobs and save your favorites"}
          </p>
          {!searchTerm && typeFilter === "all" && categoryFilter === "all" && (
            <Link href="/jobs">
              <Button className="mt-4 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                Browse Jobs
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedJobs.map((job) => (
            <div
              key={job._id}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 hover:scale-[1.02]"
            >
              {/* Save Button */}
              <button
                onClick={() => handleToggleSave(job._id)}
                disabled={loading}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                title={job.isSaved ? "Remove from saved" : "Save job"}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : job.isSaved ? (
                  <Heart size={18} className="fill-red-400 text-red-400" />
                ) : (
                  <HeartOff size={18} />
                )}
              </button>

              {/* Company Logo */}
              <div className="flex items-center gap-3 mb-3">
                {job.companyLogo ? (
                  <Image
                    width={48}
                    height={48}
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-white/10">
                    <Building2 size={20} className="text-violet-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate hover:text-violet-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{job.companyName}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={12} className="text-violet-400 shrink-0" />
                  <span className="truncate">{job.location || "Remote"}</span>
                  {job.isRemote && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <DollarSign size={12} className="text-green-400 shrink-0" />
                  <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getTypeColor(job.type)}`}>
                    {job.type || "N/A"}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(job.status)}`}>
                    {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || "N/A"}
                  </span>
                  {job.category && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {job.category}
                    </span>
                  )}
                </div>
                {job.deadline && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>Deadline: {formatDate(job.deadline)}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} />
                  Posted {formatDate(job.createdAt)}
                </span>
                <div className="flex items-center gap-1">
                  <Link href={`/jobs/${job._id}`}>
                    <button
                      className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200"
                      title="View Job"
                    >
                      <Eye size={14} />
                    </button>
                  </Link>
                  <Link href={`/jobs/${job._id}/apply`}>
                    <button
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-linear-to-r from-fuchsia-500 to-violet-600 text-white hover:opacity-90 transition-all"
                    >
                      Apply
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}