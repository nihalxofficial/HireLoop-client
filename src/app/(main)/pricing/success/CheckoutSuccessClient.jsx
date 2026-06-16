"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import { 
    CheckCircle, 
    BriefcaseBusiness, 
    Building2,
    Home,
    Sparkles,
    Mail
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

const CheckoutSuccessClient = ({ sessionData, user }) => {
    useEffect(() => {
        // Fire confetti on load
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#d946ef', '#8b5cf6', '#ec4899']
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.7, x: 0.3 },
                colors: ['#a855f7', '#d946ef']
            });
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.7, x: 0.7 },
                colors: ['#8b5cf6', '#ec4899']
            });
        }, 200);
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { y: 0.5 },
                startVelocity: 15,
                colors: ['#a855f7', '#8b5cf6', '#d946ef']
            });
        }, 500);
    }, []);

    // Use data from Stripe session
    const planName = sessionData?.planName || "Premium";
    const amount = sessionData?.amountTotal ? sessionData.amountTotal / 100 : 19;
    const currency = sessionData?.currency?.toUpperCase() || "USD";
    const customerEmail = sessionData?.customerEmail || user?.email || "your email";
    const paymentStatus = sessionData?.status === 'complete' ? 'Active' : 'Processing';

    const getCurrencySymbol = () => {
        switch(currency) {
            case "USD": return "$";
            case "EUR": return "€";
            case "GBP": return "£";
            case "BDT": return "৳";
            default: return "$";
        }
    };

    const dashboardPath = `/dashboard/${user?.role || "seeker"}`;
    const profilePath = `/dashboard/${user?.role || "seeker"}/profile`;

    return (
        <div className="min-h-screen bg-[#050816] pt-20 pb-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Card */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* Success Header */}
                    <div className="relative p-8 text-center border-b border-white/10">
                        <div className="absolute top-4 right-4">
                            <Sparkles size={20} className="text-violet-400 animate-pulse" />
                        </div>
                        <div className="w-20 h-20 rounded-full bg-linear-to-r from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-500/20">
                            <CheckCircle size={48} className="text-emerald-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-gray-400">
                            Thank you for your purchase. Your {planName} subscription is now active.
                        </p>
                    </div>

                    {/* Payment Confirmation */}
                    <div className="p-6">
                        {/* <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center mb-6">
                            <p className="text-emerald-400 font-medium mb-1">✓ Payment Confirmed</p>
                            <p className="text-sm text-gray-400">
                                Your {planName} plan has been activated successfully.
                            </p>
                        </div> */}

                        {/* Order Summary */}
                        <h2 className="text-lg font-semibold text-white mb-3">Order Summary</h2>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Plan</span>
                                <span className="text-white font-medium">{planName} Plan</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Amount Paid</span>
                                <span className="text-emerald-400 font-medium">
                                    {getCurrencySymbol()}{amount}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Status</span>
                                <span className="text-emerald-400 text-sm">{paymentStatus}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Payment Date</span>
                                <span className="text-white text-sm">
                                    {new Date().toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Email Confirmation */}
                        <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-violet-400" />
                                <div>
                                    <p className="text-sm text-gray-300">
                                        Confirmation email sent to{" "}
                                        <span className="text-violet-400">{customerEmail}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Next Section */}
                    <div className="px-6 pb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">What&apos;s Next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={dashboardPath} className="group">
                                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <Home size={18} className="text-violet-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white mb-1">Go to Dashboard</h3>
                                </div>
                            </Link>
                            <Link href="/jobs" className="group">
                                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <BriefcaseBusiness size={18} className="text-violet-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white mb-1">Browse Jobs</h3>
                                </div>
                            </Link>
                            <Link href={profilePath} className="group">
                                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <Building2 size={18} className="text-violet-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white mb-1">Complete Profile</h3>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="p-6 pt-0 text-center">
                        <p className="text-sm text-gray-500">
                            Need help? Contact our{" "}
                            <Link href="/support" className="text-violet-400 hover:text-violet-300 transition-colors">
                                support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessClient;