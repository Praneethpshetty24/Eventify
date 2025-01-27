import React from 'react';

const SuccessPopup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">{message}</h3>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
              py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02]
              hover:from-purple-700 hover:to-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup; 