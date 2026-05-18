"use client";

import { motion } from "framer-motion";
import { Server, Database, Zap, Shield, Lock, Cpu, Globe, Settings, Terminal, Wifi, BarChart3, Key, Activity, Code2, MoreVertical, HardDrive } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

interface ProxySiteHomePageProps {
  onNavigate: (page: string) => void;
  userEmail?: string;
}

const proxyFeatures = [
  { id: "c-server", label: "C Server", icon: Server, description: "Command Server" },
  { id: "data-analysis", label: "Analysis", icon: Database, description: "Data Analytics" },
  { id: "monitor", label: "Monitor", icon: Zap, description: "System Monitor" },
  { id: "storage", label: "Storage", icon: HardDrive, description: "Data Storage" },
  { id: "cpu-monitor", label: "CPU Monitor", icon: Cpu, description: "Processor Stats" },
  { id: "network-map", label: "Network Map", icon: Globe, description: "Network Topology" },
  { id: "security", label: "Security", icon: Shield, description: "Security Audit" },
  { id: "settings", label: "Settings", icon: Settings, description: "Configuration" },
  { id: "terminal", label: "Terminal", icon: Terminal, description: "SSH Shell Access" },
  { id: "proxy-stats", label: "Proxy Stats", icon: BarChart3, description: "Traffic Analytics" },
  { id: "encryption", label: "Encryption", icon: Key, description: "Crypto Tools" },
  { id: "api-tools", label: "API Tools", icon: Code2, description: "API Management" },
  { id: "network-status", label: "Net Status", icon: Wifi, description: "Live Network" },
  { id: "system-health", label: "Health", icon: Activity, description: "System Health" },
];

export default function ProxySiteHomePage({ onNavigate, userEmail }: ProxySiteHomePageProps) {
  return (
    <ProxyBackground>
      <div className="relative min-h-screen px-4 pb-32 pt-28">
        {/* Content */}
        <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-2 shadow-2xl"
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

          <h1 className="text-3xl font-bold text-white sm:text-4xl">MIT PROXY</h1>
          <p className="mt-2 text-blue-400/80">Advanced Network Control Panel</p>
          {userEmail && (
            <p className="mt-2 text-xs text-blue-400/60">Welcome, {userEmail}</p>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 grid max-w-6xl gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {proxyFeatures.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-lg border border-blue-500/25 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl transition-all hover:border-blue-400/40 hover:bg-blue-950/35 hover:shadow-lg hover:shadow-blue-500/15"
            >
              <div className="relative z-10">
                <motion.div
                  className="mb-2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <feature.icon size={18} className="text-white sm:h-5 sm:w-5" />
                </motion.div>
                <h3 className="text-left text-xs sm:text-sm font-bold text-blue-100">{feature.label}</h3>
                <p className="mt-0.5 text-left text-xs text-blue-400/50 hidden sm:block">{feature.description}</p>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Status Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl rounded-lg border border-blue-500/25 bg-blue-950/25 p-4 sm:p-5 backdrop-blur-xl"
        >
          <h2 className="text-sm sm:text-base font-bold text-blue-100">System Status</h2>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-blue-300/80">Network</span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
                <span className="text-xs text-blue-300">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-blue-300/80">Proxy</span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
                <span className="text-xs text-blue-300">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-blue-300/80">Security</span>
              <span className="rounded px-2 py-0.5 text-xs font-semibold text-blue-300 bg-blue-500/20">
                MAX
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </ProxyBackground>
  );
}
