'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMiChat } from '@/hooks/useMiChat';
import { useAuth } from '@/contexts/AuthContext';
import MessageList from '@/components/MiChat/MessageList';
import MessageInput from '@/components/MiChat/MessageInput';
import UsersList from '@/components/MiChat/UsersList';
import MobileUsersList from '@/components/MiChat/MobileUsersList';
import { Menu, X } from 'lucide-react';

export default function MiChatPage() {
  const { messages, users, sendMessage, deleteMessage, editMessage, markAsSeen, setTyping, addReaction, isAdmin } = useMiChat();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showMobileUsers, setShowMobileUsers] = useState(false);

  const onlineCount = users.filter(u => u.status === 'online').length;

  return (
    <div className="min-h-screen flex gap-4 px-2 sm:px-4 pb-32 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full flex gap-4"
      >
        {/* Desktop Users Sidebar */}
        <div className="w-72 hidden lg:flex flex-col">
          <UsersList users={users} selectedUser={selectedUser} onSelect={setSelectedUser} />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/50 to-black/50 p-3 sm:p-4 backdrop-blur-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-12_13-19-21-I7kWhxum6OQv4MpbRdO4rwicOxF9Km.jpg"
                alt="MiChat"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover flex-shrink-0"
                crossOrigin="anonymous"
              />
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-white truncate">MiChat</h1>
                <p className="text-xs text-emerald-400/60">Group Chat • {onlineCount} Online</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileUsers(!showMobileUsers)}
              className="lg:hidden p-2 rounded-lg hover:bg-emerald-500/10 transition-colors flex-shrink-0"
            >
              {showMobileUsers ? (
                <X size={20} className="text-emerald-400" />
              ) : (
                <Menu size={20} className="text-emerald-400" />
              )}
            </motion.button>
          </motion.div>

          {/* Mobile Users Dropdown */}
          <AnimatePresence>
            {showMobileUsers && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-3 lg:hidden"
              >
                <MobileUsersList 
                  users={users} 
                  selectedUser={selectedUser} 
                  onSelect={(userId) => {
                    setSelectedUser(userId);
                    setShowMobileUsers(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
