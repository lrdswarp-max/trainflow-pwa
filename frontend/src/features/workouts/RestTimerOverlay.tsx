import React, { useEffect, useState } from 'react';
import { useHaptics } from '@/shared/hooks/useHaptics';
import { ProgressRing } from './ProgressRing';

interface RestTimerOverlayProps {
  duration: number; // in seconds
  onComplete: () => void;
  onSkip: () => void;
}

export function RestTimerOverlay({ duration, onComplete, onSkip }: RestTimerOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const { trigger } = useHaptics();

  useEffect(() => {
    if (timeLeft <= 0) {
      trigger('success');
      onComplete();
      return;
    }

    // Trigger warning haptics for the last 3 seconds
    if (timeLeft <= 3 && timeLeft > 0) {
      trigger('warning');
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete, trigger]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-gray-400 mb-8 tracking-widest uppercase">Rest</h2>
      
      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} size={240} strokeWidth={8} className="absolute" />
        <span className="text-7xl font-light tracking-tighter tabular-nums">
          {timeLeft}
        </span>
      </div>

      <button 
        onClick={onSkip}
        className="mt-16 text-gray-400 hover:text-white font-medium tracking-wide uppercase text-sm border border-gray-700 rounded-full px-8 py-3 transition-all active:scale-95"
      >
        Skip Rest
      </button>
    </div>
  );
}
