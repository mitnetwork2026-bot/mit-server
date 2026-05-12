"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Wifi } from "lucide-react";

export default function GlassFooter() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-30"
    >
      <div className="mx-2 mb-2 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 shadow-lg shadow-emerald-500/5 backdrop-blur-xl sm:mx-4 sm:mb-4">
        <div className="flex items-center justify-center gap-4 px-3 py-2 sm:gap-6 sm:px-4 sm:py-3">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/60 sm:gap-2 sm:text-xs">
            <Shield size={12} className="sm:h-3.5 sm:w-3.5" />
            <span>Secured</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/60 sm:gap-2 sm:text-xs">
            <Lock size={12} className="sm:h-3.5 sm:w-3.5" />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/60 sm:gap-2 sm:text-xs">
            <Wifi size={12} className="sm:h-3.5 sm:w-3.5" />
            <span>Connected</span>
          </div>
        </div>
        <div className="border-t border-emerald-500/10 px-3 py-1.5 text-center sm:px-4 sm:py-2">
          <p className="text-[10px] text-emerald-500/40 sm:text-xs">© 2024 MIT NETWORK • Powered by Knox Security</p>
        </div>
      </div>
    </motion.footer>
  );
}
