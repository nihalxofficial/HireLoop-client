import { serverFetch } from "../core/server";

export const getCompanies = async(status="approved")=>{
    return serverFetch(`/companies?status=${status}`)
} 

export const getCompanyById = async(id, status="approved")=>{
    return serverFetch(`/company/${id}`)
} 

export const getRecruiterCompanies = async(recruiterId)=>{
    return serverFetch(`/my/companies?recruiterId=${recruiterId}`)
} 