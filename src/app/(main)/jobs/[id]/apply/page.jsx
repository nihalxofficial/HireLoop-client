import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { Button } from '@heroui/react';
import React from 'react';
import Link from 'next/link';
import { getJobById } from '@/lib/api/jobs';
import JobApplyForm from './JobApplyForm';
import { getCompanyById } from '@/lib/api/companies';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    
    if (!user) {
        redirect(`/auth/login?redirect=/jobs/${id}/apply`);
    }
    
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
    const company = await getCompanyById(job.companyId)
    
    if (!job) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Job Not Found</h2>
                    <p className="text-gray-400">The job you're looking for doesn't exist.</p>
                    <Link href="/jobs">
                        <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white">Browse Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return <JobApplyForm job={job} user={user} company={company} />;
};

export default ApplyPage;