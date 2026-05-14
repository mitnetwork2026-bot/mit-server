"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// 50+ Countries with detailed server info
const serverLocations = [
  { name: "Frankfurt", country: "Germany", flag: "🇩🇪", ping: 23, load: 45 },
  { name: "Berlin", country: "Germany", flag: "🇩🇪", ping: 25, load: 52 },
  { name: "Munich", country: "Germany", flag: "🇩🇪", ping: 24, load: 38 },
  { name: "Singapore", country: "Singapore", flag: "🇸🇬", ping: 89, load: 62 },
  { name: "New York", country: "USA", flag: "🇺🇸", ping: 156, load: 38 },
  { name: "Los Angeles", country: "USA", flag: "🇺🇸", ping: 165, load: 44 },
  { name: "Chicago", country: "USA", flag: "🇺🇸", ping: 158, load: 41 },
  { name: "Miami", country: "USA", flag: "🇺🇸", ping: 162, load: 35 },
  { name: "Tokyo", country: "Japan", flag: "🇯🇵", ping: 112, load: 71 },
  { name: "Osaka", country: "Japan", flag: "🇯🇵", ping: 115, load: 68 },
  { name: "London", country: "UK", flag: "🇬🇧", ping: 45, load: 55 },
  { name: "Manchester", country: "UK", flag: "🇬🇧", ping: 47, load: 48 },
  { name: "Paris", country: "France", flag: "🇫🇷", ping: 35, load: 42 },
  { name: "Marseille", country: "France", flag: "🇫🇷", ping: 37, load: 39 },
  { name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", ping: 28, load: 51 },
  { name: "Rotterdam", country: "Netherlands", flag: "🇳🇱", ping: 29, load: 47 },
  { name: "Zurich", country: "Switzerland", flag: "🇨🇭", ping: 32, load: 33 },
  { name: "Geneva", country: "Switzerland", flag: "🇨🇭", ping: 33, load: 31 },
  { name: "Stockholm", country: "Sweden", flag: "🇸🇪", ping: 41, load: 44 },
  { name: "Gothenburg", country: "Sweden", flag: "🇸🇪", ping: 42, load: 40 },
  { name: "Sydney", country: "Australia", flag: "🇦🇺", ping: 198, load: 58 },
  { name: "Melbourne", country: "Australia", flag: "🇦🇺", ping: 202, load: 55 },
  { name: "Toronto", country: "Canada", flag: "🇨🇦", ping: 148, load: 46 },
  { name: "Vancouver", country: "Canada", flag: "🇨🇦", ping: 152, load: 43 },
  { name: "Sao Paulo", country: "Brazil", flag: "🇧🇷", ping: 235, load: 67 },
  { name: "Rio", country: "Brazil", flag: "🇧🇷", ping: 238, load: 64 },
  { name: "Mumbai", country: "India", flag: "🇮🇳", ping: 178, load: 72 },
  { name: "Delhi", country: "India", flag: "🇮🇳", ping: 182, load: 69 },
  { name: "Dubai", country: "UAE", flag: "🇦🇪", ping: 165, load: 59 },
  { name: "Abu Dhabi", country: "UAE", flag: "🇦🇪", ping: 168, load: 57 },
  { name: "Seoul", country: "South Korea", flag: "🇰🇷", ping: 125, load: 63 },
  { name: "Busan", country: "South Korea", flag: "🇰🇷", ping: 128, load: 61 },
  { name: "Milan", country: "Italy", flag: "🇮🇹", ping: 38, load: 43 },
  { name: "Rome", country: "Italy", flag: "🇮🇹", ping: 40, load: 46 },
  { name: "Madrid", country: "Spain", flag: "🇪🇸", ping: 43, load: 49 },
  { name: "Barcelona", country: "Spain", flag: "🇪🇸", ping: 44, load: 47 },
  { name: "Warsaw", country: "Poland", flag: "🇵🇱", ping: 48, load: 52 },
  { name: "Prague", country: "Czech Republic", flag: "🇨🇿", ping: 36, load: 41 },
  { name: "Vienna", country: "Austria", flag: "🇦🇹", ping: 34, load: 39 },
  { name: "Brussels", country: "Belgium", flag: "🇧🇪", ping: 31, load: 44 },
  { name: "Dublin", country: "Ireland", flag: "🇮🇪", ping: 49, load: 47 },
  { name: "Copenhagen", country: "Denmark", flag: "🇩🇰", ping: 39, load: 45 },
  { name: "Oslo", country: "Norway", flag: "🇳🇴", ping: 46, load: 43 },
  { name: "Helsinki", country: "Finland", flag: "🇫🇮", ping: 51, load: 48 },
  { name: "Lisbon", country: "Portugal", flag: "🇵🇹", ping: 52, load: 50 },
  { name: "Athens", country: "Greece", flag: "🇬🇷", ping: 55, load: 53 },
  { name: "Istanbul", country: "Turkey", flag: "🇹🇷", ping: 70, load: 58 },
  { name: "Cairo", country: "Egypt", flag: "🇪🇬", ping: 88, load: 65 },
  { name: "Cape Town", country: "South Africa", flag: "🇿🇦", ping: 245, load: 72 },
  { name: "Moscow", country: "Russia", flag: "🇷🇺", ping: 95, load: 68 },
  { name: "Mexico City", country: "Mexico", flag: "🇲🇽", ping: 185, load: 61 },
];

const connectionMessages = [
  { message: "Initializing secure tunnel...", type: "info" as const },
  { message: "Authenticating credentials...", type: "info" as const },
  { message: "Establishing encrypted channel...", type: "info" as const },
  { message: "Verifying server certificate...", type: "info" as const },
  { message: "Connection encrypted with AES-256", type: "success" as const },
  { message: "Routing traffic through proxy nodes...", type: "info" as const },
  { message: "VPN tunnel established successfully", type: "success" as const },
  { message: "Handshaking with server...", type: "info" as const },
  { message: "Negotiating encryption keys...", type: "info" as const },
  { message: "Performing DNS resolution...", type: "info" as const },
  { message: "IP address masked successfully", type: "success" as const },
  { message: "WebRTC leak protection enabled", type: "success" as const },
  { message: "IPv6 leak protection active", type: "info" as const },
  { message: "DNS over HTTPS configured", type: "success" as const },
  { message: "MTU optimization applied", type: "info" as const },
  { message: "Perfect forward secrecy active", type: "success" as const },
  { message: "Multi-hop routing configured", type: "info" as const },
  { message: "Traffic obfuscation enabled", type: "info" as const },
  { message: "Deep packet inspection bypass", type: "success" as const },
  { message: "Bandwidth throttling disabled", type: "success" as const },
  { message: "Latency optimization active", type: "info" as const },
  { message: "NAT traversal successful", type: "success" as const },
  { message: "Split tunneling disabled", type: "info" as const },
  { message: "Kill switch armed", type: "warning" as const },
  { message: "Always-on VPN active", type: "success" as const },
];

// 100+ Active monitoring messages (cyclic)
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
  { message: "Network scan blocked", type: "warning" as const },
  { message: "ARP spoofing protection", type: "success" as const },
  { message: "MITM attack prevention", type: "success" as const },
  { message: "Certificate pinning active", type: "info" as const },
  { message: "TLS 1.3 enforced", type: "success" as const },
  { message: "HSTS preload enabled", type: "info" as const },
  { message: "Session key rotated", type: "success" as const },
  { message: "Replay attack protection", type: "info" as const },
  { message: "Rootkit detection scanned", type: "warning" as const },
  { message: "Malware filtering active", type: "info" as const },
  { message: "Phishing protection on", type: "success" as const },
  { message: "Ad blocking enabled", type: "info" as const },
  { message: "Tracker prevention active", type: "success" as const },
  { message: "Fingerprinting blocked", type: "warning" as const },
  { message: "Canvas noise injected", type: "info" as const },
  { message: "Audio fingerprint masked", type: "success" as const },
  { message: "Cookie jar encrypted", type: "info" as const },
  { message: "Supercookie protection", type: "success" as const },
  { message: "DNS rebinding prevented", type: "info" as const },
  { message: "Mixed content blocked", type: "warning" as const },
  { message: "CSP policy enforced", type: "success" as const },
  { message: "XSS filter active", type: "info" as const },
  { message: "SQL injection blocked", type: "warning" as const },
  { message: "Command injection prevented", type: "success" as const },
  { message: "Path traversal blocked", type: "info" as const },
  { message: "XXE attack mitigated", type: "success" as const },
  { message: "SSRF protection on", type: "info" as const },
  { message: "CSRF token validated", type: "success" as const },
  { message: "Clickjacking prevented", type: "info" as const },
  { message: "Frame busting active", type: "success" as const },
  { message: "Referrer policy strict", type: "info" as const },
  { message: "Cross-origin isolated", type: "success" as const },
  { message: "COEP credentialless", type: "info" as const },
  { message: "COOP same-origin", type: "success" as const },
  { message: "CORP cross-origin", type: "info" as const },
  { message: "Trusted types enforced", type: "success" as const },
  { message: "Certificate transparency", type: "info" as const },
  { message: "OCSP stapling active", type: "success" as const },
  { message: "DNSSEC validation", type: "info" as const },
  { message: "DOH query encryption", type: "success" as const },
  { message: "ECH configuration done", type: "info" as const },
  { message: "ESNI handshake complete", type: "success" as const },
  { message: "ALPN negotiation done", type: "info" as const },
  { message: "SNI encryption active", type: "success" as const },
];

