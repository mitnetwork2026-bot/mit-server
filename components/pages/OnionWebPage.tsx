"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, Shield, AlertTriangle, Lock, Eye, Server } from "lucide-react";

const onionSites = [
  { id: 1, name: "Hidden Wiki", address: "zqktlwi...d.onion", category: "Directory", risk: "low" },
  { id: 2, name: "DuckDuckGo", address: "3g2upl4...d.onion", category: "Search Engine", risk: "low" },
  { id: 3, name: "SecureDrop", address: "secrdrop...d.onion", category: "Whistleblowing", risk: "low" },
  { id: 4, name: "ProtonMail", address: "protonirockerxow...d.onion", category: "Email", risk: "low" },
  { id: 5, name: "Dark Web Forum", address: "forum...d.onion", category: "Forum", risk: "high" },
];

export default function OnionWebPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [torStatus, setTorStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");

  const handleConnect = () => {
    setIsConnecting(true);
    setTorStatus("connecting");
    
    setTimeout(() => {
      setTorStatus("connected");
      setIsConnecting(false);
    }, 3000);
  };

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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-xl shadow-purple-500/30"
        >
          <Globe size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Onion Web</h1>
        <p className="mt-2 text-sm text-purple-400/60">Tor Network Browser Interface</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-purple-500/20 bg-purple-950/30 p-4 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle size={18} />
          <span className="text-sm font-medium">Security Warning</span>
        </div>
        <p className="mt-2 text-sm text-purple-400/80">
          The Tor network provides anonymity but may expose you to illegal content.
          Use responsibly and within legal boundaries.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md"
      >
        <div className="rounded-2xl border border-purple-500/20 bg-purple-950/30 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${
                torStatus === "connected" ? "bg-emerald-500" :
                torStatus === "connecting" ? "bg-yellow-500 animate-pulse" :
                "bg-red-500"
              }`} />
              <span className="text-sm text-white">
                {torStatus === "connected" ? "Connected to Tor Network" :
                 torStatus === "connecting" ? "Establishing connection..." :
                 "Disconnected"}
              </span>
            </div>
            <motion.button
              onClick={handleConnect}
              disabled={isConnecting || torStatus === "connected"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {torStatus === "connected" ? "Connected" : "Connect"}
            </motion.button>
          </div>

          {torStatus === "connected" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3"
            >
              <Shield size={16} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">
                Your IP is hidden: 185.xxx.xxx.xxx (Exit Node: Germany)
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {torStatus === "connected" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-500/50" />
            <input
              type="text"
              placeholder="Enter .onion address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-purple-500/30 bg-purple-950/30 py-3 pl-12 pr-4 text-white placeholder:text-purple-500/40 focus:border-purple-400 focus:outline-none"
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-purple-400/60">
          <Server size={14} />
          Known .onion Sites
        </h2>

        <div className="space-y-3">
          {onionSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="rounded-2xl border border-purple-500/20 bg-purple-950/30 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                    <Eye size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{site.name}</p>
                    <p className="font-mono text-xs text-purple-500/60">{site.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                    {site.category}
                  </span>
                  <p className={`mt-1 text-xs ${
                    site.risk === "low" ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {site.risk} risk
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-purple-500/10 bg-purple-950/20 p-4"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-purple-400">
          <Lock size={14} />
          Anonymity Features
        </h3>
        <ul className="space-y-2 text-xs text-purple-400/70">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Multi-layer encryption (Onion routing)
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            IP address masking through relay nodes
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            No browsing history stored locally
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            End-to-end encrypted connections
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
