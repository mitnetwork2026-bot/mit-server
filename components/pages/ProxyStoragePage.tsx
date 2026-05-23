"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, Lock, Folder, FileText, Sparkles, Zap, Shield, Crown, Diamond, Star, Key, Upload, CheckCircle, XCircle, Loader2, History, Cloud, Database, Terminal, Cpu, Globe, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProxyBackground from "../ProxyBackground";

const CLOUD_PROVIDERS = [
  { name: "AWS S3", icon: "☁️", size: "156 GB" },
  { name: "Google Cloud", icon: "🌐", size: "98 GB" },
  { name: "Microsoft Azure", icon: "◆", size: "204 GB" },
  { name: "Dropbox", icon: "📦", size: "45 GB" },
  { name: "OneDrive", icon: "📁", size: "78 GB" },
  { name: "iCloud", icon: "🍎", size: "124 GB" },
  { name: "Yandex Disk", icon: "Я", size: "89 GB" },
  { name: "Mail.ru Cloud", icon: "M", size: "156 GB" },
  { name: "MEGA", icon: "⬆️", size: "102 GB" },
  { name: "Proton Drive", icon: "P", size: "67 GB" },
  { name: "Nextcloud", icon: "↗️", size: "234 GB" },
  { name: "Seafile", icon: "🔐", size: "145 GB" },
  { name: "Synology", icon: "◯", size: "512 GB" },
  { name: "FTP Server", icon: "📡", size: "378 GB" },
  { name: "SFTP Backup", icon: "🔒", size: "267 GB" },
  { name: "B2 Storage", icon: "B", size: "189 GB" },
  { name: "Wasabi", icon: "W", size: "234 GB" },
  { name: "Backblaze", icon: "⛅", size: "456 GB" },
  { name: "IDrive", icon: "I", size: "123 GB" },
  { name: "Crashplan", icon: "💾", size: "389 GB" },
  { name: "Acronis", icon: "A", size: "567 GB" },
  { name: "OpenStack", icon: "🔲", size: "789 GB" },
  { name: "DigitalOcean Spaces", icon: "D", size: "234 GB" },
];

// AI Models
const AI_MODELS = [
  { id: "michat-2.5-mini", name: "MiChat 2.5 Mini", tier: "free", price: 0, days: 0, oldPrice: 0, animation: "bronze", features: ["Basic AI Chat", "Standard Response Time", "1 Concurrent Request", "Community Support"] },
  { id: "michat-nano", name: "MiChat Nano", tier: "premium", price: 85, days: 3, oldPrice: 95, animation: "silver", features: ["Advanced AI Chat", "Faster Response Time", "3 Concurrent Requests", "Priority Support", "API Access (Limited)"] },
  { id: "michat-3.0-pro", name: "MiChat 3.0 Pro", tier: "premium", price: 165, days: 7, oldPrice: 185, animation: "fire", features: ["Pro AI Chat", "Very Fast Response", "10 Concurrent Requests", "24/7 Premium Support", "Full API Access", "Advanced Analytics"] },
  { id: "michat-max", name: "MiChat Max", tier: "premium", price: 290, days: 15, oldPrice: 300, animation: "dark", features: ["Max AI Power", "Ultra-Fast Response", "Unlimited Concurrent", "Dedicated Support Agent", "Enterprise API", "Custom Integrations", "Advanced Security"] },
  { id: "michat-3.5-ultra", name: "MiChat 3.5 Ultra", tier: "premium", price: 545, days: 20, oldPrice: 595, animation: "gold", features: ["Ultimate AI", "Instant Response", "Unlimited Everything", "24/7 Dedicated Team", "Full Enterprise Suite", "Custom AI Training", "SLA Guarantee 99.99%"] },
];

// Animation styles for each tier
const getTierAnimation = (animation: string) => {
  switch(animation) {
    case "bronze":
      return "shadow-amber-600/50 ring-amber-500/50 bg-gradient-to-r from-amber-900/40 to-amber-800/40";
    case "silver":
      return "shadow-gray-400/50 ring-gray-300/50 bg-gradient-to-r from-gray-800/40 to-gray-700/40";
    case "fire":
      return "shadow-orange-600/50 ring-orange-500/50 bg-gradient-to-r from-orange-900/40 to-red-800/40 animate-pulse-glow";
    case "dark":
      return "shadow-purple-800/50 ring-purple-600/50 bg-gradient-to-r from-purple-950/40 to-indigo-900/40";
    case "gold":
      return "shadow-yellow-500/50 ring-yellow-400/50 bg-gradient-to-r from-yellow-900/40 to-amber-700/40";
    default:
      return "shadow-blue-600/50 ring-blue-500/50 bg-gradient-to-r from-blue-900/40 to-blue-800/40";
  }
};

