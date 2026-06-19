// app/dashboard/seeker/history/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import HistoryClient from './HistoryClient';

async function getHistoryData() {
  try {
    // Get the current user session
    const user = await getUserSession();
    
    if (!user?.id) {
      return {
        applications: [],
        stats: {}
      };
    }

    // Fetch all data in parallel
    const [applications, jobs, companies] = await Promise.all([
      getApplications(),
      getJobs(),
      getCompanies()
    ]);

    // Filter applications for this user
    const userApplications = applications?.filter(app => 
      app.applicantId === user.id
    ) || [];

    // Enrich applications with job and company details
    const enrichedApplications = userApplications.map(app => {
      const job = jobs?.find(j => j._id === app.JobId);
      const company = companies?.find(c => c._id === job?.companyId);
      
      return {
        ...app,
        jobTitle: app.jobTitle || job?.title || 'Unknown Position',
        companyName: company?.name || 'Unknown Company',
        companyLogo: company?.logo || '',
        companyLocation: company?.location || '',
        jobType: job?.type || 'N/A',
        jobLocation: job?.location || 'N/A',
        salaryMin: job?.salaryMin || app?.salaryMin || '',
        salaryMax: job?.salaryMax || app?.salaryMax || '',
        currency: job?.currency || app?.currency || 'USD',
      };
    });

    // Calculate stats
    const stats = {
      total: enrichedApplications.length,
      pending: enrichedApplications.filter(a => a.status?.toLowerCase() === 'pending' || a.status?.toLowerCase() === 'applied').length,
      reviewing: enrichedApplications.filter(a => a.status?.toLowerCase() === 'reviewing').length,
      shortlisted: enrichedApplications.filter(a => a.status?.toLowerCase() === 'shortlisted').length,
      interview: enrichedApplications.filter(a => a.status?.toLowerCase() === 'interview').length,
      rejected: enrichedApplications.filter(a => a.status?.toLowerCase() === 'rejected').length,
      hired: enrichedApplications.filter(a => a.status?.toLowerCase() === 'hired').length,
    };

    // Sort by most recent
    const sortedApplications = enrichedApplications.sort((a, b) => 
      new Date(b.appliedAt) - new Date(a.appliedAt)
    );

    return {
      applications: sortedApplications,
      stats
    };
  } catch (error) {
    console.error("Error fetching history data:", error);
    return {
      applications: [],
      stats: {}
    };
  }
}

export default async function HistoryPage() {
  const data = await getHistoryData();
  
  return <HistoryClient 
    initialApplications={data.applications}
    initialStats={data.stats}
  />;
}