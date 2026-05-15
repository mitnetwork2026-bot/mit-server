'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMiChat } from '@/hooks/useMiChat';
import { useAuth } from '@/contexts/AuthContext';
import MessageList from '@/components/MiChat/MessageList';
import MessageInput from '@/components/MiChat/MessageInput';
import UsersList from '@/components/MiChat/UsersList';

export default function MiChatPage() {
  const { messages, users, sendMessage, deleteMessage, editMessage, markAsSeen, setTyping, addReaction, isAdmin } = useMiChat();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex gap-4 px-4 pb-32 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex gap-4"
      >
        {/* Users Sidebar */}
        <div className="w-72 hidden lg:flex flex-col">
          <UsersList users={users} selectedUser={selectedUser} onSelect={setSelectedUser} />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/50 to-black/50 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
                alt="MiChat"
                className="h-12 w-12 rounded-lg object-cover"
                crossOrigin="anonymous"
              />
              <div>
                <h1 className="text-lg font-bold text-white">MiChat</h1>
                <p className="text-xs text-emerald-400/60">Group Chat • {users.length} Online</p>
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <MessageList
            messages={messages}
            currentUserId={user?.uid || ''}
            onDeleteMessage={deleteMessage}
            onEditMessage={editMessage}
            onMarkAsSeen={markAsSeen}
            onAddReaction={addReaction}
            isAdmin={isAdmin}
          />

          {/* Input */}
          <MessageInput onSendMessage={sendMessage} onTyping={setTyping} />
        </div>
      </motion.div>
    </div>
  );
}
