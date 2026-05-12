"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Satellite, Globe, Signal, Orbit, Zap, Radio } from "lucide-react";
import AccessKeyPopup from "@/components/AccessKeyPopup";

const satellites = [
  { id: "starlink-1", name: "Starlink-1542", company: "SpaceX", orbit: "LEO", status: "active" },
  { id: "starlink-2", name: "Starlink-2891", company: "SpaceX", orbit: "LEO", status: "active" },
  { id: "gps-iii", name: "GPS III SV05", company: "US Space Force", orbit: "MEO", status: "active" },
  { id: "oneweb-1", name: "OneWeb-0145", company: "OneWeb", orbit: "LEO", status: "active" },
  { id: "iss", name: "ISS (ZARYA)", company: "NASA/Roscosmos", orbit: "LEO", status: "active" },
  { id: "hubble", name: "Hubble Space", company: "NASA", orbit: "LEO", status: "active" },
  { id: "goes-18", name: "GOES-18", company: "NOAA", orbit: "GEO", status: "active" },
  { id: "intelsat", name: "Intelsat 39", company: "Intelsat", orbit: "GEO", status: "active" },
];

export default function SatelliteDataPage() {
  const [selectedSatellite, setSelectedSatellite] = useState<string | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setOrbitRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  });

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Monitor satellites in real-time from various orbital positions. 
          Access requires authentication for detailed telemetry data.
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-emerald-500/50">
          <span className="flex items-center gap-1">
            <Orbit size={12} />
            LEO: 5
          </span>
          <span className="flex items-center gap-1">
            <Globe size={12} />
            MEO: 1
          </span>
          <span className="flex items-center gap-1">
            <Signal size={12} />
            GEO: 2
          </span>
        </div>
      </motion.div>

      {/* Orbit visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
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
        {satellites.slice(0, 5).map((sat, i) => {
          const angle = ((i * 72) + orbitRotation) * (Math.PI / 180);
          const radius = 35 + (i % 3) * 10;
          return (
            <motion.div
              key={sat.id}
              className="absolute h-2 w-2 cursor-pointer rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
              style={{
                left: `${50 + radius * Math.cos(angle)}%`,
                top: `${50 + radius * Math.sin(angle)}%`,
              }}
              onClick={() => setSelectedSatellite(sat.id)}
              whileHover={{ scale: 2 }}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Radio size={14} />
          Active Satellites
        </h2>

        <div className="space-y-3">
          {satellites.map((satellite, index) => (
            <motion.button
              key={satellite.id}
              onClick={() => setSelectedSatellite(satellite.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
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
                    <p className="font-medium text-white">{satellite.name}</p>
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

      <AccessKeyPopup
        isOpen={selectedSatellite !== null}
        onClose={() => setSelectedSatellite(null)}
        serverName={satellites.find((s) => s.id === selectedSatellite)?.name || ""}
        serverIcon={<Satellite size={40} className="text-emerald-400" />}
      />
    </div>
  );
}
