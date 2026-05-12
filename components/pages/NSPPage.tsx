"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Globe, Smartphone, Database, Chrome, Server, Satellite, Skull } from "lucide-react";
import AccessKeyPopup from "@/components/AccessKeyPopup";

const servers = [
  { id: "samsung", name: "Samsung", icon: Smartphone, color: "from-blue-500 to-blue-600" },
  { id: "nasa", name: "NASA", icon: Satellite, color: "from-red-500 to-red-600" },
  { id: "google", name: "Google", icon: Chrome, color: "from-yellow-500 to-green-500" },
  { id: "meta", name: "Meta", icon: Globe, color: "from-blue-600 to-purple-600" },
  { id: "megachrome", name: "MegaChrome", icon: Database, color: "from-orange-500 to-red-500" },
  { id: "mozilla", name: "Mozilla", icon: Globe, color: "from-orange-500 to-orange-600" },
  { id: "microsoft", name: "Microsoft", icon: Server, color: "from-blue-500 to-cyan-500" },
  { id: "xiaomi", name: "Xiaomi", icon: Smartphone, color: "from-orange-500 to-yellow-500" },
  { id: "starlink", name: "Starlink", icon: Satellite, color: "from-gray-500 to-gray-600" },
  { id: "darkweb", name: "Dark Web", icon: Skull, color: "from-purple-600 to-purple-900" },
];

export default function NSPPage() {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-4 pb-32 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
          alt="MIT Network Logo" 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-4 h-24 w-24 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          crossOrigin="anonymous"
        />
        
        <h1 className="text-3xl font-bold text-white">NSP</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Network Security Protocol</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          NSP (Network Security Protocol) provides secure access to major server infrastructures 
          worldwide. Each server requires unique authentication credentials for access.
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-emerald-500/50">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Active Servers: 10
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            Pending: 3
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md"
      >
        <h2 className="mb-4 text-center text-sm uppercase tracking-widest text-emerald-400/60">
          Server Access Points
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {servers.map((server, index) => (
            <motion.button
              key={server.id}
              onClick={() => setSelectedServer(server.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-sm transition-all hover:border-emerald-500/40"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${server.color}`} />
              <div className="p-4">
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${server.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <server.icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-white">{server.name}</span>
                <p className="mt-1 text-xs text-emerald-500/50">Secured Access</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AccessKeyPopup
        isOpen={selectedServer !== null}
        onClose={() => setSelectedServer(null)}
        serverName={servers.find(s => s.id === selectedServer)?.name || ""}
        serverIcon={(() => {
          const server = servers.find(s => s.id === selectedServer);
          if (server) {
            const Icon = server.icon;
            return <Icon size={40} className="text-emerald-400" />;
          }
          return null;
        })()}
      />
    </div>
  );
}
