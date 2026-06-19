// app/dashboard/seeker/messages/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import MessagesClient from './MessagesClient';

async function getMessagesData() {
  try {
    // Get the current user session
    const user = await getUserSession();
    
    if (!user?.id) {
      return {
        conversations: [],
        contacts: [],
        messages: []
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

    // Create conversations from applications
    const conversations = userApplications.map(app => {
      const job = jobs?.find(j => j._id === app.JobId);
      const company = companies?.find(c => c._id === job?.companyId);
      
      return {
        id: app._id,
        recruiterId: app.recruiterId,
        recruiterName: 'Recruiter', // You can fetch recruiter name if available
        recruiterAvatar: `https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64`,
        jobTitle: app.jobTitle || job?.title || 'Unknown Position',
        companyName: company?.name || 'Unknown Company',
        companyLogo: company?.logo || '',
        status: app.status || 'pending',
        lastMessage: app.coverLetter ? app.coverLetter.substring(0, 100) + '...' : 'No message',
        lastMessageTime: app.updatedAt || app.appliedAt,
        unreadCount: Math.floor(Math.random() * 3), // Mock unread count
        appliedAt: app.appliedAt
      };
    });

    // Create contacts list (unique recruiters)
    const contactsMap = {};
    userApplications.forEach(app => {
      if (app.recruiterId && !contactsMap[app.recruiterId]) {
        contactsMap[app.recruiterId] = {
          id: app.recruiterId,
          name: 'Recruiter',
          avatar: `https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64`,
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
        senderId: 'recruiter1',
        senderName: 'Recruiter',
        senderAvatar: 'https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64',
        receiverId: user.id,
        receiverName: user.name || 'Applicant',
        content: 'Hello! Thank you for your application to the Senior Frontend Developer position. We are impressed with your profile.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true
      },
      {
        id: 'msg2',
        senderId: user.id,
        senderName: user.name || 'Applicant',
        senderAvatar: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Applicant')}&background=8B5CF6&color=fff&size=64`,
        receiverId: 'recruiter1',
        receiverName: 'Recruiter',
        content: 'Thank you for your response! I am very interested in this opportunity and would love to learn more.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: true
      },
      {
        id: 'msg3',
        senderId: 'recruiter1',
        senderName: 'Recruiter',
        senderAvatar: 'https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64',
        receiverId: user.id,
        receiverName: user.name || 'Applicant',
        content: 'Great! We would like to schedule an interview with you. Are you available next week?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false
      }
    ];

    // Add mock messages to conversations
    const conversationsWithMessages = conversations.map(conv => ({
      ...conv,
      messages: mockMessages.filter(msg => 
        msg.senderId === conv.recruiterId || msg.receiverId === conv.recruiterId
      ).length > 0 ? mockMessages.filter(msg => 
        msg.senderId === conv.recruiterId || msg.receiverId === conv.recruiterId
      ) : [
        {
          id: `msg_${conv.id}`,
          senderId: 'recruiter1',
          senderName: 'Recruiter',
          senderAvatar: 'https://ui-avatars.com/api/?name=Recruiter&background=8B5CF6&color=fff&size=64',
          receiverId: user.id,
          receiverName: user.name || 'Applicant',
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
      userName: user.name || 'User',
      userId: user.id
    };
  } catch (error) {
    console.error("Error fetching messages data:", error);
    return {
      conversations: [],
      contacts: [],
      messages: [],
      userName: '',
      userId: ''
    };
  }
}

export default async function MessagesPage() {
  const data = await getMessagesData();
  
  return <MessagesClient 
    initialConversations={data.conversations}
    initialContacts={data.contacts}
    initialMessages={data.messages}
    userName={data.userName}
    userId={data.userId}
  />;
}