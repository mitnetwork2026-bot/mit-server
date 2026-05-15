'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Shield } from 'lucide-react';
import { ChatUser } from '@/hooks/useMiChat';

interface UserProfileModalProps {
  user: ChatUser;
  onClose: () => void;
}

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/80 to-black/80 backdrop-blur-xl overflow-hidden"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 hover:bg-emerald-600/50 text-white transition-colors"
          >
            <X size={20} />
          </motion.button>

          {/* Cover Image or Gradient */}
          <div className="h-32 bg-gradient-to-r from-emerald-900 to-emerald-700 relative overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
            />
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Profile Picture */}
            <div className="flex justify-center -mt-16 mb-4">
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                className="relative"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.displayName}
                    className="h-32 w-32 rounded-full border-4 border-black object-cover shadow-lg"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full border-4 border-black bg-emerald-500/30 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-emerald-400">
                      {getInitials(user.displayName)}
                    </span>
                  </div>
                )}
                {/* Status Indicator */}
                <motion.div
                  animate={{
                    scale: user.status === 'online' ? [1, 1.2, 1] : 1,
                    boxShadow:
                      user.status === 'online'
                        ? [
                            '0 0 0 0 rgba(34, 197, 94, 0)',
                            '0 0 0 6px rgba(34, 197, 94, 0.2)',
                            '0 0 0 0 rgba(34, 197, 94, 0)',
                          ]
                        : 'none',
                  }}
                  transition={{
                    duration: 2,
                    repeat: user.status === 'online' ? Infinity : 0,
                  }}
                  className={`absolute bottom-2 right-2 h-5 w-5 rounded-full border-3 border-black ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </motion.div>
            </div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.displayName}
              </h2>
              <p
                className={`text-sm font-medium ${
                  user.status === 'online'
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}
              >
                {user.status === 'online'
                  ? 'Active now'
                  : `Last seen ${new Date(user.lastSeen).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}`}
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2 mb-6"
            >
              {/* Status Card */}
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/30">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" />
                  <span className="text-xs text-emerald-400/60">Status</span>
                  <span className="ml-auto text-sm font-medium text-white capitalize">
                    {user.status}
                  </span>
                </div>
              </div>

              {/* Last Seen Card */}
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/30">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-400" />
                  <span className="text-xs text-emerald-400/60">Last Seen</span>
                  <span className="ml-auto text-sm font-medium text-white">
                    {new Date(user.lastSeen).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
