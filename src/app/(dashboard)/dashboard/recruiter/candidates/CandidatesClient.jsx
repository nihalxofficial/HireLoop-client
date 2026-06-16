// app/dashboard/recruiter/candidates/CandidatesClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
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
  MoreVertical,
  Phone,
  FileText,
  DollarSign,
  ExternalLink,
  Star,
  StarOff,
  Building2,
  MapPin,
  X,
} from "lucide-react";
import Image from "next/image";
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
    case 'txt':
      return <FileText size={14} className="text-gray-400" />;
    default:
      return <FileText size={14} className="text-gray-400" />;
  }
};

export default function CandidatesClient({ initialCandidates }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [candidates, setCandidates] = useState(initialCandidates);
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isCVLoading, setIsCVLoading] = useState(false);

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
    if (sortBy === "recent") return new Date(b.appliedAt) - new Date(a.appliedAt);
    if (sortBy === "name") return (a.fullName || "").localeCompare(b.fullName || "");
    if (sortBy === "job") return (a.jobTitle || "").localeCompare(b.jobTitle || "");
    if (sortBy === "salary") {
      const aSalary = parseInt(a.expectedSalary?.replace(/[^0-9]/g, '') || '0');
      const bSalary = parseInt(b.expectedSalary?.replace(/[^0-9]/g, '') || '0');
      return bSalary - aSalary;
    }
    return 0;
  });

  const updateCandidateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      setCandidates(candidates.map(c => 
        c._id === id ? { ...c, status: newStatus } : c
      ));
      toast.success(`Candidate status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update candidate status");
    } finally {
      setLoading(false);
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
    
    // If CV has a URL already, use it
    if (candidate.cv?.url) {
      setIsCVLoading(false);
      return;
    }
    
    // Fetch CV from API
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
        } else {
          // If API returns error, try to show the CV name with download option
          const error = await response.json();
          console.error('CV fetch error:', error);
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
      
      // If CV has a URL (blob URL or regular URL)
      if (cv.url) {
        if (cv.url.startsWith('blob:')) {
          // For blob URLs, fetch and download
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
          // For regular URLs, open in new tab
          window.open(cv.url, '_blank');
        }
        toast.success('CV downloaded successfully');
        return;
      }
      
      // If CV has a path
      if (cv.path) {
        window.open(cv.path, '_blank');
        toast.success('CV downloaded successfully');
        return;
      }
      
      // If we have an application ID, fetch from API
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "reviewing":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "shortlisted":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "interview":
        return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      case "rejected":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "hired":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock size={14} />;
      case "reviewing":
        return <Clock size={14} />;
      case "shortlisted":
        return <CheckCircle size={14} />;
      case "interview":
        return <Calendar size={14} />;
      case "rejected":
        return <XCircle size={14} />;
      case "hired":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
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

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return salary;
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "name": return "Name A-Z";
      case "job": return "Job Title";
      case "salary": return "Highest Salary";
      default: return "Most Recent";
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
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
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
          <p className="text-xs text-gray-400">Total Applications</p>
          <p className="text-2xl font-bold text-white mt-1">{candidates.length}</p>
          <p className="text-xs text-green-400 mt-1">All applications</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "pending").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Awaiting action</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Shortlisted</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "shortlisted").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Selected for interview</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Interview Stage</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">
            {candidates.filter(c => c.status?.toLowerCase() === "interview").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Scheduled interviews</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search candidates by name, job title, company, or email..."
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
              value={statusFilter}
              onChange={setStatusFilter}
              variant="bordered"
              aria-label="Filter candidates by status"
              placeholder="Filter by status"
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
                  {statuses.filter(s => s !== "all").map(status => (
                    <ListBox.Item
                      key={status}
                      id={status}
                      textValue={status.charAt(0).toUpperCase() + status.slice(1)}
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
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
              value={jobFilter}
              onChange={setJobFilter}
              variant="bordered"
              aria-label="Filter candidates by job"
              placeholder="Filter by job"
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

          <div className="w-full sm:w-48">
            <Select
              className="w-full"
              value={sortBy}
              onChange={setSortBy}
              variant="bordered"
              aria-label="Sort candidates"
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
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="space-y-4">
        {sortedCandidates.map((candidate) => (
          <div
            key={candidate._id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10"
          >
            <div className="flex flex-col gap-4">
              {/* Top Row: Status Badge and Save Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(candidate.status)}`}>
                    {getStatusIcon(candidate.status)}
                    {candidate.status?.charAt(0).toUpperCase() + candidate.status?.slice(1) || "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => toggleSaved(candidate._id)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {savedCandidates.includes(candidate._id) ? (
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff size={16} className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Main Content */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Avatar & Basic Info */}
                <div className="flex items-start gap-4 flex-1">
                  <Image
                    width={64}
                    height={64}
                    src={candidate.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                    alt={candidate.fullName || "Candidate"}
                    className="w-16 h-16 rounded-full ring-2 ring-violet-500/30 object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white hover:text-violet-400 transition-colors cursor-pointer">
                      {candidate.fullName || "Unknown Candidate"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">{candidate.jobTitle || "No position"}</p>
                    
                    {/* Company Info */}
                    {candidate.companyName && (
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 size={14} className="text-violet-400" />
                        <span className="text-sm text-gray-300">{candidate.companyName}</span>
                        {candidate.companyLocation && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-500" />
                            <MapPin size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-400">{candidate.companyLocation}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={12} />
                        Applied {formatDate(candidate.appliedAt)}
                      </span>
                      {candidate.phone && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Phone size={12} className="text-emerald-400" />
                          {candidate.phone}
                        </span>
                      )}
                      {candidate.expectedSalary && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <DollarSign size={12} className="text-green-400" />
                          {formatSalary(candidate.expectedSalary)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200" title="View Profile">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200" title="Send Message">
                    <MessageSquare size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:text-fuchsia-400 hover:bg-white/10 transition-all duration-200" title="Send Email">
                    <Mail size={18} />
                  </button>
                  
                  {/* Status Update Select */}
                  <Select
                    className="w-32"
                    value={candidate.status || "pending"}
                    onChange={(value) => updateCandidateStatus(candidate._id, value)}
                    variant="bordered"
                    aria-label="Change candidate status"
                    size="sm"
                    placeholder="Set status"
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
                      <Select.Value>
                        {candidate.status?.charAt(0).toUpperCase() + candidate.status?.slice(1) || "Pending"}
                      </Select.Value>
                      <Select.Indicator className="text-gray-400 w-3 h-3" />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                        <ListBox.Item id="pending" textValue="Pending" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Pending
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        <ListBox.Item id="reviewing" textValue="Reviewing" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Reviewing
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        <ListBox.Item id="shortlisted" textValue="Shortlisted" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Shortlisted
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        <ListBox.Item id="interview" textValue="Interview" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Interview
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        <ListBox.Item id="rejected" textValue="Rejected" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Rejected
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        <ListBox.Item id="hired" textValue="Hired" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          Hired
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {/* CV Section - Moved to bottom */}
              <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-white/10">
                {/* Social Links */}
                <div className="flex items-center gap-2 flex-wrap">
                  {candidate.portfolio && (
                    <a 
                      href={candidate.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink size={12} />
                      Portfolio
                    </a>
                  )}
                  {candidate.linkedin && (
                    <a 
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={12} />
                      LinkedIn
                    </a>
                  )}
                  {candidate.github && (
                    <a 
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink size={12} />
                      GitHub
                    </a>
                  )}
                </div>
                
                {/* CV with View/Download buttons */}
                {candidate.cv && candidate.cv.name ? (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                      {getFileIcon(candidate.cv.name)}
                      <span className="truncate max-w-[120px]">{candidate.cv.name}</span>
                      {candidate.cv.size && (
                        <span className="text-[10px] text-gray-500">
                          ({(candidate.cv.size / 1024).toFixed(0)} KB)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleViewCV(candidate)}
                      className="p-1.5 rounded-lg text-violet-400 hover:text-violet-300 hover:bg-white/10 transition-all duration-200"
                      title="View CV"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleDownloadCV(candidate.cv, candidate._id)}
                      className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition-all duration-200"
                      title="Download CV"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500 ml-auto">No CV uploaded</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">No candidates found</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or filters to find candidates
          </p>
        </div>
      )}

      {/* CV Viewer Modal */}
      {isCVModalOpen && selectedCV && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedCV.fullName || "Candidate"}'s CV
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedCV.cv?.name || "Resume"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCV.cv && (
                  <button
                    onClick={() => handleDownloadCV(selectedCV.cv, selectedCV._id)}
                    className="p-2 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition-all duration-200"
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
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* CV Content */}
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
                  <p className="text-xs text-gray-500 mt-2">
                    Click download to view the full CV
                  </p>
                  <button
                    onClick={() => handleDownloadCV(selectedCV.cv, selectedCV._id)}
                    className="mt-6 px-6 py-2.5 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Download CV
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText size={48} className="text-gray-600 mb-4" />
                  <p className="text-gray-400">No CV available for this candidate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}