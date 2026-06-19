// components/shared/SeekerSidebar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Search,
  Bookmark,
  FileText,
  Calendar,
  Star,
  Crown,
  X,
  User,
  Settings,
  Bell,
  MessageSquare,
  History,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Navigation Item Component
function NavItem({ icon, label, active, badge, onClick, href }) {
  const content = (
    <button
      onClick={onClick}
      className={`
        group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm cursor-pointer
        transition-all duration-200
        ${active
          ? "bg-linear-to-r from-fuchsia-500/10 to-violet-600/10 text-white border border-fuchsia-500/20"
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
        <span className="rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {badge}
        </span>
      )}
    </button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
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

export default function SeekerSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  
  const mainNavItems = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard/seeker" },
    { id: "jobs", icon: <BriefcaseBusiness size={18} />, label: "Browse Jobs", href: "/jobs" },
    { id: "applications", icon: <FileText size={18} />, label: "My Applications", badge: "5", href: "/dashboard/seeker/applications" },
    { id: "saved", icon: <Bookmark size={18} />, label: "Saved Jobs", badge: "12", href: "/dashboard/seeker/saved" },
  ];
  
  const activityNavItems = [
    { id: "history", icon: <History size={18} />, label: "Application History", href: "/dashboard/seeker/history" },
    { id: "messages", icon: <MessageSquare size={18} />, label: "Messages", badge: "3", href: "/dashboard/seeker/messages" },
    { id: "notifications", icon: <Bell size={18} />, label: "Notifications", badge: "8", href: "/dashboard/seeker/notifications" },
    { id: "calendar", icon: <Calendar size={18} />, label: "Interview Calendar", href: "/dashboard/seeker/calendar" },
  ];
  
  const settingsNavItems = [
    { id: "profile", icon: <User size={18} />, label: "Profile", href: `/profile` },
    { id: "settings", icon: <Settings size={18} />, label: "Settings", href: "/dashboard/seeker/settings" },
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
      
      {/* Sidebar */}
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
        
        <div className="relative z-10 flex h-full flex-col min-h-0">
          {/* Close button for mobile */}
          <div className="flex h-16 items-center justify-end border-b border-white/10 px-4 lg:hidden shrink-0">
            <button 
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation - Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-6 min-h-0">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.href)}
                  badge={item.badge}
                  href={item.href}
                  onClick={onClose}
                />
              ))}
            </div>
            
            <SectionDivider label="Your Activity" />
            
            <div className="space-y-1">
              {activityNavItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.href)}
                  badge={item.badge}
                  href={item.href}
                  onClick={onClose}
                />
              ))}
            </div>
            
            <SectionDivider label="Account" />
            
            <div className="space-y-1">
              {settingsNavItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.href)}
                  href={item.href}
                  onClick={onClose}
                />
              ))}
            </div>
            
            {/* Upgrade Card */}
            <div className="mt-6 rounded-xl bg-linear-to-br from-fuchsia-500/10 to-violet-600/10 p-4 border border-fuchsia-500/20">
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-white">Upgrade to Pro</span>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Unlock unlimited applications and premium features.
              </p>
              <button className="mt-3 w-full cursor-pointer rounded-lg bg-linear-to-r from-fuchsia-500 to-violet-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:scale-[1.02]">
                Upgrade Now
              </button>
            </div>
            
            {/* Extra space at bottom */}
            <div className="h-12" />
          </div>
        </div>
      </div>
    </>
  );
}