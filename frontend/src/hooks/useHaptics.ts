import { useCallback } from 'react';

type HapticPattern = 'success' | 'warning' | 'error';

export function useHaptics() {
  const trigger = useCallback((pattern: HapticPattern = 'success') => {
    if (!('vibrate' in navigator)) return;

    switch (pattern) {
      case 'success':
        navigator.vibrate([100, 50, 100]); // double short buzz
        break;
      case 'warning':
        navigator.vibrate([200]); // single medium buzz
        break;
      case 'error':
        navigator.vibrate([500, 100, 500]); // double long buzz
        break;
    }
  }, []);

  return { trigger };
}
