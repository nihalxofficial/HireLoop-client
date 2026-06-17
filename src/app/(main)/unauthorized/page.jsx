"use client";

import React from 'react';
import Link from "next/link";
import {
    ShieldAlert,
    ArrowLeft,
    Home,
    Lock,
    AlertTriangle
} from "lucide-react";
import { authClient } from '@/lib/auth-client';

const UnauthorizedPage = () => {
    const { data: session} = authClient.useSession();
    const user = session?.user;
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-[#050816] flex items-center justify-center px-4 relative overflow-hidden py-20">
            {/* Background Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-600/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/5 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-md w-full">
                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500/20 to-red-600/10 flex items-center justify-center border border-red-500/20">
                                <ShieldAlert className="w-12 h-12 text-red-500" />
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute -inset-1 rounded-full border border-red-500/10 animate-spin-slow" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center text-white mb-2">
                        Access Denied
                    </h1>

                    {/* Subtitle */}
                    <p className="text-center text-gray-400 mb-2">
                        <span className="inline-flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            You don&apos;t have permission to view this page
                        </span>
                    </p>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        <AlertTriangle className="w-4 h-4 text-yellow-500/60" />
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Info Box */}
                    <div className="mb-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                        <p className="text-xs text-yellow-500/80 text-center">
                            This page requires specific role permissions. Please contact your administrator if you believe this is a mistake.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* Primary Action - Go to Dashboard */}
                        <Link
                            href={`/dashboard/${user?.role}`}
                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-linear-to-r from-fuchsia-500 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go to Dashboard
                        </Link>

                        {/* Secondary Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => window.history.back()}
                                className="flex-1 cursor-pointer inline-flex items-center justify-center px-4 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </button>

                            <Link
                                href="/"
                                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    Need help? Contact your system administrator for assistance.
                </p>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default UnauthorizedPage;