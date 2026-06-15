// app/payment/success/CheckoutSuccessClient.jsx
"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import { 
    CheckCircle, 
    BriefcaseBusiness, 
    Building2,
    Home,
    FileText,
    Mail,
    Download,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

const CheckoutSuccessClient = ({ sessionData }) => {
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

    const planName = sessionData?.planName || "Premium";
    const amount = sessionData?.amountTotal ? sessionData.amountTotal / 100 : 19;
    const currency = sessionData?.currency?.toUpperCase() || "USD";
    const customerEmail = sessionData?.customerEmail || "your email";

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
                            Thank you for your purchase. Your subscription is now active.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-4">Order Details</h2>
                        
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Plan</span>
                                <span className="text-white font-medium">{planName} Plan</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Amount Paid</span>
                                <span className="text-emerald-400 font-medium">
                                    {currency === "USD" && "$"}
                                    {currency === "EUR" && "€"}
                                    {currency === "GBP" && "£"}
                                    {currency === "BDT" && "৳"}
                                    {amount}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Billing Cycle</span>
                                <span className="text-white text-sm">Monthly</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Order Date</span>
                                <span className="text-white text-sm">
                                    {new Date().toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <div className="px-6 pb-4">
                        <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
                            <p className="text-sm text-gray-300 text-center">
                                A confirmation email has been sent to{" "}
                                <span className="text-violet-400">{customerEmail}</span>
                            </p>
                        </div>
                    </div>

                    {/* What's Next Section */}
                    <div className="px-6 pb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">What's Next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/dashboard" className="group">
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
                            <Link href="/dashboard/profile" className="group">
                                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <Building2 size={18} className="text-violet-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white mb-1">Complete Profile</h3>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                        <Link href="/dashboard" className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300">
                                <Home size={16} />
                                Go to Dashboard
                            </Button>
                        </Link>
                        <Link href="/invoice" className="flex-1">
                            <Button className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300">
                                <Download size={16} />
                                Download Invoice
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our{" "}
                        <a href="/support" className="text-violet-400 hover:text-violet-300 transition-colors">
                            support team
                        </a>
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        If you have any questions, please email{" "}
                        <a href="mailto:orders@hireloop.com" className="text-violet-400 hover:text-violet-300">
                            orders@hireloop.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessClient;