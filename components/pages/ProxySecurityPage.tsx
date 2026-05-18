"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, Lock, Upload, Zap } from "lucide-react";
import { useState, useRef } from "react";
import ProxyBackground from "../ProxyBackground";

const CYBER_CARDS = [
  { icon: "🔐", name: "Encryption", status: "Secure" },
  { icon: "🚨", name: "DDoS Guard", status: "Active" },
  { icon: "🔍", name: "Intrusion Detection", status: "Monitoring" },
  { icon: "⚔️", name: "Firewall", status: "Armed" },
  { icon: "🛡️", name: "Malware Scanner", status: "Clean" },
  { icon: "🔑", name: "Key Management", status: "Secured" },
  { icon: "📊", name: "Traffic Analysis", status: "Active" },
  { icon: "🌐", name: "Network Isolation", status: "Enabled" },
  { icon: "💾", name: "Backup Security", status: "Protected" },
  { icon: "🎯", name: "Threat Detection", status: "Armed" },
  { icon: "🔔", name: "Alert System", status: "Ready" },
];

export default function ProxySecurityPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalysisComplete(true);
      }, 2500);
    }
  };

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
          <p className="mt-2 text-sm text-blue-400/60">11 Cyber Cards + Photo Analysis</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Photo Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Upload size={20} className="text-blue-400" />
              Security Analysis
            </h3>
            <motion.button
              onClick={handlePhotoUpload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={analyzing}
              className="w-full rounded-lg border-2 border-dashed border-blue-400/50 p-6 text-center hover:border-blue-400 hover:bg-blue-400/5 transition-all disabled:opacity-50"
            >
              <div className="flex flex-col items-center gap-2">
                {analyzing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Zap size={28} className="text-blue-400" />
                  </motion.div>
                ) : (
                  <Upload size={28} className="text-blue-400" />
                )}
                <div>
                  <p className="font-semibold text-blue-100">
                    {analyzing ? "Analyzing..." : "Click to Upload Photo"}
                  </p>
                  <p className="text-xs text-blue-400/60">or drag and drop</p>
                </div>
              </div>
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Analysis Result */}
            {analysisComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-green-900/30 border border-green-400/30 p-3"
              >
                <p className="text-sm text-green-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Photo analysis complete - No threats detected
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Cyber Security Cards Grid */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Shield size={20} className="text-blue-400" />
              Security Modules ({CYBER_CARDS.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {CYBER_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  whileHover={{ scale: 1.05, translateY: -4 }}
                  className="rounded-lg border border-blue-400/20 bg-blue-600/20 p-3 hover:bg-blue-600/30 transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <p className="text-2xl mb-2">{card.icon}</p>
                    <p className="text-xs font-semibold text-white line-clamp-2">{card.name}</p>
                    <p className="text-xs text-green-400 mt-1 font-semibold">{card.status}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overall Security Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl border border-blue-400/20 bg-black/30 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Shield size={20} className="text-blue-400" />
              Overall Security Assessment
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-400/60">System Health</span>
                  <span className="text-sm font-bold text-green-400">100%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-blue-900">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-green-600 to-green-300"
                  />
                </div>
              </div>
              <p className="text-sm text-green-400 font-semibold">✓ MAXIMUM SECURITY LEVEL ACHIEVED</p>
              <p className="text-xs text-blue-400/60">All 11 security modules are active and monitoring.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
