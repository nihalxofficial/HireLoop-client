// app/profile/page.js
import { getUserSession } from '@/lib/core/session';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const userData = await getUserSession();
  
  return <ProfileClient userData={userData} />;
}