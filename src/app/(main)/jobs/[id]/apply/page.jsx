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
import { getSeekerPlanById } from '@/lib/api/plans';
import { getSeekerPlans } from '@/lib/api/pricings';

// ─── Helper Functions ───────────────────────────────────────────────────────────

const hasUserAppliedForJob = (applications, jobId) => {
    return applications.some(app => app.JobId === jobId || app.jobId === jobId);
};

// ─── Components ─────────────────────────────────────────────────────────────────

const AccessDenied = ({ jobId }) => (
    <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">Only job seekers can apply for positions. Please sign in with a job seeker account.</p>
            <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                <Link href={`/auth/login?redirect=/jobs/${jobId}/apply`}>Login as Job Seeker</Link>
            </Button>
        </div>
    </div>
);

const JobNotFound = () => (
    <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Job Not Found</h2>
            <p className="text-gray-400">The job you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/jobs">
                <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">Browse Jobs</Button>
            </Link>
        </div>
    </div>
);

const AlreadyAppliedPage = ({ job }) => (
    <div className="pt-20 pb-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Already Applied</h1>
                            <p className="text-gray-400 mt-1">You have already submitted an application for this position</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="text-center py-6">
                        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-400 mb-6">
                            You&apos;ve already submitted an application for this job position.
                            You can check the status of your application in your dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">
                                <Link href={`/jobs/${job._id}`}>View Job Details</Link>
                            </Button>
                            <Button variant="bordered" className="border-white/20 text-white hover:bg-white/5">
                                <Link href="/dashboard/applications">View My Applications</Link>
                            </Button>
                            <Button variant="light" className="text-gray-300 hover:text-white">
                                <Link href="/jobs">Browse Other Jobs</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            What&apos;s Next?
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2"><span className="text-violet-400">•</span>The employer will review your application</li>
                            <li className="flex items-start gap-2"><span className="text-violet-400">•</span>You&apos;ll receive notifications when your application status changes</li>
                            <li className="flex items-start gap-2"><span className="text-violet-400">•</span>Check your dashboard regularly for updates</li>
                            <li className="flex items-start gap-2"><span className="text-violet-400">•</span>Keep your profile updated to increase your chances</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const PlanCard = ({ plan, isCurrentPlan }) => {
    const maxApps = plan.maxApplicationsPerMonth || 3;
    
    return (
        <div className={`rounded-xl p-5 transition-all relative overflow-hidden ${
            plan.popular
                ? 'border-2 border-violet-500 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10'
                : 'border border-white/10 bg-white/5 hover:border-violet-500/30'
        }`}>
            {plan.popular && (
                <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        Most Popular
                    </div>
                </div>
            )}
            <div className="mb-4">
                <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.price === 0 ? "Free" : `৳${plan.price}`}</span>
                    {plan.interval !== "forever" && (
                        <span className="text-gray-400 text-sm">/{plan.interval}</span>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <div className="text-sm text-emerald-400 mb-2">
                    {maxApps === -1
                        ? "♾️ Unlimited applications"
                        : `📄 ${maxApps} applications/month`}
                </div>
                <ul className="space-y-2">
                    {plan.features?.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <svg className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                {plan.features?.length > 3 && (
                    <p className="text-xs text-gray-500 mt-2">+{plan.features.length - 3} more features</p>
                )}
            </div>
            <Button
                className={`w-full ${
                    isCurrentPlan
                        ? 'bg-white/10 text-white border border-white/20 cursor-default'
                        : 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:scale-[1.02] transition-all'
                }`}
                disabled={isCurrentPlan}
            >
                {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
        </div>
    );
};

const OutOfLimitPage = ({ currentPlan, allPlans, applications }) => {
    const maxApps = currentPlan.maxApplicationsPerMonth || 3;
    const usedApps = applications.length;
    const remaining = maxApps === -1 ? "unlimited" : maxApps - usedApps;
    const usagePercentage = maxApps === -1 ? 0 : (usedApps / maxApps) * 100;
    
    return (
        <div className="pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
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
                                    You&apos;ve used all {maxApps === -1 ? "unlimited" : maxApps} applications for this month
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Current Plan: {currentPlan.name}</h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {usedApps} out of {maxApps === -1 ? "unlimited" : maxApps} applications used this month
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-violet-400">{remaining === "unlimited" ? "∞" : remaining}</div>
                                    <div className="text-xs text-gray-500">remaining</div>
                                </div>
                            </div>
                            {maxApps !== -1 && (
                                <>
                                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                                        <div className="bg-gradient-to-r from-fuchsia-500 to-violet-600 h-2 rounded-full transition-all duration-500" style={{ width: `${usagePercentage}%` }} />
                                    </div>
                                    <p className="text-xs text-center text-gray-500">Limit resets on the 1st of each month</p>
                                </>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Choose a Plan That Works for You</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {allPlans.map((plan) => (
                                    <PlanCard key={plan.name} plan={plan} isCurrentPlan={plan.name.toLowerCase() === currentPlan.name.toLowerCase()} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20">
                                <Link href="/pricing">View All Plans & Pricing</Link>
                            </Button>
                            <Button variant="bordered" className="w-full border-white/20 text-white hover:bg-white/5">
                                <Link href="/jobs">Browse More Jobs</Link>
                            </Button>
                            <Button variant="light" className="w-full text-gray-300 hover:text-white">
                                <Link href="/dashboard/applications">View My Applications</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page ──────────────────────────────────────────────────────────────────

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    
    if (!user) {
        redirect(`/auth/login?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== "seeker") {
        return <AccessDenied jobId={id} />;
    }

    const job = await getJobById(id);
    if (!job) {
        return <JobNotFound />;
    }

    const applications = await getApplicationsByApplicant(user.id);
    
    // Check if already applied
    if (hasUserAppliedForJob(applications, id)) {
        return <AlreadyAppliedPage job={job} />;
    }

    // Get company details
    const company = await getCompanyById(job.companyId);
    
    // Get user's plan from database (has maxApplicationsPerMonth)
    const userPlan = await getSeekerPlanById(user?.plan || "free");
    
    // Get all pricing plans from API (with features and limits)
    const allPlans = await getSeekerPlans();
    
    // Find current plan from pricing data
    const currentPlan = allPlans.find(p => p.name.toLowerCase() === userPlan?.name?.toLowerCase()) || allPlans[0];
    
    // Get max applications from user's plan
    const maxApps = userPlan?.maxApplicationsPerMonth || 3;
    const hasReachedLimit = maxApps !== -1 && applications.length >= maxApps;

    if (hasReachedLimit) {
        return <OutOfLimitPage currentPlan={currentPlan} allPlans={allPlans} applications={applications} />;
    }

    return (
        <JobApplyForm
            job={job}
            user={user}
            company={company}
            applications={applications}
            currentPlan={currentPlan}
            allPlans={allPlans}
        />
    );
};

export default ApplyPage;