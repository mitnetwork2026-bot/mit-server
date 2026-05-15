'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onTyping: (isTyping: boolean) => void;
}

export default function MessageInput({ onSendMessage, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping(true);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/50 to-black/50 p-4 backdrop-blur-xl"
    >
      <div className="flex gap-2 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 hover:bg-emerald-500/20 rounded-xl transition-colors"
          title="Attach file"
        >
          <Paperclip size={20} className="text-emerald-400" />
        </motion.button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleTyping}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-white placeholder-emerald-400/40 text-sm"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 hover:bg-emerald-500/20 rounded-xl transition-colors"
          title="Send voice message"
        >
          <Mic size={20} className="text-emerald-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send message"
        >
          <Send size={20} className="text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
