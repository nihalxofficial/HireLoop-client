// app/jobs/jobClient.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { Select, ListBox, Button } from "@heroui/react";
import { BriefcaseBusiness, Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import JobCard from '@/components/shared/JobCard';

const JobClient = ({ initialJobs, companies }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for jobs and loading
    const [jobs, setJobs] = useState(initialJobs || []);
    const [loading, setLoading] = useState(false);

    // Form state for filters
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
    const [selectedJobType, setSelectedJobType] = useState(searchParams.get('jobType') || "all");
    const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || "all");
    const [salaryMin, setSalaryMin] = useState(parseInt(searchParams.get('salaryMin')) || 0);
    const [salaryMax, setSalaryMax] = useState(parseInt(searchParams.get('salaryMax')) || 200000);
    const [selectedCompany, setSelectedCompany] = useState(searchParams.get('company') || "all");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Temporary state for search input
    const [tempSearch, setTempSearch] = useState(searchTerm);

    // Get company name by ID
    const getCompanyName = (companyId) => {
        const company = companies?.find(c => c._id === companyId);
        return company?.name || "Company";
    };

    // Filter jobs client-side based on URL params
    const filterJobs = () => {
        let filtered = [...initialJobs];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCompanyName(job.companyId)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(job => job.category === selectedCategory);
        }

        // Job Type filter
        if (selectedJobType !== "all") {
            filtered = filtered.filter(job => job.type === selectedJobType);
        }

        // Location filter
        if (selectedLocation !== "all") {
            if (selectedLocation === "Remote") {
                filtered = filtered.filter(job => job.isRemote === true);
            } else if (selectedLocation === "On-site") {
                filtered = filtered.filter(job => job.isRemote === false && job.location);
            }
        }

        // Salary filter
        if (salaryMin > 0) {
            filtered = filtered.filter(job => job.salaryMin >= salaryMin);
        }
        if (salaryMax < 200000) {
            filtered = filtered.filter(job => job.salaryMax <= salaryMax);
        }

        // Company filter
        if (selectedCompany !== "all") {
            filtered = filtered.filter(job => job.companyId === selectedCompany);
        }

        setJobs(filtered);
    };

    // Update URL and filter when filters change
    const updateURLAndFilter = (overrides = {}) => {
        const current = {
            search: tempSearch,
            category: selectedCategory,
            jobType: selectedJobType,
            location: selectedLocation,
            salaryMin,
            salaryMax,
            company: selectedCompany,
            ...overrides, // <-- new value wins over stale state
        };

        const params = new URLSearchParams();
        if (current.search) params.append('search', current.search);
        if (current.category !== "all") params.append('category', current.category);
        if (current.jobType !== "all") params.append('jobType', current.jobType);
        if (current.location !== "all") params.append('location', current.location);
        if (current.salaryMin > 0) params.append('salaryMin', current.salaryMin);
        if (current.salaryMax < 200000) params.append('salaryMax', current.salaryMax);
        if (current.company !== "all") params.append('companyId', current.company);

        const queryString = params.toString();
        router.push(`/jobs${queryString ? `?${queryString}` : ''}`, { scroll: false });

        setSearchTerm(current.search);

        // Filter using current values, not stale state
        let filtered = [...initialJobs];
        if (current.search) {
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(current.search.toLowerCase()) ||
                getCompanyName(job.companyId)?.toLowerCase().includes(current.search.toLowerCase()) ||
                job.location?.toLowerCase().includes(current.search.toLowerCase())
            );
        }
        if (current.category !== "all") filtered = filtered.filter(job => job.category === current.category);
        if (current.jobType !== "all") filtered = filtered.filter(job => job.type === current.jobType);
        if (current.location !== "all") {
            if (current.location === "Remote") filtered = filtered.filter(job => job.isRemote === true);
            else if (current.location === "On-site") filtered = filtered.filter(job => job.isRemote === false && job.location);
        }
        if (current.salaryMin > 0) filtered = filtered.filter(job => job.salaryMin >= current.salaryMin);
        if (current.salaryMax < 200000) filtered = filtered.filter(job => job.salaryMax <= current.salaryMax);
        if (current.company !== "all") filtered = filtered.filter(job => job.companyId === current.company);

        setJobs(filtered);
    };

    // Handle search button click
    const handleSearch = () => {
        updateURLAndFilter({ search: tempSearch });
    };

    // Handle filter changes — pass new value as override directly
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        updateURLAndFilter({ category: value });
    };

    const handleJobTypeChange = (value) => {
        setSelectedJobType(value);
        updateURLAndFilter({ jobType: value });
    };

    const handleLocationChange = (value) => {
        setSelectedLocation(value);
        updateURLAndFilter({ location: value });
    };

    const handleSalaryChange = (min, max) => {
        setSalaryMin(min);
        setSalaryMax(max);
        updateURLAndFilter({ salaryMin: min, salaryMax: max });
    };

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
        updateURLAndFilter({ company: value });
    };

    // Clear all filters
    const clearFilters = () => {
        setTempSearch("");
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedJobType("all");
        setSelectedLocation("all");
        setSalaryMin(0);
        setSalaryMax(200000);
        setSelectedCompany("all");

        router.push('/jobs', { scroll: false });

        setTimeout(() => {
            setJobs(initialJobs);
        }, 0);
    };

    // Initial filter on component mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        filterJobs();
    }, []);

    // Extract unique values for filters from initialJobs
    const categories = ["all", ...new Set(initialJobs.map(job => job.category).filter(Boolean))];
    const jobTypes = ["all", ...new Set(initialJobs.map(job => job.type).filter(Boolean))];
    const locationOptions = ["all", "Remote", "On-site"];
    const companyList = ["all", ...new Set(initialJobs.map(job => job.companyId).filter(Boolean))];

    const hasActiveFilters = searchTerm !== "" ||
        selectedCategory !== "all" ||
        selectedJobType !== "all" ||
        selectedLocation !== "all" ||
        salaryMin > 0 || salaryMax < 200000 ||
        selectedCompany !== "all";

    const getDisplayValue = (value, type) => {
        if (value === "all") {
            if (type === "category") return "All Categories";
            if (type === "job") return "All Job Types";
            if (type === "location") return "All Locations";
            if (type === "company") return "All Companies";
        }
        return value;
    };

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                            Job Opportunities
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                                Browse All Jobs
                            </h1>
                            <p className="text-sm text-gray-400 mt-2">
                                Discover your next career opportunity from thousands of listings
                            </p>
                        </div>
                        <Button
                            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden bg-linear-to-r from-fuchsia-500 to-violet-600 text-white"
                            startContent={<Filter size={16} />}
                        >
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Search and Category Filter Bar */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 md:items-center">
                        {/* Search Input */}
                        <div className="flex-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by title, company, or location..."
                                    value={tempSearch}
                                    onChange={(e) => setTempSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                                />
                            </div>
                        </div>

                        {/* Category Select — FIXED: value/onChange instead of selectedKeys/onSelectionChange */}
                        <div className="flex-1">
                            <Select
                                className="w-full"
                                value={selectedCategory}
                                onChange={(value) => handleCategoryChange(value)}
                                variant="bordered"
                                aria-label="Filter by category"
                                classNames={{
                                    trigger: [
                                        "border-white/10",
                                        "bg-white/5",
                                        "hover:border-violet-500/50",
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
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="rounded-xl cursor-pointer bg-linear-to-r from-fuchsia-500 to-violet-600 px-6 py-2.5 text-white text-sm font-medium hover:scale-[1.02] transition-all"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Main Content with Sidebar */}
                <div className="flex gap-6">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24">
                            <div className="rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-2xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-white/10 bg-white/5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white font-semibold flex items-center gap-2">
                                            <SlidersHorizontal size={16} className="text-violet-400" />
                                            Advanced Filters
                                        </h3>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-xs cursor-pointer text-violet-400 hover:text-violet-300 transition-colors"
                                            >
                                                Clear all
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-5 py-4 space-y-5">
                                    {/* Job Type Filter - Radio Buttons */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Job Type</h4>
                                        <div className="space-y-2">
                                            {jobTypes.map((type) => (
                                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="jobType"
                                                        value={type}
                                                        checked={selectedJobType === type}
                                                        onChange={() => handleJobTypeChange(type)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/20"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                                        {type === "all" ? "All Job Types" : type}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location Filter - Radio Buttons */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Location</h4>
                                        <div className="space-y-2">
                                            {locationOptions.map((loc) => (
                                                <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="location"
                                                        value={loc}
                                                        checked={selectedLocation === loc}
                                                        onChange={() => handleLocationChange(loc)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/20"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                                        {loc === "all" ? "All Locations" : loc}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Salary Range Filter */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Salary Range</h4>
                                        <div className="space-y-3">
                                            <input
                                                type="range"
                                                min="0"
                                                max="200000"
                                                step="5000"
                                                value={salaryMin}
                                                onChange={(e) => handleSalaryChange(parseInt(e.target.value), salaryMax)}
                                                className="w-full h-1.5 rounded-lg appearance-none bg-white/20 accent-violet-500"
                                            />
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>${salaryMin.toLocaleString()}</span>
                                                <span>${salaryMax.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Filter - Radio Buttons */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Company</h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                            {companyList.map((companyId) => (
                                                <label key={companyId} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="company"
                                                        value={companyId}
                                                        checked={selectedCompany === companyId}
                                                        onChange={() => handleCompanyChange(companyId)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/20"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                                        {companyId === "all" ? "All Companies" : getCompanyName(companyId)}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Sidebar Overlay */}
                    {isSidebarOpen && (
                        <>
                            <div className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
                            <div className="fixed top-0 right-0 z-50 h-full w-80 bg-[#0a0f1a] border-l border-white/10 shadow-2xl overflow-y-auto lg:hidden">
                                <div className="sticky top-0 bg-[#0a0f1a] border-b border-white/10 px-5 py-4 flex items-center justify-between">
                                    <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                                        <SlidersHorizontal size={18} className="text-violet-400" />
                                        Filters
                                    </h3>
                                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="px-5 py-4 space-y-6">
                                    {/* Job Type */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Job Type</h4>
                                        <div className="space-y-2">
                                            {jobTypes.map((type) => (
                                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="mobileJobType"
                                                        value={type}
                                                        checked={selectedJobType === type}
                                                        onChange={() => handleJobTypeChange(type)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        {type === "all" ? "All Job Types" : type}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Location</h4>
                                        <div className="space-y-2">
                                            {locationOptions.map((loc) => (
                                                <label key={loc} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="mobileLocation"
                                                        value={loc}
                                                        checked={selectedLocation === loc}
                                                        onChange={() => handleLocationChange(loc)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        {loc === "all" ? "All Locations" : loc}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Salary Range */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Salary Range</h4>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200000"
                                            step="5000"
                                            value={salaryMin}
                                            onChange={(e) => handleSalaryChange(parseInt(e.target.value), salaryMax)}
                                            className="w-full h-1.5 rounded-lg appearance-none bg-white/20 accent-violet-500"
                                        />
                                        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                                            <span>${salaryMin.toLocaleString()}</span>
                                            <span>${salaryMax.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <h4 className="text-sm font-medium text-white mb-3">Company</h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {companyList.map((companyId) => (
                                                <label key={companyId} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="mobileCompany"
                                                        value={companyId}
                                                        checked={selectedCompany === companyId}
                                                        onChange={() => handleCompanyChange(companyId)}
                                                        className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-300 truncate">
                                                        {companyId === "all" ? "All Companies" : getCompanyName(companyId)}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {hasActiveFilters && (
                                        <Button onPress={clearFilters} variant="light" className="w-full text-gray-300">
                                            Clear All Filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Jobs Grid */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <p className="text-sm text-gray-400">
                                Found {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
                            </p>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} companies={companies} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                                <BriefcaseBusiness size={48} className="text-gray-600 mb-4" />
                                <h2 className="text-xl font-semibold text-white mb-2">No Jobs Found</h2>
                                <p className="text-gray-400 text-center">
                                    No jobs match your search criteria. Try adjusting your filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobClient;