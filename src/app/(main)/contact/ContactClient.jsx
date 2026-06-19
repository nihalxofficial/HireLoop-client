// app/contact/ContactClient.js
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  BriefcaseBusiness,
  Building2,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  CheckCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Globe,
  HelpCircle,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

// Helper function to get social icon
const getSocialIcon = (name) => {
  switch (name?.toLowerCase()) {
    case 'twitter':
      return <FaTwitter size={20} className="text-gray-400 hover:text-white transition-colors" />;
    case 'linkedin':
      return <FaLinkedin size={20} className="text-gray-400 hover:text-white transition-colors" />;
    case 'facebook':
      return <FaFacebook size={20} className="text-gray-400 hover:text-white transition-colors" />;
    case 'instagram':
      return <FaInstagram size={20} className="text-gray-400 hover:text-white transition-colors" />;
    case 'youtube':
      return <FaYoutube size={20} className="text-gray-400 hover:text-white transition-colors" />;
    default:
      return <Globe size={20} className="text-gray-400 hover:text-white transition-colors" />;
  }
};

export default function ContactClient({ contactInfo, socialLinks }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 2000);
  };

  // Contact categories for select
  const categories = [
    { id: 'general', label: 'General Inquiry' },
    { id: 'support', label: 'Technical Support' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'partnership', label: 'Partnership' },
    { id: 'careers', label: 'Careers' },
    { id: 'other', label: 'Other' },
  ];

  // Quick help topics
  const helpTopics = [
    {
      icon: <FileText size={20} />,
      title: 'Documentation',
      description: 'Read our detailed guides',
      link: '/help'
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'FAQ',
      description: 'Find quick answers',
      link: '/help/faq'
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Live Chat',
      description: 'Chat with support',
      link: '#'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050816] py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-medium text-violet-400">Get in Touch</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or need support? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-violet-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Mail size={22} className="text-violet-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Email Us</h4>
            <p className="text-xs text-gray-400 mt-1 break-all">{contactInfo?.email || 'support@hireloop.com'}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Phone size={22} className="text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Call Us</h4>
            <p className="text-xs text-gray-400 mt-1">{contactInfo?.phone || '+1 (555) 123-4567'}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <MapPin size={22} className="text-blue-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Visit Us</h4>
            <p className="text-xs text-gray-400 mt-1">{contactInfo?.address || '123 Tech Park, Silicon Valley, CA 94025'}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Clock size={22} className="text-amber-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Working Hours</h4>
            <p className="text-xs text-gray-400 mt-1">{contactInfo?.hours || 'Mon-Fri 9:00 AM - 6:00 PM EST'}</p>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-violet-500/30">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-violet-400" />
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                  <p className="text-gray-400 mt-2 max-w-md mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24-48 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full Name & Email - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        variant="bordered"
                        required
                        fullWidth
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
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        variant="bordered"
                        required
                        fullWidth
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

                  {/* Row 2: Subject & Category - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Subject *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter subject"
                        variant="bordered"
                        required
                        fullWidth
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
                        Category *
                      </label>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        variant="bordered"
                        required
                        fullWidth
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
                          placeholder: "text-gray-500",
                        }}
                      >
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator className="text-gray-400" />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox className="bg-[#0a0f1a] border border-white/10 rounded-xl shadow-2xl">
                            {categories.map((category) => (
                              <ListBox.Item
                                key={category.id}
                                id={category.id}
                                textValue={category.label}
                                className="text-white data-[hover=true]:bg-violet-500/20 data-[hover=true]:text-white data-[selected=true]:text-violet-400 data-[selected=true]:bg-violet-500/10 rounded-lg m-1 transition-all duration-200"
                              >
                                {category.label}
                                <ListBox.ItemIndicator className="text-violet-400" />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  {/* Row 3: Message - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                      Message *
                    </label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      variant="bordered"
                      required
                      minRows={4}
                      fullWidth
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
                          "min-h-[120px]",
                        ],
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    isLoading={loading}
                    fullWidth
                    className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Quick Help & Social */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Help */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-violet-400" />
                Quick Help
              </h3>
              <div className="space-y-3">
                {helpTopics.map((topic, index) => (
                  <Link key={index} href={topic.link}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                      <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover:scale-110 transition-transform duration-200">
                        {topic.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                          {topic.title}
                        </p>
                        <p className="text-xs text-gray-400">{topic.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe size={18} className="text-violet-400" />
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-200 hover:scale-105"
                  >
                    {getSocialIcon(social.icon || social.name)}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Follow us for updates and news
              </p>
            </div>

            {/* Office Hours */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-6 transition-all duration-300 hover:border-violet-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-violet-400" />
                <h3 className="text-sm font-semibold text-white">Office Hours</h3>
              </div>
              <div className="space-y-1.5 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-gray-400">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-400">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  Response time: <span className="text-emerald-400">24-48 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-violet-500/30">
          <div className="aspect-video w-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-violet-400 mx-auto mb-3" />
                <p className="text-white font-semibold">Find Us Here</p>
                <p className="text-sm text-gray-400">{contactInfo?.address || '123 Tech Park, Silicon Valley, CA 94025'}</p>
                <div className="mt-3 w-24 h-24 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto animate-pulse">
                  <MapPin size={32} className="text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}