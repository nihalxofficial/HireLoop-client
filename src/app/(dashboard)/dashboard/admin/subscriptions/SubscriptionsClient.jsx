// app/dashboard/admin/subscriptions/SubscriptionsClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  CreditCard,
  Search,
  Eye,
  Mail,
  Download,
  UserPlus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Phone,
  FileText,
  DollarSign,
  ExternalLink,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  Building2,
  Edit,
  Trash2,
  Check,
  X as XIcon,
  AlertCircle,
  Loader2,
  Shield,
  BriefcaseBusiness,
  User,
  Crown,
  Star,
  MoreVertical,
  UserCircle,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Plan configuration with icons and colors
const PLAN_CONFIG = {
  free: {
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    icon: <User size={14} />,
    label: "Free",
    price: "$0",
    features: ["Basic features", "Limited applications"]
  },
  pro: {
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: <Star size={14} />,
    label: "Pro",
    price: "$29/mo",
    features: ["Advanced features", "Unlimited applications", "Priority support"]
  },
  premium: {
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    icon: <Crown size={14} />,
    label: "Premium",
    price: "$49/mo",
    features: ["All features", "Unlimited everything", "24/7 support", "Custom branding"]
  }
};

// Subscription status configuration
const STATUS_CONFIG = {
  active: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <CheckCircle size={14} />,
    label: "Active"
  },
  expired: {
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: <XCircle size={14} />,
    label: "Expired"
  },
  cancelled: {
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    icon: <XCircle size={14} />,
    label: "Cancelled"
  },
  pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: <Clock size={14} />,
    label: "Pending"
  }
};

