"use client";

import { motion } from "framer-motion";
import { BarChart3, Cloud, Zap, Lock, Database, Globe } from "lucide-react";

export default function HorizonHomePage() {
  const cards = [
    { title: "Cloud Analytics", icon: Cloud, color: "from-blue-600 to-cyan-500" },
    { title: "Real-time Data", icon: Database, color: "from-cyan-600 to-blue-500" },
    { title: "Performance Metrics", icon: BarChart3, color: "from-blue-700 to-cyan-600" },
    { title: "Security Status", icon: Lock, color: "from-cyan-700 to-blue-600" },
    { title: "Network Monitor", icon: Globe, color: "from-blue-500 to-cyan-600" },
    { title: "Power Management", icon: Zap, color: "from-cyan-600 to-blue-700" },
  ];

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
      {/* Liquid Glass Overlay - Much lighter for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/5 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* MIT Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
            <span className="text-white font-bold text-xl sm:text-2xl">MIT</span>
          </div>
        </motion.div>

        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
            MIT Horizon Dashboard
          </h1>
          <p className="text-blue-200/70 text-sm sm:text-base lg:text-lg">
            Advanced cloud operations and real-time monitoring system
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-blue-400/20 bg-gradient-to-br ${card.color} bg-opacity-10 backdrop-blur-xl overflow-hidden group`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl w-fit"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{card.title}</h3>
                  <p className="text-blue-200/60 text-xs sm:text-sm">
                    Click to access
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 sm:mt-16 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">System Status</h3>
              <p className="text-blue-200/60 text-xs sm:text-sm">All systems operational</p>
            </div>
            <motion.div
              className="h-3 w-3 rounded-full bg-green-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
