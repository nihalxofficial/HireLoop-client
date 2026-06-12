import React from 'react';
import RecruiterJobsClient from './RecruiterJobsClient';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterJobs } from '@/lib/api/jobs';

const RecruiterJobsPage = async() => {
    const user = await getUserSession()
    const companies = await  getRecruiterCompanies(user?.id)
    const jobs = await getRecruiterJobs(user?.id)

    return (
        <div>
            <RecruiterJobsClient recruiterCompanies={companies} recruiterJobs={jobs} />
        </div>
    );
};

export default RecruiterJobsPage;