// app/dashboard/seeker/applications/ApplicationsClient.js
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
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  File,
  ChevronDown,
  ChevronUp,
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
    case 'txt':
      return <FileText size={14} className="text-gray-400" />;
    default:
      return <FileText size={14} className="text-gray-400" />;
  }
};

export default function ApplicationsClient({ initialApplications }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [applications, setApplications] = useState(initialApplications);
  const [selectedCV, setSelectedCV] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isCVLoading, setIsCVLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(applications.map(c => c.status).filter(Boolean))];

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === "" ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
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
      case "recent": return "Date";
      case "job": return "Job Title";
      case "company": return "Company";
      case "status": return "Status";
      default: return "Date";
    }
  };

  const handleViewCV = async (app) => {
    setSelectedCV(app);
    setIsCVModalOpen(true);
    setIsCVLoading(true);
    
    if (app.cv?.url) {
      try {
        const response = await fetch(app.cv.url);
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
        toast.error('Failed to load CV');
      } finally {
        setIsCVLoading(false);
      }
    } else {
      setIsCVLoading(false);
    }
  };

  const handleDownloadCV = async (cv, appId) => {
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
      
      if (appId) {
        const response = await fetch(`/api/applications/${appId}/cv`);
        
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

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setIsDetailsModalOpen(true);
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
            My Applications
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track all your job applications and their status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/jobs">
            <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
              <BriefcaseBusiness size={16} />
              Find More Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Total Applications</p>
          <p className="text-2xl font-bold text-white mt-1">{applications.length}</p>
          <p className="text-xs text-gray-400 mt-1">All applications</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {applications.filter(c => c.status?.toLowerCase() === "pending").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Under review</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Interview</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">
            {applications.filter(c => c.status?.toLowerCase() === "interview").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Scheduled interviews</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Accepted</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {applications.filter(c => c.status?.toLowerCase() === "hired" || c.status?.toLowerCase() === "shortlisted").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Positive responses</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by job title, company, or position..."
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
              aria-label="Filter applications by status"
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
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("job")}>
                  <div className="flex items-center gap-1">
                    Job / Company
                    {sortBy === "job" && (
                      sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-1">
                    Status
                    {sortBy === "status" && (
                      sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                  Location
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                  Salary
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("recent")}>
                  <div className="flex whitespace-nowrap items-center gap-1">
                    Applied Date
                    {sortBy === "recent" && (
                      sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                  CV
                </th>
                <th className="text-center px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="text-center">
                      <BriefcaseBusiness size={48} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">No applications found</p>
                      <p className="text-sm text-gray-500">
                        {searchTerm || statusFilter !== "all" 
                          ? "Try adjusting your search or filters" 
                          : "Start applying to jobs to track your applications here"}
                      </p>
                      {!searchTerm && statusFilter === "all" && (
                        <Link href="/jobs">
                          <Button className="mt-4 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                            Browse Jobs
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                sortedApplications.map((app) => (
                  <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium whitespace-nowrap text-white group-hover:text-violet-400 transition-colors duration-200">
                          {app.jobTitle || "Unknown Position"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 size={12} className="text-violet-400" />
                          <span className="text-xs text-gray-400">{app.companyName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusColor(app.status)} transition-all duration-200`}>
                        {getStatusIcon(app.status)}
                        {app.status?.charAt(0).toUpperCase() + app.status?.slice(1) || "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm whitespace-nowrap text-gray-400">{app.companyLocation || "N/A"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-emerald-400">{formatSalary(app.expectedSalary)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-400">{formatDate(app.appliedAt)}</span>
                    </td>
                    <td className="px-5 py-4">
                      {app.cv && app.cv.name ? (
                        <div className="flex items-center gap-1.5">
                          {getFileIcon(app.cv.name)}
                          <span className="text-xs text-gray-400 truncate max-w-25">
                            {app.cv.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">No CV</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleViewCV(app)}
                          className="p-1.5 cursor-pointer rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105"
                          title="View CV"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDownloadCV(app.cv, app._id)}
                          className="p-1.5 rounded-lg cursor-pointer text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105"
                          title="Download CV"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => openDetailsModal(app)}
                          className="p-1.5 rounded-lg cursor-pointer text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:scale-105"
                          title="View Details"
                        >
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with count */}
        {sortedApplications.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedApplications.length} application{sortedApplications.length !== 1 ? 's' : ''}
            </span>
            <span className="text-xs text-gray-500">
              {applications.length} total
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
                  {selectedCV.jobTitle || "Application"} - CV
                </h3>
                <p className="text-sm text-gray-400">{selectedCV.cv?.name || "Resume"}</p>
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
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              {isCVLoading ? (
                <div className="flex items-center justify-center h-[70vh]">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading CV...</p>
                  </div>
                </div>
              ) : selectedCV.cv?.url ? (
                <iframe
                  src={selectedCV.cv.url}
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
                    className="mt-6 px-6 py-2.5 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
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

      {/* Application Details Modal - Full Details including Cover Letter */}
      {isDetailsModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                {selectedApp.companyLogo ? (
                  <Image
                    width={40}
                    height={40}
                    src={selectedApp.companyLogo}
                    alt={selectedApp.companyName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-500/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-white/10">
                    <Building2 size={18} className="text-violet-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedApp.jobTitle}</h3>
                  <p className="text-sm text-gray-400">{selectedApp.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedApp(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              {/* Status & Date */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(selectedApp.status)}`}>
                  {getStatusIcon(selectedApp.status)}
                  {selectedApp.status?.charAt(0).toUpperCase() + selectedApp.status?.slice(1) || "Pending"}
                </span>
                <span className="text-sm text-gray-400">
                  Applied: {formatDate(selectedApp.appliedAt)}
                </span>
                {selectedApp.updatedAt && selectedApp.updatedAt !== selectedApp.appliedAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {formatDate(selectedApp.updatedAt)}
                  </span>
                )}
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <User size={16} className="text-violet-400" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <User size={14} className="text-violet-400" />
                    {selectedApp.fullName || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <Mail size={14} className="text-violet-400" />
                    {selectedApp.email || "N/A"}
                  </div>
                  {selectedApp.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <Phone size={14} className="text-violet-400" />
                      {selectedApp.phone}
                    </div>
                  )}
                  {selectedApp.expectedSalary && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <DollarSign size={14} className="text-green-400" />
                      {formatSalary(selectedApp.expectedSalary)}
                    </div>
                  )}
                  {selectedApp.noticePeriod && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <Clock size={14} className="text-blue-400" />
                      Notice Period: {selectedApp.noticePeriod}
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              {(selectedApp.portfolio || selectedApp.linkedin || selectedApp.github) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <LinkIcon size={16} className="text-violet-400" />
                    Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedApp.portfolio && (
                      <a 
                        href={selectedApp.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                      >
                        <ExternalLink size={14} />
                        Portfolio
                      </a>
                    )}
                    {selectedApp.linkedin && (
                      <a 
                        href={selectedApp.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                      >
                        <ExternalLink size={14} />
                        LinkedIn
                      </a>
                    )}
                    {selectedApp.github && (
                      <a 
                        href={selectedApp.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                      >
                        <ExternalLink size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CV */}
              {selectedApp.cv && selectedApp.cv.name && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-violet-400" />
                    CV / Resume
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      {getFileIcon(selectedApp.cv.name)}
                      <span>{selectedApp.cv.name}</span>
                      {selectedApp.cv.size && (
                        <span className="text-xs text-gray-500">
                          ({(selectedApp.cv.size / 1024).toFixed(0)} KB)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleViewCV(selectedApp)}
                      className="p-2 rounded-lg text-violet-400 hover:text-violet-300 hover:bg-white/10 transition-all duration-200"
                      title="View CV"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDownloadCV(selectedApp.cv, selectedApp._id)}
                      className="p-2 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition-all duration-200"
                      title="Download CV"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Cover Letter - Full Display */}
              {selectedApp.coverLetter && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <File size={16} className="text-violet-400" />
                    Cover Letter
                  </h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-h-75 overflow-y-auto">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedApp.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {/* Job Location & Company Info */}
              {selectedApp.companyLocation && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-violet-400" />
                    Location
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <MapPin size={14} className="text-violet-400" />
                    {selectedApp.companyLocation}
                    {selectedApp.companyIndustry && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-gray-400">{selectedApp.companyIndustry}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}