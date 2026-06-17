// app/dashboard/admin/companies/CompaniesClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  Building2,
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
  Briefcase,
  Edit,
  Trash2,
  Check,
  X as XIcon,
  AlertCircle,
  Loader2,
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

// Status configuration with icons and colors
const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: <Clock size={14} />,
    label: "Pending"
  },
  approved: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <CheckCircle size={14} />,
    label: "Approved"
  },
  rejected: {
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: <XCircle size={14} />,
    label: "Rejected"
  }
};

export default function CompaniesClient({ initialCompanies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [companies, setCompanies] = useState(initialCompanies);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(companies.map(c => c.status).filter(Boolean))];

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchTerm === "" ||
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.recruiterEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "industry") {
      comparison = (a.industry || "").localeCompare(b.industry || "");
    } else if (sortBy === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    } else if (sortBy === "employees") {
      const aCount = parseInt(a.employeeCount?.replace(/[^0-9]/g, '') || '0');
      const bCount = parseInt(b.employeeCount?.replace(/[^0-9]/g, '') || '0');
      comparison = aCount - bCount;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle status change - ready for API integration
  const handleStatusChange = async (companyId, newStatus) => {
    // Set loading state for this specific company
    setUpdatingStatus(companyId);
    
    try {
      // Find the company to get its current status for revert
      const company = companies.find(c => c._id === companyId);
      const previousStatus = company?.status;

      // Update local state immediately for better UX
      setCompanies(companies.map(c => 
        c._id === companyId ? { ...c, status: newStatus } : c
      ));
      
      // Show success toast
      toast.success(`Company ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/companies/${companyId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     status: newStatus,
      //     updatedBy: 'admin'
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update company status');
      // }
      
      // const result = await response.json();
      
      // If you want to update with server response
      // setCompanies(companies.map(c => 
      //   c._id === companyId ? { ...c, status: result.status, updatedAt: result.updatedAt } : c
      // ));
      
    } catch (error) {
      // Revert on error
      console.error('Error updating company status:', error);
      
      // Find the company and revert its status
      const company = companies.find(c => c._id === companyId);
      if (company) {
        setCompanies(companies.map(c => 
          c._id === companyId ? { ...c, status: company.status } : c
        ));
      }
      
      toast.error(error.message || 'Failed to update company status');
    } finally {
      // Clear loading state
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

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "name": return "Name A-Z";
      case "industry": return "Industry";
      case "status": return "Status";
      case "employees": return "Employee Count";
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

  const openDetailsModal = (company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  // Check if a company is currently updating
  const isUpdating = (companyId) => updatingStatus === companyId;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Companies
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all registered companies on the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <UserPlus size={16} />
            Add Company
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
          <p className="text-2xl font-bold text-white mt-1">{companies.length}</p>
          <p className="text-xs text-gray-400 mt-1">All companies</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {companies.filter(c => c.status?.toLowerCase() === "pending").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Awaiting review</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {companies.filter(c => c.status?.toLowerCase() === "approved").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Verified companies</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-red-400 mt-1">
            {companies.filter(c => c.status?.toLowerCase() === "rejected").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Not approved</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search companies by name, industry, location, or email..."
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
            <div className="w-[150px]">
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

            <div className="w-[150px]">
              <Select
                className="w-full"
                value={sortBy}
                onChange={setSortBy}
                variant="bordered"
                aria-label="Sort companies"
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
                      id="industry"
                      textValue="Industry"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Industry
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
                    <ListBox.Item
                      id="employees"
                      textValue="Employee Count"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Employee Count
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Company
                    {sortBy === "name" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-8 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("industry")}>
                  <div className="flex items-center gap-1">
                    Industry
                    {sortBy === "industry" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("employees")}>
                  <div className="flex items-center gap-1">
                    Employees
                    {sortBy === "employees" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Status / Actions
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Joined
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <Building2 size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No companies found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                sortedCompanies.map((company) => {
                  const statusConfig = getStatusConfig(company.status);
                  const isPending = company.status?.toLowerCase() === "pending";
                  const isLoading = isUpdating(company._id);
                  
                  return (
                    <tr key={company._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* Company - Name, Logo, Email */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {company.logo ? (
                              <Image
                                width={40}
                                height={40}
                                src={company.logo}
                                alt={company.name || "Company"}
                                className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10';
                                  div.textContent = getInitials(company.name);
                                  parent.appendChild(div);
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10">
                                {getInitials(company.name)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                              {company.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-400">{company.recruiterEmail || "No email"}</p>
                          </div>
                        </div>
                      </td>

                      {/* Industry - with more left padding */}
                      <td className="px-8 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{company.industry || "N/A"}</span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {company.location ? (
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-violet-400" />
                            <span className="text-sm text-gray-400">{company.location}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>

                      {/* Employees */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{company.employeeCount || "N/A"}</span>
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
                                onClick={() => handleStatusChange(company._id, "approved")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 flex items-center gap-1 text-[10px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Approve Company"
                              >
                                <Check size={12} />
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(company._id, "rejected")}
                                className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 flex items-center gap-1 text-[10px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reject Company"
                              >
                                <XIcon size={12} />
                                Reject
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

                      {/* Joined Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(company.createdAt)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {/* View Details */}
                          <button
                            onClick={() => openDetailsModal(company)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Website */}
                          {company.website && (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                              title="Visit Website"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}

                          {/* Edit - always visible */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Edit Company"
                          >
                            <Edit size={16} />
                          </button>

                          {/* Delete - always visible */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Delete Company"
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
        {sortedCompanies.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedCompanies.length} company{sortedCompanies.length !== 1 ? 'ies' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Company Details Modal */}
      {isDetailsModalOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                {selectedCompany.logo ? (
                  <Image
                    width={48}
                    height={48}
                    src={selectedCompany.logo}
                    alt={selectedCompany.name || "Company"}
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
                  <h3 className="text-lg font-semibold text-white">{selectedCompany.name}</h3>
                  <p className="text-sm text-gray-400">{selectedCompany.industry || "No industry"}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedCompany(null);
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
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusConfig(selectedCompany.status).color}`}>
                  {getStatusConfig(selectedCompany.status).icon}
                  {getStatusConfig(selectedCompany.status).label}
                </span>
                <span className="text-sm text-gray-400">
                  Joined: {formatDate(selectedCompany.createdAt)}
                </span>
                {selectedCompany.updatedAt && selectedCompany.updatedAt !== selectedCompany.createdAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {formatDate(selectedCompany.updatedAt)}
                  </span>
                )}
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Industry</p>
                  <p className="text-sm text-white">{selectedCompany.industry || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white">{selectedCompany.location || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Employee Count</p>
                  <p className="text-sm text-white">{selectedCompany.employeeCount || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Website</p>
                  {selectedCompany.website ? (
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                    >
                      {selectedCompany.website}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">N/A</p>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedCompany.description && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Description</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedCompany.description}</p>
                </div>
              )}

              {/* Recruiter Info */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-2">Recruiter Contact</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-violet-400" />
                    <span className="text-sm text-gray-300">{selectedCompany.recruiterEmail || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-violet-400" />
                    <span className="text-sm text-gray-300">Recruiter ID: {selectedCompany.recruiterId || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedCompany.status?.toLowerCase() === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedCompany._id, "approved");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedCompany._id)}
                    className="flex-1 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedCompany._id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Approve Company
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedCompany._id, "rejected");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedCompany._id)}
                    className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedCompany._id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XIcon size={16} />
                        Reject Company
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