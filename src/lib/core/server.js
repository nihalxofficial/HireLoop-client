const Api = process.env.NEXT_PUBLIC_API;

export const serverFetch = async(path)=>{
    const res = await fetch(`${Api}${path}`);
    const data = await res.json();
    return data;
}

export const serverMutation = async(path, data)=>{
    const res = await fetch(`${Api}${path}`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}