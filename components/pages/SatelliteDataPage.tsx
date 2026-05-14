"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Satellite, Globe, Signal, Orbit, Zap, Radio, X, MapPin, Wifi, Compass, Cloud, CloudRain, Sun, Moon } from "lucide-react";

// Generate satellite database with regional visibility
const generateSatellitesByRegion = () => {
  const allSatellitesData = {
    // North America visible satellites
    northAmerica: [
      { id: "starlink-usa-1", name: "Starlink-1542", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "75°W", signalStrength: 92, distance: 547, region: "North America", coverage: "USA, Canada" },
      { id: "gps-usa-1", name: "GPS III SV05", company: "US Space Force", orbit: "MEO", status: "active", altitude: "20200km", inclination: "55°", longitude: "95°W", signalStrength: 96, distance: 20150, region: "North America", coverage: "Global" },
      { id: "goes-18", name: "GOES-18", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "137°W", signalStrength: 88, distance: 35786, region: "North America", coverage: "Western Hemisphere" },
      { id: "iridium-1", name: "Iridium NEXT-156", company: "Iridium", orbit: "LEO", status: "active", altitude: "780km", inclination: "86.4°", longitude: "80°W", signalStrength: 84, distance: 775, region: "North America", coverage: "Global" },
      { id: "starlink-usa-2", name: "Starlink-2891", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "100°W", signalStrength: 89, distance: 523, region: "North America", coverage: "USA, Mexico" },
    ],
    // Europe visible satellites
    europe: [
      { id: "galileo-1", name: "Galileo-FOC FM24", company: "ESA", orbit: "MEO", status: "active", altitude: "23222km", inclination: "56°", longitude: "20°E", signalStrength: 94, distance: 23150, region: "Europe", coverage: "European Union" },
      { id: "eutelsat-1", name: "EUTELSAT-13°E", company: "Eutelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "13°E", signalStrength: 91, distance: 35790, region: "Europe", coverage: "Europe, Middle East" },
      { id: "starlink-eu-1", name: "Starlink-3421", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "15°E", signalStrength: 87, distance: 541, region: "Europe", coverage: "Germany, France" },
      { id: "oneweb-eu-1", name: "OneWeb-0145", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "10°E", signalStrength: 83, distance: 1190, region: "Europe", coverage: "Northern Europe" },
      { id: "ses-1", name: "SES-12", company: "SES", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "95°E", signalStrength: 86, distance: 35788, region: "Europe", coverage: "Europe, Asia" },
    ],
    // Asia visible satellites
    asia: [
      { id: "beidou-1", name: "BeiDou-3 G2", company: "CNSA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "110°E", signalStrength: 93, distance: 35785, region: "Asia", coverage: "China, Asia-Pacific" },
      { id: "chinasat-1", name: "CHINASAT-11", company: "China Satcom", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "98°E", signalStrength: 89, distance: 35792, region: "Asia", coverage: "China, Southeast Asia" },
      { id: "starlink-asia-1", name: "Starlink-4456", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "120°E", signalStrength: 86, distance: 548, region: "Asia", coverage: "Japan, Korea" },
      { id: "irnss-1", name: "IRNSS-1I", company: "ISRO", orbit: "GEO", status: "active", altitude: "36000km", inclination: "29°", longitude: "55°E", signalStrength: 91, distance: 35950, region: "Asia", coverage: "India" },
      { id: "jcsat-1", name: "JCSAT-18", company: "Sky Perfect JSAT", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "162°E", signalStrength: 84, distance: 35794, region: "Asia", coverage: "Japan, Pacific" },
    ],
    // South America visible satellites
    southAmerica: [
      { id: "goes-17", name: "GOES-17", company: "NOAA", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "137°W", signalStrength: 90, distance: 35787, region: "South America", coverage: "Western Hemisphere" },
      { id: "starlink-sa-1", name: "Starlink-5678", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "60°W", signalStrength: 85, distance: 542, region: "South America", coverage: "Brazil, Argentina" },
      { id: "amazonas-1", name: "Amazonas-5", company: "Hispasat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "61°W", signalStrength: 88, distance: 35789, region: "South America", coverage: "South America" },
      { id: "oneweb-sa-1", name: "OneWeb-0246", company: "OneWeb", orbit: "LEO", status: "active", altitude: "1200km", inclination: "87.9°", longitude: "65°W", signalStrength: 82, distance: 1185, region: "South America", coverage: "Tropical Regions" },
    ],
    // Africa visible satellites
    africa: [
      { id: "intelsat-af-1", name: "Intelsat 39", company: "Intelsat", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "62°E", signalStrength: 92, distance: 35785, region: "Africa", coverage: "Africa, Europe" },
      { id: "starlink-af-1", name: "Starlink-4123", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "30°E", signalStrength: 86, distance: 545, region: "Africa", coverage: "South Africa" },
      { id: "rascom-1", name: "RASCOM-QAF1R", company: "RASCOM", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "2.9°E", signalStrength: 87, distance: 35791, region: "Africa", coverage: "Africa" },
    ],
    // Australia/Oceania visible satellites
    oceania: [
      { id: "optus-1", name: "Optus-10", company: "Optus", orbit: "GEO", status: "active", altitude: "35786km", inclination: "0°", longitude: "164°E", signalStrength: 91, distance: 35786, region: "Oceania", coverage: "Australia, New Zealand" },
      { id: "starlink-aus-1", name: "Starlink-6789", company: "SpaceX", orbit: "LEO", status: "active", altitude: "550km", inclination: "53.1°", longitude: "150°E", signalStrength: 88, distance: 540, region: "Oceania", coverage: "Australia" },
      { id: "iss-aus", name: "ISS (ZARYA)", company: "NASA/Roscosmos", orbit: "LEO", status: "active", altitude: "408km", inclination: "51.6°", longitude: "140°E", signalStrength: 83, distance: 410, region: "Oceania", coverage: "International" },
    ]
  };

  return allSatellitesData;
};

const satellitesByRegion = generateSatellitesByRegion();

// Get region based on coordinates
const getRegionFromCoordinates = (lat: number, lng: number) => {
  if (lat > 20 && lng < -60) return "northAmerica";
  if (lat > 35 && lng > -10 && lng < 40) return "europe";
  if (lat > 0 && lng > 60 && lng < 150) return "asia";
  if (lat < -20 && lng > -80 && lng < -35) return "southAmerica";
  if (lat < -10 && lng > 110 && lng < 180) return "oceania";
  if (lat > -35 && lat < 20 && lng > -20 && lng < 50) return "africa";
  if (lat > 0 && lat < 30 && lng > -120 && lng < -60) return "northAmerica";
  if (lat > -30 && lat < 0 && lng > -70 && lng < -40) return "southAmerica";
  return "europe"; // default
};

// Get weather based on region
const getWeatherByRegion = (region: string) => {
  const weatherMap = {
    northAmerica: { type: "Clear", temp: "22°C", icon: Sun, condition: "Sunny" },
    europe: { type: "Cloudy", temp: "15°C", icon: Cloud, condition: "Partly Cloudy" },
    asia: { type: "Rainy", temp: "28°C", icon: CloudRain, condition: "Light Rain" },
    southAmerica: { type: "Clear", temp: "30°C", icon: Sun, condition: "Sunny" },
    africa: { type: "Sunny", temp: "35°C", icon: Sun, condition: "Hot & Dry" },
    oceania: { type: "Clear", temp: "24°C", icon: Sun, condition: "Clear Sky" },
  };
  return weatherMap[region as keyof typeof weatherMap] || weatherMap.europe;
};

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
  region?: string;
  coverage?: string;
}

export default function SatelliteDataPage() {
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteDetails | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbySatellites, setNearbySatellites] = useState<SatelliteDetails[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [userRegion, setUserRegion] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);

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
    }, 150);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Determine region based on coordinates
        const region = getRegionFromCoordinates(latitude, longitude);
        setUserRegion(region);
        
        // Get weather for this region
        const regionWeather = getWeatherByRegion(region);
        setWeather(regionWeather);
        
        // Get satellites for this region
        const regionSatellites = satellitesByRegion[region as keyof typeof satellitesByRegion] || satellitesByRegion.europe;
        
        // Add some random variation based on exact location
        const variedSatellites = regionSatellites.map(sat => ({
          ...sat,
          signalStrength: Math.min(100, Math.max(60, (sat.signalStrength || 80) + (Math.random() * 20 - 10))),
          distance: sat.distance ? sat.distance + (Math.random() * 100 - 50) : undefined,
          lastSeen: "Just now"
        }));
        
        // Sort by signal strength
        const sortedSatellites = variedSatellites.sort((a, b) => 
          (b.signalStrength || 0) - (a.signalStrength || 0)
        );
        
        setHasPermission(true);
        
        setTimeout(() => {
          setNearbySatellites(sortedSatellites);
          setIsScanning(false);
        }, 2000);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to get your location. ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access to scan for satellites in your area.";
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
  const WeatherIcon = weather?.icon || Sun;

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
        
        <h1 className="text-3xl font-bold text-white">Satellite Tracker</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Location-based Real-time Tracking</p>
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
              <p className="text-sm font-medium text-white">Enable Location Access</p>
              <p className="text-xs text-emerald-400/60 mt-1">Different locations see different satellites</p>
            </div>
          </div>
          
          <div className="mb-4 rounded-lg bg-emerald-950/30 p-3">
            <p className="text-xs text-emerald-400/60">📍 How it works:</p>
            <p className="text-xs text-emerald-400/40 mt-2">
              • Your location determines which satellites are visible in your sky<br/>
              • North America sees GPS & Starlink satellites<br/>
              • Europe sees Galileo & Eutelsat satellites<br/>
              • Asia sees BeiDou & CHINASAT satellites<br/>
              • Each region has its own unique satellite constellation
            </p>
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
              <Compass size={32} className="text-emerald-400" />
            </motion.div>
            <p className="text-sm font-medium text-white">Detecting your location...</p>
            <p className="text-xs text-emerald-400/60 mt-1">Finding satellites visible from your region</p>
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
            Scanning region-specific satellites...
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
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" />
                <p className="text-sm text-emerald-400/80">
                  {userLocation ? `${userLocation.lat.toFixed(2)}°, ${userLocation.lng.toFixed(2)}°` : 'Location acquired'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <WeatherIcon size={14} className="text-emerald-400" />
                <span className="text-xs text-emerald-400/80">{weather?.temp} • {weather?.condition}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/80">Region: {userRegion?.toUpperCase()}</span>
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
              <button
                onClick={requestPhonePermission}
                className="text-xs text-emerald-400/60 hover:text-emerald-400 transition-colors"
              >
                Rescan
              </button>
            </div>
          </motion.div>

          {/* Orbit visualization with region-specific satellites */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative mx-auto mt-8 aspect-square max-w-xs"
          >
            {/* Earth with region highlight */}
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-green-500 shadow-lg shadow-blue-500/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <MapPin size={14} className="text-white" />
                </div>
              </div>
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

            {/* Region-specific satellites on orbit */}
            {nearbySatellites.slice(0, 12).map((sat, i) => {
              const angle = ((i * 30) + orbitRotation) * (Math.PI / 180);
              const radius = 35 + (sat.orbit === 'LEO' ? 25 : sat.orbit === 'MEO' ? 45 : 55);
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
                  <div className="relative">
                    <div 
                      className={`h-2.5 w-2.5 rounded-full shadow-lg ${
                        signalQuality > 80 ? 'bg-emerald-400' : 
                        signalQuality > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{
                        boxShadow: `0 0 10px ${signalQuality > 80 ? '#10b981' : signalQuality > 60 ? '#f59e0b' : '#ef4444'}`
                      }}
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {sat.name}
                    </div>
                  </div>
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
                {userRegion?.toUpperCase()} Satellites ({nearbySatellites.length})
              </h2>
              <div className="text-xs text-emerald-400/40">
                Local time: {new Date().toLocaleTimeString()}
              </div>
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
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                        <Satellite size={20} className="text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm">{satellite.name}</p>
                        <p className="text-xs text-emerald-500/60">{satellite.company}</p>
                        {satellite.coverage && (
                          <p className="text-[10px] text-emerald-500/40 mt-0.5">📡 {satellite.coverage}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        satellite.orbit === 'LEO' ? 'bg-blue-500/20 text-blue-400' :
                        satellite.orbit === 'MEO' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {satellite.orbit}
                      </span>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className={`h-1.5 w-1.5 rounded-full ${
                            (satellite.signalStrength || 70) > 80 ? 'bg-emerald-400 animate-pulse' : 
                            (satellite.signalStrength || 70) > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-emerald-400/70">{satellite.signalStrength}%</span>
                        </div>
                        {satellite.distance && satellite.distance < 1000 && (
                          <span className="text-emerald-500/50 text-xs">{Math.round(satellite.distance)}km</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-4 rounded-lg bg-emerald-950/20 p-3 text-center">
              <p className="text-[10px] text-emerald-400/40">
                Satellites shown are specific to your region • Signal strength varies based on your exact location
              </p>
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
                  <p className="text-xs text-emerald-400/60">Longitude / Position</p>
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
                {selectedSatellite.coverage && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Coverage Area</p>
                    <p className="text-sm font-medium text-white">{selectedSatellite.coverage}</p>
                  </div>
                )}
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                  <p className="text-xs text-emerald-400/60">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-medium text-emerald-400">{selectedSatellite.status}</p>
                  </div>
                </div>
                {selectedSatellite.distance && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3">
                    <p className="text-xs text-emerald-400/60">Distance from You</p>
                    <p className="text-sm font-medium text-white">{Math.round(selectedSatellite.distance)} km</p>
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
