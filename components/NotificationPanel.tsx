"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Shield, Wifi, AlertTriangle, CheckCircle, Clock, Terminal, Database, Lock, Globe, Zap } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert" | "hack";
  timestamp: Date;
  read: boolean;
}

const hackingNotifications = [
  { title: "Port Scan Complete", message: "Found 23 open ports on target network", type: "hack" as const },
  { title: "Firewall Bypassed", message: "Successfully tunneled through proxy layer 7", type: "success" as const },
  { title: "New Vulnerability", message: "CVE-2024-8821 detected in remote system", type: "warning" as const },
  { title: "Packet Intercept", message: "Captured 847 encrypted packets from node", type: "info" as const },
  { title: "SSH Handshake", message: "Brute force authentication in progress...", type: "hack" as const },
  { title: "Database Access", message: "PostgreSQL injection point confirmed", type: "alert" as const },
  { title: "Rootkit Deployed", message: "Kernel module loaded successfully", type: "success" as const },
  { title: "Network Mapped", message: "192.168.x.x subnet fully enumerated", type: "info" as const },
  { title: "SSL Stripped", message: "HTTPS downgrade attack successful", type: "hack" as const },
  { title: "Keylogger Active", message: "Capturing keystrokes on target device", type: "warning" as const },
  { title: "DNS Poisoned", message: "Redirecting traffic to shadow server", type: "alert" as const },
  { title: "Zero Day Found", message: "Unpatched exploit in kernel v5.15.x", type: "hack" as const },
  { title: "Session Hijacked", message: "Admin cookie successfully cloned", type: "success" as const },
  { title: "Payload Delivered", message: "Reverse shell connection established", type: "hack" as const },
  { title: "Memory Dump", message: "RAM extraction 67% complete...", type: "info" as const },
  { title: "Backdoor Installed", message: "Persistent access maintained on port 4444", type: "success" as const },
  { title: "ARP Spoofing", message: "Man-in-the-middle position acquired", type: "hack" as const },
  { title: "Credential Harvested", message: "15 password hashes extracted", type: "warning" as const },
  { title: "VPN Tunnel Open", message: "Encrypted channel to dark node active", type: "info" as const },
  { title: "System Compromised", message: "Full administrative access granted", type: "alert" as const },
];

export default function NotificationPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Add initial notifications
    const initial: Notification[] = [
      {
        id: "init-1",
        title: "System Online",
        message: "MIT Network security protocols activated",
        type: "success",
        timestamp: new Date(),
        read: false,
      },
      {
        id: "init-2",
        title: "Encryption Active",
        message: "AES-256 end-to-end encryption enabled",
        type: "info",
        timestamp: new Date(Date.now() - 60000),
        read: false,
      },
    ];
    setNotifications(initial);

    // Add random hacking notifications every 3-5 seconds
    const interval = setInterval(() => {
      const randomNotif = hackingNotifications[Math.floor(Math.random() * hackingNotifications.length)];
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: randomNotif.title,
        message: randomNotif.message,
        type: randomNotif.type,
        timestamp: new Date(),
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 50));
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-emerald-400" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-400" />;
      case "alert":
        return <Shield size={16} className="text-red-400" />;
      case "hack":
        return <Terminal size={16} className="text-cyan-400" />;
      default:
        return <Wifi size={16} className="text-blue-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed right-2 top-20 z-50 w-[calc(100%-1rem)] max-w-sm overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/95 via-black/95 to-emerald-950/95 shadow-xl shadow-emerald-500/10 backdrop-blur-xl sm:right-4 sm:w-80"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 p-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-emerald-400" />
                <h3 className="font-semibold text-white">Activity Feed</h3>
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-medium text-white"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto sm:max-h-96">
              <AnimatePresence mode="popLayout">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -50, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 50, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b border-emerald-500/10 p-3 transition-colors hover:bg-emerald-500/5 ${
                      !notification.read ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="mt-0.5"
                        animate={{ 
                          scale: !notification.read ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {getIcon(notification.type)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-white truncate">{notification.title}</p>
                          {!notification.read && (
                            <motion.span 
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" 
                            />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-emerald-400/60 truncate">{notification.message}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-emerald-500/40">
                          <Clock size={10} />
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-emerald-500/20 p-3">
              <div className="flex items-center justify-center gap-2 text-xs text-emerald-400/60">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
                <span>Live monitoring active</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
