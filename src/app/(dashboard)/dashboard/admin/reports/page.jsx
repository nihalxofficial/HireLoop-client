// app/dashboard/admin/reports/page.js
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getApplications } from '@/lib/api/applications';
import ReportsClient from './ReportsClient';

async function getReportsData() {
  try {
    // Fetch all data in parallel
    const [users, jobs, companies, applications] = await Promise.all([
      getUsers(),
      getJobs(),
      getCompanies(),
      getApplications()
    ]);

    // Calculate comprehensive statistics
    const totalUsers = users?.length || 0;
    const totalJobs = jobs?.length || 0;
    const totalCompanies = companies?.length || 0;
    const totalApplications = applications?.length || 0;

    // User reports
    const seekers = users?.filter(u => u.role?.toLowerCase() === 'seeker').length || 0;
    const recruiters = users?.filter(u => u.role?.toLowerCase() === 'recruiter').length || 0;
    const admins = users?.filter(u => u.role?.toLowerCase() === 'admin').length || 0;
    
    // Verified users
    const verifiedUsers = users?.filter(u => u.emailVerified === true).length || 0;
    const unverifiedUsers = users?.filter(u => u.emailVerified === false).length || 0;

    // Job reports
    const activeJobs = jobs?.filter(j => j.status?.toLowerCase() === 'active').length || 0;
    const pendingJobs = jobs?.filter(j => j.status?.toLowerCase() === 'pending').length || 0;
    const closedJobs = jobs?.filter(j => j.status?.toLowerCase() === 'closed').length || 0;
    const draftJobs = jobs?.filter(j => j.status?.toLowerCase() === 'draft').length || 0;

    // Remote jobs
    const remoteJobs = jobs?.filter(j => j.isRemote === true).length || 0;
    const onSiteJobs = jobs?.filter(j => j.isRemote === false).length || 0;

    // Company reports
    const approvedCompanies = companies?.filter(c => c.status?.toLowerCase() === 'approved').length || 0;
    const pendingCompanies = companies?.filter(c => c.status?.toLowerCase() === 'pending').length || 0;
    const rejectedCompanies = companies?.filter(c => c.status?.toLowerCase() === 'rejected').length || 0;

    // Application reports
    const appliedApps = applications?.filter(a => a.status?.toLowerCase() === 'applied').length || 0;
    const reviewingApps = applications?.filter(a => a.status?.toLowerCase() === 'reviewing').length || 0;
    const shortlistedApps = applications?.filter(a => a.status?.toLowerCase() === 'shortlisted').length || 0;
    const interviewApps = applications?.filter(a => a.status?.toLowerCase() === 'interview').length || 0;
    const rejectedApps = applications?.filter(a => a.status?.toLowerCase() === 'rejected').length || 0;
    const hiredApps = applications?.filter(a => a.status?.toLowerCase() === 'hired').length || 0;

    // Job type distribution
    const fullTimeJobs = jobs?.filter(j => j.type?.toLowerCase() === 'full-time').length || 0;
    const partTimeJobs = jobs?.filter(j => j.type?.toLowerCase() === 'part-time').length || 0;
    const contractJobs = jobs?.filter(j => j.type?.toLowerCase() === 'contract').length || 0;
    const internshipJobs = jobs?.filter(j => j.type?.toLowerCase() === 'internship').length || 0;

    // Recent activities (last 20)
    const recentActivities = [];
    
    // Get recent users (last 5)
    const recentUsers = users?.slice(0, 5).map(u => ({
      type: 'user',
      action: 'joined',
      name: u.name || 'User',
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      id: u._id
    })) || [];
    
    // Get recent jobs (last 5)
    const recentJobs = jobs?.slice(0, 5).map(j => ({
      type: 'job',
      action: 'posted',
      title: j.title,
      company: j.companyName || 'Unknown',
      status: j.status,
      createdAt: j.createdAt,
      id: j._id
    })) || [];
    
    // Get recent applications (last 10)
    const recentApps = applications?.slice(0, 10).map(a => ({
      type: 'application',
      action: 'applied',
      jobTitle: a.jobTitle,
      applicant: a.fullName,
      status: a.status,
      appliedAt: a.appliedAt,
      id: a._id
    })) || [];
    
    // Combine and sort by date
    const allActivities = [...recentUsers, ...recentJobs, ...recentApps];
    const sortedActivities = allActivities.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.appliedAt || a.createdAt);
      const dateB = new Date(b.createdAt || b.appliedAt || b.createdAt);
      return dateB - dateA;
    }).slice(0, 20);

    // Monthly data for charts (last 12 months)
    const now = new Date();
    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      const usersThisMonth = users?.filter(u => {
        const date = new Date(u.createdAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
      const jobsThisMonth = jobs?.filter(j => {
        const date = new Date(j.createdAt);
        return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
      }).length || 0;
      
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

    // Daily activity (last 7 days)
    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('default', { weekday: 'short' });
      
      const usersThisDay = users?.filter(u => {
        const d = new Date(u.createdAt);
        return d.toDateString() === date.toDateString();
      }).length || 0;
      
      const jobsThisDay = jobs?.filter(j => {
        const d = new Date(j.createdAt);
        return d.toDateString() === date.toDateString();
      }).length || 0;
      
      dailyData.push({
        day: dateStr,
        users: usersThisDay,
        jobs: jobsThisDay
      });
    }

    // Top companies by job count
    const companyJobCount = {};
    jobs?.forEach(job => {
      const companyName = job.companyName || 'Unknown';
      companyJobCount[companyName] = (companyJobCount[companyName] || 0) + 1;
    });
    const topCompanies = Object.entries(companyJobCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top job categories
    const categoryCount = {};
    jobs?.forEach(job => {
      const category = job.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    const topCategories = Object.entries(categoryCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      overview: {
        totalUsers,
        totalJobs,
        totalCompanies,
        totalApplications,
        seekers,
        recruiters,
        admins,
        verifiedUsers,
        unverifiedUsers,
        activeJobs,
        pendingJobs,
        closedJobs,
        draftJobs,
        remoteJobs,
        onSiteJobs,
        approvedCompanies,
        pendingCompanies,
        rejectedCompanies,
        appliedApps,
        reviewingApps,
        shortlistedApps,
        interviewApps,
        rejectedApps,
        hiredApps,
        fullTimeJobs,
        partTimeJobs,
        contractJobs,
        internshipJobs
      },
      monthlyData,
      dailyData,
      topCompanies,
      topCategories,
      recentActivities: sortedActivities
    };
  } catch (error) {
    console.error("Error fetching reports data:", error);
    return {
      overview: {},
      monthlyData: [],
      dailyData: [],
      topCompanies: [],
      topCategories: [],
      recentActivities: []
    };
  }
}

export default async function ReportsPage() {
  const reportsData = await getReportsData();
  
  return <ReportsClient reportsData={reportsData} />;
}