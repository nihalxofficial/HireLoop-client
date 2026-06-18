"use server"

import { serverMutation } from "../core/server";

const Api = process.env.NEXT_PUBLIC_API;

export const addCompany = async(jobData)=>{
    return serverMutation("/companies", jobData) 
}

export const updateCompany = async(id, jobData)=>{
    return serverMutation(`/companies/${id}`, jobData, "PATCH");
}
export const deleteCompany = async( id)=>{
    const res = await fetch(`${Api}/companies/${id}`,{
        method: "DELETE",
    })
    const data = await res.json();
    return data;
}