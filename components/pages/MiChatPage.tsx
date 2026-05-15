'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMiChat } from '@/hooks/useMiChat';
import { useAuth } from '@/contexts/AuthContext';
import MessageList from '@/components/MiChat/MessageList';
import MessageInput from '@/components/MiChat/MessageInput';
import UsersList from '@/components/MiChat/UsersList';
import MobileUsersList from '@/components/MiChat/MobileUsersList';
import { Menu, X, Skull, AlertTriangle, Shield, Zap, Terminal, Battery, Wifi, HardDrive } from 'lucide-react';

export default function MiChatPage() {
  const { messages, users, sendMessage, deleteMessage, editMessage, markAsSeen, setTyping, addReaction, isAdmin } = useMiChat();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showMobileUsers, setShowMobileUsers] = useState(false);
  const [glitchActive, setGlitchActive] = useState(true);
  const [showVirusAlert, setShowVirusAlert] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [infectedFiles, setInfectedFiles] = useState(0);
  const [systemBreached, setSystemBreached] = useState(false);
  const [hackMessage, setHackMessage] = useState('');
  const [shakeScreen, setShakeScreen] = useState(false);
  const [showCriticalAlert, setShowCriticalAlert] = useState(false);

  const onlineCount = users.filter(u => u.status === 'online').length;

  // Scary virus simulation effects
  useEffect(() => {
    // Fake scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSystemBreached(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
      setInfectedFiles(prev => prev + Math.floor(Math.random() * 3));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (systemBreached) {
      const messages = [
        "⚠️ SYSTEM COMPROMISED ⚠️",
        "🔓 ROOT ACCESS GRANTED",
        "💀 ALL DATA ENCRYPTED",
        "👾 YOUR DEVICE IS CONTROLLED",
        "📡 SENDING DATA TO DARKNET",
        "🔥 FIREWALL DESTROYED",
        "💀 RANSOMWARE ACTIVATED",
        "👁️ WE SEE EVERYTHING",
      ];
      let index = 0;
      const msgInterval = setInterval(() => {
        setHackMessage(messages[index % messages.length]);
        index++;
      }, 1500);
      return () => clearInterval(msgInterval);
    }
  }, [systemBreached]);

  useEffect(() => {
    if (showVirusAlert) {
      const timer = setTimeout(() => setShowVirusAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Random screen shake effect
    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 200);
      }
    }, 3000);
    return () => clearInterval(shakeInterval);
  }, []);

  useEffect(() => {
    // Critical alert popup every few seconds
    const alertInterval = setInterval(() => {
      if (systemBreached) {
        setShowCriticalAlert(true);
        setTimeout(() => setShowCriticalAlert(false), 2000);
      }
    }, 4000);
    return () => clearInterval(alertInterval);
  }, [systemBreached]);

  return (
    <div className={`min-h-screen flex gap-4 px-2 sm:px-4 pb-32 pt-24 relative ${shakeScreen ? 'animate-shake' : ''}`}
      style={{
        animation: shakeScreen ? 'shake 0.2s ease-in-out 0s 2' : 'none',
      }}>
      
      {/* Glitch effect overlay */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes glitch {
          0% { transform: translate(0); opacity: 0.3; }
          20% { transform: translate(-2px, 1px); opacity: 0.6; }
          40% { transform: translate(-1px, -1px); opacity: 0.8; }
          60% { transform: translate(1px, 0); opacity: 0.5; }
          80% { transform: translate(0, 1px); opacity: 0.7; }
          100% { transform: translate(0); opacity: 0; }
        }
        @keyframes pulse-red {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .glitch-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 0, 0, 0.1) 0px,
            rgba(255, 0, 0, 0.1) 2px,
            transparent 2px,
            transparent 6px
          );
          animation: glitch 0.3s infinite;
        }
        .scanline-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 0, 0, 0.05),
            transparent
          );
          animation: scanline 4s linear infinite;
          pointer-events: none;
          z-index: 1001;
        }
      `}</style>

      {/* Glitch overlays */}
      {glitchActive && (
        <>
          <div className="glitch-overlay"></div>
          <div className="scanline-effect"></div>
        </>
      )}

      {/* Main Virus Alert Modal */}
      <AnimatePresence>
        {showVirusAlert && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
            exit={{ scale: 0, opacity: 0, rotateZ: 10 }}
            transition={{ type: "spring", damping: 12 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0px rgba(255,0,0,0)",
                  "0 0 50px rgba(255,0,0,0.8)",
                  "0 0 0px rgba(255,0,0,0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-gradient-to-br from-red-950 to-black border-4 border-red-600 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Skull size={80} className="text-red-500 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-4xl font-bold text-red-500 mb-2 font-mono">⚠️ VIRUS DETECTED ⚠️</h1>
              <p className="text-red-400 mb-4 font-mono text-sm">YOUR SYSTEM HAS BEEN INFECTED</p>
              <div className="bg-black/80 p-4 rounded-lg mb-4 border border-red-500">
                <div className="flex justify-between text-xs text-red-400 mb-2 font-mono">
                  <span>SCANNING FILES...</span>
                  <span>{Math.floor(scanProgress)}%</span>
                </div>
                <div className="w-full bg-red-950 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-red-500 h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-red-400 text-xs mt-3 font-mono">
                  INFECTED: {infectedFiles} | QUARANTINED: 0
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVirusAlert(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg font-mono"
              >
                CONTINUE ANYWAY (DANGER)
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Critical Alert Popups */}
      <AnimatePresence>
        {showCriticalAlert && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-20 right-4 z-50 bg-red-600/95 backdrop-blur border-l-8 border-red-900 p-4 rounded-lg shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-white animate-pulse" />
              <div>
                <p className="font-mono font-bold text-white">CRITICAL ALERT!</p>
                <p className="text-sm text-red-100 font-mono">System breach in progress...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Breached Banner */}
      {systemBreached && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900 via-red-700 to-red-900 p-3 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-4">
            <Skull className="text-white animate-pulse" size={24} />
            <p className="font-mono font-bold text-white tracking-wider">
              {hackMessage || "💀 SYSTEM BREACHED - YOUR DATA IS ENCRYPTED 💀"}
            </p>
            <Zap className="text-white animate-pulse" size={24} />
          </div>
        </motion.div>
      )}

      {/* Fake Status Bar with Malware Indicators */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur border-b border-red-500/30 px-4 py-1 text-xs font-mono flex justify-between text-red-400">
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><Battery size={12} /> INFECTED</span>
          <span className="flex items-center gap-1"><Wifi size={12} /> LEAKING</span>
          <span className="flex items-center gap-1"><HardDrive size={12} /> CORRUPTED</span>
        </div>
        <div>
          <span className="animate-pulse">⚠️ ADMIN ACCESS: {isAdmin ? 'ROOT' : 'USER'} ⚠️</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full flex gap-4 relative z-10"
      >
        {/* Desktop Users Sidebar */}
        <div className="w-72 hidden lg:flex flex-col">
          <UsersList users={users} selectedUser={selectedUser} onSelect={setSelectedUser} />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/70 to-black/80 backdrop-blur-xl p-3 sm:p-4 flex items-center justify-between relative overflow-hidden"
          >
            {/* Blood drip effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-red-600"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
                  alt="MiChat"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover flex-shrink-0 border-2 border-red-500"
                  crossOrigin="anonymous"
                />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-white truncate flex items-center gap-2">
                  MiChat 
                  <span className="text-red-500 text-xs bg-red-950/50 px-2 py-0.5 rounded-full font-mono">CORRUPTED</span>
                </h1>
                <p className="text-xs text-red-400/80 font-mono">
                  <span className="animate-pulse inline-block mr-1">🔴</span> 
                  GROUP CHAT • {onlineCount} ONLINE • SYSTEM BREACHED
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileUsers(!showMobileUsers)}
              className="lg:hidden p-2 rounded-lg hover:bg-red-500/20 transition-colors flex-shrink-0"
            >
              {showMobileUsers ? (
                <X size={20} className="text-red-400" />
              ) : (
                <Menu size={20} className="text-red-400" />
              )}
            </motion.button>
          </motion.div>

          {/* Mobile Users Dropdown */}
          <AnimatePresence>
            {showMobileUsers && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-3 lg:hidden"
              >
                <MobileUsersList 
                  users={users} 
                  selectedUser={selectedUser} 
                  onSelect={(userId) => {
                    setSelectedUser(userId);
                    setShowMobileUsers(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages with Glitch Effect */}
          <div className="relative">
            {glitchActive && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            )}
            <MessageList
              messages={messages}
              currentUserId={user?.uid || ''}
              onDeleteMessage={deleteMessage}
              onEditMessage={editMessage}
              onMarkAsSeen={markAsSeen}
              onAddReaction={addReaction}
              isAdmin={isAdmin}
            />
          </div>

          {/* Input */}
          <MessageInput onSendMessage={sendMessage} onTyping={setTyping} />
          
          {/* Fake Virus Warning under input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center"
          >
            <p className="text-[10px] font-mono text-red-500/60 flex items-center justify-center gap-2">
              <Terminal size={10} />
              <span>WARNING: KEYLOGGER ACTIVE • ALL MESSAGES ARE MONITORED</span>
              <Shield size={10} className="text-red-500 animate-pulse" />
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Skulls */}
      {systemBreached && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * window.innerWidth, y: -50 }}
              animate={{ y: window.innerHeight + 100 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2 }}
              className="fixed z-50 pointer-events-none"
              style={{ left: `${20 + i * 30}%` }}
            >
              <Skull size={30 + i * 10} className="text-red-500/30" />
            </motion.div>
          ))}
        </>
      )}

      {/* Fake Loading/Infection Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-red-600 z-50"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 30, repeat: Infinity }}
        style={{ boxShadow: "0 0 10px red" }}
      />

      {/* Console Log Simulation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out 0s 2;
        }
        ::-webkit-scrollbar {
          width: 8px;
          background: black;
        }
        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
