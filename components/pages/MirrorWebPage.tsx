"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, ExternalLink, Shield, Lock, Clock, AlertTriangle } from "lucide-react";

const mirrorSites = [
  { id: 1, name: "Mirror Node Alpha", url: "alpha.mirror.net", status: "active", latency: "23ms" },
  { id: 2, name: "Mirror Node Beta", url: "beta.mirror.net", status: "active", latency: "45ms" },
  { id: 3, name: "Mirror Node Gamma", url: "gamma.mirror.net", status: "maintenance", latency: "---" },
  { id: 4, name: "Mirror Node Delta", url: "delta.mirror.net", status: "active", latency: "67ms" },
  { id: 5, name: "Mirror Node Epsilon", url: "epsilon.mirror.net", status: "active", latency: "34ms" },
];

export default function MirrorWebPage() {
  const [searchUrl, setSearchUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/30"
        >
          <Globe size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Mirror Web</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Web Mirroring & Caching System</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Mirror Web creates cached copies of websites through distributed nodes.
          Enter a URL to scan and create a mirror through our secure network.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
            <input
              type="url"
              placeholder="Enter URL to mirror..."
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
            />
          </div>
          <motion.button
            onClick={handleScan}
            disabled={isScanning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white disabled:opacity-50"
          >
            {isScanning ? "Scanning..." : "Scan"}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Shield size={14} />
          Mirror Nodes
        </h2>

        <div className="space-y-3">
          {mirrorSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                    <Globe size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{site.name}</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-500/60">
                      <ExternalLink size={10} />
                      {site.url}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                    site.status === "active" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {site.status}
                  </span>
                  <p className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-500/50">
                    <Clock size={10} />
                    {site.latency}
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
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
          <Lock size={14} />
          Security Features
        </h3>
        <ul className="space-y-2 text-xs text-emerald-400/70">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            End-to-end encryption for all mirrored content
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Distributed storage across multiple nodes
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Automatic SSL certificate handling
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            CDN acceleration for faster loading
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
