// app/help/page.js
import HelpClient from './HelpClient';

// This is a Server Component - can fetch help articles/data here if needed
async function getHelpData() {
  // In a real app, you might fetch help articles from a database or API
  // For now, we'll pass static data to the client component
  return {
    categories: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Learn the basics of using HireLoop',
        icon: 'rocket',
        articles: [
          { title: 'Create Your Account', slug: 'create-account' },
          { title: 'Set Up Your Profile', slug: 'setup-profile' },
          { title: 'Find Your First Job', slug: 'find-first-job' },
        ]
      },
      {
        id: 'job-seekers',
        title: 'For Job Seekers',
        description: 'Tips and guides for job seekers',
        icon: 'briefcase',
        articles: [
          { title: 'How to Apply for Jobs', slug: 'how-to-apply' },
          { title: 'Create a Winning Resume', slug: 'winning-resume' },
          { title: 'Interview Preparation Tips', slug: 'interview-tips' },
        ]
      },
      {
        id: 'recruiters',
        title: 'For Recruiters',
        description: 'Tools and strategies for recruiters',
        icon: 'users',
        articles: [
          { title: 'Posting Your First Job', slug: 'post-first-job' },
          { title: 'Managing Applications', slug: 'manage-applications' },
          { title: 'Finding Top Talent', slug: 'find-top-talent' },
        ]
      },
      {
        id: 'account',
        title: 'Account & Billing',
        description: 'Manage your account and subscription',
        icon: 'settings',
        articles: [
          { title: 'Update Account Settings', slug: 'update-settings' },
          { title: 'Subscription Plans', slug: 'subscription-plans' },
          { title: 'Billing & Invoices', slug: 'billing-invoices' },
        ]
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common issues and how to fix them',
        icon: 'help',
        articles: [
          { title: 'Login Issues', slug: 'login-issues' },
          { title: 'Payment Problems', slug: 'payment-problems' },
          { title: 'Technical Support', slug: 'technical-support' },
        ]
      },
      {
        id: 'faq',
        title: 'Frequently Asked Questions',
        description: 'Quick answers to common questions',
        icon: 'faq',
        articles: [
          { title: 'What is HireLoop?', slug: 'what-is-hireloop' },
          { title: 'How much does it cost?', slug: 'pricing' },
          { title: 'Is my data secure?', slug: 'data-security' },
        ]
      }
    ]
  };
}

export default async function HelpPage() {
  const helpData = await getHelpData();
  
  return <HelpClient helpData={helpData} />;
}