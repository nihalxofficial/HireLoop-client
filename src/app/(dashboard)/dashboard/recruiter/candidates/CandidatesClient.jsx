// app/dashboard/recruiter/candidates/CandidatesClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  Pagination,
} from "@heroui/react";
import {
  Users,
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
  Star,
  StarOff,
  Building2,
  MapPin,
  X,
  Send,
  UserCheck,
  UserX,
  Hourglass,
  Award,
  ChevronDown,
  ChevronUp,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to get file icon
const getFileIcon = (fileName) => {
  if (!fileName) return <FileText size={14} />;
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <FileText size={14} className="text-red-400" />;
    case 'doc':
    case 'docx':
      return <FileText size={14} className="text-blue-400" />;
    default:
      return <FileText size={14} className="text-gray-400" />;
  }
};

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
    icon: <Award size={14} />,
    label: "Hired"
  }
};

export default function CandidatesClient({ initialCandidates }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [candidates, setCandidates] = useState(initialCandidates);
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isCVLoading, setIsCVLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get unique job titles for filter
  const jobTitles = ["all", ...new Set(candidates.map(c => c.jobTitle).filter(Boolean))];
  
  // Get unique statuses for filter
  const statuses = ["all", ...new Set(candidates.map(c => c.status).filter(Boolean))];

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === "" ||
      candidate.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    const matchesJob = jobFilter === "all" || candidate.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.appliedAt) - new Date(a.appliedAt);
    } else if (sortBy === "name") {
      comparison = (a.fullName || "").localeCompare(b.fullName || "");
    } else if (sortBy === "job") {
      comparison = (a.jobTitle || "").localeCompare(b.jobTitle || "");
    } else if (sortBy === "salary") {
      const aSalary = parseInt(a.expectedSalary?.replace(/[^0-9]/g, '') || '0');
      const bSalary = parseInt(b.expectedSalary?.replace(/[^0-9]/g, '') || '0');
      comparison = aSalary - bSalary;
    } else if (sortBy === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);
  const paginatedCandidates = sortedCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle status change - ready for API integration
  const handleStatusChange = async (candidateId, newStatus) => {
    setUpdatingStatus(candidateId);
    
    try {
      // Update local state immediately
      setCandidates(candidates.map(c => 
        c._id === candidateId ? { ...c, status: newStatus } : c
      ));
      
      toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
      
      // API call here
      // await updateCandidateStatus(candidateId, newStatus);
      
    } catch (error) {
      // Revert on error
      setCandidates(candidates.map(c => 
        c._id === candidateId ? { ...c, status: c.status } : c
      ));
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const toggleSaved = (id) => {
    setSavedCandidates(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
    toast.success(savedCandidates.includes(id) ? "Removed from saved" : "Added to saved");
  };

  const handleViewCV = async (candidate) => {
    setSelectedCV(candidate);
    setIsCVModalOpen(true);
    setIsCVLoading(true);
    
    if (candidate.cv?.url) {
      setIsCVLoading(false);
      return;
    }
    
    if (candidate._id) {
      try {
        const response = await fetch(`/api/applications/${candidate._id}/cv`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setSelectedCV(prev => ({
            ...prev,
            cv: {
              ...prev.cv,
              url: url
            }
          }));
        }
      } catch (error) {
        console.error('Error loading CV:', error);
      } finally {
        setIsCVLoading(false);
      }
    } else {
      setIsCVLoading(false);
    }
  };

  const handleDownloadCV = async (cv, applicationId) => {
    if (!cv) {
      toast.error("No CV available to download");
      return;
    }

    try {
      setLoading(true);
      
      if (cv.url) {
        if (cv.url.startsWith('blob:')) {
          const response = await fetch(cv.url);
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = cv.name || 'cv.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        } else {
          window.open(cv.url, '_blank');
        }
        toast.success('CV downloaded successfully');
        return;
      }
      
      if (applicationId) {
        const response = await fetch(`/api/applications/${applicationId}/cv`);
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to download CV');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = cv.name || 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('CV downloaded successfully');
      } else {
        toast.error("CV download link not available");
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error(error.message || 'Failed to download CV');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.applied;
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

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return salary;
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "name": return "Name A-Z";
      case "job": return "Job Title";
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Candidates
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and review all job applicants
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <UserPlus size={16} />
            Add Candidate
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
          <p className="text-2xl font-bold text-white mt-1">{candidates.length}</p>
          <p className="text-xs text-gray-400 mt-1">All applications</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Applied</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "applied" || c.status?.toLowerCase() === "pending").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">New</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Shortlisted</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "shortlisted").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Selected</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Interview</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "interview").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Scheduled</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search candidates by name, job title, company, or email..."
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
            <div className="w-37.5">
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

            <div className="w-37.5">
              <Select
                className="w-full"
                value={jobFilter}
                onChange={setJobFilter}
                variant="bordered"
                aria-label="Filter by job"
                placeholder="Job"
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
                  <Select.Value>{jobFilter === "all" ? "All Jobs" : jobFilter}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Jobs"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Jobs
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {jobTitles.filter(j => j !== "all").map(job => (
                      <ListBox.Item
                        key={job}
                        id={job}
                        textValue={job}
                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                      >
                        {job}
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-37.5">
              <Select
                className="w-full"
                value={sortBy}
                onChange={setSortBy}
                variant="bordered"
                aria-label="Sort candidates"
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
                      id="name"
                      textValue="Name A-Z"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Name A-Z
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

      {/* Candidates Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Candidate
                    {sortBy === "name" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
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
                  Contact
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Applied
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  CV
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCandidates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <Users size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No candidates found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                paginatedCandidates.map((candidate) => {
                  const statusConfig = getStatusConfig(candidate.status);
                  const avatarUrl = candidate.avatar || 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.fullName || 'User')}&background=8B5CF6&color=fff&size=64&bold=true`;
                  
                  return (
                    <tr key={candidate._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* Candidate - Name, Email, Salary */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <Image
                              width={40}
                              height={40}
                              src={avatarUrl}
                              alt={candidate.fullName || "Candidate"}
                              className="w-10 h-10 rounded-full ring-2 ring-violet-500/30 object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const parent = e.target.parentElement;
                                const div = document.createElement('div');
                                div.className = 'w-10 h-10 rounded-full ring-2 ring-violet-500/30 flex items-center justify-center bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold';
                                div.textContent = getInitials(candidate.fullName);
                                parent.appendChild(div);
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                              {candidate.fullName || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-400">{candidate.email || "No email"}</p>
                            {candidate.expectedSalary && (
                              <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                                <DollarSign size={12} />
                                {formatSalary(candidate.expectedSalary)}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Job / Company - with more padding on left */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <p className="text-sm text-white">{candidate.jobTitle || "No position"}</p>
                        {candidate.companyName && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Building2 size={12} className="text-violet-400" />
                            <span className="text-xs text-gray-400">{candidate.companyName}</span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </td>

                      {/* Contact - Phone only */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {candidate.phone ? (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Phone size={12} className="text-emerald-400" />
                            {candidate.phone}
                          </p>
                        ) : (
                          <span className="text-xs text-gray-500">No phone</span>
                        )}
                        {candidate.noticePeriod && (
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Clock size={12} className="text-blue-400" />
                            {candidate.noticePeriod}
                          </p>
                        )}
                      </td>

                      {/* Applied Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(candidate.appliedAt)}</span>
                      </td>

                      {/* CV */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {candidate.cv && candidate.cv.name ? (
                          <div className="flex items-center gap-1.5">
                            {getFileIcon(candidate.cv.name)}
                            <span className="text-xs text-gray-400 truncate max-w-25">
                              {candidate.cv.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">No CV</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {/* View Profile */}
                          <Link href={`/profile/${candidate.applicantId || candidate._id}`}>
                            <button
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                              title="View Profile"
                            >
                              <UserCircle size={16} />
                            </button>
                          </Link>

                          <button
                            onClick={() => toggleSaved(candidate._id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Save"
                          >
                            {savedCandidates.includes(candidate._id) ? (
                              <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => handleViewCV(candidate)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View CV"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadCV(candidate.cv, candidate._id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Download CV"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Message"
                          >
                            <MessageSquare size={16} />
                          </button>
                          
                          {/* Status Update Select - HeroUI */}
                          <Select
                            className="w-27.5"
                            value={candidate.status || "applied"}
                            onChange={(value) => handleStatusChange(candidate._id, value)}
                            variant="bordered"
                            aria-label="Change status"
                            size="sm"
                            placeholder="Status"
                            isDisabled={updatingStatus === candidate._id}
                            classNames={{
                              trigger: [
                                "border-white/10",
                                "bg-white/5",
                                "hover:border-violet-500/50",
                                "data-[focus=true]:border-violet-500",
                                "rounded-lg",
                                "h-8",
                                "min-h-8",
                                "px-2",
                                "transition-all",
                                "duration-200",
                              ],
                              value: "text-white text-xs",
                              placeholder: "text-gray-500 text-xs",
                            }}
                          >
                            <Select.Trigger>
                              <Select.Value />
                              <Select.Indicator className="text-gray-400 w-3 h-3" />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                  <ListBox.Item 
                                    key={key}
                                    id={key}
                                    textValue={config.label}
                                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                                  >
                                    <span className="flex items-center gap-2 text-sm">
                                      {config.icon}
                                      {config.label}
                                    </span>
                                    <ListBox.ItemIndicator className="text-violet-400" />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t border-white/10">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              classNames={{
                wrapper: "gap-2",
                item: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200",
                cursor: "bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg",
              }}
            />
          </div>
        )}

        {/* Footer */}
        {sortedCandidates.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedCandidates.length)} of {sortedCandidates.length} candidates
            </span>
          </div>
        )}
      </div>

      {/* CV Viewer Modal */}
      {isCVModalOpen && selectedCV && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedCV.fullName || "Candidate"}&apos;s CV
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedCV.cv?.name || "Resume"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCV.cv && (
                  <button
                    onClick={() => handleDownloadCV(selectedCV.cv, selectedCV._id)}
                    className="p-2 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    title="Download CV"
                  >
                    <Download size={18} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsCVModalOpen(false);
                    setSelectedCV(null);
                  }}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              {isCVLoading ? (
                <div className="flex items-center justify-center h-[70vh]">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading CV...</p>
                  </div>
                </div>
              ) : selectedCV.cv?.url || typeof selectedCV.cv === 'string' ? (
                <iframe
                  src={selectedCV.cv.url || selectedCV.cv}
                  className="w-full h-[70vh] rounded-lg border border-white/10"
                  title="CV Viewer"
                />
              ) : selectedCV.cv?.name ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-24 h-24 rounded-full bg-violet-500/10 flex items-center justify-center mb-4 border border-violet-500/20">
                    {getFileIcon(selectedCV.cv.name)}
                  </div>
                  <p className="text-white font-medium text-lg">{selectedCV.cv.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedCV.cv.size ? `${(selectedCV.cv.size / 1024).toFixed(0)} KB` : 'File'}
                  </p>
                  <button
                    onClick={() => handleDownloadCV(selectedCV.cv, selectedCV._id)}
                    className="mt-6 px-6 py-2.5 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Download CV
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText size={48} className="text-gray-600 mb-4" />
                  <p className="text-gray-400">No CV available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}