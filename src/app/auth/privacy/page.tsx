"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  Bell,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// import privacyBg from "@/assets/privacy-bg.png"; // Add your image to assets

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      icon: <Database size={18} className="text-violet-400" />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email address, phone number, location)",
        "Professional information (resume, work history, skills, education)",
        "Account credentials and preferences",
        "Usage data and analytics (pages visited, time spent, searches)",
        "Communication data (messages, applications, feedback)",
        "Device information (IP address, browser type, operating system)",
      ],
    },
    {
      icon: <Lock size={18} className="text-violet-400" />,
      title: "How We Use Your Information",
      content: [
        "Match you with relevant job opportunities",
        "Personalize your job search experience",
        "Process job applications and communications",
        "Improve our platform and services",
        "Send important notifications and updates",
        "Prevent fraud and ensure platform security",
      ],
    },
    {
      icon: <Eye size={18} className="text-violet-400" />,
      title: "Information Sharing",
      content: [
        "We share your information with potential employers when you apply for jobs",
        "We do not sell your personal information to third parties",
        "Service providers who assist in platform operations",
        "Legal requirements and law enforcement when necessary",
        "Business transfers or mergers (with notice to users)",
      ],
    },
    {
      icon: <Cookie size={18} className="text-violet-400" />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to improve user experience",
        "Preference cookies to remember your settings",
        "You can control cookie settings in your browser",
        "Third-party cookies from integrated services",
      ],
    },
    {
      icon: <Shield size={18} className="text-violet-400" />,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Regular security audits and vulnerability assessments",
        "Secure data storage with access controls",
        "Employee training on data protection practices",
        "Incident response procedures for data breaches",
      ],
    },
    {
      icon: <Globe size={18} className="text-violet-400" />,
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate data",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Export your data in portable format",
        "Withdraw consent for data processing",
      ],
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white py-20">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
              Privacy & Security
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect
            your information when you use our platform.
          </p>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <FileText size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Main Content - Glassmorphism Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
          {/* Introduction */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                <Shield size={18} className="text-violet-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  At HireLoop, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use our job search
                  platform. By using HireLoop, you consent to the practices
                  described in this policy.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
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

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Contact Us</h4>
                </div>
                <p className="text-xs text-gray-500">
                  If you have questions about this Privacy Policy, please
                  contact us at:
                  <br />
                  <a
                    href="mailto:privacy@hireloop.com"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    privacy@hireloop.com
                  </a>
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Bell size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Policy Updates</h4>
                </div>
                <p className="text-xs text-gray-500">
                  We may update this policy periodically. We will notify you of
                  any material changes via email or platform notification.
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-violet-400" />
                  <h4 className="text-sm font-semibold">Your Consent</h4>
                </div>
                <p className="text-xs text-gray-500">
                  By continuing to use HireLoop, you acknowledge that you have
                  read and agree to this Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-violet-400 transition"
            >
              Terms of Service
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
