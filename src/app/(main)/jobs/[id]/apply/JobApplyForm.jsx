// app/jobs/[id]/apply/jobApplyForm.jsx
"use client";

import React, { useState, useRef } from "react";
import { User, Link2 } from "lucide-react";
import { Button, Input, TextArea, Label } from "@heroui/react";
import {
    BriefcaseBusiness,
    Building2,
    MapPin,
    DollarSign,
    Calendar,
    Clock,
    Upload,
    X,
    FileText,
    Send,
    Loader2,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createApplication } from "@/lib/actions/applications";

const JobApplyForm = ({ job, user, company }) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedCV, setUploadedCV] = useState(null);
    const [uploadingCV, setUploadingCV] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        coverLetter: "",
        portfolio: "",
        linkedin: "",
        github: "",
        expectedSalary: "",
        noticePeriod: "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCVUpload = async (file) => {
        if (!file) return;

        // Check file type
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload PDF, DOC, or DOCX file");
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setUploadingCV(true);

        // TODO: Upload to your server or cloud storage
        // For now, simulate upload
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUploadedCV({
            name: file.name,
            size: file.size,
            type: file.type
        });
        setUploadingCV(false);
        toast.success("CV uploaded successfully");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleCVUpload(file);
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
        if (file) {
            handleCVUpload(file);
        }
    };

    const removeCV = () => {
        setUploadedCV(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedCV) {
            toast.error("Please upload your CV/Resume");
            return;
        }

        if (!formData.fullName || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        // TODO: Submit application to your API
        const applicationData = {
            jobTitle: job.title,
            ApplicantId: user.id,
            companyId: job.companyId,
            recruiterId: job.recruiterId,
            ...formData,
            cv: uploadedCV,
            appliedAt: new Date(),
        };

        const result = await createApplication(applicationData);
        console.log(result);
        if(result.insertedId){
            toast.success("Application submitted successfully!");
            router.push(`/jobs/${job._id}`);
        }
        setIsSubmitting(false);
    };

    const formatSalary = (min, max, currency) => {
        const symbol = currency === "usd" ? "$" :
            currency === "eur" ? "€" :
                currency === "gbp" ? "£" :
                    currency === "bdt" ? "৳" : "$";
        return `${symbol}${parseInt(min).toLocaleString()} - ${symbol}${parseInt(max).toLocaleString()}`;
    };

    const inputClass = {
        input: "text-white placeholder:text-gray-500",
        inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500 data-[hover=true]:border-white/20 rounded-xl",
    };

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button className="mb-6 cursor-pointer flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                    <Link href={`/jobs/${job._id}`}>
                        ← Back to Job Details
                    </Link>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Job Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-5">
                            {/* Job Info Card */}
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center">
                                        <BriefcaseBusiness size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-white font-semibold">Job Summary</h2>
                                        <p className="text-xs text-gray-400">You're applying for</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Building2 size={14} className="text-violet-400" />
                                        <span><Link href={`/companies/${company?._id}`}>{company?.name || "Company"}</Link></span>
                                        
                                        
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin size={14} className="text-violet-400" />
                                        <span>{job.isRemote ? "Remote" : job.location || "Not specified"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <DollarSign size={14} className="text-emerald-400" />
                                        <span className="text-emerald-400">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar size={14} className="text-orange-400" />
                                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                                <h4 className="text-sm font-semibold text-white mb-3">Application Tips</h4>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                                        <span>Tailor your cover letter to the job requirements</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                                        <span>Highlight relevant experience and skills</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                                        <span>Ensure your CV is up to date</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                                        <span>Double-check contact information</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            {/* Form Header */}
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <h1 className="text-2xl font-semibold text-white tracking-tight">
                                    Apply for {job.title}
                                </h1>
                                <p className="text-sm text-gray-400 mt-1">
                                    Please fill out the form below to submit your application
                                </p>
                            </div>

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Personal Information Section */}
                                <div>
                                    <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                                        <User size={16} className="text-violet-400" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Full Name <span className="text-red-400">*</span></Label>
                                            <Input
                                                value={formData.fullName}
                                                onChange={(e) => handleChange("fullName", e.target.value)}
                                                placeholder="Enter your full name"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                                isRequired
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Email <span className="text-red-400">*</span></Label>
                                            <Input
                                                value={formData.email}
                                                onChange={(e) => handleChange("email", e.target.value)}
                                                placeholder="your@email.com"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                                isRequired
                                                isReadOnly
                                                disabled
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Email is linked to your account</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Phone Number <span className="text-red-400">*</span></Label>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => handleChange("phone", e.target.value)}
                                                placeholder="+880 1234 567890"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                                isRequired
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Expected Salary</Label>
                                            <Input
                                                value={formData.expectedSalary}
                                                onChange={(e) => handleChange("expectedSalary", e.target.value)}
                                                placeholder="e.g., $60,000/year"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Links Section */}
                                <div>
                                    <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                                        <Link2 size={16} className="text-violet-400" />
                                        Professional Links
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Portfolio Website</Label>
                                            <Input
                                                value={formData.portfolio}
                                                onChange={(e) => handleChange("portfolio", e.target.value)}
                                                placeholder="https://yourportfolio.com"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">LinkedIn Profile</Label>
                                            <Input
                                                value={formData.linkedin}
                                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                                placeholder="https://linkedin.com/in/username"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">GitHub Profile</Label>
                                            <Input
                                                value={formData.github}
                                                onChange={(e) => handleChange("github", e.target.value)}
                                                placeholder="https://github.com/username"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-gray-300 mb-1.5 block">Notice Period</Label>
                                            <Input
                                                value={formData.noticePeriod}
                                                onChange={(e) => handleChange("noticePeriod", e.target.value)}
                                                placeholder="e.g., 2 weeks, 1 month"
                                                variant="bordered"
                                                fullWidth
                                                classNames={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CV Upload Section */}
                                <div>
                                    <Label className="text-gray-300 mb-1.5 block">CV/Resume <span className="text-red-400">*</span></Label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
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
                                        {uploadingCV ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 size={32} className="text-violet-400 animate-spin" />
                                                <p className="text-sm text-gray-400">Uploading CV...</p>
                                            </div>
                                        ) : uploadedCV ? (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={24} className="text-emerald-400" />
                                                    <div className="text-left">
                                                        <p className="text-sm text-white">{uploadedCV.name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {(uploadedCV.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeCV();
                                                    }}
                                                    className="p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="p-3 rounded-full bg-violet-500/10">
                                                    <Upload size={24} className="text-violet-400" />
                                                </div>
                                                <p className="text-sm text-gray-400">Click or drag to upload CV/Resume</p>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cover Letter Section */}
                                <div>
                                    <Label className="text-gray-300 mb-1.5 block">Cover Letter</Label>
                                    <TextArea
                                        value={formData.coverLetter}
                                        onChange={(e) => handleChange("coverLetter", e.target.value)}
                                        placeholder="Tell us why you're the perfect fit for this position..."
                                        minRows={5}
                                        variant="bordered"
                                        fullWidth
                                        classNames={{
                                            input: "text-white placeholder:text-gray-500",
                                            inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500 rounded-xl",
                                        }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                    <Link href={`/jobs/${job._id}`}>
                                        <Button variant="light" className="text-gray-300 hover:text-white">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all"
                                    >
                                        <Send size={16} />
                                        Submit Application
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplyForm;