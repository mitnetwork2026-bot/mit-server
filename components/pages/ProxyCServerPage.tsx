"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Zap } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

type ConnectionPhase = "idle" | "connecting" | "connected" | "cycling";
type CyclingPhase = "coding" | "thinking" | "analyzing" | "checking";

const CYCLING_PHASES: { phase: CyclingPhase; label: string; duration: number }[] = [
  { phase: "coding", label: "Coding", duration: 20 },
  { phase: "thinking", label: "AI Thinking", duration: 5 },
  { phase: "analyzing", label: "Analyzing", duration: 15 },
  { phase: "checking", label: "Checking", duration: 12 },
];

const CodeBlocks = () => (
  <div className="font-mono text-xs space-y-2 text-blue-400">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        className="flex items-center gap-2"
      >
        <span className="text-blue-600">{">"}</span>
        <span className="inline-block">
          {`const server = new MIT.Proxy(${Math.random().toString(16).slice(2, 8)});`}
        </span>
      </motion.div>
    ))}
  </div>
);

const ThinkingAnimation = () => (
  <div className="flex items-center justify-center h-40">
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-8 h-8 border-3 border-blue-400/30 border-t-blue-400 rounded-full"
      />
      <div className="flex flex-col gap-3">
        {["AI", "Thinking"].map((text, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            className="text-lg font-bold text-blue-400"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default function ProxyCServerPage() {
  const [connectionPhase, setConnectionPhase] = useState<ConnectionPhase>("idle");
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const currentCyclingPhase = CYCLING_PHASES[currentCycleIndex];

  useEffect(() => {
    if (connectionPhase !== "cycling") return;

    const timer = setTimeout(() => {
      setCurrentCycleIndex((prev) => (prev + 1) % CYCLING_PHASES.length);
    }, currentCyclingPhase.duration * 1000);

    return () => clearTimeout(timer);
  }, [connectionPhase, currentCycleIndex, currentCyclingPhase.duration]);

  const handleConnect = () => {
    setConnectionPhase("connecting");
    setTimeout(() => {
      setConnectionPhase("connected");
      setIsConnected(true);
    }, 2000);
    setTimeout(() => {
      setConnectionPhase("cycling");
      setCurrentCycleIndex(0);
    }, 3000);
  };

  const handleReset = () => {
    setConnectionPhase("idle");
    setIsConnected(false);
    setCurrentCycleIndex(0);
  };

  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-24 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
          >
            <Server size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">MIT Main Server</h1>
          <p className="text-sm text-blue-400/60">Next Generation Proxy Network</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-2xl"
        >
          {/* Connect Button Section */}
          {connectionPhase === "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <motion.button
                onClick={handleConnect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-lg shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70 transition-shadow"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mr-3"
                >
                  <Zap size={24} />
                </motion.div>
                Connect to MIT Main Server
              </motion.button>
            </motion.div>
          )}

          {/* Connecting Animation */}
          {connectionPhase === "connecting" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-8 rounded-xl border border-blue-400/30 bg-blue-950/30 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full border-3 border-blue-400/30 border-t-blue-400"
                  />
                </motion.div>
                <motion.h2
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl font-bold text-blue-400"
                >
                  Connecting to Server...
                </motion.h2>
              </div>
            </motion.div>
          )}

          {/* Connected Status */}
          {connectionPhase === "connected" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-xl border border-green-400/30 bg-green-950/30 backdrop-blur-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-green-400"
                />
                <h2 className="text-lg font-bold text-green-400">Server Connected Successfully</h2>
              </div>
            </motion.div>
          )}

          {/* Main Processing Box */}
          {(connectionPhase === "connected" || connectionPhase === "cycling") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-blue-400/20 bg-blue-950/40 backdrop-blur-xl p-8 min-h-80"
            >
              {/* Phase Label */}
              <motion.div
                key={currentCyclingPhase?.phase}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-6"
              >
                <div className="inline-block px-4 py-2 rounded-lg bg-blue-600/30 border border-blue-400/50">
                  <p className="text-sm font-bold text-blue-400">
                    {currentCyclingPhase?.label}
                  </p>
                </div>
              </motion.div>

              {/* Content based on phase */}
              {currentCyclingPhase?.phase === "thinking" ? (
                <ThinkingAnimation />
              ) : (
                <CodeBlocks />
              )}

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="w-full h-1 rounded-full bg-blue-900/50 overflow-hidden">
                  <motion.div
                    key={currentCycleIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: currentCyclingPhase?.duration || 1,
                      ease: "linear",
                    }}
                    className="h-full bg-gradient-to-r from-blue-600 to-teal-600"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Reset Button */}
          {(connectionPhase === "connected" || connectionPhase === "cycling") && (
            <motion.button
              onClick={handleReset}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full mt-6 py-3 rounded-lg bg-red-600/30 text-red-400 font-semibold hover:bg-red-600/50 transition-colors"
            >
              Disconnect
            </motion.button>
          )}
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
