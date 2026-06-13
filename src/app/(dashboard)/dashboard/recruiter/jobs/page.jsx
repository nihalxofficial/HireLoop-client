import React from 'react';
import RecruiterJobsClient from './RecruiterJobsClient';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterJobs } from '@/lib/api/jobs';
import { getRecruiterCompanies } from '@/lib/api/companies';

const RecruiterJobsPage = async() => {
    const user = await getUserSession()
    const companies = await  getRecruiterCompanies(user?.id)
    const jobs = await getRecruiterJobs(user?.id)
    console.log("Jobs",jobs);
    console.log("companies",companies);

    return (
        <div>
            <RecruiterJobsClient recruiterCompanies={companies} recruiterJobs={jobs} />
        </div>
    );
};

export default RecruiterJobsPage;