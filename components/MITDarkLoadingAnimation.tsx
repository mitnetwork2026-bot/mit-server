"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MITDarkLoadingAnimationProps {
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

export default function MITDarkLoadingAnimation({
  isVisible,
  onComplete,
}: MITDarkLoadingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Cycle through stages every ~10 seconds
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % loadingStages.length);
    }, 10000);

    // Progress animation for 50 seconds total
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 50; // 50 seconds total
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-950/98 via-black/98 to-purple-950/95 backdrop-blur-md overflow-hidden"
    >
      {/* Spooky background ghosts/spirits */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-600/10 blur-3xl"
            style={{
              width: "300px",
              height: "300px",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Ghost Horror Loading Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mb-16 z-10"
      >
        {/* Ghost Logo Container */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)",
              "0 0 60px rgba(168, 85, 247, 0.6), inset 0 0 60px rgba(168, 85, 247, 0.2)",
              "0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-900/80 to-gray-900/80 p-3 shadow-2xl border-2 border-purple-700/40"
        >
          {/* Ghost effect wrapper */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/20 to-transparent" />
          </motion.div>

          {/* Logo */}
          <motion.div className="relative h-full w-full flex items-center justify-center">
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
              alt="MIT Logo"
              className="h-32 w-32 rounded-lg object-contain"
              crossOrigin="anonymous"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(168, 85, 247, 0.3)) brightness(0.8)",
                  "drop-shadow(0 0 25px rgba(168, 85, 247, 0.7)) brightness(1)",
                  "drop-shadow(0 0 10px rgba(168, 85, 247, 0.3)) brightness(0.8)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Rotating ghostly border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-b-purple-600 border-r-purple-500"
          />
        </motion.div>

        {/* Haunting Pulsing Rings */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-purple-500/30"
        />
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-purple-400/15"
        />

        {/* Spooky corner effects */}
        {[
          { pos: "top-2 left-2", delay: 0 },
          { pos: "top-2 right-2", delay: 0.3 },
          { pos: "bottom-2 right-2", delay: 0.6 },
          { pos: "bottom-2 left-2", delay: 0.9 },
        ].map((effect, idx) => (
          <motion.div
            key={idx}
            className={`absolute w-2.5 h-2.5 rounded-full bg-purple-600 ${effect.pos}`}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: effect.delay }}
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
        className="text-center mb-12 z-10"
      >
        <p className="text-lg font-semibold text-purple-300 mb-2">
          Entering Dark Mode
        </p>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-purple-400 font-mono"
        >
          {loadingStages[currentStage]}
        </motion.p>
      </motion.div>

      {/* Progress Bar with ghostly effect */}
      <motion.div className="w-64 h-2.5 rounded-full bg-purple-950/50 border border-purple-700/50 overflow-hidden z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-700 to-purple-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Percentage Text */}
      <motion.p className="mt-4 text-xs text-purple-400/50 font-mono z-10">
        {Math.round(progress)}%
      </motion.p>

      {/* Spooky status indicator */}
      <motion.div className="mt-8 flex items-center gap-2 z-10">
        <motion.div
          className="h-2 w-2 rounded-full bg-purple-500"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-purple-400/40">Connected to Dark Network</span>
      </motion.div>

      {/* Creepy whisper text */}
      <motion.p
        className="mt-6 text-[10px] text-purple-600/30 font-mono text-center z-10"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ▓▒░ Syncing with shadow servers ░▒▓
      </motion.p>
    </motion.div>
  );
}
