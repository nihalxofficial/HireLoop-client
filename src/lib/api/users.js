import { serverFetch } from "../core/server"

export const getUsers= async()=>{
    return serverFetch(`/users`)
}
export const getUserByUserId = async(userId)=>{
    return serverFetch(`/users/${userId}`)
}