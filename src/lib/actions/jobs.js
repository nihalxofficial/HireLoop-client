"use server"

const Api = process.env.NEXT_PUBLIC_API;

export const addJob = async(jobData)=>{
    const res = await fetch(`${Api}/jobs`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(jobData)
    })
    const data = await res.json();
    return data;
}