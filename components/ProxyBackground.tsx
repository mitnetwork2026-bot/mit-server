"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProxyBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-0"
      >
        <img
          src="/images/proxy-bg.png"
          alt="Proxy Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/15 via-blue-950/8 to-slate-900/15" />
      </motion.div>

      <div className="relative z-10">{children}</div>

      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="pointer-events-none fixed inset-0 z-0"
      />
    </div>
  );
}
