"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Cpu, HardDrive, Wifi, Activity, Server, Database, Zap } from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  icon: typeof Cpu;
}

export default function SystemObservingPage() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 45, max: 100, unit: "%", icon: Cpu },
    { name: "Memory", value: 8.2, max: 16, unit: "GB", icon: HardDrive },
    { name: "Network", value: 125, max: 1000, unit: "Mbps", icon: Wifi },
    { name: "Disk I/O", value: 320, max: 500, unit: "MB/s", icon: Database },
  ]);

  const [processes, setProcesses] = useState([
    { pid: 1024, name: "system_monitor", cpu: 2.5, mem: 128 },
    { pid: 2048, name: "network_service", cpu: 5.2, mem: 256 },
    { pid: 3072, name: "data_processor", cpu: 12.8, mem: 512 },
    { pid: 4096, name: "security_scan", cpu: 8.1, mem: 384 },
    { pid: 5120, name: "log_analyzer", cpu: 3.4, mem: 192 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.min(
            metric.max,
            Math.max(0, metric.value + (Math.random() - 0.5) * 10)
          ),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/30"
        >
          <Eye size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">System Observing</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time System Monitoring</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <metric.icon size={16} className="text-emerald-500" />
                <span className="text-xs text-emerald-400/60">{metric.name}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metric.value.toFixed(1)}
                <span className="text-sm text-emerald-500/60">{metric.unit}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-950">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Activity size={14} />
          Active Processes
        </h2>

        <div className="space-y-2">
          {processes.map((process, index) => (
            <motion.div
              key={process.pid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Server size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-mono text-sm text-white">{process.name}</p>
                  <p className="text-xs text-emerald-500/50">PID: {process.pid}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-400">CPU: {process.cpu}%</p>
                <p className="text-xs text-emerald-500/50">MEM: {process.mem}MB</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
          <Zap size={14} />
          System Health
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-emerald-400/70">Overall Status</span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
            Optimal
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Uptime</p>
            <p className="font-mono text-emerald-300">24d 5h</p>
          </div>
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Load Avg</p>
            <p className="font-mono text-emerald-300">0.45</p>
          </div>
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Threads</p>
            <p className="font-mono text-emerald-300">256</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
