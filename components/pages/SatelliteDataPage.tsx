"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Satellite, Globe, Signal, Orbit, Zap, Radio, X, Lock, AlertTriangle } from "lucide-react";

const satellites = [
  // SpaceX Starlink
  { id: "starlink-1", name: "Starlink-1542", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "12°E" },
  { id: "starlink-2", name: "Starlink-2891", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "45°E" },
  { id: "starlink-3", name: "Starlink-3125", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "-30°E" },
  { id: "starlink-4", name: "Starlink-4456", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "78°E" },
  { id: "starlink-5", name: "Starlink-5678", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "-120°E" },
  
  // GPS Constellation
  { id: "gps-iii", name: "GPS III SV05", company: "US Space Force", orbit: "MEO", status: "active", altitude: "20200km", inclination: "55°", longitude: "0°" },
  { id: "gps-iif", name: "GPS II F-15", company: "US Space Force", orbit: "MEO", status: "active", altitude: "20200km", inclination: "55°", longitude: "90°" },
  
  // OneWeb
  { id: "oneweb-1", name: "OneWeb-0145", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "15°E" },
  { id: "oneweb-2", name: "OneWeb-0246", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "90°W" },
  
  // NASA / ISS
  { id: "iss", name: "ISS (ZARYA)", company: "NASA/Roscosmos", orbit: "LEO", status: "active", altitude: "408km", inclination: "51.6°", longitude: "35°E" },
  { id: "hubble", name: "Hubble Space Telescope", company: "NASA", orbit: "LEO", status: "active", altitude: "569km", inclination: "28.47°", longitude: "-45°E" },
  
  // Weather Satellites
  { id: "goes-18", name: "GOES-18", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "-137°W" },
  { id: "goes-17", name: "GOES-17", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "-137.2°W" },
  
  // Communication Satellites
  { id: "intelsat", name: "Intelsat 39", company: "Intelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "62°E" },
  { id: "intelsat-38", name: "Intelsat 38", company: "Intelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "28.5°W" },
  
  // Additional operators
  { id: "eutelsat-1", name: "EUTELSAT-114°W", company: "Eutelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "114°W" },
  { id: "chinasat-1", name: "CHINASAT-11", company: "China Satcom", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "98°E" },
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
}

export default function SatelliteDataPage() {
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteDetails | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const requestPhonePermission = async () => {
    setPermissionRequested(true);
    try {
      const permission = await (navigator.permissions?.query?.({ name: "geolocation" as any }) as any);
      setHasPermission(permission?.state === "granted");
    } catch (err) {
      setHasPermission(Math.random() > 0.3);
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
          <Satellite size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Satellite Data</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time Orbital Tracking System</p>
      </motion.div>

      {!hasPermission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-md rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-yellow-400">Phone Permission Required</p>
              <p className="text-xs text-yellow-400/60 mt-1">Enable location access to scan nearby satellites</p>
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
          className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
        >
          <p className="text-sm text-emerald-400/80">
            Scanning for satellites in your location...
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-emerald-500/50">
            <span className="flex items-center gap-1">
              <Orbit size={12} />
              LEO: 11
            </span>
            <span className="flex items-center gap-1">
              <Globe size={12} />
              MEO: 2
            </span>
            <span className="flex items-center gap-1">
              <Signal size={12} />
              GEO: 5
            </span>
          </div>
        </motion.div>
      )}

      {hasPermission && (
        <>
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
            {satellites.slice(0, 10).map((sat, i) => {
              const angle = ((i * 36) + orbitRotation) * (Math.PI / 180);
              const radius = 35 + (i % 3) * 10;
              return (
                <motion.div
                  key={sat.id}
                  className="absolute h-2 w-2 cursor-pointer rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  style={{
                    left: `${50 + radius * Math.cos(angle)}%`,
                    top: `${50 + radius * Math.sin(angle)}%`,
                  }}
                  onClick={() => setSelectedSatellite(sat as SatelliteDetails)}
                  whileHover={{ scale: 2 }}
                />
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-8 max-w-md"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
              <Radio size={14} />
              Active Satellites ({satellites.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {satellites.map((satellite, index) => (
                <motion.button
                  key={satellite.id}
                  onClick={() => setSelectedSatellite(satellite as SatelliteDetails)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.02 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-left backdrop-blur-sm transition-all hover:border-emerald-500/40"
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
                      <div className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-500/50">
                        <Zap size={10} className="text-emerald-400" />
                        Active
                      </div>
                    </div>
                  </div>
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
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="text-sm font-medium text-emerald-400">{selectedSatellite.status}</p>
                  </div>
                </div>
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
