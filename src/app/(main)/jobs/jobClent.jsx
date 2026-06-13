// app/jobs/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { Select, ListBox } from "@heroui/react";
import { BriefcaseBusiness, Search } from 'lucide-react';
import JobCard from '@/components/shared/JobCard';

const JobClient = ({initialJobs}) => {
    const [jobs, setJobs] = useState(initialJobs);
    const [loading, setLoading] = useState(false);
    const [selectedJobType, setSelectedJobType] = useState("all");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const jobTypes = ["all", "Full-time", "Part-time", "Contract", "Internship"];
    const locations = ["all", "Remote", "On-site", "Hybrid"];
    const categories = ["all", "Technology", "Design", "Marketing", "Sales", "Finance"];

    const getDisplayValue = (value, type) => {
        if (value === "all") {
            if (type === "job") return "All Job Types";
            if (type === "location") return "All Locations";
            if (type === "category") return "All Categories";
        }
        return value;
    };

    if (loading) {
        return (
            <div className="pt-20 pb-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                            <p className="text-gray-400">Loading jobs...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                            Job Opportunities
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                        Browse All Jobs
                    </h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Discover your next career opportunity from thousands of listings
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by title, company, or location..."
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                                />
                            </div>
                        </div>
                        
                        {/* Filter Selects - HeroUI Components */}
                        <div className="flex gap-2 flex-wrap">
                            {/* Job Type Select */}
                            <Select
                                className="w-36"
                                value={selectedJobType}
                                onChange={setSelectedJobType}
                                variant="bordered"
                                aria-label="Filter by job type"
                                classNames={{
                                    trigger: [
                                        "border-white/10",
                                        "bg-white/5",
                                        "hover:border-violet-500/50",
                                        "data-[focus=true]:border-violet-500",
                                        "rounded-xl",
                                        "h-10",
                                    ],
                                    value: "text-white text-sm",
                                }}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Job Type" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {jobTypes.map((type) => (
                                            <ListBox.Item
                                                key={type}
                                                id={type}
                                                textValue={getDisplayValue(type, "job")}
                                                className="text-white data-[hover=true]:bg-violet-500/20 data-[selected=true]:text-violet-400 rounded-lg m-1"
                                            >
                                                {getDisplayValue(type, "job")}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Location Select */}
                            <Select
                                className="w-36"
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                variant="bordered"
                                aria-label="Filter by location"
                                classNames={{
                                    trigger: [
                                        "border-white/10",
                                        "bg-white/5",
                                        "hover:border-violet-500/50",
                                        "data-[focus=true]:border-violet-500",
                                        "rounded-xl",
                                        "h-10",
                                    ],
                                    value: "text-white text-sm",
                                }}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Location" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {locations.map((loc) => (
                                            <ListBox.Item
                                                key={loc}
                                                id={loc}
                                                textValue={getDisplayValue(loc, "location")}
                                                className="text-white data-[hover=true]:bg-violet-500/20 data-[selected=true]:text-violet-400 rounded-lg m-1"
                                            >
                                                {getDisplayValue(loc, "location")}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Category Select */}
                            <Select
                                className="w-36"
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                variant="bordered"
                                aria-label="Filter by category"
                                classNames={{
                                    trigger: [
                                        "border-white/10",
                                        "bg-white/5",
                                        "hover:border-violet-500/50",
                                        "data-[focus=true]:border-violet-500",
                                        "rounded-xl",
                                        "h-10",
                                    ],
                                    value: "text-white text-sm",
                                }}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Category" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {categories.map((cat) => (
                                            <ListBox.Item
                                                key={cat}
                                                id={cat}
                                                textValue={getDisplayValue(cat, "category")}
                                                className="text-white data-[hover=true]:bg-violet-500/20 data-[selected=true]:text-violet-400 rounded-lg m-1"
                                            >
                                                {getDisplayValue(cat, "category")}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <button className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-2.5 text-white text-sm font-medium hover:scale-[1.02] transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-400">Found {jobs?.length || 0} jobs</p>
                </div>

                {/* Jobs Grid */}
                {jobs && jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <BriefcaseBusiness size={48} className="text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Jobs Found</h2>
                        <p className="text-gray-400 text-center">
                            No job listings are currently available. Please check back later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobClient;