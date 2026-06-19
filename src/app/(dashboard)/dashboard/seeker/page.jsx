// app/dashboard/seeker/page.js
"use client";

import React, { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  Bookmark,
  Clock,
  CheckCircle,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  MapPin,
  DollarSign,
  Building2,
  Star,
  Calendar,
  Users,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getJobs } from '@/lib/api/jobs';
import { getApplications } from '@/lib/api/applications';
import { getCompanies } from '@/lib/api/companies';

const SeekerPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({
    jobsApplied: 0,
    savedJobs: 0,
    interviews: 0,
    offersReceived: 0,
  });
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // Fetch real data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [jobsData, applicationsData, companiesData] = await Promise.all([
          getJobs(),
          getApplications(),
          getCompanies()
        ]);

        setJobs(jobsData || []);
        setCompanies(companiesData || []);

        // Get applications for this user
        const userApplications = applicationsData?.filter(app => 
          app.applicantId === user?.id
        ) || [];
        setApplications(userApplications);

        // Calculate stats
        const jobsApplied = userApplications.length;
        const interviews = userApplications.filter(app => 
          app.status?.toLowerCase() === 'interview'
        ).length;
        const offersReceived = userApplications.filter(app => 
          app.status?.toLowerCase() === 'hired' || app.status?.toLowerCase() === 'shortlisted'
        ).length;
        
        // For demo, saved jobs count - in production, fetch from saved jobs API
        const savedJobs = 8;

        setStats({
          jobsApplied,
          savedJobs,
          interviews,
          offersReceived,
        });

        // Get recommended jobs (mock logic - show active jobs)
        const activeJobs = jobsData?.filter(j => j.status?.toLowerCase() === 'active') || [];
        const recommended = activeJobs.slice(0, 4).map(job => {
          const company = companiesData?.find(c => c._id === job.companyId);
          return {
            id: job._id,
            title: job.title || 'Unknown Position',
            company: company?.name || 'Unknown Company',
            location: job.location || 'Remote',
            salary: formatSalary(job.salaryMin, job.salaryMax, job.currency),
            type: job.type || 'Full-time',
            posted: formatRelativeDate(job.createdAt),
            logo: company?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company?.name || 'Company')}&background=8B5CF6&color=fff&size=64`,
            matchScore: Math.floor(Math.random() * 30) + 70, // Random match score 70-100
          };
        });
        setRecommendedJobs(recommended);

        // Get recent activities from applications
        const recent = userApplications
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
          .slice(0, 4)
          .map(app => {
            const job = jobsData?.find(j => j._id === app.JobId);
            const company = companiesData?.find(c => c._id === job?.companyId);
            return {
              id: app._id,
              jobTitle: app.jobTitle || 'Unknown Position',
              company: company?.name || 'Unknown Company',
              action: 'Applied',
              date: app.appliedAt,
              status: app.status || 'Pending',
              icon: <BriefcaseBusiness size={14} />,
            };
          });
        setRecentActivities(recent);

      } catch (error) {
        console.error("Error fetching seeker data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

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
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    if (diff < 172800000) return "Yesterday";
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
    if (diff < 2592000000) return `${Math.floor(diff / 604800000)} weeks ago`;
    if (diff < 31536000000) return `${Math.floor(diff / 2592000000)} months ago`;
    return "Over a year ago";
  };

  // Helper function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getActivityColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "text-blue-400 bg-blue-500/10";
      case "pending":
        return "text-yellow-400 bg-yellow-500/10";
      case "reviewing":
        return "text-cyan-400 bg-cyan-500/10";
      case "shortlisted":
        return "text-emerald-400 bg-emerald-500/10";
      case "interview":
        return "text-violet-400 bg-violet-500/10";
      case "rejected":
        return "text-red-400 bg-red-500/10";
      case "hired":
        return "text-green-400 bg-green-500/10";
      case "saved":
        return "text-fuchsia-400 bg-fuchsia-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "applied": return "Applied";
      case "pending": return "Pending";
      case "reviewing": return "Reviewing";
      case "shortlisted": return "Shortlisted";
      case "interview": return "Interview";
      case "rejected": return "Rejected";
      case "hired": return "Hired";
      default: return status || "N/A";
    }
  };

  // Stats data for job seeker
  const statsData = [
    {
      title: "Jobs Applied",
      value: stats.jobsApplied.toString(),
      icon: <BriefcaseBusiness size={20} />,
      change: "+8%",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Saved Jobs",
      value: stats.savedJobs.toString(),
      icon: <Bookmark size={20} />,
      change: "+3",
      bgColor: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
    },
    {
      title: "Interviews",
      value: stats.interviews.toString(),
      icon: <Clock size={20} />,
      change: "+2",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Offers Received",
      value: stats.offersReceived.toString(),
      icon: <CheckCircle size={20} />,
      change: "+1",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  // Top skills in demand (mock data for now)
  const topSkills = [
    { name: "React", demand: "+24%", bgColor: "bg-violet-500/10", textColor: "text-violet-400" },
    { name: "Node.js", demand: "+18%", bgColor: "bg-fuchsia-500/10", textColor: "text-fuchsia-400" },
    { name: "Python", demand: "+22%", bgColor: "bg-emerald-500/10", textColor: "text-emerald-400" },
    { name: "TypeScript", demand: "+31%", bgColor: "bg-orange-500/10", textColor: "text-orange-400" },
    { name: "AWS", demand: "+15%", bgColor: "bg-cyan-500/10", textColor: "text-cyan-400" },
  ];

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-violet-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-gray-300">
                Job Seeker Portal
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {greeting}, {user?.name || "Seeker"}! 🎯
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Your next career opportunity is waiting. Track your applications, 
              discover matching jobs, and stay ahead in your job search journey.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs text-gray-400">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">Active job search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {stat.change} this month
                </p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3 border border-white/10`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Jobs & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Recommended For You</h2>
                  <p className="text-sm text-gray-400 mt-1">Jobs matching your profile</p>
                </div>
                <Star size={18} className="text-violet-400" />
              </div>
            </div>
            
            {recommendedJobs.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl ring-2 ring-violet-500/30 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-gradient-to-r from-fuchsia-500/10 to-violet-600/10 px-2 py-1 rounded-full">
                            <Star size={10} className="text-yellow-400" />
                            <span className="text-xs font-medium text-white">{job.matchScore}% Match</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin size={12} className="text-violet-400" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <DollarSign size={12} className="text-emerald-400" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Building2 size={12} className="text-fuchsia-400" />
                            {job.type}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">{job.posted}</span>
                          <Link href={`/jobs/${job.id}`}>
                            <button className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-all group-hover:gap-2 cursor-pointer">
                              View Details
                              <ArrowUpRight size={14} />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BriefcaseBusiness size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No recommended jobs available</p>
                <p className="text-sm text-gray-500">Check back later for new opportunities</p>
              </div>
            )}
            
            <div className="p-5 border-t border-white/10">
              <Link href="/jobs">
                <button className="group flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 hover:gap-3 cursor-pointer">
                  View All Recommended Jobs
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Skills & Activity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Skills in Demand */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    Trending Skills
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Top Skills in Demand</h2>
              </div>
              <TrendingUp size={20} className="text-emerald-400" />
            </div>

            <div className="space-y-3">
              {topSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full ${skill.bgColor}`}>
                    <span className={`text-xs font-medium ${skill.textColor}`}>{skill.demand}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                    Latest Updates
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              </div>
              <Clock size={20} className="text-violet-400" />
            </div>

            {recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
                  >
                    <div className={`p-1.5 rounded-lg ${getActivityColor(activity.status)}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{activity.jobTitle}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getActivityColor(activity.status)}`}>
                          {getStatusLabel(activity.status)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Clock size={32} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No recent activity</p>
                <p className="text-xs text-gray-500">Start applying to jobs</p>
              </div>
            )}

            <Link href="/dashboard/seeker/applications">
              <button className="group mt-4 w-full flex items-center justify-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 pt-3 border-t border-white/10 cursor-pointer">
                View All Activity
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerPage;