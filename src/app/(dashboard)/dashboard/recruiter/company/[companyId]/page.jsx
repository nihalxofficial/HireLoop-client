"use client";

import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    TextArea,
    Select,
    ListBox,
    Card,
    CardBody,
} from "@heroui/react";
import {
    Building2,
    Globe,
    MapPin,
    Users,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Edit,
    Save,
    X,
    Upload,
    BriefcaseBusiness,
    Award,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";

const CompanyPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState({
        id: "1",
        name: "TechCorp Innovations",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=200",
        coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470",
        industry: "Technology",
        website: "https://techcorp.com",
        email: "careers@techcorp.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA, United States",
        employeeCount: "50-100",
        foundedYear: "2018",
        description: "TechCorp Innovations is a leading technology company specializing in AI-driven solutions for businesses worldwide. We're dedicated to pushing the boundaries of innovation and creating impactful products that transform industries.",
        mission: "To empower businesses with cutting-edge technology solutions that drive growth and efficiency.",
        vision: "To become the world's most trusted technology partner for digital transformation.",
        benefits: [
            "Competitive salary and equity packages",
            "Health, dental, and vision insurance",
            "401(k) matching",
            "Flexible work hours and remote options",
            "Professional development budget",
            "Team building events and retreats",
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/company/techcorp",
            twitter: "https://twitter.com/techcorp",
            github: "https://github.com/techcorp",
        },
        status: "approved",
        plan: "Growth",
        activeJobs: 7,
        totalHires: 124,
        rating: 4.8,
    });

    const [formData, setFormData] = useState(company);

    const industries = [
        "Technology", "Healthcare", "Finance", "Education", 
        "Retail", "Manufacturing", "Consulting", "Media", 
        "Real Estate", "Transportation", "Hospitality", "Other"
    ];

    const employeeRanges = [
        "1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"
    ];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // API call to save company data
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCompany(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving company:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(company);
        setIsEditing(false);
    };

    const getStatusBadge = () => {
        switch (company.status) {
            case "approved":
                return { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle size={12} />, label: "Approved" };
            case "pending":
                return { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: <Clock size={12} />, label: "Pending Approval" };
            case "rejected":
                return { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <XCircle size={12} />, label: "Rejected" };
            default:
                return { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <Clock size={12} />, label: company.status };
        }
    };

    const statusBadge = getStatusBadge();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                                Company Profile
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            {company.name}
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Manage your company profile, view stats, and update information.
                        </p>
                    </div>
                    {!isEditing && (
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
                        >
                            <Edit size={16} />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            {/* Cover Image & Logo Section */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="relative h-48 md:h-64 w-full">
                    <img
                        src={company.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                </div>
                <div className="relative px-6 pb-6">
                    <div className="flex items-end -mt-12 gap-4">
                        <div className="relative">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-24 h-24 rounded-2xl ring-4 ring-[#050816] object-cover"
                            />
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg">
                                    <Upload size={12} />
                                </button>
                            )}
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold text-white">{company.name}</h2>
                                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusBadge.color}`}>
                                    {statusBadge.icon}
                                    {statusBadge.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <BriefcaseBusiness size={12} className="text-violet-400" />
                                    {company.industry}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <MapPin size={12} className="text-violet-400" />
                                    {company.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Calendar size={12} className="text-violet-400" />
                                    Founded {company.foundedYear}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Active Jobs</p>
                            <p className="text-3xl font-bold text-white mt-2">{company.activeJobs}</p>
                        </div>
                        <div className="rounded-xl bg-violet-500/10 p-3 border border-white/10">
                            <BriefcaseBusiness size={18} className="text-violet-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Hires</p>
                            <p className="text-3xl font-bold text-white mt-2">{company.totalHires}</p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 border border-white/10">
                            <Users size={18} className="text-emerald-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Company Rating</p>
                            <p className="text-3xl font-bold text-white mt-2">{company.rating}</p>
                        </div>
                        <div className="rounded-xl bg-fuchsia-500/10 p-3 border border-white/10">
                            <Award size={18} className="text-fuchsia-400" />
                        </div>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Current Plan</p>
                            <p className="text-3xl font-bold text-white mt-2">{company.plan}</p>
                        </div>
                        <div className="rounded-xl bg-orange-500/10 p-3 border border-white/10">
                            <TrendingUp size={18} className="text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Details Form */}
            {isEditing ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Edit Company Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Company Name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                            <Select
                                selectedKeys={new Set([formData.industry])}
                                onSelectionChange={(keys) => handleInputChange("industry", Array.from(keys)[0])}
                                variant="bordered"
                                label="Industry"
                                classNames={{
                                    trigger: "border-white/10 bg-white/5 hover:border-violet-500/50",
                                    value: "text-white",
                                    label: "text-gray-300",
                                }}
                            >
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {industries.map((ind) => (
                                            <ListBox.Item key={ind} id={ind} textValue={ind} className="text-white data-[hover=true]:bg-violet-500/20">
                                                {ind}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            <Input
                                label="Website"
                                value={formData.website}
                                onChange={(e) => handleInputChange("website", e.target.value)}
                                startContent={<Globe size={16} className="text-gray-400" />}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                            <Input
                                label="Email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                startContent={<Mail size={16} className="text-gray-400" />}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                            <Input
                                label="Phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                startContent={<Phone size={16} className="text-gray-400" />}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                            <Input
                                label="Location"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                startContent={<MapPin size={16} className="text-gray-400" />}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                            <Select
                                selectedKeys={new Set([formData.employeeCount])}
                                onSelectionChange={(keys) => handleInputChange("employeeCount", Array.from(keys)[0])}
                                variant="bordered"
                                label="Employee Count"
                                classNames={{
                                    trigger: "border-white/10 bg-white/5 hover:border-violet-500/50",
                                    value: "text-white",
                                    label: "text-gray-300",
                                }}
                            >
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {employeeRanges.map((range) => (
                                            <ListBox.Item key={range} id={range} textValue={range} className="text-white data-[hover=true]:bg-violet-500/20">
                                                {range}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            <Input
                                label="Founded Year"
                                value={formData.foundedYear}
                                onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                                variant="bordered"
                                classNames={{
                                    input: "text-white",
                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                    label: "text-gray-300",
                                }}
                            />
                        </div>
                        <TextArea
                            label="Company Description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            minRows={3}
                            variant="bordered"
                            classNames={{
                                input: "text-white",
                                inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                label: "text-gray-300",
                            }}
                        />
                        <TextArea
                            label="Mission Statement"
                            value={formData.mission}
                            onChange={(e) => handleInputChange("mission", e.target.value)}
                            minRows={2}
                            variant="bordered"
                            classNames={{
                                input: "text-white",
                                inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                label: "text-gray-300",
                            }}
                        />
                        <TextArea
                            label="Vision Statement"
                            value={formData.vision}
                            onChange={(e) => handleInputChange("vision", e.target.value)}
                            minRows={2}
                            variant="bordered"
                            classNames={{
                                input: "text-white",
                                inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                label: "text-gray-300",
                            }}
                        />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button onClick={handleCancel} variant="light" className="text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} isLoading={loading} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                <Save size={16} />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* About Company */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">About {company.name}</h2>
                        <p className="text-gray-300 leading-relaxed">{company.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <h3 className="text-sm font-medium text-violet-400 mb-2">Mission</h3>
                                <p className="text-gray-400 text-sm">{company.mission}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-violet-400 mb-2">Vision</h3>
                                <p className="text-gray-400 text-sm">{company.vision}</p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Why Join Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {company.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-violet-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="text-sm text-white">{company.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-violet-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Phone</p>
                                    <p className="text-sm text-white">{company.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe size={16} className="text-violet-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Website</p>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300">
                                        {company.website}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-violet-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Location</p>
                                    <p className="text-sm text-white">{company.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyPage;