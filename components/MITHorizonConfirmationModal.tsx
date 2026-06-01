"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MITHorizonConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MITHorizonConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: MITHorizonConfirmationModalProps) {
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 via-blue-950/40 to-blue-900/40 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Liquid Glass Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-cyan-400/20"
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(34, 197, 94, 0.1)",
                  "inset 0 0 40px rgba(34, 197, 94, 0.2)",
                  "inset 0 0 20px rgba(34, 197, 94, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              pointerEvents="none"
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mx-auto mb-6"
              >
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-2xl font-bold text-white mb-2"
              >
                MIT Horizon Access
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-blue-200/80 mb-6"
              >
                Do you really want to enter the MIT Horizon environment? You will be verified and authenticated through our secure system.
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
                  className="flex-1 rounded-xl py-3 px-4 font-medium text-blue-300 border border-blue-400/40 hover:bg-blue-500/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl py-3 px-4 font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-colors shadow-lg shadow-blue-500/30"
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
