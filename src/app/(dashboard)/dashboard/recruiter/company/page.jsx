import React from 'react';
import { CompaniesPageClient } from './CompaniesPageClient';
import { authClient } from '@/lib/auth-client';
import { getUserSession } from '@/lib/core/session';

const CompaniesPage = async() => {
    const user = await getUserSession()

    return (
        <div>
            <CompaniesPageClient recruiter={user} />
        </div>
    );
};

export default CompaniesPage;