// Global log queue for cross-page persistence
let globalLogs: ConnectionLog[] = [];
let logIndex = 0;
let intervalId: NodeJS.Timeout | null = null;

// Save connection state to localStorage
const saveConnectionState = (state: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vpnConnection', JSON.stringify(state));
  }
};

const loadConnectionState = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vpnConnection');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export default function ServerNetworkPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(serverLocations[0]);
  const [logs, setLogs] = useState<ConnectionLog[]>([]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataTransferred, setDataTransferred] = useState({ up: 0, down: 0 });

  // Load saved connection and logs on mount
  useEffect(() => {
    const savedState = loadConnectionState();
    if (savedState && savedState.isConnected) {
      setIsConnected(true);
      setSelectedServer(savedState.selectedServer || serverLocations[0]);
      setConnectionTime(savedState.connectionTime || 0);
      setDataTransferred(savedState.dataTransferred || { up: 0, down: 0 });
      
      // Restore previous logs if any
      if (savedState.logs && savedState.logs.length > 0) {
        setLogs(savedState.logs);
        globalLogs = savedState.logs;
        logIndex = savedState.logIndex || 0;
      }
    }
  }, []);

  // Save connection state when it changes
  useEffect(() => {
    if (isConnected) {
      saveConnectionState({
        isConnected: true,
        selectedServer,
        connectionTime,
        dataTransferred,
        logs: globalLogs,
        logIndex: logIndex,
        timestamp: Date.now(),
      });
    } else {
      saveConnectionState({ isConnected: false, logs: globalLogs, logIndex: logIndex });
    }
  }, [isConnected, selectedServer, connectionTime, dataTransferred]);

  // Timer for connection duration
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isConnected) {
      timerInterval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
        setDataTransferred(prev => ({
          up: prev.up + Math.random() * 0.5,
          down: prev.down + Math.random() * 2,
        }));
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isConnected]);

  // Global log interval that runs even when component unmounts
  useEffect(() => {
    if (isConnected && !intervalId) {
      const allMessages = [...connectionMessages, ...activeMessages];
      
      intervalId = setInterval(() => {
        if (typeof window !== 'undefined') {
          // Cycle through messages (when reaches end, start from beginning)
          const currentMessage = allMessages[logIndex % allMessages.length];
          
          const newLog: ConnectionLog = {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: new Date(),
            message: currentMessage.message,
            type: currentMessage.type,
          };
          
          // Add to global logs
          globalLogs = [newLog, ...globalLogs].slice(0, 200);
          logIndex++;
          
          // Save to localStorage
          const savedState = loadConnectionState();
          if (savedState && savedState.isConnected) {
            saveConnectionState({
              ...savedState,
              logs: globalLogs,
              logIndex: logIndex,
            });
          }
          
          // Update local state if component is mounted
          setLogs(prev => [newLog, ...prev].slice(0, 200));
        }
      }, 2000);
    } else if (!isConnected && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [isConnected]);

  // Sync logs from global when component mounts/remounts
  useEffect(() => {
    if (globalLogs.length > 0) {
      setLogs(globalLogs);
    }
  }, []);

  const addLog = (message: string, type: ConnectionLog["type"]) => {
    const newLog: ConnectionLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message,
      type,
    };
    globalLogs = [newLog, ...globalLogs].slice(0, 200);
    setLogs(prev => [newLog, ...prev].slice(0, 200));
  };

  const handleConnect = async () => {
    if (isConnecting) return;
    
    if (isConnected) {
      addLog("Disconnecting from server...", "info");
      setTimeout(() => {
        addLog("VPN tunnel closed", "warning");
        addLog("Connection terminated", "info");
        setIsConnected(false);
        setConnectionTime(0);
        setDataTransferred({ up: 0, down: 0 });
        // Don't clear logs on disconnect
      }, 1000);
      return;
    }

    setIsConnecting(true);
    
    // Don't clear logs on new connection, just add new ones
    for (let i = 0; i < connectionMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200));
      addLog(connectionMessages[i].message, connectionMessages[i].type);
    }

    setIsConnecting(false);
    setIsConnected(true);
    addLog(`Connected to ${selectedServer.flag} ${selectedServer.name}, ${selectedServer.country}`, "success");
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
            {isConnected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-emerald-400/60"
              >
                {selectedServer.flag} {selectedServer.name}, {selectedServer.country}
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
                <p className="text-sm font-mono text-white">{selectedServer.ping}ms</p>
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

        {/* Server Selection - With flags */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-emerald-400/60">Select Server</h3>
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {serverLocations.map((server) => (
              <motion.button
                key={server.name}
                onClick={() => !isConnected && setSelectedServer(server)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isConnected}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  selectedServer.name === server.name
                    ? "border-emerald-500/50 bg-emerald-500/20"
                    : "border-emerald-500/20 bg-emerald-950/30 hover:bg-emerald-950/50"
                } ${isConnected ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{server.flag}</span>
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
                  {selectedServer.name === server.name && (
                    <CheckCircle size={20} className="text-emerald-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Connection Logs - Now with cyclic logs */}
        <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-emerald-500/20 p-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-emerald-400" />
              <h3 className="font-medium text-white">Connection Logs</h3>
            </div>
            <div className="flex items-center gap-2">
              {isConnected && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
              )}
              <span className="text-xs text-emerald-400/60">
                {isConnected ? "Live" : "Disconnected"}
              </span>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-2">
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
