import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { WifiOff, AlertTriangle } from 'lucide-react';

export function NetworkBanner() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="bg-amber-500 text-[#1A1F3A] py-2 px-4 flex items-center justify-center gap-3 font-bold animate-in slide-in-from-top duration-300">
      <WifiOff className="w-5 h-5" />
      <div className="flex items-center gap-2">
        <span className="uppercase tracking-wider text-xs bg-[#1A1F3A] text-white px-2 py-0.5 rounded">Offline Mode</span>
        <span className="text-sm">You are offline. Some features may be limited.</span>
      </div>
      <AlertTriangle className="w-5 h-5" />
    </div>
  );
}
