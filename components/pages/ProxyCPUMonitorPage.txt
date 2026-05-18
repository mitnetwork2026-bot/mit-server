"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Thermometer } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyCPUMonitorPage() {
  const cores = [
    { id: 1, usage: 45, temp: 62 },
    { id: 2, usage: 32, temp: 58 },
    { id: 3, usage: 78, temp: 71 },
    { id: 4, usage: 55, temp: 64 },
  ];

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
          <Cpu size={40} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">CPU Monitor</h1>
        <p className="mt-2 text-sm text-blue-400/60">Processor Statistics</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl space-y-4"
      >
        {cores.map((core, i) => (
          <motion.div
            key={core.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-xl border border-blue-400/20 bg-black/30 p-4 backdrop-blur-xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-white">Core {core.id}</span>
              <span className="text-sm text-blue-400">{core.usage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-blue-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${core.usage}%` }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-300"
              />
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-blue-400/60">
              <Thermometer size={14} />
              {core.temp}°C
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
