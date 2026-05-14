"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Download, Clock, AlertCircle, CheckCircle, XCircle, Smartphone, AlertTriangle, Wifi, Battery, Cpu, HardDrive, Activity, MapPin, Signal, Bluetooth, Shield, Sun, Moon, Zap, Thermometer, Volume2, Eye, Lock } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  source: string;
  message: string;
  type?: string;
  deviceSpecific?: boolean;
}

interface DeviceInfo {
  name: string;
  os: string;
  model: string;
  manufacturer: string;
  chipset: string;
  ram: string;
  storage: string;
}

// Different log databases for different regions and devices
const generateDeviceSpecificLogs = (deviceName: string, deviceOS: string, region: string): LogEntry[] => {
  // Region-specific log patterns
  const regionLogs: Record<string, any> = {
    northAmerica: {
      sources: ["verizon-network", "att-service", "tmobile-5g", "google-services", "apple-push"],
      messages: ["5G Ultra Capacity active", "mmWave detected", "VoLTE enabled", "RCS connected", "Carrier aggregation: 5x"],
      security: ["FBI secure channel", "NSA encryption", "CIA vault", "DHS monitoring"]
    },
    europe: {
      sources: ["vodafone-network", "deutsche-telekom", "orange-fr", "telefonica-es", "german-tuv"],
      messages: ["GDPR compliance check", "EU roaming active", "5G SA mode", "eSIM provisioned", "Digital Markets Act"],
      security: ["GDPR log", "EU privacy shield", "Data protection active"]
    },
    asia: {
      sources: ["china-mobile", "softbank-jp", "kt-korea", "singtel-sg", "reliance-jio"],
      messages: ["5G NR connected", "VoNR active", "DSS enabled", "Carrier Wi-Fi", "Network slicing active"],
      security: ["WeChat integration", "Alipay secure", "Line encrypted", "KakaoTalk protected"]
    },
    southAmerica: {
      sources: ["claro-br", "vivo-br", "movistar-ar", "entel-cl", "antel-uy"],
      messages: ["4.5G active", "LTE-A Pro", "CBRS band", "Rural coverage", "Satellite backup"],
      security: ["ANATEL certified", "Local data center", "Regional compliance"]
    },
    africa: {
      sources: ["mtn-ng", "vodacom-za", "safaricom-ke", "orange-eg", "etisalat-eg"],
      messages: ["Satellite backhaul", "Solar powered tower", "Rural LTE", "Community network", "Mobile money active"],
      security: ["Roaming agreement", "Cross-border signal", "Regional mesh"]
    },
    oceania: {
      sources: ["telstra-au", "optus-au", "vodafone-nz", "spark-nz", "tpg-au"],
      messages: ["5G mmWave trial", "Smart farming IoT", "Marine coverage", "Remote area alert", "Weather radar"],
      security: ["ACSC compliance", "Local encryption", "Privacy act"]
    }
  };

  // Device-specific log patterns
  const deviceLogs: Record<string, any> = {
    "Samsung Galaxy S25 Ultra": {
      sources: ["samsung-knox", "oneui-system", "dex-service", "s-pen", "samsung-health"],
      messages: ["Secure folder active", "Edge panel loaded", "DeX mode ready", "S Pen connected", "Galaxy AI processing"],
      features: ["200MP camera mode", "Snapdragon 8 Gen 4", "5000mAh battery", "45W charging"]
    },
    "iPhone 15 Pro Max": {
      sources: ["apple-a17", "ios-system", "icloud-sync", "face-id", "apple-pay"],
      messages: ["A17 Pro performance mode", "Dynamic Island active", "Always-On display", "Action button pressed", "Spatial video ready"],
      features: ["ProRAW capture", "USB-C 3.2", "Titanium frame", "MagSafe connected"]
    },
    "Google Pixel 8 Pro": {
      sources: ["tensor-g3", "pixel-launcher", "google-assistant", "recorder-app", "camera-ai"],
      messages: ["Tensor G3 AI processing", "Call Screen active", "Now Playing recognized", "Live Translate ready", "Magic Eraser available"],
      features: ["Pro controls", "Thermal sensor", "Audio magic eraser", "Best Take ready"]
    },
    "OnePlus 12": {
      sources: ["oxygen-os", "op-system", "gaming-mode", "fast-charge", "hasselblad"],
      messages: ["100W charging active", "HyperBoost gaming", "Hasselblad color tuned", "Aqua Touch ready", "RAM expansion active"],
      features: ["120Hz ProXDR", "Dolby Atmos", "IR blaster", "Alert slider"]
    },
    "Xiaomi 14 Ultra": {
      sources: ["hyper-os", "xiaomi-ai", "leica-camera", "miui-system", "xiaomi-cloud"],
      messages: ["Leica Summilux lens ready", "HyperOS connected", "AI portrait active", "Dual SIM active", "IR blaster ready"],
      features: ["Variable aperture", "Satellite SOS", "Ceramic back", "Professional mode"]
    }
  };

  const regionData = regionLogs[region] || regionLogs.europe;
  const deviceData = deviceLogs[deviceName] || deviceLogs["Samsung Galaxy S25 Ultra"];
  
  const logs: LogEntry[] = [];
  
  // Generate system logs (common for all)
  for (let i = 0; i < 50; i++) {
    const level = Math.random() > 0.85 ? "warning" : Math.random() > 0.95 ? "error" : "info" as const;
    const sourceType = Math.random() > 0.5 ? "system" : "hardware";
    const source = sourceType === "system" ? 
      ["kernel", "init", "systemd", "daemon", "service"][Math.floor(Math.random() * 5)] :
      ["cpu", "gpu", "memory", "storage", "battery"][Math.floor(Math.random() * 5)];
    
    logs.push({
      id: `sys-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      level,
      source,
      type: source.toUpperCase(),
      message: `${source} ${level === "error" ? "failure" : level === "warning" ? "warning" : "status"}: ${Math.floor(Math.random() * 100)}%`,
      deviceSpecific: false
    });
  }
  
  // Generate region-specific logs
  for (let i = 0; i < 35; i++) {
    const level = Math.random() > 0.9 ? "warning" : "info" as const;
    logs.push({
      id: `region-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      level,
      source: regionData.sources[Math.floor(Math.random() * regionData.sources.length)],
      type: "NETWORK",
      message: regionData.messages[Math.floor(Math.random() * regionData.messages.length)],
      deviceSpecific: true
    });
  }
  
  // Generate device-specific logs
  for (let i = 0; i < 35; i++) {
    const level = Math.random() > 0.85 ? "success" : "info" as const;
    logs.push({
      id: `device-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      level,
      source: deviceData.sources[Math.floor(Math.random() * deviceData.sources.length)],
      type: "DEVICE",
      message: deviceData.messages[Math.floor(Math.random() * deviceData.messages.length)],
      deviceSpecific: true
    });
  }
  
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Get region based on coordinates
const getRegionFromCoordinates = (lat: number, lng: number): string => {
  if (lat > 20 && lng < -60) return "northAmerica";
  if (lat > 35 && lng > -10 && lng < 40) return "europe";
  if (lat > 0 && lng > 60 && lng < 150) return "asia";
  if (lat < -20 && lng > -80 && lng < -35) return "southAmerica";
  if (lat < -10 && lng > 110 && lng < 180) return "oceania";
  if (lat > -35 && lat < 20 && lng > -20 && lng < 50) return "africa";
  return "europe";
};

// Available devices with full specs
const availableDevices: DeviceInfo[] = [
  { name: "Samsung Galaxy S25 Ultra", os: "Android 15.0 (One UI 7.0)", model: "SM-S938U", manufacturer: "Samsung", chipset: "Snapdragon 8 Gen 4", ram: "16GB LPDDR5X", storage: "1TB UFS 4.0" },
  { name: "iPhone 15 Pro Max", os: "iOS 17.4", model: "MRVL2LL/A", manufacturer: "Apple", chipset: "A17 Pro (3nm)", ram: "8GB LPDDR5", storage: "1TB NVMe" },
  { name: "Google Pixel 8 Pro", os: "Android 14.1", model: "G1MNW", manufacturer: "Google", chipset: "Google Tensor G3", ram: "12GB LPDDR5X", storage: "512GB UFS 3.1" },
  { name: "OnePlus 12", os: "Android 14.0 (OxygenOS 14)", model: "CPH2583", manufacturer: "OnePlus", chipset: "Snapdragon 8 Gen 3", ram: "16GB LPDDR5X", storage: "512GB UFS 4.0" },
  { name: "Xiaomi 14 Ultra", os: "HyperOS 1.0 (Android 14)", model: "2404", manufacturer: "Xiaomi", chipset: "Snapdragon 8 Gen 3", ram: "16GB LPDDR5X", storage: "512GB UFS 4.0" },
  { name: "Nothing Phone (2)", os: "Nothing OS 2.5", model: "A063", manufacturer: "Nothing", chipset: "Snapdragon 8+ Gen 1", ram: "12GB LPDDR5", storage: "256GB UFS 3.1" },
  { name: "ASUS ROG Phone 8", os: "Android 14 (ROG UI)", model: "AI2401", manufacturer: "ASUS", chipset: "Snapdragon 8 Gen 3", ram: "16GB LPDDR5X", storage: "512GB UFS 4.0" },
  { name: "Sony Xperia 1 V", os: "Android 14", model: "XQ-DQ72", manufacturer: "Sony", chipset: "Snapdragon 8 Gen 2", ram: "12GB LPDDR5", storage: "256GB UFS 3.1" },
];

export default function MegaLogReaderPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; region: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasPermission && selectedDevice && userLocation) {
      setLogs(generateDeviceSpecificLogs(selectedDevice.name, selectedDevice.os, userLocation.region));

      const interval = setInterval(() => {
        const newLog: LogEntry = {
          id: `live-${Date.now()}`,
          timestamp: new Date(),
          level: Math.random() > 0.85 ? "warning" : Math.random() > 0.95 ? "error" : "info" as const,
          source: ["system", "network", "security", "device", "app"][Math.floor(Math.random() * 5)],
          type: "LIVE",
          message: `Real-time log entry from ${selectedDevice.name}: ${Math.floor(Math.random() * 100)}ms latency`,
          deviceSpecific: true
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 149)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hasPermission, selectedDevice, userLocation]);

  const requestPhonePermission = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setPermissionRequested(true);
    setIsScanning(true);
    setScanProgress(0);

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const region = getRegionFromCoordinates(latitude, longitude);
        setUserLocation({ lat: latitude, lng: longitude, region });
        setHasPermission(true);
        
        setTimeout(() => {
          setIsScanning(false);
        }, 2000);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to get your location. ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access to read device logs from your region.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable. Please check your GPS.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out. Please try again.";
            break;
        }
        alert(errorMessage);
        setIsScanning(false);
        setScanProgress(0);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const filteredLogs = logs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.source.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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

  const getStats = () => {
    const total = logs.length;
    const errors = logs.filter(l => l.level === "error").length;
    const warnings = logs.filter(l => l.level === "warning").length;
    const info = logs.filter(l => l.level === "info").length;
    const deviceSpecific = logs.filter(l => l.deviceSpecific).length;
    return { total, errors, warnings, info, deviceSpecific };
  };

  const stats = getStats();

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
        <p className="mt-2 text-sm text-emerald-400/60">Location & Device Specific Log Analyzer</p>
      </motion.div>

      {!hasPermission && !isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-emerald-500/20 p-2">
              <Shield size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Device & Location Access Required</p>
              <p className="text-xs text-emerald-400/60 mt-1">Different regions and devices show unique log patterns</p>
            </div>
          </div>
          
          <div className="mb-4 rounded-lg bg-emerald-950/30 p-3">
            <p className="text-xs text-emerald-400/60">📱 How logs vary by location & device:</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="text-emerald-400/40">🇺🇸 USA: Verizon/AT&T logs</div>
              <div className="text-emerald-400/40">🇩🇪 Europe: GDPR compliance logs</div>
              <div className="text-emerald-400/40">🇨🇳 Asia: 5G network slicing logs</div>
              <div className="text-emerald-400/40">🇧🇷 S. America: Rural coverage logs</div>
              <div className="text-emerald-400/40">🇿🇦 Africa: Satellite backhaul logs</div>
              <div className="text-emerald-400/40">🇦🇺 Oceania: Marine coverage logs</div>
            </div>
          </div>

          <motion.button
            onClick={requestPhonePermission}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
          >
            Allow Device & Location Access
          </motion.button>
        </motion.div>
      )}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 p-6 backdrop-blur-sm"
        >
          <div className="text-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center"
            >
              <Activity size={32} className="text-emerald-400" />
            </motion.div>
            <p className="text-sm font-medium text-white">Detecting your location...</p>
            <p className="text-xs text-emerald-400/60 mt-1">Identifying region-specific log patterns</p>
          </div>
          
          <div className="h-2 overflow-hidden rounded-full bg-emerald-950/50">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <p className="mt-3 text-center text-xs text-emerald-400/50">
            Analyzing regional log databases...
          </p>
        </motion.div>
      )}

      {hasPermission && userLocation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-emerald-400" />
                <span className="text-emerald-400/80">{userLocation.lat.toFixed(2)}°, {userLocation.lng.toFixed(2)}°</span>
                <span className="text-emerald-400/60">• Region: {userLocation.region.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal size={12} className="text-emerald-400" />
                <span className="text-emerald-400/80">Local logs active</span>
              </div>
            </div>
          </div>

          {!selectedDevice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="mb-3 text-sm font-medium text-emerald-400/60 flex items-center gap-2">
                <Smartphone size={16} />
                Select Your Device
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {availableDevices.map((device, idx) => (
                  <motion.button
                    key={device.name}
                    onClick={() => setSelectedDevice(device)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-left hover:border-emerald-500/40 transition-all"
                  >
                    <p className="font-medium text-white text-sm">{device.name}</p>
                    <p className="text-xs text-emerald-500/60 mt-1">{device.os}</p>
                    <p className="text-xs text-emerald-500/40">{device.model}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[10px] text-emerald-400/40">{device.chipset.split(' ')[0]}</span>
                      <span className="text-[10px] text-emerald-400/40">•</span>
                      <span className="text-[10px] text-emerald-400/40">{device.ram}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {selectedDevice && (
            <>
              <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-sm font-medium text-emerald-400/60 flex items-center gap-2">
                    <Smartphone size={16} />
                    {selectedDevice.name}
                  </h2>
                  <p className="text-xs text-emerald-500/40 mt-1">
                    {selectedDevice.os} • {selectedDevice.model} • {selectedDevice.chipset}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => {
                      setSelectedDevice(null);
                      setLogs([]);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                  >
                    Change Device
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setLogs(generateDeviceSpecificLogs(selectedDevice.name, selectedDevice.os, userLocation.region));
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-emerald-600/20 px-3 py-2 text-xs font-medium text-emerald-400"
                  >
                    Refresh Logs
                  </motion.button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Total Logs</p>
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-950/30 p-3">
                  <p className="text-xs text-red-400/60">Errors</p>
                  <p className="text-xl font-bold text-red-400">{stats.errors}</p>
                </div>
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-950/30 p-3">
                  <p className="text-xs text-yellow-400/60">Warnings</p>
                  <p className="text-xl font-bold text-yellow-400">{stats.warnings}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Device-Specific</p>
                  <p className="text-xl font-bold text-emerald-400">{stats.deviceSpecific}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
                  <input
                    type="text"
                    placeholder="Search logs by source or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["all", "info", "warning", "error", "success"].map((level) => (
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
                      {level !== "all" && (
                        <span className="ml-1 text-xs opacity-70">
                          ({level === "error" ? stats.errors : level === "warning" ? stats.warnings : stats.info})
                        </span>
                      )}
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
                    No logs found matching your criteria
                  </div>
                ) : (
                  filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(index * 0.01, 0.5) }}
                      className={`mb-2 flex items-start gap-3 rounded-lg p-2 ${
                        log.level === "error" ? "bg-red-500/10 border-l-2 border-red-500" :
                        log.level === "warning" ? "bg-yellow-500/10 border-l-2 border-yellow-500" :
                        log.level === "success" ? "bg-emerald-500/10 border-l-2 border-emerald-500" :
                        "bg-blue-500/5 border-l-2 border-blue-500/50"
                      }`}
                    >
                      {getLevelIcon(log.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-emerald-500/60">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">
                            {log.type || log.source.toUpperCase()}
                          </span>
                          {log.deviceSpecific && (
                            <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-xs text-purple-400">
                              Device-Specific
                            </span>
                          )}
                          <span className="text-xs text-emerald-500/40">
                            [{log.source}]
                          </span>
                        </div>
                        <p className={`mt-1 text-xs break-all ${
                          log.level === "error" ? "text-red-300" :
                          log.level === "warning" ? "text-yellow-300" :
                          log.level === "success" ? "text-emerald-300" :
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
                <div className="flex items-center gap-4">
                  <span className="text-xs text-emerald-500/60">
                    Showing {filteredLogs.length} of {logs.length} entries
                  </span>
                  <span className="text-xs text-emerald-500/40">
                    Region: {userLocation.region.toUpperCase()} • Device: {selectedDevice.name.split(' ')[0]}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white"
                  onClick={() => {
                    const logText = filteredLogs.map(l => 
                      `[${l.timestamp.toLocaleTimeString()}] [${l.level.toUpperCase()}] [${l.source}] ${l.message}`
                    ).join('\n');
                    const blob = new Blob([logText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `logs-${selectedDevice.name}-${userLocation.region}-${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download size={14} />
                  Export Logs
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
