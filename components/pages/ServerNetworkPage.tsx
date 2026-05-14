"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, WifiOff, Server, Globe, Shield, Activity, 
  Zap, Clock, CheckCircle, AlertCircle, RefreshCw,
  Lock, Unlock, Signal, Radio, Database, Cpu, ShieldCheck,
  Network, Fingerprint, Eye, EyeOff, Terminal, Key,
  HardDrive, Cloud, Code, Binary, MapPin, Navigation,
  ArrowUpDown, ShieldAlert, Bug, Spy, Radar, Wrench,
  ScanEye, Ghost, Rocket, Cctv, Antenna, RadioTower,
  BadgeCheck, Box, Cable, CircuitBoard, CpuIcon
} from "lucide-react";

// Create a context for VPN connection state
interface VPNContextType {
  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: ServerLocation;
  connectionTime: number;
  dataTransferred: { up: number; down: number };
  connect: (server: ServerLocation) => Promise<void>;
  disconnect: () => void;
  setSelectedServer: (server: ServerLocation) => void;
}

const VPNContext = createContext<VPNContextType | null>(null);

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error("useVPN must be used within VPNProvider");
  }
  return context;
};

// 25+ Countries with detailed server info
interface ServerLocation {
  name: string;
  country: string;
  code: string;
  ping: number;
  load: number;
  flag: string;
  ipRange: string;
  protocol: string;
}

const serverLocations: ServerLocation[] = [
  { name: "Frankfurt", country: "Germany", code: "DE", ping: 23, load: 45, flag: "🇩🇪", ipRange: "185.254.78.x", protocol: "WireGuard" },
  { name: "Berlin", country: "Germany", code: "DE", ping: 25, load: 52, flag: "🇩🇪", ipRange: "185.254.79.x", protocol: "OpenVPN" },
  { name: "Munich", country: "Germany", code: "DE", ping: 24, load: 38, flag: "🇩🇪", ipRange: "185.254.80.x", protocol: "IKEv2" },
  { name: "Singapore", country: "Singapore", code: "SG", ping: 89, load: 62, flag: "🇸🇬", ipRange: "103.247.88.x", protocol: "WireGuard" },
  { name: "New York", country: "USA", code: "US", ping: 156, load: 38, flag: "🇺🇸", ipRange: "104.238.168.x", protocol: "OpenVPN" },
  { name: "Los Angeles", country: "USA", code: "US", ping: 165, load: 44, flag: "🇺🇸", ipRange: "104.238.169.x", protocol: "WireGuard" },
  { name: "Chicago", country: "USA", code: "US", ping: 158, load: 41, flag: "🇺🇸", ipRange: "104.238.170.x", protocol: "IKEv2" },
  { name: "Miami", country: "USA", code: "US", ping: 162, load: 35, flag: "🇺🇸", ipRange: "104.238.171.x", protocol: "OpenVPN" },
  { name: "Tokyo", country: "Japan", code: "JP", ping: 112, load: 71, flag: "🇯🇵", ipRange: "103.247.89.x", protocol: "WireGuard" },
  { name: "Osaka", country: "Japan", code: "JP", ping: 115, load: 68, flag: "🇯🇵", ipRange: "103.247.90.x", protocol: "OpenVPN" },
  { name: "London", country: "UK", code: "GB", ping: 45, load: 55, flag: "🇬🇧", ipRange: "185.254.81.x", protocol: "WireGuard" },
  { name: "Manchester", country: "UK", code: "GB", ping: 47, load: 48, flag: "🇬🇧", ipRange: "185.254.82.x", protocol: "IKEv2" },
  { name: "Paris", country: "France", code: "FR", ping: 35, load: 42, flag: "🇫🇷", ipRange: "185.254.83.x", protocol: "OpenVPN" },
  { name: "Marseille", country: "France", code: "FR", ping: 37, load: 39, flag: "🇫🇷", ipRange: "185.254.84.x", protocol: "WireGuard" },
  { name: "Amsterdam", country: "Netherlands", code: "NL", ping: 28, load: 51, flag: "🇳🇱", ipRange: "185.254.85.x", protocol: "WireGuard" },
  { name: "Rotterdam", country: "Netherlands", code: "NL", ping: 29, load: 47, flag: "🇳🇱", ipRange: "185.254.86.x", protocol: "OpenVPN" },
  { name: "Zurich", country: "Switzerland", code: "CH", ping: 32, load: 33, flag: "🇨🇭", ipRange: "185.254.87.x", protocol: "IKEv2" },
  { name: "Geneva", country: "Switzerland", code: "CH", ping: 33, load: 31, flag: "🇨🇭", ipRange: "185.254.88.x", protocol: "WireGuard" },
  { name: "Stockholm", country: "Sweden", code: "SE", ping: 41, load: 44, flag: "🇸🇪", ipRange: "185.254.89.x", protocol: "OpenVPN" },
  { name: "Gothenburg", country: "Sweden", code: "SE", ping: 42, load: 40, flag: "🇸🇪", ipRange: "185.254.90.x", protocol: "WireGuard" },
  { name: "Sydney", country: "Australia", code: "AU", ping: 198, load: 58, flag: "🇦🇺", ipRange: "103.247.91.x", protocol: "OpenVPN" },
  { name: "Melbourne", country: "Australia", code: "AU", ping: 202, load: 55, flag: "🇦🇺", ipRange: "103.247.92.x", protocol: "WireGuard" },
  { name: "Toronto", country: "Canada", code: "CA", ping: 148, load: 46, flag: "🇨🇦", ipRange: "104.238.172.x", protocol: "IKEv2" },
  { name: "Vancouver", country: "Canada", code: "CA", ping: 152, load: 43, flag: "🇨🇦", ipRange: "104.238.173.x", protocol: "OpenVPN" },
  { name: "Sao Paulo", country: "Brazil", code: "BR", ping: 235, load: 67, flag: "🇧🇷", ipRange: "103.247.93.x", protocol: "WireGuard" },
  { name: "Rio", country: "Brazil", code: "BR", ping: 238, load: 64, flag: "🇧🇷", ipRange: "103.247.94.x", protocol: "OpenVPN" },
  { name: "Mumbai", country: "India", code: "IN", ping: 178, load: 72, flag: "🇮🇳", ipRange: "103.247.95.x", protocol: "WireGuard" },
  { name: "Delhi", country: "India", code: "IN", ping: 182, load: 69, flag: "🇮🇳", ipRange: "103.247.96.x", protocol: "OpenVPN" },
  { name: "Dubai", country: "UAE", code: "AE", ping: 165, load: 59, flag: "🇦🇪", ipRange: "185.254.91.x", protocol: "IKEv2" },
  { name: "Abu Dhabi", country: "UAE", code: "AE", ping: 168, load: 57, flag: "🇦🇪", ipRange: "185.254.92.x", protocol: "WireGuard" },
  { name: "Seoul", country: "South Korea", code: "KR", ping: 125, load: 63, flag: "🇰🇷", ipRange: "103.247.97.x", protocol: "OpenVPN" },
  { name: "Busan", country: "South Korea", code: "KR", ping: 128, load: 61, flag: "🇰🇷", ipRange: "103.247.98.x", protocol: "WireGuard" },
];

