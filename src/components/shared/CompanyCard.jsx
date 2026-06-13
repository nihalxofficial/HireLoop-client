"use client";

import { useState } from "react";
import { MapPin, Users, Mail, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, BriefcaseBusiness, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

// ─── StatusBadge ───────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
    const badge = getStatusBadge(status);
    return (
        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${badge.color}`}>
            {badge.icon}
            {badge.label}
        </span>
    );
};

const CompanyCard = ({ company, onEdit, onDelete }) => {
    const [logoError, setLogoError] = useState(false);

    const logoSrc = logoError || !company.logo
        ? `https://ui-avatars.com/api/?background=7c3aed&color=fff&size=64&bold=true&name=${encodeURIComponent(company.name || "Co")}`
        : company.logo;

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
                    <button className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition-all hover:border-violet-500/50 hover:text-violet-400">
                        <Link href={`/companies/${company._id}`} className="flex items-center gap-1 justify-between">
                            <Eye size={14} />
                            View Details
                        </Link>
                    </button>
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

export default CompanyCard;