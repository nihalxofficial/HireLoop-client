"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  TextField,
  Label,
  FieldError,
  Description,
  Input,
  InputGroup,
} from "@heroui/react";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  Rocket,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import signupBg from "@/assets/signup.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white py-20">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Two Column Layout - No Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl gap-0">
            {/* Left Side - Welcome Container with Background Image */}
            <div className="relative rounded-l-2xl overflow-hidden min-h-175">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={signupBg}
                  alt="Welcome"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-linear-to-br from-[#050816]/90 to-[#050816]/70" />

              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-t from-violet-600/30 to-transparent pointer-events-none" />

              {/* Welcome Content - Shifted to Bottom */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8">
                {/* Motivational Quote */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
                    <Rocket size={12} className="text-violet-400" />
                    <span className="text-[10px] uppercase tracking-wider">
                      Join 50,000+ job seekers
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight mb-3">
                    Your dream career
                    <br />
                    <span className="bg-linear-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                      starts here
                    </span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Create your free account and get access to personalized job
                    matches, salary insights, and exclusive opportunities from
                    top companies.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Zap size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        AI-Powered Matching
                      </p>
                      <p className="text-xs text-gray-400">
                        Get jobs tailored to your skills
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Target size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Verified Companies
                      </p>
                      <p className="text-xs text-gray-400">
                        Apply to trusted employers only
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <TrendingUp size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Career Growth</p>
                      <p className="text-xs text-gray-400">
                        Resources to advance your career
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xl font-bold text-violet-400">50K+</p>
                    <p className="text-xs text-gray-500">Active Jobs</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-violet-400">12K+</p>
                    <p className="text-xs text-gray-500">Companies</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-violet-400">97%</p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="rounded-r-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Create an account</h1>
                <p className="text-sm text-gray-400 mt-2">
                  Start your journey to find the perfect job
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
                {/* Full Name */}
                <TextField isRequired name="name">
                  <Label className="text-sm text-gray-300">
                    <User size={14} className="inline mr-1.5 text-violet-400" />
                    Full Name
                  </Label>
                  <Input placeholder="John Doe" />
                  <FieldError />
                </TextField>

                {/* Email and Image URL - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                      if (!value) return "Email is required";
                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                      ) {
                        return "Please enter a valid email address";
                      }
                      return null;
                    }}
                  >
                    <Label className="text-sm text-gray-300">
                      <Mail
                        size={14}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Email Address
                    </Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                  </TextField>

                  <TextField name="imageUrl">
                    <Label className="text-sm text-gray-300">
                      <ImageIcon
                        size={14}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Profile Image URL
                    </Label>
                    <Input placeholder="https://example.com/avatar.jpg" />
                    <Description className="text-xs text-gray-500">
                      Optional
                    </Description>
                  </TextField>
                </div>

                {/* Password and Verify Password - Side by Side with InputGroup */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Password Field */}
                  <TextField
                    isRequired
                    name="password"
                    value={password}
                    onChange={setPassword}
                    validate={(value) => {
                      if (!value) return "Password is required";
                      if (value.length < 8) {
                        return "Password must be at least 8 characters";
                      }
                      if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                      }
                      if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                      }
                      return null;
                    }}
                  >
                    <Label className="text-sm text-gray-300">
                      <Lock
                        size={14}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Password
                    </Label>
                    <InputGroup>
                      <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="Create a password"
                        className="w-full"
                      />
                      <InputGroup.Suffix>
                        <Button
                          isIconOnly
                          aria-label={
                            isVisible ? "Hide password" : "Show password"
                          }
                          size="sm"
                          variant="ghost"
                          onPress={() => setIsVisible(!isVisible)}
                          className="text-gray-400"
                        >
                          {isVisible ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeSlash className="size-4" />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <Description className="text-xs text-gray-500">
                      Min 8 chars, 1 uppercase, 1 number
                    </Description>
                    <FieldError />
                  </TextField>

                  {/* Verify Password Field */}
                  <TextField
                    isRequired
                    name="verifyPassword"
                    value={verifyPassword}
                    onChange={setVerifyPassword}
                    validate={(value) => {
                      if (!value) return "Please verify your password";
                      if (value !== password) {
                        return "Passwords do not match";
                      }
                      return null;
                    }}
                  >
                    <Label className="text-sm text-gray-300">
                      <Lock
                        size={14}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Verify Password
                    </Label>
                    <InputGroup>
                      <Input
                        type={isConfirmVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full"
                      />
                      <InputGroup.Suffix>
                        <Button
                          isIconOnly
                          aria-label={
                            isConfirmVisible ? "Hide password" : "Show password"
                          }
                          size="sm"
                          variant="ghost"
                          onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                          className="text-gray-400"
                        >
                          {isConfirmVisible ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeSlash className="size-4" />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError />
                  </TextField>
                </div>

                {/* Role Selection */}
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">
                    <Briefcase
                      size={14}
                      className="inline mr-1.5 text-violet-400"
                    />
                    I am a
                  </Label>
                  <div className="flex gap-3">
                    <label className="flex-1 flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer transition hover:bg-white/10">
                      <input
                        type="radio"
                        name="role"
                        value="jobseeker"
                        defaultChecked
                        className="w-4 h-4 text-violet-500"
                      />
                      <span className="text-sm">Job Seeker</span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer transition hover:bg-white/10">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        className="w-4 h-4 text-violet-500"
                      />
                      <span className="text-sm">Recruiter</span>
                    </label>
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 cursor-pointer rounded border-white/10 bg-white/5 text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-xs text-gray-400">
                    I agree to the{" "}
                    <Link
                      href="/auth/terms"
                      className="text-violet-400 hover:text-violet-300"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/auth/privacy"
                      className="text-violet-400 hover:text-violet-300"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Create Account Button - Full Width */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-linear-to-r from-fuchsia-500 to-violet-600 text-white font-medium shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  isDisabled={!agreeTerms}
                >
                  <Sparkles size={16} className="mr-2" />
                  Create Free Account
                  <ArrowRight size={16} className="ml-2" />
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-transparent text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    // onClick={handleGoogleLogin}
                    className="p-3 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign in with Google"
                  >
                    <FcGoogle size={20} />
                  </button>
                  <button
                    // onClick={handleGithubLogin}
                    className="p-3 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign in with GitHub"
                  >
                    <FaGithub size={20} />
                  </button>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-400 mt-2">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
