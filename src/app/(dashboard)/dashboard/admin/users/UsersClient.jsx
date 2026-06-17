// app/dashboard/admin/users/UsersClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  Users,
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

// Status configuration with icons and colors
const STATUS_CONFIG = {
  active: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <CheckCircle size={14} />,
    label: "Active"
  },
  inactive: {
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    icon: <Clock size={14} />,
    label: "Inactive"
  },
  suspended: {
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: <XCircle size={14} />,
    label: "Suspended"
  },
  pending: {
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: <Clock size={14} />,
    label: "Pending"
  }
};

// Role configuration with icons and colors
const ROLE_CONFIG = {
  admin: {
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    icon: <Shield size={14} />,
    label: "Admin"
  },
  recruiter: {
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    icon: <BriefcaseBusiness size={14} />,
    label: "Recruiter"
  },
  seeker: {
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: <User size={14} />,
    label: "Seeker"
  }
};

// Plan configuration
const PLAN_CONFIG = {
  free: {
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    icon: <User size={12} />,
    label: "Free"
  },
  pro: {
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: <Star size={12} />,
    label: "Pro"
  },
  premium: {
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    icon: <Crown size={12} />,
    label: "Premium"
  }
};

export default function UsersClient({ initialUsers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [sortDirection, setSortDirection] = useState("desc");
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Get unique values for filters
  const roles = ["all", ...new Set(users.map(u => u.role).filter(Boolean))];
  const statuses = ["all", ...new Set(users.map(u => u.status).filter(Boolean))];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "recent") {
      comparison = new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "email") {
      comparison = (a.email || "").localeCompare(b.email || "");
    } else if (sortBy === "role") {
      comparison = (a.role || "").localeCompare(b.role || "");
    } else if (sortBy === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle Activate User
  const handleActivateUser = async (userId) => {
    setUpdatingStatus(userId);
    try {
      // Update local state immediately for better UX
      setUsers(users.map(u => 
        u._id === userId ? { ...u, status: "active" } : u
      ));
      toast.success("User activated successfully");
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}/activate`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
    } catch (error) {
      console.error('Error activating user:', error);
      // Revert on error
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, status: user.status } : u
        ));
      }
      toast.error("Failed to activate user");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle Suspend User
  const handleSuspendUser = async (userId) => {
    setUpdatingStatus(userId);
    try {
      setUsers(users.map(u => 
        u._id === userId ? { ...u, status: "suspended" } : u
      ));
      toast.success("User suspended successfully");
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}/suspend`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
    } catch (error) {
      console.error('Error suspending user:', error);
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, status: user.status } : u
        ));
      }
      toast.error("Failed to suspend user");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle Inactivate User
  const handleInactivateUser = async (userId) => {
    setUpdatingStatus(userId);
    try {
      setUsers(users.map(u => 
        u._id === userId ? { ...u, status: "inactive" } : u
      ));
      toast.success("User inactivated successfully");
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}/inactivate`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
    } catch (error) {
      console.error('Error inactivating user:', error);
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, status: user.status } : u
        ));
      }
      toast.error("Failed to inactivate user");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    setUpdatingStatus(userId);
    try {
      // Remove user from local state
      setUsers(users.filter(u => u._id !== userId));
      toast.success("User deleted successfully");
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}`, {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
    } catch (error) {
      console.error('Error deleting user:', error);
      // Revert - add user back
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers([...users, user]);
      }
      toast.error("Failed to delete user");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle Role Change
  const handleRoleChange = async (userId, newRole) => {
    setUpdatingStatus(userId);
    try {
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      toast.success(`User role updated to ${ROLE_CONFIG[newRole]?.label || newRole}`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}/role`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: newRole }),
      // });
      
    } catch (error) {
      console.error('Error updating role:', error);
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, role: user.role } : u
        ));
      }
      toast.error("Failed to update user role");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle Plan Change
  const handlePlanChange = async (userId, newPlan) => {
    setUpdatingStatus(userId);
    try {
      setUsers(users.map(u => 
        u._id === userId ? { ...u, plan: newPlan } : u
      ));
      toast.success(`User plan updated to ${PLAN_CONFIG[newPlan]?.label || newPlan}`);
      
      // API Call - Replace with your actual API endpoint
      // const response = await fetch(`/api/admin/users/${userId}/plan`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plan: newPlan }),
      // });
      
    } catch (error) {
      console.error('Error updating plan:', error);
      const user = users.find(u => u._id === userId);
      if (user) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, plan: user.plan } : u
        ));
      }
      toast.error("Failed to update user plan");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.active;
  };

  const getRoleConfig = (role) => {
    return ROLE_CONFIG[role?.toLowerCase()] || ROLE_CONFIG.seeker;
  };

  const getPlanConfig = (plan) => {
    return PLAN_CONFIG[plan?.toLowerCase()] || PLAN_CONFIG.free;
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

  const getStatusLabel = (status) => {
    if (status === "all") return "All Statuses";
    return getStatusConfig(status).label;
  };

  const getRoleLabel = (role) => {
    if (role === "all") return "All Roles";
    return getRoleConfig(role).label;
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case "recent": return "Most Recent";
      case "name": return "Name A-Z";
      case "email": return "Email A-Z";
      case "role": return "Role";
      case "status": return "Status";
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

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const isUpdating = (userId) => updatingStatus === userId;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Users
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all users on the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <UserPlus size={16} />
            Add User
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
          <p className="text-xs text-gray-400 mt-1">All users</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Seekers</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {users.filter(u => u.role?.toLowerCase() === "seeker").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Job seekers</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Recruiters</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {users.filter(u => u.role?.toLowerCase() === "recruiter").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Companies</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <p className="text-xs text-gray-400">Admins</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {users.filter(u => u.role?.toLowerCase() === "admin").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Platform admins</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-violet-500/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search users by name, email, or role..."
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
                value={roleFilter}
                onChange={setRoleFilter}
                variant="bordered"
                aria-label="Filter by role"
                placeholder="Role"
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
                  <Select.Value>{getRoleLabel(roleFilter)}</Select.Value>
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item
                      id="all"
                      textValue="All Roles"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      All Roles
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    {roles.filter(r => r !== "all").map(role => {
                      const config = getRoleConfig(role);
                      return (
                        <ListBox.Item
                          key={role}
                          id={role}
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
                aria-label="Sort users"
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
                      id="email"
                      textValue="Email A-Z"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Email A-Z
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item
                      id="role"
                      textValue="Role"
                      className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                    >
                      Role
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
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
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
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("email")}>
                  <div className="flex items-center gap-1">
                    Email
                    {sortBy === "email" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("role")}>
                  <div className="flex items-center gap-1">
                    Role
                    {sortBy === "role" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Plan
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-1">
                    Status
                    {sortBy === "status" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort("recent")}>
                  <div className="flex items-center gap-1">
                    Joined
                    {sortBy === "recent" && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <Users size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No users found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => {
                  const statusConfig = getStatusConfig(user.status);
                  const roleConfig = getRoleConfig(user.role);
                  const planConfig = getPlanConfig(user.plan);
                  const isLoading = isUpdating(user._id);
                  
                  return (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group">
                      {/* User - Name, Avatar */}
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {user.image ? (
                              <Image
                                width={40}
                                height={40}
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10';
                                  div.textContent = getInitials(user.name);
                                  parent.appendChild(div);
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-xs font-semibold ring-1 ring-white/10">
                                {getInitials(user.name)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                              {user.name || "Unknown"}
                            </p>
                            {user.emailVerified ? (
                              <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                                <CheckCircle size={10} />
                                Verified
                              </span>
                            ) : (
                              <span className="text-[10px] text-yellow-400 flex items-center gap-0.5">
                                <Clock size={10} />
                                Unverified
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{user.email || "N/A"}</span>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${roleConfig.color}`}>
                          {roleConfig.icon}
                          {roleConfig.label}
                        </span>
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

                      {/* Joined Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{formatDate(user.createdAt)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {/* View Profile */}
                          <Link href={`/profile/${user._id}`}>
                            <button
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                              title="View Profile"
                            >
                              <UserCircle size={16} />
                            </button>
                          </Link>

                          {/* View Details */}
                          <button
                            onClick={() => openDetailsModal(user)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            title="Edit User"
                          >
                            <Edit size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={isLoading}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete User"
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
        {sortedUsers.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-gray-400">
              Showing {sortedUsers.length} user{sortedUsers.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {isDetailsModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {selectedUser.image ? (
                    <Image
                      width={48}
                      height={48}
                      src={selectedUser.image}
                      alt={selectedUser.name || "User"}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-white text-lg font-semibold ring-2 ring-violet-500/30">
                      {getInitials(selectedUser.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedUser.name || "Unknown User"}</h3>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedUser(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-6">
              {/* Status & Date */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getStatusConfig(selectedUser.status).color}`}>
                  {getStatusConfig(selectedUser.status).icon}
                  {getStatusConfig(selectedUser.status).label}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getRoleConfig(selectedUser.role).color}`}>
                  {getRoleConfig(selectedUser.role).icon}
                  {getRoleConfig(selectedUser.role).label}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${getPlanConfig(selectedUser.plan).color}`}>
                  {getPlanConfig(selectedUser.plan).icon}
                  {getPlanConfig(selectedUser.plan).label}
                </span>
                <span className="text-sm text-gray-400">
                  Joined: {formatDate(selectedUser.createdAt)}
                </span>
                {selectedUser.updatedAt && selectedUser.updatedAt !== selectedUser.createdAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {formatDate(selectedUser.updatedAt)}
                  </span>
                )}
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Full Name</p>
                  <p className="text-sm text-white">{selectedUser.name || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <p className="text-sm text-white">{selectedUser.email || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Role</p>
                  <p className="text-sm text-white capitalize">{selectedUser.role || "N/A"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Plan</p>
                  <p className="text-sm text-white capitalize">{selectedUser.plan || "Free"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Email Verified</p>
                  <p className="text-sm text-white">{selectedUser.emailVerified ? "Yes" : "No"}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">User ID</p>
                  <p className="text-sm text-gray-400 text-xs break-all">{selectedUser._id || "N/A"}</p>
                </div>
              </div>

              {/* Status Update - Only for non-admin users */}
              {selectedUser.role?.toLowerCase() !== "admin" && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-3">Update Status</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleActivateUser(selectedUser._id);
                        setIsDetailsModalOpen(false);
                      }}
                      disabled={isUpdating(selectedUser._id) || selectedUser.status === "active"}
                      className="flex-1 cursor-pointer px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUpdating(selectedUser._id) ? (
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
                        handleSuspendUser(selectedUser._id);
                        setIsDetailsModalOpen(false);
                      }}
                      disabled={isUpdating(selectedUser._id) || selectedUser.status === "suspended"}
                      className="flex-1 cursor-pointer px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUpdating(selectedUser._id) ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <XIcon size={16} />
                          Suspend
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleInactivateUser(selectedUser._id);
                        setIsDetailsModalOpen(false);
                      }}
                      disabled={isUpdating(selectedUser._id) || selectedUser.status === "inactive"}
                      className="flex-1 cursor-pointer px-4 py-2.5 bg-gray-500/10 text-gray-400 rounded-xl hover:bg-gray-500/20 transition-all duration-200 border border-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUpdating(selectedUser._id) ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Clock size={16} />
                          Inactivate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}