'use client';

import { useState, useEffect } from 'react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 max-w-md mx-auto transition-all duration-300 ${
      isOnline ? 'animate-pulse' : ''
    }`}>
      <div className={`${
        isOnline 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
          : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'
      } backdrop-blur-md border rounded-lg shadow-lg p-4`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${
            isOnline ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'
          } rounded-lg flex items-center justify-center flex-shrink-0`}>
            {isOnline ? (
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0 0L5.636 18.364m12.728 0L5.636 5.636" />
              </svg>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold ${
              isOnline ? 'text-green-900 dark:text-green-100' : 'text-orange-900 dark:text-orange-100'
            }`}>
              {isOnline ? 'Back Online!' : 'You\'re Offline'}
            </h3>
            <p className={`text-xs ${
              isOnline 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-orange-600 dark:text-orange-400'
            } mt-1`}>
              {isOnline 
                ? 'Connection restored. Fresh data is now available.' 
                : 'Using cached data. Some features may be limited.'
              }
            </p>
          </div>
          
          {isOnline && (
            <button
              onClick={() => setShowOfflineMessage(false)}
              className="text-green-400 hover:text-green-600 dark:hover:text-green-300 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
