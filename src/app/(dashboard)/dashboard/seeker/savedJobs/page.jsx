// app/dashboard/seeker/saved/page.js
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import SavedJobsClient from './SavedJobsClient';

// Configuration - Set this to true when you have real saved jobs API
const USE_REAL_SAVED_JOBS = false; // Change to true when ready

async function getSavedJobsData() {
  try {
    const user = await getUserSession();
    
    if (!user?.id) {
      return [];
    }

    // Fetch all jobs
    const allJobs = await getJobs();
    
    if (!allJobs || allJobs.length === 0) {
      return [];
    }

    // Fetch companies
    const companies = await getCompanies();
    
    // Create company map for quick lookup
    const companyMap = {};
    companies.forEach(company => {
      companyMap[company._id] = company;
    });

    let savedJobIds = [];

    if (USE_REAL_SAVED_JOBS) {
      // Use real saved jobs from API
      try {
        // const savedJobsData = await getSavedJobs(user.id);
        // savedJobIds = savedJobsData.map(job => job.jobId || job._id);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        savedJobIds = [];
      }
    } else {
      // Use mock saved jobs (for demo - you can modify this)
      // This will randomly save some jobs
      savedJobIds = allJobs
        .filter((_, index) => index % 2 === 0) // Save every other job
        .map(job => job._id);
    }

    // Enrich jobs with company details and saved status
    const enrichedJobs = allJobs.map(job => {
      const company = companyMap[job.companyId];
      return {
        ...job,
        companyName: company?.name || "Unknown Company",
        companyLogo: company?.logo || "",
        companyLocation: company?.location || "",
        companyIndustry: company?.industry || "",
        companyDescription: company?.description || "",
        companyWebsite: company?.website || "",
        companyEmployeeCount: company?.employeeCount || "",
        // Check if job is saved
        isSaved: savedJobIds.includes(job._id),
      };
    });

    // If using mock data, filter to only show saved jobs
    // When using real data, all jobs are shown but with isSaved flag
    if (USE_REAL_SAVED_JOBS) {
      return enrichedJobs.filter(job => job.isSaved);
    } else {
      // For demo, show all jobs with saved status
      return enrichedJobs;
    }
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return [];
  }
}

export default async function SavedJobsPage() {
  const savedJobs = await getSavedJobsData();
  
  return <SavedJobsClient initialSavedJobs={savedJobs} />;
}