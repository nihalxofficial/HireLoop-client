import React from 'react';
import { CompaniesPageClient } from './CompaniesPageClient';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompanies } from '@/lib/api/companies';

const CompaniesPage = async() => {
    const user = await getUserSession()
    const companies = await  getRecruiterCompanies(user?.id)
    return (
        <div>
            <CompaniesPageClient recruiter={user} recruiterCompanies={companies} />
        </div>
    );
};

export default CompaniesPage;