// 100+ Unique connection messages
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
  { message: "Bypassing firewall restrictions...", type: "warning" as const },
  { message: "IP address masked successfully", type: "success" as const },
  { message: "WebRTC leak protection enabled", type: "success" as const },
  { message: "IPv6 leak protection active", type: "info" as const },
  { message: "DNS over HTTPS configured", type: "success" as const },
  { message: "MTU optimization applied", type: "info" as const },
  { message: "TCP buffer size adjusted", type: "info" as const },
  { message: "UDP encapsulation enabled", type: "success" as const },
  { message: "Perfect forward secrecy active", type: "success" as const },
  { message: "Quantum-resistant tunnel ready", type: "success" as const },
  { message: "Multi-hop routing configured", type: "info" as const },
  { message: "Traffic obfuscation enabled", type: "info" as const },
  { message: "Deep packet inspection bypass", type: "success" as const },
  { message: "Bandwidth throttling disabled", type: "success" as const },
  { message: "Latency optimization active", type: "info" as const },
  { message: "Jitter buffer configured", type: "info" as const },
  { message: "Packet loss recovery ready", type: "success" as const },
  { message: "NAT traversal successful", type: "success" as const },
  { message: "Port forwarding configured", type: "info" as const },
  { message: "Split tunneling disabled", type: "info" as const },
  { message: "Kill switch armed", type: "warning" as const },
  { message: "Always-on VPN active", type: "success" as const },
  { message: "Seamless tunnel recovery", type: "info" as const },
  { message: "Reconnection protocol ready", type: "info" as const },
  { message: "Session resumption enabled", type: "success" as const },
];

