import { revalidatePath } from "next/cache";

const Api = process.env.NEXT_PUBLIC_API;

export const serverMutation = async(path, data, id="")=>{
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