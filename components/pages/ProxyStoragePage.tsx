"use client";

import { motion } from "framer-motion";
import { HardDrive, Lock, Folder, FileText } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyStoragePage() {
  const storage = [
    { name: "Primary Database", size: "125 GB", type: "Database" },
    { name: "Backup Storage", size: "248 GB", type: "Backup" },
    { name: "Cache Layer", size: "64 GB", type: "Cache" },
    { name: "Logs Archive", size: "89 GB", type: "Logs" },
  ];

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
          <HardDrive size={40} className="text-white" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Storage</h1>
        <p className="mt-2 text-sm text-blue-400/60">Data Storage Management</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl space-y-3"
      >
        {storage.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-xl border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {i % 2 === 0 ? <Folder size={20} /> : <FileText size={20} />}
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-blue-400/60">{item.type}</p>
                </div>
              </div>
              <span className="font-mono text-blue-400">{item.size}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
