// app/dashboard/recruiter/calendar/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import CalendarClient from './CalendarClient';

async function getCalendarData() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return {
        events: [],
        interviews: [],
        upcomingEvents: []
      };
    }

    // Fetch jobs and applications
    const [jobs, applications] = await Promise.all([
      getJobs(),
      getApplications()
    ]);

    // Filter jobs created by this recruiter
    const recruiterJobs = jobs?.filter(job => job.recruiterId === recruiter.id) || [];
    const jobIds = recruiterJobs.map(job => job._id);

    // Filter applications for recruiter's jobs
    const recruiterApplications = applications?.filter(app => 
      jobIds.includes(app.JobId)
    ) || [];

    // Create mock events from applications (for demo)
    const now = new Date();
    const events = [];

    // Add interview events for shortlisted/interview status applications
    const interviewApps = recruiterApplications.filter(app => 
      app.status?.toLowerCase() === 'interview' || app.status?.toLowerCase() === 'shortlisted'
    );

    interviewApps.forEach((app, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() + index * 2 + 1);
      date.setHours(10 + index * 2, 0, 0, 0);
      
      events.push({
        id: `event_${app._id}`,
        title: `Interview with ${app.fullName || 'Candidate'}`,
        description: `Interview for ${app.jobTitle || 'Position'}`,
        date: date.toISOString(),
        startTime: date.toISOString(),
        endTime: new Date(date.getTime() + 60 * 60 * 1000).toISOString(),
        type: 'interview',
        applicantId: app.applicantId,
        applicantName: app.fullName || 'Unknown',
        jobTitle: app.jobTitle || 'Unknown Position',
        jobId: app.JobId,
        status: 'scheduled',
        location: 'Virtual (Google Meet)',
        color: '#8B5CF6'
      });
    });

    // Add some mock events for demo
    const mockEvents = [
      {
        id: 'event_001',
        title: 'Team Meeting',
        description: 'Weekly recruitment team sync',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0, 0).toISOString(),
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0, 0).toISOString(),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 15, 0, 0).toISOString(),
        type: 'meeting',
        status: 'scheduled',
        location: 'Conference Room A',
        color: '#34D399'
      },
      {
        id: 'event_002',
        title: 'Job Post Review',
        description: 'Review new job postings for the week',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 30, 0).toISOString(),
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 30, 0).toISOString(),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10, 30, 0).toISOString(),
        type: 'task',
        status: 'scheduled',
        location: 'Virtual',
        color: '#60A5FA'
      },
      {
        id: 'event_003',
        title: 'Candidate Follow-up',
        description: 'Follow up with shortlisted candidates',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 16, 0, 0).toISOString(),
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 16, 0, 0).toISOString(),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 17, 0, 0).toISOString(),
        type: 'task',
        status: 'scheduled',
        location: 'Virtual',
        color: '#FBBF24'
      },
      {
        id: 'event_004',
        title: 'Recruiter Workshop',
        description: 'HR and recruitment best practices workshop',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 11, 0, 0).toISOString(),
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 11, 0, 0).toISOString(),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 12, 30, 0).toISOString(),
        type: 'meeting',
        status: 'scheduled',
        location: 'Virtual',
        color: '#EC4899'
      }
    ];

    // Combine events
    const allEvents = [...events, ...mockEvents];

    // Get upcoming events (next 7 days)
    const upcomingEvents = allEvents
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 10);

    // Get interviews for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayInterviews = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return event.type === 'interview' && 
             eventDate >= today && 
             eventDate < tomorrow;
    });

    return {
      events: allEvents,
      interviews: todayInterviews,
      upcomingEvents
    };
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return {
      events: [],
      interviews: [],
      upcomingEvents: []
    };
  }
}

export default async function CalendarPage() {
  const data = await getCalendarData();
  
  return <CalendarClient 
    initialEvents={data.events}
    initialInterviews={data.interviews}
    initialUpcomingEvents={data.upcomingEvents}
  />;
}