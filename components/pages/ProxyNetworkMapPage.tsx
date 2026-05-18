"use client";

import { motion } from "framer-motion";
import { Globe, Network, Wifi, Map, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyNetworkMapPage() {
  const [mapMode, setMapMode] = useState<"dark" | "satellite">("dark");
  const [isZoomed, setIsZoomed] = useState(false);

  const nodes = [
    { id: 1, name: "Moscow Hub", lat: 55.75, lng: 37.62, quality: 98, status: "Active" },
    { id: 2, name: "St. Petersburg", lat: 59.93, lng: 30.36, quality: 95, status: "Active" },
    { id: 3, name: "Novosibirsk", lat: 55.03, lng: 82.92, quality: 92, status: "Active" },
    { id: 4, name: "Yekaterinburg", lat: 56.84, lng: 60.61, quality: 87, status: "Active" },
    { id: 5, name: "Vladivostok", lat: 43.12, lng: 131.88, quality: 84, status: "Standby" },
  ];

  const getQualityColor = (quality: number) => {
    if (quality >= 95) return "bg-green-500";
    if (quality >= 90) return "bg-yellow-500";
    if (quality >= 80) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-32 pt-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
          >
            <Map size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Network Map</h1>
          <p className="mt-2 text-sm text-blue-400/60">Google Maps Style - Dark/Satellite Modes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Map Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-3 sm:p-4 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setMapMode("dark")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mapMode === "dark"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600/30 text-blue-400 hover:bg-blue-600/50"
                  }`}
                >
                  Dark Mode
                </motion.button>
                <motion.button
                  onClick={() => setMapMode("satellite")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mapMode === "satellite"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600/30 text-blue-400 hover:bg-blue-600/50"
                  }`}
                >
                  Satellite
                </motion.button>
              </div>
              <motion.button
                onClick={() => setIsZoomed(!isZoomed)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 text-sm font-semibold transition-all"
              >
                {isZoomed ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {isZoomed ? "Zoom Out" : "Zoom In"}
              </motion.button>
            </div>
          </motion.div>

          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`relative rounded-xl border border-blue-400/20 overflow-hidden backdrop-blur-xl transition-all ${
              isZoomed ? "h-96" : "h-64"
            }`}
          >
            {/* Background Image */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/map-big-data-modern-city_1217-1772-e3zcGUhLnew8Sr5GVArDY1PJsmSC4f.avif"
              alt="Network Map"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Mode Overlay */}
            {mapMode === "dark" && (
              <div className="absolute inset-0 bg-black/50 mix-blend-darken" />
            )}

            {/* Satellite Mode Overlay - brings out colors more */}
            {mapMode === "satellite" && (
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-orange-900/20 mix-blend-overlay" />
            )}

            {/* Grid Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Network Nodes Overlay */}
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="absolute"
                style={{
                  left: `${20 + (node.lng - 30) * 3}%`,
                  top: `${30 + (60 - node.lat) * 2}%`,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className={`w-3 h-3 rounded-full ${getQualityColor(node.quality)} shadow-lg drop-shadow-lg`}
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-xs text-white font-semibold backdrop-blur-sm">
                  {node.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Node Details */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Network size={20} className="text-blue-400" />
              Network Nodes
            </h3>
            <div className="space-y-3">
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-blue-400/10 bg-blue-600/10 p-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`h-2.5 w-2.5 rounded-full ${getQualityColor(node.quality)}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{node.name}</p>
                      <p className="text-xs text-blue-400/60">Coordinates: {node.lat.toFixed(2)}, {node.lng.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-400/60">Quality</p>
                    <p className="text-sm font-bold text-blue-400">{node.quality}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
