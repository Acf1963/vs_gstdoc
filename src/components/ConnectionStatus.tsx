import React, { useState, useEffect } from 'react';

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div 
      className={`fixed top-24 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-500 cursor-help ${
        isOnline ? 'bg-moss shadow-[0_0_15px_rgba(79,121,66,0.4)]' : 'bg-red-600 animate-pulse'
      }`}
      title={isOnline ? 'Sistema Online' : 'Modo Offline Ativo'}
    >
      <i className={`fas ${isOnline ? 'fa-wifi' : 'fa-plane'} text-sm text-white`}></i>
    </div>
  );
};

export default ConnectionStatus;