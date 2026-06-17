// app/help/HelpClient.jsx
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Rocket,
  Briefcase,
  Users,
  Settings,
  Shield,
  BookOpen,
  FileQuestion,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

// Icon mapping
const iconMap = {
  rocket: Rocket,
  briefcase: Briefcase,
  users: Users,
  settings: Settings,
  help: Shield,
  faq: FileQuestion,
};

export default function HelpClient({ helpData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter articles based on search
  const filteredCategories = helpData?.categories?.filter(category => {
    if (!searchTerm) return true;
    const matchesCategory = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArticles = category.articles.some(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCategory || matchesArticles;
  });

  const handleContactSupport = () => {
    toast.success("Support ticket created! We'll get back to you soon.");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050816] py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <HelpCircle size={14} className="text-violet-400" />
            <span className="text-xs font-medium text-violet-400">Help Center</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions, learn about features, and get the support you need
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative">
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchTerm}
              onChange={handleSearch}
              startContent={<Search size={18} className="text-gray-400" />}
              variant="bordered"
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
                  "rounded-2xl",
                  "h-12",
                  "transition-all",
                  "duration-200",
                  "shadow-lg",
                ],
              }}
            />
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={22} className="text-violet-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Live Chat</h4>
            <p className="text-xs text-gray-400 mt-1">Chat with support</p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Mail size={22} className="text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Email Support</h4>
            <p className="text-xs text-gray-400 mt-1">support@hireloop.com</p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Phone size={22} className="text-blue-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Call Us</h4>
            <p className="text-xs text-gray-400 mt-1">+1 (555) 123-4567</p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={22} className="text-amber-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Documentation</h4>
            <p className="text-xs text-gray-400 mt-1">Read our guides</p>
          </div>
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BookOpen size={20} className="text-violet-400" />
            Browse Help Topics
          </h2>

          {filteredCategories && filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCategories.map((category) => {
                const Icon = iconMap[category.icon] || HelpCircle;
                return (
                  <div
                    key={category.id}
                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {category.description}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {category.articles.map((article, index) => (
                            <li key={index}>
                              <Link
                                href={`/help/${category.id}/${article.slug}`}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
                              >
                                <ChevronRight size={14} className="text-violet-400 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                <span>{article.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <button className="mt-3 text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-all duration-300 hover:gap-2">
                          View All Articles
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Search size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white">No results found</h3>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search terms or browse our help categories
              </p>
              <Button
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Preview */}
        <div className="rounded-2xl border border-white/10 bg-linear-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-sm p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-linear-to-r from-amber-500/20 to-amber-600/20">
                <FileQuestion size={24} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-400">Quick answers to the most common questions</p>
              </div>
            </div>
            <Link href="/help/faq">
              <Button className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                View All FAQs
                <ExternalLink size={16} />
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "How do I create an account?",
              "What are the subscription plans?",
              "How do I apply for a job?",
              "How do I post a job?",
              "Is my data secure?",
              "How do I reset my password?",
            ].map((faq, index) => (
              <Link
                key={index}
                href={`/help/faq#${faq.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-200 group"
              >
                <ChevronRight size={14} className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{faq}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-fuchsia-500/20 to-violet-600/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={28} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Still need help?</h3>
            <p className="text-gray-400 mt-2">
              Our support team is here to assist you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button
                onClick={handleContactSupport}
                className="bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <MessageCircle size={16} />
                Contact Support
              </Button>
              <Link href="/help/contact">
                <Button className="bg-white/5 text-white hover:bg-white/10 transition-colors">
                  <Mail size={16} />
                  Send Email
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}