// app/contact/page.js
import ContactClient from './ContactClient';

// This is a Server Component - can fetch contact info if needed
async function getContactData() {
  // In a real app, you might fetch contact information from a database
  return {
    contactInfo: {
      email: 'support@hireloop.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Park, Silicon Valley, CA 94025',
      hours: 'Mon-Fri 9:00 AM - 6:00 PM EST'
    },
    socialLinks: [
      { name: 'Twitter', url: 'https://twitter.com/hireloop', icon: 'twitter' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/hireloop', icon: 'linkedin' },
      { name: 'Facebook', url: 'https://facebook.com/hireloop', icon: 'facebook' },
      { name: 'Instagram', url: 'https://instagram.com/hireloop', icon: 'instagram' },
      { name: 'YouTube', url: 'https://youtube.com/hireloop', icon: 'youtube' }
    ]
  };
}

export default async function ContactPage() {
  const data = await getContactData();
  
  return <ContactClient 
    contactInfo={data.contactInfo}
    socialLinks={data.socialLinks}
  />;
}