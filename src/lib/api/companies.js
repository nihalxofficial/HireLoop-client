import { serverFetch } from "../core/server";

export const getRecruiterCompanies = async(recruiterId)=>{
    return serverFetch(`/my/companies?recruiterId=${recruiterId}`)
} 