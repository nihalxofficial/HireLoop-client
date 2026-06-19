// app/dashboard/seeker/calendar/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import CalendarClient from './CalendarClient';

async function getInterviewCalendarData() {
  try {
    // Get the current user session
    const user = await getUserSession();
    
    if (!user?.id) {
      return {
        interviews: [],
        upcomingInterviews: [],
        stats: {}
      };
    }

    // Fetch applications, jobs, and companies
    const [applications, jobs, companies] = await Promise.all([
      getApplications(),
      getJobs(),
      getCompanies()
    ]);

    // Filter applications for this user that are in interview or shortlisted status
    const userApplications = applications?.filter(app => 
      app.applicantId === user.id &&
      (app.status?.toLowerCase() === 'interview' || app.status?.toLowerCase() === 'shortlisted')
    ) || [];

    // Generate interview events from applications
    const interviews = userApplications.map((app, index) => {
      const job = jobs?.find(j => j._id === app.JobId);
      const company = companies?.find(c => c._id === job?.companyId);
      
      // Generate interview dates (for demo)
      const now = new Date();
      const interviewDate = new Date(now);
      interviewDate.setDate(now.getDate() + (index + 1) * 2);
      interviewDate.setHours(10 + index * 2, 0, 0, 0);
      
      return {
        id: app._id,
        title: `Interview: ${app.jobTitle || job?.title || 'Position'}`,
        companyName: company?.name || 'Unknown Company',
        companyLogo: company?.logo || '',
        jobTitle: app.jobTitle || job?.title || 'Unknown Position',
        date: interviewDate.toISOString(),
        startTime: interviewDate.toISOString(),
        endTime: new Date(interviewDate.getTime() + 60 * 60 * 1000).toISOString(),
        status: app.status || 'scheduled',
        type: 'interview',
        location: 'Virtual (Google Meet)',
        description: `Interview for ${app.jobTitle || job?.title || 'position'} at ${company?.name || 'company'}`,
        recruiterName: 'Recruiter',
        recruiterEmail: company?.recruiterEmail || '',
        applicationId: app._id,
        color: '#8B5CF6'
      };
    });

    // Add some mock interviews for demo
    const mockInterviews = [
      {
        id: 'mock_interview_1',
        title: 'Interview: Senior Frontend Developer',
        companyName: 'TechCorp',
        companyLogo: '',
        jobTitle: 'Senior Frontend Developer',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        type: 'interview',
        location: 'Virtual (Zoom)',
        description: 'Technical interview for Senior Frontend Developer position',
        recruiterName: 'Sarah Johnson',
        recruiterEmail: 'sarah@techcorp.com',
        applicationId: 'mock_app_1',
        color: '#34D399'
      },
      {
        id: 'mock_interview_2',
        title: 'Interview: Full Stack Engineer',
        companyName: 'InnovateLabs',
        companyLogo: '',
        jobTitle: 'Full Stack Engineer',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        type: 'interview',
        location: 'Virtual (Google Meet)',
        description: 'System design interview for Full Stack Engineer position',
        recruiterName: 'Michael Chen',
        recruiterEmail: 'michael@innovatelabs.com',
        applicationId: 'mock_app_2',
        color: '#60A5FA'
      }
    ];

    // Combine interviews
    const allInterviews = [...interviews, ...mockInterviews];
    
    // Sort by date
    const sortedInterviews = allInterviews.sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Get upcoming interviews (next 7 days)
    const now = new Date();
    const upcomingInterviews = sortedInterviews.filter(interview => 
      new Date(interview.date) >= now
    );

    // Calculate stats
    const stats = {
      total: sortedInterviews.length,
      upcoming: upcomingInterviews.length,
      thisWeek: sortedInterviews.filter(i => {
        const date = new Date(i.date);
        const weekFromNow = new Date(now);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return date >= now && date <= weekFromNow;
      }).length,
      completed: sortedInterviews.filter(i => 
        new Date(i.date) < now
      ).length
    };

    return {
      interviews: sortedInterviews,
      upcomingInterviews: upcomingInterviews.slice(0, 10),
      stats
    };
  } catch (error) {
    console.error("Error fetching interview calendar:", error);
    return {
      interviews: [],
      upcomingInterviews: [],
      stats: {}
    };
  }
}

export default async function InterviewCalendarPage() {
  const data = await getInterviewCalendarData();
  
  return <CalendarClient 
    initialInterviews={data.interviews}
    initialUpcomingInterviews={data.upcomingInterviews}
    initialStats={data.stats}
  />;
}