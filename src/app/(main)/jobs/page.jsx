// app/jobs/page.js
import { getJobs } from '@/lib/api/jobs';
import { getCompanies } from '@/lib/api/companies';
import JobClient from './JobClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

async function getJobsData() {
  try {
    const [jobs, companies] = await Promise.all([
      getJobs(),
      getCompanies()
    ]);
    
    return { jobs: jobs || [], companies: companies || [] };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [], companies: [] };
  }
}

export default async function JobsPage() {
  const { jobs, companies } = await getJobsData();
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="text-violet-400 animate-spin" />
      </div>
    }>
      <JobClient initialJobs={jobs} companies={companies} />
    </Suspense>
  );
}