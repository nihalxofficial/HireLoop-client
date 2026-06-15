// app/pricing/PricingClient.jsx
"use client";

import React, { useState } from "react";
import { Button, Accordion } from "@heroui/react";
import { 
  CheckCircle, 
  Zap, 
  Crown, 
  Rocket, 
  BriefcaseBusiness, 
  Users,
  ArrowRight,
  ChevronDown,
  CreditCard,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  Clock,
  Repeat,
  Mail,
  Loader2
} from "lucide-react";
import Link from "next/link";

const PricingClient = ({ seekerPlans, recruiterPlans }) => {
  const [activeTab, setActiveTab] = useState("seeker");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const faqItems = [
    {
      title: "Can I cancel my subscription anytime?",
      content: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your plan will remain active until the end of your current billing period.",
      icon: <RefreshCw size={18} />,
    },
    {
      title: "What is your refund policy?",
      content: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team within 14 days of your purchase for a full refund.",
      icon: <CreditCard size={18} />,
    },
    {
      title: "What payment methods do you accept?",
      content: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
      icon: <CreditCard size={18} />,
    },
    {
      title: "Can I switch between plans?",
      content: "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, the new price will be prorated for the remaining billing period. When downgrading, the changes will take effect at the start of your next billing cycle.",
      icon: <Repeat size={18} />,
    },
    {
      title: "Is there a free trial?",
      content: "Yes! We offer a 7-day free trial for all Pro and Growth plans. No credit card required. Experience all premium features before committing.",
      icon: <Clock size={18} />,
    },
    {
      title: "Do you offer custom plans for large organizations?",
      content: "Yes, we offer custom Enterprise plans tailored to your organization's needs. Contact our sales team for a personalized quote and feature set.",
      icon: <MessageCircle size={18} />,
    },
    {
      title: "How do I contact support?",
      content: "You can reach our support team via email at support@hireloop.com or through the live chat feature in your dashboard. Premium and Enterprise members get priority support with faster response times.",
      icon: <Mail size={18} />,
    },
  ];

  const plans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  // Format price with currency symbol
  const formatPrice = (price, currency, interval) => {
    const symbol = currency === "usd" ? "$" : 
                  currency === "eur" ? "€" : 
                  currency === "gbp" ? "£" : 
                  currency === "bdt" ? "৳" : "$";
    
    if (price === 0) return "Free";
    
    return `${symbol}${price.toLocaleString()}`;
  };

  // Get icon component
  const getIcon = (iconName) => {
    const icons = {
      BriefcaseBusiness: <BriefcaseBusiness size={20} />,
      Zap: <Zap size={20} />,
      Crown: <Crown size={20} />,
      Rocket: <Rocket size={20} />,
      Users: <Users size={20} />,
    };
    return icons[iconName] || <BriefcaseBusiness size={20} />;
  };

  // Handle Stripe Checkout
  const handleCheckout = async (plan) => {
    setLoadingPlan(plan.name);
    
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id || plan.name.toLowerCase(),
          planName: plan.name,
          price: plan.price,
          currency: plan.currency,
          interval: plan.interval,
          type: activeTab,
        }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create checkout session:", data.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
              Pricing Plans
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. Whether you&apos;re a job seeker
            or an employer, we have the right solution for you.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm inline-flex gap-1">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "seeker"
                  ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "recruiter"
                  ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "border-violet-500/50 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 shadow-2xl shadow-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-violet-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-linear-to-r from-fuchsia-500 to-violet-600 px-3 py-1 text-[10px] font-medium text-white shadow-lg shadow-violet-500/30">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <div className="p-6">
                {/* Plan Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular 
                    ? "bg-gradient-to-r from-fuchsia-500 to-violet-600" 
                    : "bg-white/10 border border-white/10"
                }`}>
                  <div className={plan.popular ? "text-white" : "text-violet-400"}>
                    {getIcon(plan.icon)}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(plan.price, plan.currency, plan.interval)}
                  </span>
                  {plan.price > 0 && plan.interval !== "forever" && (
                    <span className="text-gray-400 text-sm">/{plan.interval}</span>
                  )}
                  {plan.interval === "forever" && plan.price === 0 && (
                    <span className="text-gray-400 text-sm"> forever</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                {plan.name === "Enterprise" && activeTab === "recruiter" ? (
                  <Link href="/contact">
                    <Button className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300">
                      Contact Sales
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                ) : plan.price === 0 ? (
                  <Link href="/auth/signup">
                    <Button className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                ) : (
                  <form action="/api/checkout_sessions" method="POST" className="w-full">
                    <input type="hidden" name="planId" value={plan.id || plan.name.toLowerCase()} />
                    <input type="hidden" name="planName" value={plan.name} />
                    <input type="hidden" name="price" value={plan.price} />
                    <input type="hidden" name="currency" value={plan.currency} />
                    <input type="hidden" name="interval" value={plan.interval} />
                    <input type="hidden" name="type" value={activeTab} />
                    
                    <Button
                      type="submit"
                      className={`w-full transition-all duration-300 ${
                        plan.popular
                          ? "bg-linear-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02]"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                      isLoading={loadingPlan === plan.name}
                    >
                      {loadingPlan === plan.name ? "Processing..." : `Choose ${plan.name}`}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                Frequently Asked Questions
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Got Questions? We&apos;ve Got Answers
            </h2>
            <p className="text-gray-400 mt-2">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
            <Accordion className="w-full">
              {faqItems.map((item, index) => (
                <Accordion.Item key={index} className="border-b border-white/10 last:border-b-0">
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex items-center justify-between w-full py-4 px-2 text-left text-white font-medium hover:bg-white/5 rounded-xl transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <span className="text-violet-400">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <Accordion.Indicator>
                        <ChevronDown className="text-gray-400 transition-transform duration-200" />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="px-2 pb-4 text-gray-400 leading-relaxed">
                      {item.content}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            * Prices are in USD and exclude applicable taxes
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingClient;