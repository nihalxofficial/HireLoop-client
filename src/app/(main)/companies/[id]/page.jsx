// app/companies/[id]/page.jsx (Server Component)
import { getCompanyById } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import CompanyClient from './companyClient';
import { getCompanyJobs } from '@/lib/api/jobs';

const CompanyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    const company = await getCompanyById(id);
    const companyJobs = await getCompanyJobs(id);
    
    return (
        <CompanyClient initialCompany={company} currentUser={user} companyJobs={companyJobs} />
    );
};

export default CompanyPage;