interface UploadHistoryItem {
  id: string;
  fileName: string;
  fileSize: string;
  fileSizeBytes: number;
  timestamp: string;
  aiModel: string;
  status: "completed" | "failed";
}

export default function ProxyStoragePage() {
  const [providers] = useState(
    CLOUD_PROVIDERS.sort(() => Math.random() - 0.5).slice(0, 20 + Math.floor(Math.random() * 5))
  );
  
  // AI Selection State - Default to free tier
  const [selectedAIModel, setSelectedAIModel] = useState<string>("michat-2.5-mini");
  const [selectedAnimation, setSelectedAnimation] = useState<string>("bronze");
  const [showPayPopup, setShowPayPopup] = useState(false);
  const [selectedPayModel, setSelectedPayModel] = useState<any>(null);
  const [showAccessKeyPopup, setShowAccessKeyPopup] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [authorizedModelId, setAuthorizedModelId] = useState<string | null>(null);
  
  // Upload State
  const [fileId, setFileId] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([]);
  const [showFileIdError, setShowFileIdError] = useState(false);
  
  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthorized");
    const savedAuthModel = localStorage.getItem("authorizedModelId");
    const savedConnected = localStorage.getItem("isConnected");
    
    if (savedAuth === "true" && savedAuthModel) {
      setIsAuthorized(true);
      setAuthorizedModelId(savedAuthModel);
      // Check if the authorized model is not free and set it as selected
      const model = AI_MODELS.find(m => m.id === savedAuthModel);
      if (model && model.tier === "premium") {
        setSelectedAIModel(savedAuthModel);
        setSelectedAnimation(model.animation);
        localStorage.setItem("selectedAIModel", savedAuthModel);
        localStorage.setItem("selectedAnimation", model.animation);
      }
    } else {
      // Ensure free tier is selected by default if no paid authorization
      setSelectedAIModel("michat-2.5-mini");
      setSelectedAnimation("bronze");
      localStorage.setItem("selectedAIModel", "michat-2.5-mini");
      localStorage.setItem("selectedAnimation", "bronze");
    }
    
    if (savedConnected === "true" && savedAuth === "true") {
      setIsConnected(true);
    }
  }, []);
  
  // Handle AI Model Selection - Only free tier can be selected directly
  const handleAISelect = (model: any) => {
    // If free tier, select immediately
    if (model.tier === "free") {
      // Clear any premium selection but keep authorization
      setSelectedAIModel(model.id);
      setSelectedAnimation(model.animation);
      localStorage.setItem("selectedAIModel", model.id);
      localStorage.setItem("selectedAnimation", model.animation);
      // Don't clear isConnected, just update
      if (isConnected) {
        // Keep connected state
      }
    } 
    // If premium tier, check if already authorized for this specific model
    else if (model.tier === "premium") {
      // If already authorized for this exact model, select it
      if (isAuthorized && authorizedModelId === model.id) {
        setSelectedAIModel(model.id);
        setSelectedAnimation(model.animation);
        localStorage.setItem("selectedAIModel", model.id);
        localStorage.setItem("selectedAnimation", model.animation);
      } 
      // Otherwise, start payment flow
      else {
        setSelectedPayModel(model);
        setShowPayPopup(true);
      }
    }
  };
  
  // Handle Payment Confirmation - opens access key popup
  const handlePaymentConfirm = () => {
    setShowPayPopup(false);
    setShowAccessKeyPopup(true);
  };
  
  // Handle Access Key Authorization
  const handleAuthorize = () => {
    if (accessKey === "OBROMIT@") {
      setIsAuthorizing(true);
      setTimeout(() => {
        setIsAuthorizing(false);
        setIsAuthorized(true);
        setAuthorizedModelId(selectedPayModel.id);
        
        // Store authorization
        localStorage.setItem("isAuthorized", "true");
        localStorage.setItem("authorizedModelId", selectedPayModel.id);
        
        // Now select the paid model (replace free tier)
        setSelectedAIModel(selectedPayModel.id);
        setSelectedAnimation(selectedPayModel.animation);
        localStorage.setItem("selectedAIModel", selectedPayModel.id);
        localStorage.setItem("selectedAnimation", selectedPayModel.animation);
        
        // Reset connection state since model changed
        setIsConnected(false);
        localStorage.removeItem("isConnected");
        
        setShowAccessKeyPopup(false);
        setAccessKey("");
        
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className = "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold animate-bounce-in";
        successDiv.innerText = `✅ ${selectedPayModel.name} Activated Successfully!`;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
      }, 2000);
    } else {
      const errorDiv = document.createElement("div");
      errorDiv.className = "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold";
      errorDiv.innerText = `❌ Invalid Access Key! Please enter the correct key.`;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }
  };
  
  // Handle Connect
  const handleConnect = () => {
    if (!selectedAIModel) {
      alert("Please select an AI model first!");
      return;
    }
    
    const model = AI_MODELS.find(m => m.id === selectedAIModel);
    if (model?.tier === "premium" && (!isAuthorized || authorizedModelId !== selectedAIModel)) {
      alert("Please complete payment and authorization for this AI model first!");
      return;
    }
    
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      localStorage.setItem("isConnected", "true");
    }, 25000);
  };
  
  // Handle Upload
  const handleUpload = () => {
    if (!isConnected) {
      alert("Please connect to an AI model first!");
      return;
    }
    if (!fileId.trim()) {
      setShowFileIdError(true);
      setTimeout(() => setShowFileIdError(false), 3000);
      return;
    }
    if (!fileSize.trim() || isNaN(parseInt(fileSize))) {
      alert("Please enter a valid file size (in MB)");
      return;
    }
    
    const sizeInMB = parseInt(fileSize);
    const uploadTime = Math.min(25, Math.max(2, Math.floor(sizeInMB / 10)));
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          const newHistory: UploadHistoryItem = {
            id: Date.now().toString(),
            fileName: fileId,
            fileSize: `${sizeInMB} MB`,
            fileSizeBytes: sizeInMB * 1024 * 1024,
            timestamp: new Date().toLocaleString(),
            aiModel: selectedAIModel || "Unknown",
            status: "completed"
          };
          setUploadHistory(prev => [newHistory, ...prev]);
          
          setFileId("");
          setFileSize("");
          
          return 100;
        }
        return prev + (100 / (uploadTime * 10));
      });
    }, 100);
  };
  
  // Get animation class for selected model display
  const getSelectedModelAnimation = () => {
    if (!selectedAnimation) return "";
    switch(selectedAnimation) {
      case "bronze": return "shadow-amber-500/40 ring-amber-400/30 bg-amber-500/10";
      case "silver": return "shadow-gray-400/40 ring-gray-300/30 bg-gray-400/10";
      case "fire": return "shadow-orange-500/40 ring-orange-400/30 bg-orange-500/10 animate-pulse-glow";
      case "dark": return "shadow-purple-500/40 ring-purple-400/30 bg-purple-500/10";
      case "gold": return "shadow-yellow-500/40 ring-yellow-400/30 bg-yellow-500/10";
      default: return "shadow-blue-500/40 ring-blue-400/30 bg-blue-500/10";
    }
  };
  
  // Check if a model is selectable (free OR paid & authorized)
  const isModelSelectable = (model: any) => {
    if (model.tier === "free") return true;
    return isAuthorized && authorizedModelId === model.id;
  };
  
  // Check if a model is active (currently selected)
  const isModelActive = (model: any) => {
    return selectedAIModel === model.id;
  };
  
  // Get model status text
  const getModelStatus = (model: any) => {
    if (model.tier === "free") return "Free";
    if (isAuthorized && authorizedModelId === model.id) return "✓ Purchased";
    return `$${model.price}`;
  };
  
  return (
    <ProxyBackground>
      <div className="min-h-screen px-4 pb-24 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-700 shadow-xl shadow-blue-400/30"
          >
            <HardDrive size={40} className="text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Storage</h1>
          <p className="mt-2 text-sm text-blue-400/60">{providers.length} Cloud Providers Detected</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-3"
        >
          {/* Storage Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-blue-400/60">Total Storage</p>
                <p className="mt-1 text-lg font-bold text-blue-400">
                  {providers.reduce((acc, p) => acc + parseInt(p.size), 0)} GB
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-400/60">Providers</p>
                <p className="mt-1 text-lg font-bold text-blue-400">{providers.length}</p>
              </div>
              <div>
                <p className="text-xs text-blue-400/60">Status</p>
                <p className="mt-1 text-lg font-bold text-green-400">Active</p>
              </div>
            </div>
          </motion.div>
          
          {/* AI Model Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={18} className="text-blue-400" />
              <h3 className="font-semibold text-white">AI Intelligence Model</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {AI_MODELS.map((model, i) => {
                const isSelectable = isModelSelectable(model);
                const isActive = isModelActive(model);
                
                return (
                  <motion.button
                    key={model.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    onClick={() => handleAISelect(model)}
                    className={`relative rounded-lg border p-3 text-center transition-all duration-300 ${
                      isActive
                        ? `${getTierAnimation(model.animation)} border-transparent ring-2 scale-105`
                        : !isSelectable && model.tier === "premium"
                        ? "border-blue-400/20 bg-blue-600/10 opacity-60 cursor-pointer hover:opacity-80"
                        : "border-blue-400/20 bg-blue-600/20 hover:bg-blue-600/30 hover:scale-102"
                    }`}
                  >
                    {model.tier === "free" && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-green-500 text-white">FREE</span>
                    )}
                    {model.tier === "premium" && isAuthorized && authorizedModelId === model.id && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-teal-500 text-white">ACTIVE</span>
                    )}
                    <div className="text-center">
                      <div className="text-lg mb-1">
                        {model.id === "michat-2.5-mini" && <Sparkles size={20} className="mx-auto text-amber-400" />}
                        {model.id === "michat-nano" && <Zap size={20} className="mx-auto text-gray-300" />}
                        {model.id === "michat-3.0-pro" && <Shield size={20} className="mx-auto text-orange-400" />}
                        {model.id === "michat-max" && <Crown size={20} className="mx-auto text-purple-400" />}
                        {model.id === "michat-3.5-ultra" && <Diamond size={20} className="mx-auto text-yellow-400" />}
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{model.name}</p>
                      <p className="text-[10px] text-blue-400/60 mt-1">{getModelStatus(model)}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Selected Model Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 rounded-lg p-3 text-center ${getSelectedModelAnimation()}`}
            >
              <p className="text-xs text-white/80">
                Active AI Model: <span className="font-bold">{AI_MODELS.find(m => m.id === selectedAIModel)?.name}</span>
                {selectedAIModel !== "michat-2.5-mini" && isAuthorized && authorizedModelId === selectedAIModel && (
                  <CheckCircle size={14} className="inline ml-2 text-green-400" />
                )}
                {selectedAIModel === "michat-2.5-mini" && <Sparkles size={14} className="inline ml-2 text-amber-400" />}
              </p>
            </motion.div>
          </motion.div>
          
          {/* Connect Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
          >
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected || (selectedAIModel !== "michat-2.5-mini" && (!isAuthorized || authorizedModelId !== selectedAIModel))}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isConnected
                  ? "bg-green-600/50 cursor-default text-green-300"
                  : isConnecting
                  ? "bg-blue-600/50 cursor-wait text-white"
                  : (selectedAIModel !== "michat-2.5-mini" && (!isAuthorized || authorizedModelId !== selectedAIModel))
                  ? "bg-red-600/50 cursor-not-allowed text-red-300"
                  : "bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-lg hover:shadow-blue-500/50 text-white"
              }`}
            >
              {isConnecting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Connecting to AI Network...
                </>
              ) : isConnected ? (
                <>
                  <CheckCircle size={20} />
                  Connected to {AI_MODELS.find(m => m.id === selectedAIModel)?.name}
                </>
              ) : (
                <>
                  <Database size={20} />
                  Activate AI Connection
                </>
              )}
            </button>
            {isConnecting && (
              <div className="mt-2 h-1 w-full bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
            {selectedAIModel !== "michat-2.5-mini" && (!isAuthorized || authorizedModelId !== selectedAIModel) && (
              <p className="text-xs text-red-400 text-center mt-2">
                ⚠️ Please click on the model and complete payment & authorization first
              </p>
            )}
          </motion.div>
          
          {/* File Upload Section */}
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <Upload size={18} className="text-blue-400" />
                <h3 className="font-semibold text-white">Secure File Upload</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-blue-400/60 block mb-1">File ID / Name</label>
                  <input
                    type="text"
                    value={fileId}
                    onChange={(e) => setFileId(e.target.value)}
                    placeholder="Enter file identifier..."
                    className={`w-full rounded-lg border bg-blue-900/30 px-3 py-2 text-white placeholder:text-blue-400/40 focus:outline-none focus:ring-2 transition-all ${
                      showFileIdError ? "border-red-500 ring-red-500/50" : "border-blue-400/30 focus:ring-blue-500/50"
                    }`}
                  />
                  {showFileIdError && (
                    <p className="text-red-400 text-xs mt-1">Please enter a file ID</p>
                  )}
                </div>
                
                <div>
                  <label className="text-xs text-blue-400/60 block mb-1">File Size (MB)</label>
                  <input
                    type="number"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="Enter file size in MB..."
                    className="w-full rounded-lg border border-blue-400/30 bg-blue-900/30 px-3 py-2 text-white placeholder:text-blue-400/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-400/60">
                      <span>Uploading...</span>
                      <span>{Math.floor(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-900/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Upload History */}
          {uploadHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <History size={18} className="text-blue-400" />
                <h3 className="font-semibold text-white">Upload History</h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {uploadHistory.map((item) => (
                  <div key={item.id} className="rounded-lg border border-blue-400/20 bg-blue-600/20 p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.fileName}</p>
                        <p className="text-xs text-blue-400/60">{item.fileSize} • {item.timestamp}</p>
                        <p className="text-xs text-blue-400/40">AI: {item.aiModel}</p>
                      </div>
                      <CheckCircle size={16} className="text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Cloud Providers Grid */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl">
            <h3 className="mb-3 font-semibold text-white">Connected Cloud Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {providers.map((provider, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="rounded-lg border border-blue-400/20 bg-blue-600/20 p-3 hover:bg-blue-600/30 transition-colors group"
                >
                  <div className="text-center">
                    <p className="text-lg mb-1">{provider.icon}</p>
                    <p className="text-xs font-semibold text-white truncate">{provider.name}</p>
                    <p className="text-xs text-blue-400/60 mt-1">{provider.size}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Storage Categories */}
          <div className="space-y-3">
            {[
              { name: "Primary Backup", size: "2.4 TB", type: "Critical Data" },
              { name: "Cache Layer", size: "512 GB", type: "Temporary" },
              { name: "Archive Storage", size: "1.8 TB", type: "Historical" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {i === 0 ? <Lock size={20} className="text-green-400" /> : <FileText size={20} className="text-blue-400" />}
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-blue-400/60">{item.type}</p>
                    </div>
                  </div>
                  <span className="font-mono text-blue-400">{item.size}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Pay Popup */}
      <AnimatePresence>
        {showPayPopup && selectedPayModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowPayPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative max-w-md w-full rounded-2xl border p-6 shadow-2xl ${getTierAnimation(selectedPayModel.animation)} backdrop-blur-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                {selectedPayModel.id === "michat-nano" && <Zap size={20} className="text-white" />}
                {selectedPayModel.id === "michat-3.0-pro" && <Shield size={20} className="text-white" />}
                {selectedPayModel.id === "michat-max" && <Crown size={20} className="text-white" />}
                {selectedPayModel.id === "michat-3.5-ultra" && <Diamond size={20} className="text-white" />}
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedPayModel.name}</h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-white">${selectedPayModel.price}</span>
                  <span className="text-sm text-white/60 line-through">${selectedPayModel.oldPrice}</span>
                </div>
                <p className="text-sm text-white/60">{selectedPayModel.days} days access</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-white/80">✨ Premium Features:</p>
                {selectedPayModel.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle size={12} className="text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handlePaymentConfirm}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold hover:shadow-lg transition-all"
              >
                Pay ${selectedPayModel.price} → Get Access
              </button>
              
              <button
                onClick={() => {
                  setShowPayPopup(false);
                  setSelectedPayModel(null);
                }}
                className="w-full mt-2 py-2 rounded-lg text-white/60 hover:text-white/80 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Access Key Popup */}
      <AnimatePresence>
        {showAccessKeyPopup && selectedPayModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowAccessKeyPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-md w-full rounded-2xl border border-blue-400/30 bg-blue-950/90 p-6 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <Key size={40} className="mx-auto text-blue-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Enter Access Key</h3>
                <p className="text-sm text-blue-400/60 mt-1">Please provide your unique access key to activate {selectedPayModel.name}</p>
              </div>
              
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter access key..."
                className="w-full rounded-lg border border-blue-400/30 bg-blue-900/50 px-4 py-3 text-white placeholder:text-blue-400/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-4"
                disabled={isAuthorizing}
              />
              
              {isAuthorizing ? (
                <div className="text-center py-4">
                  <Loader2 size={32} className="animate-spin mx-auto text-blue-400 mb-2" />
                  <p className="text-blue-400">Authorizing...</p>
                  <div className="mt-2 h-1 w-full bg-blue-900/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-teal-500"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAuthorize}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  Confirm & Authorize
                </button>
              )}
              
              <button
                onClick={() => {
                  setShowAccessKeyPopup(false);
                  setAccessKey("");
                  setSelectedPayModel(null);
                }}
                className="w-full mt-2 py-2 rounded-lg text-white/60 hover:text-white/80 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.8); }
        }
        @keyframes bounce-in {
          0% { transform: translateX(-50%) scale(0.8); opacity: 0; }
          60% { transform: translateX(-50%) scale(1.05); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s infinite;
        }
      `}</style>
    </ProxyBackground>
  );
}
