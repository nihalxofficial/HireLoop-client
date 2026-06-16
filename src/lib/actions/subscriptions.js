import { serverMutation } from "../core/server"

export const addSubscription = async(subsData)=>{
    return serverMutation("/subscriptions", subsData)
}