"use client";

import React, { useEffect } from "react";
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
    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    useEffect(() => {
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

    const subsInfo = sessionData?.subsInfo || {};
    const planName = subsInfo?.planName || sessionData?.planName || "Premium";
    const amountTotal = subsInfo?.amountTotal || sessionData?.amountTotal || 3900;
    const currency = (subsInfo?.currency || sessionData?.currency || "BDT").toUpperCase();
    const customerEmail = subsInfo?.customerEmail || sessionData?.customerEmail || user?.email || "your email";
    const customerName = subsInfo?.customerName || user?.name || "Customer";

    // For BDT: Display as whole number (3900 BDT, not 39.00 BDT)
    // For USD: Display as decimal (19.00 USD)
    const formatAmount = (amount, currencyCode) => {
        if (currencyCode === 'BDT') {
            // BDT: Display as whole number
            return amount.toFixed(0);
        } else {
            // Other currencies: Display with 2 decimal places
            return (amount / 100).toFixed(2);
        }
    };

    const getCurrencySymbol = () => {
        switch (currency) {
            case "USD": return "$";
            case "EUR": return "€";
            case "GBP": return "£";
            case "BDT": return "৳";
            default: return "$";
        }
    };

    const displayAmount = formatAmount(amountTotal, currency);
    const currencySymbol = getCurrencySymbol();

    const dashboardPath = `/dashboard/${user?.role || "seeker"}`;
    const profilePath = `/dashboard/${user?.role || "seeker"}/profile`;

    return (
        <div className="min-h-screen bg-[#050816] pt-20 pb-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* Success Header */}
                    <div className="relative p-8 text-center border-b border-white/10">
                        <div className="absolute top-4 right-4">
                            <Sparkles size={20} className="text-violet-400 animate-pulse" />
                        </div>
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-500/20">
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
                        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center mb-6">
                            <p className="text-emerald-400 font-medium mb-1">✓ Payment Confirmed</p>
                            <p className="text-sm text-gray-400">
                                Your <span className="font-bold">{planName}</span> plan has been activated successfully.
                            </p>
                        </div>

                        {/* Order Summary */}
                        <h2 className="text-lg font-semibold text-white mb-3">Order Summary</h2>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Plan</span>
                                <span className="text-white font-medium">{capitalize(planName)} Plan</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Amount Paid</span>
                                <span className="text-emerald-400 font-medium">
                                    {currencySymbol}{displayAmount / 100}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Status</span>
                                <span className="text-emerald-400 text-sm">Active</span>
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

                        {/* Subscription Info */}
                        <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-violet-400" />
                                <div>
                                    <p className="text-sm text-gray-300">
                                        Confirmation sent to{" "}
                                        <span className="text-violet-400">{customerEmail}</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Hi {customerName}, your {planName} plan is ready!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Next Section */}
                    <div className="px-6 pb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">What's Next?</h2>
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