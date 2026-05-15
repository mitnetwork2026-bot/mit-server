'use client';

import { motion } from 'framer-motion';
import { ChatUser } from '@/hooks/useMiChat';
import { Users, Eye } from 'lucide-react';
import { useState } from 'react';
import UserProfileModal from './UserProfileModal';

interface UsersListProps {
  users: ChatUser[];
  selectedUser: string | null;
  onSelect: (userId: string) => void;
}

export default function UsersList({ users, selectedUser, onSelect }: UsersListProps) {
  const [selectedProfileUser, setSelectedProfileUser] = useState<ChatUser | null>(null);
  const onlineUsers = users.filter((u) => u.status === 'online');
  const offlineUsers = users.filter((u) => u.status === 'offline');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/50 to-black/50 p-4 backdrop-blur-xl h-fit"
    >
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} className="text-emerald-400" />
        <h3 className="text-sm font-bold text-emerald-400">Active Users</h3>
        <span className="ml-auto text-xs bg-emerald-500/20 px-2 py-1 rounded-full text-emerald-400">
          {onlineUsers.length}
        </span>
      </div>

      {/* Online Users */}
      {onlineUsers.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-emerald-400/60 mb-2 uppercase tracking-wide">Online</p>
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group p-3 rounded-xl transition-all flex items-center justify-between ${
                  selectedUser === user.id
                    ? 'bg-emerald-500/30 border border-emerald-500'
                    : 'hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30'
                }`}
              >
                <div 
                  onClick={() => onSelect(user.id)}
                  className="cursor-pointer flex-1 flex items-center gap-3"
                >
                  <div className="relative">
                    {user.profileImage ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.profileImage}
                        alt={user.displayName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-emerald-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-400">
                          {getInitials(user.displayName)}
                        </span>
                      </div>
                    )}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                          '0 0 0 4px rgba(34, 197, 94, 0.2)',
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.displayName}
                    </p>
                    <motion.p 
                      animate={{ opacity: user.isTyping ? [0.5, 1, 0.5] : 1 }}
                      transition={{ duration: 1, repeat: user.isTyping ? Infinity : 0 }}
                      className="text-xs text-green-400"
                    >
                      {user.isTyping ? 'typing...' : 'Active now'}
                    </motion.p>
                  </div>
                </div>

                {/* View Profile Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProfileUser(user)}
                  className="ml-2 p-1.5 rounded-lg bg-emerald-600/50 hover:bg-emerald-600 text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Eye size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Offline Users */}
      {offlineUsers.length > 0 && (
        <div>
          <p className="text-xs text-emerald-400/60 mb-2 uppercase tracking-wide">Offline</p>
          <div className="space-y-2">
            {offlineUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (onlineUsers.length + index) * 0.05 }}
                className="group p-3 rounded-xl hover:bg-emerald-500/10 border border-transparent cursor-pointer transition-all flex items-center justify-between"
              >
                <div 
                  onClick={() => onSelect(user.id)}
                  className="flex-1 flex items-center gap-3"
                >
                  <div className="relative">
                    {user.profileImage ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.profileImage}
                        alt={user.displayName}
                        className="h-10 w-10 rounded-full object-cover opacity-60"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-400/60">
                          {getInitials(user.displayName)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/60 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(user.lastSeen).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* View Profile Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProfileUser(user)}
                  className="ml-2 p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Eye size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {selectedProfileUser && (
        <UserProfileModal 
          user={selectedProfileUser} 
          onClose={() => setSelectedProfileUser(null)} 
        />
      )}
    </motion.div>
  );
}
