const Api = process.env.NEXT_PUBLIC_API;


export const getCompanies = async()=>{
    const res = await fetch(`${Api}/my/companies`);
    const data = await res.json();
    return data;
}