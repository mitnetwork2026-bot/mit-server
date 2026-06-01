"use client";

import { motion } from "framer-motion";

interface MITDarkWelcomePageProps {
  onGetStarted: () => void;
}

export default function MITDarkWelcomePage({
  onGetStarted,
}: MITDarkWelcomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-purple-950"
    >
      {/* Spooky animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-32 left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
      </div>

      {/* Logo with spooky effect */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mb-8"
      >
        <motion.div
          className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-900 to-gray-800 p-2 shadow-2xl border-2 border-purple-700/40"
          animate={{
            boxShadow: [
              "0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)",
              "0 0 50px rgba(168, 85, 247, 0.6), inset 0 0 50px rgba(168, 85, 247, 0.2)",
              "0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
            alt="MIT Dark"
            className="h-full w-full rounded-full object-contain"
            crossOrigin="anonymous"
            style={{ filter: "brightness(0.9)" }}
          />
        </motion.div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Welcome to MIT Dark
        </h1>
        <p className="text-purple-300/70 text-lg mb-8">
          Access the restricted domain of advanced security operations. Navigate encrypted networks, manage shadow servers, and control restricted access points in complete darkness.
        </p>
      </motion.div>

      {/* Get Started Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onGetStarted}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-gray-700 px-10 py-4 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40"
      >
        <span className="relative z-10 flex items-center gap-2 text-lg">
          Get Started
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-gray-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Dark Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
      >
        {[
          {
            icon: "🔐",
            title: "Encrypted",
            description: "Zero-knowledge architecture",
          },
          {
            icon: "👁️",
            title: "Invisible",
            description: "Undetectable operations",
          },
          {
            icon: "⚔️",
            title: "Advanced",
            description: "Restricted access control",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-purple-600/30 bg-gradient-to-br from-purple-900/15 to-gray-900/30 backdrop-blur-md text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-purple-300/50 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Warning indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <motion.p
          className="text-[10px] text-purple-600/40 font-mono"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚠ RESTRICTED AREA ⚠
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
