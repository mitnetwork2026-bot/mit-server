"use client";

import { motion } from "framer-motion";
import { HardDrive, Lock, Folder, FileText } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

const CLOUD_PROVIDERS = [
  { name: "AWS S3", icon: "☁️", size: "156 GB" },
  { name: "Google Cloud", icon: "🌐", size: "98 GB" },
  { name: "Microsoft Azure", icon: "◆", size: "204 GB" },
  { name: "Dropbox", icon: "📦", size: "45 GB" },
  { name: "OneDrive", icon: "📁", size: "78 GB" },
  { name: "iCloud", icon: "🍎", size: "124 GB" },
  { name: "Yandex Disk", icon: "Я", size: "89 GB" },
  { name: "Mail.ru Cloud", icon: "M", size: "156 GB" },
  { name: "MEGA", icon: "⬆️", size: "102 GB" },
  { name: "Proton Drive", icon: "P", size: "67 GB" },
  { name: "Nextcloud", icon: "↗️", size: "234 GB" },
  { name: "Seafile", icon: "🔐", size: "145 GB" },
  { name: "Synology", icon: "◯", size: "512 GB" },
  { name: "FTP Server", icon: "📡", size: "378 GB" },
  { name: "SFTP Backup", icon: "🔒", size: "267 GB" },
  { name: "B2 Storage", icon: "B", size: "189 GB" },
  { name: "Wasabi", icon: "W", size: "234 GB" },
  { name: "Backblaze", icon: "⛅", size: "456 GB" },
  { name: "IDrive", icon: "I", size: "123 GB" },
  { name: "Crashplan", icon: "💾", size: "389 GB" },
  { name: "Acronis", icon: "A", size: "567 GB" },
  { name: "OpenStack", icon: "🔲", size: "789 GB" },
  { name: "DigitalOcean Spaces", icon: "D", size: "234 GB" },
];

export default function ProxyStoragePage() {
  const [providers] = useState(
    CLOUD_PROVIDERS.sort(() => Math.random() - 0.5).slice(0, 20 + Math.floor(Math.random() * 5))
  );

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
          <p className="mt-2 text-sm text-blue-400/60">{providers.length} Cloud Providers Detected</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-3"
        >
          {/* Storage Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-blue-400/60">Total Storage</p>
                <p className="mt-1 text-lg font-bold text-blue-400">
                  {providers.reduce((acc, p) => acc + parseInt(p.size), 0)} GB
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-400/60">Providers</p>
                <p className="mt-1 text-lg font-bold text-blue-400">{providers.length}</p>
              </div>
              <div>
                <p className="text-xs text-blue-400/60">Status</p>
                <p className="mt-1 text-lg font-bold text-green-400">Active</p>
              </div>
            </div>
          </motion.div>

          {/* Cloud Providers Grid */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl">
            <h3 className="mb-3 font-semibold text-white">Connected Cloud Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {providers.map((provider, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="rounded-lg border border-blue-400/20 bg-blue-600/20 p-3 hover:bg-blue-600/30 transition-colors group"
                >
                  <div className="text-center">
                    <p className="text-lg mb-1">{provider.icon}</p>
                    <p className="text-xs font-semibold text-white truncate">{provider.name}</p>
                    <p className="text-xs text-blue-400/60 mt-1">{provider.size}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Storage Categories */}
          <div className="space-y-3">
            {[
              { name: "Primary Backup", size: "2.4 TB", type: "Critical Data" },
              { name: "Cache Layer", size: "512 GB", type: "Temporary" },
              { name: "Archive Storage", size: "1.8 TB", type: "Historical" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {i === 0 ? <Lock size={20} className="text-green-400" /> : <FileText size={20} className="text-blue-400" />}
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-blue-400/60">{item.type}</p>
                    </div>
                  </div>
                  <span className="font-mono text-blue-400">{item.size}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
