import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async({params}) => {
    const {id} = await params;
    const user = await getUserSession();
    console.log(user);
    if(!user){
        redirect(`/auth/login?redirect=/jobs/${id}/apply`)
    }
    return (
        <div>
            Apply this job here
        </div>
    );
};

export default ApplyPage;