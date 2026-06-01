"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Eye,
  Lock,
  Zap,
  SkipForward,
  Brain,
  Home,
  Skull,
} from "lucide-react";

interface DarkSideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onExit: () => void;
}

const darkMenuItems = [
  { id: "dark-home", label: "Console", icon: Home, color: "text-gray-400" },
  { id: "access", label: "Access Control", icon: Shield, color: "text-gray-300" },
  { id: "surveillance", label: "Surveillance", icon: Eye, color: "text-gray-400" },
  { id: "encryption", label: "Encryption", icon: Lock, color: "text-gray-300" },
  { id: "power", label: "Power Control", icon: Zap, color: "text-gray-400" },
  { id: "threat", label: "Threat Analysis", icon: Skull, color: "text-gray-300" },
  { id: "ai-connectivity", label: "AI Connectivity", icon: Brain, color: "text-gray-400" },
];

export default function DarkSideNavigation({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onExit,
}: DarkSideNavigationProps) {
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
            className="fixed bottom-0 right-0 top-0 z-50 w-72 border-l border-gray-600/20 bg-gradient-to-b from-gray-900/60 via-black/70 to-gray-900/60 backdrop-blur-2xl sm:w-80"
            style={{
              background: "linear-gradient(to bottom, rgba(17, 24, 39, 0.6), rgba(0, 0, 0, 0.7), rgba(17, 24, 39, 0.6))",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 0 rgba(75, 85, 99, 0.2), 0 0 40px rgba(107, 114, 128, 0.1)",
            }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-600/20 bg-gradient-to-r from-gray-900/40 to-black/50 p-3 sm:p-4" style={{
                background: "linear-gradient(to right, rgba(17, 24, 39, 0.4), rgba(0, 0, 0, 0.5))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(107, 114, 128, 0.1)",
              }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-900 to-gray-800 p-1 sm:h-14 sm:w-14 border border-purple-700/40"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))",
                        "drop-shadow(0 0 24px rgba(168, 85, 247, 0.7))",
                        "drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                      alt="MIT Dark Logo" 
                      className="h-full w-full rounded-full object-contain"
                      crossOrigin="anonymous"
                      style={{ filter: "brightness(0.85)" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-purple-600/30"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-sm font-bold text-white sm:text-base">MIT DARK</h2>
                    <p className="text-[10px] text-gray-400/60 sm:text-xs">Restricted Access</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-xl p-2 text-gray-400/60 transition-colors hover:bg-gray-700/20 hover:text-gray-400"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <div className="space-y-1.5 sm:space-y-2">
                  {darkMenuItems.map((item, index) => (
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
                          ? "border border-gray-500/40 bg-gradient-to-r from-gray-700/30 to-gray-600/20 text-gray-100"
                          : "text-gray-400/60 hover:bg-gray-700/20 hover:text-gray-200"
                      }`}
                    >
                      <item.icon size={18} className={`${item.color} sm:h-5 sm:w-5`} />
                      <span className="text-sm font-medium sm:text-base">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-600/20 bg-gradient-to-r from-gray-900/40 to-black/50 p-3 sm:p-4" style={{
                background: "linear-gradient(to right, rgba(17, 24, 39, 0.4), rgba(0, 0, 0, 0.5))",
                backdropFilter: "blur(10px)",
              }}>
                <motion.button
                  onClick={onExit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gray-700/30 to-gray-600/20 py-2.5 text-sm font-medium text-gray-100 transition-colors hover:from-gray-700/50 hover:to-gray-600/40 sm:py-3"
                >
                  <SkipForward size={18} className="sm:h-5 sm:w-5" />
                  Exit Dark
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
