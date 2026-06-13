import { serverFetch } from "../core/server";

export const getCompanies = async(status="approved")=>{
    return serverFetch(`/companies?status=${status}`)
} 

export const getRecruiterCompanies = async(recruiterId)=>{
    return serverFetch(`/my/companies?recruiterId=${recruiterId}`)
} 