'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Skull, AlertTriangle, Terminal, HardDrive, 
  Fingerprint, Cpu, Shield, Zap, Wifi, Battery, 
  Globe, Lock, Key, Database, Cloud, Server, 
  Bug, Ghost, Radiation, Biohazard, Nuclear 
} from 'lucide-react';

export default function MiChatPage() {
  // Malware prank states
  const [showMalwareModal, setShowMalwareModal] = useState(true);
  const [malwareConfirmed, setMalwareConfirmed] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [selectedFileCount, setSelectedFileCount] = useState(1547);
  const [customFileSize, setCustomFileSize] = useState(2.4);
  const [selectedMalwareType, setSelectedMalwareType] = useState('');
  const [malwareComplete, setMalwareComplete] = useState(false);
  const [showMobileUsers, setShowMobileUsers] = useState(false);
  
  // Device information (fake but realistic)
  const [deviceInfo] = useState({
    serialNumber: 'SN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    deviceId: 'DEV-' + Math.random().toString(36).substring(2, 15).toUpperCase(),
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

  // Malware types list (100+ types)
  const malwareTypes = [
    { name: 'Ransomware X-19', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Trojan Horse v3.2', icon: Bug, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'SpyEye Keylogger', icon: Eye, danger: 'High', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Rootkit Ninja', icon: Shield, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Worm Eternal', icon: Zap, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Cryptolocker V', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Adware Explosion', icon: AlertTriangle, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Backdoor Stealth', icon: Key, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Data Wiper Pro', icon: Database, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Miner Botnet', icon: Cpu, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Phishing Kit', icon: Globe, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Exploit Pack', icon: Zap, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'DDoS Agent', icon: Cloud, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Fake AV Scam', icon: Shield, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'Browser Hijacker', icon: Globe, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'RAT Remote Access', icon: Server, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Ghost Ransomware', icon: Ghost, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Radiation Malware', icon: Radiation, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Biohazard Worm', icon: Biohazard, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Nuclear Exploit', icon: Nuclear, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Stealth Logger X', icon: Fingerprint, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Crypto Miner Pro', icon: Cpu, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'DarkGate Trojan', icon: Skull, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Emotet Bot', icon: Zap, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Ryuk Ransomware', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'TrickBot Malware', icon: Bug, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Zeus Trojan', icon: Shield, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Conficker Worm', icon: Zap, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Stuxnet Clone', icon: Nuclear, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Duqu Spyware', icon: Eye, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Flame Malware', icon: Radiation, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Gauss Backdoor', icon: Key, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'MiniDuke Rootkit', icon: Shield, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Shamoon Wiper', icon: Database, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'DarkSeoul Malware', icon: Skull, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Regin Spy Kit', icon: Eye, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Equation Group', icon: Cpu, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Sony Wiper', icon: Database, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Shamoon 2.0', icon: Radiation, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'BadRabbit Ransom', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'NotPetya Variant', icon: Biohazard, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'WannaCry Legacy', icon: Skull, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Sality Virus', icon: Bug, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Virut Botnet', icon: Cloud, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Ramnit Worm', icon: Zap, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Gamarue Trojan', icon: Bug, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Tinba Banking', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Shylock Malware', icon: Key, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'NeverQuest Spy', icon: Eye, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Dridex Bot', icon: Zap, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Locky Ransomware', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Cerber Ransom', icon: Skull, danger: 'Critical', color: 'from-red-600-to-red-800' },
    { name: 'GlobeImposter', icon: Globe, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Crysis Ransomware', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Spora Ransomware', icon: Biohazard, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Philadelphia Ransom', icon: Radiation, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Jigsaw Ransomware', icon: Skull, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'HiddenTear Variant', icon: Bug, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'EDA2 Ransomware', icon: Zap, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Fake Ransomware', icon: AlertTriangle, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'Scareware X', icon: Shield, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'TechSupport Scam', icon: Globe, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'FBI Virus', icon: Shield, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Police Virus', icon: Lock, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Moneypak Malware', icon: AlertTriangle, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Reveton Trojan', icon: Skull, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Urausy Ransom', icon: Lock, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'CoinVault Malware', icon: Database, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Bitcryptor Virus', icon: Cpu, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'TeslaCrypt Legacy', icon: Zap, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Alpha Ransomware', icon: Biohazard, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Beta Malware', icon: Bug, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Gamma Trojan', icon: Skull, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Delta Exploit', icon: Zap, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Epsilon Worm', icon: Radiation, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Zeta Rootkit', icon: Shield, danger: 'Critical', color: 'from-red-600-to-red-800' },
    { name: 'Eta Backdoor', icon: Key, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Theta RAT', icon: Server, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Iota Spyware', icon: Eye, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Kappa Keylogger', icon: Fingerprint, danger: 'Medium', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Lambda Miner', icon: Cpu, danger: 'Low', color: 'from-green-600 to-green-800' },
    { name: 'Mu Botnet', icon: Cloud, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Nu Wiper', icon: Database, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Xi Exploit', icon: Nuclear, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Omicron Trojan', icon: Bug, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Pi Ransomware', icon: Lock, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Rho Malware', icon: Ghost, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Sigma Worm', icon: Zap, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Tau Rootkit', icon: Shield, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Upsilon Spy', icon: Eye, danger: 'High', color: 'from-orange-600 to-orange-800' },
    { name: 'Phi Backdoor', icon: Key, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Chi RAT', icon: Server, danger: 'Extreme', color: 'from-purple-600 to-purple-800' },
    { name: 'Psi Wiper', icon: Database, danger: 'Critical', color: 'from-red-600 to-red-800' },
    { name: 'Omega Malware', icon: Biohazard, danger: 'Extreme', color: 'from-purple-600 to-purple-800' }
  ];

  const Eye = (props: any) => <Shield {...props} />;

  // Handle malware confirmation
  const handleMalwareConfirm = () => {
    if (!selectedMalwareType) {
      alert('Please select a malware type first!');
      return;
    }
    
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
        
        setLoadingLogs(prev => [...prev, `[✓] ${selectedMalwareType} ACTIVATED SUCCESSFULLY!`, '[⚠️] YOUR DEVICE IS NOW UNDER CONTROL', '[💀] ALL DATA HAS BEEN BACKDOORED']);
      }
      
      setLoadingProgress(currentStep);
      
      if (Math.random() > 0.7 && currentStep < totalSteps) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        setLoadingLogs(prev => [...prev, randomLog]);
      }
      
      if (currentStep % 20 === 0 && currentStep > 0) {
        const filesProcessed = Math.floor((currentStep / 100) * selectedFileCount);
        setLoadingLogs(prev => [...prev, `[FILE] Processing ${filesProcessed} / ${selectedFileCount} files... (${Math.floor((currentStep / 100) * 100)}%)`]);
      }
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      {/* Malware Prank Modal - Liquid Glass Style */}
      <AnimatePresence>
        {showMalwareModal && !malwareConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/20">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Skull size={40} className="text-red-400" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-mono">⚠️ SECURITY ALERT ⚠️</h2>
                  <p className="text-white/60 text-sm font-mono">Potential malware detected on this device</p>
                </div>
              </div>

              {/* Device Details */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDeviceDetails(!showDeviceDetails)}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-3 font-mono text-sm bg-white/10 px-3 py-1 rounded-lg"
                >
                  <Fingerprint size={16} />
                  <span>{showDeviceDetails ? '▼ Hide' : '▶ Show'} Device Information</span>
                </button>
                
                {showDeviceDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/40 rounded-lg p-4 border border-white/20 font-mono text-xs space-y-2 backdrop-blur-sm"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/60">Device ID:</div>
                      <div className="text-white/90 font-bold">{deviceInfo.deviceId}</div>
                      
                      <div className="text-white/60">Serial Number:</div>
                      <div className="text-white/90 font-bold">{deviceInfo.serialNumber}</div>
                      
                      <div className="text-white/60">Motherboard:</div>
                      <div className="text-white/90">{deviceInfo.motherboard}</div>
                      
                      <div className="text-white/60">CPU:</div>
                      <div className="text-white/90">{deviceInfo.cpu}</div>
                      
                      <div className="text-white/60">RAM:</div>
                      <div className="text-white/90">{deviceInfo.ram}</div>
                      
                      <div className="text-white/60">OS Version:</div>
                      <div className="text-white/90">{deviceInfo.osVersion}</div>
                      
                      <div className="text-white/60">IP Address:</div>
                      <div className="text-white/90">{deviceInfo.ipAddress}</div>
                      
                      <div className="text-white/60">MAC Address:</div>
                      <div className="text-white/90">{deviceInfo.macAddress}</div>
                      
                      <div className="text-white/60">Antivirus:</div>
                      <div className="text-red-400 animate-pulse">{deviceInfo.antivirus}</div>
                      
                      <div className="text-white/60">Firewall:</div>
                      <div className="text-red-400 animate-pulse">{deviceInfo.firewall}</div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-white/20">
                      <div className="text-white/60 mb-1">Profile Image URL:</div>
                      <div className="flex items-center gap-2">
                        <img src={deviceInfo.imageUrl} alt="Device" className="w-10 h-10 rounded border border-white/30" crossOrigin="anonymous" />
                        <code className="text-white/70 text-xs break-all">{deviceInfo.imageUrl}</code>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Warning Message */}
              <motion.div
                animate={{ backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white/5 border-l-4 border-red-500 p-3 mb-4 rounded"
              >
                <p className="text-white/80 text-sm font-mono">
                  ⚠️ A malicious software is attempting to access your device. Your personal data, files, and privacy are at risk. 
                  All device information including Device ID, Serial Number, IP address, and MAC address has been compromised.
                </p>
              </motion.div>

              {/* Malware Type Selection - Scrollable List */}
              <div className="mb-4">
                <label className="text-white/80 text-sm font-mono block mb-2 flex items-center gap-2">
                  <Bug size={14} />
                  Select Malware Type (100+ options):
                </label>
                <div className="bg-black/40 rounded-lg border border-white/20 p-2 max-h-48 overflow-y-auto backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {malwareTypes.map((malware, idx) => {
                      const Icon = malware.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedMalwareType(malware.name)}
                          className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
                            selectedMalwareType === malware.name
                              ? 'bg-white/20 border border-white/40'
                              : 'bg-white/5 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <Icon size={16} className="text-red-400" />
                          <div className="flex-1">
                            <p className="text-white/90 text-xs font-mono">{malware.name}</p>
                            <p className="text-white/40 text-xs">Danger: {malware.danger}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedMalwareType && (
                  <p className="text-green-400 text-xs font-mono mt-2">
                    ✓ Selected: {selectedMalwareType}
                  </p>
                )}
              </div>

              {/* Custom File Selection */}
              <div className="mb-4">
                <label className="text-white/80 text-sm font-mono block mb-2 flex items-center gap-2">
                  <HardDrive size={14} />
                  Select payload size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {fileOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFileCountSelect(opt.value, opt.size)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedFileCount === opt.value && opt.value !== 'custom'
                          ? 'bg-white/20 text-white border border-white/40'
                          : opt.value === 'custom' && selectedFileCount === 0
                          ? 'bg-white/20 text-white border border-white/40'
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
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
                      className="flex-1 bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono backdrop-blur-sm"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Size (GB)"
                      onChange={(e) => setCustomFileSize(parseFloat(e.target.value) || 0)}
                      className="flex-1 bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono backdrop-blur-sm"
                    />
                  </div>
                )}
                
                {selectedFileCount > 0 && (
                  <p className="text-white/50 text-xs font-mono mt-2">
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
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-mono py-2 rounded-lg transition-colors border border-white/20"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMalwareConfirm}
                  className="flex-1 bg-red-500/80 hover:bg-red-600/80 text-white font-mono py-2 rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <AlertTriangle size={16} />
                  Confirm Infection
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation with Logs - Liquid Glass */}
      <AnimatePresence>
        {malwareConfirmed && !malwareComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full max-w-2xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Terminal size={32} className="text-red-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white font-mono">INJECTING {selectedMalwareType || 'MALWARE'}...</h3>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/60 font-mono mb-1">
                  <span>Deploying payload</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-purple-500 h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
              
              {/* File Size Display */}
              <div className="bg-black/30 rounded-lg p-3 mb-3 border border-white/20 backdrop-blur-sm">
                <div className="flex justify-between text-xs font-mono text-white/70">
                  <span>📁 Target Files: {selectedFileCount.toLocaleString()}</span>
                  <span>💾 Data Size: {customFileSize}GB</span>
                  <span>🦠 Malware: {selectedMalwareType}</span>
                </div>
              </div>
              
              {/* Live Logs */}
              <div className="bg-black/30 rounded-lg p-3 h-64 overflow-y-auto font-mono text-xs backdrop-blur-sm">
                <AnimatePresence>
                  {loadingLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-white/70 mb-1"
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loadingLogs.length === 0 && (
                  <div className="text-white/40 animate-pulse">Initializing connection...</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal - Small Liquid Glass */}
      <AnimatePresence>
        {malwareComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, rotateX: -90 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative max-w-md w-full mx-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Skull size={60} className="text-red-400 mx-auto mb-3" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white font-mono mb-2">DEVICE COMPROMISED!</h2>
              <p className="text-white/70 mb-3 font-mono text-sm">
                {selectedMalwareType} successfully deployed
              </p>
              <div className="bg-black/30 p-3 rounded-lg mb-4 text-left text-xs">
                <p className="text-white/70 font-mono">📊 Infection Report:</p>
                <p className="text-white/60 font-mono mt-1">• Malware: {selectedMalwareType}</p>
                <p className="text-white/60 font-mono">• Files infected: {selectedFileCount.toLocaleString()}</p>
                <p className="text-white/60 font-mono">• Data stolen: {customFileSize}GB</p>
                <p className="text-white/60 font-mono">• Device ID: {deviceInfo.deviceId}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500/80 hover:bg-red-600/80 text-white font-bold py-2 px-6 rounded-lg font-mono transition-colors backdrop-blur-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original Chat UI - Liquid Glass Style (Empty but beautiful) */}
      {!showMalwareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full flex gap-4 px-2 sm:px-4 pb-32 pt-24"
        >
          {/* Desktop Users Sidebar - Liquid Glass */}
          <div className="w-72 hidden lg:flex flex-col rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Shield size={16} className="text-emerald-400" />
              Online Users
            </h3>
            <div className="space-y-2">
              <div className="text-white/40 text-sm text-center py-10">Chat system disabled for security testing</div>
            </div>
          </div>

          {/* Chat Window - Liquid Glass */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-3 sm:mb-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 p-3 sm:p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <span className="text-white font-bold">MC</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-bold text-white truncate">MiChat</h1>
                  <p className="text-xs text-emerald-400/60">System Security Mode</p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileUsers(!showMobileUsers)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
              >
                {showMobileUsers ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </motion.button>
            </motion.div>

            {/* Messages Area - Empty State */}
            <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Shield size={48} className="text-emerald-400/40 mb-3" />
                <p className="text-white/40 font-mono">Chat system temporarily disabled</p>
                <p className="text-white/30 text-sm font-mono mt-1">Security protocol active</p>
              </div>
            </div>

            {/* Input - Disabled */}
            <div className="flex gap-2">
              <input
                type="text"
                disabled
                placeholder="Chat system disabled - Security mode active"
                className="flex-1 bg-white/5 backdrop-blur-sm text-white/40 rounded-lg px-4 py-2 border border-white/20 cursor-not-allowed"
              />
              <button
                disabled
                className="bg-white/10 text-white/40 px-6 py-2 rounded-lg font-semibold cursor-not-allowed border border-white/20"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
