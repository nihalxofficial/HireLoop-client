// app/dashboard/admin/database/page.js
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getApplications } from '@/lib/api/applications';
import DatabaseClient from './DatabaseClient';

async function getDatabaseData() {
  try {
    // Fetch all data in parallel
    const [users, jobs, companies, applications] = await Promise.all([
      getUsers(),
      getJobs(),
      getCompanies(),
      getApplications()
    ]);

    // Calculate database statistics
    const stats = {
      totalUsers: users?.length || 0,
      totalJobs: jobs?.length || 0,
      totalCompanies: companies?.length || 0,
      totalApplications: applications?.length || 0,
      activeUsers: users?.filter(u => u.status?.toLowerCase() === 'active').length || 0,
      inactiveUsers: users?.filter(u => u.status?.toLowerCase() === 'inactive').length || 0,
      suspendedUsers: users?.filter(u => u.status?.toLowerCase() === 'suspended').length || 0,
      verifiedUsers: users?.filter(u => u.emailVerified === true).length || 0,
      activeJobs: jobs?.filter(j => j.status?.toLowerCase() === 'active').length || 0,
      pendingJobs: jobs?.filter(j => j.status?.toLowerCase() === 'pending').length || 0,
      closedJobs: jobs?.filter(j => j.status?.toLowerCase() === 'closed').length || 0,
      draftJobs: jobs?.filter(j => j.status?.toLowerCase() === 'draft').length || 0,
      approvedCompanies: companies?.filter(c => c.status?.toLowerCase() === 'approved').length || 0,
      pendingCompanies: companies?.filter(c => c.status?.toLowerCase() === 'pending').length || 0,
      rejectedCompanies: companies?.filter(c => c.status?.toLowerCase() === 'rejected').length || 0,
      appliedApps: applications?.filter(a => a.status?.toLowerCase() === 'applied').length || 0,
      reviewingApps: applications?.filter(a => a.status?.toLowerCase() === 'reviewing').length || 0,
      shortlistedApps: applications?.filter(a => a.status?.toLowerCase() === 'shortlisted').length || 0,
      interviewApps: applications?.filter(a => a.status?.toLowerCase() === 'interview').length || 0,
      rejectedApps: applications?.filter(a => a.status?.toLowerCase() === 'rejected').length || 0,
      hiredApps: applications?.filter(a => a.status?.toLowerCase() === 'hired').length || 0,
    };

    // Database collections info
    const collections = [
      {
        name: 'Users',
        count: stats.totalUsers,
        icon: 'Users',
        color: 'text-violet-400',
        bgColor: 'bg-violet-500/10',
        fields: ['_id', 'name', 'email', 'role', 'status', 'createdAt', 'updatedAt']
      },
      {
        name: 'Jobs',
        count: stats.totalJobs,
        icon: 'BriefcaseBusiness',
        color: 'text-fuchsia-400',
        bgColor: 'bg-fuchsia-500/10',
        fields: ['_id', 'title', 'companyId', 'recruiterId', 'status', 'type', 'location', 'createdAt']
      },
      {
        name: 'Companies',
        count: stats.totalCompanies,
        icon: 'Building2',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        fields: ['_id', 'name', 'industry', 'location', 'status', 'recruiterId', 'createdAt']
      },
      {
        name: 'Applications',
        count: stats.totalApplications,
        icon: 'FileText',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        fields: ['_id', 'jobTitle', 'applicantId', 'companyId', 'recruiterId', 'status', 'appliedAt']
      },
    ];

    // Recent database activity (mock)
    const recentActivity = [
      {
        id: 1,
        collection: 'Users',
        action: 'INSERT',
        document: 'New user registered: John Doe',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        user: 'System'
      },
      {
        id: 2,
        collection: 'Jobs',
        action: 'UPDATE',
        document: 'Job status updated: Senior Developer',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: 'Admin'
      },
      {
        id: 3,
        collection: 'Applications',
        action: 'INSERT',
        document: 'New application submitted for Frontend position',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: 'System'
      },
      {
        id: 4,
        collection: 'Companies',
        action: 'UPDATE',
        document: 'Company profile updated: TechCorp',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        user: 'Recruiter'
      },
      {
        id: 5,
        collection: 'Users',
        action: 'DELETE',
        document: 'User account deleted: spam_user@email.com',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        user: 'Admin'
      },
      {
        id: 6,
        collection: 'Jobs',
        action: 'INSERT',
        document: 'New job posted: DevOps Engineer',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        user: 'Recruiter'
      },
    ];

    // Database health metrics (mock)
    const healthMetrics = {
      status: 'Healthy',
      uptime: '99.99%',
      responseTime: '24ms',
      activeConnections: 42,
      storageUsed: '65%',
      cacheHitRate: '87%',
      lastBackup: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    };

    return {
      stats,
      collections,
      recentActivity,
      healthMetrics
    };
  } catch (error) {
    console.error("Error fetching database data:", error);
    return {
      stats: {},
      collections: [],
      recentActivity: [],
      healthMetrics: {}
    };
  }
}

export default async function DatabasePage() {
  const data = await getDatabaseData();
  
  return <DatabaseClient 
    initialStats={data.stats}
    initialCollections={data.collections}
    initialRecentActivity={data.recentActivity}
    initialHealthMetrics={data.healthMetrics}
  />;
}