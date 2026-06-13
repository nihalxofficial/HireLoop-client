// components/shared/JobCard.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
    BriefcaseBusiness,
    MapPin,
    Calendar,
    DollarSign,
    Clock,
    Building2,
} from "lucide-react";

const JobCard = ({ job, companies }) => {
    // Find the company details using companyId
    const company = companies?.find(c => c._id === job.companyId);
    
    const formatSalary = (min, max, currency) => {
        const symbol = currency === "usd" ? "$" : 
                      currency === "eur" ? "€" : 
                      currency === "gbp" ? "£" : 
                      currency === "bdt" ? "৳" : "$";
        return `${symbol}${parseInt(min).toLocaleString()} - ${symbol}${parseInt(max).toLocaleString()}`;
    };

    const formatDate = (date) => {
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

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
            {/* Job Title and Type */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <Link href={`/jobs/${job._id}`}>
                    <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors cursor-pointer">
                        {job.title}
                    </h3>
                </Link>
                <span className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${getJobTypeColor(job.type)}`}>
                    {job.type}
                </span>
            </div>

            {/* Company Logo and Name - Clickable to company details */}
            <Link href={`/companies/${company?._id}`} className="block mb-3">
                <div className="flex items-center gap-2">
                    {company?.logo ? (
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-6 h-6 rounded object-cover"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?background=7c3aed&color=fff&size=32&bold=true&name=${encodeURIComponent(company?.name || "C")}`;
                            }}
                        />
                    ) : (
                        <Building2 size={16} className="text-violet-400" />
                    )}
                    <span className="text-sm text-gray-300 hover:text-violet-400 transition-colors">
                        {company?.name || "Company"}
                    </span>
                </div>
            </Link>

            {/* Location and Remote Status */}
            <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">
                        {job.isRemote ? "Remote" : job.location || "Not specified"}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <BriefcaseBusiness size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">{job.category}</span>
                </div>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-1.5 mb-3">
                <DollarSign size={14} className="text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
            </div>

            {/* Posted Date */}
            <div className="flex items-center gap-1.5 mb-4">
                <Clock size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500">Posted {formatDate(job.createdAt)}</span>
            </div>

            {/* Description Preview */}
            <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {job.responsibilities?.substring(0, 150)}...
            </p>

            {/* Divider */}
            <div className="border-t border-white/10 my-3" />

            {/* Footer with Deadline and Action */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-orange-400" />
                    <span className="text-xs text-gray-500">
                        Deadline: {new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                </div>
                <Link href={`/jobs/${job._id}`}>
                    <button className="cursor-pointer px-4 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-medium hover:scale-[1.05] transition-all duration-300">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default JobCard;