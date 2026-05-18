"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, BarChart3, Zap } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyDataAnalysisPage() {
  const stats = [
    { label: "Total Packets", value: "2.4M", trend: "+12.5%" },
    { label: "Data Processed", value: "48.2 GB", trend: "+8.3%" },
    { label: "Response Time", value: "12.4 ms", trend: "-3.2%" },
    { label: "Success Rate", value: "99.8%", trend: "+0.2%" },
  ];

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
        <p className="mt-2 text-sm text-blue-400/60">Network Traffic Analytics</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-3xl space-y-4"
      >
        {/* Stats Grid */}
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl"
            >
              <p className="text-sm text-blue-400/60">{stat.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</h3>
                <div className="flex items-center gap-1 text-blue-400">
                  <TrendingUp size={16} />
                  <span className="text-xs">{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analysis Detail */}
        <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Zap size={20} className="text-blue-400" />
            Live Analysis
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
                <span className="text-sm text-blue-400">Data Stream {i + 1}</span>
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
