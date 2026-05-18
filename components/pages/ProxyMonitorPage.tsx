"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, AlertCircle, CheckCircle } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyMonitorPage() {
  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-32 pt-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
        >
          <Gauge size={40} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">System Monitor</h1>
        <p className="mt-2 text-sm text-blue-400/60">Real-time Performance Metrics</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-3xl space-y-4"
      >
        {[
          { name: "CPU Usage", value: "34%", icon: Activity },
          { name: "Memory Usage", value: "56%", icon: Gauge },
          { name: "Disk Usage", value: "72%", icon: AlertCircle },
          { name: "Network", value: "Connected", icon: CheckCircle },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-2xl border border-blue-400/20 bg-black/30 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-blue-400" />
                <span className="font-semibold text-white">{item.name}</span>
              </div>
              <span className="text-lg font-bold text-blue-400">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
