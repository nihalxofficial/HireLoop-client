// app/dashboard/seeker/settings/page.js
import { getUserSession } from '@/lib/core/session';
import { getUserByUserId } from '@/lib/api/users';
import SettingsClient from './SettingsClient';

async function getUserData() {
  try {
    const user = await getUserSession();
    
    if (!user?.id) {
      return null;
    }

    // Fetch user details
    const userDetails = await getUserByUserId(user.id);
    
    return userDetails || user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default async function SettingsPage() {
  const userData = await getUserData();
  
  return <SettingsClient initialUserData={userData} />;
}