export default function SubscriptionsClient({ initialSubscriptions, initialStats }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [stats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Get unique values for filters
  const plans = ["all", ...new Set(subscriptions.map(s => s.plan).filter(Boolean))];
  const statuses = ["all", ...new Set(subscriptions.map(s => s.status).filter(Boolean))];

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = searchTerm === "" ||
      sub.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === "all" || sub.plan === planFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Sort subscriptions
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.startDate || b.createdAt) - new Date(a.startDate || a.createdAt);
    } else if (sortBy === "name") {
      comparison = (a.userName || "").localeCompare(b.userName || "");
    } else if (sortBy === "plan") {
      comparison = (a.plan || "").localeCompare(b.plan || "");
    } else if (sortBy === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    } else if (sortBy === "amount") {
      comparison = (a.amount || 0) - (b.amount || 0);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle subscription status change
  const handleStatusChange = async (subscriptionId, newStatus) => {
    setUpdatingStatus(subscriptionId);
    try {
      setSubscriptions(subscriptions.map(s => 
        s.id === subscriptionId ? { ...s, status: newStatus } : s
      ));
      toast.success(`Subscription status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      
    } catch (error) {
      console.error('Error updating subscription status:', error);
      const sub = subscriptions.find(s => s.id === subscriptionId);
      if (sub) {
        setSubscriptions(subscriptions.map(s => 
          s.id === subscriptionId ? { ...s, status: sub.status } : s
        ));
      }
      toast.error("Failed to update subscription status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle auto-renew toggle
  const handleAutoRenewToggle = async (subscriptionId, currentValue) => {
    setUpdatingStatus(subscriptionId);
    try {
      setSubscriptions(subscriptions.map(s => 
        s.id === subscriptionId ? { ...s, autoRenew: !currentValue } : s
      ));
      toast.success(`Auto-renew ${!currentValue ? 'enabled' : 'disabled'}`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/auto-renew`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ autoRenew: !currentValue }),
      // });
      
    } catch (error) {
      console.error('Error toggling auto-renew:', error);
      const sub = subscriptions.find(s => s.id === subscriptionId);
      if (sub) {
        setSubscriptions(subscriptions.map(s => 
          s.id === subscriptionId ? { ...s, autoRenew: sub.autoRenew } : s
        ));
      }
      toast.error("Failed to update auto-renew status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getPlanConfig = (plan) => {
    return PLAN_CONFIG[plan?.toLowerCase()] || PLAN_CONFIG.free;
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.active;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getPlanLabel = (plan) => {
    if (plan === "all") return "All Plans";
    return getPlanConfig(plan).label;
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "name": return "Name A-Z";
      case "plan": return "Plan";
      case "status": return "Status";
      case "amount": return "Amount";
      default: return "Most Recent";
    }
  };

  const handleSort = (sortKey) => {
    if (sortBy === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

  const openDetailsModal = (subscription) => {
    setSelectedSubscription(subscription);
    setIsDetailsModalOpen(true);
  };

  const isUpdating = (id) => updatingStatus === id;

  // Stats cards
  const statCards = [
    {
      title: "Total Subscriptions",
      value: stats.total || 0,
      icon: <CreditCard size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Free Users",
      value: stats.free || 0,
      icon: <User size={20} />,
      color: "text-gray-400",
      bgColor: "bg-gray-500/10",
    },
    {
      title: "Pro Users",
      value: stats.pro || 0,
      icon: <Star size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Premium Users",
      value: stats.premium || 0,
      icon: <Crown size={20} />,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  const statusStatCards = [
    {
      title: "Active",
      value: stats.active || 0,
      icon: <CheckCircle size={16} />,
      color: "text-emerald-400",
    },
    {
      title: "Expired",
      value: stats.expired || 0,
      icon: <XCircle size={16} />,
      color: "text-red-400",
    },
    {
      title: "Cancelled",
      value: stats.cancelled || 0,
      icon: <XCircle size={16} />,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Subscriptions
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage user subscriptions and plans
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <UserPlus size={16} />
            Add Subscription
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export
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

      {/* Status Stats */}
      <div className="grid grid-cols-3 gap-4">
        {statusStatCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 transition-all duration-300 hover:border-violet-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{stat.title}</p>
                <p className="text-xl font-bold text-white mt-0.5">{stat.value}</p>
              </div>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by user name or email..."
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
                value={planFilter}
                onChange={setPlanFilter}
                variant="bordered"
                aria-label="Filter by plan"
                placeholder="Plan"
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
                  <Select.Value>{getPlanLabel(planFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Plans"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Plans
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {plans.filter(p => p !== "all").map(plan => {
                      const config = getPlanConfig(plan);
                      return (
                        <ListBox.Item
                          key={plan}
                          id={plan}
                          textValue={config.label}
                          className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            {config.icon}
                            {config.label}
                          </span>
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-[140px]">
              <Select
                className="w-full"
                value={statusFilter}
                onChange={setStatusFilter}
                variant="bordered"
                aria-label="Filter by status"
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
                  <Select.Value>{getStatusLabel(statusFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Statuses"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Statuses
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {statuses.filter(s => s !== "all").map(status => {
                      const config = getStatusConfig(status);
                      return (
                        <ListBox.Item
                          key={status}
                          id={status}
                          textValue={config.label}
                          className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            {config.icon}
                            {config.label}
                          </span>
                          <ListBox.ItemIndicator className="text-violet-400" />
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-[140px]">
              <Select
                className="w-full"
                value={sortBy}
                onChange={setSortBy}
                variant="bordered"
                aria-label="Sort subscriptions"
                placeholder="Sort"
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
                  <Select.Value>{getSortLabel(sortBy)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="recent"
                      textValue="Most Recent"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Most Recent
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="name"
                      textValue="Name A-Z"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Name A-Z
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="plan"
                      textValue="Plan"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Plan
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="status"
                      textValue="Status"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Status
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="amount"
                      textValue="Amount"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Amount
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    User
                    {sortBy === "name" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("plan")}>
                  <div className="flex items-center gap-1">
                    Plan
                    {sortBy === "plan" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-1">
                    Status
                    {sortBy === "status" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("amount")}>
                  <div className="flex items-center gap-1">
                    Amount
                    {sortBy === "amount" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Auto-Renew
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Start Date
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <CreditCard size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No subscriptions found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                sortedSubscriptions.map((sub) => {
                  const planConfig = getPlanConfig(sub.plan);
                  const statusConfig = getStatusConfig(sub.status);
                  const isLoading = isUpdating(sub.id);
                  
                  return (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* User */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {sub.userImage ? (
                              <Image
                                width={40}
                                height={40}
                                src={sub.userImage}
                                alt={sub.userName || "User"}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10';
                                  div.textContent = getInitials(sub.userName);
                                  parent.appendChild(div);
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10">
                                {getInitials(sub.userName)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                              {sub.userName || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-400">{sub.userEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${planConfig.color}`}>
                          {planConfig.icon}
                          {planConfig.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 size={14} className="text-violet-400 animate-spin" />
                            <span className="text-xs text-gray-400">Updating...</span>
                          </div>
                        ) : (
                          <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-emerald-400">
                          {formatCurrency(sub.amount, sub.currency)}
                        </span>
                      </td>

                      {/* Auto-Renew */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full border ${sub.autoRenew ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border-gray-500/20'}`}>
                          {sub.autoRenew ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(sub.startDate)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {/* View Details */}
                          <button
                            onClick={() => openDetailsModal(sub)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Edit Subscription"
                          >
                            <Edit size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Delete Subscription"
                          >
                            <Trash2 size={16} />
                          </button>

                          {/* More Options */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="More Options"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {sortedSubscriptions.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedSubscriptions.length} subscription{sortedSubscriptions.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Subscription Details Modal */}
      {isDetailsModalOpen && selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {selectedSubscription.userImage ? (
                    <Image
                      width={48}
                      height={48}
                      src={selectedSubscription.userImage}
                      alt={selectedSubscription.userName || "User"}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-lg font-semibold ring-2 ring-violet-500/30">
                      {getInitials(selectedSubscription.userName)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedSubscription.userName || "Unknown User"}</h3>
                  <p className="text-sm text-gray-400">{selectedSubscription.userEmail}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedSubscription(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              {/* Status & Plan */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getPlanConfig(selectedSubscription.plan).color}`}>
                  {getPlanConfig(selectedSubscription.plan).icon}
                  {getPlanConfig(selectedSubscription.plan).label}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusConfig(selectedSubscription.status).color}`}>
                  {getStatusConfig(selectedSubscription.status).icon}
                  {getStatusConfig(selectedSubscription.status).label}
                </span>
                <span className="text-sm text-gray-400">
                  Started: {formatDate(selectedSubscription.startDate)}
                </span>
                {selectedSubscription.endDate && (
                  <span className="text-sm text-gray-500">
                    Ends: {formatDate(selectedSubscription.endDate)}
                  </span>
                )}
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Plan</p>
                  <p className="text-sm text-white capitalize">{selectedSubscription.plan}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-sm text-white capitalize">{selectedSubscription.status}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Amount</p>
                  <p className="text-sm text-emerald-400">
                    {formatCurrency(selectedSubscription.amount, selectedSubscription.currency)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                  <p className="text-sm text-white capitalize">{selectedSubscription.paymentMethod || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Auto-Renew</p>
                  <p className="text-sm text-white">{selectedSubscription.autoRenew ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">User Role</p>
                  <p className="text-sm text-white capitalize">{selectedSubscription.role || 'N/A'}</p>
                </div>
              </div>

              {/* Plan Features */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-3">Plan Features</p>
                <div className="space-y-2">
                  {getPlanConfig(selectedSubscription.plan).features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={14} className="text-emerald-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-3">Update Subscription</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedSubscription.id, "active");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedSubscription.id) || selectedSubscription.status === "active"}
                    className="flex-1 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedSubscription.id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Activate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedSubscription.id, "expired");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedSubscription.id) || selectedSubscription.status === "expired"}
                    className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedSubscription.id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XIcon size={16} />
                        Expire
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedSubscription.id, "cancelled");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdating(selectedSubscription.id) || selectedSubscription.status === "cancelled"}
                    className="flex-1 px-4 py-2.5 bg-gray-500/10 text-gray-400 rounded-xl hover:bg-gray-500/20 transition-all duration-200 border border-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating(selectedSubscription.id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XIcon size={16} />
                        Cancel
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleAutoRenewToggle(selectedSubscription.id, selectedSubscription.autoRenew);
                    }}
                    disabled={isUpdating(selectedSubscription.id)}
                    className={`flex-1 px-4 py-2.5 rounded-xl transition-all duration-200 border flex items-center justify-center gap-2 ${
                      selectedSubscription.autoRenew 
                        ? 'bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isUpdating(selectedSubscription.id) ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {selectedSubscription.autoRenew ? (
                          <>Disable Auto-Renew</>
                        ) : (
                          <>Enable Auto-Renew</>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}