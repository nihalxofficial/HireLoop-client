"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram 
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "For Job Seekers",
      links: [
        { name: "Browse Jobs", href: "#" },
        { name: "Career Advice", href: "#" },
        { name: "Resume Builder", href: "#" },
        { name: "Salary Calculator", href: "#" },
        { name: "Job Alerts", href: "#" },
      ],
    },
    {
      title: "For Employers",
      links: [
        { name: "Post a Job", href: "#" },
        { name: "Browse Candidates", href: "#" },
        { name: "Recruiting Solutions", href: "#" },
        { name: "Pricing Plans", href: "#" },
        { name: "Success Stories", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Developers", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-[#050816] text-white mt-20">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Section with Newsletter - Glass Container */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-300">
                Get the latest job opportunities, career tips, and platform updates delivered straight to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
              />
              <Button className="bg-white px-6 font-medium text-black hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
                <span className="text-lg font-bold">HL</span>
              </div>
              <div className="leading-tight">
                <h1 className="text-sm font-semibold">HireLoop</h1>
                <p className="text-sm text-gray-300">Find Career Opportunities</p>
              </div>
            </Link>
            
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Connecting talented professionals with amazing opportunities. Building the future of work, one placement at a time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>hello@hireloop.com</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-violet-400 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-400">
            © {currentYear} HireLoop. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-violet-400"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}