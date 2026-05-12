"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Filter, Download, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  source: string;
  message: string;
}

const generateLogs = (): LogEntry[] => {
  const sources = ["auth-service", "api-gateway", "db-connector", "cache-layer", "security-scan"];
  const messages = {
    info: [
      "Connection established successfully",
      "Request processed in 45ms",
      "Cache hit for key: user_session",
      "Background job completed",
    ],
    warning: [
      "High memory usage detected: 85%",
      "Slow query detected: 2.5s",
      "Rate limit approaching threshold",
      "Certificate expires in 30 days",
    ],
    error: [
      "Connection timeout after 30s",
      "Authentication failed for user",
      "Database connection lost",
      "Invalid API key provided",
    ],
    success: [
      "Deployment completed successfully",
      "Backup created successfully",
      "Security scan passed",
      "Updates applied successfully",
    ],
  };

  const logs: LogEntry[] = [];
  for (let i = 0; i < 50; i++) {
    const levels = ["info", "warning", "error", "success"] as const;
    const level = levels[Math.floor(Math.random() * levels.length)];
    logs.push({
      id: `log-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      level,
      source: sources[Math.floor(Math.random() * sources.length)],
      message: messages[level][Math.floor(Math.random() * messages[level].length)],
    });
  }
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export default function MegaLogReaderPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogs(generateLogs());

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        level: ["info", "warning", "error", "success"][Math.floor(Math.random() * 4)] as LogEntry["level"],
        source: ["auth-service", "api-gateway", "db-connector"][Math.floor(Math.random() * 3)],
        message: "New event detected in the system",
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle size={14} className="text-red-400" />;
      case "warning":
        return <AlertCircle size={14} className="text-yellow-400" />;
      case "success":
        return <CheckCircle size={14} className="text-emerald-400" />;
      default:
        return <Clock size={14} className="text-blue-400" />;
    }
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
          <FileText size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Mega Log Reader</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Real-time System Log Analyzer</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-2xl"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/50" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-3 pl-12 pr-4 text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "info", "warning", "error", "success"].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  filter === level
                    ? "bg-emerald-500 text-white"
                    : "border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={logContainerRef}
          className="mt-4 h-96 overflow-y-auto rounded-2xl border border-emerald-500/20 bg-black/50 p-4 font-mono text-sm backdrop-blur-sm"
        >
          {filteredLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`mb-2 flex items-start gap-3 rounded-lg p-2 ${
                log.level === "error" ? "bg-red-500/10" :
                log.level === "warning" ? "bg-yellow-500/10" :
                log.level === "success" ? "bg-emerald-500/10" :
                "bg-blue-500/5"
              }`}
            >
              {getLevelIcon(log.level)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-500/60">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">
                    {log.source}
                  </span>
                </div>
                <p className={`mt-1 text-xs ${
                  log.level === "error" ? "text-red-300" :
                  log.level === "warning" ? "text-yellow-300" :
                  log.level === "success" ? "text-emerald-300" :
                  "text-blue-300"
                }`}>
                  {log.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
          <span className="text-xs text-emerald-500/60">
            Showing {filteredLogs.length} of {logs.length} entries
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white"
          >
            <Download size={14} />
            Export Logs
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
