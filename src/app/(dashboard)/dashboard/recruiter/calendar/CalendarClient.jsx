// app/dashboard/recruiter/calendar/CalendarClient.js
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

export default function CalendarClient({ initialEvents, initialInterviews, initialUpcomingEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [interviews, setInterviews] = useState(initialInterviews);
  const [upcomingEvents, setUpcomingEvents] = useState(initialUpcomingEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Get days in month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  // Get events for the selected day
  const [selectedDay, setSelectedDay] = useState(new Date());
  const eventsForSelectedDay = getEventsForDay(selectedDay);

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

  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'interview':
        return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
      case 'meeting':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'task':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'interview':
        return <Users size={14} />;
      case 'meeting':
        return <Users size={14} />;
      case 'task':
        return <CheckCircle size={14} />;
      default:
        return <CalendarIcon size={14} />;
    }
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

  const handleAddEvent = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAddEventModalOpen(false);
      toast.success("Event added successfully");
      // Add mock event
      const newEvent = {
        id: `event_${Date.now()}`,
        title: 'New Interview',
        description: 'Interview with candidate',
        date: new Date().toISOString(),
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        type: 'interview',
        status: 'scheduled',
        location: 'Virtual',
        color: '#8B5CF6'
      };
      setEvents([newEvent, ...events]);
    }, 2000);
  };

  const handleDeleteEvent = (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== eventId));
      toast.success("Event deleted successfully");
      setIsEventModalOpen(false);
    }
  };

  // Stats
  const stats = [
    {
      title: "Total Events",
      value: events.length,
      icon: <CalendarIcon size={20} />,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      title: "Interviews Today",
      value: interviews.length,
      icon: <Users size={20} />,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
    },
    {
      title: "Upcoming",
      value: upcomingEvents.length,
      icon: <ClockIcon size={20} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "This Month",
      value: events.filter(e => isSameMonth(new Date(e.date), new Date())).length,
      icon: <CalendarDays size={20} />,
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
            Calendar
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage interviews, meetings, and events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsAddEventModalOpen(true)} className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <Plus size={16} />
            Add Event
          </Button>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
                    const dayEvents = getEventsForDay(day);
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
                          {dayEvents.length > 0 && (
                            <div className="flex gap-0.5 mt-0.5">
                              {dayEvents.slice(0, 3).map((event, idx) => (
                                <div
                                  key={idx}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: event.color || '#8B5CF6' }}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <span className="text-[8px] text-gray-500">+{dayEvents.length - 3}</span>
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
                {events
                  .filter(event => isSameMonth(new Date(event.date), currentDate))
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEventModalOpen(true);
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-14 text-center">
                        <p className="text-xl font-bold text-white">{format(new Date(event.date), "d")}</p>
                        <p className="text-xs text-gray-400">{format(new Date(event.date), "MMM")}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{event.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(event.startTime)}
                          </span>
                          {event.location && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin size={12} />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: event.color || '#8B5CF6' }} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Events for Selected Day */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {format(selectedDay, "EEEE, MMM d")}
              </h3>
              <span className="text-xs text-gray-400">
                {eventsForSelectedDay.length} events
              </span>
            </div>

            {eventsForSelectedDay.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {eventsForSelectedDay.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEventModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(event.startTime)}
                          </span>
                        </div>
                        {event.applicantName && (
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <User size={12} />
                            {event.applicantName}
                          </p>
                        )}
                        {event.jobTitle && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <BriefcaseBusiness size={12} />
                            {event.jobTitle}
                          </p>
                        )}
                      </div>
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: event.color || '#8B5CF6' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon size={32} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No events for this day</p>
                <button
                  onClick={() => setIsAddEventModalOpen(true)}
                  className="mt-3 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Add an event
                </button>
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <>
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                  <Bell size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold text-white">Upcoming</h4>
                </div>
                <div className="space-y-2 mt-3">
                  {upcomingEvents.slice(0, 4).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEventModalOpen(true);
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="text-center min-w-[40px]">
                        <p className="text-sm font-bold text-white">{format(new Date(event.date), "d")}</p>
                        <p className="text-[10px] text-gray-400">{format(new Date(event.date), "MMM")}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{event.title}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {formatTime(event.startTime)}
                        </p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: event.color || '#8B5CF6' }} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {isEventModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getEventTypeColor(selectedEvent.type)}`}>
                  {getEventTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-400">{selectedEvent.type}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsEventModalOpen(false);
                  setSelectedEvent(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <CalendarIcon size={14} />
                  {formatDate(selectedEvent.date)}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock size={14} />
                  {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                </span>
              </div>

              {selectedEvent.description && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-gray-300">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.location && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white flex items-center gap-2">
                    <MapPin size={14} className="text-violet-400" />
                    {selectedEvent.location}
                  </p>
                </div>
              )}

              {selectedEvent.applicantName && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Applicant</p>
                  <p className="text-sm text-white">{selectedEvent.applicantName}</p>
                </div>
              )}

              {selectedEvent.jobTitle && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Job</p>
                  <p className="text-sm text-white">{selectedEvent.jobTitle}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  className="flex-1 px-4 py-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/10 flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold text-white">Add New Event</h3>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Event Title</label>
                <Input
                  placeholder="Enter event title"
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
                      "transition-all",
                      "duration-200",
                    ],
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Type</label>
                <Select
                  className="w-full"
                  value="interview"
                  variant="bordered"
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
                  }}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator className="text-gray-400" />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                      <ListBox.Item id="interview" textValue="Interview" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                        Interview
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item id="meeting" textValue="Meeting" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                        Meeting
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                      <ListBox.Item id="task" textValue="Task" className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200">
                        Task
                        <ListBox.ItemIndicator className="text-violet-400" />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Date & Time</label>
                <Input
                  type="datetime-local"
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
                      "transition-all",
                      "duration-200",
                    ],
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
                <Input
                  placeholder="Enter location"
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
                      "transition-all",
                      "duration-200",
                    ],
                  }}
                />
              </div>
              <Button
                onClick={handleAddEvent}
                isLoading={loading}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <Plus size={16} />
                Add Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}