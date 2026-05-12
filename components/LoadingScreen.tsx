"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
          alt="MIT Network Logo" 
          className="h-36 w-36 object-contain sm:h-44 sm:w-44"
          crossOrigin="anonymous"
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))",
              "drop-shadow(0 0 60px rgba(16, 185, 129, 0.8))",
              "drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          className="absolute -inset-4 rounded-[2rem] border-2 border-emerald-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-8 rounded-[2.5rem] border border-emerald-500/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h1 className="text-2xl font-bold text-white sm:text-3xl">MIT NETWORK</h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        className="mt-8 h-1 w-40 origin-left rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 sm:w-48"
      />
    </motion.div>
  );
}
