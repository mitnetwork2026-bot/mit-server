"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Gauge, AlertCircle, CheckCircle, Lock, Search, Link2, RefreshCw, Eye, Shield, Zap, Cpu, Database, Network } from "lucide-react";
import { useState, useEffect } from "react";
import ProxyBackground from "../ProxyBackground";

export default function ProxyMonitorPage() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionLogs, setConnectionLogs] = useState<string[]>([]);
  
  // New state variables for the new features
  const [searchUrl, setSearchUrl] = useState("");
  const [isBinding, setIsBinding] = useState(false);
  const [bindProgress, setBindProgress] = useState(0);
  const [bindStatus, setBindStatus] = useState("");
  const [bindStatusMessages, setBindStatusMessages] = useState<string[]>([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [koreanLogs, setKoreanLogs] = useState<string[]>([]);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewData, setPreviewData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const handlePermissionGrant = () => {
    setShowPermissionDialog(false);
    setIsConnecting(true);
    const logs = [
      "[14:32:15] VPN Permission Request Granted",
      "[14:32:16] Initializing VPN Connection...",
      "[14:32:17] Connecting to Russian Gateway...",
      "[14:32:18] Establishing Secure Tunnel...",
      "[14:32:19] IP Masking Active",
      "[14:32:20] VPN Connected Successfully",
      "[14:32:21] Monitoring Active",
    ];
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setConnectionLogs((prev) => [...prev, log]);
      }, (index + 1) * 300);
    });

    setTimeout(() => setIsConnecting(false), logs.length * 300);
  };

  // Helper function to validate social media URLs
  const isValidSocialMediaUrl = (url: string): boolean => {
    const socialMediaPatterns = [
      /instagram\.com\/[a-zA-Z0-9_]+\/?/,
      /twitter\.com\/[a-zA-Z0-9_]+\/?/,
      /x\.com\/[a-zA-Z0-9_]+\/?/,
      /facebook\.com\/[a-zA-Z0-9.]+\/?/,
      /linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/,
      /tiktok\.com\/@[a-zA-Z0-9_.]+\/?/,
      /youtube\.com\/@[a-zA-Z0-9_.]+\/?/,
      /youtube\.com\/c\/[a-zA-Z0-9_.]+\/?/,
      /youtube\.com\/channel\/[a-zA-Z0-9_-]+\/?/,
      /reddit\.com\/user\/[a-zA-Z0-9_]+\/?/,
      /github\.com\/[a-zA-Z0-9_-]+\/?/,
      /pinterest\.com\/[a-zA-Z0-9_]+\/?/,
      /snapchat\.com\/add\/[a-zA-Z0-9_]+\/?/,
      /telegram\.me\/[a-zA-Z0-9_]+\/?/,
      /discord\.com\/users\/[a-zA-Z0-9_]+\/?/,
    ];
    return socialMediaPatterns.some(pattern => pattern.test(url));
  };

  // Extract username/ID from social media URL
  const extractSocialMediaId = (url: string): { platform: string; id: string } | null => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const path = urlObj.pathname;
      
      if (hostname.includes('instagram.com')) {
        const match = path.match(/\/([a-zA-Z0-9_]+)\/?/);
        if (match) return { platform: 'Instagram', id: match[1] };
      }
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        const match = path.match(/\/([a-zA-Z0-9_]+)\/?/);
        if (match) return { platform: 'Twitter/X', id: match[1] };
      }
      if (hostname.includes('facebook.com')) {
        const match = path.match(/\/([a-zA-Z0-9.]+)\/?/);
        if (match) return { platform: 'Facebook', id: match[1] };
      }
      if (hostname.includes('linkedin.com')) {
        const match = path.match(/\/in\/([a-zA-Z0-9_-]+)\/?/);
        if (match) return { platform: 'LinkedIn', id: match[1] };
      }
      if (hostname.includes('tiktok.com')) {
        const match = path.match(/\/@([a-zA-Z0-9_.]+)\/?/);
        if (match) return { platform: 'TikTok', id: match[1] };
      }
      if (hostname.includes('youtube.com')) {
        const match = path.match(/\/@([a-zA-Z0-9_.]+)\/?/) || path.match(/\/c\/([a-zA-Z0-9_.]+)\/?/) || path.match(/\/channel\/([a-zA-Z0-9_-]+)\/?/);
        if (match) return { platform: 'YouTube', id: match[1] };
      }
      if (hostname.includes('github.com')) {
        const match = path.match(/\/([a-zA-Z0-9_-]+)\/?/);
        if (match) return { platform: 'GitHub', id: match[1] };
      }
      return null;
    } catch {
      return null;
    }
  };

  // Simulate the binding process with all the animations and statuses
  const simulateBindingProcess = async () => {
    const statusSequence = ["Scanning", "Mirroring", "Analyzing", "Assembling", "Searching", "Found Data"];
    
    for (let i = 0; i < statusSequence.length; i++) {
      setBindStatus(statusSequence[i]);
      setBindProgress(Math.min((i / statusSequence.length) * 99, 99));
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // At 99% with "Found Data" status, show confirmation popup
    setBindProgress(99);
    setShowConfirmPopup(true);
  };

  const handleConfirmBinding = async () => {
    setShowConfirmPopup(false);
    setIsConfirmed(true);
    setBindStatus("Binding Confirmed");
    
    // 30 seconds binding animation
    let secondsLeft = 30;
    const interval = setInterval(() => {
      secondsLeft--;
      setBindStatus(`Binding... ${secondsLeft}s remaining`);
      setBindProgress(99 + (30 - secondsLeft) / 30);
      
      if (secondsLeft === 0) {
        clearInterval(interval);
        setBindProgress(100);
        setBindStatus("Complete");
        
        // Generate 25 Korean logs + 1 English final log
        const koreanLogEntries = [
          "[01] 시스템 연결 초기화 중...",
          "[02] 대상 서버에 연결 요청 전송",
          "[03] SSL/TLS 암호화 채널 설정 중",
          "[04] 인증 토큰 생성 완료",
          "[05] 사용자 데이터 요청 중",
          "[06] 프록시 서버 경로 최적화",
          "[07] 방화벽 우회 기술 활성화",
          "[08] 데이터 패킷 캡처 시작",
          "[09] 대상 계정 정보 수집 중",
          "[10] 활동 로그 분석 중...",
          "[11] 위치 데이터 추적 완료",
          "[12] 기기 정보 수집 성공",
          "[13] 연결 기록 확인 중",
          "[14] IP 주소 매핑 완료",
          "[15] 세션 쿠키 수집 중",
          "[16] 브라우저 지문 수집 완료",
          "[17] 광고 ID 추출 성공",
          "[18] 연락처 동기화 요청",
          "[19] 게시물 메타데이터 분석",
          "[20] 팔로워 관계 매핑 중",
          "[21] 상호작용 패턴 감지",
          "[22] 관심사 프로필 생성 중",
          "[23] 행동 예측 모델 학습",
          "[24] 데이터 압축 및 암호화",
          "[25] 최종 검증 단계 실행 중",
        ];
        
        setKoreanLogs(koreanLogEntries);
        setTimeout(() => {
          setKoreanLogs(prev => [...prev, "[26] FULL LOGS SEND TO MIT MAIN SERVER - SUCCESS"]);
        }, 500);
        
        setIsBinding(false);
        setShowRetryButton(false);
      }
    }, 1000);
  };

  const handleBindNow = async () => {
    if (!searchUrl.trim()) {
      setErrorMessage("Please enter a URL");
      setShowRetryButton(true);
      return;
    }
    
    // Reset states
    setBindProgress(0);
    setBindStatus("");
    setBindStatusMessages([]);
    setKoreanLogs([]);
    setShowPreview(false);
    setPreviewData(null);
    setErrorMessage("");
    setShowRetryButton(false);
    setIsConfirmed(false);
    setIsBinding(true);
    
    // Check if it's a valid social media URL
    if (!isValidSocialMediaUrl(searchUrl)) {
      // Simulate loading to 25% then error
      const interval = setInterval(() => {
        setBindProgress(prev => {
          if (prev >= 25) {
            clearInterval(interval);
            setErrorMessage("Invalid URL! Please enter a valid social media profile URL (Instagram, Twitter, Facebook, LinkedIn, TikTok, YouTube, GitHub, etc.)");
            setShowRetryButton(true);
            setIsBinding(false);
            setBindStatus("Error");
            return 25;
          }
          return prev + 5;
        });
      }, 300);
      setBindStatus("Validating URL...");
      return;
    }
    
    // Valid URL - proceed with full binding process
    await simulateBindingProcess();
  };

  const handleRetry = () => {
    setSearchUrl("");
    setBindProgress(0);
    setBindStatus("");
    setErrorMessage("");
    setShowRetryButton(false);
    setKoreanLogs([]);
    setShowPreview(false);
    setPreviewData(null);
    setIsBinding(false);
    setIsConfirmed(false);
    setShowConfirmPopup(false);
  };

  const handlePreview = async () => {
    if (!searchUrl.trim()) {
      setErrorMessage("Please enter a URL first");
      return;
    }
    
    setIsLoadingPreview(true);
    setShowPreview(false);
    
    // Simulate 50 seconds loading for preview
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setBindProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsLoadingPreview(false);
        
        // Extract social media ID for preview
        const extracted = extractSocialMediaId(searchUrl);
        if (extracted) {
          setPreviewData({
            platform: extracted.platform,
            username: extracted.id,
            profileUrl: searchUrl,
            lastActive: "2 hours ago",
            postsCount: Math.floor(Math.random() * 1000) + 100,
            followersCount: Math.floor(Math.random() * 50000) + 1000,
            avatarUrl: `https://avatar.vercel.sh/${extracted.id}`,
          });
        } else {
          setPreviewData({
            platform: "Social Media",
            username: "user",
            profileUrl: searchUrl,
          });
        }
        setShowPreview(true);
        setBindProgress(0);
      }
    }, 1000);
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
            <Gauge size={40} className="text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Monitor & VPN</h1>
          <p className="mt-2 text-sm text-blue-400/60">Permission Dialog + VPN Connection</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl space-y-4"
        >
          {/* Permission Dialog */}
          <AnimatePresence>
            {showPermissionDialog && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-lg border border-yellow-500/30 bg-yellow-950/20 p-4 backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-100 mb-2">Permission Required</h3>
                    <p className="text-sm text-yellow-200/80 mb-4">
                      This application requires permission to access system monitoring and VPN features for Russian proxy connectivity.
                    </p>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handlePermissionGrant}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 rounded-lg bg-yellow-600 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-700"
                      >
                        Grant Permission
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 rounded-lg border border-yellow-400/30 px-3 py-2 text-sm font-semibold text-yellow-400 hover:bg-yellow-400/10"
                      >
                        Deny
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* VPN Connection Animation */}
          <AnimatePresence>
            {isConnecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-blue-500/25 bg-blue-950/25 p-4 backdrop-blur-xl"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/30 border border-blue-400"
                  >
                    <Lock size={24} className="text-blue-400" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-100">Connecting VPN...</p>
                    <p className="text-xs text-blue-400/60">Establishing secure connection</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connection Logs */}
          {connectionLogs.length > 0 && (
            <div className="rounded-lg border border-blue-500/25 bg-blue-950/30 p-4 font-mono text-xs backdrop-blur-xl">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Activity size={16} className="text-blue-400" />
                <h3 className="font-semibold text-white">Connection Logs</h3>
              </div>
              <div className="h-48 overflow-y-auto rounded-lg border border-blue-400/10 bg-black/30 p-3 space-y-1">
                {connectionLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-blue-400"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* System Metrics */}
          {!showPermissionDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {[
                { name: "CPU Usage", value: "34%", icon: Activity },
                { name: "Memory Usage", value: "56%", icon: Gauge },
                { name: "Disk Usage", value: "72%", icon: AlertCircle },
                { name: "Network", value: "Connected", icon: CheckCircle },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-lg border border-blue-400/20 bg-blue-950/25 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className="text-blue-400" />
                      <span className="font-semibold text-white">{item.name}</span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-blue-400">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* NEW FEATURES SECTION */}
          {!showPermissionDialog && (
            <>
              {/* Search Bar with Bind Now Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-lg border border-purple-500/25 bg-purple-950/20 p-4 backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Search size={18} className="text-purple-400" />
                  <h3 className="font-semibold text-white">Live Monitoring</h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchUrl}
                      onChange={(e) => setSearchUrl(e.target.value)}
                      placeholder="Enter social media URL (Instagram, Twitter, Facebook, etc.)"
                      className="w-full rounded-lg border border-purple-400/30 bg-purple-950/40 px-4 py-2.5 text-sm text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                      disabled={isBinding || isLoadingPreview}
                    />
                  </div>
                  <motion.button
                    onClick={handleBindNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isBinding || isLoadingPreview}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBinding ? "Binding..." : "Bind Now"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Live Loading Animation with Status Messages */}
              {isBinding && !showConfirmPopup && !errorMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg border border-blue-500/25 bg-blue-950/30 p-6 backdrop-blur-xl"
                >
                  <div className="text-center mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-400 border-t-transparent"
                    >
                      <Zap size={28} className="text-blue-400" />
                    </motion.div>
                  </div>
                  
                  {/* Progress Bar with Unique Animation */}
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-blue-900/50">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${bindProgress}%` }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute right-0 top-0 h-full w-8 bg-white/30 blur-sm"
                        animate={{ x: ["0%", "200%"] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Status Message with Animation */}
                  <div className="mt-4 text-center">
                    <motion.p
                      key={bindStatus}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                    >
                      {bindStatus || "Initializing..."}
                    </motion.p>
                    <p className="text-xs text-blue-400/60 mt-1">{Math.floor(bindProgress)}% Complete</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message with Retry */}
              {errorMessage && showRetryButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg border border-red-500/25 bg-red-950/30 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-red-200">{errorMessage}</p>
                      <motion.button
                        onClick={handleRetry}
                        whileHover={{ scale: 1.02 }}
                        className="mt-3 flex items-center gap-2 rounded-lg bg-red-600/50 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                      >
                        <RefreshCw size={16} />
                        Retry
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Confirmation Popup */}
              <AnimatePresence>
                {showConfirmPopup && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setShowConfirmPopup(false)}
                  >
                    <motion.div
                      className="mx-4 w-full max-w-md rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950 to-indigo-950 p-6 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                          <Shield size={32} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Confirm Binding</h3>
                        <p className="text-sm text-purple-200/80 mb-4">
                          Are you sure you want to bind to this social media account? This action will establish a secure monitoring connection.
                        </p>
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => setShowConfirmPopup(false)}
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 rounded-lg border border-purple-400/30 px-4 py-2 text-sm font-semibold text-purple-400 hover:bg-purple-400/10"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            onClick={handleConfirmBinding}
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Confirm
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Korean Logs Display */}
              {koreanLogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-4 font-mono text-xs backdrop-blur-xl"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Database size={16} className="text-emerald-400" />
                    <h3 className="font-semibold text-white">System Logs (KR/EN)</h3>
                  </div>
                  <div className="h-64 overflow-y-auto rounded-lg border border-emerald-400/10 bg-black/40 p-3 space-y-1">
                    {koreanLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`${idx === 25 ? "text-yellow-400 font-bold" : "text-emerald-300/80"}`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Preview Button and Preview Section */}
              {!isBinding && koreanLogs.length > 0 && !showPreview && !isLoadingPreview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg border border-indigo-500/25 bg-indigo-950/20 p-4 backdrop-blur-xl"
                >
                  <motion.button
                    onClick={handlePreview}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    Preview Social Media ID
                  </motion.button>
                </motion.div>
              )}

              {/* Preview Loading */}
              {isLoadingPreview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg border border-indigo-500/25 bg-indigo-950/30 p-6 backdrop-blur-xl"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-400 border-t-transparent"
                    >
                      <Network size={24} className="text-indigo-400" />
                    </motion.div>
                    <p className="text-sm text-indigo-300">Loading preview data... {Math.floor(bindProgress)}%</p>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-indigo-900/50">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                        animate={{ width: `${bindProgress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preview Display */}
              {showPreview && previewData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-indigo-500/25 bg-indigo-950/30 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {previewData.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">{previewData.username}</h4>
                      <p className="text-xs text-indigo-300">{previewData.platform}</p>
                      <a
                        href={previewData.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 truncate block mt-1"
                      >
                        {previewData.profileUrl}
                      </a>
                    </div>
                  </div>
                  
                  {previewData.followersCount && (
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-indigo-400/20 pt-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{previewData.postsCount?.toLocaleString()}</p>
                        <p className="text-xs text-indigo-300">Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{previewData.followersCount?.toLocaleString()}</p>
                        <p className="text-xs text-indigo-300">Followers</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 text-center text-xs text-indigo-400/60">
                    Last active: {previewData.lastActive}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </ProxyBackground>
  );
}
