"use client";

import { motion } from "framer-motion";
import { Settings, Sliders, Save, RotateCcw, Smartphone } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxySettingsPage() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    encryptionLevel: "high",
    notifications: true,
    fastVPN: true,
    autoConnect: false,
    ipRotation: true,
    dnsLeak: false,
    webrtcLeak: true,
    compressData: false,
    killSwitch: true,
    splitTunneling: false,
    protocolVersion: "IKEv2",
    obfuscation: true,
    advertisingBlock: true,
    malwareBlock: true,
    darkWeb: false,
    proxyChain: true,
    randomizeIP: true,
    blockTracking: true,
    httpsOnly: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const settingGroups = [
    {
      title: "VPN Connection",
      items: [
        { key: "fastVPN", label: "Fast VPN Mode" },
        { key: "autoConnect", label: "Auto Connect on Startup" },
        { key: "killSwitch", label: "Kill Switch Protection" },
      ],
    },
    {
      title: "IP & Anonymity",
      items: [
        { key: "ipRotation", label: "Rotate IP Periodically" },
        { key: "randomizeIP", label: "Randomize IP Address" },
        { key: "proxyChain", label: "Use Proxy Chain" },
      ],
    },
    {
      title: "Leak Prevention",
      items: [
        { key: "dnsLeak", label: "DNS Leak Protection" },
        { key: "webrtcLeak", label: "WebRTC Leak Prevention" },
        { key: "httpsOnly", label: "HTTPS Only Mode" },
      ],
    },
    {
      title: "Security & Blocking",
      items: [
        { key: "blockTracking", label: "Block Tracking" },
        { key: "malwareBlock", label: "Malware Protection" },
        { key: "advertisingBlock", label: "Ad Blocking" },
      ],
    },
    {
      title: "Advanced Features",
      items: [
        { key: "compressData", label: "Compress Data" },
        { key: "obfuscation", label: "Protocol Obfuscation" },
        { key: "splitTunneling", label: "Split Tunneling" },
      ],
    },
    {
      title: "Dangerous Zone",
      items: [
        { key: "darkWeb", label: "Enable Dark Web Access" },
      ],
    },
  ];

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
            <Smartphone size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-sm text-blue-400/60">20 Mobile-Style Toggle Settings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Settings Groups */}
          {settingGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + groupIndex * 0.05 }}
              className="rounded-xl border border-blue-400/20 bg-black/30 p-4 sm:p-6 backdrop-blur-xl"
            >
              <h3 className={`mb-4 font-semibold flex items-center gap-2 ${
                group.title === "Dangerous Zone" ? "text-red-400" : "text-white"
              }`}>
                <Sliders size={16} />
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-400/5 transition-colors cursor-pointer group"
                  >
                    <span className={`text-sm ${
                      group.title === "Dangerous Zone" ? "text-red-300" : "text-blue-400"
                    }`}>
                      {item.label}
                    </span>
                    <motion.div
                      animate={{ backgroundColor: settings[item.key as keyof typeof settings] ? "#3b82f6" : "#1e3a8a" }}
                      onClick={() => toggleSetting(item.key as keyof typeof settings)}
                      className="relative w-12 h-6 rounded-full bg-blue-900 cursor-pointer transition-colors"
                    >
                      <motion.div
                        animate={{ x: settings[item.key as keyof typeof settings] ? 24 : 2 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </motion.div>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Protocol Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-xl border border-blue-400/20 bg-black/30 p-4 sm:p-6 backdrop-blur-xl"
          >
            <h3 className="mb-4 font-semibold text-white flex items-center gap-2">
              <Settings size={16} />
              VPN Protocol
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["IKEv2", "WireGuard", "OpenVPN", "L2TP", "SSTP", "PPTP"].map((protocol) => (
                <motion.button
                  key={protocol}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    settings.protocolVersion === protocol
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600/30 text-blue-400 hover:bg-blue-600/50"
                  }`}
                  onClick={() => setSettings({ ...settings, protocolVersion: protocol })}
                >
                  {protocol}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              Save Settings
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600/30 px-4 py-3 text-blue-400 hover:bg-blue-600/50 transition-colors"
            >
              <RotateCcw size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
