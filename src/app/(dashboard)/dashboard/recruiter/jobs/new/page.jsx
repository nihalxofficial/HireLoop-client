"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  DatePicker,
  DateField,
  Calendar,
} from "@heroui/react";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarIcon,
  FileText,
  Building2,
  AlertCircle,
} from "lucide-react";
import { addJob } from "@/lib/actions/jobs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PostJobPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  // Mock company data
  const company = {
    name: "TechCorp Innovations",
    plan: "Growth",
    activeJobs: 7,
    maxJobs: 10,
    isApproved: true,
  };

  const canPostJob = company.isApproved && company.activeJobs < company.maxJobs;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const jobData = {
      title: formData.get("jobTitle"),
      category: formData.get("category"),
      type: formData.get("jobType"),
      salaryMin: formData.get("salaryMin"),
      salaryMax: formData.get("salaryMax"),
      currency: formData.get("currency"),
      location: isRemote ? "Remote" : `${formData.get("city")}, ${formData.get("country")}`,
      isRemote: isRemote,
      deadline: formData.get("date"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      status: "active",
      companyId: "12345",
    };

    const result = await addJob(jobData);
    if(result.insertedId){
      toast.success("New job added✅");
      router.push("/dashboard/recruiter/jobs")
      
    }
    setIsSubmitting(false);
  };

  if (!canPostJob) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-w-md text-center">
          <AlertCircle size={48} className="text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Cannot Post Job</h2>
          <p className="text-gray-400 mb-4">
            {!company.isApproved
              ? "Your company is pending approval. Please wait for verification."
              : `You've reached your plan's job posting limit (${company.activeJobs}/${company.maxJobs} active jobs). Upgrade your plan to post more jobs.`}
          </p>
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
            Upgrade Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Recruiter Portal
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          Post a New Job
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Fill out the details below to create a new job listing.
        </p>
      </div>

      {/* Company Info Banner */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-2 border border-white/10">
              <Building2 size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Posting as</p>
              <p className="text-white font-medium">{company.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Active Jobs</p>
              <p className="text-white font-medium">
                {company.activeJobs} / {company.maxJobs}
              </p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
              <span className="text-xs text-emerald-400 capitalize">{company.plan} Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Information Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="p-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <BriefcaseBusiness size={16} className="text-violet-400" />
              <h2 className="text-base font-semibold text-white">Job Information</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">Basic details about the position</p>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title - Full width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <Input
                  name="jobTitle"
                  required
                  placeholder="e.g., Senior Frontend Developer"
                  variant="bordered"
                  fullWidth
                  classNames={{
                    input: "text-white placeholder:text-gray-500",
                    inputWrapper: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "focus-within:border-violet-500",
                      "focus-within:ring-1",
                      "focus-within:ring-violet-500/30",
                      "rounded-xl",
                    ],
                  }}
                />
              </div>

              {/* Job Category */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Job Category <span className="text-red-400">*</span>
                </label>
                <Select 
                  className="w-full" 
                  name="category"
                  variant="bordered"
                  classNames={{
                    trigger: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "data-[focus=true]:border-violet-500",
                      "data-[focus=true]:ring-1",
                      "data-[focus=true]:ring-violet-500/30",
                      "rounded-xl",
                      "h-10",
                    ],
                    value: "text-white",
                    placeholder: "text-gray-500",
                  }}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select a category" />
                    <Select.Indicator className="text-gray-400" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#050816] border border-white/10 rounded-xl shadow-2xl">
                      <ListBox.Item 
                        id="technology" 
                        textValue="Technology" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Technology
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="design" 
                        textValue="Design" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Design
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="marketing" 
                        textValue="Marketing" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Marketing
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="sales" 
                        textValue="Sales" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Sales
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="finance" 
                        textValue="Finance" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Finance
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="hr" 
                        textValue="Human Resources" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Human Resources
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Job Type */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Job Type <span className="text-red-400">*</span>
                </label>
                <Select 
                  className="w-full" 
                  name="jobType"
                  variant="bordered"
                  classNames={{
                    trigger: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "data-[focus=true]:border-violet-500",
                      "data-[focus=true]:ring-1",
                      "data-[focus=true]:ring-violet-500/30",
                      "rounded-xl",
                      "h-10",
                    ],
                    value: "text-white",
                    placeholder: "text-gray-500",
                  }}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select type" />
                    <Select.Indicator className="text-gray-400" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#050816] border border-white/10 rounded-xl shadow-2xl">
                      <ListBox.Item 
                        id="fulltime" 
                        textValue="Full-time" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Full-time
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="parttime" 
                        textValue="Part-time" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Part-time
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="contract" 
                        textValue="Contract" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Contract
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="internship" 
                        textValue="Internship" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        Internship
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Min Salary</label>
                <Input
                  name="salaryMin"
                  type="number"
                  placeholder="50000"
                  variant="bordered"
                  fullWidth
                  classNames={{
                    input: "text-white placeholder:text-gray-500",
                    inputWrapper: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "focus-within:border-violet-500",
                      "focus-within:ring-1",
                      "focus-within:ring-violet-500/30",
                      "rounded-xl",
                    ],
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Max Salary</label>
                <Input
                  name="salaryMax"
                  type="number"
                  placeholder="80000"
                  variant="bordered"
                  fullWidth
                  classNames={{
                    input: "text-white placeholder:text-gray-500",
                    inputWrapper: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "focus-within:border-violet-500",
                      "focus-within:ring-1",
                      "focus-within:ring-violet-500/30",
                      "rounded-xl",
                    ],
                  }}
                />
              </div>

              {/* Currency */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Currency</label>
                <Select 
                  className="w-full" 
                  name="currency" 
                  defaultSelectedKeys={["usd"]}
                  variant="bordered"
                  classNames={{
                    trigger: [
                      "border-white/10",
                      "bg-white/5",
                      "hover:border-violet-500/50",
                      "data-[focus=true]:border-violet-500",
                      "data-[focus=true]:ring-1",
                      "data-[focus=true]:ring-violet-500/30",
                      "rounded-xl",
                      "h-10",
                    ],
                    value: "text-white",
                  }}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator className="text-gray-400" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#050816] border border-white/10 rounded-xl shadow-2xl">
                      <ListBox.Item 
                        id="usd" 
                        textValue="USD ($)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        USD ($)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="eur" 
                        textValue="EUR (€)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        EUR (€)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="gbp" 
                        textValue="GBP (£)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        GBP (£)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="cad" 
                        textValue="CAD ($)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        CAD ($)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="aud" 
                        textValue="AUD ($)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        AUD ($)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item 
                        id="bdt" 
                        textValue="BDT (৳)" 
                        className="text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1"
                      >
                        BDT (৳)
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Remote Toggle */}
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-0"
                  />
                  <span className="text-sm text-white">Remote Position</span>
                </label>
              </div>
            </div>

            {/* Location Fields */}
            {!isRemote && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">City</label>
                  <Input
                    name="city"
                    placeholder="e.g., San Francisco"
                    startContent={<MapPin size={16} className="text-gray-400" />}
                    variant="bordered"
                    fullWidth
                    classNames={{
                      input: "text-white placeholder:text-gray-500",
                      inputWrapper: [
                        "border-white/10",
                        "bg-white/5",
                        "hover:border-violet-500/50",
                        "focus-within:border-violet-500",
                        "focus-within:ring-1",
                        "focus-within:ring-violet-500/30",
                        "rounded-xl",
                      ],
                    }}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Country</label>
                  <Input
                    name="country"
                    placeholder="e.g., United States"
                    variant="bordered"
                    fullWidth
                    classNames={{
                      input: "text-white placeholder:text-gray-500",
                      inputWrapper: [
                        "border-white/10",
                        "bg-white/5",
                        "hover:border-violet-500/50",
                        "focus-within:border-violet-500",
                        "focus-within:ring-1",
                        "focus-within:ring-violet-500/30",
                        "rounded-xl",
                      ],
                    }}
                  />
                </div>
              </div>
            )}

            {/* Application Deadline - DatePicker */}
            <div className="w-full mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Application Deadline <span className="text-red-400">*</span>
              </label>
              <DatePicker name="date" className="w-full" variant="bordered">
                <DateField.Group className="w-full" fullWidth>
                  <DateField.Input className="w-full text-white">{(segment) => <DateField.Segment segment={segment} className="text-white" />}</DateField.Input>
                  <DateField.Suffix>
                    <DatePicker.Trigger>
                      <DatePicker.TriggerIndicator className="text-gray-400" />
                    </DatePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DatePicker.Popover>
                  <Calendar aria-label="Event date" className="bg-[#050816] border border-white/10 rounded-xl shadow-2xl">
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
                        {({year}) => <Calendar.YearPickerCell year={year} className="text-white hover:bg-violet-500/20" />}
                      </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                  </Calendar>
                </DatePicker.Popover>
              </DatePicker>
            </div>
          </div>
        </div>

        {/* Job Description Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="p-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-violet-400" />
              <h2 className="text-base font-semibold text-white">Job Description</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">Describe the role, requirements, and perks</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Responsibilities */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Responsibilities <span className="text-red-400">*</span>
              </label>
              <TextArea
                name="responsibilities"
                required
                minRows={4}
                placeholder="• Lead frontend development initiatives&#10;• Collaborate with cross-functional teams&#10;• Mentor junior developers"
                variant="bordered"
                fullWidth
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                  ],
                }}
              />
            </div>

            {/* Requirements */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Requirements <span className="text-red-400">*</span>
              </label>
              <TextArea
                name="requirements"
                required
                minRows={4}
                placeholder="• 5+ years of React experience&#10;• Strong TypeScript knowledge&#10;• Bachelor's in Computer Science or equivalent"
                variant="bordered"
                fullWidth
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                  ],
                }}
              />
            </div>

            {/* Benefits */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Benefits (Optional)
              </label>
              <TextArea
                name="benefits"
                minRows={3}
                placeholder="• Competitive salary & equity&#10;• Health, dental, vision insurance&#10;• Remote work stipend&#10;• 401(k) matching"
                variant="bordered"
                fullWidth
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                  ],
                }}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="light" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all"
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;