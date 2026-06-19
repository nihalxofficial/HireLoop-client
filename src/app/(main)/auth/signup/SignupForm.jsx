// app/auth/signup/SignupForm.js
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
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || "/";

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    toast.info("Google authentication coming soon!");
  };

  const handleGithubSignup = () => {
    console.log("GitHub signup clicked");
    toast.info("GitHub authentication coming soon!");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // Check if passwords match
    if (userData.password !== userData.verifyPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image || "",
        role: userData.role || "seeker",
        plan: "free"
      });
      
      if (data) {
        toast.success("SignUp Successful 🎉");
        router.push(redirectTo);
      }
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[35%] bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl gap-0">
            {/* Left Side - Welcome Container */}
            <div className="relative rounded-l-2xl overflow-hidden min-h-137.5">
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

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/90 to-[#050816]/70" />

              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent pointer-events-none" />

              {/* Welcome Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                {/* Motivational Quote */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-3">
                    <Rocket size={12} className="text-violet-400" />
                    <span className="text-[10px] uppercase tracking-wider">
                      Join 50,000+ job seekers
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-2">
                    Your dream career
                    <br />
                    <span className="bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                      starts here
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Create your free account and get access to personalized job
                    matches, salary insights, and exclusive opportunities from
                    top companies.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Zap size={12} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">
                        AI-Powered Matching
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Get jobs tailored to your skills
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Target size={12} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">
                        Verified Companies
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Apply to trusted employers only
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <TrendingUp size={12} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Career Growth</p>
                      <p className="text-[10px] text-gray-400">
                        Resources to advance your career
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-base font-bold text-violet-400">50K+</p>
                    <p className="text-[10px] text-gray-500">Active Jobs</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-violet-400">12K+</p>
                    <p className="text-[10px] text-gray-500">Companies</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-violet-400">97%</p>
                    <p className="text-[10px] text-gray-500">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="rounded-r-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="text-xl font-semibold">Create an account</h1>
                <p className="text-xs text-gray-400 mt-1">
                  Start your journey to find the perfect job
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
                {/* Full Name */}
                <TextField isRequired name="name">
                  <Label className="text-xs text-gray-300">
                    <User size={12} className="inline mr-1.5 text-violet-400" />
                    Full Name
                  </Label>
                  <Input placeholder="John Doe" size="sm" />
                  <FieldError />
                </TextField>

                {/* Email and Image URL - Side by Side */}
                <div className="grid grid-cols-2 gap-2">
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
                    <Label className="text-xs text-gray-300">
                      <Mail
                        size={12}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Email Address
                    </Label>
                    <Input placeholder="john@example.com" size="sm" />
                    <FieldError />
                  </TextField>

                  <TextField name="image">
                    <Label className="text-xs text-gray-300">
                      <ImageIcon
                        size={12}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Profile Image URL
                    </Label>
                    <Input placeholder="https://example.com/avatar.jpg" size="sm" />
                    <Description className="text-[10px] text-gray-500">
                      Optional
                    </Description>
                  </TextField>
                </div>

                {/* Password and Verify Password - Side by Side */}
                <div className="grid grid-cols-2 gap-2">
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
                    <Label className="text-xs text-gray-300">
                      <Lock
                        size={12}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Password
                    </Label>
                    <InputGroup>
                      <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="Create a password"
                        className="w-full"
                        size="sm"
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
                            <Eye className="size-3.5" />
                          ) : (
                            <EyeSlash className="size-3.5" />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <Description className="text-[10px] text-gray-500">
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
                    <Label className="text-xs text-gray-300">
                      <Lock
                        size={12}
                        className="inline mr-1.5 text-violet-400"
                      />
                      Verify Password
                    </Label>
                    <InputGroup>
                      <Input
                        type={isConfirmVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full"
                        size="sm"
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
                            <Eye className="size-3.5" />
                          ) : (
                            <EyeSlash className="size-3.5" />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError />
                  </TextField>
                </div>

                {/* Role Selection */}
                <div>
                  <Label className="text-xs text-gray-300 mb-1.5 block">
                    <Briefcase
                      size={12}
                      className="inline mr-1.5 text-violet-400"
                    />
                    I am a
                  </Label>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center gap-2 p-2 rounded-xl border border-white/10 bg-white/5 cursor-pointer transition hover:bg-white/10">
                      <input
                        type="radio"
                        name="role"
                        value="seeker"
                        defaultChecked
                        className="w-3.5 h-3.5 text-violet-500"
                      />
                      <span className="text-xs">Job Seeker</span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 p-2 rounded-xl border border-white/10 bg-white/5 cursor-pointer transition hover:bg-white/10">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        className="w-3.5 h-3.5 text-violet-500"
                      />
                      <span className="text-xs">Recruiter</span>
                    </label>
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 cursor-pointer rounded border-white/10 bg-white/5 text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-[10px] text-gray-400">
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

                {/* Create Account Button */}
                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-medium shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-sm"
                  isDisabled={!agreeTerms}
                >
                  <Sparkles size={14} className="mr-2" />
                  Create Free Account
                  <ArrowRight size={14} className="ml-2" />
                </Button>

                {/* Divider */}
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-transparent text-gray-500 text-[10px]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleGoogleSignup}
                    className="p-2 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign up with Google"
                  >
                    <FcGoogle size={18} />
                  </button>
                  <button
                    onClick={handleGithubSignup}
                    className="p-2 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign up with GitHub"
                  >
                    <FaGithub size={18} />
                  </button>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-xs text-gray-400 mt-1">
                  Already have an account?{" "}
                  <Link
                    href={`/auth/login?redirect=${redirectTo}`}
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