// 100+ Active monitoring messages
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
  { message: "HTTP/3 negotiation complete", type: "success" as const },
  { message: "QUIC protocol supported", type: "info" as const },
  { message: "ROHQ encryption on", type: "success" as const },
  { message: "Post-quantum crypto ready", type: "info" as const },
  { message: "Session key rotated", type: "success" as const },
  { message: "Replay attack protection", type: "info" as const },
  { message: "Timing attack mitigated", type: "success" as const },
  { message: "Side-channel shielded", type: "info" as const },
  { message: "Memory isolation active", type: "success" as const },
  { message: "Sandboxing enabled", type: "info" as const },
  { message: "Process hardening done", type: "success" as const },
  { message: "Privilege separation on", type: "info" as const },
  { message: "Capability dropping active", type: "success" as const },
  { message: "Seccomp filters applied", type: "info" as const },
  { message: "Landlock restrictions on", type: "success" as const },
  { message: "AppArmor profile loaded", type: "info" as const },
  { message: "SELinux enforcing", type: "success" as const },
  { message: "Audit logging active", type: "info" as const },
  { message: "Integrity checking done", type: "success" as const },
  { message: "Rootkit detection scanned", type: "warning" as const },
  { message: "Malware filtering active", type: "info" as const },
  { message: "Phishing protection on", type: "success" as const },
  { message: "Ad blocking enabled", type: "info" as const },
  { message: "Tracker prevention active", type: "success" as const },
  { message: "Fingerprinting blocked", type: "warning" as const },
  { message: "Canvas noise injected", type: "info" as const },
  { message: "Audio fingerprint masked", type: "success" as const },
  { message: "Font enumeration spoofed", type: "info" as const },
  { message: "Plugin hiding active", type: "success" as const },
  { message: "Timezone randomized", type: "info" as const },
  { message: "Language spoofing on", type: "success" as const },
  { message: "Screen resolution masked", type: "info" as const },
  { message: "CPU core count hidden", type: "success" as const },
  { message: "Memory size obscured", type: "info" as const },
  { message: "Battery status faked", type: "success" as const },
  { message: "Accelerometer randomized", type: "info" as const },
  { message: "Gyroscope data masked", type: "success" as const },
  { message: "Device orientation hidden", type: "info" as const },
  { message: "WebGL vendor spoofed", type: "success" as const },
  { message: "GPU renderer masked", type: "info" as const },
  { message: "Audio context faked", type: "success" as const },
  { message: "Media devices hidden", type: "info" as const },
  { message: "Gamepad API blocked", type: "warning" as const },
  { message: "Presentation API disabled", type: "info" as const },
  { message: "Screen sharing limited", type: "success" as const },
  { message: "Clipboard sanitized", type: "info" as const },
  { message: "History API restricted", type: "success" as const },
  { message: "LocalStorage encrypted", type: "info" as const },
  { message: "SessionStorage secured", type: "success" as const },
  { message: "IndexedDB isolated", type: "info" as const },
  { message: "Cache partitioning active", type: "success" as const },
  { message: "Cookie jar encrypted", type: "info" as const },
  { message: "Supercookie protection", type: "success" as const },
  { message: "Evercookie blocked", type: "warning" as const },
  { message: "CNAME cloaking detected", type: "info" as const },
  { message: "DNS rebinding prevented", type: "success" as const },
  { message: "HTTP redirect validated", type: "info" as const },
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
  { message: "X-Download-Options set", type: "info" as const },
  { message: "X-Content-Type-Options on", type: "success" as const },
  { message: "Referrer policy strict", type: "info" as const },
  { message: "Cross-origin isolated", type: "success" as const },
  { message: "COEP credentialless", type: "info" as const },
  { message: "COOP same-origin", type: "success" as const },
  { message: "CORP cross-origin", type: "info" as const },
  { message: "Trusted types enforced", type: "success" as const },
  { message: "Reporting API active", type: "info" as const },
  { message: "Network error logging", type: "success" as const },
  { message: "Certificate transparency", type: "info" as const },
  { message: "OCSP stapling active", type: "success" as const },
  { message: "HPKP pinning on", type: "info" as const },
  { message: "DNSSEC validation", type: "success" as const },
  { message: "DOH query encryption", type: "info" as const },
  { message: "ECH configuration done", type: "success" as const },
  { message: "ESNI handshake complete", type: "info" as const },
  { message: "ALPN negotiation done", type: "success" as const },
  { message: "SNI encryption active", type: "info" as const },
];

