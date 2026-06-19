// app/dashboard/seeker/calendar/CalendarClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  CalendarDays,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  BriefcaseBusiness,
  User,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Video,
  Phone,
  Mail,
  MessageSquare,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  X,
  Loader2,
  Filter,
  Download,
  Calendar as CalendarIcon,
  List,
  Grid,
  Bell,
  AlertCircle,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

export default function CalendarClient({ initialInterviews, initialUpcomingInterviews, initialStats }) {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [upcomingInterviews, setUpcomingInterviews] = useState(initialUpcomingInterviews);
  const [stats] = useState(initialStats);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Get days in month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get interviews for a specific day
  const getInterviewsForDay = (day) => {
    return interviews.filter(interview => isSameDay(new Date(interview.date), day));
  };

  // Get interviews for the selected day
  const [selectedDay, setSelectedDay] = useState(new Date());
  const interviewsForSelectedDay = getInterviewsForDay(selectedDay);

  // Navigate months
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'completed':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'cancelled':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return <ClockIcon size={14} />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'cancelled':
        return <XCircle size={14} />;
      default:
        return <ClockIcon size={14} />;
    }
  };

  const handleAddInterview = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Interview scheduled successfully");
    }, 2000);
  };

  const handleDeleteInterview = (interviewId) => {
    if (confirm("Are you sure you want to cancel this interview?")) {
      setInterviews(interviews.filter(i => i.id !== interviewId));
      toast.success("Interview cancelled successfully");
      setIsInterviewModalOpen(false);
    }
  };

  // Stats cards
  const statCards = [
    {
      title: "Total Interviews",
      value: stats.total || 0,
      icon: <CalendarIcon size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Upcoming",
      value: stats.upcoming || 0,
      icon: <ClockIcon size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "This Week",
      value: stats.thisWeek || 0,
      icon: <CalendarDays size={20} />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      icon: <CheckCircle size={20} />,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Interview Calendar
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and track your upcoming interviews
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <Plus size={16} />
            Schedule Interview
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-white">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-all duration-200"
                >
                  Today
                </button>
                <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-1">
                  <button
                    onClick={() => setViewMode("month")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${
                      viewMode === "month" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${
                      viewMode === "list" ? "bg-violet-500/20 text-violet-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            {viewMode === "month" ? (
              <>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square p-1" />
                  ))}
                  {daysInMonth.map((day) => {
                    const dayInterviews = getInterviewsForDay(day);
                    const isSelected = isSameDay(day, selectedDay);
                    const isTodayDay = isToday(day);
                    
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDay(day)}
                        className={`aspect-square p-1 rounded-xl transition-all duration-200 hover:bg-white/5 ${
                          isSelected ? 'bg-violet-500/20 ring-2 ring-violet-500/50' : ''
                        } ${isTodayDay ? 'border border-violet-500/50' : ''}`}
                      >
                        <div className="h-full flex flex-col items-center">
                          <span className={`text-sm font-medium ${
                            isSelected ? 'text-violet-400' : 
                            isTodayDay ? 'text-violet-400' : 'text-white'
                          }`}>
                            {format(day, "d")}
                          </span>
                          {dayInterviews.length > 0 && (
                            <div className="flex gap-0.5 mt-0.5">
                              {dayInterviews.slice(0, 2).map((interview, idx) => (
                                <div
                                  key={idx}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: interview.color || '#8B5CF6' }}
                                />
                              ))}
                              {dayInterviews.length > 2 && (
                                <span className="text-[8px] text-gray-500">+{dayInterviews.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              // List View
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {interviews
                  .filter(interview => isSameMonth(new Date(interview.date), currentDate))
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((interview) => (
                    <div
                      key={interview.id}
                      onClick={() => {
                        setSelectedInterview(interview);
                        setIsInterviewModalOpen(true);
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-14 text-center">
                        <p className="text-xl font-bold text-white">{format(new Date(interview.date), "d")}</p>
                        <p className="text-xs text-gray-400">{format(new Date(interview.date), "MMM")}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{interview.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400">{interview.companyName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(interview.startTime)}
                          </span>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: interview.color || '#8B5CF6' }} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Upcoming Interviews */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Upcoming Interviews</h3>
              <span className="text-xs text-gray-400">
                {upcomingInterviews.length} scheduled
              </span>
            </div>

            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {upcomingInterviews.slice(0, 6).map((interview) => (
                  <div
                    key={interview.id}
                    onClick={() => {
                      setSelectedInterview(interview);
                      setIsInterviewModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-center min-w-[40px]">
                        <p className="text-sm font-bold text-white">{format(new Date(interview.date), "d")}</p>
                        <p className="text-[10px] text-gray-400">{format(new Date(interview.date), "MMM")}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-violet-400 transition-colors">
                          {interview.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{interview.companyName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} />
                            {formatTime(interview.startTime)}
                          </span>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: interview.color || '#8B5CF6' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon size={32} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No upcoming interviews</p>
                <p className="text-xs text-gray-500">Interviews will appear here when scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interview Details Modal */}
      {isInterviewModalOpen && selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(selectedInterview.status)}`}>
                  {getStatusIcon(selectedInterview.status)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedInterview.title}</h3>
                  <p className="text-sm text-gray-400">{selectedInterview.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsInterviewModalOpen(false);
                  setSelectedInterview(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(selectedInterview.status)}`}>
                  {selectedInterview.status}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <CalendarIcon size={14} />
                  {formatDate(selectedInterview.date)}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock size={14} />
                  {formatTime(selectedInterview.startTime)} - {formatTime(selectedInterview.endTime)}
                </span>
              </div>

              {selectedInterview.description && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-gray-300">{selectedInterview.description}</p>
                </div>
              )}

              {selectedInterview.location && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white flex items-center gap-2">
                    <MapPin size={14} className="text-violet-400" />
                    {selectedInterview.location}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Job</p>
                <p className="text-sm text-white">{selectedInterview.jobTitle}</p>
              </div>

              {selectedInterview.recruiterName && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Recruiter</p>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-violet-400" />
                    <div>
                      <p className="text-sm text-white">{selectedInterview.recruiterName}</p>
                      {selectedInterview.recruiterEmail && (
                        <p className="text-xs text-gray-400">{selectedInterview.recruiterEmail}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  className="flex-1 px-4 py-2.5 bg-violet-500/10 text-violet-400 rounded-xl hover:bg-violet-500/20 transition-all duration-200 border border-violet-500/20 flex items-center justify-center gap-2"
                >
                  <Video size={16} />
                  Join Interview
                </button>
                <button
                  onClick={() => handleDeleteInterview(selectedInterview.id)}
                  className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}