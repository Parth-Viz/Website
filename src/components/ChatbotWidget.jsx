// ChatbotWidget.jsx
// Floating AI chatbot icon in the bottom right. Expands to a simple chat box on click.

import React, { useState, useRef, useEffect } from 'react';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(o => !o)}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
      >
        <span role="img" aria-label="AI Chatbot">🤖</span>
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 flex flex-col animate-fade-in-up">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg text-gray-900 dark:text-white">AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl">×</button>
          </div>
          <div className="flex-1 text-gray-700 dark:text-gray-200 mb-2">What can I help with?</div>
          <input
            ref={inputRef}
            type="text"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Type your question..."
          />
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition">Send</button>
        </div>
      )}
      <style>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 0.3s cubic-bezier(.23,1.01,.32,1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
