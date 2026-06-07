"use client";

// ─────────────────────────────────────────────
// React hooks we need:
//   useState  → stores data that can change (re-renders UI when updated)
//   useEffect → runs code when the component first loads (like "on page load")
//   useRef    → gives us a direct reference to a DOM element (e.g. the hidden file input)
// ─────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";

// UI components from HeroUI (pre-built styled components)
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

// Icons from Lucide React (SVG icons as React components)
import {
    Building2,
    Globe,
    MapPin,
    Users,
    Mail,
    Plus,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    BriefcaseBusiness,
    Building,
    Upload,
    X,
    Calendar,
    Loader2,
} from "lucide-react";

// Next.js <Link> for client-side navigation (no full page reload)
import Link from "next/link";
import { form } from "framer-motion/client";

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// This is the full Companies page: shows the table + modal
// ─────────────────────────────────────────────
const CompaniesPage = () => {

    // ── State variables ──────────────────────
    // companies       → the list of company objects shown in the table
    // loading         → true while fetching data (shows a spinner)
    // selectedCompany → the company being edited (null when adding new)
    // isEditing       → true = edit mode, false = add new mode
    // isModalOpen     → controls whether the add/edit modal is visible
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ── Run fetchCompanies once when the page first loads ──
    useEffect(() => {
        fetchCompanies();
    }, []); // empty [] means "run only once on mount, never again"

    // ── Fetch companies from the API (currently using mock/fake data) ──
    const fetchCompanies = async () => {
        try {
            setLoading(true);

            // TODO: swap the mock below with a real API call like:
            // const response = await fetch('/api/companies');
            // const data = await response.json();
            // setCompanies(data);

            // Simulating a 500ms network delay with fake data
            setTimeout(() => {
                setCompanies([
                    {
                        id: 1,
                        name: "Vercel Inc.",
                        recruiterEmail: "hiring@vercel.com",
                        industry: "Technology",
                        status: "approved",
                        dateSubmitted: "2024-01-15",
                        logo: "https://i.ibb.co/placeholder/vercel.png",
                        location: "San Francisco, CA",
                        employeeCount: "501-1000",
                        website: "https://vercel.com",
                        description: "Vercel is the platform for frontend developers.",
                        activeJobs: 24,
                        totalHires: 156,
                    },
                    {
                        id: 2,
                        name: "Figma Inc.",
                        recruiterEmail: "careers@figma.com",
                        industry: "Technology",
                        status: "approved",
                        dateSubmitted: "2024-01-20",
                        logo: "https://i.ibb.co/placeholder/figma.png",
                        location: "San Francisco, CA",
                        employeeCount: "1000+",
                        website: "https://figma.com",
                        description: "Figma is the collaborative interface design tool.",
                        activeJobs: 18,
                        totalHires: 89,
                    },
                    {
                        id: 3,
                        name: "Enosis Solutions",
                        recruiterEmail: "hr@enosis.com",
                        industry: "Technology",
                        status: "pending",
                        dateSubmitted: "2024-02-01",
                        logo: "https://i.ibb.co/placeholder/enosis.png",
                        location: "Shakti, Bangladesh",
                        employeeCount: "51-200",
                        website: "https://enosis.com",
                        description: "ENOSIS - Your trusted Software Development Partner.",
                        activeJobs: 12,
                        totalHires: 45,
                    },
                    {
                        id: 4,
                        name: "Stripe Payments",
                        recruiterEmail: "jobs@stripe.com",
                        industry: "Fintech",
                        status: "approved",
                        dateSubmitted: "2024-01-10",
                        logo: "https://i.ibb.co/placeholder/stripe.png",
                        location: "San Francisco, CA",
                        employeeCount: "1000+",
                        website: "https://stripe.com",
                        description: "Stripe builds economic infrastructure for the internet.",
                        activeJobs: 32,
                        totalHires: 234,
                    },
                    {
                        id: 5,
                        name: "Notion Labs",
                        recruiterEmail: "talent@notion.com",
                        industry: "Technology",
                        status: "pending",
                        dateSubmitted: "2024-02-05",
                        logo: "https://i.ibb.co/placeholder/notion.png",
                        location: "San Francisco, CA",
                        employeeCount: "201-500",
                        website: "https://notion.com",
                        description: "Notion is a workspace that adapts to your needs.",
                        activeJobs: 15,
                        totalHires: 67,
                    },
                    {
                        id: 6,
                        name: "DigitalOcean",
                        recruiterEmail: "careers@digitalocean.com",
                        industry: "Cloud Computing",
                        status: "rejected",
                        dateSubmitted: "2024-01-25",
                        logo: "https://i.ibb.co/placeholder/digitalocean.png",
                        location: "New York, NY",
                        employeeCount: "1000+",
                        website: "https://digitalocean.com",
                        description: "DigitalOcean simplifies cloud computing for developers.",
                        activeJobs: 0,
                        totalHires: 0,
                    },
                ]);
                setLoading(false);
            }, 500);

        } catch (error) {
            console.error("Error fetching companies:", error);
            setLoading(false);
        }
    };

    // ── Delete a company by its ID ──
    // Shows a confirmation dialog first, then removes it from the list
    const handleDelete = async (companyId) => {
        const confirmed = confirm("Are you sure you want to delete this company?");

        if (!confirmed) return; // user clicked Cancel → do nothing

        try {
            // TODO: call your real DELETE API first:
            // await fetch(`/api/companies/${companyId}`, { method: 'DELETE' });

            // Remove the deleted company from local state.
            // filter() returns a new array without the item whose id matches companyId.
            const updatedList = companies.filter((company) => company.id !== companyId);
            setCompanies(updatedList);

        } catch (error) {
            console.error("Error deleting company:", error);
            alert("Failed to delete company. Please try again.");
        }
    };

    // ── Open the modal in EDIT mode ──
    // Stores the company being edited so the form can pre-fill its values
    const handleEdit = (company) => {
        setSelectedCompany(company); // save this company so the form can pre-fill
        setIsEditing(true);          // tell the modal we're editing, not adding new
        setIsModalOpen(true);        // open the modal
    };

    // ── Open the modal in ADD NEW mode ──
    const handleAddNew = () => {
        setSelectedCompany(null); // no pre-fill — blank form
        setIsEditing(false);      // we're adding a new company, not editing
        setIsModalOpen(true);     // open the modal
    };

    // ── Called by CompanyForm when the user submits the form ──
    // formData is the object passed up from the child component via the onSave prop
    const handleSave = async (formData) => {
        try {
            if (isEditing) {
                // ── UPDATE existing company ──
                // TODO: replace with real API call:
                // await fetch(`/api/companies/${selectedCompany.id}`, {
                //     method: 'PUT',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData),
                // });

                // map() loops every company. If the id matches, replace it with updated data.
                // All other companies are returned unchanged.
                const updatedList = companies.map((company) => {
                    if (company.id === selectedCompany.id) {
                        return { ...formData, id: selectedCompany.id }; // keep the same id
                    }
                    return company;
                });
                setCompanies(updatedList);

            } else {
                console.log(formData);
                // ── CREATE new company ──
                // TODO: replace with real API call:
                // const response = await fetch('/api/companies', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData),
                // });
                // const newCompany = await response.json();

                // Build the new company object with auto-generated fields
                const newCompany = {
                    ...formData,                                           // all fields from the form
                    id: Date.now(),                                        // temp unique id (replace with real DB id)
                    status: "pending",                                     // always starts as pending
                    dateSubmitted: new Date().toISOString().split("T")[0], // today e.g. "2024-06-07"
                    activeJobs: 0,
                    totalHires: 0,
                };

                // Prepend the new company to the top of the list
                setCompanies([newCompany, ...companies]);
            }

            setIsModalOpen(false); // close the modal after saving

        } catch (error) {
            console.error("Error saving company:", error);
            alert("Failed to save company. Please try again.");
        }
    };

    // ── Returns badge style config based on company status string ──
    // Used in the table to render the colored status pill
    const getStatusBadge = (status) => {
        if (status === "approved") {
            return {
                color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                icon: <CheckCircle size={12} />,
                label: "Approved",
            };
        }
        if (status === "pending") {
            return {
                color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
                icon: <Clock size={12} />,
                label: "Pending",
            };
        }
        if (status === "rejected") {
            return {
                color: "text-red-400 bg-red-500/10 border-red-500/20",
                icon: <XCircle size={12} />,
                label: "Rejected",
            };
        }
        // Fallback for any unexpected status value
        return {
            color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
            icon: <Clock size={12} />,
            label: status,
        };
    };

    // ── Format "2024-01-15" → "Jan 15, 2024" ──
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // ── Show a loading spinner while data is being fetched ──
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading companies...</p>
                </div>
            </div>
        );
    }

    // ── Main render ──────────────────────────
    return (
        <div className="space-y-6">

            {/* ── Page Header ── */}
            <div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                                Company Management
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            My Companies
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Manage your registered companies and their verification states.
                        </p>
                    </div>

                    {/* Button opens the "Add New" modal */}
                    <Button
                        onPress={handleAddNew}
                        className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
                    >
                        <Plus size={16} />
                        Register New Company
                    </Button>
                </div>
            </div>

            {/* ── Companies Table (or empty state if no companies) ── */}
            {companies.length === 0 ? (

                // Empty state — shown when the companies array is empty
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="rounded-full bg-white/5 p-6 mb-4 border border-white/10">
                        <Building size={48} className="text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Companies Registered</h2>
                    <p className="text-gray-400 text-center max-w-md mb-6">
                        You haven't registered any company yet. Register your first company to start posting jobs and hiring talent.
                    </p>
                    <Button onPress={handleAddNew} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                        <Plus size={16} />
                        Register Your First Company
                    </Button>
                </div>

            ) : (

                // Table — shown when there is at least one company
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
                    <div className="overflow-x-auto">
                        <table className="w-full">

                            {/* Table header row */}
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">COMPANY</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">RECRUITER EMAIL</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">INDUSTRY</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">LOCATION</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">EMPLOYEES</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">STATUS</th>
                                    <th className="text-left px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">DATE</th>
                                    <th className="text-center px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-400">ACTIONS</th>
                                </tr>
                            </thead>

                            {/* Table body — one <tr> per company */}
                            <tbody>
                                {companies.map((company) => {
                                    // Get the badge config for this company's status
                                    const statusBadge = getStatusBadge(company.status);

                                    return (
                                        <tr key={company.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">

                                            {/* Company logo + name */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={company.logo}
                                                        alt={company.name}
                                                        className="w-8 h-8 rounded-lg ring-2 ring-violet-500/30 object-cover"
                                                        onError={(e) => {
                                                            // If logo URL is broken, show a fallback image
                                                            e.target.src = "https://i.ibb.co/placeholder/default.png";
                                                        }}
                                                    />
                                                    <Link href={`/dashboard/companies/${company.id}`}>
                                                        <span className="text-sm font-medium text-white hover:text-violet-400 transition-colors cursor-pointer">
                                                            {company.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>

                                            {/* Recruiter email */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} className="text-gray-500" />
                                                    <span className="text-sm text-gray-300">{company.recruiterEmail}</span>
                                                </div>
                                            </td>

                                            {/* Industry */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <BriefcaseBusiness size={12} className="text-violet-400" />
                                                    <span className="text-sm text-gray-300">{company.industry}</span>
                                                </div>
                                            </td>

                                            {/* Location */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} className="text-violet-400" />
                                                    <span className="text-sm text-gray-300">{company.location}</span>
                                                </div>
                                            </td>

                                            {/* Employee count */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Users size={12} className="text-violet-400" />
                                                    <span className="text-sm text-gray-300">{company.employeeCount}</span>
                                                </div>
                                            </td>

                                            {/* Status badge (approved / pending / rejected) */}
                                            <td className="px-5 py-4">
                                                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusBadge.color}`}>
                                                    {statusBadge.icon}
                                                    {statusBadge.label}
                                                </span>
                                            </td>

                                            {/* Date submitted */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-500" />
                                                    <span className="text-sm text-gray-400">{formatDate(company.dateSubmitted)}</span>
                                                </div>
                                            </td>

                                            {/* Action buttons: View / Edit / Delete */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-2">

                                                    {/* View — navigates to the company detail page */}
                                                    <Link href={`/dashboard/companies/${company.id}`}>
                                                        <button className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200" title="View Company Details">
                                                            <Eye size={16} />
                                                        </button>
                                                    </Link>

                                                    {/* Edit — opens modal with this company's data pre-filled */}
                                                    <button
                                                        onClick={() => handleEdit(company)}
                                                        className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200"
                                                        title="Edit Company"
                                                    >
                                                        <Edit size={16} />
                                                    </button>

                                                    {/* Delete — asks for confirmation, then removes the company */}
                                                    <button
                                                        onClick={() => handleDelete(company.id)}
                                                        className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
                                                        title="Delete Company"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Add / Edit Modal ── */}
            {/* isOpen controls visibility; onOpenChange keeps state in sync when user closes via backdrop/ESC */}
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-2xl bg-[#050816] border border-white/10 max-h-[90vh] flex flex-col">
                            <Modal.CloseTrigger />
                            <Modal.Header className="flex-shrink-0">
                                <Modal.Icon className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                    <Building2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white">
                                    {/* Show different title depending on mode */}
                                    {isEditing ? "Edit Company" : "Register New Company"}
                                </Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-gray-400">
                                    {isEditing ? "Update your company information" : "Enter your business details to start hiring on HireLoop"}
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6 overflow-y-auto flex-1">
                                <Surface variant="default" className="bg-transparent">
                                    {/*
                                        CompanyForm is the child component defined below.
                                        Props passed down:
                                          company   → data to pre-fill (null when adding new)
                                          isEditing → so the form shows the right button label
                                          onSave    → called when user submits; receives form data
                                          onCancel  → closes the modal without saving
                                    */}
                                    <CompanyForm
                                        company={selectedCompany}
                                        isEditing={isEditing}
                                        onSave={handleSave}
                                        onCancel={() => setIsModalOpen(false)}
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


// ─────────────────────────────────────────────
// COMPANY FORM COMPONENT
// Rendered inside the modal for both Add and Edit.
// Receives data/callbacks from CompaniesPage via props.
// ─────────────────────────────────────────────
const CompanyForm = ({ company, isEditing, onSave, onCancel }) => {

    // ── All form fields stored in a single state object ──
    // company?.name means: "if company exists, use company.name; otherwise use empty string"
    // This handles both edit mode (pre-fill) and add mode (blank fields)
    const [formData, setFormData] = useState({
        name:           company?.name           || "",
        industry:       company?.industry       || "",
        website:        company?.website        || "",
        location:       company?.location       || "",
        employeeCount:  company?.employeeCount  || "",
        description:    company?.description    || "",
        recruiterEmail: company?.recruiterEmail || "",
        logo:           company?.logo           || "",
    });

    const [submitting, setSubmitting] = useState(false);       // true while save API call is in progress
    const [uploadingLogo, setUploadingLogo] = useState(false); // true while image uploads to ImageBB
    const [logoPreview, setLogoPreview] = useState(company?.logo || ""); // base64 or URL shown as preview
    const [isDragging, setIsDragging] = useState(false);       // true when user drags a file over the drop zone

    // fileInputRef lets us programmatically trigger the hidden <input type="file">
    const fileInputRef = useRef(null);

    // ImageBB API key from .env.local → NEXT_PUBLIC_IMAGE_API
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API;

    // Dropdown option lists
    const industries = [
        "Technology", "Healthcare", "Finance", "Education",
        "Retail", "Manufacturing", "Consulting", "Media",
        "Real Estate", "Transportation", "Hospitality", "Cloud Computing", "Fintech",
    ];

    const employeeRanges = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

    // ── Generic field updater ──
    // Called like: handleChange("name", "Acme Corp")
    // The spread operator copies all existing fields, then [field] overrides just the changed one
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // ── Upload a file to ImageBB and return the hosted URL ──
    const uploadToImageBB = async (file) => {
        setUploadingLogo(true);

        // FormData is the browser-native way to send files over HTTP
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
                return result.data.url; // the public URL of the uploaded image
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading to ImageBB:", error);
            alert("Failed to upload image. Please try again.");
            return null;
        } finally {
            // finally always runs — clears the spinner on both success and error
            setUploadingLogo(false);
        }
    };

    // ── Handle a file chosen via the file picker dialog ──
    const handleLogoUpload = async (event) => {
        const file = event.target.files[0];

        // Check file type
        const isValidType = file && (
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg"
        );
        if (!isValidType) {
            alert("Please upload PNG or JPG file");
            return;
        }

        // Check file size (max 5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("File size must be less than 5MB");
            return;
        }

        // Show a local preview immediately using FileReader (before upload finishes)
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result); // reader.result is a base64 data URL string
        };
        reader.readAsDataURL(file);

        // Upload to ImageBB and save the returned hosted URL into formData
        const imageUrl = await uploadToImageBB(file);
        if (imageUrl) {
            setFormData({ ...formData, logo: imageUrl });
        }
    };

    // ── Drag-and-drop event handlers ──

    // Must call e.preventDefault() in dragover to allow the drop event to fire
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // When a file is dropped onto the upload area — same logic as handleLogoUpload
    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0]; // get the dropped file

        const isValidType = file && (
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg"
        );
        if (!isValidType) {
            alert("Please upload PNG or JPG file");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("File size must be less than 5MB");
            return;
        }

        // Preview + upload (same as file picker flow)
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);

        const imageUrl = await uploadToImageBB(file);
        if (imageUrl) {
            setFormData({ ...formData, logo: imageUrl });
        }
    };

    // ── Clear the logo preview and reset the file input ──
    const removeLogo = () => {
        setLogoPreview("");
        setFormData({ ...formData, logo: "" });
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // reset so the same file can be re-selected later
        }
    };

    // ── Called when user clicks "Register Company" or "Save Changes" ──
    const handleSubmit = async () => {
        setSubmitting(true);

        // Send the collected form data up to the parent (CompaniesPage.handleSave)
        await onSave({
            name:           formData.name,
            recruiterEmail: formData.recruiterEmail,
            industry:       formData.industry,
            website:        formData.website,
            location:       formData.location,
            employeeCount:  formData.employeeCount,
            description:    formData.description,
            logo:           formData.logo,
        });

        setSubmitting(false);
    };

    // ── Form JSX ─────────────────────────────
    return (
        <div className="space-y-4">

            {/* Two-column grid for most input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Company Name */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Company Name</Label>
                    <Input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="e.g., Acme Corp"
                        variant="secondary"
                        fullWidth
                        classNames={{
                            input: "text-white placeholder:text-gray-500",
                            inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50",
                        }}
                    />
                </div>

                {/* Recruiter Email */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Recruiter Email</Label>
                    <Input
                        value={formData.recruiterEmail}
                        onChange={(e) => handleChange("recruiterEmail", e.target.value)}
                        placeholder="careers@company.com"
                        startContent={<Mail size={16} className="text-gray-400" />}
                        variant="secondary"
                        fullWidth
                        classNames={{
                            input: "text-white placeholder:text-gray-500",
                            inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50",
                        }}
                    />
                </div>

                {/* Industry dropdown */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Industry / Category</Label>
                    <Select
                        value={formData.industry}
                        onChange={(value) => handleChange("industry", value)}
                        variant="secondary"
                        className="w-full"
                        classNames={{
                            trigger: "border-white/10 bg-white/5 hover:border-violet-500/50",
                            value: "text-white",
                        }}
                    >
                        <Select.Trigger>
                            <Select.Value placeholder="Select industry" />
                            <Select.Indicator className="text-gray-400" />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                {industries.map((ind) => (
                                    <ListBox.Item key={ind} id={ind} textValue={ind} className="text-white data-[hover=true]:bg-violet-500/20 rounded-lg m-1">
                                        {ind}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Website URL */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Website URL</Label>
                    <Input
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://www.company.com"
                        startContent={<Globe size={16} className="text-gray-400" />}
                        variant="secondary"
                        fullWidth
                        classNames={{
                            input: "text-white placeholder:text-gray-500",
                            inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50",
                        }}
                    />
                </div>

                {/* Location */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Location</Label>
                    <Input
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="City, Country"
                        startContent={<MapPin size={16} className="text-gray-400" />}
                        variant="secondary"
                        fullWidth
                        classNames={{
                            input: "text-white placeholder:text-gray-500",
                            inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50",
                        }}
                    />
                </div>

                {/* Employee count dropdown */}
                <div>
                    <Label className="text-gray-300 mb-1.5 block">Employee Count Range</Label>
                    <Select
                        value={formData.employeeCount}
                        onChange={(value) => handleChange("employeeCount", value)}
                        variant="secondary"
                        className="w-full"
                        classNames={{
                            trigger: "border-white/10 bg-white/5 hover:border-violet-500/50",
                            value: "text-white",
                        }}
                    >
                        <Select.Trigger>
                            <Select.Value placeholder="Select range" />
                            <Select.Indicator className="text-gray-400" />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl">
                                {employeeRanges.map((range) => (
                                    <ListBox.Item key={range} id={range} textValue={range} className="text-white data-[hover=true]:bg-violet-500/20 rounded-lg m-1">
                                        {range} employees
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

            </div>

            {/* ── Logo upload area (drag & drop or click to browse) ── */}
            <div className="col-span-full">
                <Label className="text-gray-300 mb-1.5 block">Company Logo</Label>

                {/*
                    Clicking this div triggers the hidden file input below.
                    Border colour changes to violet when isDragging is true.
                */}
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
                    {/* Hidden file input — activated by the div's onClick above */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleLogoUpload}
                        className="hidden"
                        disabled={uploadingLogo}
                    />

                    {/* Show spinner while uploading to ImageBB */}
                    {uploadingLogo ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={32} className="text-violet-400 animate-spin" />
                            <p className="text-sm text-gray-400">Uploading to ImageBB...</p>
                        </div>

                    ) : logoPreview ? (
                        // A logo has been selected — show preview + remove (X) button
                        <div className="relative inline-block">
                            <img
                                src={logoPreview}
                                alt="Company Logo"
                                className="w-24 h-24 rounded-xl object-cover mx-auto ring-2 ring-violet-500/30"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent the div's onClick from also firing
                                    removeLogo();
                                }}
                                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                    ) : (
                        // Default state — no logo selected yet
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-full bg-violet-500/10">
                                <Upload size={24} className="text-violet-400" />
                            </div>
                            <p className="text-sm text-gray-400">Upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Company description textarea ── */}
            <div className="col-span-full">
                <Label className="text-gray-300 mb-1.5 block">Brief Description</Label>
                <TextArea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell us about your company's mission and culture..."
                    minRows={4}
                    variant="secondary"
                    fullWidth
                    classNames={{
                        input: "text-white placeholder:text-gray-500",
                        inputWrapper: "border-white/10 bg-white/5 hover:border-violet-500/50 focus-within:border-violet-500",
                    }}
                />
            </div>

            {/* ── Cancel / Submit buttons ── */}
            <div className="flex justify-end gap-3 pt-4">
                <Button onPress={onCancel} variant="secondary" className="cursor-pointer text-gray-300 hover:text-white">
                    Cancel
                </Button>
                <Button
                    onPress={handleSubmit}
                    isLoading={submitting}
                    className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white"
                >
                    {isEditing ? "Save Changes" : "Register Company"}
                </Button>
            </div>

        </div>
    );
};

export default CompaniesPage;