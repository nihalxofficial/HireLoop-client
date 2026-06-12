"use server"

import { serverMutation } from "../core/server"

export const addJob = async(jobData)=>{
    return serverMutation("/jobs", jobData)
}

export const updateJobStatus = async()=>{
    pass
}
export const deleteJob = async()=>{
    pass
}
export const duplicateJob = async()=>{
    pass
}