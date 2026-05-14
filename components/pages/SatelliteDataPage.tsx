"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Satellite, Globe, Signal, Orbit, Zap, Radio, X, Lock, AlertTriangle, Wifi, MapPin } from "lucide-react";

// Mock satellite data with simulated distance and signal strength
const allSatellites = [
  // SpaceX Starlink
  { id: "starlink-1", name: "Starlink-1542", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "12°E", signalStrength: 85, distance: 547, lastSeen: "Just now" },
  { id: "starlink-2", name: "Starlink-2891", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "45°E", signalStrength: 72, distance: 623, lastSeen: "2 min ago" },
  { id: "starlink-3", name: "Starlink-3125", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "-30°E", signalStrength: 91, distance: 489, lastSeen: "Just now" },
  { id: "starlink-4", name: "Starlink-4456", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "78°E", signalStrength: 68, distance: 701, lastSeen: "5 min ago" },
  { id: "starlink-5", name: "Starlink-5678", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "-120°E", signalStrength: 77, distance: 582, lastSeen: "3 min ago" },
  
  // GPS Constellation
  { id: "gps-iii", name: "GPS III SV05", company: "US Space Force", orbit: "MEO", status: "active", altitude: "20200km", inclination: "55°", longitude: "0°", signalStrength: 94, distance: 20150, lastSeen: "Just now" },
  { id: "gps-iif", name: "GPS II F-15", company: "US Space Force", orbit: "MEO", status: "active", altitude: "20200km", inclination: "55°", longitude: "90°", signalStrength: 88, distance: 20230, lastSeen: "1 min ago" },
  
  // OneWeb
  { id: "oneweb-1", name: "OneWeb-0145", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "15°E", signalStrength: 65, distance: 1180, lastSeen: "4 min ago" },
  { id: "oneweb-2", name: "OneWeb-0246", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "90°W", signalStrength: 70, distance: 1150, lastSeen: "3 min ago" },
  
  // NASA / ISS
  { id: "iss", name: "ISS (ZARYA)", company: "NASA/Roscosmos", orbit: "LEO", status: "active", altitude: "408km", inclination: "51.6°", longitude: "35°E", signalStrength: 96, distance: 405, lastSeen: "Just now" },
  { id: "hubble", name: "Hubble Space Telescope", company: "NASA", orbit: "LEO", status: "active", altitude: "569km", inclination: "28.47°", longitude: "-45°E", signalStrength: 82, distance: 571, lastSeen: "2 min ago" },
  
  // Weather Satellites
  { id: "goes-18", name: "GOES-18", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "-137°W", signalStrength: 59, distance: 35790, lastSeen: "8 min ago" },
  { id: "goes-17", name: "GOES-17", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "-137.2°W", signalStrength: 61, distance: 35788, lastSeen: "7 min ago" },
  
  // Communication Satellites
  { id: "intelsat", name: "Intelsat 39", company: "Intelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "62°E", signalStrength: 64, distance: 35785, lastSeen: "6 min ago" },
  { id: "intelsat-38", name: "Intelsat 38", company: "Intelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "28.5°W", signalStrength: 67, distance: 35783, lastSeen: "5 min ago" },
  
  // Additional operators
  { id: "eutelsat-1", name: "EUTELSAT-114°W", company: "Eutelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "114°W", signalStrength: 62, distance: 35792, lastSeen: "9 min ago" },
  { id: "chinasat-1", name: "CHINASAT-11", company: "China Satcom", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "98°E", signalStrength: 58, distance: 35795, lastSeen: "10 min ago" },
];

interface SatelliteDetails {
  id: string;
  name: string;
  company: string;
  orbit: string;
  status: string;
  altitude: string;
  inclination: string;
  longitude: string;
  signalStrength?: number;
  distance?: number;
  lastSeen?: string;
}

export default function SatelliteDataPage() {
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteDetails | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbySatellites, setNearbySatellites] = useState<SatelliteDetails[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const requestPhonePermission = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
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
        setUserLocation({ lat: latitude, lng: longitude });
        setHasPermission(true);
        
        // Simulate satellite scanning based on location
        setTimeout(() => {
          // Sort satellites by signal strength and filter based on "location"
          const scanned = allSatellites
            .map(sat => ({
              ...sat,
              signalStrength: Math.floor(Math.random() * 40) + 60, // Random signal between 60-100
              distance: sat.orbit === 'LEO' ? Math.floor(Math.random() * 900) + 400 : 
                       sat.orbit === 'MEO' ? Math.floor(Math.random() * 1000) + 20000 :
                       Math.floor(Math.random() * 1000) + 35700,
              lastSeen: ['Just now', '1 min ago', '2 min ago', '3 min ago'][Math.floor(Math.random() * 4)]
            }))
            .sort((a, b) => (b.signalStrength || 0) - (a.signalStrength || 0));
          
          setNearbySatellites(scanned);
          setIsScanning(false);
        }, 2000);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to get your location. ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access to scan for satellites.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
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

  const getOrbitCount = () => {
    const counts = { LEO: 0, MEO: 0, GEO: 0 };
    nearbySatellites.forEach(sat => {
      if (sat.orbit === 'LEO') counts.LEO++;
      else if (sat.orbit === 'MEO') counts.MEO++;
      else if (sat.orbit === 'GEO') counts.GEO++;
    });
    return counts;
  };

  const orbitCounts = getOrbitCount();

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
          <Satellite size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Satellite Data</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time Orbital Tracking System</p>
      </motion.div>

      {!hasPermission && !isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-emerald-500/20 p-2">
              <MapPin size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Location Access Required</p>
              <p className="text-xs text-emerald-400/60 mt-1">Enable location to scan and track nearby satellites</p>
            </div>
          </div>
          
          <div className="mb-4 rounded-lg bg-emerald-950/30 p-3">
            <p className="text-xs text-emerald-400/60">📍 Why need permission?</p>
            <p className="text-xs text-emerald-400/40 mt-1">Satellite tracking requires your location to calculate which satellites are visible in your sky based on their orbital paths and your geographical position.</p>
          </div>

          <motion.button
            onClick={requestPhonePermission}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
          >
            Allow Location Access
          </motion.button>
        </motion.div>
      )}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 p-6 backdrop-blur-sm"
        >
          <div className="text-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center"
            >
              <Wifi size={32} className="text-emerald-400" />
            </motion.div>
            <p className="text-sm font-medium text-white">Scanning for satellites...</p>
            <p className="text-xs text-emerald-400/60 mt-1">Detecting active satellites in your area</p>
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
            Scanning {Math.floor(scanProgress / 10)}/{Math.floor(allSatellites.length / 10)} satellites...
          </p>
        </motion.div>
      )}

      {hasPermission && !isScanning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-emerald-400/80 flex items-center gap-2">
                <MapPin size={14} />
                {userLocation ? `${userLocation.lat.toFixed(2)}°, ${userLocation.lng.toFixed(2)}°` : 'Location acquired'}
              </p>
              <span className="text-xs text-emerald-500/50">Live tracking</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/80">Active Scan</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-500/50">
                <Orbit size={12} />
                LEO: {orbitCounts.LEO}
              </span>
              <span className="flex items-center gap-1 text-emerald-500/50">
                <Globe size={12} />
                MEO: {orbitCounts.MEO}
              </span>
              <span className="flex items-center gap-1 text-emerald-500/50">
                <Signal size={12} />
                GEO: {orbitCounts.GEO}
              </span>
            </div>
          </motion.div>

          {/* Orbit visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative mx-auto mt-8 aspect-square max-w-xs"
          >
            {/* Earth */}
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-green-500 shadow-lg shadow-blue-500/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
            </div>

            {/* Orbits */}
            {[30, 45, 60].map((size, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full border border-emerald-500/20"
                style={{
                  width: `${size * 2}%`,
                  height: `${size * 2}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* Satellites */}
            {nearbySatellites.slice(0, 10).map((sat, i) => {
              const angle = ((i * 36) + orbitRotation) * (Math.PI / 180);
              const radius = 35 + (i % 3) * 10;
              const signalQuality = sat.signalStrength || 70;
              return (
                <motion.div
                  key={sat.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${50 + radius * Math.cos(angle)}%`,
                    top: `${50 + radius * Math.sin(angle)}%`,
                  }}
                  onClick={() => setSelectedSatellite(sat)}
                  whileHover={{ scale: 1.5 }}
                >
                  <div className={`relative h-2 w-2 rounded-full shadow-lg`}
                    style={{
                      backgroundColor: signalQuality > 80 ? '#10b981' : signalQuality > 60 ? '#f59e0b' : '#ef4444',
                      boxShadow: `0 0 10px ${signalQuality > 80 ? '#10b981' : signalQuality > 60 ? '#f59e0b' : '#ef4444'}`
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-8 max-w-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
                <Radio size={14} />
                Nearby Satellites ({nearbySatellites.length})
              </h2>
              <button
                onClick={requestPhonePermission}
                className="text-xs text-emerald-400/60 hover:text-emerald-400 transition-colors"
              >
                Rescan
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {nearbySatellites.map((satellite, index) => (
                <motion.button
                  key={satellite.id}
                  onClick={() => setSelectedSatellite(satellite)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.02 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-left backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-950/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                        <Satellite size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{satellite.name}</p>
                        <p className="text-xs text-emerald-500/60">{satellite.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                        {satellite.orbit}
                      </span>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className={`h-1.5 w-1.5 rounded-full ${
                            (satellite.signalStrength || 70) > 80 ? 'bg-emerald-400' : 
                            (satellite.signalStrength || 70) > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-emerald-400/70">{satellite.signalStrength}%</span>
                        </div>
                        <span className="text-emerald-500/50 text-xs">{satellite.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                  
                  {(satellite.distance && satellite.distance < 1000) && (
                    <div className="mt-2 text-xs text-emerald-400/50">
                      📡 Distance: {satellite.distance}km
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Satellite Details Modal */}
      <AnimatePresence>
        {selectedSatellite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSatellite(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 via-black/95 to-emerald-900/90 p-6 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl"
            >
              <button
                onClick={() => setSelectedSatellite(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/50"
                >
                  <Satellite size={40} className="text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{selectedSatellite.name}</h3>
                <p className="mt-2 text-sm text-emerald-400/60">{selectedSatellite.company}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Orbital Type</p>
                  <p className="text-sm font-medium text-white">{selectedSatellite.orbit}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Altitude</p>
                    <p className="text-sm font-medium text-white">{selectedSatellite.altitude}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Inclination</p>
                    <p className="text-sm font-medium text-white">{selectedSatellite.inclination}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Longitude</p>
                  <p className="text-sm font-medium text-white">{selectedSatellite.longitude}</p>
                </div>
                {selectedSatellite.signalStrength && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Signal Strength</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-emerald-950/50 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedSatellite.signalStrength > 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                            selectedSatellite.signalStrength > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                          style={{ width: `${selectedSatellite.signalStrength}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{selectedSatellite.signalStrength}%</span>
                    </div>
                  </div>
                )}
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-medium text-emerald-400">{selectedSatellite.status}</p>
                  </div>
                </div>
                {selectedSatellite.lastSeen && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Last Signal</p>
                    <p className="text-sm font-medium text-white">{selectedSatellite.lastSeen}</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSatellite(null)}
                className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 font-medium text-white"
              >
                Close Details
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
