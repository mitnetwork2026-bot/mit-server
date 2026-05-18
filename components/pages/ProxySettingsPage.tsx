"use client";

import { motion } from "framer-motion";
import { Settings, Sliders, Save, RotateCcw } from "lucide-react";
import { useState } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxySettingsPage() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    encryptionLevel: "high",
    notifications: true,
  });

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
          <Sliders size={40} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-sm text-blue-400/60">System Configuration</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl space-y-4"
      >
        <div className="rounded-xl border border-blue-400/20 bg-black/30 p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-semibold text-white">General Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="rounded border border-blue-400/30"
              />
              <span className="text-sm text-blue-400">Auto Backup Enabled</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="rounded border border-blue-400/30"
              />
              <span className="text-sm text-blue-400">Enable Notifications</span>
            </label>
            <div>
              <p className="mb-2 text-sm text-blue-400">Encryption Level</p>
              <select
                value={settings.encryptionLevel}
                onChange={(e) => setSettings({ ...settings, encryptionLevel: e.target.value })}
                className="w-full rounded-lg border border-blue-400/30 bg-black/30 px-3 py-2 text-blue-400"
              >
                <option>low</option>
                <option>medium</option>
                <option>high</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            <Save size={18} />
            Save Changes
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600/30 px-4 py-3 text-blue-400 hover:bg-blue-600/50"
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>
      </motion.div>
      </div>
    </ProxyBackground>
  );
}
