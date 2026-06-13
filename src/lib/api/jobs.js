import { serverFetch } from "../core/server";



export const getJobs = async (status = "active") => {
    return serverFetch(`/jobs?status=${status}`);
};

export const getCompanyJobs = async(companyID, status="active")=>{
    return serverFetch(`/jobs?companyId=${companyID}&status=${status}`)
}

export const getRecruiterJobs = async(recruiterID)=>{
    return serverFetch(`/jobs?recruiterId=${recruiterID}`)
}