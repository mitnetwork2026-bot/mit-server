'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, WifiOff, Zap, Copy, Check, X, AlertCircle,
  Loader, Terminal, Network, Link as LinkIcon, Settings
} from 'lucide-react';

interface ConnectivityLog {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const connectionMessages = [
  { message: "Initializing Meta Network tunnel...", type: "info" as const },
  { message: "Authenticating credentials...", type: "info" as const },
  { message: "Resolving metadata endpoints...", type: "info" as const },
  { message: "Establishing encrypted channel...", type: "info" as const },
  { message: "Verifying AI connectivity...", type: "info" as const },
  { message: "Loading AI model parameters...", type: "info" as const },
  { message: "Synchronizing with MiChat service...", type: "info" as const },
  { message: "Configuring network protocols...", type: "info" as const },
  { message: "Establishing secure handshake...", type: "success" as const },
  { message: "Connection encrypted with TLS 1.3", type: "success" as const },
  { message: "Network tunnel established successfully", type: "success" as const },
  { message: "AI service ready for communication", type: "success" as const },
  { message: "Monitoring connection stability...", type: "info" as const },
  { message: "Traffic routed through secure proxy", type: "info" as const },
  { message: "Bandwidth optimization active", type: "success" as const },
];

const activeMessages = [
  { message: "MiChat AI: Connection stable", type: "success" as const },
  { message: "Data packets: 2.4 MB/s downstream", type: "info" as const },
  { message: "Latency: 45ms average", type: "success" as const },
  { message: "AI response time: 124ms", type: "info" as const },
  { message: "Network quality: Excellent", type: "success" as const },
  { message: "Encryption protocol: AES-256", type: "info" as const },
  { message: "Session tokens refreshed", type: "success" as const },
  { message: "API gateway healthy", type: "success" as const },
  { message: "Database connection pool active", type: "info" as const },
  { message: "Cache synchronization complete", type: "success" as const },
  { message: "Message queue processing", type: "info" as const },
  { message: "AI inference engine loaded", type: "success" as const },
];

let globalLogs: ConnectivityLog[] = [];
let logIndex = 0;
let intervalId: NodeJS.Timeout | null = null;

export default function MetaConnectivityPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [logs, setLogs] = useState<ConnectivityLog[]>([]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Timer for connection duration
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isConnected) {
      timerInterval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isConnected]);

  // Global log interval
  useEffect(() => {
    if (isConnected && !intervalId) {
      const allMessages = [...connectionMessages, ...activeMessages];
      
      intervalId = setInterval(() => {
        if (typeof window !== 'undefined') {
          const currentMessage = allMessages[logIndex % allMessages.length];
          
          const newLog: ConnectivityLog = {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: new Date(),
            message: currentMessage.message,
            type: currentMessage.type,
          };
          
          globalLogs = [newLog, ...globalLogs].slice(0, 200);
          logIndex++;
          setLogs(prev => [newLog, ...prev].slice(0, 200));
        }
      }, 5000);
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

  const addLog = (message: string, type: ConnectivityLog["type"]) => {
    const newLog: ConnectivityLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message,
      type,
    };
    globalLogs = [newLog, ...globalLogs].slice(0, 200);
    setLogs(prev => [newLog, ...prev].slice(0, 200));
  };

  const handleConnect = async () => {
    setError('');
    
    if (!apiKey.trim() || !groupLink.trim()) {
      setError('Please fill in both API Key and Group Link');
      return;
    }

    if (isConnecting) return;
    
    if (isConnected) {
      addLog("Disconnecting from Meta service...", "info");
      setTimeout(() => {
        addLog("Connection terminated", "warning");
        setIsConnected(false);
        setConnectionTime(0);
        setShowConnectModal(false);
      }, 1000);
      return;
    }

    setIsConnecting(true);
    
    for (let i = 0; i < connectionMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      addLog(connectionMessages[i].message, connectionMessages[i].type);
    }

    setIsConnecting(false);
    setIsConnected(true);
    setShowConnectModal(false);
    addLog("🟢 Connected to Meta Connectivity AI Service", "success");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getLogIcon = (type: ConnectivityLog["type"]) => {
    switch (type) {
      case "success":
        return <Check size={12} className="text-emerald-400" />;
      case "warning":
        return <AlertCircle size={12} className="text-yellow-400" />;
      case "error":
        return <AlertCircle size={12} className="text-red-400" />;
      default:
        return <Zap size={12} className="text-blue-400" />;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey || groupLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Network size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Meta Connectivity</h1>
          <p className="mt-2 text-sm text-emerald-400/60">
            AI-Powered Network Configuration & MiChat Integration
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
                  <Loader size={48} className="text-emerald-400" />
                </motion.div>
              ) : isConnected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Wifi size={48} className="text-emerald-400" />
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
              {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Disconnected"}
            </h2>
            {isConnected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-emerald-400/60"
              >
                Connected for {formatTime(connectionTime)}
              </motion.p>
            )}
          </div>

          {/* Connection Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (isConnected) {
                handleConnect();
              } else {
                setShowConnectModal(true);
              }
            }}
            disabled={isConnecting}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isConnected
                ? "bg-red-500/80 hover:bg-red-600/80 text-white"
                : "bg-emerald-500/80 hover:bg-emerald-600/80 text-white disabled:opacity-50"
            }`}
          >
            {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect & Configure"}
          </motion.button>
        </motion.div>

        {/* Connection Logs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <Terminal size={20} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Connection Logs</h3>
            <span className="text-xs text-emerald-400/60">({logs.length} entries)</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto rounded-lg bg-black/40 p-4 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-emerald-400/40 py-8 text-center">
                Logs will appear here when connected...
              </div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-2 ${
                    log.type === "success"
                      ? "text-emerald-400"
                      : log.type === "warning"
                      ? "text-yellow-400"
                      : log.type === "error"
                      ? "text-red-400"
                      : "text-blue-400"
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">{getLogIcon(log.type)}</div>
                  <div className="flex-1 break-all">
                    <span className="text-gray-500">[{log.timestamp.toLocaleTimeString()}]</span> {log.message}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowConnectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 to-black/95 p-6 backdrop-blur-xl"
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                    <LinkIcon size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Meta Connectivity Setup</h2>
                    <p className="text-xs text-emerald-400/60">Connect to AI network</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConnectModal(false)}
                  className="rounded-lg p-2 text-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/20 p-3 text-sm text-red-300 border border-red-500/30"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}

              {/* API Key Input */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-emerald-300">API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key..."
                    className="w-full rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-white placeholder-emerald-400/30 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  />
                  {apiKey && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-emerald-400/60 hover:text-emerald-400"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Group Link Input */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-emerald-300">Group Link</label>
                <input
                  type="text"
                  value={groupLink}
                  onChange={(e) => setGroupLink(e.target.value)}
                  placeholder="https://meta.connectivity/group/..."
                  className="w-full rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-white placeholder-emerald-400/30 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                />
              </div>

              {/* Instructions */}
              <div className="mb-6 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-300/80 border border-emerald-500/20">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <Settings size={14} />
                  VPN & Network Configuration
                </p>
                <ul className="space-y-1 text-emerald-400/60">
                  <li>• Click "Connect & Configure" to establish secure tunnel</li>
                  <li>• Network will auto-configure for optimal performance</li>
                  <li>• AI service will initialize and start monitoring</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-950/50 py-2 font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex-1 rounded-lg bg-emerald-500/80 py-2 font-medium text-white transition-all hover:bg-emerald-600/80 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isConnecting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Loader size={16} />
                      </motion.div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wifi size={16} />
                      Connect
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
}
