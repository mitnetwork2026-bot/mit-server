"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Smartphone, Search, Cpu, HardDrive, Battery, Wifi, Monitor, Database } from "lucide-react";

interface DeviceDetails {
  model: string;
  serial: string;
  os: string;
  osVersion: string;
  cpu: string;
  ram: string;
  storage: string;
  battery: string;
  network: string;
  manufacturer: string;
}

export default function DeviceInfoPage() {
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate device lookup
    setTimeout(() => {
      setDeviceDetails({
        model: modelNumber || "SM-G998B",
        serial: serialNumber || "R5CR40XXXXX",
        os: "Android",
        osVersion: "14.0",
        cpu: "Exynos 2100 (5nm)",
        ram: "12 GB LPDDR5",
        storage: "256 GB UFS 3.1",
        battery: "5000 mAh Li-Ion",
        network: "5G / LTE / WiFi 6E",
        manufacturer: "Samsung Electronics",
      });
      setLoading(false);
    }, 2000);
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
          <Info size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Device Info</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Device Information Lookup Tool</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Enter the target device&apos;s model number and serial number to retrieve detailed 
          hardware and software specifications.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md space-y-4"
      >
        <div className="relative">
          <Smartphone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
          <input
            type="text"
            placeholder="Model Number (e.g., SM-G998B)"
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Database className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
          <input
            type="text"
            placeholder="Serial Number (e.g., R5CR40XXXXX)"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Search size={20} />
            </motion.div>
          ) : (
            <>
              <Search size={20} />
              Search Device
            </>
          )}
        </motion.button>
      </motion.form>

      {deviceDetails && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 max-w-md"
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
            <Monitor size={14} />
            Device Specifications
          </h2>

          <div className="space-y-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3 border-b border-emerald-500/20 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <Smartphone size={24} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white">{deviceDetails.model}</p>
                <p className="text-xs text-emerald-500/60">{deviceDetails.manufacturer}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <Database size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">Serial</p>
                  <p className="font-mono text-xs text-emerald-300">{deviceDetails.serial}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <Monitor size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">OS</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.os} {deviceDetails.osVersion}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <Cpu size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">CPU</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.cpu}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <HardDrive size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">RAM</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.ram}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <HardDrive size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">Storage</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.storage}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <Battery size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">Battery</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.battery}</p>
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-2 rounded-lg bg-black/20 p-3">
                <Wifi size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-emerald-500/60">Network</p>
                  <p className="text-xs text-emerald-300">{deviceDetails.network}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
