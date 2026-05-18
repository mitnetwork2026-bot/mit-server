"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Terminal, Code, Play, Square, RotateCcw } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyCServerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const handleExecute = () => {
    setIsRunning(true);
    setOutput([
      "> C Server Web Interface v2.0",
      "> Initializing server connection...",
      "> Loading proxy modules...",
      "[✓] Network initialized",
      "[✓] Firewall configured",
      "[✓] Server ready for requests",
      "> Waiting for commands...",
    ]);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-32 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-3 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20"
        >
          <Server size={28} className="text-white sm:h-8 sm:w-8" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-100">C Server Web</h1>
        <p className="mt-1.5 text-xs sm:text-sm text-blue-300/60">Command Server Interface</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-3xl space-y-4"
      >
        {/* Control Panel */}
        <div className="rounded-lg border border-blue-500/25 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl">
          <h2 className="mb-2.5 flex items-center gap-1.5 text-sm sm:text-base font-semibold text-blue-100">
            <Terminal size={16} className="text-blue-400 sm:h-5 sm:w-5" />
            Server Controls
          </h2>

          <div className="flex gap-2 sm:gap-3">
            <motion.button
              onClick={handleExecute}
              disabled={isRunning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white disabled:opacity-50"
            >
              {isRunning ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Play size={14} className="sm:h-4 sm:w-4" />
                </motion.div>
              ) : (
                <Play size={14} className="sm:h-4 sm:w-4" />
              )}
              <span className="hidden sm:inline">{isRunning ? "Running..." : "Start Server"}</span>
              <span className="sm:hidden">{isRunning ? "Run..." : "Start"}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-1 rounded-lg bg-red-600/25 px-2.5 py-2 sm:py-2.5 text-xs text-red-400 transition-colors hover:bg-red-600/40"
            >
              <Square size={14} className="sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Stop</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOutput([])}
              className="flex items-center justify-center gap-1 rounded-lg bg-blue-600/25 px-2.5 py-2 sm:py-2.5 text-xs text-blue-400 transition-colors hover:bg-blue-600/40"
            >
              <RotateCcw size={14} className="sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="rounded-lg border border-blue-500/25 bg-blue-950/30 p-3 sm:p-4 font-mono text-xs sm:text-sm backdrop-blur-xl">
          <div className="mb-2.5 flex items-center gap-1.5">
            <Code size={16} className="text-blue-400 sm:h-5 sm:w-5" />
            <h3 className="font-semibold text-white">Server Output</h3>
          </div>

          <div className="h-64 overflow-y-auto rounded-lg border border-blue-400/10 bg-black/30 p-4">
            {output.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-blue-400/40">No output yet. Start the server to see logs.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-blue-400"
                  >
                    <span className="text-blue-600">{">>"}</span> {line}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="rounded-2xl border border-blue-400/20 bg-black/30 p-6 backdrop-blur-xl">
          <h3 className="mb-3 font-semibold text-white">Server Configuration</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-400/10 p-3">
              <p className="text-xs text-blue-400/60">Port</p>
              <p className="font-mono text-white">8080</p>
            </div>
            <div className="rounded-lg bg-blue-400/10 p-3">
              <p className="text-xs text-blue-400/60">Protocol</p>
              <p className="font-mono text-white">HTTP/HTTPS</p>
            </div>
            <div className="rounded-lg bg-blue-400/10 p-3">
              <p className="text-xs text-blue-400/60">Uptime</p>
              <p className="font-mono text-white">Online</p>
            </div>
            <div className="rounded-lg bg-blue-400/10 p-3">
              <p className="text-xs text-blue-400/60">Status</p>
              <p className="font-mono text-blue-400">Active</p>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
