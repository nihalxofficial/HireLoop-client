// app/companies/page.jsx (Server Component)
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import CompaniesClient from './companiesClient';

const CompaniesPage = async () => {
    const companies = await getCompanies();
    const user = await getUserSession();
    
    return (
        <CompaniesClient initialCompanies={companies || []} currentUser={user} />
    );
};

export default CompaniesPage;