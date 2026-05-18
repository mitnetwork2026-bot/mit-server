"use client";

import { motion } from "framer-motion";

interface ProxyLoadingAnimationProps {
  isVisible: boolean;
}

export default function ProxyLoadingAnimation({ isVisible }: ProxyLoadingAnimationProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-900/95 backdrop-blur-md"
    >
      {/* Animated Logo Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mb-12"
      >
        {/* Main Circle */}
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
              "drop-shadow(0 0 50px rgba(6, 182, 212, 1))",
              "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-2 shadow-2xl"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
            alt="MIT Logo"
            className="h-full w-full rounded-full object-contain"
            crossOrigin="anonymous"
          />

          {/* Rotating Border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-300 border-r-blue-400"
          />
        </motion.div>

        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-blue-500/30"
        />

        {/* Pulsing Rings */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-cyan-400/20"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-blue-400/10"
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="mb-2 text-lg font-semibold text-blue-200">Initializing Proxy Site</p>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-blue-300/70"
        >
          Connecting to secure network...
        </motion.p>
      </motion.div>

      {/* Loading Progress Dots */}
      <motion.div className="mt-12 flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ y: [-8, 0, -8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
