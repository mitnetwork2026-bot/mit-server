"use client";

import { motion } from "framer-motion";
import { Globe, Network, Wifi } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyNetworkMapPage() {
  const nodes = [
    { id: 1, name: "Primary Node", status: "Active" },
    { id: 2, name: "Secondary Node", status: "Active" },
    { id: 3, name: "Backup Node", status: "Standby" },
    { id: 4, name: "Cache Node", status: "Active" },
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
          <Globe size={40} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">Network Map</h1>
        <p className="mt-2 text-sm text-blue-400/60">Network Topology</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl space-y-3"
      >
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-4 rounded-xl border border-blue-400/20 bg-black/30 p-4 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-blue-400"
            />
            <div className="flex-1">
              <p className="font-semibold text-white">{node.name}</p>
              <div className="flex items-center gap-2">
                <Wifi size={12} className="text-blue-400/60" />
                <p className="text-xs text-blue-400/60">{node.status}</p>
              </div>
            </div>
            <span className="rounded-lg bg-blue-400/20 px-2 py-1 text-xs font-semibold text-blue-400">
              ONLINE
            </span>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
