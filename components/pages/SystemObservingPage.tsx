"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, Cpu, HardDrive, Wifi, Activity, Server, Database, Zap, 
  Search, Link2, CheckCircle, AlertCircle, RotateCcw, 
  ExternalLink, User, Calendar, ThumbsUp, Share2, X
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  icon: typeof Cpu;
}

interface Process {
  pid: number;
  name: string;
  cpu: number;
  mem: number;
}

interface SocialPreview {
  url: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: string;
  comments: string;
  platform: string;
}

const KOREAN_LOGS = [
  "[INFO] 시스템 모니터링 초기화 중...",
  "[DEBUG] 네트워크 소켓 연결 설정 완료",
  "[INFO] 메모리 할당: 256MB",
  "[WARN] 캐시 데이터 정리 중",
  "[INFO] 프로세스 스레드 생성: 8개",
  "[DEBUG] 커널 모듈 로드 완료",
  "[INFO] 저장소 연결 확인됨",
  "[WARN] 대기 중인 요청: 3개",
  "[INFO] 데이터 동기화 시작",
  "[DEBUG] 패킷 암호화 활성화",
  "[INFO] 로그 파일 로테이션 완료",
  "[WARN] CPU 사용량 변동 감지",
  "[INFO] 네트워크 대역폭 측정 중",
  "[DEBUG] 방화벽 규칙 업데이트",
  "[INFO] 백그라운드 작업 스케줄됨",
  "[WARN] 연결 지연 발생: 125ms",
  "[INFO] 인증 토큰 갱신 완료",
  "[DEBUG] 리소스 사용량 집계 중",
  "[INFO] 시스템 업데이트 확인",
  "[WARN] 메모리 조각화 발견",
  "[INFO] 가상 메모리 활성화",
  "[DEBUG] 캐시 프리로드 완료",
  "[INFO] 프로세스 우선순위 조정",
  "[WARN] I/O 요청 대기열 증가",
  "[INFO] 실시간 데이터 스트림 활성화됨",
];

