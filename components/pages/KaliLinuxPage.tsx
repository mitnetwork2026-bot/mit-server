"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, Skull } from "lucide-react";

interface CommandLog {
  command: string;
  output: string[];
  timestamp: Date;
}

const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help        - Show this help message",
    "  nmap        - Network exploration tool",
    "  metasploit  - Penetration testing framework",
    "  aircrack    - WiFi security testing",
    "  sqlmap      - SQL injection tool",
    "  hydra       - Password cracker",
    "  wireshark   - Network analyzer",
    "  burpsuite   - Web security testing",
    "  john        - Password recovery",
    "  hashcat     - Advanced password recovery",
    "  clear       - Clear terminal",
  ],
  nmap: [
    "Starting Nmap 7.94 ( https://nmap.org )",
    "Scanning target...",
    "Discovered open port 22/tcp on 192.168.1.1",
    "Discovered open port 80/tcp on 192.168.1.1",
    "Discovered open port 443/tcp on 192.168.1.1",
    "Discovered open port 3306/tcp on 192.168.1.1",
    "Nmap scan complete: 1 IP (1 host up) scanned in 2.34s",
  ],
  metasploit: [
    "       =[ metasploit v6.3.44-dev                          ]",
    "+ -- --=[ 2376 exploits - 1232 auxiliary - 416 post       ]",
    "+ -- --=[ 1391 payloads - 46 encoders - 11 nops           ]",
    "+ -- --=[ 9 evasion                                        ]",
    "",
    "msf6 > Loading modules...",
    "[*] Framework initialized successfully",
  ],
  aircrack: [
    "Aircrack-ng 1.7",
    "",
    "Scanning for available networks...",
    "Found 5 access points:",
    "  [1] Network_5G (WPA2) - Signal: -45dBm",
    "  [2] Home_WiFi (WPA2) - Signal: -52dBm",
    "  [3] Guest_Network (Open) - Signal: -67dBm",
    "Monitoring mode enabled on wlan0mon",
  ],
  sqlmap: [
    "[*] starting sqlmap v1.7.2",
    "[*] testing connection to target URL",
    "[*] checking if the target is protected by WAF",
    "[*] testing for SQL injection",
    "[+] GET parameter 'id' appears vulnerable",
    "[*] sqlmap identified the following injection points",
    "[*] Database: MySQL >= 5.0",
  ],
  hydra: [
    "Hydra v9.5 (c) 2023 by van Hauser/THC",
    "",
    "[DATA] max 16 tasks per 1 server, overall 16 tasks",
    "[DATA] attacking ssh://192.168.1.1:22/",
    "[ATTEMPT] target 192.168.1.1 - login: admin",
    "[STATUS] 128/1000 passwords tested (12.80%)",
    "[22][ssh] host: 192.168.1.1   login: admin",
  ],
  wireshark: [
    "Wireshark 4.0.10",
    "",
    "Capturing on 'eth0'...",
    "Packet 1: TCP 192.168.1.100 -> 8.8.8.8 DNS Query",
    "Packet 2: TCP 8.8.8.8 -> 192.168.1.100 DNS Response",
    "Packet 3: TCP 192.168.1.100 -> 142.250.190.78 HTTPS",
    "[*] 1000 packets captured",
  ],
  burpsuite: [
    "Burp Suite Professional v2023.10",
    "",
    "[*] Starting proxy server on 127.0.0.1:8080",
    "[*] Proxy started successfully",
    "[*] Intercepting requests...",
    "[+] Request intercepted: GET /api/users",
    "[+] Response analyzed: 200 OK",
  ],
  john: [
    "John the Ripper 1.9.0-jumbo-1",
    "",
    "Loaded 1 password hash (SHA-512)",
    "Press 'q' or Ctrl-C to abort, any other key for status",
    "Cracking in progress...",
    "[*] Using wordlist mode",
    "[+] Session complete",
  ],
  hashcat: [
    "hashcat (v6.2.6) starting...",
    "",
    "Session: hashcat",
    "Status: Running",
    "Hash.Mode: 1000 (NTLM)",
    "Speed/Sec: 45.6 GH/s",
    "[*] Progress: 15%",
  ],
  ls: [
    "Desktop    Documents  Downloads  Music  Pictures  Videos",
    "exploit.py pentest    wordlists  tools  scripts   payloads",
  ],
  pwd: ["/home/kali"],
  whoami: ["kali"],
  uname: ["Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC"],
  ifconfig: [
    "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
    "        inet 192.168.1.100  netmask 255.255.255.0",
    "        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>",
    "",
    "wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
    "        inet 192.168.1.101  netmask 255.255.255.0",
  ],
};

export default function KaliLinuxPage() {
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const processCommand = async (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    if (command === "clear") {
      setCommandHistory([]);
      return;
    }

    setIsProcessing(true);

    const baseCommand = command.split(" ")[0];
    const response = commandResponses[baseCommand] || [
      `Command not found: ${command}`,
      "Type 'help' for available commands",
    ];

    // Simulate typing effect
    const log: CommandLog = {
      command: cmd,
      output: [],
      timestamp: new Date(),
    };
    setCommandHistory((prev) => [...prev, log]);

    for (const line of response) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setCommandHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].output.push(line);
        return [...updated];
      });
    }

    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isProcessing) {
      processCommand(currentCommand);
      setCurrentCommand("");
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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-xl shadow-purple-500/30"
        >
          <Skull size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Kali Linux</h1>
        <p className="mt-2 text-sm text-purple-400/60">Penetration Testing Terminal</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-2xl"
      >
        <div
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          className="h-96 cursor-text overflow-y-auto rounded-2xl border border-purple-500/20 bg-black/90 p-4 font-mono text-sm backdrop-blur-sm"
        >
          <div className="mb-4 text-purple-400">
            <pre className="text-xs text-purple-500/80">{`
  ██╗  ██╗ █████╗ ██╗     ██╗
  ██║ ██╔╝██╔══██╗██║     ██║
  █████╔╝ ███████║██║     ██║
  ██╔═██╗ ██╔══██║██║     ██║
  ██║  ██╗██║  ██║███████╗██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝
            `}</pre>
            <p className="text-emerald-400">Welcome to Kali Linux Terminal</p>
            <p className="text-emerald-400/60">Type &apos;help&apos; for available commands</p>
          </div>

          {commandHistory.map((log, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">┌──(</span>
                <span className="text-emerald-400">kali㉿kali</span>
                <span className="text-purple-500">)-[</span>
                <span className="text-blue-400">~</span>
                <span className="text-purple-500">]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">└─</span>
                <span className="text-red-400">$</span>
                <span className="text-white">{log.command}</span>
              </div>
              {log.output.map((line, i) => (
                <div key={i} className="pl-4 text-emerald-300/80">
                  {line}
                </div>
              ))}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-purple-500">┌──(</span>
              <span className="text-emerald-400">kali㉿kali</span>
              <span className="text-purple-500">)-[</span>
              <span className="text-blue-400">~</span>
              <span className="text-purple-500">]</span>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">└─</span>
                <span className="text-red-400">$</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                disabled={isProcessing}
                className="flex-1 bg-transparent text-white outline-none"
                autoFocus
              />
              {isProcessing && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-emerald-400"
                >
                  ▌
                </motion.span>
              )}
            </div>
          </form>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["nmap", "metasploit", "aircrack", "sqlmap", "hydra"].map((cmd) => (
            <motion.button
              key={cmd}
              onClick={() => {
                setCurrentCommand(cmd);
                inputRef.current?.focus();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-400 transition-colors hover:bg-purple-500/20"
            >
              {cmd}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
