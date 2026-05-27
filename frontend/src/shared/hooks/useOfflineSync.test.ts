import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useOfflineSync } from './useOfflineSync';

describe('useOfflineSync', () => {
  it('should check for pending data and sync if online', async () => {
    const { result } = renderHook(() => useOfflineSync());

    expect(result.current.isSyncing).toBe(false);
    expect(result.current.pendingCount).toBeGreaterThanOrEqual(0);

    await act(async () => {
      await result.current.syncNow();
    });

    expect(result.current.isSyncing).toBe(false);
  });
});
