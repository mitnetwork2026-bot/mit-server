"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, AlertCircle, CheckCircle, Lock } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyMonitorPage() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionLogs, setConnectionLogs] = useState<string[]>([]);

  const handlePermissionGrant = () => {
    setShowPermissionDialog(false);
    setIsConnecting(true);
    const logs = [
      "[14:32:15] VPN Permission Request Granted",
      "[14:32:16] Initializing VPN Connection...",
      "[14:32:17] Connecting to Russian Gateway...",
      "[14:32:18] Establishing Secure Tunnel...",
      "[14:32:19] IP Masking Active",
      "[14:32:20] VPN Connected Successfully",
      "[14:32:21] Monitoring Active",
    ];
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setConnectionLogs((prev) => [...prev, log]);
      }, (index + 1) * 300);
    });

    setTimeout(() => setIsConnecting(false), logs.length * 300);
  };

  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-24 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
          >
            <Gauge size={40} className="text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Monitor & VPN</h1>
          <p className="mt-2 text-sm text-blue-400/60">Permission Dialog + VPN Connection</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Permission Dialog */}
          {showPermissionDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-lg border border-yellow-500/30 bg-yellow-950/20 p-4 backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-100 mb-2">Permission Required</h3>
                  <p className="text-sm text-yellow-200/80 mb-4">
                    This application requires permission to access system monitoring and VPN features for Russian proxy connectivity.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handlePermissionGrant}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 rounded-lg bg-yellow-600 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-700"
                    >
                      Grant Permission
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 rounded-lg border border-yellow-400/30 px-3 py-2 text-sm font-semibold text-yellow-400 hover:bg-yellow-400/10"
                    >
                      Deny
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* VPN Connection Animation */}
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-blue-500/25 bg-blue-950/25 p-4 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/30 border border-blue-400"
                >
                  <Lock size={24} className="text-blue-400" />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-blue-100">Connecting VPN...</p>
                  <p className="text-xs text-blue-400/60">Establishing secure connection</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Connection Logs */}
          {connectionLogs.length > 0 && (
            <div className="rounded-lg border border-blue-500/25 bg-blue-950/30 p-4 font-mono text-xs backdrop-blur-xl">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Activity size={16} className="text-blue-400" />
                <h3 className="font-semibold text-white">Connection Logs</h3>
              </div>
              <div className="h-48 overflow-y-auto rounded-lg border border-blue-400/10 bg-black/30 p-3 space-y-1">
                {connectionLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-blue-400"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* System Metrics */}
          {!showPermissionDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
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
                  className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className="text-blue-400" />
                      <span className="font-semibold text-white">{item.name}</span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-blue-400">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
