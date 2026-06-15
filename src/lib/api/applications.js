import { serverFetch } from "../core/server"

export const getApplicationsByApplicant = async(applicantId)=>{
    return serverFetch(`/applications?applicantId=${applicantId}`)
}