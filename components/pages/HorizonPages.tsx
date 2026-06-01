"use client";

import { motion } from "framer-motion";
import { BarChart3, Database, Settings, Bell, User, LogOut } from "lucide-react";

interface PageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HorizonPageTemplate = ({ title, description, icon }: PageProps) => {
  return (
    <main 
      className="min-h-screen px-3 py-16 sm:px-4 sm:py-20 md:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://i.postimg.cc/tC27RY82/file-0000000004e0720783388eb9c86621af.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Liquid Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-cyan-900/20 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* MIT Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40">
            <span className="text-white font-bold text-lg sm:text-xl">MIT</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl backdrop-blur-md"
            style={{
              boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            {icon}
          </motion.div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-balance drop-shadow-lg">{title}</h1>
            <p className="text-blue-200/70 mt-2 text-sm sm:text-base">{description}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {[1, 2, 3, 4].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-600/15 to-cyan-600/10 backdrop-blur-2xl"
              style={{
                boxShadow: "0 8px 32px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(34, 197, 94, 0.2)",
              }}
            >
              <h3 className="text-white font-semibold mb-3">Module {idx}</h3>
              <p className="text-blue-200/60 text-sm mb-4">
                Advanced feature module for enhanced operations
              </p>
              <div className="h-2 bg-blue-950/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2 + idx * 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-blue-600/15 to-cyan-600/10 backdrop-blur-2xl"
          style={{
            boxShadow: "0 8px 32px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(34, 197, 94, 0.2)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Status: Active", "Uptime: 99.9%", "Load: 45%"].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-blue-200/60 text-sm mb-2">{stat.split(":")[0]}</p>
                <motion.p
                  className="text-2xl font-bold text-cyan-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.split(":")[1]}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export function HorizonDataPage() {
  return (
    <HorizonPageTemplate
      title="Data Management"
      description="Secure data storage and retrieval systems"
      icon={<Database className="w-8 h-8 text-white" />}
    />
  );
}

export function HorizonMetricsPage() {
  return (
    <HorizonPageTemplate
      title="Performance Metrics"
      description="Real-time analytics and reporting dashboard"
      icon={<BarChart3 className="w-8 h-8 text-white" />}
    />
  );
}

export function HorizonSettingsPage() {
  return (
    <HorizonPageTemplate
      title="System Settings"
      description="Configuration and preferences management"
      icon={<Settings className="w-8 h-8 text-white" />}
    />
  );
}

export function HorizonNotificationsPage() {
  return (
    <HorizonPageTemplate
      title="Notifications"
      description="Real-time alerts and system notifications"
      icon={<Bell className="w-8 h-8 text-white" />}
    />
  );
}

export function HorizonProfilePage() {
  return (
    <HorizonPageTemplate
      title="User Profile"
      description="Account settings and personal preferences"
      icon={<User className="w-8 h-8 text-white" />}
    />
  );
}

export function HorizonLogoutPage() {
  return (
    <HorizonPageTemplate
      title="Logout Confirmation"
      description="End your current session"
      icon={<LogOut className="w-8 h-8 text-white" />}
    />
  );
}
