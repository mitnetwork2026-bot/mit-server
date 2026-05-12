"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, Mail, Phone, FileText, ChevronRight, Send, ExternalLink } from "lucide-react";

const faqs = [
  {
    question: "How do I reset my access credentials?",
    answer: "Navigate to Settings > Security > Reset Credentials. You'll receive a verification code via your registered email.",
  },
  {
    question: "What are the system requirements?",
    answer: "MIT Network works on all modern browsers. For optimal performance, we recommend Chrome 90+, Firefox 88+, or Safari 14+.",
  },
  {
    question: "How do I report a security vulnerability?",
    answer: "Please use our secure reporting form at /security-report or email security@mitnetwork.com with encrypted details.",
  },
  {
    question: "Is my data encrypted?",
    answer: "Yes, all data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit.",
  },
];

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
        
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="mt-2 text-sm text-emerald-400/60">We&apos;re here to help</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-md"
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageSquare, label: "Live Chat", color: "from-emerald-500 to-emerald-600" },
            { icon: Mail, label: "Email", color: "from-blue-500 to-blue-600" },
            { icon: Phone, label: "Call Us", color: "from-purple-500 to-purple-600" },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-center backdrop-blur-sm"
            >
              <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}>
                <item.icon size={24} className="text-white" />
              </div>
              <span className="text-xs font-medium text-white">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <FileText size={14} />
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-sm"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-white">{faq.question}</span>
                <ChevronRight
                  size={18}
                  className={`text-emerald-500 transition-transform ${expandedFaq === index ? "rotate-90" : ""}`}
                />
              </button>
              {expandedFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-emerald-500/20 p-4"
                >
                  <p className="text-sm text-emerald-400/80">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-8 max-w-md"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-emerald-400/60">
          <MessageSquare size={14} />
          Send a Message
        </h2>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 backdrop-blur-sm">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or question..."
            rows={4}
            className="w-full resize-none rounded-xl border border-emerald-500/20 bg-black/30 p-3 text-sm text-white placeholder:text-emerald-500/40 focus:border-emerald-400 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white"
          >
            <Send size={18} />
            Send Message
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4 text-center"
      >
        <p className="text-sm text-emerald-400/60">Need immediate assistance?</p>
        <a
          href="#"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          Visit our documentation
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </div>
  );
}
