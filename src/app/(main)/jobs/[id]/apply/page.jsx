// app/jobs/[id]/apply/page.jsx
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { Button } from '@heroui/react';
import React from 'react';
import Link from 'next/link';
import { getJobById } from '@/lib/api/jobs';
import JobApplyForm from './JobApplyForm';
import { getCompanyById } from '@/lib/api/companies';
import { getApplicationsByApplicant } from '@/lib/api/applications';

// Pricing configuration - easily replaceable with API call
const getPricingPlans = () => {
  return {
    free: {
      id: "free",
      name: "Free",
      price: 0,
      priceDisplay: "$0",
      billingPeriod: "forever",
      applicationsPerMonth: 3,
      maxSavedJobs: 10,
      features: [
        "Browse and save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile",
        "Email alerts"
      ],
      badge: null,
      popular: false
    },
    pro: {
      id: "pro",
      name: "Pro",
      price: 19,
      priceDisplay: "$19",
      billingPeriod: "month",
      applicationsPerMonth: 30,
      maxSavedJobs: "unlimited",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights"
      ],
      badge: "Most Popular",
      popular: true
    },
    premium: {
      id: "premium",
      name: "Premium",
      price: 39,
      priceDisplay: "$39",
      billingPeriod: "month",
      applicationsPerMonth: "unlimited",
      maxSavedJobs: "unlimited",
      features: [
        "Everything in Pro +",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support"
      ],
      badge: "Best Value",
      popular: false
    }
  };
};

// Function to get user's current plan (can be replaced with API call)
const getUserCurrentPlan = async (userId, applicationsCount) => {
  // This can be replaced with database query
  // For now, return free plan with usage data
  const plans = getPricingPlans();
  const currentPlanId = "free"; // This would come from user's subscription in DB
  
  const currentPlan = plans[currentPlanId];
  
  return {
    ...currentPlan,
    usedApplications: applicationsCount,
    remainingApplications: currentPlan.applicationsPerMonth === "unlimited" 
      ? "unlimited" 
      : Math.max(0, currentPlan.applicationsPerMonth - applicationsCount),
    usagePercentage: currentPlan.applicationsPerMonth === "unlimited"
      ? 0
      : (applicationsCount / currentPlan.applicationsPerMonth) * 100
  };
};

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    if (!user) {
        redirect(`/auth/login?redirect=/jobs/${id}/apply`);
    }

    const applications = await getApplicationsByApplicant(user.id);
    
    if (user.role !== "seeker") {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-w-md text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
                    <p className="text-gray-400 mb-6">Only job seekers can apply for positions. Please sign in with a job seeker account.</p>
                    <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white">
                        <Link href={`/auth/login?redirect=/jobs/${id}/apply`}>Login as Job Seeker</Link>
                    </Button>
                </div>
            </div>
        );
    }
    
    const job = await getJobById(id);
    if (!job) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Job Not Found</h2>
                    <p className="text-gray-400">The job you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/jobs">
                        <Button className="mt-4 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white">Browse Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const company = await getCompanyById(job.companyId);
    const currentPlan = await getUserCurrentPlan(user.id, applications.length);
    const allPlans = getPricingPlans();
    
    const hasReachedLimit = currentPlan.applicationsPerMonth !== "unlimited" && 
                           applications.length >= currentPlan.applicationsPerMonth;

    return (
        <>
            {!hasReachedLimit ? 
                <JobApplyForm 
                    job={job} 
                    user={user} 
                    company={company} 
                    applications={applications} 
                    currentPlan={currentPlan}
                    allPlans={allPlans}
                />
                : 
                <OutOfLimitPage 
                    currentPlan={currentPlan} 
                    allPlans={allPlans} 
                    applications={applications}
                    jobId={job._id}
                />
            }
        </>
    );
};

// Out of Limit Component
const OutOfLimitPage = ({ currentPlan, allPlans, applications, jobId }) => {
    return (
        <div className="pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-orange-500/10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-white">Application Limit Reached</h1>
                                <p className="text-gray-400 mt-1">
                                    You've used all {currentPlan.applicationsPerMonth} applications for this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Current Plan Status */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Current Plan: {currentPlan.name}</h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {applications.length} out of {currentPlan.applicationsPerMonth === "unlimited" ? "unlimited" : currentPlan.applicationsPerMonth} applications used this month
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-violet-400">
                                        {currentPlan.remainingApplications === "unlimited" ? "∞" : currentPlan.remainingApplications}
                                    </div>
                                    <div className="text-xs text-gray-500">remaining</div>
                                </div>
                            </div>
                            
                            {currentPlan.applicationsPerMonth !== "unlimited" && (
                                <>
                                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                                        <div 
                                            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${currentPlan.usagePercentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-500">
                                        Limit resets on the 1st of each month
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Pricing Plans */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Choose a Plan That Works for You</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.values(allPlans).map((plan) => (
                                    <PlanCard key={plan.id} plan={plan} isCurrentPlan={plan.id === currentPlan.id} />
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <Link href="/pricing" className="flex-1">
                                <Button className="w-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20">
                                    View All Plans & Pricing
                                </Button>
                            </Link>
                            <Link href="/jobs" className="flex-1">
                                <Button variant="bordered" className="w-full border-white/20 text-white hover:bg-white/5">
                                    Browse More Jobs
                                </Button>
                            </Link>
                            <Link href="/dashboard/applications" className="flex-1">
                                <Button variant="light" className="w-full text-gray-300 hover:text-white">
                                    View My Applications
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Plan Card Component
const PlanCard = ({ plan, isCurrentPlan }) => {
    return (
        <div className={`rounded-xl p-5 transition-all relative overflow-hidden ${
            plan.popular 
                ? 'border-2 border-violet-500 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10' 
                : 'border border-white/10 bg-white/5 hover:border-violet-500/30'
        }`}>
            {plan.badge && (
                <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        {plan.badge}
                    </div>
                </div>
            )}
            
            <div className="mb-4">
                <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.priceDisplay}</span>
                    {plan.billingPeriod !== "forever" && (
                        <span className="text-gray-400 text-sm">/{plan.billingPeriod}</span>
                    )}
                </div>
                {/* {plan.billingPeriod === "forever" && (
                    <p className="text-xs text-gray-500 mt-1">One-time payment</p>
                )} */}
            </div>
            
            <div className="mb-4">
                <div className="text-sm text-emerald-400 mb-2">
                    {plan.applicationsPerMonth === "unlimited" 
                        ? "♾️ Unlimited applications" 
                        : `📄 ${plan.applicationsPerMonth} applications/month`}
                </div>
                <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <svg className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                {plan.features.length > 3 && (
                    <p className="text-xs text-gray-500 mt-2">+{plan.features.length - 3} more features</p>
                )}
            </div>
            
            <Button 
                className={`w-full ${
                    isCurrentPlan 
                        ? 'bg-white/10 text-white border border-white/20 cursor-default' 
                        : 'bg-linear-to-r from-fuchsia-500 to-violet-600 text-white hover:scale-[1.02] transition-all'
                }`}
                disabled={isCurrentPlan}
            >
                {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
        </div>
    );
};

export default ApplyPage;