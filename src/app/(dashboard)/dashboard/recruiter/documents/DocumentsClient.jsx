// app/dashboard/recruiter/documents/DocumentsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  FileText,
  Search,
  Download,
  Upload,
  FolderPlus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Share2,
  Filter,
  Grid,
  List,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  File,
  Folder,
  Users,
  BriefcaseBusiness,
  User,
  Building2,
  MapPin,
  DollarSign,
  ExternalLink,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaFileArchive,
  FaFileAlt 
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to get file icon
const getFileIcon = (fileName, size = 20) => {
  if (!fileName) return <FileText size={size} className="text-gray-400" />;
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <FaFilePdf size={size} className="text-red-400" />;
    case 'doc':
    case 'docx':
      return <FaFileWord size={size} className="text-blue-400" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FaFileExcel size={size} className="text-green-400" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <FaFileImage size={size} className="text-fuchsia-400" />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FaFileArchive size={size} className="text-amber-400" />;
    default:
      return <FaFileAlt size={size} className="text-gray-400" />;
  }
};

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (!bytes) return 'N/A';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

export default function DocumentsClient({ initialDocuments, initialCategories, initialStats }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [categories] = useState(initialCategories);
  const [stats] = useState(initialStats);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" ||
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.uploadDate) - new Date(a.uploadDate);
    } else if (sortBy === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "size") {
      comparison = (a.size || 0) - (b.size || 0);
    } else if (sortBy === "category") {
      comparison = (a.category || "").localeCompare(b.category || "");
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

  const handleDownload = (doc) => {
    toast.success(`Downloading ${doc.name}`);
    if (doc.url && doc.url !== '#') {
      window.open(doc.url, '_blank');
    }
  };

  const handleDelete = (docId) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter(d => d.id !== docId));
      toast.success("Document deleted successfully");
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsUploadModalOpen(false);
      toast.success("Document uploaded successfully");
      const newDoc = {
        id: `doc_${Date.now()}`,
        name: 'New_Document.pdf',
        size: 45678,
        type: 'application/pdf',
        uploadDate: new Date().toISOString(),
        category: 'Uploads',
        applicantName: 'N/A',
        applicantEmail: '',
        applicantAvatar: '',
        jobTitle: '',
        jobId: '',
        status: 'active',
        url: '#'
      };
      setDocuments([newDoc, ...documents]);
    }, 2000);
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "archived":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  // Stats cards
  const statCards = [
    {
      title: "Total Documents",
      value: stats.total || 0,
      icon: <FileText size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "CVs / Resumes",
      value: stats.cvs || 0,
      icon: <FaFilePdf size={20} />,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Templates",
      value: stats.templates || 0,
      icon: <FaFileWord size={20} />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Forms",
      value: stats.forms || 0,
      icon: <FaFileAlt size={20} />,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Documents
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and organize your recruitment documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsUploadModalOpen(true)} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <Upload size={16} />
            Upload Document
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <FolderPlus size={16} />
            New Folder
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
              placeholder="Search documents by name, applicant, or job..."
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
                value={selectedCategory}
                onChange={setSelectedCategory}
                variant="bordered"
                aria-label="Filter by category"
                placeholder="Category"
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
                  <Select.Value>{selectedCategory}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    {categories.map((category) => (
                      <ListBox.Item
                        key={category}
                        id={category}
                        textValue={category}
                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                      >
                        {category}
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="flex items-center gap-1 bg-white/5 rounded-xl border border-white/10 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all duration-200 ${
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

      {/* Documents Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10 hover:scale-[1.02]"
            >
              {/* Document Icon */}
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {getFileIcon(doc.name, 24)}
                </div>
                <button
                  onClick={() => {
                    setSelectedDocument(doc);
                    setIsDetailsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Document Info */}
              <div>
                <p className="text-sm font-semibold text-white truncate hover:text-violet-400 transition-colors">
                  {doc.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{formatFileSize(doc.size)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span className="text-xs text-gray-400">{doc.category}</span>
                </div>
                {doc.applicantName && doc.applicantName !== 'N/A' && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <User size={10} />
                    {doc.applicantName}
                  </p>
                )}
                {doc.jobTitle && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <BriefcaseBusiness size={10} />
                    {doc.jobTitle}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 text-xs flex items-center justify-center gap-1"
                >
                  <Download size={14} />
                  Download
                </button>
                <button
                  onClick={() => {
                    setSelectedDocument(doc);
                    setIsDetailsModalOpen(true);
                  }}
                  className="flex-1 cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 text-xs flex items-center justify-center gap-1"
                >
                  <Eye size={14} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">
                      Name
                      {sortBy === "name" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("category")}>
                    <div className="flex items-center gap-1">
                      Category
                      {sortBy === "category" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("size")}>
                    <div className="flex items-center gap-1">
                      Size
                      {sortBy === "size" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                    <div className="flex items-center gap-1">
                      Upload Date
                      {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">No documents found</p>
                      <p className="text-sm text-gray-500">Upload your first document</p>
                    </td>
                  </tr>
                ) : (
                  sortedDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.name, 18)}
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors truncate max-w-[200px]">
                              {doc.name}
                            </p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(doc.status)}`}>
                              {doc.status || 'Active'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{doc.category}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {doc.applicantName && doc.applicantName !== 'N/A' ? (
                          <div>
                            <p className="text-sm text-gray-300">{doc.applicantName}</p>
                            <p className="text-xs text-gray-500">{doc.jobTitle}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatFileSize(doc.size)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(doc.uploadDate)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleDownload(doc)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDocument(doc);
                              setIsDetailsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {sortedDocuments.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-gray-400">
                Showing {sortedDocuments.length} document{sortedDocuments.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold text-white">Upload Document</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-violet-500/50 transition-all duration-200">
                <Upload size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Drag and drop your file here</p>
                <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                <Button className="mt-4 bg-white/5 text-white hover:bg-white/10 transition-colors">
                  Browse Files
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                <Select
                  className="w-full"
                  value="CVs"
                  variant="bordered"
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
                  }}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator className="text-gray-400" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                      {categories.filter(c => c !== 'All').map((category) => (
                        <ListBox.Item
                          key={category}
                          id={category}
                          textValue={category}
                          className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                        >
                          {category}
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <Button
                onClick={handleUpload}
                isLoading={uploading}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <Upload size={16} />
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {isDetailsModalOpen && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                {getFileIcon(selectedDocument.name, 28)}
                <div>
                  <h3 className="text-lg font-semibold text-white truncate max-w-[300px]">
                    {selectedDocument.name}
                  </h3>
                  <p className="text-sm text-gray-400">{selectedDocument.category}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedDocument(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">File Name</p>
                  <p className="text-sm text-white truncate">{selectedDocument.name}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">File Size</p>
                  <p className="text-sm text-white">{formatFileSize(selectedDocument.size)}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Category</p>
                  <p className="text-sm text-white">{selectedDocument.category}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Upload Date</p>
                  <p className="text-sm text-white">{formatDate(selectedDocument.uploadDate)}</p>
                </div>
                {selectedDocument.applicantName && selectedDocument.applicantName !== 'N/A' && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Applicant</p>
                    <p className="text-sm text-white">{selectedDocument.applicantName}</p>
                  </div>
                )}
                {selectedDocument.jobTitle && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Job</p>
                    <p className="text-sm text-white">{selectedDocument.jobTitle}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="flex-1 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  className="flex-1 px-4 py-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/10 flex items-center justify-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </button>
                <button
                  onClick={() => handleDelete(selectedDocument.id)}
                  className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}