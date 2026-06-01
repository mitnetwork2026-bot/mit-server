"use client";

import { motion } from "framer-motion";

interface MITHorizonWelcomePageProps {
  onGetStarted: () => void;
}

export default function MITHorizonWelcomePage({
  onGetStarted,
}: MITHorizonWelcomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mb-8"
      >
        <motion.div
          className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-2 shadow-2xl"
          animate={{
            boxShadow: [
              "0 0 30px rgba(59, 130, 246, 0.6)",
              "0 0 60px rgba(6, 182, 212, 1)",
              "0 0 30px rgba(59, 130, 246, 0.6)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
            alt="MIT Horizon"
            className="h-full w-full rounded-full object-contain"
            crossOrigin="anonymous"
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
          Welcome to MIT Horizon
        </h1>
        <p className="text-blue-200/80 text-lg mb-8">
          Enter the next generation of secured cloud computing. Explore advanced analytics, secure data management, and real-time monitoring in a liquid glass interface.
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
        className="group relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
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
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
      >
        {[
          {
            icon: "🔒",
            title: "Secure",
            description: "Military-grade encryption",
          },
          {
            icon: "⚡",
            title: "Fast",
            description: "Real-time data processing",
          },
          {
            icon: "📊",
            title: "Analytics",
            description: "Advanced insights & reports",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-blue-200/60 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
