"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { X, Mail, Lock, User, Chrome, Loader2, Camera, Upload } from "lucide-react";

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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  // Convert file to base64 for storage in Realtime Database
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Profile picture must be less than 5MB");
        return;
      }
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      
      if (name.trim().length < 2) {
        setError("Please enter a valid name");
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        // Sign up with email, password, and name
        await signUp(email, password, name);
        
        // Note: Profile picture will be handled by the AuthContext's default profile
        // If you want to update profile picture after signup, you can use updateUserProfile
        // But for now, the AuthContext creates a default profile
      } else {
        await signIn(email, password);
      }
      onSuccess();
      resetForm();
    } catch (err: any) {
      console.error("Auth error:", err);
      let errorMessage = "An error occurred";
      
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Wrong password";
      } else if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign in cancelled";
      } else if (err.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked by browser";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
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
      resetForm();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      let errorMessage = "An error occurred with Google sign in";
      
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign in cancelled";
      } else if (err.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked by browser";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setProfilePicture(null);
    setProfilePicturePreview("");
    setError("");
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
            className="relative w-full max-w-md overflow-y-auto max-h-[90vh] rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/90 via-black/95 to-emerald-900/80 p-5 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl sm:p-8"
          >
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400 z-10"
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
                <>
                  <div className="group relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50 transition-colors group-focus-within:text-emerald-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <div 
                      className="relative cursor-pointer group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-emerald-950/50 flex items-center justify-center">
                        {profilePicturePreview ? (
                          <img 
                            src={profilePicturePreview} 
                            alt="Profile preview" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-emerald-400/60" />
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                    <p className="text-xs text-emerald-400/60">Click to upload profile picture (optional, max 5MB)</p>
                  </div>
                </>
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
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 font-medium text-white transition-all hover:border-emerald-400/50 hover:bg-emerald-950/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="h-5 w-5 text-emerald-400" />
              Google
            </motion.button>

            <p className="mt-6 text-center text-sm text-emerald-500/60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setProfilePicture(null);
                  setProfilePicturePreview("");
                }}
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
