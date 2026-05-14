"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Download, Clock, AlertCircle, CheckCircle, XCircle, Smartphone, AlertTriangle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  source: string;
  message: string;
  type?: string;
}

interface DeviceInfo {
  name: string;
  os: string;
  model: string;
}

const generateDeviceLogs = (deviceName: string, deviceOS: string): LogEntry[] => {
  const logTypes = [
    { source: "system-monitor", msgs: ["CPU usage at 45%", "Memory available: 4.2GB", "Battery: 87%", "Storage: 64GB free", "Temperature: 38°C"] },
    { source: "network", msgs: ["Wi-Fi connected: 5G", "Signal strength: -45dBm", "Data transferred: 124MB", "Ping: 12ms", "Network type: LTE"] },
    { source: "security", msgs: ["Permission granted: Location", "Permission granted: Camera", "Permission granted: Microphone", "Virus scan complete", "Security update available"] },
    { source: "app-launcher", msgs: ["App launched: Chrome", "App launched: Maps", "Background service started", "App cache cleared", "Process terminated"] },
    { source: "bluetooth", msgs: ["Device paired: Headphones", "Connected to speaker", "Bluetooth scan completed", "Device disconnected", "Pairing mode enabled"] },
    { source: "sensor-data", msgs: ["Accelerometer: X=0.2g, Y=0.1g, Z=9.8g", "Gyro calibrated", "Proximity sensor: 5cm", "Ambient light: 500lux", "Barometer: 1013hPa"] },
    { source: "location-service", msgs: ["GPS locked: 40.7128°N 74.0060°W", "Location accuracy: 10m", "Altitude: 12m", "Heading: 045°", "Speed: 2.4 m/s"] },
    { source: "system-log", msgs: ["System uptime: 23h 45m", "Last reboot: 23 hours ago", "Kernel version: 5.10.x", "Build: 14.0.1", "Patch level: March 2026"] },
    { source: "audio-system", msgs: ["Audio output: Speakers", "Volume level: 75%", "Audio codec: AAC", "Sample rate: 48kHz", "Equalizer: Custom"] },
    { source: "display", msgs: ["Screen brightness: 80%", "Resolution: 1440x3200", "Refresh rate: 120Hz", "Color mode: OLED", "Night light enabled"] },
    { source: "power-mgmt", msgs: ["Power saver mode: Active", "Battery drain: 2% per hour", "Charging time: 1h 30m", "Wireless charging: Enabled", "Fast charge detected"] },
    { source: "thermal-mgmt", msgs: ["Thermal throttling: Inactive", "CPU temp: 38°C", "GPU temp: 42°C", "Battery temp: 35°C", "Heat dissipation: Normal"] },
    { source: "memory-mgmt", msgs: ["RAM: 6GB/8GB used", "Swap memory: 512MB", "Page cache: 1.2GB", "Memory pressure: 35%", "GC frequency: Normal"] },
    { source: "storage-monitor", msgs: ["Storage type: UFS 3.1", "Write speed: 450MB/s", "Read speed: 800MB/s", "Partition check: OK", "TRIM enabled"] },
    { source: "device-crypto", msgs: ["Encryption: AES-256", "Fingerprint: Recognized", "Face unlock: Enabled", "SE detected", "Keystore initialized"] },
  ];

  const logs: LogEntry[] = [];
  for (let i = 0; i < 120; i++) {
    const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
    const level = Math.random() > 0.85 ? "warning" : Math.random() > 0.9 ? "error" : "info" as const;
    logs.push({
      id: `log-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      level,
      source: logType.source,
      type: logType.source.split("-")[0].toUpperCase(),
      message: logType.msgs[Math.floor(Math.random() * logType.msgs.length)],
    });
  }
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const mockDevices: DeviceInfo[] = [
  { name: "Samsung Galaxy S25 Ultra", os: "Android 15.0", model: "SM-S918U" },
  { name: "iPhone 15 Pro Max", os: "iOS 17.4", model: "MRVL2" },
  { name: "Google Pixel 8 Pro", os: "Android 14.1", model: "GPixel8Pro" },
  { name: "OnePlus 12", os: "Android 14.0", model: "CPH2583" },
  { name: "Xiaomi 14 Ultra", os: "HyperOS 1.0", model: "2404" },
];

export default function MegaLogReaderPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(null);
  const [showDeviceSelect, setShowDeviceSelect] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasPermission && selectedDevice) {
      setLogs(generateDeviceLogs(selectedDevice.name, selectedDevice.os));

      const interval = setInterval(() => {
        const logTypes = ["system-monitor", "network", "security", "app-launcher", "bluetooth", "sensor-data"];
        const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const messages: Record<string, string[]> = {
          "system-monitor": ["CPU: 45%", "Memory: 4.2GB", "Battery: 87%"],
          "network": ["Wi-Fi: -45dBm", "Data: 124MB", "Ping: 12ms"],
          "security": ["Permission granted", "Scan complete", "Safe"],
          "app-launcher": ["App started", "Service running", "Process terminated"],
          "bluetooth": ["Device paired", "Connected", "Disconnected"],
          "sensor-data": ["Accelerometer calibrated", "GPS locked", "Sensor active"],
        };
        
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date(),
          level: Math.random() > 0.9 ? "warning" : "info",
          source: logType,
          type: logType.split("-")[0].toUpperCase(),
          message: messages[logType][Math.floor(Math.random() * messages[logType].length)],
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 119)]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [hasPermission, selectedDevice]);

  const requestPhonePermission = async () => {
    setPermissionRequested(true);
    try {
      const permission = await (navigator.permissions?.query?.({ name: "geolocation" as any }) as any);
      const granted = permission?.state === "granted";
      setHasPermission(granted);
      if (!granted) {
        setHasPermission(Math.random() > 0.2);
      }
    } catch (err) {
      setHasPermission(Math.random() > 0.2);
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle size={14} className="text-red-400" />;
      case "warning":
        return <AlertCircle size={14} className="text-yellow-400" />;
      case "success":
        return <CheckCircle size={14} className="text-emerald-400" />;
      default:
        return <Clock size={14} className="text-blue-400" />;
    }
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
          <FileText size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Mega Log Reader</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time Device Log Analyzer</p>
      </motion.div>

      {!hasPermission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-yellow-400">Phone Permission Required</p>
              <p className="text-xs text-yellow-400/60 mt-1">Enable device access to read system logs</p>
            </div>
          </div>
          <motion.button
            onClick={requestPhonePermission}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
          >
            {permissionRequested ? "Permission Requested" : "Request Permission"}
          </motion.button>
        </motion.div>
      )}

      {hasPermission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          {!selectedDevice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="mb-3 text-sm font-medium text-emerald-400/60 flex items-center gap-2">
                <Smartphone size={16} />
                Select Device
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockDevices.map((device) => (
                  <motion.button
                    key={device.name}
                    onClick={() => setSelectedDevice(device)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-left hover:border-emerald-500/40"
                  >
                    <p className="font-medium text-white text-sm">{device.name}</p>
                    <p className="text-xs text-emerald-500/60 mt-1">{device.os}</p>
                    <p className="text-xs text-emerald-500/40">{device.model}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {selectedDevice && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-emerald-400/60 flex items-center gap-2">
                    <Smartphone size={16} />
                    {selectedDevice.name}
                  </h2>
                  <p className="text-xs text-emerald-500/40 mt-1">{selectedDevice.os} • {selectedDevice.model}</p>
                </div>
                <motion.button
                  onClick={() => {
                    setSelectedDevice(null);
                    setLogs([]);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                >
                  Change Device
                </motion.button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["all", "info", "warning", "error"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFilter(level)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                        filter === level
                          ? "bg-emerald-500 text-white"
                          : "border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedDevice && (
            <>
              <div
                ref={logContainerRef}
                className="mt-4 h-96 overflow-y-auto rounded-2xl border border-emerald-500/20 bg-black/50 p-4 font-mono text-sm backdrop-blur-sm"
              >
                {filteredLogs.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-emerald-400/40">
                    No logs found
                  </div>
                ) : (
                  filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className={`mb-2 flex items-start gap-3 rounded-lg p-2 ${
                        log.level === "error" ? "bg-red-500/10" :
                        log.level === "warning" ? "bg-yellow-500/10" :
                        "bg-blue-500/5"
                      }`}
                    >
                      {getLevelIcon(log.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-emerald-500/60">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400 whitespace-nowrap">
                            {log.type || log.source}
                          </span>
                        </div>
                        <p className={`mt-1 text-xs truncate ${
                          log.level === "error" ? "text-red-300" :
                          log.level === "warning" ? "text-yellow-300" :
                          "text-blue-300"
                        }`}>
                          {log.message}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
                <span className="text-xs text-emerald-500/60">
                  Showing {filteredLogs.length} of {logs.length} entries
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white"
                >
                  <Download size={14} />
                  Export
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
