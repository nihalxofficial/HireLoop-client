"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input, TextArea, Select, ListBox, Modal, Label, Surface } from "@heroui/react";
import { Building2, Globe, MapPin, Users, Mail, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, BriefcaseBusiness, Building, Upload, X, Calendar, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { addCompany, editCompany, deleteCompany } from "@/lib/actions/companies";
import { getRecruiterCompanies } from "@/lib/api/companies";
import { toast } from "react-toastify";

// ─── Constants ─────────────────────────────────────────────────────────────────

const INDUSTRIES = [
    "Technology", "Healthcare", "Finance", "Education", "Retail",
    "Manufacturing", "Consulting", "Media", "Real Estate",
    "Transportation", "Hospitality", "Cloud Computing", "Fintech",
];

const EMPLOYEE_RANGES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE     = 5 * 1024 * 1024; // 5MB

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (date) => {
    if (!date) return "N/A";
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "N/A";
    return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getStatusBadge = (status) => {
    const map = {
        approved: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle size={12} />, label: "Approved" },
        pending:  { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",   icon: <Clock size={12} />,        label: "Pending"  },
        rejected: { color: "text-red-400 bg-red-500/10 border-red-500/20",             icon: <XCircle size={12} />,      label: "Rejected" },
    };
    return map[status] ?? { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <Clock size={12} />, label: status };
};

// ─── Small reusable UI pieces ──────────────────────────────────────────────────

const inputClass = {
    input: "text-white placeholder:text-gray-500",
    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
};

const Field = ({ label, children }) => (
    <div>
        <Label className="text-gray-300 mb-1.5 block">{label}</Label>
        {children}
    </div>
);

const StatusBadge = ({ status }) => {
    const badge = getStatusBadge(status);
    return (
        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${badge.color}`}>
            {badge.icon}
            {badge.label}
        </span>
    );
};

// ─── Skeleton Loader Component ────────────────────────────────────────────────

const CompanyCardSkeleton = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden animate-pulse">
        <div className="relative h-32 w-full bg-white/10" />
        <div className="relative px-5 pb-5">
            <div className="flex items-end -mt-10 gap-4">
                <div className="w-16 h-16 rounded-xl ring-4 ring-[#050816] bg-white/10" />
                <div className="flex-1 pb-1">
                    <div className="h-6 w-32 bg-white/10 rounded-lg mb-2" />
                    <div className="flex items-center gap-3 mt-1">
                        <div className="h-3 w-20 bg-white/10 rounded" />
                        <div className="h-3 w-24 bg-white/10 rounded" />
                        <div className="h-3 w-28 bg-white/10 rounded" />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <div className="w-3.5 h-3.5 bg-white/10 rounded" />
                <div className="h-4 w-40 bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2 mt-1">
                <div className="w-3.5 h-3.5 bg-white/10 rounded" />
                <div className="h-4 w-32 bg-white/10 rounded" />
            </div>
            <div className="mt-3 space-y-2">
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-3/4 bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <div className="flex-1 h-8 bg-white/10 rounded-xl" />
                <div className="w-8 h-8 bg-white/10 rounded-xl" />
                <div className="w-8 h-8 bg-white/10 rounded-xl" />
            </div>
        </div>
    </div>
);

// ─── Company Card ──────────────────────────────────────────────────────────────

const CompanyCard = ({ company, onEdit, onDelete }) => {
    const [logoError, setLogoError] = useState(false);

    const logoSrc = logoError || !company.logo
        ? `https://ui-avatars.com/api/?background=7c3aed&color=fff&size=64&bold=true&name=${encodeURIComponent(company.name || "Co")}` : company.logo;

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">

            {/* Cover Image */}
            <div className="relative h-32 w-full">
                {company.coverImage ? (
                    <Image
                        src={company.coverImage}
                        alt={`${company.name} cover`}
                        fill
                        unoptimized
                        className="object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470"; }}
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-r from-violet-500/20 to-fuchsia-500/20" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-transparent" />
            </div>

            <div className="relative px-5 pb-5">
                {/* Logo + Name row */}
                <div className="flex items-end -mt-10 gap-4">
                    <div className="relative shrink-0">
                        <Image
                            src={logoSrc}
                            alt={`${company.name} logo`}
                            width={64}
                            height={64}
                            unoptimized
                            onError={() => setLogoError(true)}
                            className="w-16 h-16 rounded-xl ring-4 ring-[#050816] object-cover"
                        />
                    </div>
                    <div className="flex-1 pb-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/dashboard/companies/${company._id}`}>
                                <h2 className="text-lg font-semibold text-white cursor-pointer hover:text-violet-400 transition-colors truncate">
                                    {company.name}
                                </h2>
                            </Link>
                            <StatusBadge status={company.status} />
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

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                    <Link href={`/dashboard/companies/${company._id}`} className="flex-1">
                        <button className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition-all hover:border-violet-500/50 hover:text-violet-400">
                            <Eye size={14} />
                            View Details
                        </button>
                    </Link>
                    <button
                        onClick={() => onEdit(company)}
                        className="cursor-pointer p-2 rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-white/10"
                        title="Edit Company"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(company._id)}
                        className="cursor-pointer p-2 rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-red-500/50 hover:text-red-400 hover:bg-white/10"
                        title="Delete Company"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Company Form ──────────────────────────────────────────────────────────────

const CompanyForm = ({ company, isEditing, onSave, onCancel, recruiter }) => {

    const [formData, setFormData] = useState({
        name:           company?.name           || "",
        industry:       company?.industry       || "",
        website:        company?.website        || "",
        location:       company?.location       || "",
        employeeCount:  company?.employeeCount  || "",
        description:    company?.description    || "",
        recruiterEmail: company?.recruiterEmail || "",
        logo:           company?.logo           || "",
        coverImage:     company?.coverImage     || "",
        recruiterId:    recruiter?.id,
    });

    const [submitting,    setSubmitting]    = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [logoPreview,   setLogoPreview]   = useState(company?.logo || "");
    const [isDragging,    setIsDragging]    = useState(false);

    const fileInputRef  = useRef(null);
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API;

    const handleChange = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const uploadToImageBB = async (file) => {
        setUploadingLogo(true);
        const data = new FormData();
        data.append("image", file);
        data.append("key", IMGBB_API_KEY);
        try {
            const res    = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: data });
            const result = await res.json();
            if (result.success) return result.data.url;
            throw new Error("Upload failed");
        } catch (err) {
            console.error("ImageBB upload error:", err);
            alert("Failed to upload image. Please try again.");
            return null;
        } finally {
            setUploadingLogo(false);
        }
    };

    const processFile = async (file) => {
        if (!file || !VALID_IMAGE_TYPES.includes(file.type)) return alert("Please upload a PNG or JPG file");
        if (file.size > MAX_FILE_SIZE) return alert("File size must be less than 5MB");
        const reader = new FileReader();
        reader.onloadend = () => setLogoPreview(reader.result);
        reader.readAsDataURL(file);
        const url = await uploadToImageBB(file);
        if (url) handleChange("logo", url);
    };

    const removeLogo = () => {
        setLogoPreview("");
        handleChange("logo", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        await onSave({ ...formData });
        setSubmitting(false);
    };

    return (
        <div className="space-y-4">

            {/* Grid fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Field label="Company Name">
                    <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="e.g., Acme Corp" variant="secondary" fullWidth classNames={inputClass} />
                </Field>

                <Field label="Recruiter Email">
                    <Input value={formData.recruiterEmail} onChange={(e) => handleChange("recruiterEmail", e.target.value)}
                        placeholder="careers@company.com" startContent={<Mail size={16} className="text-gray-400" />}
                        variant="secondary" fullWidth classNames={inputClass} />
                </Field>

                {/* Industry dropdown */}
                <Field label="Industry / Category">
                    <Select 
                        selectedKeys={formData.industry ? new Set([formData.industry]) : new Set()}
                        onSelectionChange={(keys) => handleChange("industry", Array.from(keys)[0])}
                        aria-label="Industry / Category" variant="secondary" className="w-full"
                        classNames={{ trigger: "border-white/10 bg-white/5 hover:border-violet-500/50", value: "text-white" }}>
                        <Select.Trigger>
                            <Select.Value placeholder="Select industry" />
                            <Select.Indicator className="text-gray-400" />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                {INDUSTRIES.map((ind) => (
                                    <ListBox.Item key={ind} id={ind} textValue={ind} className="text-white data-[hover=true]:bg-violet-500/20 rounded-lg m-1">
                                        {ind}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </Field>

                <Field label="Website URL">
                    <Input value={formData.website} onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://www.company.com" startContent={<Globe size={16} className="text-gray-400" />}
                        variant="secondary" fullWidth classNames={inputClass} />
                </Field>

                <Field label="Location">
                    <Input value={formData.location} onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="City, Country" startContent={<MapPin size={16} className="text-gray-400" />}
                        variant="secondary" fullWidth classNames={inputClass} />
                </Field>

                {/* Employee count dropdown */}
                <Field label="Employee Count Range">
                    <Select 
                        selectedKeys={formData.employeeCount ? new Set([formData.employeeCount]) : new Set()}
                        onSelectionChange={(keys) => handleChange("employeeCount", Array.from(keys)[0])}
                        aria-label="Employee Count Range" variant="secondary" className="w-full"
                        classNames={{ trigger: "border-white/10 bg-white/5 hover:border-violet-500/50", value: "text-white" }}>
                        <Select.Trigger>
                            <Select.Value placeholder="Select range" />
                            <Select.Indicator className="text-gray-400" />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                {EMPLOYEE_RANGES.map((range) => (
                                    <ListBox.Item key={range} id={range} textValue={range} className="text-white data-[hover=true]:bg-violet-500/20 rounded-lg m-1">
                                        {range} employees
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </Field>

            </div>

            {/* Logo uploader */}
            <Field label="Company Logo">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => processFile(e.target.files[0])} className="hidden" disabled={uploadingLogo} />
                <div
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer
                        ${isDragging ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10"}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploadingLogo ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={32} className="text-violet-400 animate-spin" />
                            <p className="text-sm text-gray-400">Uploading to ImageBB...</p>
                        </div>
                    ) : logoPreview ? (
                        <div className="relative inline-block">
                            <Image
                                src={logoPreview}
                                alt="Company Logo"
                                width={400}
                                height={400}
                                className="w-24 h-24 rounded-xl object-cover mx-auto ring-2 ring-violet-500/30"
                            />
                            <button onClick={(e) => { e.stopPropagation(); removeLogo(); }}
                                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-full bg-violet-500/10">
                                <Upload size={24} className="text-violet-400" />
                            </div>
                            <p className="text-sm text-gray-400">Upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                    )}
                </div>
            </Field>

            {/* Cover Image URL */}
            <Field label="Cover Image URL">
                <div className="space-y-3">
                    <Input
                        value={formData.coverImage}
                        onChange={(e) => handleChange("coverImage", e.target.value)}
                        placeholder="https://example.com/cover.jpg"
                        startContent={<ImageIcon size={16} className="text-gray-400 shrink-0" />}
                        variant="secondary"
                        fullWidth
                        classNames={inputClass}
                    />
                    {formData.coverImage && (
                        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 h-28">
                            <Image
                                src={formData.coverImage}
                                alt="Cover preview"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover opacity-80"
                                onError={(e) => { e.target.style.display = "none"; }}
                            />
                            <button
                                onClick={() => handleChange("coverImage", "")}
                                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
                            >
                                <X size={14} />
                            </button>
                            <div className="absolute bottom-2 left-3 z-10">
                                <span className="text-xs text-white/60 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">Cover preview</span>
                            </div>
                        </div>
                    )}
                </div>
            </Field>

            {/* Description */}
            <Field label="Brief Description">
                <TextArea value={formData.description} onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell us about your company's mission and culture..."
                    minRows={4} variant="secondary" fullWidth
                    classNames={{ input: "text-white placeholder:text-gray-500", inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500" }} />
            </Field>

            {/* Form actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button onPress={onCancel} variant="light" className="cursor-pointer text-gray-300 hover:text-white">
                    Cancel
                </Button>
                <Button onPress={handleSubmit} isLoading={submitting}
                    className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20">
                    {isEditing ? "Save Changes" : "Register Company"}
                </Button>
            </div>

        </div>
    );
};

// ─── Companies Page ────────────────────────────────────────────────────────────

export const CompaniesPageClient = ({ recruiter, initialCompanies }) => {

    const [companies,       setCompanies]       = useState(initialCompanies || []);
    const [loading,         setLoading]         = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditing,       setIsEditing]       = useState(false);
    const [isModalOpen,     setIsModalOpen]     = useState(false);

    // Only fetch if initialCompanies is empty and we have a recruiter
    useEffect(() => {
        const fetchCompanies = async () => {
            if ((!initialCompanies || initialCompanies.length === 0) && recruiter?.id) {
                setLoading(true);
                try {
                    const data = await getRecruiterCompanies(recruiter.id);
                    setCompanies(data || []);
                } catch (error) {
                    console.error("Error fetching companies:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCompanies();
    }, [recruiter?.id, initialCompanies]);

    const handleAddNew = () => {
        setSelectedCompany(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEdit = (company) => {
        setSelectedCompany(company);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (companyId) => {
        if (!confirm("Are you sure you want to delete this company?")) return;
        try {
            await deleteCompany(companyId);
            setCompanies((prev) => prev.filter((c) => c._id !== companyId));
            toast.success("Company deleted");
        } catch (err) {
            console.error("Error deleting company:", err);
            toast.error("Failed to delete company. Please try again.");
        }
    };

    const handleSave = async (formData) => {
        try {
            if (isEditing) {
                const result = await editCompany(formData, selectedCompany._id);
                if (result) {
                    setCompanies((prev) =>
                        prev.map((c) =>
                            c._id === selectedCompany._id ? { ...c, ...formData } : c
                        )
                    );
                    toast.success("Company data updated");
                }
            } else {
                const payload = await addCompany(formData);
                if (payload) {
                    const newCompany = { 
                        ...formData, 
                        _id: payload.insertedId, 
                        status: "pending", 
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    setCompanies((prev) => [newCompany, ...prev]);
                    toast.success("New Company Added");
                }
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error saving company:", err);
            toast.error("Failed to save company. Please try again.");
        }
    };

    // Show loading skeletons while fetching data
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400/50 animate-pulse" />
                            <div className="h-2.5 w-32 bg-white/10 rounded animate-pulse" />
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400/50 animate-pulse" />
                        </div>
                        <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-2" />
                        <div className="h-4 w-96 bg-white/10 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-40 bg-white/10 rounded-xl animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <CompanyCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    // Show empty state
    if (!loading && companies.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">Company Management</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">My Companies</h1>
                        <p className="text-sm text-gray-400 mt-2">Manage your registered companies and their verification states.</p>
                    </div>
                    <Button onPress={handleAddNew}
                        className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                        <Plus size={16} /> Register New Company
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="rounded-full bg-white/5 p-6 mb-4 border border-white/10">
                        <Building size={48} className="text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Companies Registered</h2>
                    <p className="text-gray-400 text-center max-w-md mb-6">
                        You haven&apos;t registered any company yet. Register your first company to start posting jobs and hiring talent.
                    </p>
                    <Button onPress={handleAddNew} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                        <Plus size={16} /> Register Your First Company
                    </Button>
                </div>

                {/* Add Modal */}
                <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Modal.Backdrop>
                        <Modal.Container placement="center">
                            <Modal.Dialog className="sm:max-w-2xl bg-[#050816] border border-white/10 max-h-[90vh] flex flex-col">
                                <Modal.CloseTrigger />
                                <Modal.Header className="shrink-0">
                                    <Modal.Icon className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                        <Building2 className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading className="text-white">
                                        Register New Company
                                    </Modal.Heading>
                                    <p className="mt-1.5 text-sm leading-5 text-gray-400">
                                        Enter your business details to start hiring on HireLoop
                                    </p>
                                </Modal.Header>
                                <Modal.Body className="p-6 overflow-y-auto flex-1">
                                    <Surface variant="default" className="bg-transparent">
                                        <CompanyForm
                                            company={selectedCompany}
                                            isEditing={isEditing}
                                            onSave={handleSave}
                                            onCancel={() => setIsModalOpen(false)}
                                            recruiter={recruiter}
                                        />
                                    </Surface>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>
        );
    }

    // ── Render companies ────────────────────────────────────────────────────────

    return (
        <div className="space-y-6">

            {/* Page header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">Company Management</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">My Companies</h1>
                    <p className="text-sm text-gray-400 mt-2">Manage your registered companies and their verification states.</p>
                </div>
                <Button onPress={handleAddNew}
                    className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                    <Plus size={16} /> Register New Company
                </Button>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                    <CompanyCard
                        key={company._id}
                        company={company}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Add / Edit Modal */}
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-2xl bg-[#050816] border border-white/10 max-h-[90vh] flex flex-col">
                            <Modal.CloseTrigger />
                            <Modal.Header className="shrink-0">
                                <Modal.Icon className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                    <Building2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white">
                                    {isEditing ? "Edit Company" : "Register New Company"}
                                </Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-gray-400">
                                    {isEditing ? "Update your company information" : "Enter your business details to start hiring on HireLoop"}
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-6 overflow-y-auto flex-1">
                                <Surface variant="default" className="bg-transparent">
                                    <CompanyForm
                                        company={selectedCompany}
                                        isEditing={isEditing}
                                        onSave={handleSave}
                                        onCancel={() => setIsModalOpen(false)}
                                        recruiter={recruiter}
                                    />
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div>
    );
};