import { getUserSession } from '@/lib/core/session';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
    const user = await getUserSession();
  
  return <SettingsClient initialUserData={user} />;
}