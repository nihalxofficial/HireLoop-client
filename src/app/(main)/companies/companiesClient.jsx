// app/companies/CompaniesClient.jsx
"use client";

import React, { useState, useMemo } from "react";
import { Button, Input, Select, ListBox } from "@heroui/react";
import { BriefcaseBusiness, Building2, Search, Filter, X, SlidersHorizontal, MapPin, Users, Mail, Calendar, Eye } from "lucide-react";
import Link from "next/link";

const CompaniesClient = ({ initialCompanies }) => {
    const [companies] = useState(initialCompanies);
    const [searchTerm, setSearchTerm] = useState("");
    // FIXED: plain string state instead of Set
    const [selectedIndustry, setSelectedIndustry] = useState("all");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Extract unique values for filters
    const industries = useMemo(() => {
        const inds = new Set(companies.map(company => company.industry).filter(Boolean));
        return ["all", ...Array.from(inds)];
    }, [companies]);

    const locations = useMemo(() => {
        const locs = new Set(companies.map(company => company.location).filter(Boolean));
        return ["all", ...Array.from(locs)];
    }, [companies]);

    // Filter companies
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = searchTerm === "" ||
            company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.location?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry = selectedIndustry === "all" || company.industry === selectedIndustry;
        const matchesLocation = selectedLocation === "all" || company.location === selectedLocation;

        return matchesSearch && matchesIndustry && matchesLocation;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedIndustry("all");
        setSelectedLocation("all");
    };

    const hasActiveFilters = searchTerm !== "" ||
        selectedIndustry !== "all" ||
        selectedLocation !== "all";

    const getDisplayValue = (value) => {
        if (value === "all") return "All";
        return value;
    };

    // Format date helper
    const formatDate = (date) => {
        if (!date) return "N/A";
        const parsed = new Date(date);
        if (isNaN(parsed.getTime())) return "N/A";
        return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    // Get status badge styles
    const getStatusBadge = (status) => {
        const map = {
            approved: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: "Approved" },
            pending: { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", label: "Pending" },
            rejected: { color: "text-red-400 bg-red-500/10 border-red-500/20", label: "Rejected" },
        };
        return map[status] ?? { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", label: status };
    };

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                            Companies
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                                All Companies
                            </h1>
                            <p className="text-sm text-gray-400 mt-2">
                                Discover companies hiring and learn more about them
                            </p>
                        </div>
                        <Button
                            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white"
                            startContent={<Filter size={16} />}
                        >
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 md:items-center">
                        {/* Search Input */}
                        <div className="flex-[2]">
                            <Input
                                placeholder="Search by company name, industry, or location..."
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
                                        "rounded-xl",
                                    ],
                                }}
                            />
                        </div>

                        {/* Industry Select — FIXED: value/onChange */}
                        <div className="w-48">
                            <Select
                                className="w-full"
                                value={selectedIndustry}
                                onChange={(value) => setSelectedIndustry(value)}
                                variant="bordered"
                                placeholder="Industry"
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
                                    <Select.Value />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {industries.map((ind) => (
                                            <ListBox.Item
                                                key={ind}
                                                id={ind}
                                                textValue={getDisplayValue(ind)}
                                                className="text-white data-[hover=true]:bg-violet-500/20 data-[selected=true]:text-violet-400 rounded-lg m-1"
                                            >
                                                {getDisplayValue(ind)}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Location Select — FIXED: value/onChange */}
                        <div className="w-48">
                            <Select
                                className="w-full"
                                value={selectedLocation}
                                onChange={(value) => setSelectedLocation(value)}
                                variant="bordered"
                                placeholder="Location"
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
                                    <Select.Value />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {locations.map((loc) => (
                                            <ListBox.Item
                                                key={loc}
                                                id={loc}
                                                textValue={getDisplayValue(loc)}
                                                className="text-white data-[hover=true]:bg-violet-500/20 data-[selected=true]:text-violet-400 rounded-lg m-1"
                                            >
                                                {getDisplayValue(loc)}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                onPress={clearFilters}
                                variant="light"
                                className="text-gray-400 hover:text-white"
                                startContent={<X size={14} />}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-400">
                        Found {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"}
                    </p>
                </div>

                {/* Companies Grid */}
                {filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.map((company) => {
                            const statusBadge = getStatusBadge(company.status);
                            const logoSrc = company.logo || `https://ui-avatars.com/api/?background=7c3aed&color=fff&size=64&bold=true&name=${encodeURIComponent(company.name || "Co")}`;

                            return (
                                <div key={company._id} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                                    {/* Cover Image */}
                                    <div className="relative h-32 w-full">
                                        {company.coverImage ? (
                                            <img
                                                src={company.coverImage}
                                                alt={`${company.name} cover`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                                    </div>

                                    <div className="relative px-5 pb-5">
                                        {/* Logo + Name row */}
                                        <div className="flex items-end -mt-10 gap-4">
                                            <div className="relative shrink-0">
                                                <img
                                                    src={logoSrc}
                                                    alt={`${company.name} logo`}
                                                    className="w-16 h-16 rounded-xl ring-4 ring-[#050816] object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 pb-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <Link href={`/companies/${company._id}`}>
                                                        <h2 className="text-lg font-semibold text-white cursor-pointer hover:text-violet-400 transition-colors truncate">
                                                            {company.name}
                                                        </h2>
                                                    </Link>
                                                    {/* <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusBadge.color}`}>
                                                        {statusBadge.label}
                                                    </span> */}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                    <div className="flex items-center gap-1">
                                                        <BriefcaseBusiness size={12} className="text-violet-400 shrink-0" />
                                                        <span className="text-xs text-gray-400">{company.industry || "Not specified"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={12} className="text-violet-400 shrink-0" />
                                                        <span className="text-xs text-gray-400">{company.location || "Not specified"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users size={12} className="text-violet-400 shrink-0" />
                                                        <span className="text-xs text-gray-400">{company.employeeCount || "N/A"} employees</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recruiter Email */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <Mail size={14} className="text-gray-500 shrink-0" />
                                            <span className="text-sm text-gray-400 truncate">{company.recruiterEmail || "No email provided"}</span>
                                        </div>

                                        {/* Date Created */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar size={14} className="text-gray-500 shrink-0" />
                                            <span className="text-sm text-gray-400">Created: {formatDate(company.createdAt)}</span>
                                        </div>

                                        {/* Description */}
                                        {company.description && (
                                            <p className="text-sm text-gray-400 mt-3 line-clamp-2">{company.description}</p>
                                        )}

                                        {/* View Details Button */}
                                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                                            <button className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition-all hover:border-violet-500/50 hover:text-violet-400">
                                                <Link href={`/companies/${company._id}`} className="w-full flex items-center justify-center gap-1">
                                                    <Eye size={14} />
                                                    View Details
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <Building2 size={48} className="text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Companies Found</h2>
                        <p className="text-gray-400 text-center">
                            No companies match your search criteria. Try adjusting your filters.
                        </p>
                        {hasActiveFilters && (
                            <Button onPress={clearFilters} className="mt-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                Clear All Filters
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesClient;