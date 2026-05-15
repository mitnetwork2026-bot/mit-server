'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Skull, AlertTriangle, Terminal, HardDrive, Fingerprint } from 'lucide-react';

export default function MiChatPage() {
  // Malware prank states
  const [showMalwareModal, setShowMalwareModal] = useState(true);
  const [malwareConfirmed, setMalwareConfirmed] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [selectedFileCount, setSelectedFileCount] = useState(1547);
  const [customFileSize, setCustomFileSize] = useState(2.4);
  const [malwareComplete, setMalwareComplete] = useState(false);
  const [showMobileUsers, setShowMobileUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  // Device information (fake but realistic)
  const [deviceInfo] = useState({
    serialNumber: 'SN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    motherboard: 'MSI-' + Math.floor(Math.random() * 9999),
    cpu: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : '8 cores',
    platform: navigator.platform || 'Windows NT 10.0',
    language: navigator.language || 'en-US',
    screenResolution: `${screen.width}x${screen.height}`,
    storage: 'SSD 512GB',
    ram: '16GB DDR4',
    ipAddress: '192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
    macAddress: 'AA:BB:CC:' + Math.floor(Math.random() * 99) + ':' + Math.floor(Math.random() * 99) + ':' + Math.floor(Math.random() * 99),
    imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
    osVersion: 'Windows 11 Pro Build 22621',
    antivirus: 'Disabled',
    firewall: 'Inactive'
  });

  // Mock data for chat
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello everyone!', userId: 'user1', userName: 'John', timestamp: new Date() },
    { id: '2', text: 'Hi there!', userId: 'user2', userName: 'Sarah', timestamp: new Date() },
  ]);
  const [users, setUsers] = useState([
    { id: 'user1', name: 'John', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'user2', name: 'Sarah', status: 'online', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 'user3', name: 'Mike', status: 'offline', avatar: 'https://i.pravatar.cc/150?img=3' },
  ]);
  const [currentUser, setCurrentUser] = useState({ uid: 'currentUser', name: 'You' });
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const onlineCount = users.filter(u => u.status === 'online').length;

  // Handle malware confirmation
  const handleMalwareConfirm = () => {
    setMalwareConfirmed(true);
    setShowDeviceDetails(false);
    
    // Start loading simulation
    let currentStep = 0;
    const totalSteps = 100;
    const logs = [
      '[INIT] Connecting to remote server...',
      '[AUTH] Bypassing firewall rules...',
      '[SCAN] Analyzing target device...',
      '[EXPLOIT] Injecting payload into memory...',
      '[DATA] Exfiltrating sensitive information...',
      '[CRYPTO] Encrypting local files...',
      '[PERSIST] Establishing persistence...',
      '[ROOT] Gaining administrator access...',
      '[NET] Opening backdoor ports...',
      '[FINAL] Malware deployment successful!'
    ];
    
    const interval = setInterval(() => {
      currentStep += Math.floor(Math.random() * 5) + 1;
      if (currentStep >= totalSteps) {
        currentStep = totalSteps;
        clearInterval(interval);
        setMalwareComplete(true);
        
        // Add final scary logs
        setLoadingLogs(prev => [...prev, '[✓] MALWARE ACTIVATED SUCCESSFULLY!', '[⚠️] YOUR DEVICE IS NOW UNDER CONTROL', '[💀] ALL DATA HAS BEEN BACKDOORED']);
      }
      
      setLoadingProgress(currentStep);
      
      // Add random logs
      if (Math.random() > 0.7 && currentStep < totalSteps) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        setLoadingLogs(prev => [...prev, randomLog]);
      }
      
      // Add file count progress
      if (currentStep % 20 === 0 && currentStep > 0) {
        const filesProcessed = Math.floor((currentStep / 100) * selectedFileCount);
        setLoadingLogs(prev => [...prev, `[FILE] Processing ${filesProcessed} / ${selectedFileCount} files... (${Math.floor((currentStep / 100) * 100)}%)`]);
      }
      
      // Add data transfer logs
      if (currentStep % 25 === 0 && currentStep > 0) {
        const dataTransferred = ((currentStep / 100) * customFileSize).toFixed(1);
        setLoadingLogs(prev => [...prev, `[DATA] Transferring ${dataTransferred}GB / ${customFileSize}GB to remote server...`]);
      }
    }, 200);
    
    return () => clearInterval(interval);
  };

  // File count options
  const fileOptions = [
    { label: 'Light (523 files)', value: 523, size: 0.8 },
    { label: 'Medium (1,247 files)', value: 1247, size: 1.9 },
    { label: 'Heavy (2,856 files)', value: 2856, size: 4.2 },
    { label: 'Maximum (5,432 files)', value: 5432, size: 8.7 },
    { label: 'Custom', value: 'custom', size: 0 }
  ];

  const handleFileCountSelect = (value: number | string, size: number) => {
    if (value === 'custom') {
      setSelectedFileCount(0);
    } else {
      setSelectedFileCount(value as number);
      setCustomFileSize(size);
    }
  };

  // Chat functions
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: newMessage,
        userId: currentUser.uid,
        userName: currentUser.name,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="min-h-screen flex gap-4 px-2 sm:px-4 pb-32 pt-24 bg-gradient-to-br from-gray-900 to-black">
      
      {/* Malware Prank Modal */}
      <AnimatePresence>
        {showMalwareModal && !malwareConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-red-950 via-black to-red-950 border-2 border-red-500 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/30">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  <Skull size={40} className="text-red-500" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-red-500 font-mono">⚠️ MALWARE DETECTED ⚠️</h2>
                  <p className="text-red-400/80 text-sm font-mono">Unauthorized access attempt in progress</p>
                </div>
              </div>

              {/* Device Details */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDeviceDetails(!showDeviceDetails)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-3 font-mono text-sm"
                >
                  <Fingerprint size={16} />
                  <span>{showDeviceDetails ? '▼ Hide' : '▶ Show'} Device Information</span>
                </button>
                
                {showDeviceDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/80 rounded-lg p-4 border border-red-500/30 font-mono text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-red-400">Serial Number:</div>
                      <div className="text-red-300 font-bold">{deviceInfo.serialNumber}</div>
                      
                      <div className="text-red-400">Motherboard:</div>
                      <div className="text-red-300">{deviceInfo.motherboard}</div>
                      
                      <div className="text-red-400">CPU:</div>
                      <div className="text-red-300">{deviceInfo.cpu}</div>
                      
                      <div className="text-red-400">RAM:</div>
                      <div className="text-red-300">{deviceInfo.ram}</div>
                      
                      <div className="text-red-400">OS Version:</div>
                      <div className="text-red-300">{deviceInfo.osVersion}</div>
                      
                      <div className="text-red-400">IP Address:</div>
                      <div className="text-red-300">{deviceInfo.ipAddress}</div>
                      
                      <div className="text-red-400">MAC Address:</div>
                      <div className="text-red-300">{deviceInfo.macAddress}</div>
                      
                      <div className="text-red-400">Antivirus:</div>
                      <div className="text-red-300 animate-pulse">{deviceInfo.antivirus}</div>
                      
                      <div className="text-red-400">Firewall:</div>
                      <div className="text-red-300 animate-pulse">{deviceInfo.firewall}</div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-red-500/20">
                      <div className="text-red-400 mb-1">Profile Image URL:</div>
                      <div className="flex items-center gap-2">
                        <img src={deviceInfo.imageUrl} alt="Device" className="w-10 h-10 rounded border border-red-500" crossOrigin="anonymous" />
                        <code className="text-red-300 text-xs break-all">{deviceInfo.imageUrl}</code>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Warning Message */}
              <motion.div
                animate={{ backgroundColor: ['rgba(220,38,38,0.1)', 'rgba(220,38,38,0.3)', 'rgba(220,38,38,0.1)'] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-red-950/30 border-l-4 border-red-500 p-3 mb-4 rounded"
              >
                <p className="text-red-300 text-sm font-mono">
                  ⚠️ A malicious software is attempting to infect your device. Your personal data, files, and privacy are at risk. 
                  All device information including serial number, IP address, and MAC address has been compromised.
                </p>
              </motion.div>

              {/* Custom File Selection */}
              <div className="mb-4">
                <label className="text-red-400 text-sm font-mono block mb-2 flex items-center gap-2">
                  <HardDrive size={14} />
                  Select malware payload size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {fileOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFileCountSelect(opt.value, opt.size)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedFileCount === opt.value && opt.value !== 'custom'
                          ? 'bg-red-600 text-white border-red-400'
                          : opt.value === 'custom' && selectedFileCount === 0
                          ? 'bg-red-600 text-white'
                          : 'bg-red-950/50 text-red-400 border border-red-500/30 hover:bg-red-900/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                
                {selectedFileCount === 0 && (
                  <div className="mt-3 flex gap-3">
                    <input
                      type="number"
                      placeholder="Custom file count"
                      onChange={(e) => setSelectedFileCount(parseInt(e.target.value) || 0)}
                      className="flex-1 bg-black border border-red-500 rounded-lg px-3 py-2 text-red-300 text-sm font-mono"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Size (GB)"
                      onChange={(e) => setCustomFileSize(parseFloat(e.target.value) || 0)}
                      className="flex-1 bg-black border border-red-500 rounded-lg px-3 py-2 text-red-300 text-sm font-mono"
                    />
                  </div>
                )}
                
                {selectedFileCount > 0 && (
                  <p className="text-red-400/70 text-xs font-mono mt-2">
                    Payload: {selectedFileCount.toLocaleString()} files • {customFileSize}GB data
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMalwareModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-mono py-2 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMalwareConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={16} />
                  Confirm Infection
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation with Logs */}
      <AnimatePresence>
        {malwareConfirmed && !malwareComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-b from-red-950 to-black border-2 border-red-500 rounded-2xl p-6 max-w-2xl w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Terminal size={32} className="text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-red-500 font-mono">INJECTING MALWARE...</h3>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-red-400 font-mono mb-1">
                  <span>Deploying payload</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="w-full bg-red-950 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-red-500 h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
              
              {/* File Size Display */}
              <div className="bg-black/80 rounded-lg p-3 mb-3 border border-red-500/30">
                <div className="flex justify-between text-xs font-mono text-red-400">
                  <span>📁 Target Files: {selectedFileCount.toLocaleString()}</span>
                  <span>💾 Data Size: {customFileSize}GB</span>
                </div>
              </div>
              
              {/* Live Logs */}
              <div className="bg-black/90 rounded-lg p-3 h-64 overflow-y-auto font-mono text-xs">
                <AnimatePresence>
                  {loadingLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 mb-1"
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loadingLogs.length === 0 && (
                  <div className="text-red-500/50 animate-pulse">Initializing connection...</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {malwareComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, rotateX: -90 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-red-950 via-black to-red-950 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Skull size={80} className="text-red-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-red-500 font-mono mb-2">DEVICE COMPROMISED!</h2>
              <p className="text-red-400 mb-4 font-mono text-sm">
                Malware successfully deployed on this device
              </p>
              <div className="bg-black/80 p-3 rounded-lg mb-4 text-left">
                <p className="text-red-400 text-xs font-mono">📊 Infection Report:</p>
                <p className="text-red-300 text-xs font-mono mt-1">• Files infected: {selectedFileCount.toLocaleString()}</p>
                <p className="text-red-300 text-xs font-mono">• Data stolen: {customFileSize}GB</p>
                <p className="text-red-300 text-xs font-mono">• Serial Number: {deviceInfo.serialNumber}</p>
                <p className="text-red-300 text-xs font-mono">• Backdoor port: {Math.floor(Math.random() * 65535)}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg font-mono transition-colors"
              >
                Close (System Already Breached)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original Chat UI */}
      {!showMalwareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full flex gap-4"
        >
          {/* Desktop Users Sidebar */}
          <div className="w-72 hidden lg:flex flex-col bg-gray-900/50 rounded-xl backdrop-blur-sm p-4">
            <h3 className="text-white font-bold mb-3">Online Users ({onlineCount})</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedUser === user.id ? 'bg-emerald-500/20' : 'hover:bg-gray-800'
                  }`}
                >
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" crossOrigin="anonymous" />
                  <div>
                    <p className="text-white text-sm">{user.name}</p>
                    <p className={`text-xs ${user.status === 'online' ? 'text-green-400' : 'text-gray-500'}`}>
                      {user.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/50 to-black/50 p-3 sm:p-4 backdrop-blur-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <span className="text-white font-bold">MC</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-bold text-white truncate">MiChat</h1>
                  <p className="text-xs text-emerald-400/60">Group Chat • {onlineCount} Online</p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileUsers(!showMobileUsers)}
                className="lg:hidden p-2 rounded-lg hover:bg-emerald-500/10 transition-colors flex-shrink-0"
              >
                {showMobileUsers ? (
                  <X size={20} className="text-emerald-400" />
                ) : (
                  <Menu size={20} className="text-emerald-400" />
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
                  className="mb-3 lg:hidden bg-gray-900 rounded-xl p-4"
                >
                  <div className="space-y-2">
                    {users.map(user => (
                      <div
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user.id);
                          setShowMobileUsers(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800"
                      >
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" crossOrigin="anonymous" />
                        <div>
                          <p className="text-white text-sm">{user.name}</p>
                          <p className={`text-xs ${user.status === 'online' ? 'text-green-400' : 'text-gray-500'}`}>
                            {user.status === 'online' ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-4 bg-black/30 rounded-xl">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.userId === currentUser.uid ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.userId === currentUser.uid
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.userId !== currentUser.uid && (
                      <p className="text-xs text-emerald-400 mb-1">{message.userName}</p>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-400 text-sm">Someone is typing...</div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                onFocus={handleTyping}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
