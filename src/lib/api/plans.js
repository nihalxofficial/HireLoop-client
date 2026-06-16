import { serverFetch } from "../core/server";

export const getSeekerPlanById = async (id, status = "active") => {
    return serverFetch(`/plan/seeker?planName=${id}`);
};

export const getRecruiterPlanById = async (id, status = "active") => {
    return serverFetch(`/plan/recruiter?planName=${id}`);
};