"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, Lock } from "lucide-react";
import ProxyBackground from "../ProxyBackground";

export default function ProxySecurityPage() {
  const checks = [
    { name: "Firewall Status", status: "secure" },
    { name: "Encryption", status: "secure" },
    { name: "DDoS Protection", status: "secure" },
    { name: "Intrusion Detection", status: "secure" },
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
          <Lock size={40} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">Security Audit</h1>
        <p className="mt-2 text-sm text-blue-400/60">System Security Status</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl space-y-3"
      >
        {checks.map((check, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center justify-between rounded-xl border border-blue-400/20 bg-black/30 p-4 backdrop-blur-xl"
          >
            <span className="font-semibold text-white">{check.name}</span>
            <CheckCircle size={20} className="text-blue-400" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-2xl rounded-2xl border border-blue-400/20 bg-black/30 p-6 backdrop-blur-xl"
      >
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
          <Shield size={20} className="text-blue-400" />
          Overall Security
        </h3>
        <div className="h-3 overflow-hidden rounded-full bg-blue-900">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            className="h-full bg-gradient-to-r from-blue-600 to-blue-300"
          />
        </div>
        <p className="mt-2 text-sm text-blue-400">MAXIMUM SECURITY LEVEL</p>
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
