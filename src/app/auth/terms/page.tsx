"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  FileText,
  Scale,
  Users,
  Shield,
  AlertCircle,
  CheckCircle,
  Globe,
  DollarSign,
  Clock,
  MessageSquare,
  UserCheck,
  BookOpen,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      icon: <FileText size={18} className="text-violet-400" />,
      title: "Agreement to Terms",
      content: [
        "By accessing or using HireLoop, you agree to be bound by these Terms of Service.",
        "If you disagree with any part of the terms, you may not access the service.",
        "These terms apply to all users, visitors, and others who access the service.",
        "You must be at least 16 years old to use HireLoop.",
      ],
    },
    {
      icon: <UserCheck size={18} className="text-violet-400" />,
      title: "User Accounts",
      content: [
        "You are responsible for maintaining the security of your account credentials.",
        "You are responsible for all activities that occur under your account.",
        "You must provide accurate and complete information when creating an account.",
        "You must notify us immediately of any unauthorized account access.",
        "We reserve the right to suspend or terminate accounts that violate these terms.",
      ],
    },
    {
      icon: <Briefcase size={18} className="text-violet-400" />,
      title: "Job Postings & Applications",
      content: [
        "Employers are solely responsible for the accuracy of job postings.",
        "Job seekers apply at their own discretion and are responsible for their applications.",
        "We do not guarantee that you will receive a response to your application.",
        "We are not responsible for hiring decisions made by employers.",
        "Job postings must comply with all applicable employment laws.",
      ],
    },
    {
      icon: <Shield size={18} className="text-violet-400" />,
      title: "User Conduct",
      content: [
        "Do not post false, misleading, or fraudulent information.",
        "Do not impersonate another person or entity.",
        "Do not use the platform for unauthorized commercial purposes.",
        "Do not harass, abuse, or harm other users.",
        "Do not upload malicious code or attempt to breach security.",
        "Do not scrape or collect user data without permission.",
      ],
    },
    {
      icon: <DollarSign size={18} className="text-violet-400" />,
      title: "Payments & Subscriptions",
      content: [
        "Certain features may require payment or subscription.",
        "Fees are clearly displayed before you make a purchase.",
        "Payments are non-refundable unless otherwise stated.",
        "We reserve the right to change pricing with prior notice.",
        "You are responsible for any taxes associated with your purchase.",
      ],
    },
    {
      icon: <Scale size={18} className="text-violet-400" />,
      title: "Intellectual Property",
      content: [
        "HireLoop owns all rights to the platform's design, logos, and content.",
        "You retain ownership of content you post on the platform.",
        "You grant us a license to use, display, and distribute your content.",
        "Do not copy, modify, or distribute our proprietary content without permission.",
        "Third-party trademarks remain property of their respective owners.",
      ],
    },
    {
      icon: <Globe size={18} className="text-violet-400" />,
      title: "Third-Party Links",
      content: [
        "Our platform may contain links to third-party websites or services.",
        "We are not responsible for the content or practices of third-party sites.",
        "Accessing third-party links is at your own risk.",
        "We recommend reviewing the terms of any third-party site you visit.",
      ],
    },
    {
      icon: <AlertCircle size={18} className="text-violet-400" />,
      title: "Disclaimer of Warranties",
      content: [
        "The service is provided 'as is' without warranties of any kind.",
        "We do not guarantee that the service will be uninterrupted or error-free.",
        "We do not guarantee job placement or interview opportunities.",
        "We are not liable for any actions taken by employers or job seekers.",
        "Your use of the service is at your sole risk.",
      ],
    },
    {
      icon: <Clock size={18} className="text-violet-400" />,
      title: "Termination",
      content: [
        "We may terminate or suspend your account immediately without prior notice.",
        "Termination may occur for violating these terms or engaging in harmful conduct.",
        "You may delete your account at any time through your settings.",
        "Upon termination, your right to use the service will immediately cease.",
        "Sections that by their nature survive termination will remain in effect.",
      ],
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white py-20">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
              Legal Agreement
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By
            using HireLoop, you agree to comply with and be bound by the
            following terms.
          </p>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <FileText size={14} />
            <span>Effective date: {lastUpdated}</span>
          </div>
        </div>

        {/* Main Content - Glassmorphism Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
          {/* Introduction */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                <Scale size={18} className="text-violet-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome to HireLoop
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  HireLoop is a job search platform connecting job seekers with
                  employers. These Terms of Service govern your use of our
                  website, services, and applications. By creating an account or
                  using our services, you acknowledge that you have read,
                  understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
                <div className="pl-11">
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <CheckCircle
                          size={14}
                          className="text-violet-400 mt-0.5 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < sections.length - 1 && (
                  <div className="mt-6 border-t border-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Governing Law Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                <Globe size={16} className="text-violet-400" />
              </div>
              <h4 className="text-base font-semibold">Governing Law</h4>
            </div>
            <div className="pl-11">
              <p className="text-sm text-gray-400 leading-relaxed">
                These terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions. Any disputes arising under these
                terms shall be resolved exclusively in the state or federal
                courts located in San Francisco, California.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Questions?</h4>
                </div>
                <p className="text-xs text-gray-500">
                  If you have any questions about these Terms, please contact us
                  at:
                  <br />
                  <a
                    href="mailto:legal@hireloop.com"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    legal@hireloop.com
                  </a>
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Customer Support</h4>
                </div>
                <p className="text-xs text-gray-500">
                  For account-related issues or general inquiries:
                  <br />
                  <a
                    href="mailto:support@hireloop.com"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    support@hireloop.com
                  </a>
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Documentation</h4>
                </div>
                <p className="text-xs text-gray-500">
                  View our other legal documents:
                  <br />
                  <Link
                    href="/privacy"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    Privacy Policy
                  </Link>
                  {" • "}
                  <Link
                    href="/cookies"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-violet-400 transition"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-violet-400 transition"
            >
              Cookie Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/security"
              className="text-gray-500 hover:text-violet-400 transition"
            >
              Security
            </Link>
          </div>

          <Button className="h-10 rounded-xl flex items-center gap-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
            <Link href="/">
              <ArrowRight size={14} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
