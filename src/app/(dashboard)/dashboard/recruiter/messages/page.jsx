// app/dashboard/recruiter/messages/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import MessagesClient from './MessagesClient';

async function getMessagesData() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return {
        conversations: [],
        contacts: [],
        messages: []
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

    // Create conversations from applications
    const conversations = recruiterApplications.map(app => ({
      id: app._id,
      applicantId: app.applicantId,
      applicantName: app.fullName || 'Unknown Applicant',
      applicantEmail: app.email || '',
      applicantAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(app.fullName || 'Applicant')}&background=8B5CF6&color=fff&size=64`,
      jobTitle: app.jobTitle || 'Unknown Position',
      jobId: app.JobId,
      status: app.status || 'pending',
      lastMessage: app.coverLetter ? app.coverLetter.substring(0, 100) + '...' : 'No message',
      lastMessageTime: app.updatedAt || app.appliedAt,
      unreadCount: Math.floor(Math.random() * 3), // Mock unread count
      appliedAt: app.appliedAt
    }));

    // Create contacts list (unique applicants)
    const contactsMap = {};
    recruiterApplications.forEach(app => {
      if (app.applicantId && !contactsMap[app.applicantId]) {
        contactsMap[app.applicantId] = {
          id: app.applicantId,
          name: app.fullName || 'Unknown Applicant',
          email: app.email || '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(app.fullName || 'Applicant')}&background=8B5CF6&color=fff&size=64`,
          lastMessage: app.coverLetter ? app.coverLetter.substring(0, 100) + '...' : 'No message',
          lastMessageTime: app.updatedAt || app.appliedAt,
          unreadCount: Math.floor(Math.random() * 3),
          jobTitle: app.jobTitle,
          status: app.status
        };
      }
    });
    const contacts = Object.values(contactsMap);

    // Mock messages for demo
    const mockMessages = [
      {
        id: 'msg1',
        senderId: 'applicant1',
        senderName: 'Alice Johnson',
        senderAvatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=8B5CF6&color=fff&size=64',
        receiverId: recruiter.id,
        receiverName: recruiter.name || 'Recruiter',
        content: 'Hello! I am very interested in the Senior Frontend Developer position. I have 5 years of experience with React and TypeScript.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true
      },
      {
        id: 'msg2',
        senderId: recruiter.id,
        senderName: recruiter.name || 'Recruiter',
        senderAvatar: recruiter.image || 'https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64',
        receiverId: 'applicant1',
        receiverName: 'Alice Johnson',
        content: 'Thank you for your interest! I have reviewed your application and would like to schedule an interview.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: true
      },
      {
        id: 'msg3',
        senderId: 'applicant1',
        senderName: 'Alice Johnson',
        senderAvatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=8B5CF6&color=fff&size=64',
        receiverId: recruiter.id,
        receiverName: recruiter.name || 'Recruiter',
        content: 'That sounds great! I am available for an interview anytime next week.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false
      }
    ];

    // For each conversation, add mock messages
    const conversationsWithMessages = conversations.map(conv => ({
      ...conv,
      messages: mockMessages.filter(msg => 
        msg.senderId === conv.applicantId || msg.receiverId === conv.applicantId
      ).length > 0 ? mockMessages.filter(msg => 
        msg.senderId === conv.applicantId || msg.receiverId === conv.applicantId
      ) : [
        {
          id: `msg_${conv.id}`,
          senderId: conv.applicantId,
          senderName: conv.applicantName,
          senderAvatar: conv.applicantAvatar,
          receiverId: recruiter.id,
          receiverName: recruiter.name || 'Recruiter',
          content: conv.lastMessage || 'No message',
          timestamp: conv.lastMessageTime || conv.appliedAt,
          isRead: true
        }
      ]
    }));

    return {
      conversations: conversationsWithMessages,
      contacts,
      messages: mockMessages,
      recruiterName: recruiter.name || 'Recruiter',
      recruiterId: recruiter.id
    };
  } catch (error) {
    console.error("Error fetching messages data:", error);
    return {
      conversations: [],
      contacts: [],
      messages: [],
      recruiterName: '',
      recruiterId: ''
    };
  }
}

export default async function MessagesPage() {
  const data = await getMessagesData();
  
  return <MessagesClient 
    initialConversations={data.conversations}
    initialContacts={data.contacts}
    initialMessages={data.messages}
    recruiterName={data.recruiterName}
    recruiterId={data.recruiterId}
  />;
}