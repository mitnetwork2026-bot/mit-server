"use client";

import { motion } from "framer-motion";
import { Users, Shield, Globe, Zap, Award, Target, Code, Lock } from "lucide-react";

const team = [
  { name: "Alex Chen", role: "Founder & CEO", avatar: "A" },
  { name: "Sarah Kim", role: "CTO", avatar: "S" },
  { name: "Mike Johnson", role: "Security Lead", avatar: "M" },
  { name: "Lisa Wang", role: "Lead Developer", avatar: "L" },
];

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Countries", value: "120+", icon: Globe },
  { label: "Uptime", value: "99.9%", icon: Zap },
  { label: "Security Audits", value: "500+", icon: Shield },
];

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "AES-256 encryption with zero-knowledge architecture",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Distributed network across 50+ data centers",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Transparent codebase audited by security experts",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No logs policy with anonymous access options",
  },
];

export default function AboutPage() {
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
          className="mx-auto mb-4 h-28 w-28 object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          crossOrigin="anonymous"
        />
        
        <h1 className="text-3xl font-bold text-white">About MIT Network</h1>
        <p className="mt-2 text-sm text-emerald-400/60">Building the future of secure networking</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 backdrop-blur-sm"
      >
        <p className="text-center text-sm leading-relaxed text-emerald-400/80">
          MIT Network is a cutting-edge security platform designed for professionals 
          who demand the highest level of privacy and protection. Founded in 2020, 
          we&apos;ve grown to serve over 50,000 users worldwide.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 text-center backdrop-blur-sm"
            >
              <stat.icon size={20} className="mx-auto mb-2 text-emerald-500" />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-emerald-500/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Target size={14} />
          Our Mission
        </h2>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                <feature.icon size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">{feature.title}</h3>
                <p className="mt-1 text-xs text-emerald-400/60">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <Award size={14} />
          Our Team
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl font-bold text-white">
                {member.avatar}
              </div>
              <p className="font-medium text-white">{member.name}</p>
              <p className="text-xs text-emerald-500/60">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4 text-center"
      >
        <p className="text-xs text-emerald-500/50">
          MIT Network © 2024. All rights reserved.
          <br />
          Secured by Knox Security Systems
        </p>
      </motion.div>
    </div>
  );
}
