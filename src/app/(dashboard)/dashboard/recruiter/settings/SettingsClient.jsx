// app/dashboard/recruiter/settings/SettingsClient.jsx
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  Switch,
} from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  UserCog,
  Save,
  Eye,
  EyeOff,
  Camera,
  LogOut,
  Trash2,
  ChevronRight,
  Sparkles,
  Building2,
  MapPin,
  Link as LinkIcon,
  Palette,
  Globe,
  BriefcaseBusiness,
  Users,
  FileText,
  Calendar,
  CreditCard,
  Store,
  AlertCircle,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Sun icon for theme toggle
const Sun = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export default function SettingsClient({ initialUserData }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(initialUserData || {});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    company: userData?.company || "",
    position: userData?.position || "",
    bio: userData?.bio || "",
    location: userData?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Company settings
  const [companySettings, setCompanySettings] = useState({
    companyName: userData?.companyName || "",
    companyWebsite: userData?.companyWebsite || "",
    companyIndustry: userData?.companyIndustry || "",
    companySize: userData?.companySize || "",
    companyLocation: userData?.companyLocation || "",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    candidateAlerts: true,
    marketingEmails: false,
    pushNotifications: true,
    weeklyDigest: true,
    interviewReminders: true,
  });

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "dark",
    fontSize: "medium",
    accentColor: "violet",
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: true,
    showPhone: false,
    showCompany: true,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account", label: "Account", icon: <UserCog size={18} /> },
    { id: "company", label: "Company", icon: <Building2 size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanySettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCompany = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Company settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update company settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Notification settings updated!");
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAppearance = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Appearance settings updated!");
    } catch (error) {
      toast.error("Failed to update appearance settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Privacy settings updated!");
    } catch (error) {
      toast.error("Failed to update privacy settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      toast.success("Logged out successfully");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion requested");
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-6 rounded-2xl bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent border border-white/10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full ring-4 ring-violet-500/30 overflow-hidden bg-linear-to-br from-violet-500/20 to-fuchsia-500/20">
            {userData?.image ? (
              <Image
                src={userData.image}
                alt={userData.name || "User"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl font-semibold text-white">
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg hover:scale-105 transition-all duration-200">
            <Camera size={16} />
          </button>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">
            {userData?.fullName || userData?.name || "User"}
          </h3>
          <p className="text-sm text-gray-400">{userData?.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {userData?.role || "Recruiter"}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Full Name
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Email Address
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Phone Number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Position / Title
            </label>
            <Input
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="e.g., Senior Recruiter"
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Bio / About
          </label>
          <Input
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself as a recruiter"
            variant="bordered"
            classNames={{
              input: "text-white placeholder:text-gray-500",
              inputWrapper: [
                "border-white/10",
                "bg-white/5",
                "hover:border-violet-500/50",
                "focus-within:border-violet-500",
                "focus-within:ring-1",
                "focus-within:ring-violet-500/30",
                "rounded-xl",
                "transition-all",
                "duration-200",
                "min-h-[80px]",
              ],
            }}
          />
        </div>

        <Button
          onClick={handleSaveProfile}
          isLoading={loading}
          className="w-full md:w-auto bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Save size={16} />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Building2 size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Company Settings</h3>
            <p className="text-sm text-gray-400">Manage your company information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Company Name
            </label>
            <Input
              name="companyName"
              value={companySettings.companyName}
              onChange={handleCompanyChange}
              placeholder="Enter company name"
              startContent={<Building2 size={16} className="text-gray-400" />}
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Website
              </label>
              <Input
                name="companyWebsite"
                value={companySettings.companyWebsite}
                onChange={handleCompanyChange}
                placeholder="https://example.com"
                startContent={<Globe size={16} className="text-gray-400" />}
                variant="bordered"
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                    "transition-all",
                    "duration-200",
                  ],
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Industry
              </label>
              <Input
                name="companyIndustry"
                value={companySettings.companyIndustry}
                onChange={handleCompanyChange}
                placeholder="e.g., Technology"
                variant="bordered"
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                    "transition-all",
                    "duration-200",
                  ],
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Company Size
              </label>
              <Select
                value={companySettings.companySize}
                onChange={(value) => setCompanySettings(prev => ({ ...prev, companySize: value }))}
                variant="bordered"
                classNames={{
                  trigger: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "data-[focus=true]:border-violet-500",
                    "data-[focus=true]:ring-1",
                    "data-[focus=true]:ring-violet-500/30",
                    "rounded-xl",
                    "h-10",
                    "transition-all",
                    "duration-200",
                  ],
                  value: "text-white",
                }}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select company size" />
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                    <ListBox.Item id="1-10" textValue="1-10 employees" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                      1-10 employees
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item id="11-50" textValue="11-50 employees" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                      11-50 employees
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item id="51-200" textValue="51-200 employees" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                      51-200 employees
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item id="201-1000" textValue="201-1000 employees" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                      201-1000 employees
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                    <ListBox.Item id="1000+" textValue="1000+ employees" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                      1000+ employees
                      <ListBox.ItemIndicator className="text-violet-400" />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Location
              </label>
              <Input
                name="companyLocation"
                value={companySettings.companyLocation}
                onChange={handleCompanyChange}
                placeholder="Enter company location"
                startContent={<MapPin size={16} className="text-gray-400" />}
                variant="bordered"
                classNames={{
                  input: "text-white placeholder:text-gray-500",
                  inputWrapper: [
                    "border-white/10",
                    "bg-white/5",
                    "hover:border-violet-500/50",
                    "focus-within:border-violet-500",
                    "focus-within:ring-1",
                    "focus-within:ring-violet-500/30",
                    "rounded-xl",
                    "transition-all",
                    "duration-200",
                  ],
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleSaveCompany}
            isLoading={loading}
            className="w-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            <Save size={16} />
            Save Company Settings
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Lock size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Change Password</h3>
            <p className="text-sm text-gray-400">Update your password to keep your account secure</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Current Password
            </label>
            <Input
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
              endContent={
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
                </button>
              }
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              New Password
            </label>
            <Input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Confirm New Password
            </label>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              endContent={
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
                </button>
              }
              variant="bordered"
              classNames={{
                input: "text-white placeholder:text-gray-500",
                inputWrapper: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "focus-within:border-violet-500",
                  "focus-within:ring-1",
                  "focus-within:ring-violet-500/30",
                  "rounded-xl",
                  "transition-all",
                  "duration-200",
                ],
              }}
            />
          </div>

          <Button
            onClick={handleChangePassword}
            isLoading={loading}
            className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            <Lock size={16} />
            Update Password
          </Button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-500/10">
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
            <p className="text-sm text-gray-400">Permanent actions that cannot be undone</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-red-400" />
              <span className="text-white">Log Out</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-red-500/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-red-400" />
              <span className="text-red-400">Delete Account</span>
            </div>
            <ChevronRight size={16} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Bell size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            <p className="text-sm text-gray-400">Choose what notifications you want to receive</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications via email</p>
            </div>
            <Switch
              isSelected={notificationSettings.emailNotifications}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, emailNotifications: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Candidate Alerts</p>
              <p className="text-sm text-gray-400">Get notified when candidates apply</p>
            </div>
            <Switch
              isSelected={notificationSettings.candidateAlerts}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, candidateAlerts: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Application Updates</p>
              <p className="text-sm text-gray-400">Get updates on job postings</p>
            </div>
            <Switch
              isSelected={notificationSettings.applicationUpdates}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, applicationUpdates: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Interview Reminders</p>
              <p className="text-sm text-gray-400">Get reminders for scheduled interviews</p>
            </div>
            <Switch
              isSelected={notificationSettings.interviewReminders}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, interviewReminders: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Weekly Digest</p>
              <p className="text-sm text-gray-400">Receive weekly summary of activity</p>
            </div>
            <Switch
              isSelected={notificationSettings.weeklyDigest}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, weeklyDigest: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-400">Receive promotional offers and updates</p>
            </div>
            <Switch
              isSelected={notificationSettings.marketingEmails}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, marketingEmails: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in browser</p>
            </div>
            <Switch
              isSelected={notificationSettings.pushNotifications}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, pushNotifications: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>
        </div>

        <Button
          onClick={handleSaveNotifications}
          isLoading={loading}
          className="mt-6 w-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Save size={16} />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Palette size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
            <p className="text-sm text-gray-400">Customize how the application looks</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: "dark" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.theme === "dark"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-[#050816] border border-white/10" />
                <p className="text-xs text-gray-400 mt-1">Dark</p>
              </button>
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: "light" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.theme === "light"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-white border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1">Light</p>
              </button>
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: "system" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.theme === "system"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-linear-to-br from-white to-[#050816] border border-gray-300" />
                <p className="text-xs text-gray-400 mt-1">System</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Font Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "small" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.fontSize === "small"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-xs text-white">Small</span>
              </button>
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "medium" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.fontSize === "medium"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-base text-white">Medium</span>
              </button>
              <button
                onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "large" }))}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  appearanceSettings.fontSize === "large"
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-lg text-white">Large</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Accent Color
            </label>
            <div className="flex gap-3">
              {["violet", "fuchsia", "emerald", "blue", "orange", "pink"].map((color) => (
                <button
                  key={color}
                  onClick={() => setAppearanceSettings(prev => ({ ...prev, accentColor: color }))}
                  className={`w-10 h-10 rounded-full transition-all duration-200 ${
                    appearanceSettings.accentColor === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-[#050816] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color === "violet" ? "#8B5CF6" : color === "fuchsia" ? "#D946EF" : color === "emerald" ? "#34D399" : color === "blue" ? "#60A5FA" : color === "orange" ? "#FB923C" : "#EC4899" }}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSaveAppearance}
          isLoading={loading}
          className="mt-6 w-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Save size={16} />
          Save Appearance Settings
        </Button>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Shield size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
            <p className="text-sm text-gray-400">Control who can see your information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Profile Visibility
            </label>
            <Select
              value={privacySettings.profileVisibility}
              onChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}
              variant="bordered"
              classNames={{
                trigger: [
                  "border-white/10",
                  "bg-white/5",
                  "hover:border-violet-500/50",
                  "data-[focus=true]:border-violet-500",
                  "data-[focus=true]:ring-1",
                  "data-[focus=true]:ring-violet-500/30",
                  "rounded-xl",
                  "h-10",
                  "transition-all",
                  "duration-200",
                ],
                value: "text-white",
              }}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator className="text-gray-400" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                  <ListBox.Item
                    id="public"
                    textValue="Public"
                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                  >
                    Public
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item
                    id="private"
                    textValue="Private"
                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                  >
                    Private
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                  <ListBox.Item
                    id="recruiters"
                    textValue="Recruiters Only"
                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                  >
                    Recruiters Only
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Show Email</p>
              <p className="text-sm text-gray-400">Display email on your profile</p>
            </div>
            <Switch
              isSelected={privacySettings.showEmail}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, showEmail: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Show Phone Number</p>
              <p className="text-sm text-gray-400">Display phone number on your profile</p>
            </div>
            <Switch
              isSelected={privacySettings.showPhone}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, showPhone: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            <div>
              <p className="text-white font-medium">Show Company</p>
              <p className="text-sm text-gray-400">Display your company on your profile</p>
            </div>
            <Switch
              isSelected={privacySettings.showCompany}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, showCompany: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-linear-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>
        </div>

        <Button
          onClick={handleSavePrivacy}
          isLoading={loading}
          className="mt-6 w-full bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Save size={16} />
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Settings Layout with Tabs */}
      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="border-b border-white/10 px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 text-white border border-fuchsia-500/20"
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
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "company" && renderCompanyTab()}
          {activeTab === "account" && renderAccountTab()}
          {activeTab === "notifications" && renderNotificationsTab()}
          {activeTab === "appearance" && renderAppearanceTab()}
          {activeTab === "privacy" && renderPrivacyTab()}
        </div>
      </div>
    </div>
  );
}