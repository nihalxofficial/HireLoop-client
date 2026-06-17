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
        // Get applicant details using the applicantId from the application
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

        // Generate CV URL
        let cvUrl = null;
        if (application.cv?.name) {
          cvUrl = `/api/applications/${application._id}/cv`;
        }

        // Combine all data into a single candidate object
        return {
          _id: application._id,
          jobTitle: application.jobTitle || "Unknown Position",
          JobId: application.JobId,
          companyId: application.companyId,
          recruiterId: application.recruiterId,
          applicantId: application.applicantId,
          
          // Applicant details - prefer applicantDetails from getUserByUserId
          fullName: applicantDetails?.name || applicantDetails?.fullName || application.fullName || "Unknown Applicant",
          email: applicantDetails?.email || application.email || "",
          phone: applicantDetails?.phone || application.phone || "",
          avatar: applicantDetails?.image || applicantDetails?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(applicantDetails?.name || application.fullName || 'User')}&background=8B5CF6&color=fff&size=64&bold=true`,
          
          // Application details
          coverLetter: application.coverLetter || "",
          portfolio: applicantDetails?.portfolio || application.portfolio || "",
          linkedin: applicantDetails?.linkedin || application.linkedin || "",
          github: applicantDetails?.github || application.github || "",
          expectedSalary: application.expectedSalary || "",
          noticePeriod: application.noticePeriod || "",
          cv: {
            ...application.cv,
            url: cvUrl
          },
          status: application.status || "applied",
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
          plan: applicantDetails?.plan || "free",
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