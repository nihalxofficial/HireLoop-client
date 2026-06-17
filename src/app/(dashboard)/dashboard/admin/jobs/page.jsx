// app/dashboard/admin/jobs/page.js
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import JobsClient from './JobsClient';

async function getJobsData() {
  try {
    // Get all jobs
    const jobs = await getJobs("");
    
    if (!jobs || jobs.length === 0) {
      return [];
    }

    // Get all companies for company details
    const companies = await getCompanies("");
    
    // Create a map for quick company lookup
    const companyMap = {};
    companies.forEach(company => {
      companyMap[company._id] = company;
    });

    // Enrich jobs with company details
    const enrichedJobs = jobs.map(job => {
      const company = companyMap[job.companyId];
      return {
        ...job,
        companyName: company?.name || "Unknown Company",
        companyLogo: company?.logo || "",
        companyIndustry: company?.industry || "",
        companyLocation: company?.location || "",
      };
    });

    return enrichedJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export default async function AllJobsPage() {
  const jobs = await getJobsData();
  
  return <JobsClient initialJobs={jobs} />;
}