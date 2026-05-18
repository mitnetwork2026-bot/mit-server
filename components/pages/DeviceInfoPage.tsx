"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Smartphone, Search, Cpu, HardDrive, Battery, Wifi, Monitor, Database, Bluetooth, Radio, X } from "lucide-react";

interface ScannedDevice {
  id: string;
  name: string;
  type: "bluetooth" | "wifi" | "nearby";
  signal: number;
  lastSeen: string;
}

interface DeviceDetails extends ScannedDevice {
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
  simCards: string[];
  androidVersion: string;
}

const mockDevices: ScannedDevice[] = [
  { id: "1", name: "Samsung Galaxy S23", type: "bluetooth", signal: 85, lastSeen: "now" },
  { id: "2", name: "iPhone 15 Pro", type: "wifi", signal: 92, lastSeen: "now" },
  { id: "3", name: "Google Pixel 8", type: "nearby", signal: 78, lastSeen: "now" },
  { id: "4", name: "OnePlus 12", type: "bluetooth", signal: 65, lastSeen: "5s ago" },
  { id: "5", name: "iPad Air", type: "wifi", signal: 88, lastSeen: "3s ago" },
];

const generateDeviceDetails = (device: ScannedDevice): DeviceDetails => {
  const detailsMap: { [key: string]: DeviceDetails } = {
    "1": {
      ...device,
      model: "SM-S918B",
      serial: "R5CX40A2B8H",
      os: "Android",
      osVersion: "14.0",
      androidVersion: "14.0",
      cpu: "Snapdragon 8 Gen 3 Leading Version",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      battery: "4000 mAh with 25W charging",
      network: "5G / LTE / WiFi 6E",
      manufacturer: "Samsung Electronics",
      simCards: ["Vodafone (Active)", "Jio (Inactive)"],
    },
    "2": {
      ...device,
      model: "A2943",
      serial: "FDHFX2QYJQ23",
      os: "iOS",
      osVersion: "18.2",
      androidVersion: "18.2 (iOS equivalent)",
      cpu: "Apple A19 Pro",
      ram: "8 GB",
      storage: "256 GB NVMe",
      battery: "3582 mAh with MagSafe",
      network: "5G / LTE / WiFi 7",
      manufacturer: "Apple Inc.",
      simCards: ["AT&T (Active)"],
    },
    "3": {
      ...device,
      model: "Husky",
      serial: "PXL8C130000001",
      os: "Android",
      osVersion: "15.0",
      androidVersion: "15.0",
      cpu: "Tensor G5",
      ram: "16 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      battery: "5500 mAh with 45W charging",
      network: "5G / LTE / WiFi 7",
      manufacturer: "Google",
      simCards: ["Google Fi (Active)"],
    },
    "4": {
      ...device,
      model: "CPH2577",
      serial: "2310110HXAC92U",
      os: "Android",
      osVersion: "14.0",
      androidVersion: "14.0",
      cpu: "Snapdragon 8 Gen 3 Leading Version",
      ram: "16 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      battery: "5400 mAh with 100W charging",
      network: "5G / LTE / WiFi 6E",
      manufacturer: "OnePlus",
      simCards: ["Airtel (Active)", "Idea (Inactive)"],
    },
    "5": {
      ...device,
      model: "A2934",
      serial: "FDGM8DCXJQ21",
      os: "iPadOS",
      osVersion: "18.2",
      androidVersion: "18.2 (iPadOS equivalent)",
      cpu: "Apple M2",
      ram: "8 GB",
      storage: "256 GB NVMe",
      battery: "8686 mAh",
      network: "WiFi 6E / Cellular optional",
      manufacturer: "Apple Inc.",
      simCards: ["None (WiFi Only)"],
    },
  };

  return detailsMap[device.id] || {
    ...device,
    model: "Unknown",
    serial: "N/A",
    os: "Unknown",
    osVersion: "Unknown",
    androidVersion: "Unknown",
    cpu: "Unknown",
    ram: "Unknown",
    storage: "Unknown",
    battery: "Unknown",
    network: "Unknown",
    manufacturer: "Unknown",
    simCards: [],
  };
};

export default function DeviceInfoPage() {
  const [scannedDevices, setScannedDevices] = useState<ScannedDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceDetails | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScannedDevices([]);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 100);

    setTimeout(() => {
      setScannedDevices(mockDevices);
      setIsScanning(false);
      clearInterval(interval);
    }, 2000);
  };

  const handleDeviceClick = (device: ScannedDevice) => {
    const details = generateDeviceDetails(device);
    setSelectedDevice(details);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setTimeout(() => setSelectedDevice(null), 300);
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

        <h1 className="text-3xl font-bold text-white">Device Scanner</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time Device Detection &amp; Information</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Scan for nearby devices using Bluetooth, WiFi, and nearby device detection. Click on any device to view detailed specifications.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-2xl"
      >
        <motion.button
          onClick={handleScan}
          disabled={isScanning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 disabled:opacity-60"
        >
          {isScanning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Radio size={20} />
            </motion.div>
          ) : (
            <>
              <Search size={20} />
              Scan Now
            </>
          )}
        </motion.button>

        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-emerald-400/60">Scanning {scanProgress}%</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-950">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {scannedDevices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
            <Wifi size={14} />
            Nearby Devices ({scannedDevices.length})
          </h2>

          <div className="space-y-3">
            {scannedDevices.map((device, index) => (
              <motion.button
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDeviceClick(device)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-950/50 hover:shadow-lg hover:shadow-emerald-500/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                    {device.type === "bluetooth" && <Bluetooth size={20} className="text-emerald-400" />}
                    {device.type === "wifi" && <Wifi size={20} className="text-emerald-400" />}
                    {device.type === "nearby" && <Smartphone size={20} className="text-emerald-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{device.name}</p>
                    <p className="text-xs text-emerald-500/60">{device.type.toUpperCase()} • Last seen: {device.lastSeen}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">{device.signal}%</p>
                    <p className="text-xs text-emerald-500/60">Signal</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showDetailsModal && selectedDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/90 to-black/90 p-6 backdrop-blur-xl"
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-lg bg-emerald-500/10 p-2 transition-colors hover:bg-emerald-500/20"
              >
                <X size={20} className="text-emerald-400" />
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Smartphone size={32} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{selectedDevice.name}</p>
                  <p className="text-xs text-emerald-500/60">{selectedDevice.manufacturer}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400/60">Device Information</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Model</span>
                      <span className="font-mono text-sm text-emerald-300">{selectedDevice.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Serial Number</span>
                      <span className="font-mono text-sm text-emerald-300">{selectedDevice.serial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Manufacturer</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.manufacturer}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400/60">Operating System</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">OS</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">OS Version</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.osVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Android Version</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.androidVersion}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400/60">Hardware Specifications</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">CPU</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">RAM</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Storage</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Battery</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.battery}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400/60">Connectivity</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Network</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-500/60">Signal Strength</span>
                      <span className="text-sm text-emerald-300">{selectedDevice.signal}%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400/60">SIM Cards</p>
                  <div className="space-y-2">
                    {selectedDevice.simCards.length > 0 ? (
                      selectedDevice.simCards.map((sim, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-emerald-300">{sim}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-emerald-500/60">No SIM cards detected</span>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
