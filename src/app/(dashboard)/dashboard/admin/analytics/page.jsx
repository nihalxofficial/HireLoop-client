// app/dashboard/admin/analytics/page.js
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import AnalyticsClient from './AnalyticsClient';
import { getApplications } from '@/lib/api/applications';

async function getAnalyticsData() {
  try {
    // Fetch all data in parallel
    const [users, jobs, companies, applications] = await Promise.all([
      getUsers(),
      getJobs(),
      getCompanies(),
      getApplications()
    ]);

    // Calculate statistics
    const totalUsers = users?.length || 0;
    const totalJobs = jobs?.length || 0;
    const totalCompanies = companies?.length || 0;
    const totalApplications = applications?.length || 0;

    // User role breakdown
    const seekers = users?.filter(u => u.role?.toLowerCase() === 'seeker').length || 0;
    const recruiters = users?.filter(u => u.role?.toLowerCase() === 'recruiter').length || 0;
    const admins = users?.filter(u => u.role?.toLowerCase() === 'admin').length || 0;

    // Job status breakdown
    const activeJobs = jobs?.filter(j => j.status?.toLowerCase() === 'active').length || 0;
    const pendingJobs = jobs?.filter(j => j.status?.toLowerCase() === 'pending').length || 0;
    const closedJobs = jobs?.filter(j => j.status?.toLowerCase() === 'closed').length || 0;
    const draftJobs = jobs?.filter(j => j.status?.toLowerCase() === 'draft').length || 0;

    // Company status breakdown
    const approvedCompanies = companies?.filter(c => c.status?.toLowerCase() === 'approved').length || 0;
    const pendingCompanies = companies?.filter(c => c.status?.toLowerCase() === 'pending').length || 0;
    const rejectedCompanies = companies?.filter(c => c.status?.toLowerCase() === 'rejected').length || 0;

    // Application status breakdown
    const appliedApps = applications?.filter(a => a.status?.toLowerCase() === 'applied').length || 0;
    const pendingApps = applications?.filter(a => a.status?.toLowerCase() === 'pending').length || 0;
    const reviewingApps = applications?.filter(a => a.status?.toLowerCase() === 'reviewing').length || 0;
    const shortlistedApps = applications?.filter(a => a.status?.toLowerCase() === 'shortlisted').length || 0;
    const interviewApps = applications?.filter(a => a.status?.toLowerCase() === 'interview').length || 0;
    const rejectedApps = applications?.filter(a => a.status?.toLowerCase() === 'rejected').length || 0;
    const hiredApps = applications?.filter(a => a.status?.toLowerCase() === 'hired').length || 0;

    // Monthly data for charts (last 6 months)
    const now = new Date();
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      // Count users joined this month
      const usersThisMonth = users?.filter(u => {
        const date = new Date(u.createdAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      // Count jobs posted this month
      const jobsThisMonth = jobs?.filter(j => {
        const date = new Date(j.createdAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      // Count applications this month
      const appsThisMonth = applications?.filter(a => {
        const date = new Date(a.appliedAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      monthlyData.push({
        month: monthName,
        users: usersThisMonth,
        jobs: jobsThisMonth,
        applications: appsThisMonth
      });
    }

    // Job type breakdown
    const fullTimeJobs = jobs?.filter(j => j.type?.toLowerCase() === 'full-time').length || 0;
    const partTimeJobs = jobs?.filter(j => j.type?.toLowerCase() === 'part-time').length || 0;
    const contractJobs = jobs?.filter(j => j.type?.toLowerCase() === 'contract').length || 0;
    const internshipJobs = jobs?.filter(j => j.type?.toLowerCase() === 'internship').length || 0;

    // Remote vs On-site
    const remoteJobs = jobs?.filter(j => j.isRemote === true).length || 0;
    const onSiteJobs = jobs?.filter(j => j.isRemote === false).length || 0;

    // Recent activity (last 10)
    const recentActivities = [];
    
    // Get recent users
    const recentUsers = users?.slice(0, 3).map(u => ({
      type: 'user',
      action: 'joined',
      name: u.name || 'User',
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    })) || [];
    
    // Get recent jobs
    const recentJobs = jobs?.slice(0, 3).map(j => ({
      type: 'job',
      action: 'posted',
      title: j.title,
      company: j.companyName || 'Unknown',
      createdAt: j.createdAt
    })) || [];
    
    // Get recent applications
    const recentApps = applications?.slice(0, 4).map(a => ({
      type: 'application',
      action: 'applied',
      jobTitle: a.jobTitle,
      applicant: a.fullName,
      status: a.status,
      appliedAt: a.appliedAt
    })) || [];
    
    // Combine and sort by date
    const allActivities = [...recentUsers, ...recentJobs, ...recentApps];
    const sortedActivities = allActivities.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.appliedAt || a.createdAt);
      const dateB = new Date(b.createdAt || b.appliedAt || b.createdAt);
      return dateB - dateA;
    }).slice(0, 10);

    return {
      overview: {
        totalUsers,
        totalJobs,
        totalCompanies,
        totalApplications,
        seekers,
        recruiters,
        admins,
        activeJobs,
        pendingJobs,
        closedJobs,
        draftJobs,
        approvedCompanies,
        pendingCompanies,
        rejectedCompanies,
        appliedApps,
        pendingApps,
        reviewingApps,
        shortlistedApps,
        interviewApps,
        rejectedApps,
        hiredApps,
        fullTimeJobs,
        partTimeJobs,
        contractJobs,
        internshipJobs,
        remoteJobs,
        onSiteJobs
      },
      monthlyData,
      recentActivities: sortedActivities
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      overview: {},
      monthlyData: [],
      recentActivities: []
    };
  }
}

export default async function AnalyticsPage() {
  const analyticsData = await getAnalyticsData();
  
  return <AnalyticsClient analyticsData={analyticsData} />;
}