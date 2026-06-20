import { serverFetch } from "../core/server"

export const getApplications = async()=>{
    return serverFetch(`/applications`,true)
}
export const getApplicationsByApplicant = async(applicantId)=>{
    return serverFetch(`/applications?applicantId=${applicantId}`, true)
}

export const getApplicationsByRecruiter = async(recruiterId)=>{
    return serverFetch(`/applications?recruiterId=${recruiterId}`, true)
}