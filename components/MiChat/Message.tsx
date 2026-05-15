'use client';

import { motion } from 'framer-motion';
import { MoreVertical, Check, CheckCheck } from 'lucide-react';
import { useState } from 'react';

interface MessageProps {
  id: string;
  senderId: string;
  senderName: string;
  senderProfileImage: string;
  text: string;
  timestamp: number;
  seenBy: { [key: string]: boolean };
  reactions: { [key: string]: string };
  isCurrentUser: boolean;
  isAdmin: boolean;
  currentUserId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onAddReaction: (id: string, emoji: string) => void;
  isEdited?: boolean;
}

export default function Message({
  id,
  senderId,
  senderName,
  senderProfileImage,
  text,
  timestamp,
  seenBy,
  reactions,
  isCurrentUser,
  isAdmin,
  currentUserId,
  onDelete,
  onEdit,
  onAddReaction,
  isEdited,
}: MessageProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const seenCount = Object.keys(seenBy).length;

  const handleEdit = () => {
    if (editedText.trim()) {
      onEdit(id, editedText);
      setIsEditing(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isCurrentUser && (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          {senderProfileImage ? (
            <img
              src={senderProfileImage}
              alt={senderName}
              className="h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-emerald-400 transition-all"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/50 transition-colors">
              <span className="text-xs font-bold text-emerald-400">{getInitials(senderName)}</span>
            </div>
          )}
        </motion.div>
      )}

      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-400/60 mb-1"
          >
            {senderName}
          </motion.p>
        )}

        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`rounded-2xl px-4 py-2 max-w-xs shadow-md transition-all ${
              isCurrentUser
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-br-sm hover:from-emerald-500 hover:to-emerald-600'
                : 'bg-emerald-950/50 border border-emerald-500/20 text-emerald-100 rounded-bl-sm hover:border-emerald-500/40'
            }`}
          >
            {isEditing ? (
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleEdit}
                onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
                autoFocus
                className="bg-transparent outline-none w-full"
              />
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                {text}
              </motion.p>
            )}
          </motion.div>

          {/* Menu button */}
          {(isCurrentUser || isAdmin) && (
            <motion.button
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical size={16} className="text-emerald-400/60" />
              {showMenu && (
                <div className="absolute top-full mt-1 bg-black border border-emerald-500/20 rounded-lg overflow-hidden z-10 right-0">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-xs hover:bg-emerald-500/20 whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(id);
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-xs hover:bg-red-500/20 text-red-400 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.button>
          )}
        </div>

        {/* Reactions */}
        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap max-w-xs">
            {Object.values(reactions).map((emoji, idx) => (
              <span key={idx} className="text-lg">
                {emoji}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp and seen indicator */}
        {isCurrentUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 mt-1"
          >
            <p className="text-xs text-emerald-400/60">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {isEdited && ' (edited)'}
            </p>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {seenCount > 1 ? (
                <CheckCheck size={14} className="text-emerald-400" />
              ) : (
                <Check size={14} className="text-emerald-400/60" />
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
