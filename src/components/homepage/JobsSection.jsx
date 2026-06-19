"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import {
  ArrowUpRight,
  MapPin,
  BriefcaseBusiness,
  CircleDollarSign,
  Building2,
  Clock,
  Loader2,
  Calendar,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import Link from "next/link";
import Image from "next/image";

// Helper function to format salary
const formatSalary = (min, max, currency) => {
  if (!min && !max) return "Not specified";
  const symbol = currency?.toUpperCase() === 'BDT' ? '৳' : '$';
  if (min && max) {
    return `${symbol}${parseInt(min).toLocaleString()} - ${symbol}${parseInt(max).toLocaleString()}`;
  }
  if (min) return `${symbol}${parseInt(min).toLocaleString()}`;
  if (max) return `${symbol}${parseInt(max).toLocaleString()}`;
  return "Not specified";
};

// Helper function to format relative date
const formatRelativeDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 172800000) return "Yesterday";
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  if (diff < 2592000000) return `${Math.floor(diff / 604800000)}w ago`;
  return "Long ago";
};

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "C";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get type color
const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'full-time':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'part-time':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'contract':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'internship':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
    case 'hybrid':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export default function JobsSection() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const [jobsData, companiesData] = await Promise.all([
          getJobs(),
          getCompanies()
        ]);

        setCompanies(companiesData || []);

        const activeJobs = jobsData?.filter(job => 
          job.status?.toLowerCase() === 'active'
        ) || [];

        const firstSixJobs = activeJobs.slice(0, 6);

        const enrichedJobs = firstSixJobs.map(job => {
          const company = companiesData?.find(c => c._id === job.companyId);
          return {
            ...job,
            companyName: company?.name || 'Unknown Company',
            companyLogo: company?.logo || '',
            companyLocation: company?.location || '',
          };
        });

        setJobs(enrichedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Fallback mock data
        setJobs([
          {
            title: "Senior Frontend Developer",
            description: "Build responsive web applications with React and Next.js. Join a fast-growing tech team.",
            location: "San Francisco, CA",
            type: "Full-time",
            salaryMin: "120000",
            salaryMax: "160000",
            currency: "USD",
            companyName: "TechCorp",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "1",
            isRemote: false,
            category: "Technology"
          },
          {
            title: "Full Stack Engineer",
            description: "Work on both frontend and backend systems. Experience with Node.js and React required.",
            location: "New York, NY",
            type: "Hybrid",
            salaryMin: "130000",
            salaryMax: "170000",
            currency: "USD",
            companyName: "InnovateLabs",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "2",
            isRemote: false,
            category: "Technology"
          },
          {
            title: "UI/UX Designer",
            description: "Create beautiful and intuitive user interfaces. Strong portfolio in product design.",
            location: "Remote",
            type: "Full-time",
            salaryMin: "90000",
            salaryMax: "130000",
            currency: "USD",
            companyName: "CreativeMinds",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "3",
            isRemote: true,
            category: "Design"
          },
          {
            title: "DevOps Engineer",
            description: "Manage cloud infrastructure and CI/CD pipelines. AWS and Kubernetes experience needed.",
            location: "Seattle, WA",
            type: "Full-time",
            salaryMin: "140000",
            salaryMax: "180000",
            currency: "USD",
            companyName: "CloudNine",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "4",
            isRemote: false,
            category: "Engineering"
          },
          {
            title: "Product Manager",
            description: "Lead product development and work with cross-functional teams. Strong strategic thinking.",
            location: "Austin, TX",
            type: "Hybrid",
            salaryMin: "150000",
            salaryMax: "190000",
            currency: "USD",
            companyName: "DataStream",
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "5",
            isRemote: false,
            category: "Management"
          },
          {
            title: "Mobile Developer",
            description: "Build iOS and Android apps using React Native. Experience with mobile development.",
            location: "Remote",
            type: "Full-time",
            salaryMin: "110000",
            salaryMax: "150000",
            currency: "USD",
            companyName: "AppWorks",
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            _id: "6",
            isRemote: true,
            category: "Technology"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#050816] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 size={48} className="text-violet-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading jobs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050816] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
            Smart Job Discovery
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          The roles you&apos;d never
          <br />
          find by searching
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-gray-400">
          Discover curated opportunities that match your skills and career aspirations
        </p>

        {/* Cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div
                key={job._id || index}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Featured Badge for first job */}
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-[10px] font-medium shadow-lg shadow-violet-500/30">
                    <Sparkles size={10} className="inline mr-1" />
                    Featured
                  </div>
                )}

                {/* Remote Badge - Moved to top-right */}
                {job.isRemote && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-medium text-emerald-400 shadow-lg shadow-emerald-500/10">
                    <svg className="inline w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Remote
                  </div>
                )}

                {/* Company Logo & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    {job.companyLogo ? (
                      <Image
                        width={48}
                        height={48}
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/30"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const div = document.createElement('div');
                          div.className = 'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-sm font-semibold ring-2 ring-violet-500/30';
                          div.textContent = getInitials(job.companyName);
                          parent.appendChild(div);
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-sm font-semibold ring-2 ring-violet-500/30">
                        {getInitials(job.companyName)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors truncate">
                      {job.title || "Unknown Position"}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{job.companyName}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-gray-400 line-clamp-2">
                  {job.description || job.responsibilities || "Exciting opportunity to join our team and make an impact."}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    <MapPin size={12} className="text-violet-400 flex-shrink-0" />
                    <span className="truncate max-w-[80px]">{job.location || job.companyLocation || "Remote"}</span>
                  </div>

                  <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${getTypeColor(job.type)}`}>
                    <BriefcaseBusiness size={12} className="flex-shrink-0" />
                    {job.type || "Full-time"}
                  </div>

                  {job.category && (
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      <Building2 size={12} className="text-violet-400 flex-shrink-0" />
                      {job.category}
                    </div>
                  )}
                </div>

                {/* Salary & Posted Date */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    <CircleDollarSign size={12} className="text-emerald-400 flex-shrink-0" />
                    <span className="font-medium">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    {formatRelativeDate(job.createdAt)}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link href={`/jobs/${job._id}`}>
                    <button className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-all duration-300 group-hover:gap-2">
                      View Details
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp size={12} className="text-emerald-400" />
                    <span>Quick Apply</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <BriefcaseBusiness size={48} className="text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No active jobs available</p>
              <p className="text-sm text-gray-500">Check back later for new opportunities</p>
            </div>
          )}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 flex justify-center">
          <Link href="/jobs">
            <Button className="h-11 cursor-pointer rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105">
              View all job openings
              <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}