"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import ProxyBackground from "../ProxyBackground";
import ProxyLoadingAnimation from "../ProxyLoadingAnimation";

interface ProxySiteAuthPageProps {
  onAuthSuccess: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function ProxySiteAuthPage({ onAuthSuccess, isLoading = false }: ProxySiteAuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (isSignUp && !formData.displayName) {
      setError("Please enter your display name");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setShowLoadingAnimation(true);
    setTimeout(() => {
      onAuthSuccess(formData.email, formData.password);
    }, 2000);
  };

  return (
    <ProxyBackground>
      <ProxyLoadingAnimation isVisible={showLoadingAnimation} />
      <div className="relative min-h-screen overflow-hidden px-4 py-8 flex flex-col items-center justify-center">
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <motion.div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-2 shadow-2xl"
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
                  "drop-shadow(0 0 40px rgba(6, 182, 212, 1))",
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative h-full w-full rounded-full overflow-hidden"
            >
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                alt="MIT PROXY Logo" 
                className="h-full w-full rounded-full object-contain"
                crossOrigin="anonymous"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-100">MIT PROXY</h1>
            <p className="mt-2 text-sm text-blue-300/70">Advanced Network Interface</p>
          </div>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md rounded-3xl border border-blue-500/40 bg-blue-950/30 p-8 shadow-2xl backdrop-blur-2xl"
        >
          <div className="mb-6 flex gap-2">
            <motion.button
              onClick={() => {
                setIsSignUp(false);
                setError("");
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
                !isSignUp
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-blue-300/60 hover:text-blue-300"
              }`}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => {
                setIsSignUp(true);
                setError("");
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
                isSignUp
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-blue-300/60 hover:text-blue-300"
              }`}
            >
              Sign Up
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-blue-300/80">Display Name</label>
                <div className="relative mt-2">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50" />
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-blue-500/30 bg-blue-900/30 py-3 pl-10 pr-4 text-white placeholder:text-blue-400/50 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-blue-300/80">Email Address</label>
              <div className="relative mt-2">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-blue-500/30 bg-blue-900/30 py-3 pl-10 pr-4 text-white placeholder:text-blue-400/50 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-300/80">Password</label>
              <div className="relative mt-2">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-blue-500/30 bg-blue-900/30 py-3 pl-10 pr-10 text-white placeholder:text-blue-400/50 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 transition-colors hover:text-blue-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-500/20 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white" />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <>
                  <Shield className="mr-2 inline-block" size={18} />
                  {isSignUp ? "Create Account" : "Access Proxy"}
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-4 text-center text-xs text-blue-300/60">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <motion.button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-blue-300 transition-colors hover:text-blue-300"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </motion.button>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-blue-300/40"
        >
          Secured by MIT Network Infrastructure
        </motion.p>
      </div>
    </ProxyBackground>
  );
}
