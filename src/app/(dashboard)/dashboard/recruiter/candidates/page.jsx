// app/dashboard/recruiter/candidates/page.js
import { getApplicationsByRecruiter } from '@/lib/api/applications';
import CandidatesClient from './CandidatesClient';
import { getUserSession } from '@/lib/core/session';
import { getUserByUserId } from '@/lib/api/users';
import { getCompanyById } from '@/lib/api/companies';

// This is a Server Component
async function getCandidates() {
  try {
    // Get the current recruiter session
    const recruiter = await getUserSession();
    
    if (!recruiter?.id) {
      return [];
    }

    // Fetch all applications for this recruiter
    const applications = await getApplicationsByRecruiter(recruiter.id);
    
    if (!applications || applications.length === 0) {
      return [];
    }

    // Fetch additional details for each application
    const enrichedCandidates = await Promise.all(
      applications.map(async (application) => {
        // Get applicant details
        let applicantDetails = null;
        if (application.applicantId) {
          try {
            applicantDetails = await getUserByUserId(application.applicantId);
          } catch (error) {
            console.error(`Failed to fetch applicant ${application.applicantId}:`, error);
          }
        }

        // Get company details
        let companyDetails = null;
        if (application.companyId) {
          try {
            companyDetails = await getCompanyById(application.companyId);
          } catch (error) {
            console.error(`Failed to fetch company ${application.companyId}:`, error);
          }
        }

        // Generate CV URL - adjust based on your API endpoint
        let cvUrl = null;
        if (application.cv?.name) {
          // Option 1: If you have a direct download endpoint
          cvUrl = `/api/applications/${application._id}/cv`;
          
          // Option 2: If you store CVs in a cloud storage like S3
          // cvUrl = `https://your-storage-bucket.com/cvs/${application.cv.name}`;
          
          // Option 3: If you have a public URL
          // cvUrl = `/uploads/cvs/${application.cv.name}`;
        }

        // Combine all data into a single candidate object
        return {
          _id: application._id,
          jobTitle: application.jobTitle || "Unknown Position",
          JobId: application.JobId,
          companyId: application.companyId,
          recruiterId: application.recruiterId,
          applicantId: application.applicantId,
          
          // Applicant details
          fullName: applicantDetails?.fullName || application.fullName || "Unknown Applicant",
          email: applicantDetails?.email || application.email || "",
          phone: applicantDetails?.phone || application.phone || "",
          avatar: applicantDetails?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          
          // Application details
          coverLetter: application.coverLetter || "",
          portfolio: applicantDetails?.portfolio || application.portfolio || "",
          linkedin: applicantDetails?.linkedin || application.linkedin || "",
          github: applicantDetails?.github || application.github || "",
          expectedSalary: application.expectedSalary || "",
          noticePeriod: application.noticePeriod || "",
          cv: {
            ...application.cv,
            url: cvUrl // Add the URL to the CV object
          },
          status: application.status || "pending",
          appliedAt: application.appliedAt || new Date().toISOString(),
          updatedAt: application.updatedAt || new Date().toISOString(),
          
          // Company details
          companyName: companyDetails?.name || "Unknown Company",
          companyLogo: companyDetails?.logo || "",
          companyIndustry: companyDetails?.industry || "",
          companyLocation: companyDetails?.location || "",
          
          // Additional applicant details if available
          skills: applicantDetails?.skills || [],
          experience: applicantDetails?.experience || "",
          education: applicantDetails?.education || "",
        };
      })
    );

    return enrichedCandidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
}

export default async function CandidatesPage() {
  const candidates = await getCandidates();
  
  return <CandidatesClient initialCandidates={candidates} />;
}