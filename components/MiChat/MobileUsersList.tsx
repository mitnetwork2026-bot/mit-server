'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChatUser } from '@/hooks/useMiChat';

interface MobileUsersListProps {
  users: ChatUser[];
  selectedUser: string | null;
  onSelect: (userId: string) => void;
}

export default function MobileUsersList({ users, selectedUser, onSelect }: MobileUsersListProps) {
  const router = useRouter();
  const onlineUsers = users.filter(u => u.status === 'online');
  const offlineUsers = users.filter(u => u.status === 'offline');

  const handleViewProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/50 to-black/50 p-3 backdrop-blur-xl"
    >
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div>
            <p className="text-xs font-bold text-emerald-400 mb-2 px-2">ONLINE ({onlineUsers.length})</p>
            <div className="space-y-2">
              {onlineUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  <div 
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                    onClick={() => onSelect(user.id)}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profileImage || 'https://via.placeholder.com/40'}
                        alt={user.displayName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-black bg-green-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                      <p className="text-xs text-green-400">Active now</p>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProfile(user.id)}
                    className="ml-2 px-2 py-1 rounded text-xs bg-emerald-600/50 hover:bg-emerald-600 text-white transition-colors flex-shrink-0"
                  >
                    View
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (
          <div>
            <p className="text-xs font-bold text-emerald-400/60 mb-2 px-2">OFFLINE ({offlineUsers.length})</p>
            <div className="space-y-2">
              {offlineUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (onlineUsers.length + index) * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  <div 
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                    onClick={() => onSelect(user.id)}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profileImage || 'https://via.placeholder.com/40'}
                        alt={user.displayName}
                        className="h-8 w-8 rounded-full object-cover opacity-60"
                      />
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-black bg-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/60 truncate">{user.displayName}</p>
                      <p className="text-xs text-emerald-400/60">
                        {new Date(user.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProfile(user.id)}
                    className="ml-2 px-2 py-1 rounded text-xs bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 transition-colors flex-shrink-0"
                  >
                    View
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
