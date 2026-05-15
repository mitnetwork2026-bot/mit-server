"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { X, Mail, Lock, User, Chrome, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onSuccess();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/90 via-black/95 to-emerald-900/80 p-5 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <X size={20} />
            </button>

            <div className="mb-6 text-center sm:mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="mx-auto mb-4"
              >
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                  alt="MIT Network Logo" 
                  className="h-24 w-24 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  crossOrigin="anonymous"
                />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="mt-2 text-emerald-400/60">
                {isSignUp ? "Join MIT Network" : "Sign in to continue"}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="group relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50 transition-colors group-focus-within:text-emerald-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              )}

              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50 transition-colors group-focus-within:text-emerald-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50 transition-colors group-focus-within:text-emerald-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-emerald-500/30" />
              <span className="text-sm text-emerald-500/60">or continue with</span>
              <div className="h-px flex-1 bg-emerald-500/30" />
            </div>

            <motion.button
              onClick={handleGoogleSignIn}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 font-medium text-white transition-all hover:border-emerald-400/50 hover:bg-emerald-950/50"
            >
              <Chrome className="h-5 w-5 text-emerald-400" />
              Google
            </motion.button>

            <p className="mt-6 text-center text-sm text-emerald-500/60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
