"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Database,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  Brain,
  Home,
} from "lucide-react";

interface HorizonSideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onExit: () => void;
}

const horizonMenuItems = [
  { id: "horizon-home", label: "Dashboard", icon: Home, color: "text-blue-400" },
  { id: "data", label: "Data Management", icon: Database, color: "text-cyan-400" },
  { id: "metrics", label: "Metrics", icon: BarChart3, color: "text-blue-300" },
  { id: "notifications", label: "Notifications", icon: Bell, color: "text-cyan-400" },
  { id: "profile", label: "Profile", icon: User, color: "text-blue-400" },
  { id: "ai-connectivity", label: "AI Connectivity", icon: Brain, color: "text-cyan-300" },
  { id: "settings", label: "Settings", icon: Settings, color: "text-blue-300" },
];

export default function HorizonSideNavigation({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onExit,
}: HorizonSideNavigationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-72 border-l border-green-400/30 bg-gradient-to-b from-green-950/40 via-emerald-900/35 to-green-900/40 backdrop-blur-2xl sm:w-80"
            style={{
              background: "linear-gradient(to bottom, rgba(5, 65, 40, 0.4), rgba(6, 78, 59, 0.35), rgba(5, 65, 40, 0.4))",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 0 rgba(34, 197, 94, 0.2)",
            }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-green-400/30 bg-gradient-to-r from-green-950/30 to-emerald-900/25 p-3 sm:p-4" style={{
                background: "linear-gradient(to right, rgba(5, 65, 40, 0.3), rgba(6, 78, 59, 0.25))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(34, 197, 94, 0.1)",
              }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 sm:h-14 sm:w-14"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))",
                        "drop-shadow(0 0 24px rgba(6, 182, 212, 0.8))",
                        "drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                      alt="MIT Horizon Logo" 
                      className="h-full w-full rounded-full object-contain"
                      crossOrigin="anonymous"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-400/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-sm font-bold text-white sm:text-base">MIT HORIZON</h2>
                    <p className="text-[10px] text-cyan-400/60 sm:text-xs">Cloud Console</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-xl p-2 text-cyan-400/60 transition-colors hover:bg-blue-500/10 hover:text-cyan-400"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <div className="space-y-1.5 sm:space-y-2">
                  {horizonMenuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-all sm:gap-3 sm:px-4 sm:py-3 ${
                        currentPage === item.id
                          ? "border border-green-400/40 bg-gradient-to-r from-green-500/20 to-emerald-500/15 text-green-50"
                          : "text-green-400/60 hover:bg-green-500/15 hover:text-green-100"
                      }`}
                    >
                      <item.icon size={18} className={`${item.color} sm:h-5 sm:w-5`} />
                      <span className="text-sm font-medium sm:text-base">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-green-400/30 bg-gradient-to-r from-green-950/30 to-emerald-900/25 p-3 sm:p-4" style={{
                background: "linear-gradient(to right, rgba(5, 65, 40, 0.3), rgba(6, 78, 59, 0.25))",
                backdropFilter: "blur(10px)",
              }}>
                <motion.button
                  onClick={onExit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500/25 to-emerald-500/20 py-2.5 text-sm font-medium text-green-50 transition-colors hover:from-green-500/40 hover:to-emerald-500/35 sm:py-3"
                >
                  <LogOut size={18} className="sm:h-5 sm:w-5" />
                  Back to Main
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
