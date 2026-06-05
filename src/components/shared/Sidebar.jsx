"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Calendar,
  Star,
  Crown,
  X,
} from "lucide-react";

// Navigation Item Component
function NavItem({ icon, label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm
        transition-all duration-200
        ${active
          ? "bg-gradient-to-r from-fuchsia-500/10 to-violet-600/10 text-white border border-fuchsia-500/20"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <div className={`
        ${active ? "text-violet-400" : "text-gray-500 group-hover:text-violet-400"}
        transition-colors duration-200
      `}>
        {icon}
      </div>
      
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

// Section Divider
function SectionDivider({ label }) {
  return (
    <div className="my-4 flex items-center gap-2">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function DashboardSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  
  const mainNavItems = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
    { id: "jobs", icon: <BriefcaseBusiness size={18} />, label: "Jobs", badge: "24", href: "/dashboard/jobs" },
    { id: "candidates", icon: <Users size={18} />, label: "Candidates", badge: "12", href: "/dashboard/candidates" },
    { id: "analytics", icon: <BarChart3 size={18} />, label: "Analytics", href: "/dashboard/analytics" },
    { id: "messages", icon: <MessageSquare size={18} />, label: "Messages", badge: "3", href: "/dashboard/messages" },
  ];
  
  const secondNavItems = [
    { id: "documents", icon: <FileText size={18} />, label: "Documents", href: "/dashboard/documents" },
    { id: "calendar", icon: <Calendar size={18} />, label: "Calendar", href: "/dashboard/calendar" },
    { id: "saved", icon: <Star size={18} />, label: "Saved Jobs", href: "/dashboard/saved" },
  ];
  
  const isActive = (href) => pathname === href;
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - starts below navbar on desktop */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-[#050816] text-white border-r border-white/10
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:fixed lg:left-0 lg:top-16
      `}>
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-violet-600/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-fuchsia-600/5 blur-3xl" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex h-16 items-center justify-end border-b border-white/10 px-4 lg:hidden">
            <button 
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 py-6">
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link href={item.href} key={item.id} className="block" onClick={onClose}>
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.href)}
                    badge={item.badge}
                  />
                </Link>
              ))}
            </nav>
            
            <SectionDivider label="Your Activity" />
            
            <nav className="space-y-1">
              {secondNavItems.map((item) => (
                <Link href={item.href} key={item.id} className="block" onClick={onClose}>
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.href)}
                  />
                </Link>
              ))}
            </nav>
            
            {/* Upgrade Card */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-violet-600/10 p-4 border border-fuchsia-500/20">
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-white">Upgrade to Pro</span>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Get access to premium features and priority support.
              </p>
              <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:scale-[1.02]">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}