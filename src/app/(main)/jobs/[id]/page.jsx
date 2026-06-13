import React from 'react';
import { getCompanies } from '@/lib/api/companies';
import { getJobById } from '@/lib/api/jobs';
import JobDetailsClient from './jobDetailsClient';

const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);
    const companies = await getCompanies();
    
    return (
        <JobDetailsClient job={job} companies={companies} />
    );
};

export default JobDetailsPage;