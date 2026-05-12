"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, QrCode, Link2, Copy, Check, Smartphone, Clock, Activity, Shield } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface AccessLog {
  id: string;
  deviceName: string;
  timestamp: number;
  ip: string;
  status: string;
  platform: string;
}

export default function DeviceAccessPage() {
  const [uniqueLink, setUniqueLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const linkId = user.uid.slice(0, 8);
      setUniqueLink(`${window.location.origin}/access/${linkId}`);

      const logsRef = ref(database, `device-access/${linkId}`);
      const unsubscribe = onValue(logsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const logList = Object.entries(data).map(([id, log]) => ({
            id,
            ...(log as Omit<AccessLog, 'id'>),
          }));
          setAccessLogs(logList.reverse());
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Wifi size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Device Access</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Remote Access Monitoring Tool</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Generate a unique access link. When a device opens this link, 
          their connection will be logged in real-time below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md space-y-4"
      >
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
            <Link2 size={16} />
            <span>Access Link</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={uniqueLink}
              readOnly
              className="flex-1 rounded-xl border border-emerald-500/20 bg-black/30 px-3 py-2 text-xs text-emerald-300 outline-none"
            />
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-emerald-600 p-2 text-white"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-emerald-500/30 bg-emerald-950/50">
            <QrCode size={60} className="text-emerald-400" />
          </div>
          <p className="mt-3 text-xs text-emerald-500/50">Scan QR to trigger access log</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Activity size={14} />
          Access Logs ({accessLogs.length})
        </h2>

        {accessLogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-950/20 p-8 text-center">
            <Shield className="mx-auto mb-3 h-12 w-12 text-emerald-500/30" />
            <p className="text-sm text-emerald-500/50">Monitoring for connections...</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-500/40">
              <motion.div
                className="h-2 w-2 rounded-full bg-emerald-500/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Waiting for device access
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {accessLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                      <Smartphone size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{log.deviceName}</p>
                      <p className="font-mono text-xs text-emerald-500/60">{log.ip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                      log.status === "connected" 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center gap-4 text-xs text-emerald-500/50">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span>{log.platform}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4"
      >
        <p className="text-center text-xs text-yellow-400/80">
          ⚠️ This tool is for demonstration purposes only. 
          Unauthorized access to devices is illegal.
        </p>
      </motion.div>
    </div>
  );
}
