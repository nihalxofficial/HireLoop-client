"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/shared/Sidebar";
import DashNav from "@/components/dashboard/DashNav";

const DashboardLayout = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <DashNav onMenuClick={() => setSidebarOpen(true)} user={user} />
      
      {/* Main Content - accounts for fixed navbar */}
      <main className="lg:ml-64 pt-16">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;