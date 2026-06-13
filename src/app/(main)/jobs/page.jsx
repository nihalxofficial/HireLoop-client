import { getJobs } from '@/lib/api/jobs';
import React from 'react';
import JobClient from './jobClient';
import { getCompanies } from '@/lib/api/companies';

const AllJobsPage = async() => {
    const jobs = await getJobs();
    const companies = await getCompanies();
    return (
        <div>
            <JobClient initialJobs={jobs} companies={companies} />
        </div>
    );
};

export default AllJobsPage;