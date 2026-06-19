// app/dashboard/admin/database/DatabaseClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  Tab,
  Tabs,
} from "@heroui/react";
import {
  Database,
  Search,
  RefreshCw,
  Download,
  Filter,
  Users,
  BriefcaseBusiness,
  Building2,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Server,
  HardDrive,
  Zap,
  Shield,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Check,
  X,
  Loader2,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  User,
  Mail,
  MapPin,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to get action color
const getActionColor = (action) => {
  switch (action?.toUpperCase()) {
    case 'INSERT':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'UPDATE':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'DELETE':
      return 'text-red-400 bg-red-500/10 border-red-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
};

export default function DatabaseClient({ 
  initialStats, 
  initialCollections, 
  initialRecentActivity,
  initialHealthMetrics 
}) {
  const [stats] = useState(initialStats);
  const [collections] = useState(initialCollections);
  const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
  const [healthMetrics] = useState(initialHealthMetrics);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Filter activity
  const filteredActivity = recentActivity.filter(activity => {
    const matchesSearch = searchTerm === "" ||
      activity.collection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.document?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = selectedCollection === "all" || 
      activity.collection?.toLowerCase() === selectedCollection.toLowerCase();
    return matchesSearch && matchesCollection;
  });

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Database refreshed successfully");
    }, 2000);
  };

  const handleBackup = () => {
    toast.success("Database backup initiated");
  };

  const handleOptimize = () => {
    toast.success("Database optimization started");
  };

  // Stats cards
  const statCards = [
    {
      title: "Total Documents",
      value: (stats.totalUsers + stats.totalJobs + stats.totalCompanies + stats.totalApplications).toLocaleString(),
      icon: <Database size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Collections",
      value: collections.length,
      icon: <Server size={20} />,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
    },
    {
      title: "Storage Used",
      value: "65%",
      icon: <HardDrive size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Response Time",
      value: "24ms",
      icon: <Zap size={20} />,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Database Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Monitor and manage database collections, records, and performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleRefresh} className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button onClick={handleBackup} className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Backup
          </Button>
          <Button onClick={handleOptimize} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <Zap size={16} />
            Optimize
          </Button>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-violet-500/5 to-transparent backdrop-blur-sm p-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-white">Database Status: {healthMetrics.status || 'Healthy'}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Uptime: <span className="text-white">{healthMetrics.uptime || '99.99%'}</span></span>
            <span>Response: <span className="text-white">{healthMetrics.responseTime || '24ms'}</span></span>
            <span>Connections: <span className="text-white">{healthMetrics.activeConnections || 42}</span></span>
            <span>Cache Hit: <span className="text-white">{healthMetrics.cacheHitRate || '87%'}</span></span>
          </div>
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

      {/* Tabs */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="border-b border-white/10 px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {[
              { id: "overview", label: "Overview", icon: <Database size={16} /> },
              { id: "collections", label: "Collections", icon: <Server size={16} /> },
              { id: "activity", label: "Activity Log", icon: <Activity size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 text-white border border-fuchsia-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Collection Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {collections.map((collection, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">{collection.name}</p>
                        <p className="text-2xl font-bold text-white mt-1">{collection.count}</p>
                      </div>
                      <div className={`rounded-lg ${collection.bgColor} p-2`}>
                        <div className={collection.color}>
                          {collection.icon === 'Users' && <Users size={20} />}
                          {collection.icon === 'BriefcaseBusiness' && <BriefcaseBusiness size={20} />}
                          {collection.icon === 'Building2' && <Building2 size={20} />}
                          {collection.icon === 'FileText' && <FileText size={20} />}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {collection.fields.slice(0, 4).map((field, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                          {field}
                        </span>
                      ))}
                      {collection.fields.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                          +{collection.fields.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Database Health Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="text-sm font-semibold text-white mb-3">Health Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status</span>
                      <span className="text-emerald-400">{healthMetrics.status || 'Healthy'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-white">{healthMetrics.uptime || '99.99%'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-white">{healthMetrics.responseTime || '24ms'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Connections</span>
                      <span className="text-white">{healthMetrics.activeConnections || 42}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Cache Hit Rate</span>
                      <span className="text-white">{healthMetrics.cacheHitRate || '87%'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Backup</span>
                      <span className="text-white">{formatDate(healthMetrics.lastBackup)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                      <span className="text-sm text-gray-300">Export Database</span>
                      <Download size={16} className="text-violet-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                      <span className="text-sm text-gray-300">Clear Cache</span>
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                      <span className="text-sm text-gray-300">Run Index Maintenance</span>
                      <Zap size={16} className="text-amber-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                      <span className="text-sm text-gray-300">View Query Logs</span>
                      <Eye size={16} className="text-violet-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collections Tab */}
          {activeTab === "collections" && (
            <div className="space-y-4">
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-violet-500/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg ${collection.bgColor} p-2`}>
                        <div className={collection.color}>
                          {collection.icon === 'Users' && <Users size={20} />}
                          {collection.icon === 'BriefcaseBusiness' && <BriefcaseBusiness size={20} />}
                          {collection.icon === 'Building2' && <Building2 size={20} />}
                          {collection.icon === 'FileText' && <FileText size={20} />}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">{collection.name}</h4>
                        <p className="text-sm text-gray-400">{collection.count} records</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {collection.fields.map((field, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === "activity" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search activity..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search size={16} className="text-gray-400" />}
                    variant="bordered"
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
                <div className="w-[160px]">
                  <Select
                    className="w-full"
                    value={selectedCollection}
                    onChange={setSelectedCollection}
                    variant="bordered"
                    aria-label="Filter by collection"
                    placeholder="Collection"
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
                      <Select.Value>{selectedCollection === "all" ? "All Collections" : selectedCollection}</Select.Value>
                      <Select.Indicator className="text-gray-400" />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                        <ListBox.Item id="all" textValue="All Collections" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                          All Collections
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                        {collections.map((collection) => (
                          <ListBox.Item
                            key={collection.name}
                            id={collection.name}
                            textValue={collection.name}
                            className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                          >
                            {collection.name}
                            <ListBox.ItemIndicator className="text-violet-400" />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-3">
                {filteredActivity.length > 0 ? (
                  filteredActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200"
                    >
                      <div className={`p-2 rounded-lg ${getActionColor(activity.action)}`}>
                        {activity.action === 'INSERT' && <Check size={14} />}
                        {activity.action === 'UPDATE' && <Edit size={14} />}
                        {activity.action === 'DELETE' && <Trash2 size={14} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getActionColor(activity.action)}`}>
                            {activity.action}
                          </span>
                          <span className="text-xs text-gray-400">{activity.collection}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{activity.user}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{activity.document}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Activity size={32} className="text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No activity found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}