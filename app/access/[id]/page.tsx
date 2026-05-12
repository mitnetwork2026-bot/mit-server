"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Wifi, CheckCircle, Smartphone } from "lucide-react";

export default function AccessPage() {
  const params = useParams();
  const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting");

  useEffect(() => {
    const logAccess = async () => {
      const accessLog = {
        deviceName: `${navigator.platform} Device`,
        timestamp: Date.now(),
        ip: "192.168.1." + Math.floor(Math.random() * 255),
        status: "connected",
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
      };

      try {
        const logsRef = ref(database, `device-access/${params.id}`);
        await push(logsRef, accessLog);
        setStatus("connected");
      } catch (error) {
        console.error("Error logging access:", error);
        setStatus("error");
      }
    };

    setTimeout(logAccess, 2000);
  }, [params.id]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-emerald-950/20 to-black px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-2xl shadow-emerald-500/30"
        >
          {status === "connected" ? (
            <CheckCircle size={48} className="text-white" />
          ) : (
            <Wifi size={48} className="text-white" />
          )}
        </motion.div>

        <h1 className="text-3xl font-bold text-white">MIT NETWORK</h1>
        <p className="mt-2 text-emerald-400/60">Remote Access Portal</p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 backdrop-blur-sm"
        >
          {status === "connecting" && (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
              />
              <p className="text-emerald-400">Establishing secure connection...</p>
              <div className="space-y-1 text-xs text-emerald-500/50">
                <p>• Verifying credentials</p>
                <p>• Encrypting channel</p>
                <p>• Connecting to network</p>
              </div>
            </div>
          )}

          {status === "connected" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Connection Established</span>
              </div>
              
              <div className="rounded-xl bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Smartphone size={24} className="text-emerald-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{navigator.platform}</p>
                    <p className="text-xs text-emerald-500/60">Device Connected</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-emerald-500/50">
                Your device is now linked to the MIT Network console.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="text-red-400">
              <p>Connection failed</p>
              <p className="mt-2 text-sm text-red-400/60">Please try again later</p>
            </div>
          )}
        </motion.div>

        <p className="mt-6 text-xs text-emerald-500/40">
          Secured by Knox • MIT Network v2.0
        </p>
      </motion.div>
    </div>
  );
}
