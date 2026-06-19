// app/dashboard/seeker/notifications/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import NotificationsClient from './NotificationsClient';

async function getNotificationsData() {
  try {
    // Get the current user session
    const user = await getUserSession();
    
    if (!user?.id) {
      return {
        notifications: [],
        stats: {}
      };
    }

    // Fetch applications, jobs, and companies
    const [applications, jobs, companies] = await Promise.all([
      getApplications(),
      getJobs(),
      getCompanies()
    ]);

    // Filter applications for this user
    const userApplications = applications?.filter(app => 
      app.applicantId === user.id
    ) || [];

    // Generate notifications from applications
    const notifications = [];

    // Application status update notifications
    userApplications.forEach(app => {
      const job = jobs?.find(j => j._id === app.JobId);
      const company = companies?.find(c => c._id === job?.companyId);
      
      // Status change notification
      if (app.status) {
        notifications.push({
          id: `notif_${app._id}_status`,
          type: 'application',
          title: `Application ${app.status}`,
          message: `Your application for "${app.jobTitle || job?.title || 'a position'}" at ${company?.name || 'a company'} has been ${app.status}`,
          createdAt: app.updatedAt || app.appliedAt,
          read: false,
          link: `/dashboard/seeker/applications`,
          icon: 'briefcase',
          status: app.status,
          companyName: company?.name,
          jobTitle: app.jobTitle || job?.title
        });
      }
    });

    // Application submitted notifications
    userApplications.forEach(app => {
      const job = jobs?.find(j => j._id === app.JobId);
      const company = companies?.find(c => c._id === job?.companyId);
      
      notifications.push({
        id: `notif_${app._id}_submitted`,
        type: 'application',
        title: 'Application Submitted',
        message: `You successfully applied for "${app.jobTitle || job?.title || 'a position'}" at ${company?.name || 'a company'}`,
        createdAt: app.appliedAt,
        read: false,
        link: `/dashboard/seeker/applications`,
        icon: 'send',
        companyName: company?.name,
        jobTitle: app.jobTitle || job?.title
      });
    });

    // Mock system notifications
    const systemNotifications = [
      {
        id: 'notif_system_1',
        type: 'system',
        title: 'New Job Alert',
        message: 'New jobs matching your profile have been posted',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        link: '/jobs',
        icon: 'bell'
      },
      {
        id: 'notif_system_2',
        type: 'system',
        title: 'Profile Completion',
        message: 'Complete your profile to get better job recommendations',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: true,
        link: '/profile/edit',
        icon: 'user'
      },
      {
        id: 'notif_system_3',
        type: 'system',
        title: 'Resume Tips',
        message: 'Tips to improve your resume and increase your chances',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        link: '/help',
        icon: 'file-text'
      },
      {
        id: 'notif_system_4',
        type: 'system',
        title: 'Weekly Job Digest',
        message: 'Your weekly job digest is ready. 15 new jobs this week!',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        link: '/jobs',
        icon: 'calendar'
      }
    ];

    // Combine and sort by date
    const allNotifications = [...notifications, ...systemNotifications];
    const sortedNotifications = allNotifications.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Calculate stats
    const stats = {
      total: sortedNotifications.length,
      unread: sortedNotifications.filter(n => !n.read).length,
      application: sortedNotifications.filter(n => n.type === 'application').length,
      system: sortedNotifications.filter(n => n.type === 'system').length,
    };

    return {
      notifications: sortedNotifications,
      stats
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      notifications: [],
      stats: {}
    };
  }
}

export default async function NotificationsPage() {
  const data = await getNotificationsData();
  
  return <NotificationsClient 
    initialNotifications={data.notifications}
    initialStats={data.stats}
  />;
}