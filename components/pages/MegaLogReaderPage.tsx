"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Download, Clock, AlertCircle, CheckCircle, XCircle, Smartphone, AlertTriangle, Wifi, Battery, Cpu, HardDrive, Thermometer, MapPin } from "lucide-react";

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
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
}

// Generate location-specific logs based on device location
const generateLocationSpecificLogs = (location?: { city: string; country: string; lat: number; lng: number }) => {
  if (!location) return [];
  
  const locationLogs = [
    { source: "location-service", msgs: [
      `Current location: ${location.city}, ${location.country}`,
      `GPS coordinates: ${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E`,
      `Location accuracy: ${Math.floor(Math.random() * 20 + 5)}m`,
      `Altitude: ${Math.floor(Math.random() * 500 + 10)}m above sea level`,
      `Movement speed: ${(Math.random() * 5).toFixed(1)} m/s`
    ]},
    { source: "network", msgs: [
      `Network region: ${location.country}`,
      `Local timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `Signal strength: ${Math.floor(Math.random() * 30 + 50)}dBm`,
      `Connected to local towers in ${location.city}`,
      `Roaming status: ${Math.random() > 0.8 ? "Active" : "Inactive"}`
    ]},
    { source: "weather-sensor", msgs: [
      `Temperature: ${Math.floor(Math.random() * 35 + 5)}°C`,
      `Humidity: ${Math.floor(Math.random() * 60 + 30)}%`,
      `Pressure: ${Math.floor(Math.random() * 50 + 980)}hPa`,
      `UV index: ${Math.floor(Math.random() * 11)}`,
      `Weather condition: ${["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)]}`
    ]}
  ];
  
  return locationLogs;
};

const generateDeviceLogs = (deviceName: string, deviceOS: string, location?: { city: string; country: string; lat: number; lng: number }): LogEntry[] => {
  const logTypes = [
    { source: "system-monitor", msgs: [
      `CPU usage: ${Math.floor(Math.random() * 60 + 20)}%`,
      `Memory available: ${(Math.random() * 8 + 2).toFixed(1)}GB`,
      `Battery: ${Math.floor(Math.random() * 50 + 30)}%`,
      `Storage: ${Math.floor(Math.random() * 100 + 20)}GB free`,
      `Temperature: ${Math.floor(Math.random() * 20 + 30)}°C`
    ]},
    { source: "network", msgs: [
      `Wi-Fi connected: ${Math.random() > 0.5 ? "5GHz" : "2.4GHz"}`,
      `Signal strength: ${Math.floor(Math.random() * 40 + 30)}dBm`,
      `Data transferred: ${(Math.random() * 500).toFixed(0)}MB`,
      `Ping: ${Math.floor(Math.random() * 50 + 10)}ms`,
      `Network type: ${["5G", "LTE", "4G", "WiFi"][Math.floor(Math.random() * 4)]}`
    ]},
    { source: "security", msgs: [
      `Permission granted: Location (${location?.city || "Unknown"})`,
      `Security patch: ${new Date().toLocaleDateString()}`,
      `Encryption status: Active`,
      `Face unlock: ${Math.random() > 0.3 ? "Successful" : "Failed"}`,
      `Fingerprint scan: Recognized`
    ]},
    { source: "app-launcher", msgs: [
      `App launched: ${["Maps", "Weather", "Camera", "Messages", "Settings"][Math.floor(Math.random() * 5)]}`,
      `Background services: ${Math.floor(Math.random() * 8 + 2)} running`,
      `Cache cleared: ${Math.random() > 0.7 ? "Yes" : "No"}`,
      `Process priority: ${["High", "Normal", "Low"][Math.floor(Math.random() * 3)]}`
    ]},
    { source: "bluetooth", msgs: [
      `Device paired: ${["Headphones", "Watch", "Speaker", "Keyboard"][Math.floor(Math.random() * 4)]}`,
      `Bluetooth version: ${["5.3", "5.2", "5.0"][Math.floor(Math.random() * 3)]}`,
      `Connection quality: ${Math.floor(Math.random() * 30 + 70)}%`,
      `Nearby devices: ${Math.floor(Math.random() * 5)} found`
    ]},
    { source: "sensor-data", msgs: [
      `Accelerometer: X=${(Math.random() * 2 - 1).toFixed(2)}g, Y=${(Math.random() * 2 - 1).toFixed(2)}g, Z=${(Math.random() * 2 + 8).toFixed(2)}g`,
      `Gyroscope: ${(Math.random() * 360).toFixed(0)}° rotation`,
      `Proximity: ${Math.random() > 0.5 ? "Near" : "Far"}`,
      `Light sensor: ${Math.floor(Math.random() * 1000)}lux`
    ]}
  ];

  // Add location-specific logs
  const locationLogs = generateLocationSpecificLogs(location);
  const allLogTypes = [...logTypes, ...locationLogs];
  
  const logs: LogEntry[] = [];
  for (let i = 0; i < 120; i++) {
    const logType = allLogTypes[Math.floor(Math.random() * allLogTypes.length)];
    const level = Math.random() > 0.85 ? "warning" : Math.random() > 0.95 ? "error" : "info" as const;
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

// Device list with location context
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
  const [userLocation, setUserLocation] = useState<{ city: string; country: string; lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Function to get location and city name
  const getLocationAndCity = async (): Promise<{ city: string; country: string; lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation not supported");
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding to get city and country
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const data = await response.json();
            
            const city = data.address?.city || data.address?.town || data.address?.village || "Unknown";
            const country = data.address?.country || "Unknown";
            
            resolve({ city, country, lat: latitude, lng: longitude });
          } catch (error) {
            console.error("Reverse geocoding error:", error);
            // Fallback: return coordinates only
            resolve({ city: "Current Location", country: "Unknown", lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMsg = "Unable to get location";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Location permission denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information unavailable";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timeout";
              break;
          }
          setLocationError(errorMsg);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  const requestPhonePermission = async () => {
    setPermissionRequested(true);
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      // First, request location permission
      const locationData = await getLocationAndCity();
      
      if (locationData) {
        setUserLocation(locationData);
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (err) {
      console.error("Permission error:", err);
      setHasPermission(false);
      setLocationError("Failed to get location access");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (hasPermission && selectedDevice && userLocation) {
      const deviceWithLocation = {
        ...selectedDevice,
        location: userLocation
      };
      setLogs(generateDeviceLogs(selectedDevice.name, selectedDevice.os, userLocation));

      const interval = setInterval(() => {
        const locationSpecificMessages = [
          `GPS signal: ${Math.floor(Math.random() * 40 + 60)}% strength at ${userLocation.city}`,
          `Network tower: Connected to ${userLocation.city} cell tower`,
          `Local time: ${new Date().toLocaleTimeString([], { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}`,
          `Weather update: ${["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)]} in ${userLocation.city}`,
          `Location update: ${userLocation.lat.toFixed(4)}°, ${userLocation.lng.toFixed(4)}°`,
          `Roaming: ${userLocation.country !== "Unknown" ? `Service in ${userLocation.country}` : "Local service"}`
        ];
        
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date(),
          level: Math.random() > 0.9 ? "warning" : "info",
          source: "location-tracker",
          type: "LOCATION",
          message: locationSpecificMessages[Math.floor(Math.random() * locationSpecificMessages.length)],
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 119)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hasPermission, selectedDevice, userLocation]);

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

  const getSourceIcon = (source: string) => {
    if (source.includes("location") || source.includes("weather")) return <MapPin size={12} className="text-emerald-400" />;
    if (source.includes("network")) return <Wifi size={12} className="text-emerald-400" />;
    if (source.includes("battery") || source.includes("power")) return <Battery size={12} className="text-emerald-400" />;
    if (source.includes("cpu") || source.includes("system")) return <Cpu size={12} className="text-emerald-400" />;
    return <HardDrive size={12} className="text-emerald-400" />;
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
              <p className="text-sm font-medium text-yellow-400">Location Permission Required</p>
              <p className="text-xs text-yellow-400/60 mt-1">Enable location access to scan and display device logs from your area</p>
            </div>
          </div>
          {locationError && (
            <div className="mt-2 text-xs text-red-400">
              Error: {locationError}
            </div>
          )}
          <motion.button
            onClick={requestPhonePermission}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoadingLocation}
            className="mt-4 w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLocation ? "Getting Location..." : permissionRequested ? "Allow Location Access" : "Request Permission"}
          </motion.button>
        </motion.div>
      )}

      {hasPermission && userLocation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          {/* Location Info Banner */}
          <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400/60 mb-2">
              <MapPin size={14} />
              <span>Current Location Detected</span>
            </div>
            <p className="text-sm text-white font-medium">{userLocation.city}, {userLocation.country}</p>
            <p className="text-xs text-emerald-500/40 mt-1">
              Coordinates: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
            </p>
          </div>

          {!selectedDevice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="mb-3 text-sm font-medium text-emerald-400/60 flex items-center gap-2">
                <Smartphone size={16} />
                Select Device to Scan Logs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockDevices.map((device) => (
                  <motion.button
                    key={device.name}
                    onClick={() => setSelectedDevice(device)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-left hover:border-emerald-500/40 transition-all"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all"
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
                      transition={{ delay: Math.min(index * 0.01, 0.5) }}
                      className={`mb-2 flex items-start gap-3 rounded-lg p-2 ${
                        log.level === "error" ? "bg-red-500/10 border-l-2 border-red-500" :
                        log.level === "warning" ? "bg-yellow-500/10 border-l-2 border-yellow-500" :
                        "bg-emerald-500/5 border-l-2 border-emerald-500"
                      }`}
                    >
                      {getLevelIcon(log.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-emerald-500/60">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400 whitespace-nowrap flex items-center gap-1">
                            {getSourceIcon(log.source)}
                            {log.type || log.source}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm truncate ${
                          log.level === "error" ? "text-red-300" :
                          log.level === "warning" ? "text-yellow-300" :
                          "text-emerald-300"
                        }`}>
                          {log.message}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-500/60">
                    Showing {filteredLogs.length} of {logs.length} entries
                  </span>
                  {userLocation && (
                    <span className="text-xs text-emerald-500/40 flex items-center gap-1">
                      <MapPin size={10} />
                      {userLocation.city}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700 transition-all"
                  onClick={() => {
                    const logText = logs.map(log => 
                      `[${log.timestamp.toLocaleString()}] [${log.level.toUpperCase()}] [${log.source}] ${log.message}`
                    ).join('\n');
                    const blob = new Blob([logText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `device-logs-${selectedDevice?.name}-${userLocation.city}.txt`;
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
