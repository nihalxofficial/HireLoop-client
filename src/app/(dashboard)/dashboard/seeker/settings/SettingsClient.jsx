// app/dashboard/seeker/settings/SettingsClient.js
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
  Moon,
  Globe,
  Shield,
  CreditCard,
  UserCog,
  Save,
  X,
  Check,
  AlertCircle,
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SettingsClient({ initialUserData }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(initialUserData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    bio: userData?.bio || "",
    location: userData?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    marketingEmails: false,
    pushNotifications: true,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account", label: "Account", icon: <UserCog size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // await updateUserProfile(formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
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
      // In a real app, this would be an API call
      // await changePassword(formData.currentPassword, formData.newPassword);
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
      // In a real app, this would be an API call
      // await updateNotificationSettings(notificationSettings);
      toast.success("Notification settings updated!");
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // await updatePrivacySettings(privacySettings);
      toast.success("Privacy settings updated!");
    } catch (error) {
      toast.error("Failed to update privacy settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // In a real app, this would be an API call
    // await authClient.signOut();
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion requested");
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="relative">
          <Image
            width={100}
            height={100}
            src={userData?.avatar || userData?.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
            alt={userData?.fullName || userData?.name || "User"}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-violet-500/30"
          />
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg hover:scale-105 transition-all duration-200">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            {userData?.fullName || userData?.name || "User"}
          </h3>
          <p className="text-sm text-gray-400">{userData?.email}</p>
          <p className="text-xs text-violet-400 capitalize mt-1">Role: {userData?.role || "Seeker"}</p>
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
              Location
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
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

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Bio / About
          </label>
          <Input
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
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

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSaveProfile}
            isLoading={loading}
            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            <Save size={16} />
            Save Changes
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lock size={18} className="text-violet-400" />
          Change Password
        </h3>

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
            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            <Lock size={16} />
            Change Password
          </Button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-3">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
          
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-red-400" />
                <span className="text-white">Log Out</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-red-500/10 transition-all duration-200 text-left"
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
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell size={18} className="text-violet-400" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications via email</p>
            </div>
            <Switch
              isSelected={notificationSettings.emailNotifications}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, emailNotifications: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Job Alerts</p>
              <p className="text-sm text-gray-400">Get notified about new matching jobs</p>
            </div>
            <Switch
              isSelected={notificationSettings.jobAlerts}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, jobAlerts: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Application Updates</p>
              <p className="text-sm text-gray-400">Get updates on your applications</p>
            </div>
            <Switch
              isSelected={notificationSettings.applicationUpdates}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, applicationUpdates: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-400">Receive promotional offers and updates</p>
            </div>
            <Switch
              isSelected={notificationSettings.marketingEmails}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, marketingEmails: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in browser</p>
            </div>
            <Switch
              isSelected={notificationSettings.pushNotifications}
              onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, pushNotifications: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>
        </div>

        <Button
          onClick={handleSaveNotifications}
          isLoading={loading}
          className="mt-6 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Save size={16} />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-violet-400" />
          Privacy Settings
        </h3>

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
                    id="connections"
                    textValue="Connections Only"
                    className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                  >
                    Connections Only
                    <ListBox.ItemIndicator className="text-violet-400" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Show Email</p>
              <p className="text-sm text-gray-400">Display email on your profile</p>
            </div>
            <Switch
              isSelected={privacySettings.showEmail}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, showEmail: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-white font-medium">Show Phone Number</p>
              <p className="text-sm text-gray-400">Display phone number on your profile</p>
            </div>
            <Switch
              isSelected={privacySettings.showPhone}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, showPhone: value }))}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-gradient-to-r from-fuchsia-500 to-violet-600",
              }}
            />
          </div>
        </div>

        <Button
          onClick={handleSavePrivacy}
          isLoading={loading}
          className="mt-6 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
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

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="sticky top-20 space-y-1 p-2 rounded-2xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
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

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "account" && renderAccountTab()}
            {activeTab === "notifications" && renderNotificationsTab()}
            {activeTab === "privacy" && renderPrivacyTab()}
          </div>
        </div>
      </div>
    </div>
  );
}