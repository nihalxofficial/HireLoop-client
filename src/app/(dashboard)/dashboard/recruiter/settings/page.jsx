// app/dashboard/recruiter/settings/page.js
import { getUserSession } from '@/lib/core/session';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const userData = await getUserSession();
  
  return <SettingsClient initialUserData={userData} />;
}