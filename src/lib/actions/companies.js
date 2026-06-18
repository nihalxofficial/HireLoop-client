"use server"

import { serverMutation } from "../core/server";

const Api = process.env.NEXT_PUBLIC_API;

export const addCompany = async(companyData)=>{
    return serverMutation("/companies", companyData) 
}

export const updateCompany = async(id, companyData)=>{
    return serverMutation(`/companies/${id}`, companyData, "PATCH");
}
export const deleteCompany = async( id)=>{
    const res = await fetch(`${Api}/companies/${id}`,{
        method: "DELETE",
    })
    const data = await res.json();
    return data;
}