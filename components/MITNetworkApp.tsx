"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import NetworkAnimation from "./NetworkAnimation";
import AuthModal from "./AuthModal";
import LoadingScreen from "./LoadingScreen";
import GlassHeader from "./GlassHeader";
import GlassFooter from "./GlassFooter";
import SideNavigation from "./SideNavigation";
import NotificationPanel from "./NotificationPanel";
import HomePage from "./pages/HomePage";
import NSPPage from "./pages/NSPPage";
import DeviceDataPage from "./pages/DeviceDataPage";
import MirrorWebPage from "./pages/MirrorWebPage";
import OnionWebPage from "./pages/OnionWebPage";
import RadarControllerPage from "./pages/RadarControllerPage";
import SatelliteDataPage from "./pages/SatelliteDataPage";
import SystemObservingPage from "./pages/SystemObservingPage";
import NodeTokenPage from "./pages/NodeTokenPage";
import MegaLogReaderPage from "./pages/MegaLogReaderPage";
import DeviceInfoPage from "./pages/DeviceInfoPage";
import DeviceAccessPage from "./pages/DeviceAccessPage";
import KaliLinuxPage from "./pages/KaliLinuxPage";
import SupportPage from "./pages/SupportPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ServerNetworkPage from "./pages/ServerNetworkPage";

type AppState = "landing" | "loading" | "home";

export default function MITNetworkApp() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && appState === "landing") {
      setAppState("loading");
    }
  }, [user, loading, appState]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setAppState("loading");
  };

  const handleLoadingComplete = () => {
    setAppState("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage />;
      case "server-network":
        return <ServerNetworkPage />;
      case "nsp":
        return <NSPPage />;
      case "device-data":
        return <DeviceDataPage />;
      case "mirror-web":
        return <MirrorWebPage />;
      case "onion-web":
        return <OnionWebPage />;
      case "radar-controller":
        return <RadarControllerPage />;
      case "satellite-data":
        return <SatelliteDataPage />;
      case "system-observing":
        return <SystemObservingPage />;
      case "node-token":
        return <NodeTokenPage />;
      case "mega-log-reader":
        return <MegaLogReaderPage />;
      case "device-info":
        return <DeviceInfoPage />;
      case "device-access":
        return <DeviceAccessPage />;
      case "kali-linux":
        return <KaliLinuxPage />;
      case "support":
        return <SupportPage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <NetworkAnimation slow={appState === "home"} />

      <AnimatePresence mode="wait">
        {appState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="relative"
            >
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
                alt="MIT Network Logo" 
                className="h-40 w-40 object-contain sm:h-52 sm:w-52"
                crossOrigin="anonymous"
                animate={{
                  filter: [
                    "drop-shadow(0 0 30px rgba(16, 185, 129, 0.5))",
                    "drop-shadow(0 0 60px rgba(16, 185, 129, 0.8))",
                    "drop-shadow(0 0 30px rgba(16, 185, 129, 0.5))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Rotating rings */}
              <motion.div
                className="absolute -inset-4 rounded-[2rem] border-2 border-emerald-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-[2.5rem] border border-emerald-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              MIT NETWORK
            </motion.h1>

            {/* Secured by Knox */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 flex items-center gap-2 text-xs text-emerald-400/60 sm:text-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              </svg>
              <span>Secured by Knox</span>
            </motion.div>

            {/* Go to Console Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={() => setShowAuthModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-10 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 sm:px-8 sm:py-4"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                Go to Console
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-xs text-emerald-500/40"
            >
              <p>Next Generation Security Platform</p>
              <p className="mt-1">v2.0.0</p>
            </motion.div>
          </motion.div>
        )}

        {appState === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {appState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <GlassHeader 
              onMenuClick={() => setIsSideNavOpen(true)} 
              onNotificationClick={() => setIsNotificationOpen(true)}
              onProfileClick={() => setCurrentPage("profile")}
            />
            {renderPage()}
            <GlassFooter />
            <SideNavigation
              isOpen={isSideNavOpen}
              onClose={() => setIsSideNavOpen(false)}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            <NotificationPanel
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
