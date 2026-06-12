"use server"

import { serverMutation } from "../core/server"

export const addJob = async(jobData)=>{
    return serverMutation("/jobs", jobData)
}