const Api = process.env.NEXT_PUBLIC_API;


export const getCompanyJobs = async(companyID, status="active")=>{
    const res = await fetch(`${Api}/jobs?companyId=${companyID}&status=${status}`);
    const data = await res.json();
    return data;
}