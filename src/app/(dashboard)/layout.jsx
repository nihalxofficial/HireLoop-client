"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DashNav from "@/components/dashboard/DashNav";
import RecruiterDashboardSidebar from "@/components/shared/RecruiterSidebar";
import SeekerSidebar from "@/components/shared/SeekerSidebar";
import AdminSidebar from "@/components/shared/AdminSidebar";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const pathname = usePathname();
  const { data: session} = authClient.useSession() 
  const user = session?.user

  // Determine which sidebar to show based on user role
  const getSidebar = () => {
    const role = user?.role || "seeker";
    
    switch (role) {
      case "recruiter":
        return <RecruiterDashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
      case "admin":
        return <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
      case "seeker":
      default:
        return <SeekerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {getSidebar()}
      <DashNav onMenuClick={() => setSidebarOpen(true)} user={user} />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;