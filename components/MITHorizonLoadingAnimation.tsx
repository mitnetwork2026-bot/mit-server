"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MITHorizonLoadingAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const loadingStages = [
  "verifying...",
  "analyzing...",
  "assembling...",
  "authorizing...",
  "monalizing...",
];

export default function MITHorizonLoadingAnimation({
  isVisible,
  onComplete,
}: MITHorizonLoadingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Cycle through stages every ~8 seconds
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % loadingStages.length);
    }, 8000);

    // Progress animation for 40 seconds total
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 40; // 40 seconds total
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-950/95 via-slate-950/95 to-blue-900/95 backdrop-blur-md"
    >
      {/* Main CPU-like Loading Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mb-16"
      >
        {/* Central CPU Core */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 40px rgba(59, 130, 246, 0.2)",
              "0 0 80px rgba(6, 182, 212, 1), inset 0 0 80px rgba(6, 182, 212, 0.3)",
              "0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 40px rgba(59, 130, 246, 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative flex h-40 w-40 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 p-3 shadow-2xl"
        >
          {/* Logo Container */}
          <motion.div className="relative h-full w-full rounded-lg bg-black/40 flex items-center justify-center">
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
              alt="MIT Logo"
              className="h-32 w-32 rounded-lg object-contain"
              crossOrigin="anonymous"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))",
                  "drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))",
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Rotating Border - CPU Circuit effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-xl border-2 border-transparent border-t-cyan-300 border-r-blue-400"
          />
        </motion.div>

        {/* Outer Pulsing Rings - CPU cores */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border-2 border-blue-400/30"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border border-cyan-400/20"
        />

        {/* Corner LED indicators */}
        {[
          { pos: "top-0 left-0", delay: 0 },
          { pos: "top-0 right-0", delay: 0.2 },
          { pos: "bottom-0 right-0", delay: 0.4 },
          { pos: "bottom-0 left-0", delay: 0.6 },
        ].map((led, idx) => (
          <motion.div
            key={idx}
            className={`absolute w-3 h-3 rounded-full bg-cyan-400 ${led.pos}`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: led.delay }}
          />
        ))}
      </motion.div>

      {/* Stage Text - Changes dynamically */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-lg font-semibold text-blue-200 mb-2">
          Initializing Horizon
        </p>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-cyan-300 font-mono"
        >
          {loadingStages[currentStage]}
        </motion.p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div className="w-64 h-2 rounded-full bg-blue-950/50 border border-blue-700/30 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Percentage Text */}
      <motion.p className="mt-4 text-xs text-blue-300/60 font-mono">
        {Math.round(progress)}%
      </motion.p>

      {/* Status indicator */}
      <motion.div className="mt-8 flex items-center gap-2">
        <motion.div
          className="h-2 w-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-xs text-blue-300/50">Connected to Horizon Network</span>
      </motion.div>
    </motion.div>
  );
}
