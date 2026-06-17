// app/dashboard/admin/companies/page.js
import { getCompanies } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';
import CompaniesClient from './CompaniesClient';

export default async function AllCompaniesPage() {
  const companies = await getCompanies("");
  
  return <CompaniesClient initialCompanies={companies} />;
}