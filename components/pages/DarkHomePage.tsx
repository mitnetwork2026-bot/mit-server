"use client";

import { motion } from "framer-motion";
import { Eye, Shield, Zap, Skull, Lock, Network } from "lucide-react";

export default function DarkHomePage() {
  const cards = [
    { title: "Shadow Networks", icon: Network, color: "from-purple-800 to-gray-700" },
    { title: "Access Control", icon: Shield, color: "from-gray-800 to-purple-700" },
    { title: "Encrypted Ops", icon: Lock, color: "from-purple-700 to-gray-800" },
    { title: "Threat Analysis", icon: Eye, color: "from-gray-700 to-purple-800" },
    { title: "System Hack", icon: Skull, color: "from-purple-900 to-gray-900" },
    { title: "Power Control", icon: Zap, color: "from-gray-900 to-purple-900" },
  ];

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
      {/* Dark Liquid Glass Overlay - Much lighter for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black/20 to-gray-950/15 backdrop-blur-xs" />
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
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-600 to-gray-700 shadow-lg shadow-purple-500/50">
            <span className="text-white font-bold text-xl sm:text-2xl">MIT</span>
          </div>
        </motion.div>

        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
            MIT Dark Console
          </h1>
          <p className="text-purple-300/60 text-sm sm:text-base lg:text-lg">
            Restricted network operations and shadow server management
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
                className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-purple-600/20 bg-gradient-to-br ${card.color} bg-opacity-10 backdrop-blur-xl overflow-hidden group`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [-10, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl w-fit"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{card.title}</h3>
                  <p className="text-purple-300/50 text-xs sm:text-sm">
                    Click to access
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dark Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 sm:mt-16 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-700/30 bg-gradient-to-r from-purple-900/20 to-gray-900/30 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Operational Status</h3>
              <p className="text-purple-300/50 text-xs sm:text-sm">All systems hidden & operational</p>
            </div>
            <motion.div
              className="h-3 w-3 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Warning */}
        <motion.p
          className="mt-8 sm:mt-12 text-center text-[8px] sm:text-[9px] md:text-[10px] text-purple-600/30 font-mono"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ▓▒░ RESTRICTED ACCESS ░▒▓
        </motion.p>
      </motion.div>
    </main>
  );
}
