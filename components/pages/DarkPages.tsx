"use client";

import { motion } from "framer-motion";
import { Skull, Eye, Shield, Lock, Zap, SkipForward } from "lucide-react";

interface PageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DarkPageTemplate = ({ title, description, icon }: PageProps) => {
  return (
    <main 
      className="min-h-screen px-3 py-16 sm:px-4 sm:py-20 md:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://i.postimg.cc/nh1vKFs4/file-00000000748871faab2cff1000c4b4bb.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Liquid Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-black/10 to-gray-950/5" />
      
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
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg shadow-gray-500/30">
            <span className="text-white font-bold text-lg sm:text-xl">MIT</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mb-8">
          <motion.div
            animate={{ rotate: [-10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/40 backdrop-blur-md"
            style={{
              boxShadow: "0 8px 32px rgba(107, 114, 128, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {icon}
          </motion.div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-balance drop-shadow-lg">{title}</h1>
            <p className="text-gray-300/60 mt-2 text-sm sm:text-base">{description}</p>
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
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-700/20 bg-gradient-to-br from-gray-900/30 to-black/40 backdrop-blur-2xl cursor-pointer"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(75, 85, 99, 0.2)",
              }}
            >
              <h3 className="text-white font-semibold mb-3">Restricted Module {idx}</h3>
              <p className="text-gray-300/50 text-sm mb-4">
                Classified operation and access control
              </p>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-700 to-gray-600"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2 + idx * 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dark Status Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-700/20 bg-gradient-to-r from-gray-900/30 to-black/40 backdrop-blur-2xl"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(75, 85, 99, 0.2)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Operational Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Status: Hidden", "Trace: 0%", "Access: Restricted"].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-gray-300/50 text-sm mb-2">{stat.split(":")[0]}</p>
                <motion.p
                  className="text-2xl font-bold text-gray-300"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.split(":")[1]}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.p
          className="mt-8 text-center text-[8px] sm:text-[9px] md:text-[10px] text-gray-600/30 font-mono"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚠ CLASSIFIED INFORMATION ⚠
        </motion.p>
      </motion.div>
    </main>
  );
};

export function DarkAccessPage() {
  return (
    <DarkPageTemplate
      title="Access Control"
      description="Restricted entry management system"
      icon={<Shield className="w-8 h-8 text-purple-400" />}
    />
  );
}

export function DarkSurveillancePage() {
  return (
    <DarkPageTemplate
      title="Surveillance"
      description="Target monitoring and tracking system"
      icon={<Eye className="w-8 h-8 text-purple-400" />}
    />
  );
}

export function DarkEncryptionPage() {
  return (
    <DarkPageTemplate
      title="Encryption Vault"
      description="Advanced cryptographic security layer"
      icon={<Lock className="w-8 h-8 text-purple-400" />}
    />
  );
}

export function DarkPowerPage() {
  return (
    <DarkPageTemplate
      title="Power Management"
      description="System control and energy distribution"
      icon={<Zap className="w-8 h-8 text-purple-400" />}
    />
  );
}

export function DarkThreatPage() {
  return (
    <DarkPageTemplate
      title="Threat Analysis"
      description="Classified threat intelligence database"
      icon={<Skull className="w-8 h-8 text-purple-400" />}
    />
  );
}

export function DarkExitPage() {
  return (
    <DarkPageTemplate
      title="Session Exit"
      description="Logout and purge session data"
      icon={<SkipForward className="w-8 h-8 text-purple-400" />}
    />
  );
}
