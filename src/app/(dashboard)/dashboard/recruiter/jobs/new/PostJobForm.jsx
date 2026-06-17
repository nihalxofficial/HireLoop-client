"use client";

import React, { useState, useEffect } from "react";
import {
    Button, Input, TextArea, Select, ListBox,
    DatePicker, DateField, Calendar,
} from "@heroui/react";
import {
    BriefcaseBusiness, MapPin, FileText,
    Building2, AlertCircle, CheckCircle,
} from "lucide-react";
import { addJob } from "@/lib/actions/jobs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ─── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
    "Technology", "Design", "Marketing",
    "Sales", "Finance", "Human Resources",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const CURRENCIES = [
    { id: "usd", label: "USD ($)" },
    { id: "eur", label: "EUR (€)" },
    { id: "gbp", label: "GBP (£)" },
    { id: "cad", label: "CAD ($)" },
    { id: "aud", label: "AUD ($)" },
    { id: "bdt", label: "BDT (৳)" },
];

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const inputClass = {
    input: "text-white placeholder:text-gray-500",
    inputWrapper: [
        "border-white/10", "bg-white/5",
        "hover:border-violet-500/50",
        "focus-within:border-violet-500",
        "focus-within:ring-1",
        "focus-within:ring-violet-500/30",
        "rounded-xl",
    ],
};

const selectTriggerClass = [
    "border-white/10", "bg-white/5",
    "hover:border-violet-500/50",
    "data-[focus=true]:border-violet-500",
    "rounded-xl", "h-10",
];

// ─── Reusable UI Pieces ────────────────────────────────────────────────────────

const PageHeader = ({ subtitle }) => (
    <div>
        <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">Recruiter Portal</span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Post a New Job</h1>
        <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
    </div>
);

const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <h2 className="text-base font-semibold text-white">{title}</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="p-5 space-y-4">{children}</div>
    </div>
);

const FieldLabel = ({ children, required }) => (
    <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {children} {required && <span className="text-red-400">*</span>}
    </label>
);

const CompanyLogo = ({ company, size = "sm" }) => {
    const dim = size === "sm" ? "w-6 h-6" : "w-8 h-8";
    return company.logo ? (
        <Image width={40} height={40} src={company.logo} alt={company.name} className={`${dim} rounded object-cover shrink-0`} />
    ) : (
        <div className={`${dim} rounded bg-violet-500/20 flex items-center justify-center shrink-0`}>
            <Building2 size={size === "sm" ? 14 : 16} className="text-violet-400" />
        </div>
    );
};

// ─── Guard States ──────────────────────────────────────────────────────────────

const NoCompaniesState = () => (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
        <PageHeader subtitle="You need to register a company first before posting a job." />
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center">
            <Building2 size={48} className="text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Companies Found</h2>
            <p className="text-gray-400 mb-6">Please register a company first to post jobs.</p>
            <Link href="/dashboard/recruiter/company">
                <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white">
                    Register Your First Company
                </Button>
            </Link>
        </div>
    </div>
);

