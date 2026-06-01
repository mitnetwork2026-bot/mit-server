"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MITDarkConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MITDarkConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: MITDarkConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-purple-800/50 bg-gradient-to-br from-gray-900/60 via-black/60 to-purple-900/40 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Liquid Glass Border with eerie glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-purple-600/30"
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(168, 85, 247, 0.05), 0 0 30px rgba(168, 85, 247, 0.1)",
                  "inset 0 0 40px rgba(168, 85, 247, 0.1), 0 0 60px rgba(168, 85, 247, 0.15)",
                  "inset 0 0 20px rgba(168, 85, 247, 0.05), 0 0 30px rgba(168, 85, 247, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              pointerEvents="none"
            />

            <div className="relative z-10">
              {/* Icon - Spooky */}
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-900 to-gray-800 mx-auto mb-6 border border-purple-600/40"
              >
                <motion.svg
                  className="h-8 w-8 text-purple-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </motion.svg>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-2xl font-bold text-white mb-2"
              >
                MIT Dark Access
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-purple-200/70 mb-6"
              >
                Do you really want to enter the MIT Dark environment? This is a restricted area. Proceed with caution.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <motion.button
                  onClick={onCancel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl py-3 px-4 font-medium text-purple-300 border border-purple-500/40 hover:bg-purple-500/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl py-3 px-4 font-medium text-white bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-600 hover:to-gray-600 transition-colors shadow-lg shadow-purple-500/20"
                >
                  Confirm
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
