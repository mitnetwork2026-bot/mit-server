"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Smartphone,
  Globe,
  Wifi,
  Radar,
  Satellite,
  Eye,
  Coins,
  FileText,
  Info,
  Terminal,
  HelpCircle,
  Users,
  LogOut,
  Server,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Shield },
  { id: "server-network", label: "Server Network", icon: Server },
  { id: "nsp", label: "NSP", icon: Shield },
  { id: "device-data", label: "Device Data", icon: Smartphone },
  { id: "mirror-web", label: "Mirror Web", icon: Globe },
  { id: "onion-web", label: "Onion Web", icon: Globe },
  { id: "radar-controller", label: "Radar Controller", icon: Radar },
  { id: "satellite-data", label: "Satellite Data", icon: Satellite },
  { id: "system-observing", label: "System Observing", icon: Eye },
  { id: "node-token", label: "Node Token", icon: Coins },
  { id: "mega-log-reader", label: "Mega Log Reader", icon: FileText },
  { id: "device-info", label: "Device Info", icon: Info },
  { id: "device-access", label: "Device Access", icon: Wifi },
  { id: "kali-linux", label: "Kali Linux", icon: Terminal },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "about", label: "About", icon: Users },
];

export default function SideNavigation({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}: SideNavigationProps) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

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
            className="fixed bottom-0 right-0 top-0 z-50 w-72 border-l border-emerald-500/20 bg-gradient-to-b from-emerald-950/95 via-black/95 to-emerald-950/95 backdrop-blur-xl sm:w-80"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-emerald-500/20 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                    alt="MIT Network Logo" 
                    className="h-12 w-12 object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] sm:h-14 sm:w-14"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-white sm:text-base">MIT NETWORK</h2>
                    <p className="max-w-[140px] truncate text-[10px] text-emerald-400/60 sm:max-w-[160px] sm:text-xs">{user?.email || "Console"}</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-xl p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <div className="space-y-1.5 sm:space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all sm:gap-3 sm:px-4 sm:py-3 ${
                        currentPage === item.id
                          ? "border border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                          : "text-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-400"
                      }`}
                    >
                      <item.icon size={18} className="sm:h-5 sm:w-5" />
                      <span className="text-sm font-medium sm:text-base">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="border-t border-emerald-500/20 p-3 sm:p-4">
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 sm:py-3"
                >
                  <LogOut size={18} className="sm:h-5 sm:w-5" />
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
