"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coins, TrendingUp, TrendingDown, RefreshCw, Wallet, Send, Download } from "lucide-react";

interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
}

export default function NodeTokenPage() {
  const [tokens, setTokens] = useState<Token[]>([
    { id: "1", name: "Node Token", symbol: "NDT", balance: 1250.50, price: 2.45, change24h: 5.2 },
    { id: "2", name: "MIT Coin", symbol: "MIT", balance: 500.00, price: 15.80, change24h: -2.1 },
    { id: "3", name: "Network Credit", symbol: "NTC", balance: 10000, price: 0.05, change24h: 12.5 },
    { id: "4", name: "Security Point", symbol: "SCP", balance: 750.25, price: 1.20, change24h: 0.8 },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalBalance = tokens.reduce((sum, token) => sum + token.balance * token.price, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTokens((prev) =>
        prev.map((token) => ({
          ...token,
          price: token.price * (1 + (Math.random() - 0.5) * 0.1),
          change24h: (Math.random() - 0.5) * 20,
        }))
      );
      setIsRefreshing(false);
    }, 1500);
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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-xl shadow-yellow-500/30"
        >
          <Coins size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white">Node Token</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Digital Asset Management</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-emerald-900/30 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-400/60">Total Balance</p>
            <p className="mt-1 text-3xl font-bold text-white">
              ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-xl bg-emerald-500/20 p-3"
          >
            <RefreshCw size={20} className={`text-emerald-400 ${isRefreshing ? "animate-spin" : ""}`} />
          </motion.button>
        </div>

        <div className="mt-6 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white"
          >
            <Send size={18} />
            Send
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/50 py-3 font-medium text-emerald-400"
          >
            <Download size={18} />
            Receive
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Wallet size={14} />
          Your Assets
        </h2>

        <div className="space-y-3">
          {tokens.map((token, index) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-700/30">
                    <span className="text-lg font-bold text-emerald-400">{token.symbol[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{token.name}</p>
                    <p className="text-xs text-emerald-500/60">{token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">
                    {token.balance.toLocaleString()} {token.symbol}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-xs text-emerald-400/60">
                      ${(token.balance * token.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`flex items-center text-xs ${token.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {token.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(token.change24h).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