export default function SystemObservingPage() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 45, max: 100, unit: "%", icon: Cpu },
    { name: "Memory", value: 8.2, max: 16, unit: "GB", icon: HardDrive },
    { name: "Network", value: 125, max: 1000, unit: "Mbps", icon: Wifi },
    { name: "Disk I/O", value: 320, max: 500, unit: "MB/s", icon: Database },
  ]);

  const [processes] = useState<Process[]>([
    { pid: 1024, name: "system_monitor", cpu: 2.5, mem: 128 },
    { pid: 2048, name: "network_service", cpu: 5.2, mem: 256 },
    { pid: 3072, name: "data_processor", cpu: 12.8, mem: 512 },
    { pid: 4096, name: "security_scan", cpu: 8.1, mem: 384 },
    { pid: 5120, name: "log_analyzer", cpu: 3.4, mem: 192 },
  ]);

  // New state for added features
  const [searchUrl, setSearchUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isBinding, setIsBinding] = useState(false);
  const [bindingProgress, setBindingProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<SocialPreview | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRetry, setShowRetry] = useState(false);
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  const loadingSteps = ["Scanning", "Mirroring", "Analyzing", "Assembling", "Searching", "Found Data"];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.min(
            metric.max,
            Math.max(0, metric.value + (Math.random() - 0.5) * 10)
          ),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const isValidSocialMediaUrl = (url: string): boolean => {
    const patterns = [
      /instagram\.com\/[a-zA-Z0-9_.]+\/?/,
      /twitter\.com\/[a-zA-Z0-9_]+\/?/,
      /x\.com\/[a-zA-Z0-9_]+\/?/,
      /facebook\.com\/[a-zA-Z0-9_.]+\/?/,
      /tiktok\.com\/@[a-zA-Z0-9_.]+\/?/,
      /youtube\.com\/@[a-zA-Z0-9_.]+\/?/,
      /linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/,
      /github\.com\/[a-zA-Z0-9_-]+\/?/,
      /reddit\.com\/user\/[a-zA-Z0-9_-]+\/?/,
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const extractPlatform = (url: string): string => {
    if (url.includes("instagram")) return "Instagram";
    if (url.includes("twitter") || url.includes("x.com")) return "Twitter/X";
    if (url.includes("facebook")) return "Facebook";
    if (url.includes("tiktok")) return "TikTok";
    if (url.includes("youtube")) return "YouTube";
    if (url.includes("linkedin")) return "LinkedIn";
    if (url.includes("github")) return "GitHub";
    if (url.includes("reddit")) return "Reddit";
    return "Social Media";
  };

  const extractUsername = (url: string): string => {
    const patterns = [
      /instagram\.com\/([a-zA-Z0-9_.]+)/,
      /twitter\.com\/([a-zA-Z0-9_]+)/,
      /x\.com\/([a-zA-Z0-9_]+)/,
      /facebook\.com\/([a-zA-Z0-9_.]+)/,
      /tiktok\.com\/@([a-zA-Z0-9_.]+)/,
      /youtube\.com\/@([a-zA-Z0-9_.]+)/,
      /linkedin\.com\/in\/([a-zA-Z0-9_-]+)/,
      /github\.com\/([a-zA-Z0-9_-]+)/,
      /reddit\.com\/user\/([a-zA-Z0-9_-]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return "user";
  };

  const generatePreview = (url: string): SocialPreview => {
    const platform = extractPlatform(url);
    const username = extractUsername(url);
    return {
      url,
      title: `${username} • ${platform} Profile`,
      description: `Official profile of ${username} on ${platform}. Follow for updates, content, and more.`,
      author: username,
      date: new Date().toLocaleDateString(),
      likes: Math.floor(Math.random() * 1000000).toLocaleString(),
      comments: Math.floor(Math.random() * 10000).toLocaleString(),
      platform,
    };
  };

  const runLoadingSequence = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      let progress = 0;
      let stepIndex = 0;
      
      const interval = setInterval(() => {
        progress += 2;
        
        if (progress <= 20) {
          setLoadingStep(loadingSteps[0]);
        } else if (progress <= 35) {
          setLoadingStep(loadingSteps[1]);
          stepIndex = 1;
        } else if (progress <= 50) {
          setLoadingStep(loadingSteps[2]);
          stepIndex = 2;
        } else if (progress <= 65) {
          setLoadingStep(loadingSteps[3]);
          stepIndex = 3;
        } else if (progress <= 85) {
          setLoadingStep(loadingSteps[4]);
          stepIndex = 4;
        } else {
          setLoadingStep(loadingSteps[5]);
          stepIndex = 5;
        }
        
        setLoadingProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => resolve(true), 500);
        }
      }, 80);
    });
  };

  const runBindingSequence = async (): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 3.33;
        setBindingProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => resolve(), 300);
        }
      }, 1000);
    });
  };

  const showKoreanLogs = async (): Promise<void> => {
    setLogs([]);
    for (let i = 0; i < KOREAN_LOGS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setLogs(prev => [...prev, KOREAN_LOGS[i]]);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    setLogs(prev => [...prev, "[SUCCESS] Full logs sent to MIT Main Server ✓"]);
  };

  const handleBind = async () => {
    if (!searchUrl.trim()) {
      setErrorMessage("Please enter a URL");
      setShowRetry(true);
      return;
    }

    setErrorMessage("");
    setShowRetry(false);
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingStep("");

    // Check if URL is valid social media
    if (!isValidSocialMediaUrl(searchUrl)) {
      // Fake loading to 25% then error
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setLoadingProgress(Math.min(progress, 25));
        if (progress >= 25) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setErrorMessage("Invalid social media URL. Please enter a valid profile link (Instagram, Twitter/X, Facebook, TikTok, YouTube, LinkedIn, GitHub, Reddit)");
            setShowRetry(true);
          }, 300);
        }
      }, 100);
      return;
    }

    // Valid URL - complete full loading sequence
    const success = await runLoadingSequence();
    if (success) {
      setIsLoading(false);
      setShowConfirmPopup(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmPopup(false);
    setIsBinding(true);
    setBindingProgress(0);
    
    await runBindingSequence();
    await showKoreanLogs();
    
    setIsBinding(false);
  };

  const handleRetry = () => {
    setErrorMessage("");
    setShowRetry(false);
    setSearchUrl("");
  };

  const handlePreview = async () => {
    if (!searchUrl.trim() || !isValidSocialMediaUrl(searchUrl)) {
      setErrorMessage("Please enter a valid social media URL first");
      return;
    }
    
    setShowPreview(false);
    setLoadingProgress(0);
    setLoadingStep("Loading Preview...");
    setIsLoading(true);
    
    // 50 seconds loading simulation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setPreviewData(generatePreview(searchUrl));
          setShowPreview(true);
        }, 500);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen px-4 pb-32 pt-28">
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
          <Eye size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">System Observing</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time System Monitoring</p>
      </motion.div>

      {/* Search Bar Section with Live Observing Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-emerald-500/20 blur-xl animate-pulse" />
          <div className="relative rounded-2xl border border-emerald-500/30 bg-emerald-950/50 p-1 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-xl bg-black/40 p-2">
              <Search size={18} className="ml-2 text-emerald-400" />
              <input
                type="text"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                placeholder="Enter social media URL (Instagram, Twitter, Facebook, etc.)"
                className="flex-1 bg-transparent text-sm text-white placeholder-emerald-400/40 outline-none"
              />
              <button
                onClick={handleBind}
                disabled={isLoading || isBinding}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50"
              >
                Bind Now
              </button>
            </div>
          </div>
        </div>

        {/* Error Message with Retry */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 rounded-xl border border-red-500/30 bg-red-950/50 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-400" />
                <p className="flex-1 text-xs text-red-300">{errorMessage}</p>
                {showRetry && (
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-1 rounded-lg bg-red-500/20 px-2 py-1 text-xs text-red-300 transition-colors hover:bg-red-500/30"
                  >
                    <RotateCcw size={12} />
                    Retry
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/60 p-5 backdrop-blur-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-300">{loadingStep || "Processing"}</span>
                <span className="font-mono text-lg font-bold text-emerald-400">{loadingProgress}%</span>
              </div>
              
              {/* Unique animated progress bar with particles */}
              <div className="relative h-3 overflow-hidden rounded-full bg-emerald-950">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.div>
                </div>
              </div>
              
              {/* Animated dots */}
              <div className="mt-3 flex justify-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>

              {/* Scanning text animation */}
              <motion.p
                className="mt-3 text-center font-mono text-xs text-emerald-400/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {loadingProgress < 20 && "Initializing connection..."}
                {loadingProgress >= 20 && loadingProgress < 50 && "Establishing secure tunnel..."}
                {loadingProgress >= 50 && loadingProgress < 85 && "Fetching user data..."}
                {loadingProgress >= 85 && "Finalizing binding..."}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <metric.icon size={16} className="text-emerald-500" />
                <span className="text-xs text-emerald-400/60">{metric.name}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metric.value.toFixed(1)}
                <span className="text-sm text-emerald-500/60">{metric.unit}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-950">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Active Processes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Activity size={14} />
          Active Processes
        </h2>

        <div className="space-y-2">
          {processes.map((process, index) => (
            <motion.div
              key={process.pid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Server size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-mono text-sm text-white">{process.name}</p>
                  <p className="text-xs text-emerald-500/50">PID: {process.pid}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-400">CPU: {process.cpu}%</p>
                <p className="text-xs text-emerald-500/50">MEM: {process.mem}MB</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
          <Zap size={14} />
          System Health
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-emerald-400/70">Overall Status</span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
            Optimal
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Uptime</p>
            <p className="font-mono text-emerald-300">24d 5h</p>
          </div>
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Load Avg</p>
            <p className="font-mono text-emerald-300">0.45</p>
          </div>
          <div className="rounded-lg bg-black/20 p-2">
            <p className="text-emerald-500/50">Threads</p>
            <p className="font-mono text-emerald-300">256</p>
          </div>
        </div>
      </motion.div>

      {/* Binding Animation and Korean Logs */}
      <AnimatePresence>
        {isBinding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-auto mt-8 max-w-md"
          >
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/60 p-5 backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-300">Binding to MIT Server</span>
                <span className="font-mono text-lg font-bold text-emerald-400">{bindingProgress}%</span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-emerald-950">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-blue-500"
                  animate={{ width: `${bindingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Log Box */}
              <div
                ref={logContainerRef}
                className="mt-4 max-h-64 overflow-y-auto rounded-xl bg-black/50 p-3 font-mono text-xs"
              >
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`py-0.5 ${idx === logs.length - 1 ? "text-emerald-400 font-bold" : "text-emerald-300/70"}`}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Button */}
      {!isLoading && !isBinding && searchUrl && isValidSocialMediaUrl(searchUrl) && !showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto mt-4 max-w-md"
        >
          <button
            onClick={handlePreview}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 py-2 text-sm text-emerald-400 transition-all hover:bg-emerald-950/60"
          >
            <ExternalLink size={14} />
            Preview Profile
          </button>
        </motion.div>
      )}

      {/* Social Media Preview */}
      <AnimatePresence>
        {showPreview && previewData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mx-auto mt-4 max-w-md"
          >
            <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/80 to-black/80 p-5 backdrop-blur-md">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute right-3 top-3 rounded-full bg-emerald-500/20 p-1 text-emerald-400 transition-colors hover:bg-emerald-500/30"
              >
                <X size={14} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{previewData.author}</h4>
                  <p className="text-xs text-emerald-400/60">{previewData.platform}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-white">{previewData.description}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-emerald-400/60">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> Joined {previewData.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={12} /> {previewData.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 size={12} /> {previewData.comments} comments
                  </span>
                </div>
              </div>
              
              <div className="mt-3 rounded-xl bg-emerald-950/50 p-2">
                <a
                  href={previewData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs text-emerald-400 hover:text-emerald-300"
                >
                  <Link2 size={12} />
                  Visit Profile
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mx-4 max-w-sm rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 to-black p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-emerald-500/20 p-3">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-xl font-bold text-white">Confirm Binding</h3>
              <p className="mb-6 text-center text-sm text-emerald-400/70">
                Are you sure you want to bind "{searchUrl}" to the monitoring system?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="flex-1 rounded-xl border border-emerald-500/30 bg-transparent py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-950/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2 text-sm font-medium text-white transition-all hover:from-emerald-500 hover:to-emerald-400"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