const SelectCompanyState = ({ companies, onSelect }) => (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
        <PageHeader subtitle="Select a company to post a job for." />
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-5 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-violet-400" />
                    <h2 className="text-base font-semibold text-white">Select Company</h2>
                </div>
                <p className="text-sm text-gray-400 mt-1">Choose which company you want to post this job for.</p>
            </div>
            <div className="p-5 space-y-2">
                {companies.map((company) => (
                    <button
                        key={company._id}
                        type="button"
                        onClick={() => onSelect(company._id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all text-left cursor-pointer"
                    >
                        <CompanyLogo company={company} size="md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{company.name}</p>
                            <p className={`text-xs capitalize ${company.status === "approved" ? "text-emerald-400" : "text-yellow-400"}`}>
                                {company.status}
                            </p>
                        </div>
                        {company.status === "approved" ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                                <CheckCircle size={10} /> Ready
                            </span>
                        ) : (
                            <span className="text-xs text-yellow-400 border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 rounded-full shrink-0">
                                Pending
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const NotApprovedState = ({ company, onChangeCompany }) => (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
        <PageHeader subtitle="Fill out the details below to create a new job listing." />
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-w-md mx-auto text-center">
            <AlertCircle size={48} className="text-orange-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Company Not Approved</h2>
            <p className="text-gray-400 mb-4">
                <span className="text-white font-medium">&quot;{company?.name}&quot;</span> is currently{" "}
                <span className="text-yellow-400 capitalize">{company?.status}</span>.
                Please wait for approval before posting jobs.
            </p>
            <Button
                onPress={onChangeCompany}
                className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white"
            >
                Choose Different Company
            </Button>
        </div>
    </div>
);

const CompanyBanner = ({ company, onChangeCompany }) => (
    <div className="rounded-2xl border border-white/10 bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-2 border border-white/10">
                    <CompanyLogo company={company} size="sm" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Posting as</p>
                    <p className="text-white font-medium">{company?.name}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-emerald-400 font-medium capitalize">{company?.status}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <button
                    onClick={onChangeCompany}
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                >
                    Change Company
                </button>
            </div>
        </div>
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const PostJobForm = ({ companies, recruiter }) => {
    const router = useRouter();
    const [isSubmitting,      setIsSubmitting]      = useState(false);
    const [isRemote,          setIsRemote]          = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [userCleared,       setUserCleared]       = useState(false);

    const selectedCompany   = companies?.find(c => c._id === selectedCompanyId) ?? null;
    const isCompanyApproved = selectedCompany?.status === "approved";

    // Auto-select first approved company on mount unless user manually cleared
    useEffect(() => {
        if (userCleared || !companies?.length || selectedCompanyId) return;
        const approved = companies.find(c => c.status === "approved");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedCompanyId(approved?._id ?? companies[0]._id);
    }, [companies, selectedCompanyId, userCleared]);

    const handleSelectCompany = (id) => {
        setUserCleared(false);
        setSelectedCompanyId(id);
    };

    const handleChangeCompany = () => {
        setUserCleared(true);
        setSelectedCompanyId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const jobData = {
            title:            formData.get("jobTitle"),
            category:         formData.get("category"),
            type:             formData.get("jobType"),
            salaryMin:        formData.get("salaryMin"),
            salaryMax:        formData.get("salaryMax"),
            currency:         formData.get("currency"),
            location:         isRemote ? "Remote" : `${formData.get("city")}, ${formData.get("country")}`,
            isRemote,
            deadline:         formData.get("date"),
            responsibilities: formData.get("responsibilities"),
            requirements:     formData.get("requirements"),
            benefits:         formData.get("benefits"),
            // status:           "active",
            companyId:        selectedCompanyId,
            recruiterId:      recruiter.id,
        };
        const result = await addJob(jobData);
        if (result?.insertedId) {
            toast.success("New job added ✅");
            router.push("/dashboard/recruiter/jobs");
        }
        setIsSubmitting(false);
    };

    // ── Guards ────────────────────────────────────────────────────────────────
    if (!companies || companies.length === 0)  return <NoCompaniesState />;
    if (!selectedCompanyId)                    return <SelectCompanyState companies={companies} onSelect={handleSelectCompany} />;
    if (!isCompanyApproved)                    return <NotApprovedState company={selectedCompany} onChangeCompany={handleChangeCompany} />;

    // ── Job Posting Form ──────────────────────────────────────────────────────
    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <PageHeader subtitle={`Fill out the details below to create a new job listing for ${selectedCompany.name}.`} />

            <CompanyBanner company={selectedCompany} onChangeCompany={handleChangeCompany} />

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ── Job Information ── */}
                <SectionCard
                    icon={<BriefcaseBusiness size={16} className="text-violet-400" />}
                    title="Job Information"
                    subtitle="Basic details about the position"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="md:col-span-2">
                            <FieldLabel required>Job Title</FieldLabel>
                            <Input name="jobTitle" required placeholder="e.g., Senior Frontend Developer"
                                variant="bordered" fullWidth classNames={inputClass} />
                        </div>

                        <div>
                            <FieldLabel required>Job Category</FieldLabel>
                            <Select name="category" variant="bordered" className="w-full"
                                classNames={{ trigger: selectTriggerClass, value: "text-white" }}>
                                <Select.Trigger>
                                    <Select.Value placeholder="Select a category" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {CATEGORIES.map(cat => (
                                            <ListBox.Item key={cat} id={cat} textValue={cat}
                                                className="text-gray-300 data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 rounded-lg m-1">
                                                {cat}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div>
                            <FieldLabel required>Job Type</FieldLabel>
                            <Select name="jobType" variant="bordered" className="w-full"
                                classNames={{ trigger: selectTriggerClass, value: "text-white" }}>
                                <Select.Trigger>
                                    <Select.Value placeholder="Select type" />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {JOB_TYPES.map(type => (
                                            <ListBox.Item key={type} id={type} textValue={type}
                                                className="text-gray-300 data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 rounded-lg m-1">
                                                {type}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div>
                            <FieldLabel>Min Salary</FieldLabel>
                            <Input name="salaryMin" type="number" placeholder="50000"
                                variant="bordered" fullWidth classNames={inputClass} />
                        </div>

                        <div>
                            <FieldLabel>Max Salary</FieldLabel>
                            <Input name="salaryMax" type="number" placeholder="80000"
                                variant="bordered" fullWidth classNames={inputClass} />
                        </div>

                        <div>
                            <FieldLabel>Currency</FieldLabel>
                            <Select name="currency" defaultSelectedKeys={["usd"]} variant="bordered" className="w-full"
                                classNames={{ trigger: selectTriggerClass, value: "text-white" }}>
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator className="text-gray-400" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                        {CURRENCIES.map(({ id, label }) => (
                                            <ListBox.Item key={id} id={id} textValue={label}
                                                className="text-gray-300 data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 rounded-lg m-1">
                                                {label}
                                                <ListBox.ItemIndicator className="text-violet-400" />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="remote" checked={isRemote}
                                onChange={e => setIsRemote(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500" />
                            <label htmlFor="remote" className="text-sm text-white cursor-pointer">
                                Remote Position
                            </label>
                        </div>
                    </div>

                    {!isRemote && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <FieldLabel>City</FieldLabel>
                                <Input name="city" placeholder="e.g., San Francisco"
                                    startContent={<MapPin size={16} className="text-gray-400" />}
                                    variant="bordered" fullWidth classNames={inputClass} />
                            </div>
                            <div>
                                <FieldLabel>Country</FieldLabel>
                                <Input name="country" placeholder="e.g., United States"
                                    variant="bordered" fullWidth classNames={inputClass} />
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <FieldLabel required>Application Deadline</FieldLabel>
                        <DatePicker name="date" className="w-full" variant="bordered">
                            <DateField.Group className="w-full" fullWidth>
                                <DateField.Input className="w-full text-white">
                                    {(segment) => <DateField.Segment segment={segment} className="text-white" />}
                                </DateField.Input>
                                <DateField.Suffix>
                                    <DatePicker.Trigger>
                                        <DatePicker.TriggerIndicator className="text-gray-400" />
                                    </DatePicker.Trigger>
                                </DateField.Suffix>
                            </DateField.Group>
                            <DatePicker.Popover>
                                <Calendar aria-label="Deadline" className="bg-[#050816] border border-white/10 rounded-xl shadow-2xl">
                                    <Calendar.Header>
                                        <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading className="text-white" />
                                            <Calendar.YearPickerTriggerIndicator className="text-gray-400" />
                                        </Calendar.YearPickerTrigger>
                                        <Calendar.NavButton slot="previous" className="text-white" />
                                        <Calendar.NavButton slot="next" className="text-white" />
                                    </Calendar.Header>
                                    <Calendar.Grid>
                                        <Calendar.GridHeader>
                                            {(day) => <Calendar.HeaderCell className="text-gray-400">{day}</Calendar.HeaderCell>}
                                        </Calendar.GridHeader>
                                        <Calendar.GridBody>
                                            {(date) => <Calendar.Cell date={date} className="text-white hover:bg-violet-500/20" />}
                                        </Calendar.GridBody>
                                    </Calendar.Grid>
                                    <Calendar.YearPickerGrid>
                                        <Calendar.YearPickerGridBody>
                                            {({ year }) => <Calendar.YearPickerCell year={year} className="text-white hover:bg-violet-500/20" />}
                                        </Calendar.YearPickerGridBody>
                                    </Calendar.YearPickerGrid>
                                </Calendar>
                            </DatePicker.Popover>
                        </DatePicker>
                    </div>
                </SectionCard>

                {/* ── Job Description ── */}
                <SectionCard
                    icon={<FileText size={16} className="text-violet-400" />}
                    title="Job Description"
                    subtitle="Describe the role, requirements, and perks"
                >
                    <div>
                        <FieldLabel required>Responsibilities</FieldLabel>
                        <TextArea name="responsibilities" required minRows={4}
                            placeholder="• Lead frontend development initiatives&#10;• Collaborate with cross-functional teams"
                            variant="bordered" fullWidth classNames={inputClass} />
                    </div>
                    <div>
                        <FieldLabel required>Requirements</FieldLabel>
                        <TextArea name="requirements" required minRows={4}
                            placeholder="• 5+ years of React experience&#10;• Strong TypeScript knowledge"
                            variant="bordered" fullWidth classNames={inputClass} />
                    </div>
                    <div>
                        <FieldLabel>Benefits (Optional)</FieldLabel>
                        <TextArea name="benefits" minRows={3}
                            placeholder="• Competitive salary & equity&#10;• Health insurance"
                            variant="bordered" fullWidth classNames={inputClass} />
                    </div>
                </SectionCard>

                {/* ── Actions ── */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <Button type="button" variant="light" className="text-gray-300 hover:text-white hover:bg-white/10">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}
                        className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all">
                        {isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default PostJobForm;