// app/dashboard/recruiter/documents/page.js
import { getApplications } from '@/lib/api/applications';
import { getJobs } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import DocumentsClient from './DocumentsClient';

async function getDocumentsData() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return {
        documents: [],
        categories: [],
        stats: {}
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

    // Create documents from applications (CVs)
    const documents = recruiterApplications
      .filter(app => app.cv && app.cv.name)
      .map(app => ({
        id: app._id,
        name: app.cv.name,
        size: app.cv.size,
        type: app.cv.type || 'application/pdf',
        uploadDate: app.appliedAt || new Date().toISOString(),
        category: 'CVs',
        applicantName: app.fullName || 'Unknown',
        applicantEmail: app.email || '',
        applicantAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(app.fullName || 'Applicant')}&background=8B5CF6&color=fff&size=64`,
        jobTitle: app.jobTitle || 'Unknown Position',
        jobId: app.JobId,
        status: app.status || 'pending',
        url: app.cv.url || `/api/applications/${app._id}/cv`
      }));

    // Add some mock documents for demo (job descriptions, offer letters, etc.)
    const mockDocuments = [
      {
        id: 'doc_001',
        name: 'Job_Description_Template.docx',
        size: 45678,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Templates',
        applicantName: 'N/A',
        applicantEmail: '',
        applicantAvatar: '',
        jobTitle: '',
        jobId: '',
        status: 'active',
        url: '#'
      },
      {
        id: 'doc_002',
        name: 'Offer_Letter_Sample.pdf',
        size: 23456,
        type: 'application/pdf',
        uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Templates',
        applicantName: 'N/A',
        applicantEmail: '',
        applicantAvatar: '',
        jobTitle: '',
        jobId: '',
        status: 'active',
        url: '#'
      },
      {
        id: 'doc_003',
        name: 'Interview_Feedback_Form.pdf',
        size: 12345,
        type: 'application/pdf',
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Forms',
        applicantName: 'N/A',
        applicantEmail: '',
        applicantAvatar: '',
        jobTitle: '',
        jobId: '',
        status: 'active',
        url: '#'
      }
    ];

    // Combine real and mock documents
    const allDocuments = [...documents, ...mockDocuments];

    // Get unique categories
    const categories = ['All', ...new Set(allDocuments.map(doc => doc.category))];

    // Calculate stats
    const stats = {
      total: allDocuments.length,
      cvs: documents.length,
      templates: allDocuments.filter(d => d.category === 'Templates').length,
      forms: allDocuments.filter(d => d.category === 'Forms').length,
    };

    return {
      documents: allDocuments,
      categories,
      stats
    };
  } catch (error) {
    console.error("Error fetching documents data:", error);
    return {
      documents: [],
      categories: ['All'],
      stats: {
        total: 0,
        cvs: 0,
        templates: 0,
        forms: 0
      }
    };
  }
}

export default async function DocumentsPage() {
  const data = await getDocumentsData();
  
  return <DocumentsClient 
    initialDocuments={data.documents}
    initialCategories={data.categories}
    initialStats={data.stats}
  />;
}