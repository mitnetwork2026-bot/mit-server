'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Message from './Message';
import { ChatMessage } from '@/hooks/useMiChat';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
  onDeleteMessage: (id: string) => void;
  onEditMessage: (id: string, text: string) => void;
  onMarkAsSeen: (id: string) => void;
  onAddReaction: (id: string, emoji: string) => void;
  isAdmin: boolean;
}

export default function MessageList({
  messages,
  currentUserId,
  onDeleteMessage,
  onEditMessage,
  onMarkAsSeen,
  onAddReaction,
  isAdmin,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    messages.forEach((message) => {
      if (!message.seenBy[currentUserId]) {
        onMarkAsSeen(message.id);
      }
    });
  }, [messages, currentUserId, onMarkAsSeen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/30 to-black/30 p-4 backdrop-blur-xl mb-4"
    >
      <div className="space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-96">
            <p className="text-emerald-400/60 text-center">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              senderId={message.senderId}
              senderName={message.senderName}
              senderProfileImage={message.senderProfileImage}
              text={message.text}
              timestamp={message.timestamp}
              seenBy={message.seenBy || {}}
              reactions={message.reactions || {}}
              isCurrentUser={message.senderId === currentUserId}
              isAdmin={isAdmin}
              currentUserId={currentUserId}
              onDelete={onDeleteMessage}
              onEdit={onEditMessage}
              onAddReaction={onAddReaction}
              isEdited={message.isEdited}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  );
}
