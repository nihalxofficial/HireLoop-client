import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const AllJobsPage = async() => {
    const jobs = await getJobs("");
    // console.log(jobs);
    return (
        <div>
            All jobs page
        </div>
    );
};

export default AllJobsPage;