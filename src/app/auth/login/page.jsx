"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  TextField,
  Label,
  FieldError,
  Input,
  InputGroup,
} from "@heroui/react";
import {
  Mail,
  Lock,
  Briefcase,
  LogIn,
  Rocket,
  Target,
  Shield,
  Clock,
} from "lucide-react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FaGithub } from "react-icons/fa";

import loginBg from "@/assets/login.png";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });
    if(data){
      toast.success("Login Successful 🎉")
      router.push("/")
    }
    if(error){
      toast.error(error.message)
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    alert("Redirecting to Google authentication...");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
    alert("Redirecting to GitHub authentication...");
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
            <div className="relative rounded-l-2xl overflow-hidden min-h-150">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={loginBg}
                  alt="Welcome Back"
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
                {/* Welcome Badge */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
                    <Rocket size={12} className="text-violet-400" />
                    <span className="text-[10px] uppercase tracking-wider">
                      Welcome Back!
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight mb-3">
                    Ready to continue your
                    <br />
                    <span className="bg-linear-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                      career journey?
                    </span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Sign in to access your personalized job matches, track
                    applications, and connect with top employers.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Shield size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Secure Access</p>
                      <p className="text-xs text-gray-400">
                        Your data is always protected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Target size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Personalized Matches
                      </p>
                      <p className="text-xs text-gray-400">
                        Jobs tailored to your profile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500/20 to-violet-600/20 border border-white/10">
                      <Clock size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Quick Apply</p>
                      <p className="text-xs text-gray-400">
                        Apply to jobs in one click
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

            {/* Right Side - Login Form */}
            <div className="rounded-r-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-violet-500/30">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="text-sm text-gray-400 mt-2">
                  Sign in to continue your job search
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
                {/* Email Field */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
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
                    <Mail size={14} className="inline mr-1.5 text-violet-400" />
                    Email Address
                  </Label>
                  <Input placeholder="john@example.com" />
                  <FieldError />
                </TextField>

                {/* Password Field with InputGroup */}
                <TextField
                  isRequired
                  name="password"
                  value={password}
                  onChange={setPassword}
                >
                  <Label className="text-sm text-gray-300">
                    <Lock size={14} className="inline mr-1.5 text-violet-400" />
                    Password
                  </Label>
                  <InputGroup>
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
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
                  <FieldError />
                </TextField>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-violet-400 hover:text-violet-300 transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button - Full Width */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-linear-to-r from-fuchsia-500 to-violet-600 text-white font-medium shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <LogIn size={16} className="mr-2" />
                  Sign In
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
                    onClick={handleGoogleLogin}
                    className="p-3 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign in with Google"
                  >
                    <FcGoogle size={20} />
                  </button>
                  <button
                    onClick={handleGithubLogin}
                    className="p-3 rounded-full border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Sign in with GitHub"
                  >
                    <FaGithub size={20} />
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-400 mt-2">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Create free account
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
