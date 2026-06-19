// app/dashboard/recruiter/analytics/page.js
import { getJobs } from '@/lib/api/jobs';
import { getApplications } from '@/lib/api/applications';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import AnalyticsClient from './AnalyticsClient';

async function getRecruiterAnalytics() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return {
        overview: {},
        monthlyData: [],
        recentActivities: [],
        jobPerformance: [],
        applicationStats: {}
      };
    }

    // Fetch all jobs, applications, and companies
    const [allJobs, allApplications, companies] = await Promise.all([
      getJobs(),
      getApplications(),
      getCompanies()
    ]);

    // Filter jobs created by this recruiter
    const recruiterJobs = allJobs?.filter(job => job.recruiterId === recruiter.id) || [];
    const recruiterJobIds = recruiterJobs.map(job => job._id);

    // Filter applications for recruiter's jobs
    const recruiterApplications = allApplications?.filter(app => 
      recruiterJobIds.includes(app.JobId)
    ) || [];

    // Get company details for recruiter
    const recruiterCompany = companies?.find(c => c.recruiterId === recruiter.id);

    // Calculate job statistics
    const totalJobs = recruiterJobs.length;
    const activeJobs = recruiterJobs.filter(j => j.status?.toLowerCase() === 'active').length || 0;
    const pendingJobs = recruiterJobs.filter(j => j.status?.toLowerCase() === 'pending').length || 0;
    const closedJobs = recruiterJobs.filter(j => j.status?.toLowerCase() === 'closed').length || 0;
    const draftJobs = recruiterJobs.filter(j => j.status?.toLowerCase() === 'draft').length || 0;

    // Calculate application statistics
    const totalApplications = recruiterApplications.length;
    const appliedApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'applied').length || 0;
    const reviewingApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'reviewing').length || 0;
    const shortlistedApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'shortlisted').length || 0;
    const interviewApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'interview').length || 0;
    const rejectedApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'rejected').length || 0;
    const hiredApps = recruiterApplications.filter(a => a.status?.toLowerCase() === 'hired').length || 0;

    // Job performance (applications per job)
    const jobPerformance = recruiterJobs.map(job => ({
      title: job.title || 'Unknown',
      applications: recruiterApplications.filter(a => a.JobId === job._id).length,
      status: job.status,
      createdAt: job.createdAt
    })).sort((a, b) => b.applications - a.applications);

    // Monthly data for charts (last 6 months)
    const now = new Date();
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      // Jobs posted this month
      const jobsThisMonth = recruiterJobs.filter(j => {
        const date = new Date(j.createdAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      // Applications this month
      const appsThisMonth = recruiterApplications.filter(a => {
        const date = new Date(a.appliedAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      monthlyData.push({
        month: monthName,
        jobs: jobsThisMonth,
        applications: appsThisMonth
      });
    }

    // Recent activities
    const recentActivities = [];
    
    // Recent job posts
    const recentJobs = recruiterJobs.slice(0, 3).map(j => ({
      type: 'job',
      action: 'posted',
      title: j.title,
      status: j.status,
      createdAt: j.createdAt
    }));
    
    // Recent applications
    const recentApps = recruiterApplications.slice(0, 5).map(a => ({
      type: 'application',
      action: 'received',
      jobTitle: a.jobTitle,
      applicant: a.fullName,
      status: a.status,
      appliedAt: a.appliedAt
    }));
    
    // Combine and sort
    const allActivities = [...recentJobs, ...recentApps];
    const sortedActivities = allActivities.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.appliedAt);
      const dateB = new Date(b.createdAt || b.appliedAt);
      return dateB - dateA;
    }).slice(0, 10);

    // Application status breakdown for pie chart
    const appStatusData = [
      { name: 'Applied', value: appliedApps },
      { name: 'Reviewing', value: reviewingApps },
      { name: 'Shortlisted', value: shortlistedApps },
      { name: 'Interview', value: interviewApps },
      { name: 'Rejected', value: rejectedApps },
      { name: 'Hired', value: hiredApps },
    ].filter(item => item.value > 0);

    // Job status breakdown
    const jobStatusData = [
      { name: 'Active', value: activeJobs },
      { name: 'Pending', value: pendingJobs },
      { name: 'Closed', value: closedJobs },
      { name: 'Draft', value: draftJobs },
    ].filter(item => item.value > 0);

    // Calculate application rate (applications per job)
    const applicationRate = totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : 0;

    // Calculate hire rate
    const hireRate = totalApplications > 0 ? ((hiredApps / totalApplications) * 100).toFixed(1) : 0;

    // Interview conversion rate
    const interviewRate = totalApplications > 0 ? ((interviewApps / totalApplications) * 100).toFixed(1) : 0;

    return {
      overview: {
        totalJobs,
        activeJobs,
        pendingJobs,
        closedJobs,
        draftJobs,
        totalApplications,
        appliedApps,
        reviewingApps,
        shortlistedApps,
        interviewApps,
        rejectedApps,
        hiredApps,
        applicationRate: parseFloat(applicationRate),
        hireRate: parseFloat(hireRate),
        interviewRate: parseFloat(interviewRate),
        companyName: recruiterCompany?.name || 'Your Company'
      },
      monthlyData,
      jobPerformance,
      appStatusData,
      jobStatusData,
      recentActivities: sortedActivities
    };
  } catch (error) {
    console.error("Error fetching recruiter analytics:", error);
    return {
      overview: {},
      monthlyData: [],
      recentActivities: [],
      jobPerformance: [],
      appStatusData: [],
      jobStatusData: {}
    };
  }
}

export default async function AnalyticsPage() {
  const analyticsData = await getRecruiterAnalytics();
  
  return <AnalyticsClient analyticsData={analyticsData} />;
}