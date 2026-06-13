import { getJobs } from '@/lib/api/jobs';
import React from 'react';
import JobClient from './jobClent';

const AllJobsPage = async() => {
    const jobs = await getJobs();
    return (
        <div>
            <JobClient initialJobs={jobs}/>
        </div>
    );
};

export default AllJobsPage;