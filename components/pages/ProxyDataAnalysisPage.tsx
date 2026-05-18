"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, BarChart3, Zap, Check } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyDataAnalysisPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalyzed(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
          >
            <BarChart3 size={40} className="text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">Data Analysis</h1>
          <p className="mt-2 text-sm text-blue-400/60">Advanced Network Analysis</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Input Fields */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold text-white">Analysis Parameters</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-blue-400/60">Area IP</label>
                <input
                  type="text"
                  placeholder="192.168.1.0/24"
                  className="w-full mt-1 rounded-lg border border-blue-400/30 bg-black/30 px-3 py-2 text-sm text-blue-400 placeholder-blue-400/40"
                />
              </div>
              <div>
                <label className="text-xs text-blue-400/60">CPM Key</label>
                <input
                  type="text"
                  placeholder="Enter CPM key"
                  className="w-full mt-1 rounded-lg border border-blue-400/30 bg-black/30 px-3 py-2 text-sm text-blue-400 placeholder-blue-400/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-blue-400/60">Type</label>
                  <select className="w-full mt-1 rounded-lg border border-blue-400/30 bg-black/30 px-3 py-2 text-sm text-blue-400">
                    <option>TCP</option>
                    <option>UDP</option>
                    <option>ICMP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-blue-400/60">Accuracy</label>
                  <select className="w-full mt-1 rounded-lg border border-blue-400/30 bg-black/30 px-3 py-2 text-sm text-blue-400">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isAnalyzing ? (
                <motion.div className="flex items-center justify-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Zap size={16} />
                  </motion.div>
                  Analyzing...
                </motion.div>
              ) : (
                "Check Analysis"
              )}
            </motion.button>
          </div>

          {/* Results */}
          {analyzed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
                <Check size={20} className="text-green-400" />
                Analysis Results
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-blue-400/10 p-3">
                  <p className="text-xs text-blue-400/60">Packets Found</p>
                  <p className="mt-1 text-lg font-bold text-blue-400">2,847</p>
                </div>
                <div className="rounded-lg bg-blue-400/10 p-3">
                  <p className="text-xs text-blue-400/60">Data Size</p>
                  <p className="mt-1 text-lg font-bold text-blue-400">156.3 MB</p>
                </div>
                <div className="rounded-lg bg-blue-400/10 p-3">
                  <p className="text-xs text-blue-400/60">Response Time</p>
                  <p className="mt-1 text-lg font-bold text-blue-400">8.2 ms</p>
                </div>
                <div className="rounded-lg bg-blue-400/10 p-3">
                  <p className="text-xs text-blue-400/60">Success Rate</p>
                  <p className="mt-1 text-lg font-bold text-green-400">99.8%</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Live Analysis */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Zap size={20} className="text-blue-400" />
              Live Data Streams
            </h3>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-blue-400/10 p-3"
                >
                  <span className="text-sm text-blue-400">Stream {i + 1}</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="h-2 w-2 rounded-full bg-blue-400"
                    />
                    <span className="text-xs text-blue-400/60">{Math.floor(Math.random() * 100) + 50} MB/s</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
