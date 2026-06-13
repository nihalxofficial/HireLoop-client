"use client";

import React, { useState, useRef } from "react";
import {
    Button,
    Input,
    TextArea,
    Select,
    ListBox,
    Modal,
    Label,
    Surface,
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
    BriefcaseBusiness,
    Award,
    TrendingUp,
    ImageIcon,
    Send,
    User,
    Trash2,
    Plus,
    Upload,
    Loader2,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ─────────────────────────────────────────────────────────────────

const INDUSTRIES = [
    "Technology", "Healthcare", "Finance", "Education", "Retail",
    "Manufacturing", "Consulting", "Media", "Real Estate",
    "Transportation", "Hospitality", "Cloud Computing", "Fintech",
];

const EMPLOYEE_RANGES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
        pending: { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: <Clock size={12} />, label: "Pending" },
        rejected: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <XCircle size={12} />, label: "Rejected" },
    };
    return map[status] ?? { color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <Clock size={12} />, label: status };
};

const inputClass = {
    input: "text-white placeholder:text-gray-500",
    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500 data-[hover=true]:border-white/20",
};

const Field = ({ label, children }) => (
    <div>
        <Label className="text-gray-300 mb-1.5 block text-sm font-medium">{label}</Label>
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

// ─── Contact Form Modal ────────────────────────────────────────────────────────

const ContactFormModal = ({ isOpen, onClose, company }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all required fields");
            return;
        }

        setSubmitting(true);
        // TODO: Add your API call here
        console.log("Contact form submitted:", { companyId: company?._id, ...formData });
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Message sent successfully!");
        setSubmitting(false);
        onClose();
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-[#050816] border border-white/10">
                        <Modal.CloseTrigger />
                        <Modal.Header className="shrink-0">
                            <Modal.Icon className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                <Mail className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-white">Contact {company?.name}</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-gray-400">
                                Send a message to the company's recruitment team.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6 overflow-y-auto">
                            <Surface variant="default" className="bg-transparent">
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-300 mb-1.5 block">Your Name <span className="text-red-400">*</span></Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            placeholder="Enter your full name"
                                            variant="bordered"
                                            fullWidth
                                            startContent={<User size={16} className="text-gray-400" />}
                                            classNames={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-gray-300 mb-1.5 block">Your Email <span className="text-red-400">*</span></Label>
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="you@example.com"
                                            variant="bordered"
                                            fullWidth
                                            startContent={<Mail size={16} className="text-gray-400" />}
                                            classNames={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-gray-300 mb-1.5 block">Phone Number (Optional)</Label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            placeholder="+880 1234 567890"
                                            variant="bordered"
                                            fullWidth
                                            startContent={<Phone size={16} className="text-gray-400" />}
                                            classNames={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-gray-300 mb-1.5 block">Message <span className="text-red-400">*</span></Label>
                                        <TextArea
                                            value={formData.message}
                                            onChange={(e) => handleChange("message", e.target.value)}
                                            placeholder="Write your message here..."
                                            minRows={4}
                                            variant="bordered"
                                            fullWidth
                                            classNames={{
                                                input: "text-white placeholder:text-gray-500",
                                                inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={onClose} variant="light" className="text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSubmit}
                                isLoading={submitting}
                                className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                <Send size={16} />
                                Send Message
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

// ─── Edit Company Modal ────────────────────────────────────────────────────────

const EditCompanyModal = ({ isOpen, onClose, company, onSave }) => {
    const [formData, setFormData] = useState({
        name: company?.name || "",
        industry: company?.industry || "",
        website: company?.website || "",
        location: company?.location || "",
        employeeCount: company?.employeeCount || "",
        description: company?.description || "",
        recruiterEmail: company?.recruiterEmail || "",
        logo: company?.logo || "",
        coverImage: company?.coverImage || "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [logoPreview, setLogoPreview] = useState(company?.logo || "");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API || "YOUR_API_KEY";

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const uploadToImageBB = async (file) => {
        setUploadingLogo(true);
        const data = new FormData();
        data.append("image", file);
        data.append("key", IMGBB_API_KEY);
        try {
            const response = await fetch("https://api.imgbb.com/1/upload", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (result.success) {
                return result.data.url;
            }
            throw new Error("Upload failed");
        } catch (error) {
            console.error("ImageBB upload error:", error);
            alert("Failed to upload image. Please try again.");
            return null;
        } finally {
            setUploadingLogo(false);
        }
    };

    const processFile = async (file) => {
        if (!file || !VALID_IMAGE_TYPES.includes(file.type)) {
            alert("Please upload a PNG or JPG file");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            alert("File size must be less than 5MB");
            return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        
        const url = await uploadToImageBB(file);
        if (url) {
            handleChange("logo", url);
        } else {
            setLogoPreview(company?.logo || "");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const removeLogo = () => {
        setLogoPreview("");
        handleChange("logo", "");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        await onSave(formData);
        setSubmitting(false);
        onClose();
    };

    // Reset form when modal opens with new company data
    React.useEffect(() => {
        if (isOpen && company) {
            setFormData({
                name: company.name || "",
                industry: company.industry || "",
                website: company.website || "",
                location: company.location || "",
                employeeCount: company.employeeCount || "",
                description: company.description || "",
                recruiterEmail: company.recruiterEmail || "",
                logo: company.logo || "",
                coverImage: company.coverImage || "",
            });
            setLogoPreview(company.logo || "");
        }
    }, [isOpen, company]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl">
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-2xl bg-[#050816] border border-white/10 max-h-[90vh] overflow-y-auto">
                        <Modal.CloseTrigger />
                        <Modal.Header className="shrink-0">
                            <Modal.Icon className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                <Building2 className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-white">Edit Company Profile</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-gray-400">
                                Update your company information and branding.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6 overflow-y-auto">
                            <Surface variant="default" className="bg-transparent">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Field label="Company Name">
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleChange("name", e.target.value)}
                                                    placeholder="e.g., Acme Corp"
                                                    variant="bordered"
                                                    fullWidth
                                                    classNames={inputClass}
                                                />
                                            </Field>
                                        </div>

                                        <div>
                                            <Field label="Recruiter Email">
                                                <Input
                                                    value={formData.recruiterEmail}
                                                    onChange={(e) => handleChange("recruiterEmail", e.target.value)}
                                                    placeholder="careers@company.com"
                                                    startContent={<Mail size={16} className="text-gray-400" />}
                                                    variant="bordered"
                                                    fullWidth
                                                    classNames={inputClass}
                                                />
                                            </Field>
                                        </div>

                                        <div>
                                            <Field label="Industry / Category">
                                                <Select
                                                    selectedKeys={formData.industry ? new Set([formData.industry]) : new Set()}
                                                    onSelectionChange={(keys) => handleChange("industry", Array.from(keys)[0])}
                                                    variant="bordered"
                                                    className="w-full"
                                                    classNames={{
                                                        trigger: "border-white/10 bg-white/5 hover:border-violet-500/50 data-[hover=true]:border-white/20",
                                                        value: "text-white",
                                                    }}
                                                >
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
                                        </div>

                                        <div>
                                            <Field label="Website URL">
                                                <Input
                                                    value={formData.website}
                                                    onChange={(e) => handleChange("website", e.target.value)}
                                                    placeholder="https://www.company.com"
                                                    startContent={<Globe size={16} className="text-gray-400" />}
                                                    variant="bordered"
                                                    fullWidth
                                                    classNames={inputClass}
                                                />
                                            </Field>
                                        </div>

                                        <div>
                                            <Field label="Location">
                                                <Input
                                                    value={formData.location}
                                                    onChange={(e) => handleChange("location", e.target.value)}
                                                    placeholder="City, Country"
                                                    startContent={<MapPin size={16} className="text-gray-400" />}
                                                    variant="bordered"
                                                    fullWidth
                                                    classNames={inputClass}
                                                />
                                            </Field>
                                        </div>

                                        <div>
                                            <Field label="Employee Count Range">
                                                <Select
                                                    selectedKeys={formData.employeeCount ? new Set([formData.employeeCount]) : new Set()}
                                                    onSelectionChange={(keys) => handleChange("employeeCount", Array.from(keys)[0])}
                                                    variant="bordered"
                                                    className="w-full"
                                                    classNames={{
                                                        trigger: "border-white/10 bg-white/5 hover:border-violet-500/50 data-[hover=true]:border-white/20",
                                                        value: "text-white",
                                                    }}
                                                >
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
                                    </div>

                                    {/* Company Logo Upload */}
                                    <div>
                                        <Field label="Company Logo">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={(e) => processFile(e.target.files[0])}
                                                className="hidden"
                                                disabled={uploadingLogo}
                                            />
                                            <div
                                                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer
                                                    ${isDragging 
                                                        ? "border-violet-500 bg-violet-500/10" 
                                                        : "border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10"
                                                    }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                {uploadingLogo ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Loader2 size={32} className="text-violet-400 animate-spin" />
                                                        <p className="text-sm text-gray-400">Uploading to ImageBB...</p>
                                                    </div>
                                                ) : logoPreview ? (
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={logoPreview}
                                                            alt="Company Logo"
                                                            className="w-24 h-24 rounded-xl object-cover mx-auto ring-2 ring-violet-500/30"
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeLogo();
                                                            }}
                                                            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                                        >
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
                                    </div>

                                    {/* Cover Image URL */}
                                    <div>
                                        <Field label="Cover Image URL">
                                            <Input
                                                value={formData.coverImage}
                                                onChange={(e) => handleChange("coverImage", e.target.value)}
                                                placeholder="https://example.com/cover.jpg"
                                                startContent={<ImageIcon size={16} className="text-gray-400 shrink-0" />}
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                            {formData.coverImage && (
                                                <div className="relative mt-3 rounded-xl overflow-hidden border border-white/10 bg-white/5 h-28">
                                                    <img
                                                        src={formData.coverImage}
                                                        alt="Cover preview"
                                                        className="w-full h-full object-cover opacity-80"
                                                        onError={(e) => { e.target.style.display = "none"; }}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Field label="Brief Description">
                                            <TextArea
                                                value={formData.description}
                                                onChange={(e) => handleChange("description", e.target.value)}
                                                placeholder="Tell us about your company's mission and culture..."
                                                minRows={4}
                                                variant="bordered"
                                                fullWidth
                                                classNames={{
                                                    input: "text-white placeholder:text-gray-500",
                                                    inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                                                }}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={onClose} variant="light" className="text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSubmit}
                                isLoading={submitting}
                                className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20"
                            >
                                <Save size={16} />
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

// ─── Main Company Page ─────────────────────────────────────────────────────────

const CompanyPage = () => {
    const [company, setCompany] = useState({
        _id: "12345",
        name: "TechCorp Innovations",
        industry: "Technology",
        location: "San Francisco, CA",
        employeeCount: "201-500",
        description: "TechCorp Innovations is a leading technology company specializing in AI-driven solutions for businesses worldwide. We're dedicated to pushing the boundaries of innovation and creating impactful products that transform industries.",
        recruiterEmail: "careers@techcorp.com",
        website: "https://techcorp.com",
        logo: "https://ui-avatars.com/api/?background=7c3aed&color=fff&size=96&bold=true&name=TechCorp",
        coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470",
        status: "approved",
        activeJobs: 12,
        totalHires: 89,
        createdAt: "2024-01-15T00:00:00.000Z",
    });

    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    
    const [userRole, setUserRole] = useState("recruiter");

    const handleUpdateCompany = async (formData) => {
        setLoading(true);
        console.log("Updating company:", formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompany({ ...company, ...formData });
        alert("Company updated successfully!");
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Role Toggle for Testing - Remove in production */}
            <div className="mb-6 flex justify-end gap-3">
                <Button
                    size="sm"
                    onPress={() => setUserRole("seeker")}
                    className={`cursor-pointer transition-all duration-200 ${
                        userRole === "seeker" 
                            ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                >
                    Seeker View
                </Button>
                <Button
                    size="sm"
                    onPress={() => setUserRole("recruiter")}
                    className={`cursor-pointer transition-all duration-200 ${
                        userRole === "recruiter" 
                            ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                >
                    Recruiter View
                </Button>
            </div>

            {/* Page Header */}
            <div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                                Company Profile
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            {company.name}
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            {userRole === "recruiter" ? "Manage your company profile" : "Learn more about this company"}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {userRole === "seeker" && (
                            <Button
                                onPress={() => setIsContactModalOpen(true)}
                                className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
                            >
                                <Mail size={16} />
                                Contact Company
                            </Button>
                        )}
                        {userRole === "recruiter" && (
                            <Button
                                onPress={() => setIsEditModalOpen(true)}
                                className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
                            >
                                <Edit size={16} />
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Cover Image & Logo Section */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mt-6">
                <div className="relative h-48 md:h-64 w-full">
                    <img
                        src={company.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470";
                        }}
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
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?background=7c3aed&color=fff&size=96&bold=true&name=${encodeURIComponent(company.name)}`;
                                }}
                            />
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-xl font-semibold text-white">{company.name}</h2>
                                <StatusBadge status={company.status} />
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
                                    <Users size={12} className="text-violet-400" />
                                    {company.employeeCount} employees
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Only visible to Recruiters */}
            {userRole === "recruiter" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
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
                                <p className="text-sm text-gray-400">Created At</p>
                                <p className="text-sm font-semibold text-white mt-2">{formatDate(company.createdAt)}</p>
                            </div>
                            <div className="rounded-xl bg-fuchsia-500/10 p-3 border border-white/10">
                                <Calendar size={18} className="text-fuchsia-400" />
                            </div>
                        </div>
                    </div>
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Status</p>
                                <p className="text-sm font-semibold capitalize text-white mt-2">{company.status}</p>
                            </div>
                            <div className="rounded-xl bg-orange-500/10 p-3 border border-white/10">
                                <TrendingUp size={18} className="text-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Company Details */}
            <div className="space-y-6 mt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">About {company.name}</h2>
                    <p className="text-gray-300 leading-relaxed">
                        {company.description}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-violet-400" />
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm text-white">{company.recruiterEmail}</p>
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
                        <div className="flex items-center gap-3">
                            <Users size={16} className="text-violet-400" />
                            <div>
                                <p className="text-xs text-gray-400">Employee Count</p>
                                <p className="text-sm text-white">{company.employeeCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ContactFormModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                company={company}
            />

            <EditCompanyModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                company={company}
                onSave={handleUpdateCompany}
            />
        </div>
    );
};

export default CompanyPage;