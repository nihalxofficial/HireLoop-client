// app/dashboard/admin/subscriptions/page.js
import { getUsers } from '@/lib/api/users';
import SubscriptionsClient from './SubscriptionsClient';

async function getSubscriptionsData() {
  try {
    // Get all users to fetch subscription data
    const users = await getUsers();
    
    if (!users || users.length === 0) {
      return {
        subscriptions: [],
        stats: {
          total: 0,
          free: 0,
          pro: 0,
          premium: 0,
          active: 0,
          expired: 0,
          cancelled: 0
        }
      };
    }

    // Filter users with subscription data
    const subscriptions = users
      .filter(u => u.plan && u.plan !== 'free')
      .map(u => ({
        id: u._id,
        userId: u._id,
        userName: u.name || 'Unknown User',
        userEmail: u.email,
        userImage: u.image,
        plan: u.plan || 'free',
        status: u.subscriptionStatus || 'active',
        startDate: u.subscriptionStartDate || u.createdAt,
        endDate: u.subscriptionEndDate || null,
        amount: u.subscriptionAmount || 0,
        currency: u.currency || 'USD',
        paymentMethod: u.paymentMethod || 'card',
        autoRenew: u.autoRenew !== undefined ? u.autoRenew : true,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        role: u.role
      }));

    // Calculate stats
    const stats = {
      total: subscriptions.length,
      free: users.filter(u => !u.plan || u.plan === 'free').length,
      pro: subscriptions.filter(s => s.plan === 'pro').length,
      premium: subscriptions.filter(s => s.plan === 'premium').length,
      active: subscriptions.filter(s => s.status === 'active').length,
      expired: subscriptions.filter(s => s.status === 'expired').length,
      cancelled: subscriptions.filter(s => s.status === 'cancelled').length,
    };

    return { subscriptions, stats };
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return {
      subscriptions: [],
      stats: {
        total: 0,
        free: 0,
        pro: 0,
        premium: 0,
        active: 0,
        expired: 0,
        cancelled: 0
      }
    };
  }
}

export default async function SubscriptionsPage() {
  const data = await getSubscriptionsData();
  
  return <SubscriptionsClient 
    initialSubscriptions={data.subscriptions} 
    initialStats={data.stats} 
  />;
}