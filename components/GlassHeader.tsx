"use client";

import { motion } from "framer-motion";
import { MoreVertical, Bell, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface GlassHeaderProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export default function GlassHeader({ onMenuClick, onNotificationClick, onProfileClick }: GlassHeaderProps) {
  const { userProfile } = useAuth();

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40"
    >
      <div className="mx-2 mt-2 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 shadow-lg shadow-emerald-500/5 backdrop-blur-xl sm:mx-4 sm:mt-4">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-1 shadow-lg shadow-emerald-500/30 sm:h-12 sm:w-12"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))",
                  "drop-shadow(0 0 16px rgba(16, 185, 129, 0.8))",
                  "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                alt="MIT Network Logo" 
                className="h-full w-full rounded-full object-contain"
                crossOrigin="anonymous"
              />
              <motion.div
                className="absolute -inset-1 rounded-full border border-emerald-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div>
              <h1 className="text-xs font-semibold text-white sm:text-sm">MIT NETWORK</h1>
              <p className="text-[10px] text-emerald-400/60 sm:text-xs">Secured Console</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <motion.button
              onClick={onNotificationClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative rounded-xl p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Bell size={18} className="sm:h-5 sm:w-5" />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" 
              />
            </motion.button>
            <motion.button
              onClick={onProfileClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 rounded-xl p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              {userProfile?.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="h-6 w-6 rounded-lg object-cover sm:h-7 sm:w-7"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/30 sm:h-7 sm:w-7">
                  <span className="text-xs font-semibold text-emerald-400">
                    {getInitial(userProfile?.displayName || "U")}
                  </span>
                </div>
              )}
            </motion.button>
            <motion.button
              onClick={onMenuClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-xl p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <MoreVertical size={18} className="sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
