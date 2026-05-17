'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Copy, CheckCircle, Loader, AlertCircle } from 'lucide-react';

export default function MetaConnectivityPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [connectionTime, setConnectionTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConnected) {
      timer = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  useEffect(() => {
    let logTimer: NodeJS.Timeout;
    if (isConnected) {
      const logMessages = [
        'Network stability: 99.2%',
        'Data transfer rate: 2.4 Gbps',
        'Latency: 12ms',
        'AI response time: 145ms',
        'Encryption: AES-256',
        'Service health: Optimal',
        'Active connections: 1247',
        'Bandwidth usage: 45%',
        'Packet loss: 0.01%',
        'Protocol: HTTPS/3',
        'Certificate valid: 360 days',
        'Security score: A+',
      ];

      logTimer = setInterval(() => {
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        setLogs((prev) => {
          const updated = [...prev, `[${new Date().toLocaleTimeString()}] ${randomLog}`];
          return updated.slice(-200);
        });
      }, 5000);
    }
    return () => clearInterval(logTimer);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleConnect = () => {
    if (!apiKey.trim() || !groupLink.trim()) {
      setError('Please fill in both API Key and Group Link');
      return;
    }
    setError('');
    setShowPopup(false);
    setIsConnecting(true);
    setLogs([]);

    const connectionSteps = [
      'Initializing connection...',
      'Authenticating API key...',
      'Validating group link...',
      'Establishing secure tunnel...',
      'Initializing encryption...',
      'Syncing configuration...',
      'Loading network parameters...',
      'Testing bandwidth...',
      'Calibrating latency...',
      'Establishing peers...',
      'Verifying SSL certificate...',
      'Configuring firewall rules...',
      'Initializing data transfer...',
      'Setting up failover...',
      'Connection established!',
    ];

    connectionSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (index === connectionSteps.length - 1) {
          setIsConnecting(false);
          setIsConnected(true);
          setConnectionTime(0);
        }
      }, (index + 1) * 1500);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey || groupLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionTime(0);
    setLogs([]);
    setApiKey('');
    setGroupLink('');
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
            <Network size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Meta Connectivity</h1>
          <p className="mt-2 text-sm text-emerald-400/60">
            AI-Powered Network Configuration & MiChat Integration
          </p>
        </div>

        {/* Connection Status Card */}
        <motion.div
          className={`relative mb-6 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl ${
            isConnected 
              ? "border-emerald-500/50 bg-emerald-950/50" 
              : "border-emerald-500/20 bg-emerald-950/30"
          }`}
        >
          {/* Status Indicator */}
          <div className="mb-6 flex items-center justify-center">
            <motion.div
              className={`relative flex h-32 w-32 items-center justify-center rounded-full ${
                isConnected ? "bg-emerald-500/20" : "bg-gray-800/50"
              }`}
              animate={isConnecting ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: isConnecting ? Infinity : 0 }}
            >
              {isConnecting && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader size={48} className="text-emerald-400" />
                </motion.div>
              )}
              {isConnected && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle size={48} className="text-emerald-400" />
                </motion.div>
              )}
              {!isConnecting && !isConnected && (
                <div className="text-center">
                  <Network size={48} className="mx-auto text-emerald-400/40" />
                </div>
              )}
            </motion.div>
          </div>

          {/* Status Text */}
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-emerald-400">
              {isConnecting
                ? "Connecting..."
                : isConnected
                ? "Connected"
                : "Not Connected"}
            </p>
            {isConnected && (
              <p className="mt-2 text-xs text-gray-400">
                Connected for: {formatTime(connectionTime)}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            {!isConnected ? (
              <button
                onClick={() => setShowPopup(true)}
                className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                Connect &amp; Configure
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="rounded-lg border border-red-500/50 bg-red-500/10 px-6 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>
        </motion.div>

        {/* Logs Panel */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-xl"
          >
            <h3 className="mb-3 text-sm font-semibold text-emerald-400">Connection Logs ({logs.length})</h3>
            <div className="max-h-64 overflow-y-auto rounded-lg bg-black/50 p-3 text-xs text-green-400 font-mono">
              {logs.length === 0 ? (
                <div className="text-gray-500">Waiting for logs...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-green-400">
                    {log}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Popup Modal */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-emerald-950/80 p-6 backdrop-blur-xl"
              >
                <h2 className="mb-2 text-xl font-bold text-white">VPN &amp; Network Setup</h2>
                <p className="mb-4 text-sm text-gray-400">Connect to Meta network infrastructure</p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/20 p-3 text-sm text-red-400"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}

                {/* API Key Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-emerald-400 mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="w-full rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-emerald-400"
                    >
                      {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Group Link Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-400 mb-2">Group Link</label>
                  <input
                    type="text"
                    value={groupLink}
                    onChange={(e) => setGroupLink(e.target.value)}
                    placeholder="Enter group network link"
                    className="w-full rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>

                {/* Instructions */}
                <div className="mb-6 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  <p className="font-semibold mb-2">Instructions:</p>
                  <ul className="space-y-1">
                    <li>• Provide valid API credentials</li>
                    <li>• Group link must be from Meta network</li>
                    <li>• VPN connection will be established automatically</li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="flex-1 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50 transition-colors"
                  >
                    {isConnecting ? 'Connecting...' : 'Confirm'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
