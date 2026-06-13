"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Button,
    Input,
    Select,
    ListBox,
    Pagination,
} from "@heroui/react";
import {
    BriefcaseBusiness,
    Eye,
    Edit,
    Trash2,
    Copy,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Plus,
    Calendar,
    Users,
    Building2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteJob, updateJobStatus } from "@/lib/actions/jobs";

const RecruiterJobsClient = ({ recruiterCompanies, recruiterJobs }) => {
    const router = useRouter();
    const [jobs, setJobs] = useState(recruiterJobs || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(new Set(["all"]));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    // Helper function to get company name by companyId

    const getCompanyName = (companyId) => {
        const company = recruiterCompanies?.find(c => c._id === companyId);
        return company?.name || "Unknown Company";
    };

    const handleDeleteJob = async (jobId) => {
        if (confirm("Are you sure you want to delete this job?")) {
            try {
                setLoading(true);
                const result = await deleteJob(jobId);
                if (result.success) {
                    setJobs(jobs.filter(job => job._id !== jobId));
                    toast.success("Job deleted successfully");
                }
            } catch (error) {
                toast.error("Failed to delete job");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdateStatus = async (jobId, newStatus) => {
        if (newStatus) {
            try {
                setLoading(true);
                const result = await updateJobStatus(jobId, newStatus);
                if (result.success) {
                    setJobs(jobs.map(job =>
                        job._id === jobId ? { ...job, status: newStatus } : job
                    ));
                    toast.success(`Job status updated to ${newStatus}`);
                }
            } catch (error) {
                toast.error("Failed to update job status");
            } finally {
                setLoading(false);
            }
        }
    };

    const selectedStatus = Array.from(statusFilter)[0];

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = searchTerm === "" ||
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || job.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle size={12} />, label: "Active" };
            case "closed":
                return { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <XCircle size={12} />, label: "Closed" };
            case "draft":
                return { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: <Clock size={12} />, label: "Draft" };
            default:
                return { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <Clock size={12} />, label: status };
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return "N/A";
        return dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading && jobs.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading jobs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                                Job Management
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            My Job Posts
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Manage all your job listings, track applications, and update statuses.
                        </p>
                    </div>
                    <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                        <Link href="/dashboard/recruiter/jobs/new" className="flex items-center gap-1">
                            <Plus size={16} />
                            Post New Job
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Jobs</p>
                            <p className="text-3xl font-bold text-white mt-2">{jobs.length}</p>
                        </div>
                        <div className="rounded-xl bg-violet-500/10 p-3 border border-white/10 group-hover:border-violet-500/30 transition-all">
                            <BriefcaseBusiness size={18} className="text-violet-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Active Jobs</p>
                            <p className="text-3xl font-bold text-white mt-2">
                                {jobs.filter(j => j.status === "active").length}
                            </p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                            <CheckCircle size={18} className="text-emerald-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Applicants</p>
                            <p className="text-3xl font-bold text-white mt-2">
                                {jobs.reduce((sum, job) => sum + (job.applicantsCount || 0), 0)}
                            </p>
                        </div>
                        <div className="rounded-xl bg-fuchsia-500/10 p-3 border border-white/10 group-hover:border-fuchsia-500/30 transition-all">
                            <Users size={18} className="text-fuchsia-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Views This Month</p>
                            <p className="text-3xl font-bold text-white mt-2">2,847</p>
                        </div>
                        <div className="rounded-xl bg-orange-500/10 p-3 border border-white/10 group-hover:border-orange-500/30 transition-all">
                            <Eye size={18} className="text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by title, category, or location..."
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

                    <div className="w-full sm:w-56">
                        <Select
                            className="w-full"
                            selectedKeys={statusFilter}
                            onSelectionChange={setStatusFilter}
                            variant="bordered"
                            aria-label="Filter jobs by status"
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
                                <Select.Value />
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
                                    <ListBox.Item
                                        id="active"
                                        textValue="Active"
                                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                                    >
                                        Active
                                        <ListBox.ItemIndicator className="text-violet-400" />
                                    </ListBox.Item>
                                    <ListBox.Item
                                        id="closed"
                                        textValue="Closed"
                                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                                    >
                                        Closed
                                        <ListBox.ItemIndicator className="text-violet-400" />
                                    </ListBox.Item>
                                    <ListBox.Item
                                        id="draft"
                                        textValue="Draft"
                                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                                    >
                                        Draft
                                        <ListBox.ItemIndicator className="text-violet-400" />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">JOB DETAILS</th>
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">COMPANY</th>
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">STATUS</th>
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">APPLICANTS</th>
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider whitespace-nowrap text-gray-400">POSTED DATE</th>
                                <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">DEADLINE</th>
                                <th className="text-center px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-16">
                                        <div className="text-center">
                                            <BriefcaseBusiness size={48} className="text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-400 mb-4">No jobs found</p>
                                            <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                                                <Link href="/dashboard/recruiter/jobs/new">
                                                    Post Your First Job
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedJobs.map((job) => {
                                    const statusBadge = getStatusBadge(job.status);
                                    return (
                                        <tr key={job._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors duration-200">
                                                        {job.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-gray-400 whitespace-nowrap">{job.category}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                                                        <span className="text-xs text-gray-400 whitespace-nowrap">{job.type}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                                                        <span className="text-xs text-gray-400 whitespace-nowrap">{job.location}</span>
                                                    </div>
                                                    {job.salaryMin && job.salaryMax && (
                                                        <p className="text-xs text-emerald-400 mt-1">
                                                            {job.currency?.toUpperCase() || "$"} {parseInt(job.salaryMin).toLocaleString()} - {parseInt(job.salaryMax).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={14} className="text-violet-400" />
                                                    <span className="text-sm text-gray-300 whitespace-nowrap">
                                                        {getCompanyName(job.companyId)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusBadge.color} transition-all duration-200`}>
                                                    {statusBadge.icon}
                                                    {statusBadge.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-white">{job.applicantsCount || 0}</span>
                                                    <Link href={`/dashboard/recruiter/jobs/${job._id}/applicants`}>
                                                        <button className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition-all">
                                                            View
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm whitespace-nowrap text-gray-400">{formatDate(job.createdAt)}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-gray-500" />
                                                    <span className={`text-sm whitespace-nowrap ${new Date(job.deadline) < new Date() ? 'text-red-400' : 'text-gray-400'}`}>
                                                        {formatDate(job.deadline)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105" title="View Applicants">
                                                        <Link href={`/dashboard/recruiter/jobs/${job._id}/applicants`}>
                                                            <Users size={16} />
                                                        </Link>
                                                    </button>
                                                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105" title="Edit Job">
                                                        <Link href={`/dashboard/recruiter/jobs/${job._id}/edit`}>
                                                            <Edit size={16} />
                                                        </Link>
                                                    </button>
                                                    <Link href={"/"} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105" title="View">
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Select
                                                        className="w-28"
                                                        selectedKeys={job.status ? new Set([job.status]) : new Set()}
                                                        onSelectionChange={(keys) => {
                                                            const newStatus = Array.from(keys)[0];
                                                            if (newStatus && newStatus !== job.status) {
                                                                handleUpdateStatus(job._id, newStatus);
                                                            }
                                                        }}
                                                        variant="bordered"
                                                        aria-label="Change job status"
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
                                                            <Select.Value />
                                                            <Select.Indicator className="text-gray-400 w-3 h-3" />
                                                        </Select.Trigger>
                                                        <Select.Popover>
                                                            <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                                                                <ListBox.Item id="active" textValue="Active" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                                                                    Active
                                                                    <ListBox.ItemIndicator className="text-violet-400" />
                                                                </ListBox.Item>
                                                                <ListBox.Item id="closed" textValue="Closed" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                                                                    Closed
                                                                    <ListBox.ItemIndicator className="text-violet-400" />
                                                                </ListBox.Item>
                                                                <ListBox.Item id="draft" textValue="Draft" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                                                                    Draft
                                                                    <ListBox.ItemIndicator className="text-violet-400" />
                                                                </ListBox.Item>
                                                            </ListBox>
                                                        </Select.Popover>
                                                    </Select>
                                                    <button onClick={() => handleDeleteJob(job._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 group-hover:scale-105" title="Delete">
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

                {totalPages > 1 && (
                    <div className="flex justify-center p-5 border-t border-white/10">
                        <Pagination
                            total={totalPages}
                            page={currentPage}
                            onChange={setCurrentPage}
                            classNames={{
                                wrapper: "gap-2",
                                item: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200",
                                cursor: "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg",
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterJobsClient;