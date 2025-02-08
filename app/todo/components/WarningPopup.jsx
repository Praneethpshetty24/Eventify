'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WarningPopup() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E1E1E] border border-yellow-500/50 rounded-lg p-6 max-w-md w-full mx-4 relative z-50"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-500">Community Guidelines</h3>
            <div className="mt-2 text-yellow-400/90">
              <p className="mb-4">
                Welcome to our community space! Before you proceed, please keep in mind:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Be respectful and kind to others</li>
                <li>No hate speech or harassment</li>
                <li>Keep content appropriate and family-friendly</li>
                <li>Think twice before posting personal information</li>
              </ul>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 