"use server"

import { serverMutation } from "../core/server";

const Api = process.env.NEXT_PUBLIC_API;

export const addCompany = async(jobData)=>{
    return serverMutation("/companies", jobData) 
}

export const editCompany = async(jobData, id)=>{
    const res = await fetch(`${Api}/companies/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(jobData)
    })
    const data = await res.json();
    return data;
}
export const deleteCompany = async( id)=>{
    const res = await fetch(`${Api}/companies/${id}`,{
        method: "DELETE",
    })
    const data = await res.json();
    return data;
}