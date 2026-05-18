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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
        >
          <Server size={40} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white">C Server Web</h1>
        <p className="mt-2 text-sm text-blue-400/60">Command Server Interface</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-3xl space-y-4"
      >
        {/* Control Panel */}
        <div className="rounded-2xl border border-blue-400/20 bg-black/30 p-6 backdrop-blur-xl">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Terminal size={20} className="text-blue-400" />
            Server Controls
          </h2>

          <div className="flex gap-3">
            <motion.button
              onClick={handleExecute}
              disabled={isRunning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
            >
              {isRunning ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Play size={18} />
                </motion.div>
              ) : (
                <Play size={18} />
              )}
              {isRunning ? "Running..." : "Start Server"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600/30 px-4 py-3 text-red-400 transition-colors hover:bg-red-600/50"
            >
              <Square size={18} />
              Stop
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOutput([])}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600/30 px-4 py-3 text-blue-400 transition-colors hover:bg-blue-600/50"
            >
              <RotateCcw size={18} />
              Clear
            </motion.button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="rounded-2xl border border-blue-400/20 bg-black/50 p-6 font-mono text-sm backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Code size={20} className="text-blue-400" />
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
