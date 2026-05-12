"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Globe, Lock, Zap, Server } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Military-grade encryption protocols",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "Neural network analysis system",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Worldwide server infrastructure",
  },
  {
    icon: Lock,
    title: "Zero Knowledge",
    description: "Anonymous access protocols",
  },
  {
    icon: Zap,
    title: "Real-time Data",
    description: "Instant synchronization",
  },
  {
    icon: Server,
    title: "Cloud Storage",
    description: "Unlimited secure storage",
  },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen px-4 pb-32 pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-widest text-emerald-400/60 sm:text-sm"
        >
          Welcome to
        </motion.p>
        
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg" 
          alt="MIT Network Logo" 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mx-auto my-4 h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.6)] sm:my-6 sm:h-36 sm:w-36"
          crossOrigin="anonymous"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          MIT NETWORK
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm text-emerald-400/60"
        >
          Next Generation Security Platform
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md sm:mt-10"
      >
        <h2 className="mb-3 text-center text-xs uppercase tracking-widest text-emerald-400/60 sm:mb-4 sm:text-sm">
          Select Module
        </h2>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { id: "nsp", label: "NSP", icon: Shield },
            { id: "device-data", label: "Device Data", icon: Cpu },
            { id: "radar-controller", label: "Radar", icon: Globe },
            { id: "satellite-data", label: "Satellite", icon: Server },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-950/50 sm:p-4"
            >
              <item.icon className="mx-auto mb-1.5 h-6 w-6 text-emerald-400 transition-transform group-hover:scale-110 sm:mb-2 sm:h-8 sm:w-8" />
              <span className="text-xs font-medium text-white sm:text-sm">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-10 max-w-md sm:mt-12"
      >
        <h2 className="mb-3 text-center text-xs uppercase tracking-widest text-emerald-400/60 sm:mb-4 sm:text-sm">
          Platform Features
        </h2>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-2.5 backdrop-blur-sm sm:p-3"
            >
              <feature.icon className="mb-1.5 h-4 w-4 text-emerald-500 sm:mb-2 sm:h-5 sm:w-5" />
              <h3 className="text-xs font-medium text-white sm:text-sm">{feature.title}</h3>
              <p className="mt-0.5 text-[10px] text-emerald-400/50 sm:mt-1 sm:text-xs">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
