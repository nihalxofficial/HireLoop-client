// app/dashboard/admin/moderation/page.js
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getApplications } from '@/lib/api/applications';
import ModerationClient from './ModerationClient';

// Mock function - Replace with actual moderation data fetch
async function getModerationData() {
  try {
    const [users, jobs, companies, applications] = await Promise.all([
      getUsers(),
      getJobs(),
      getCompanies(),
      getApplications()
    ]);

    // Generate moderation items from real data
    const moderationItems = [];

    // Flagged/pending companies (companies pending approval)
    const pendingCompanies = companies?.filter(c => c.status?.toLowerCase() === 'pending').map(c => ({
      id: c._id,
      type: 'company',
      title: c.name,
      description: `Company "${c.name}" is pending approval`,
      status: 'pending',
      createdAt: c.createdAt,
      reportedBy: c.recruiterEmail || 'System',
      priority: 'high',
      details: {
        industry: c.industry,
        location: c.location,
        employeeCount: c.employeeCount,
        recruiterEmail: c.recruiterEmail
      }
    })) || [];

    // Flagged/pending jobs
    const pendingJobs = jobs?.filter(j => j.status?.toLowerCase() === 'pending').map(j => ({
      id: j._id,
      type: 'job',
      title: j.title,
      description: `Job "${j.title}" is pending approval`,
      status: 'pending',
      createdAt: j.createdAt,
      reportedBy: j.companyName || 'Unknown',
      priority: 'medium',
      details: {
        category: j.category,
        type: j.type,
        location: j.location,
        salary: `${j.salaryMin} - ${j.salaryMax} ${j.currency}`
      }
    })) || [];

    // Flagged/reported users
    const flaggedUsers = users?.filter(u => u.status?.toLowerCase() === 'suspended' || u.status?.toLowerCase() === 'inactive').map(u => ({
      id: u._id,
      type: 'user',
      title: u.name || 'Unknown User',
      description: `User "${u.name}" is ${u.status}`,
      status: u.status || 'pending',
      createdAt: u.createdAt,
      reportedBy: 'System',
      priority: 'high',
      details: {
        email: u.email,
        role: u.role,
        plan: u.plan,
        emailVerified: u.emailVerified
      }
    })) || [];

    // Combine all moderation items
    moderationItems.push(...pendingCompanies, ...pendingJobs, ...flaggedUsers);

    // Sort by priority and date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    moderationItems.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Stats
    const stats = {
      pending: moderationItems.filter(i => i.status === 'pending').length,
      approved: 0,
      rejected: 0,
      total: moderationItems.length,
      companies: pendingCompanies.length,
      jobs: pendingJobs.length,
      users: flaggedUsers.length,
    };

    return {
      items: moderationItems,
      stats,
    };
  } catch (error) {
    console.error("Error fetching moderation data:", error);
    return {
      items: [],
      stats: {
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0,
        companies: 0,
        jobs: 0,
        users: 0
      }
    };
  }
}

export default async function ModerationPage() {
  const data = await getModerationData();
  
  return <// app/dashboard/admin/moderation/page.js
import { getUsers } from '@/lib/api/users';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getApplications } from '@/lib/api/applications';
import ModerationClient from './ModerationClient';

// Mock function - Replace with actual moderation data fetch
async function getModerationData() {
  try {
    const [users, jobs, companies, applications] = await Promise.all([
      getUsers(),
      getJobs(),
      getCompanies(),
      getApplications()
    ]);

    // Generate moderation items from real data
    const moderationItems = [];

    // Flagged/pending companies (companies pending approval)
    const pendingCompanies = companies?.filter(c => c.status?.toLowerCase() === 'pending').map(c => ({
      id: c._id,
      type: 'company',
      title: c.name,
      description: `Company "${c.name}" is pending approval`,
      status: 'pending',
      createdAt: c.createdAt,
      reportedBy: c.recruiterEmail || 'System',
      priority: 'high',
      details: {
        industry: c.industry,
        location: c.location,
        employeeCount: c.employeeCount,
        recruiterEmail: c.recruiterEmail
      }
    })) || [];

    // Flagged/pending jobs
    const pendingJobs = jobs?.filter(j => j.status?.toLowerCase() === 'pending').map(j => ({
      id: j._id,
      type: 'job',
      title: j.title,
      description: `Job "${j.title}" is pending approval`,
      status: 'pending',
      createdAt: j.createdAt,
      reportedBy: j.companyName || 'Unknown',
      priority: 'medium',
      details: {
        category: j.category,
        type: j.type,
        location: j.location,
        salary: `${j.salaryMin} - ${j.salaryMax} ${j.currency}`
      }
    })) || [];

    // Flagged/reported users
    const flaggedUsers = users?.filter(u => u.status?.toLowerCase() === 'suspended' || u.status?.toLowerCase() === 'inactive').map(u => ({
      id: u._id,
      type: 'user',
      title: u.name || 'Unknown User',
      description: `User "${u.name}" is ${u.status}`,
      status: u.status || 'pending',
      createdAt: u.createdAt,
      reportedBy: 'System',
      priority: 'high',
      details: {
        email: u.email,
        role: u.role,
        plan: u.plan,
        emailVerified: u.emailVerified
      }
    })) || [];

    // Combine all moderation items
    moderationItems.push(...pendingCompanies, ...pendingJobs, ...flaggedUsers);

    // Sort by priority and date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    moderationItems.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Stats
    const stats = {
      pending: moderationItems.filter(i => i.status === 'pending').length,
      approved: 0,
      rejected: 0,
      total: moderationItems.length,
      companies: pendingCompanies.length,
      jobs: pendingJobs.length,
      users: flaggedUsers.length,
    };

    return {
      items: moderationItems,
      stats,
    };
  } catch (error) {
    console.error("Error fetching moderation data:", error);
    return {
      items: [],
      stats: {
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0,
        companies: 0,
        jobs: 0,
        users: 0
      }
    };
  }
}

export default async function ModerationPage() {
  const data = await getModerationData();
  
  return <ModerationClient 
    initialItems={data.items} 
    initialStats={data.stats} 
  />;
} 
    initialItems={data.items} 
    initialStats={data.stats} 
  />;
}