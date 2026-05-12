"use client";

import { motion } from "framer-motion";
import { MoreVertical, Bell, User } from "lucide-react";

interface GlassHeaderProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export default function GlassHeader({ onMenuClick, onNotificationClick, onProfileClick }: GlassHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40"
    >
      <div className="mx-2 mt-2 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 shadow-lg shadow-emerald-500/5 backdrop-blur-xl sm:mx-4 sm:mt-4">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
              alt="MIT Network Logo" 
              className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] sm:h-12 sm:w-12"
              crossOrigin="anonymous"
            />
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
              className="rounded-xl p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <User size={18} className="sm:h-5 sm:w-5" />
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
