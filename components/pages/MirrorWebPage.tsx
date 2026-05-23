"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, ExternalLink, Shield, Lock, Clock, AlertTriangle, X, RotateCcw, CheckCircle, Loader2, Eye, FileText, Database, Zap, RefreshCw, Terminal } from "lucide-react";

const mirrorSites = [
  { id: 1, name: "Mirror Node Alpha", url: "alpha.mirror.net", status: "active", latency: "23ms" },
  { id: 2, name: "Mirror Node Beta", url: "beta.mirror.net", status: "active", latency: "45ms" },
  { id: 3, name: "Mirror Node Gamma", url: "gamma.mirror.net", status: "maintenance", latency: "---" },
  { id: 4, name: "Mirror Node Delta", url: "delta.mirror.net", status: "active", latency: "67ms" },
  { id: 5, name: "Mirror Node Epsilon", url: "epsilon.mirror.net", status: "active", latency: "34ms" },
];

// Helper to check if URL is from postimage.org or postimg.cc
const isPostImageUrl = (url: string): boolean => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.includes('postimage') || hostname.includes('postimg.cc');
  } catch {
    return false;
  }
};

// Extract image ID or path from postimage URL for preview
const extractPostImagePreview = (url: string): string | null => {
  try {
    // Pattern for postimage direct links
    if (url.includes('/i/') || url.includes('postimg.cc')) {
      // For URLs like https://i.postimg.cc/xxx/image.jpg
      if (url.includes('postimg.cc')) {
        return url;
      }
      // For gallery URLs, try to get the actual image
      if (url.includes('/gallery/')) {
        return null;
      }
      return url;
    }
    return null;
  } catch {
    return null;
  }
};

// Simulate log messages
const logMessages = [
  "Initializing secure connection...",
  "Authenticating with mirror nodes...",
  "Establishing encrypted tunnel...",
  "Fetching remote content...",
  "Verifying SSL certificates...",
  "Caching static assets...",
  "Compressing data stream...",
  "Distributing to edge nodes...",
  "Validating integrity hashes...",
  "Building mirror structure...",
  "Syncing with CDN...",
  "Optimizing delivery paths...",
  "Finalizing mirror deployment...",
  "Successfully mirrored all content",
  "Complete - Mirror is now live"
];

const scanningSteps = ["SCANNING", "MIRRORING", "ANALYZING", "ASSEMBLING", "SEARCHING", "FOUND DATA"];

