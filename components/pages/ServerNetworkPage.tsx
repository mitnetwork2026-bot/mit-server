"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConnection } from "@/contexts/ConnectionContext";
import { 
  Wifi, WifiOff, Server, Globe, Shield, Activity, 
  Zap, Clock, CheckCircle, AlertCircle, RefreshCw,
  Lock, Unlock, Signal, Radio, Database
} from "lucide-react";

interface ConnectionLog {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const serverLocations = [
  // Europe
  { name: "Frankfurt", country: "Germany", ping: 23, load: 45 },
  { name: "London", country: "UK", ping: 45, load: 55 },
  { name: "Amsterdam", country: "Netherlands", ping: 35, load: 52 },
  { name: "Paris", country: "France", ping: 38, load: 48 },
  { name: "Stockholm", country: "Sweden", ping: 42, load: 41 },
  { name: "Madrid", country: "Spain", ping: 52, load: 58 },
  { name: "Milan", country: "Italy", ping: 48, load: 50 },
  { name: "Zurich", country: "Switzerland", ping: 40, load: 46 },
  
  // Asia
  { name: "Singapore", country: "Singapore", ping: 89, load: 62 },
  { name: "Tokyo", country: "Japan", ping: 112, load: 71 },
  { name: "Hong Kong", country: "Hong Kong", ping: 95, load: 65 },
  { name: "Seoul", country: "South Korea", ping: 105, load: 68 },
  { name: "Bangkok", country: "Thailand", ping: 78, load: 59 },
  { name: "Mumbai", country: "India", ping: 145, load: 72 },
  { name: "Bangalore", country: "India", ping: 148, load: 70 },
  { name: "Dubai", country: "United Arab Emirates", ping: 68, load: 55 },
  
  // Americas
  { name: "New York", country: "USA", ping: 156, load: 38 },
  { name: "Los Angeles", country: "USA", ping: 178, load: 42 },
  { name: "San Francisco", country: "USA", ping: 185, load: 48 },
  { name: "Chicago", country: "USA", ping: 142, load: 45 },
  { name: "Toronto", country: "Canada", ping: 138, load: 52 },
  { name: "São Paulo", country: "Brazil", ping: 198, load: 61 },
  { name: "Mexico City", country: "Mexico", ping: 165, load: 55 },
  
  // Oceania & Africa
  { name: "Sydney", country: "Australia", ping: 225, load: 58 },
  { name: "Auckland", country: "New Zealand", ping: 245, load: 52 },
  { name: "Johannesburg", country: "South Africa", ping: 188, load: 64 },
  { name: "Cairo", country: "Egypt", ping: 125, load: 67 },
  { name: "Lagos", country: "Nigeria", ping: 158, load: 71 },
];

const connectionMessages = [
  { message: "Initializing secure tunnel...", type: "info" as const },
  { message: "Authenticating credentials...", type: "info" as const },
  { message: "Establishing encrypted channel...", type: "info" as const },
  { message: "Verifying server certificate...", type: "info" as const },
  { message: "Connection encrypted with AES-256", type: "success" as const },
  { message: "Routing traffic through proxy nodes...", type: "info" as const },
  { message: "VPN tunnel established successfully", type: "success" as const },
];

const activeMessages = [
  { message: "Packet encryption: Active", type: "success" as const },
  { message: "DNS leak protection: Enabled", type: "success" as const },
  { message: "Kill switch: Armed", type: "info" as const },
  { message: "Traffic routed through 3 nodes", type: "info" as const },
  { message: "Bandwidth: 125.4 Mbps", type: "success" as const },
  { message: "Latency optimized: 23ms", type: "info" as const },
  { message: "IP masked successfully", type: "success" as const },
  { message: "WebRTC leak blocked", type: "warning" as const },
  { message: "Connection stable", type: "success" as const },
  { message: "Firewall rules applied", type: "info" as const },
  { message: "Split tunneling: Disabled", type: "info" as const },
  { message: "Network scan blocked", type: "warning" as const },
];

export default function ServerNetworkPage() {
  const { 
    isConnected, 
    setIsConnected, 
    isConnecting, 
    setIsConnecting,
    selectedServer,
    setSelectedServer,
    connectionTime
  } = useConnection();
  
  const [selectedServerLocal, setSelectedServerLocal] = useState(serverLocations[0]);
  const [logs, setLogs] = useState<ConnectionLog[]>([]);
  const [dataTransferred, setDataTransferred] = useState({ up: 0, down: 0 });
  
  // Use context server if available, otherwise use local
  const activeServer = selectedServer || selectedServerLocal;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setDataTransferred(prev => ({
          up: prev.up + Math.random() * 0.5,
          down: prev.down + Math.random() * 2,
        }));
        
        // Add random activity logs
        if (Math.random() > 0.6) {
          const randomMsg = activeMessages[Math.floor(Math.random() * activeMessages.length)];
          addLog(randomMsg.message, randomMsg.type);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const addLog = (message: string, type: ConnectionLog["type"]) => {
    const newLog: ConnectionLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message,
      type,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  };

  const handleConnect = async () => {
    if (isConnecting) return;
    
    if (isConnected) {
      addLog("Disconnecting from server...", "info");
      setTimeout(() => {
        addLog("VPN tunnel closed", "warning");
        addLog("Connection terminated", "info");
        setIsConnecting(false);
        setIsConnected(false);
        setDataTransferred({ up: 0, down: 0 });
        setSelectedServer(null);
      }, 1000);
      return;
    }

    setIsConnecting(true);
    setLogs([]);

    for (let i = 0; i < connectionMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      addLog(connectionMessages[i].message, connectionMessages[i].type);
    }

    setIsConnecting(false);
    setIsConnected(true);
    const server = selectedServer || selectedServerLocal;
    addLog(`Connected to ${server.name}, ${server.country}`, "success");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatData = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(2)} MB`;
  };

  const getLogIcon = (type: ConnectionLog["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle size={12} className="text-emerald-400" />;
      case "warning":
        return <AlertCircle size={12} className="text-yellow-400" />;
      case "error":
        return <AlertCircle size={12} className="text-red-400" />;
      default:
        return <Activity size={12} className="text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
            <Server size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Server Network</h1>
          <p className="mt-2 text-sm text-emerald-400/60">
            Secure VPN Connection Manager
          </p>
        </div>

        {/* Connection Status Card */}
        <motion.div
          className={`relative mb-6 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl ${
            isConnected 
              ? "border-emerald-500/50 bg-emerald-950/50" 
              : "border-emerald-500/20 bg-emerald-950/30"
          }`}
        >
          {/* Status Indicator */}
          <div className="mb-6 flex items-center justify-center">
            <motion.div
              className={`relative flex h-32 w-32 items-center justify-center rounded-full ${
                isConnected ? "bg-emerald-500/20" : "bg-gray-800/50"
              }`}
              animate={isConnecting ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: isConnecting ? Infinity : 0 }}
            >
              {isConnecting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw size={48} className="text-emerald-400" />
                </motion.div>
              ) : isConnected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Shield size={48} className="text-emerald-400" />
                </motion.div>
              ) : (
                <WifiOff size={48} className="text-gray-500" />
              )}
              
              {/* Animated rings */}
              {isConnected && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* Status Text */}
          <div className="mb-6 text-center">
            <h2 className={`text-xl font-bold ${isConnected ? "text-emerald-400" : "text-gray-400"}`}>
              {isConnecting ? "Connecting..." : isConnected ? "Protected" : "Disconnected"}
            </h2>
            {isConnected && activeServer && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-emerald-400/60"
              >
                {activeServer.name}, {activeServer.country}
              </motion.p>
            )}
          </div>

          {/* Stats */}
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 grid grid-cols-3 gap-4"
            >
              <div className="rounded-xl border border-emerald-500/20 bg-black/30 p-3 text-center">
                <Clock size={16} className="mx-auto mb-1 text-emerald-400/60" />
                <p className="text-sm font-mono text-white">{formatTime(connectionTime)}</p>
                <p className="text-xs text-emerald-400/40">Duration</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-black/30 p-3 text-center">
                <Activity size={16} className="mx-auto mb-1 text-emerald-400/60" />
                <p className="text-sm font-mono text-white">{formatData(dataTransferred.down)}</p>
                <p className="text-xs text-emerald-400/40">Downloaded</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-black/30 p-3 text-center">
                <Signal size={16} className="mx-auto mb-1 text-emerald-400/60" />
                <p className="text-sm font-mono text-white">{activeServer?.ping || 0}ms</p>
                <p className="text-xs text-emerald-400/40">Ping</p>
              </div>
            </motion.div>
          )}

          {/* Connect Button */}
          <motion.button
            onClick={handleConnect}
            disabled={isConnecting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full rounded-xl py-4 font-semibold transition-all ${
              isConnected
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            }`}
          >
            {isConnecting ? "Establishing Connection..." : isConnected ? "Disconnect" : "Connect"}
          </motion.button>
        </motion.div>

        {/* Server Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-emerald-400/60">Select Server</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {serverLocations.map((server) => (
              <motion.button
                key={server.name}
                onClick={() => !isConnected && setSelectedServerLocal(server)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isConnected}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  activeServer.name === server.name
                    ? "border-emerald-500/50 bg-emerald-500/20"
                    : "border-emerald-500/20 bg-emerald-950/30 hover:bg-emerald-950/50"
                } ${isConnected ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-emerald-400/60" />
                  <div className="text-left">
                    <p className="font-medium text-white">{server.name}</p>
                    <p className="text-xs text-emerald-400/60">{server.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-emerald-400">{server.ping}ms</p>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-emerald-950">
                        <div 
                          className={`h-full rounded-full ${
                            server.load < 50 ? "bg-emerald-500" : server.load < 75 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${server.load}%` }}
                        />
                      </div>
                      <span className="text-xs text-emerald-400/40">{server.load}%</span>
                    </div>
                  </div>
                  {activeServer.name === server.name && (
                    <CheckCircle size={20} className="text-emerald-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Connection Logs */}
        <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-emerald-500/20 p-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-emerald-400" />
              <h3 className="font-medium text-white">Connection Logs</h3>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-500"
              />
              <span className="text-xs text-emerald-400/60">Live</span>
            </div>
          </div>
          
          <div className="h-64 overflow-y-auto p-2">
            <AnimatePresence mode="popLayout">
              {logs.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-emerald-400/40">
                  Connection logs will appear here
                </div>
              ) : (
                logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2 border-b border-emerald-500/10 px-2 py-2 last:border-0"
                  >
                    <span className="mt-0.5">{getLogIcon(log.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-emerald-400/80 truncate">{log.message}</p>
                    </div>
                    <span className="shrink-0 text-xs text-emerald-500/40">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <Lock size={16} className="text-emerald-400" />
          <span className="text-xs text-emerald-400/80">
            Military-grade AES-256 encryption active
          </span>
        </div>
      </motion.div>
    </div>
  );
}
