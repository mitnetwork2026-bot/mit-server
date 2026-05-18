"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Server,
  Database,
  Zap,
  Lock,
  Cpu,
  Globe,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

interface ProxySideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onExit: () => void;
}

const proxyMenuItems = [
  { id: "proxy-home", label: "Home", icon: Server, color: "text-blue-400" },
  { id: "c-server", label: "C Server", icon: Server, color: "text-cyan-400" },
  { id: "data-analysis", label: "Analysis", icon: Database, color: "text-blue-300" },
  { id: "monitor", label: "Monitor", icon: Zap, color: "text-cyan-300" },
  { id: "storage", label: "Storage", icon: Database, color: "text-blue-400" },
  { id: "cpu-monitor", label: "CPU Monitor", icon: Cpu, color: "text-cyan-400" },
  { id: "network-map", label: "Network Map", icon: Globe, color: "text-blue-300" },
  { id: "security", label: "Security", icon: Lock, color: "text-cyan-400" },
  { id: "settings", label: "Settings", icon: Settings, color: "text-blue-400" },
];

export default function ProxySideNavigation({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onExit,
}: ProxySideNavigationProps) {
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
            className="fixed bottom-0 right-0 top-0 z-50 w-72 border-l border-blue-900/40 bg-gradient-to-b from-slate-950/95 via-blue-950/92 to-slate-900/95 backdrop-blur-md sm:w-80"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-blue-800/30 bg-gradient-to-r from-slate-950/40 to-blue-950/40 p-3 sm:p-4">
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
                      alt="MIT PROXY Logo" 
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
                    <h2 className="text-sm font-bold text-white sm:text-base">MIT PROXY</h2>
                    <p className="text-[10px] text-cyan-400/60 sm:text-xs">Network Panel</p>
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
                  {proxyMenuItems.map((item, index) => (
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
                          ? "border border-blue-500/40 bg-gradient-to-r from-blue-700/20 to-cyan-700/15 text-blue-100"
                          : "text-blue-400/60 hover:bg-blue-700/15 hover:text-blue-200"
                      }`}
                    >
                      <item.icon size={18} className={`${item.color} sm:h-5 sm:w-5`} />
                      <span className="text-sm font-medium sm:text-base">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-blue-800/30 bg-gradient-to-r from-slate-950/40 to-blue-950/40 p-3 sm:p-4">
                <motion.button
                  onClick={onExit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700/25 to-blue-600/20 py-2.5 text-sm font-medium text-blue-100 transition-colors hover:from-blue-700/40 hover:to-blue-600/35 sm:py-3"
                >
                  <ArrowLeft size={18} className="sm:h-5 sm:w-5" />
                  Exit Proxy
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
