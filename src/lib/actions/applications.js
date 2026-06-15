"use server"

import { serverMutation } from "../core/server"

export const createApplication = async(data)=> {
    return serverMutation(`/applications`, data)
}