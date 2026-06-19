// app/dashboard/seeker/notifications/NotificationsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  X,
  Clock,
  Calendar,
  BriefcaseBusiness,
  Send,
  User,
  FileText,
  Filter,
  Download,
  Trash2,
  Eye,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  MessageSquare,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  if (diff < 172800000) return "Yesterday";
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
  if (diff < 2592000000) return `${Math.floor(diff / 604800000)} weeks ago`;
  if (diff < 31536000000) return `${Math.floor(diff / 2592000000)} months ago`;
  return "Over a year ago";
};

// Notification type configuration
const NOTIFICATION_CONFIG = {
  application: {
    icon: <BriefcaseBusiness size={16} />,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    label: "Application"
  },
  system: {
    icon: <Bell size={16} />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    label: "System"
  },
  message: {
    icon: <MessageSquare size={16} />,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    label: "Message"
  }
};

// Status color mapping
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'applied':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'pending':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    case 'reviewing':
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    case 'shortlisted':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'interview':
      return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
    case 'rejected':
      return 'text-red-400 bg-red-500/10 border-red-500/20';
    case 'hired':
      return 'text-green-400 bg-green-500/10 border-green-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
};

export default function NotificationsClient({ initialNotifications, initialStats }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [stats] = useState(initialStats);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = searchTerm === "" ||
      notif.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || notif.type === typeFilter;
    const matchesRead = readFilter === "all" || 
      (readFilter === "read" && notif.read) ||
      (readFilter === "unread" && !notif.read);
    return matchesSearch && matchesType && matchesRead;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success("Notification marked as read");
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    if (confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
      toast.success("All notifications deleted");
    }
  };

  // Get notification icon
  const getNotificationIcon = (type) => {
    const config = NOTIFICATION_CONFIG[type];
    if (config) return config.icon;
    return <Bell size={16} />;
  };

  const getNotificationColor = (type) => {
    const config = NOTIFICATION_CONFIG[type];
    if (config) return config.color;
    return "text-gray-400";
  };

  const getNotificationBg = (type) => {
    const config = NOTIFICATION_CONFIG[type];
    if (config) return config.bgColor;
    return "bg-gray-500/10";
  };

  const getTypeLabel = (type) => {
    if (type === "all") return "All Types";
    const config = NOTIFICATION_CONFIG[type];
    return config ? config.label : type;
  };

  const getReadLabel = (read) => {
    if (read === "all") return "All";
    if (read === "read") return "Read";
    return "Unread";
  };

  // Stats cards
  const statCards = [
    {
      title: "Total Notifications",
      value: stats.total || 0,
      icon: <Bell size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Unread",
      value: stats.unread || 0,
      icon: <Clock size={20} />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Applications",
      value: stats.application || 0,
      icon: <BriefcaseBusiness size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "System Alerts",
      value: stats.system || 0,
      icon: <AlertCircle size={20} />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Stay updated with your application status and platform updates
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notifications.filter(n => !n.read).length > 0 && (
            <Button onClick={markAllAsRead} className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
              <CheckCheck size={16} />
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button onClick={deleteAllNotifications} className="bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 size={16} />
              Clear All
            </Button>
          )}
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <Bell size={16} />
            Preferences
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`rounded-lg ${stat.bgColor} p-2`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search size={16} className="text-gray-400" />}
              variant="bordered"
              fullWidth
              classNames={{
                input: "text-white placeholder:text-gray-500 text-sm",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-[140px]">
              <Select
                className="w-full"
                value={typeFilter}
                onChange={setTypeFilter}
                variant="bordered"
                aria-label="Filter by type"
                placeholder="Type"
                classNames={{
                  trigger: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "data-[focus=true]:border-violet-500",
                    "rounded-xl",
                    "h-10",
                    "transition-all",
                    "duration-200",
                  ],
                  value: "text-white text-sm",
                  placeholder: "text-gray-500 text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value>{getTypeLabel(typeFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Types"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Types
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {Object.entries(NOTIFICATION_CONFIG).map(([key, config]) => (
                      <ListBox.Item
                        key={key}
                        id={key}
                        textValue={config.label}
                        className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                      >
                        <span className="flex items-center gap-2">
                          {config.icon}
                          {config.label}
                        </span>
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-[140px]">
              <Select
                className="w-full"
                value={readFilter}
                onChange={setReadFilter}
                variant="bordered"
                aria-label="Filter by read status"
                placeholder="Status"
                classNames={{
                  trigger: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "data-[focus=true]:border-violet-500",
                    "rounded-xl",
                    "h-10",
                    "transition-all",
                    "duration-200",
                  ],
                  value: "text-white text-sm",
                  placeholder: "text-gray-500 text-sm",
                }}
              >
                <Select.Trigger>
                  <Select.Value>{getReadLabel(readFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="unread"
                      textValue="Unread"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <Clock size={14} />
                        Unread
                      </span>
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="read"
                      textValue="Read"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <Check size={14} />
                        Read
                      </span>
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 transition-all duration-200 hover:bg-white/5 ${
                  !notification.read ? 'bg-white/5 border-l-4 border-l-violet-500' : ''
                }`}
              >
                {/* Icon */}
                <div className={`p-2 rounded-xl ${getNotificationBg(notification.type)}`}>
                  <div className={getNotificationColor(notification.type)}>
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/20">
                            New
                          </span>
                        )}
                        {notification.status && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      {notification.companyName && (
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.companyName}
                          {notification.jobTitle && ` · ${notification.jobTitle}`}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs cursor-pointer text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                      >
                        <Check size={12} />
                        Mark as read
                      </button>
                    )}
                    {notification.link && (
                      <Link href={notification.link}>
                        <button className="text-xs cursor-pointer text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                          <Eye size={12} />
                          View
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs cursor-pointer text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No notifications</h3>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm || typeFilter !== "all" || readFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You're all caught up! New notifications will appear here"}
            </p>
          </div>
        )}

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {notifications.filter(n => !n.read).length} unread
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}