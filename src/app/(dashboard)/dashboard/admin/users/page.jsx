// app/dashboard/admin/users/page.js
import { getUsers } from '@/lib/api/users';
import UsersClient from './UsersClient';

async function getUsersData() {
  try {
    // Get all users
    const users = await getUsers();
    
    if (!users || users.length === 0) {
      return [];
    }

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsersData();
  
  return <UsersClient initialUsers={users} />;
}