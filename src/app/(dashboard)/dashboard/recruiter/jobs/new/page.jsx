import React from 'react';
import PostJobForm from './PostJobForm';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompanies } from '@/lib/api/companies';

const PostJobPage = async() => {
    const user = await getUserSession()
    const companies = await  getRecruiterCompanies(user?.id)
    return (
        <div>
            <PostJobForm companies={companies} recruiter={user} />
        </div>
    );
};

export default PostJobPage;