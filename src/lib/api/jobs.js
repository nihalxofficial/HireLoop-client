import { serverFetch } from "../core/server";

const Api = process.env.NEXT_PUBLIC_API;


export const getCompanyJobs = async(companyID, status="active")=>{
    return serverFetch(`${Api}/jobs?companyId=${companyID}&status=${status}`)
}

export const getRecruiterJobs = async(recruiterID)=>{
    return serverFetch(`${Api}/jobs?recruiterId=${recruiterID}`)
}