// app/dashboard/recruiter/messages/MessagesClient.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Avatar,
} from "@heroui/react";
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  X,
  Check,
  CheckCheck,
  Clock,
  User,
  Mail,
  Calendar,
  BriefcaseBusiness,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function MessagesClient({ 
  initialConversations, 
  initialContacts, 
  initialMessages,
  recruiterName,
  recruiterId 
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation?.messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: `msg_${Date.now()}`,
      senderId: recruiterId,
      senderName: recruiterName || 'Recruiter',
      senderAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiterName || 'Recruiter')}&background=8B5CF6&color=fff&size=64`,
      receiverId: selectedConversation.applicantId,
      receiverName: selectedConversation.applicantName,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false
    };

    // Update messages
    setMessages([...messages, message]);

    // Update conversation
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            lastMessage: newMessage.trim(),
            lastMessageTime: new Date().toISOString(),
            messages: [...(conv.messages || []), message]
          }
        : conv
    ));

    // Update selected conversation
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: newMessage.trim(),
      lastMessageTime: new Date().toISOString(),
      messages: [...(selectedConversation.messages || []), message]
    });

    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: `msg_${Date.now() + 1}`,
        senderId: selectedConversation.applicantId,
        senderName: selectedConversation.applicantName,
        senderAvatar: selectedConversation.applicantAvatar,
        receiverId: recruiterId,
        receiverName: recruiterName || 'Recruiter',
        content: "Thank you for your message! I'll review it and get back to you shortly.",
        timestamp: new Date().toISOString(),
        isRead: true
      };
      
      setMessages([...messages, message, reply]);
      
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: reply.content,
              lastMessageTime: reply.timestamp,
              messages: [...(conv.messages || []), message, reply]
            }
          : conv
      ));

      setSelectedConversation(prev => ({
        ...prev,
        lastMessage: reply.content,
        lastMessageTime: reply.timestamp,
        messages: [...(prev?.messages || []), message, reply]
      }));

      toast.success(`Reply from ${selectedConversation.applicantName}`);
    }, 2000);
  };

  // Handle file attachment
  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File "${file.name}" attached successfully`);
    }
    e.target.value = '';
  };

  // Format date for message timestamps
  const formatMessageTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (diff < 172800000) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "reviewing":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "shortlisted":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "interview":
        return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      case "rejected":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "hired":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Messages
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Communicate with applicants and candidates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
            <MessageSquare size={16} />
            New Message
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden h-[calc(100vh-16rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="lg:col-span-1 border-r border-white/10 flex flex-col h-full">
            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <Input
                placeholder="Search conversations..."
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

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full flex items-start gap-3 p-4 hover:bg-white/5 transition-all duration-200 border-b border-white/5 ${
                      selectedConversation?.id === conv.id ? 'bg-white/10 border-l-4 border-l-violet-500' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Image
                        width={48}
                        height={48}
                        src={conv.applicantAvatar}
                        alt={conv.applicantName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                      />
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-semibold text-white">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white truncate">
                          {conv.applicantName}
                        </p>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatMessageTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{conv.jobTitle}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {conv.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageSquare size={32} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No conversations found</p>
                  <p className="text-xs text-gray-500">Start connecting with applicants</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-full">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={selectedConversation.applicantAvatar}
                      alt={selectedConversation.applicantName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {selectedConversation.applicantName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedConversation.status)}`}>
                          {selectedConversation.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {selectedConversation.jobTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200">
                      <Video size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200">
                      <Info size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedConversation.messages?.length > 0 ? (
                    selectedConversation.messages.map((msg, index) => {
                      const isOwn = msg.senderId === recruiterId;
                      return (
                        <div
                          key={index}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-2 max-w-[75%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                            {!isOwn && (
                              <Image
                                width={32}
                                height={32}
                                src={msg.senderAvatar || selectedConversation.applicantAvatar}
                                alt={msg.senderName}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                            <div>
                              <div className={`rounded-xl px-4 py-2.5 ${
                                isOwn 
                                  ? 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white' 
                                  : 'bg-white/10 text-white'
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              </div>
                              <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
                                <span className="text-[10px] text-gray-500">
                                  {formatMessageTime(msg.timestamp)}
                                </span>
                                {isOwn && (
                                  <span className="text-xs text-gray-400">
                                    {msg.isRead ? <CheckCheck size={12} /> : <Check size={12} />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare size={32} className="text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">No messages yet</p>
                      <p className="text-xs text-gray-500">Start the conversation</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10 bg-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFileAttach}
                      className="p-2 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-white/10 transition-all duration-200"
                    >
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
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
                          "flex-1",
                        ],
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={64} className="text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white">Select a conversation</h3>
                  <p className="text-sm text-gray-400">Choose an applicant to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}