export default function MirrorWebPage() {
  const [searchUrl, setSearchUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepText, setCurrentStepText] = useState("READY");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [errorPopup, setErrorPopup] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [slideShowText, setSlideShowText] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Slideshow text animation
  useEffect(() => {
    const slides = [
      "⚡ Real-time web mirroring",
      "🔒 Encrypted & secure",
      "🌍 Global node network",
      "🚀 CDN accelerated",
      "💎 Instant content caching",
      "🛡️ DDoS protection enabled"
    ];
    let index = 0;
    const interval = setInterval(() => {
      setSlideShowText(slides[index % slides.length]);
      index++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const resetScan = () => {
    setIsScanning(false);
    setProgress(0);
    setCurrentStepIndex(0);
    setCurrentStepText("READY");
    setPreviewImage(null);
    setLogs([]);
    setShowRetryButton(false);
    setErrorPopup({ show: false, message: "" });
    setSearchUrl("");
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const runScanningSteps = async (isValidPostImage: boolean, url: string) => {
    // Step 1: 0% to 5% for validation
    setProgress(0);
    setCurrentStepText("VALIDATING");
    addLog("[✓] Starting mirror process...");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 1; i <= 5; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    
    if (!isValidPostImage) {
      // Error flow
      setCurrentStepText("ERROR");
      addLog("[✗] Invalid URL format detected");
      await new Promise(resolve => setTimeout(resolve, 300));
      addLog("[✗] URL does not match postimage pattern");
      await new Promise(resolve => setTimeout(resolve, 300));
      addLog("[✗] Mirroring failed - Unsupported source");
      setErrorPopup({ show: true, message: `Failed to mirror "${url}"\n\nReason: Only postimage.org and postimg.cc links are supported.\nPlease enter a valid PostImage URL.` });
      setShowRetryButton(true);
      setIsScanning(false);
      return false;
    }
    
    // Valid PostImage URL flow
    addLog("[✓] URL validation passed");
    addLog("[✓] PostImage domain recognized");
    
    // Steps: SCANNING, MIRRORING, ANALYZING, ASSEMBLING, SEARCHING, FOUND DATA
    for (let stepIdx = 0; stepIdx < scanningSteps.length; stepIdx++) {
      setCurrentStepText(scanningSteps[stepIdx]);
      addLog(`[→] ${scanningSteps[stepIdx]}...`);
      
      // Calculate progress for this step (5% to 95%)
      const startProgress = 5 + (stepIdx * 15);
      const endProgress = 5 + ((stepIdx + 1) * 15);
      
      for (let p = startProgress; p <= endProgress; p++) {
        setProgress(p);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      // Special animations for certain steps
      if (scanningSteps[stepIdx] === "ANALYZING") {
        addLog("[→] Checking content structure...");
        await new Promise(resolve => setTimeout(resolve, 200));
        addLog("[→] Verifying image integrity...");
      }
      if (scanningSteps[stepIdx] === "ASSEMBLING") {
        addLog("[→] Gathering mirrored fragments...");
        await new Promise(resolve => setTimeout(resolve, 200));
        addLog("[→] Building cache layers...");
      }
      if (scanningSteps[stepIdx] === "SEARCHING") {
        addLog("[→] Locating optimized delivery path...");
      }
      if (scanningSteps[stepIdx] === "FOUND DATA") {
        addLog("[✓] Data located successfully!");
        addLog("[✓] Mirror manifest created");
      }
      
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    // 99% then 100%
    setProgress(99);
    setCurrentStepText("FINALIZING");
    addLog("[→] Finalizing mirror assembly...");
    await new Promise(resolve => setTimeout(resolve, 400));
    addLog("[→] Applying security patches...");
    await new Promise(resolve => setTimeout(resolve, 300));
    addLog("[→] Syncing with all mirror nodes...");
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setProgress(100);
    setCurrentStepText("COMPLETE");
    addLog("[✓] SUCCESS! Mirror created successfully");
    addLog("[✓] Content cached across 5 global nodes");
    addLog("[✓] SSL certificate generated");
    addLog("[✓] CDN distribution active");
    addLog("[✓] Real-time sync established");
    addLog("[✓] Integrity verified - 100% match");
    addLog("[✓] Ready for instant access");
    
    // Set preview image
    const preview = extractPostImagePreview(url);
    if (preview) {
      setPreviewImage(preview);
      addLog("[✓] Preview image loaded");
    } else {
      addLog("[!] Could not extract direct preview, but mirror is ready");
    }
    
    setShowRetryButton(true);
    return true;
  };

  const handleScan = async () => {
    if (!searchUrl.trim()) {
      setErrorPopup({ show: true, message: "Please enter a URL to mirror.\n\nExample: https://i.postimg.cc/xxx/image.jpg" });
      return;
    }
    
    setIsScanning(true);
    setProgress(0);
    setCurrentStepIndex(0);
    setPreviewImage(null);
    setLogs([]);
    setShowRetryButton(false);
    setErrorPopup({ show: false, message: "" });
    
    const isValid = isPostImageUrl(searchUrl);
    await runScanningSteps(isValid, searchUrl);
    setIsScanning(false);
  };

  const handleRetry = () => {
    resetScan();
    // Focus on search input after retry
    const inputElement = document.querySelector('input[type="url"]') as HTMLInputElement;
    if (inputElement) inputElement.focus();
  };

  return (
    <div className="min-h-screen px-4 pb-32 pt-28">
      {/* Error Popup */}
      <AnimatePresence>
        {errorPopup.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed left-1/2 top-24 z-50 w-96 max-w-[90vw] -translate-x-1/2 rounded-2xl border border-red-500/30 bg-red-950/90 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-red-500/20 p-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-300">Mirror Error</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm text-red-200/80">{errorPopup.message}</p>
                <button
                  onClick={() => setErrorPopup({ show: false, message: "" })}
                  className="mt-3 rounded-lg bg-red-500/30 px-3 py-1 text-xs text-red-200 transition hover:bg-red-500/50"
                >
                  Dismiss
                </button>
              </div>
              <button onClick={() => setErrorPopup({ show: false, message: "" })} className="text-red-400/60 hover:text-red-300">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <Globe size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Mirror Web</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Web Mirroring & Caching System</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Mirror Web creates cached copies of websites through distributed nodes.
          Enter a URL to scan and create a mirror through our secure network.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
            <input
              type="url"
              placeholder="Enter URL to mirror..."
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
            />
          </div>
          <motion.button
            onClick={handleScan}
            disabled={isScanning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white disabled:opacity-50"
          >
            {isScanning ? "Processing..." : "Scan"}
          </motion.button>
        </div>
        
        {/* Slideshow Text Below Search Bar */}
        <motion.div
          key={slideShowText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-3 text-center text-xs text-emerald-400/50"
        >
          {slideShowText}
        </motion.div>
      </motion.div>

      {/* Progress Bar with Unique Animation */}
      {(isScanning || progress > 0) && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          className="mx-auto mt-6 max-w-md"
        >
          <div className="mb-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {progress < 100 ? (
                <Loader2 size={14} className="animate-spin text-emerald-400" />
              ) : (
                <CheckCircle size={14} className="text-emerald-400" />
              )}
              <span className="font-mono text-emerald-400/80">{currentStepText}</span>
            </div>
            <span className="font-mono text-emerald-400/60">{progress}%</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-emerald-950/50">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-20 rounded-full bg-white/20 blur-sm"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}

      {/* Preview Image Section */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mx-auto mt-6 max-w-md overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm"
          >
            <p className="mb-2 flex items-center gap-2 text-xs text-emerald-400/60">
              <Eye size={12} />
              Mirrored Preview
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-emerald-950/50">
              <img
                src={previewImage}
                alt="Mirrored preview"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Preview+Not+Available";
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logs Section */}
      <AnimatePresence>
        {(logs.length > 0 || showRetryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-auto mt-6 max-w-md"
          >
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-400/60">
                  <Terminal size={12} />
                  <span>Mirror Logs</span>
                </div>
                {logs.length > 0 && (
                  <span className="text-[10px] text-emerald-500/40">{logs.length} entries</span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto font-mono text-xs">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="py-1 text-emerald-400/70"
                  >
                    {log}
                  </motion.div>
                ))}
                <div ref={logsEndRef} />
              </div>
              
              {showRetryButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRetry}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/50 py-2 text-sm text-emerald-400 transition hover:bg-emerald-900/50"
                >
                  <RotateCcw size={14} />
                  Retry Mirror
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Shield size={14} />
          Mirror Nodes
        </h2>

        <div className="space-y-3">
          {mirrorSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                    <Globe size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{site.name}</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-500/60">
                      <ExternalLink size={10} />
                      {site.url}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                    site.status === "active" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {site.status}
                  </span>
                  <p className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-500/50">
                    <Clock size={10} />
                    {site.latency}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
          <Lock size={14} />
          Security Features
        </h3>
        <ul className="space-y-2 text-xs text-emerald-400/70">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            End-to-end encryption for all mirrored content
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Distributed storage across multiple nodes
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Automatic SSL certificate handling
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            CDN acceleration for faster loading
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
