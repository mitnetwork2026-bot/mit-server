"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radar, MapPin, Navigation, AlertCircle, Wifi, Radio } from "lucide-react";

interface RadarPoint {
  id: string;
  x: number;
  y: number;
  distance: number;
  serial: string;
  type: string;
}

export default function RadarControllerPage() {
  const [radarPoints, setRadarPoints] = useState<RadarPoint[]>([]);
  const [rotation, setRotation] = useState(0);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationPermission(true);
        generateRadarPoints();
      },
      () => setLocationPermission(false)
    );

    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(rotationInterval);
  }, []);

  const generateRadarPoints = () => {
    const points: RadarPoint[] = [];
    const count = Math.floor(Math.random() * 8) + 5;
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 360;
      const distance = Math.random() * 40 + 10;
      points.push({
        id: `radar-${i}`,
        x: 50 + distance * Math.cos((angle * Math.PI) / 180),
        y: 50 + distance * Math.sin((angle * Math.PI) / 180),
        distance: Math.round(distance * 10),
        serial: `RDR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        type: ["Military", "Civil", "Weather", "Navigation"][Math.floor(Math.random() * 4)],
      });
    }
    setRadarPoints(points);
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
          <Radar size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Radar Controller</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Nearby Radar Detection System</p>
      </motion.div>

      {locationPermission === false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 max-w-md rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
        >
          <div className="flex items-center gap-2 text-yellow-400">
            <AlertCircle size={18} />
            <span className="text-sm">Location permission required for radar detection</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 aspect-square max-w-md"
      >
        <div className="relative h-full w-full rounded-full border-2 border-emerald-500/30 bg-emerald-950/30 backdrop-blur-sm">
          {/* Radar circles */}
          <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
          <div className="absolute inset-8 rounded-full border border-emerald-500/20" />
          <div className="absolute inset-12 rounded-full border border-emerald-500/20" />
          <div className="absolute inset-16 rounded-full border border-emerald-500/20" />
          
          {/* Radar sweep */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-1/2 w-1 origin-top -translate-x-1/2 bg-gradient-to-b from-emerald-500 to-transparent"
            style={{ rotate: rotation }}
          />
          
          {/* Radar sweep glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-1/2 w-16 origin-top -translate-x-1/2"
            style={{ 
              rotate: rotation,
              background: "linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 0%, transparent 100%)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
            }}
          />

          {/* Center point */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50" />
          </div>

          {/* Radar points */}
          {radarPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group absolute"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 mb-2 hidden w-32 -translate-x-1/2 rounded-lg border border-emerald-500/30 bg-emerald-950/90 p-2 text-center text-xs backdrop-blur-sm group-hover:block">
                <p className="font-mono text-emerald-400">{point.serial}</p>
                <p className="text-emerald-500/60">{point.type}</p>
                <p className="text-emerald-300">{point.distance}m away</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-6 max-w-md"
      >
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-400">Active Signals</span>
          </div>
          <span className="font-mono text-lg text-white">{radarPoints.length}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-4 max-w-md"
      >
        <h2 className="mb-3 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Radio size={14} />
          Detected Radars
        </h2>
        
        <div className="space-y-2">
          {radarPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <MapPin size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-mono text-xs text-emerald-300">{point.serial}</p>
                  <p className="text-xs text-emerald-500/50">{point.type} Radar</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{point.distance}m</p>
                <div className="flex items-center gap-1 text-xs text-emerald-500/50">
                  <Navigation size={10} />
                  Active
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
