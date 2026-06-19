// app/dashboard/recruiter/saved/page.js
import { getJobs } from '@/lib/api/jobs';
import { getCompanyById } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import SavedJobsClient from './SavedJobsClient';

async function getSavedJobsData() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return {
        savedJobs: [],
        stats: {}
      };
    }

    // Fetch all jobs
    const allJobs = await getJobs();
    
    if (!allJobs || allJobs.length === 0) {
      return {
        savedJobs: [],
        stats: {}
      };
    }

    // For demo purposes, randomly mark some jobs as saved
    // In production, you would fetch saved jobs from a database
    const savedJobIds = allJobs
      .filter((_, index) => index % 3 === 0) // Every 3rd job is "saved"
      .map(job => job._id);

    // Fetch company details for each saved job
    const savedJobsWithCompany = await Promise.all(
      allJobs
        .filter(job => savedJobIds.includes(job._id))
        .map(async (job) => {
          let companyDetails = null;
          if (job.companyId) {
            try {
              companyDetails = await getCompanyById(job.companyId);
            } catch (error) {
              console.error(`Failed to fetch company ${job.companyId}:`, error);
            }
          }

          return {
            ...job,
            savedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            isSaved: true,
            companyName: companyDetails?.name || 'Unknown Company',
            companyLogo: companyDetails?.logo || '',
            companyIndustry: companyDetails?.industry || '',
            companyLocation: companyDetails?.location || '',
          };
        })
    );

    // Stats
    const stats = {
      total: savedJobsWithCompany.length,
      active: savedJobsWithCompany.filter(j => j.status?.toLowerCase() === 'active').length,
      pending: savedJobsWithCompany.filter(j => j.status?.toLowerCase() === 'pending').length,
      closed: savedJobsWithCompany.filter(j => j.status?.toLowerCase() === 'closed').length,
    };

    return {
      savedJobs: savedJobsWithCompany,
      stats
    };
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return {
      savedJobs: [],
      stats: {}
    };
  }
}

export default async function SavedJobsPage() {
  const data = await getSavedJobsData();
  
  return <SavedJobsClient 
    initialSavedJobs={data.savedJobs}
    initialStats={data.stats}
  />;
}