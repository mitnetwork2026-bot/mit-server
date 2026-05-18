"use client";

import { motion } from "framer-motion";
import { Server, Database, Zap, Shield, Lock, Cpu, Globe, Settings } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

interface ProxySiteHomePageProps {
  onNavigate: (page: string) => void;
  userEmail?: string;
}

const proxyFeatures = [
  { id: "c-server", label: "C Server", icon: Server, description: "Command Server" },
  { id: "data-analysis", label: "Analysis", icon: Database, description: "Data Analytics" },
  { id: "monitor", label: "Monitor", icon: Zap, description: "System Monitor" },
  { id: "storage", label: "Storage", icon: Lock, description: "Data Storage" },
  { id: "cpu-monitor", label: "CPU Monitor", icon: Cpu, description: "Processor Stats" },
  { id: "network-map", label: "Network Map", icon: Globe, description: "Network Topology" },
  { id: "security", label: "Security", icon: Shield, description: "Security Audit" },
  { id: "settings", label: "Settings", icon: Settings, description: "Configuration" },
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
          className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {proxyFeatures.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-2xl border border-blue-400/30 bg-black/30 p-6 backdrop-blur-xl transition-all hover:border-blue-300/50 hover:bg-black/40 hover:shadow-lg hover:shadow-blue-400/20"
            >
              <div className="relative z-10">
                <motion.div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-600"
                  group-hover={{ scale: 1.1 }}
                >
                  <feature.icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-left text-sm font-bold text-white">{feature.label}</h3>
                <p className="mt-1 text-left text-xs text-blue-400/60">{feature.description}</p>
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
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-blue-400/30 bg-black/30 p-6 backdrop-blur-xl"
        >
          <h2 className="text-lg font-bold text-white">System Status</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-400/80">Network Connection</span>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-blue-400"
                />
                <span className="text-xs text-blue-400">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-400/80">Proxy Status</span>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-blue-400"
                />
                <span className="text-xs text-blue-400">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-400/80">Security Level</span>
              <span className="rounded-lg bg-blue-400/20 px-2 py-1 text-xs font-semibold text-blue-400">
                MAXIMUM
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </ProxyBackground>
  );
}