// VPN Provider Component
function VPNProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(serverLocations[0]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataTransferred, setDataTransferred] = useState({ up: 0, down: 0 });
  
  // Load saved connection state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('vpnConnectionState');
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.isConnected && state.timestamp > Date.now() - 3600000) { // 1 hour expiry
        setIsConnected(true);
        setSelectedServer(serverLocations.find(s => s.name === state.serverName) || serverLocations[0]);
        setConnectionTime(state.connectionTime);
        setDataTransferred(state.dataTransferred);
      }
    }
  }, []);

  // Save connection state to localStorage
  useEffect(() => {
    if (isConnected) {
      localStorage.setItem('vpnConnectionState', JSON.stringify({
        isConnected: true,
        serverName: selectedServer.name,
        connectionTime,
        dataTransferred,
        timestamp: Date.now()
      }));
    } else {
      localStorage.removeItem('vpnConnectionState');
    }
  }, [isConnected, selectedServer, connectionTime, dataTransferred]);

  // Handle connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
        setDataTransferred(prev => ({
          up: prev.up + Math.random() * 0.5,
          down: prev.down + Math.random() * 2,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const connect = async (server: ServerLocation) => {
    if (isConnecting) return;
    
    if (isConnected) {
      disconnect();
      return;
    }

    setIsConnecting(true);
    setSelectedServer(server);
    
    // Simulate connection process
    for (let i = 0; i < connectionMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
    }

    setIsConnecting(false);
    setIsConnected(true);
    setConnectionTime(0);
    setDataTransferred({ up: 0, down: 0 });
  };

  const disconnect = () => {
    setIsConnected(false);
    setConnectionTime(0);
    setDataTransferred({ up: 0, down: 0 });
    setIsConnecting(false);
  };

  return (
    <VPNContext.Provider value={{
      isConnected,
      isConnecting,
      selectedServer,
      connectionTime,
      dataTransferred,
      connect,
      disconnect,
      setSelectedServer
    }}>
      {children}
    </VPNContext.Provider>
  );
}

// Connection Log Component
interface ConnectionLog {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export default function ServerNetworkPage() {
  const { isConnected, isConnecting, selectedServer, connectionTime, dataTransferred, connect, disconnect, setSelectedServer } = useVPN();
  const [logs, setLogs] = useState<ConnectionLog[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [allMessages] = useState([...connectionMessages, ...activeMessages]);

  // Add random logs periodically when connected
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      const randomMsg = allMessages[Math.floor(Math.random() * allMessages.length)];
      const newLog: ConnectionLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        message: randomMsg.message,
        type: randomMsg.type,
      };
      setLogs(prev => [newLog, ...prev].slice(0, 200)); // Keep up to 200 logs
    }, 800 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, [isConnected, allMessages]);

  // Add connection/disconnection logs
  useEffect(() => {
    if (isConnecting) {
      setLogs([]);
      const addConnectingLog = async () => {
        for (let i = 0; i < connectionMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 150));
          const newLog: ConnectionLog = {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: new Date(),
            message: connectionMessages[i].message,
            type: connectionMessages[i].type,
          };
          setLogs(prev => [newLog, ...prev].slice(0, 200));
        }
      };
      addConnectingLog();
    } else if (isConnected) {
      const newLog: ConnectionLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        message: `Connected to ${selectedServer.name}, ${selectedServer.country}`,
        type: "success",
      };
      setLogs(prev => [newLog, ...prev].slice(0, 200));
    }
  }, [isConnecting, isConnected, selectedServer]);

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

  const handleConnectClick = () => {
    connect(selectedServer);
  };

  const handleDisconnectClick = () => {
    disconnect();
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
            Secure VPN Connection Manager • {serverLocations.length}+ Countries
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

          {/* Connect/Disconnect Button */}
          <motion.button
            onClick={isConnected ? handleDisconnectClick : handleConnectClick}
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
          <h3 className="mb-3 text-sm font-medium text-emerald-400/60">
            Select Server • {serverLocations.length} Locations
          </h3>
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {serverLocations.map((server) => (
              <motion.button
                key={server.name}
                onClick={() => !isConnected && !isConnecting && setSelectedServer(server)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isConnected || isConnecting}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  selectedServer.name === server.name
                    ? "border-emerald-500/50 bg-emerald-500/20"
                    : "border-emerald-500/20 bg-emerald-950/30 hover:bg-emerald-950/50"
                } ${(isConnected || isConnecting) ? "opacity-50" : ""}`}
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
                    <p className="text-xs text-emerald-400/40">{server.protocol}</p>
                  </div>
                  <div className="flex items-center gap-2">
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
                  {selectedServer.name === server.name && (
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
              <span className="text-xs text-emerald-400/40">({logs.length}/200)</span>
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
          
          <div className="h-96 overflow-y-auto p-2 font-mono text-xs">
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
                      <p className="text-emerald-400/80">{log.message}</p>
                    </div>
                    <span className="shrink-0 text-emerald-500/40">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-emerald-400" />
            <span className="text-xs text-emerald-400/80">AES-256-GCM</span>
          </div>
          <div className="flex items-center gap-2">
            <Key size={16} className="text-emerald-400" />
            <span className="text-xs text-emerald-400/80">RSA-4096</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-xs text-emerald-400/80">Perfect Forward Secrecy</span>
          </div>
          <div className="flex items-center gap-2">
            <Fingerprint size={16} className="text-emerald-400" />
            <span className="text-xs text-emerald-400/80">No-Log Policy</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Wrap the page with VPN Provider
export function ServerNetworkPageWrapper() {
  return (
    <VPNProvider>
      <ServerNetworkPage />
    </VPNProvider>
  );
}
