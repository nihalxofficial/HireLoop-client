// app/dashboard/seeker/applications/page.js
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import ApplicationsClient from './ApplicationsClient';

async function getApplications() {
  try {
    const applicant = await getUserSession();
    
    if (!applicant?.id) {
      return [];
    }

    // Fetch applications
    const applications = await getApplicationsByApplicant(applicant.id);
    
    if (!applications || applications.length === 0) {
      return [];
    }

    // Fetch companies to get company details
    const companies = await getCompanies();
    
    // Create a map for quick company lookup
    const companyMap = {};
    companies.forEach(company => {
      companyMap[company._id] = company;
    });

    // Enrich applications with company details
    const enrichedApplications = applications.map(app => {
      const company = companyMap[app.companyId];
      
      return {
        ...app,
        companyName: company?.name || "Unknown Company",
        companyLogo: company?.logo || "",
        companyLocation: company?.location || "",
        companyIndustry: company?.industry || "",
        cv: {
          ...app.cv,
          url: app.cv?.name ? `/api/applications/${app._id}/cv` : null
        }
      };
    });

    return enrichedApplications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export default async function ApplicationsPage() {
  const applications = await getApplications();
  
  return <ApplicationsClient initialApplications={applications} />;
}