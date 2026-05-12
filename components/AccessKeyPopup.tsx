"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, Lock, AlertTriangle } from "lucide-react";

interface AccessKeyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serverName: string;
  serverIcon?: React.ReactNode;
}

export default function AccessKeyPopup({ isOpen, onClose, serverName, serverIcon }: AccessKeyPopupProps) {
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 via-black/95 to-emerald-900/90 p-6 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <X size={20} />
            </button>

            <div className="mb-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/50"
              >
                {serverIcon || <Lock size={40} className="text-emerald-400" />}
              </motion.div>
              <h3 className="text-xl font-bold text-white">{serverName}</h3>
              <p className="mt-2 text-sm text-emerald-400/60">Access Authentication Required</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-400"
              >
                <AlertTriangle size={18} />
                <span>Access Denied - Invalid Key</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
                <input
                  type="password"
                  placeholder="Enter Access Key"
                  value={accessKey}
                  onChange={(e) => {
                    setAccessKey(e.target.value);
                    setError(false);
                  }}
                  className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 font-mono text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50"
              >
                Authenticate
              </motion.button>
            </form>

            <p className="mt-4 text-center text-xs text-emerald-500/40">
              Contact administrator for access credentials
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
