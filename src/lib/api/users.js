import { serverFetch } from "../core/server"

export const getUserByUserId = async(userId)=>{
    return serverFetch(`/applications/${userId}`)
}