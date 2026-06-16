import { serverFetch } from "../core/server"

export const getSeekerPlans = async()=>{
    return serverFetch("/pricing/seeker")
}

export const getRecruiterPlans = async()=>{
    return serverFetch("/pricing/recruiter")
}

// export const getFaqItems = async()=>{
//     return serverFetch("/pricing/faq")
// }