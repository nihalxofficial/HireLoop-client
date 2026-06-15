"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import {
    BriefcaseBusiness,
    MapPin,
    Calendar,
    DollarSign,
    Clock,
    Building2,
    Mail,
    Globe,
    Users,
    CheckCircle,
    XCircle,
    Clock as ClockIcon,
    Award,
    TrendingUp,
    Shield,
    Zap,
    Heart,
    Share2,
    Bookmark,
} from 'lucide-react';

const JobDetailsClient = ({ job, companies }) => {
    const company = companies?.find(c => c._id === job?.companyId);

    const formatSalary = (min, max, currency) => {
        const symbol = currency === "usd" ? "$" :
            currency === "eur" ? "€" :
                currency === "gbp" ? "£" :
                    currency === "bdt" ? "৳" : "$";
        return `${symbol}${parseInt(min).toLocaleString()} - ${symbol}${parseInt(max).toLocaleString()}`;
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        const parsed = new Date(date);
        if (isNaN(parsed.getTime())) return "N/A";
        return parsed.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatRelativeDate = (date) => {
        const dateObj = new Date(date);
        const now = new Date();
        const diffTime = Math.abs(now - dateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const getJobTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case "full-time":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "part-time":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "contract":
                return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            case "internship":
                return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            default:
                return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            active: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle size={12} />, label: "Active" },
            closed: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <XCircle size={12} />, label: "Closed" },
            draft: { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: <ClockIcon size={12} />, label: "Draft" },
        };
        return map[status] ?? { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <ClockIcon size={12} />, label: status };
    };

    const statusBadge = getStatusBadge(job?.status);

    if (!job) {
        return (
            <div className="pt-20 pb-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <BriefcaseBusiness size={48} className="text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">Job Not Found</h2>
                        <p className="text-gray-400 text-center">
                            The job you're looking for doesn't exist or has been removed.
                        </p>
                        <Link href="/jobs">
                            <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                Browse All Jobs
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button className="mb-6 cursor-pointer flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                    <Link href="/jobs">
                        ← Back to Jobs
                    </Link>
                </button>

                {/* Hero Section */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6 md:p-8 mb-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left - Job Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                                    {job.title}
                                </h1>
                                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getJobTypeColor(job.type)}`}>
                                    {job.type}
                                </span>
                                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusBadge.color}`}>
                                    {statusBadge.icon}
                                    {statusBadge.label}
                                </span>
                            </div>

                            {/* Company */}
                            <Link href={`/companies/${company?._id}`}>
                                <div className="flex items-center gap-2 mb-4 cursor-pointer group">
                                    {company?.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-6 h-6 rounded object-cover"
                                        />
                                    ) : (
                                        <Building2 size={16} className="text-violet-400" />
                                    )}
                                    <span className="text-gray-300 group-hover:text-violet-400 transition-colors">
                                        {company?.name || "Company"}
                                    </span>
                                </div>
                            </Link>

                            {/* Info Chips */}
                            <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <MapPin size={14} className="text-violet-400" />
                                    <span className="text-sm text-gray-300">
                                        {job.isRemote ? "Remote" : job.location || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <BriefcaseBusiness size={14} className="text-violet-400" />
                                    <span className="text-sm text-gray-300">{job.category}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <DollarSign size={14} className="text-emerald-400" />
                                    <span className="text-sm text-emerald-400 font-medium">
                                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <Clock size={14} className="text-gray-500" />
                                    <span className="text-sm text-gray-400">Posted {formatRelativeDate(job.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Action Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                            <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all px-8">
                               <Link href={`/jobs/${job._id}/apply`} >Apply Now</Link>
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="flat" className="border border-white/10 bg-white/5 text-gray-300 hover:text-white">
                                    <Bookmark size={16} />
                                    Save
                                </Button>
                                <Button variant="flat" className="border border-white/10 bg-white/5 text-gray-300 hover:text-white">
                                    <Share2 size={16} />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description Card */}
                        {/* <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <BriefcaseBusiness size={20} className="text-violet-400" />
                                Job Description
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {job.description || "No description provided."}
                            </p>
                        </div> */}

                        {/* Responsibilities Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Zap size={20} className="text-violet-400" />
                                Key Responsibilities
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {job.responsibilities}
                            </div>
                        </div>

                        {/* Requirements Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Shield size={20} className="text-violet-400" />
                                Requirements
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {job.requirements}
                            </div>
                        </div>

                        {/* Benefits Card */}
                        {job.benefits && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Award size={20} className="text-violet-400" />
                                    Benefits & Perks
                                </h2>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {job.benefits}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Job Overview Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-violet-400" />
                                Job Overview
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Job Title</span>
                                    <span className="text-white text-sm font-medium">{job.title}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Job Type</span>
                                    <span className="text-white text-sm font-medium">{job.type}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Category</span>
                                    <span className="text-white text-sm font-medium">{job.category}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Location</span>
                                    <span className="text-white text-sm font-medium">
                                        {job.isRemote ? "Remote" : job.location || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Salary Range</span>
                                    <span className="text-emerald-400 text-sm font-medium">
                                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-gray-400 text-sm">Posted Date</span>
                                    <span className="text-white text-sm">{formatDate(job.createdAt)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Deadline</span>
                                    <span className={`text-sm font-medium ${new Date(job.deadline) < new Date() ? 'text-red-400' : 'text-white'}`}>
                                        {formatDate(job.deadline)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Company Info Card */}
                        {company && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Building2 size={18} className="text-violet-400" />
                                    About the Company
                                </h3>
                                <div className="flex items-center gap-3 mb-4">
                                    {company.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                            <Building2 size={24} className="text-violet-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-white font-medium">{company.name}</h4>
                                        <p className="text-xs text-gray-400">{company.industry}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                                    {company.description || "No company description available."}
                                </p>
                                <div className="space-y-2 text-sm mb-4">
                                    {company.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-500" />
                                            <span className="text-gray-400">{company.location}</span>
                                        </div>
                                    )}
                                    {company.employeeCount && (
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-gray-500" />
                                            <span className="text-gray-400">{company.employeeCount} employees</span>
                                        </div>
                                    )}
                                    {company.website && (
                                        <div className="flex items-center gap-2">
                                            <Globe size={14} className="text-gray-500" />
                                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 text-sm">
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full cursor-pointer px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:border-violet-500/50 hover:text-violet-400 transition-all">
                                    <Link href={`/companies/${company._id}`}>
                                        View Company Profile
                                    </Link>
                                </button>
                            </div>
                        )}

                        {/* Contact Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Mail size={18} className="text-violet-400" />
                                Have Questions?
                            </h3>
                            <p className="text-sm text-gray-400 mb-3">
                                Reach out to the employer directly for any queries about this position.
                            </p>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-gray-500" />
                                <span className="text-sm text-gray-400">{company?.recruiterEmail || "Not provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsClient;