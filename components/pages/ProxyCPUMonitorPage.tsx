"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Thermometer, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyCPUMonitorPage() {
  const [cores, setCores] = useState([
    { id: 1, usage: 45, temp: 62, freq: "2.4 GHz" },
    { id: 2, usage: 32, temp: 58, freq: "2.1 GHz" },
    { id: 3, usage: 78, temp: 71, freq: "3.2 GHz" },
    { id: 4, usage: 55, temp: 64, freq: "2.8 GHz" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCores((prevCores) =>
        prevCores.map((core) => ({
          ...core,
          usage: Math.max(20, Math.min(95, core.usage + (Math.random() - 0.5) * 15)),
          temp: Math.max(50, Math.min(85, core.temp + (Math.random() - 0.5) * 3)),
          freq: `${(2.0 + Math.random() * 1.5).toFixed(1)} GHz`,
        }))
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const totalUsage = Math.round(cores.reduce((acc, c) => acc + c.usage, 0) / cores.length);
  const avgTemp = Math.round(cores.reduce((acc, c) => acc + c.temp, 0) / cores.length);
  const totalPower = (totalUsage * 2.5).toFixed(1);

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
          <p className="mt-2 text-sm text-blue-400/60">Temperature, Frequency & Power Usage</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl space-y-4"
        >
          {/* Overall Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Activity size={20} className="text-blue-400" />
              System Summary
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-blue-600/20 p-3 text-center">
                <p className="text-xs text-blue-400/60">Avg Usage</p>
                <p className="mt-1 text-xl font-bold text-blue-400">{totalUsage}%</p>
              </div>
              <div className="rounded-lg bg-blue-600/20 p-3 text-center">
                <p className="text-xs text-blue-400/60">Avg Temp</p>
                <p className="mt-1 text-xl font-bold text-orange-400">{avgTemp}°C</p>
              </div>
              <div className="rounded-lg bg-blue-600/20 p-3 text-center">
                <p className="text-xs text-blue-400/60">Power</p>
                <p className="mt-1 text-xl font-bold text-yellow-400">{totalPower}W</p>
              </div>
            </div>
          </motion.div>

          {/* Individual Cores */}
          {cores.map((core, i) => (
            <motion.div
              key={core.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-xl border border-blue-400/20 bg-black/30 p-4 backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">Core {core.id}</span>
                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <Zap size={14} />
                  <span>{core.usage.toFixed(0)}%</span>
                </div>
              </div>

              {/* Usage Bar */}
              <div className="mb-3">
                <div className="h-2 overflow-hidden rounded-full bg-blue-900">
                  <motion.div
                    animate={{ width: `${core.usage}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-300"
                  />
                </div>
              </div>

              {/* Temperature & Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-blue-400/10 p-2">
                  <div className="flex items-center gap-1.5 text-xs text-blue-400/60 mb-1">
                    <Thermometer size={12} />
                    Temperature
                  </div>
                  <p className="text-sm font-bold text-orange-400">{core.temp.toFixed(1)}°C</p>
                </div>
                <div className="rounded-lg bg-blue-400/10 p-2">
                  <div className="flex items-center gap-1.5 text-xs text-blue-400/60 mb-1">
                    <Zap size={12} />
                    Frequency
                  </div>
                  <p className="text-sm font-bold text-blue-400">{core.freq}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
