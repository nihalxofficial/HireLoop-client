"use server"

import { serverMutation } from "../core/server"

export const addJob = async(jobData)=>{
    return serverMutation("/jobs", jobData)
}

export const updateJobStatus = async(id, jobData, )=>{
    return serverMutation(`/jobs/${id}`, jobData, "PATCH")
}
export const deleteJob = async()=>{
    pass
}
export const duplicateJob = async()=>{
    pass
}