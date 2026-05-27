import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNetworkStatus } from './useNetworkStatus';

describe('useNetworkStatus', () => {
  const mockNavigator = (isOnline: boolean) => {
    vi.stubGlobal('navigator', {
      onLine: isOnline,
    });
  };

  beforeEach(() => {
    vi.stubGlobal('navigator', {
      onLine: true,
    });
    vi.stubGlobal('window', {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return initial online status', () => {
    mockNavigator(true);
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(true);
  });

  it('should return initial offline status', () => {
    mockNavigator(false);
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(false);
  });

  it('should update status when going offline', () => {
    mockNavigator(true);
    let offlineCallback: () => void = () => {};

    vi.stubGlobal('window', {
      addEventListener: vi.fn((event, callback) => {
        if (event === 'offline') offlineCallback = callback;
      }),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      mockNavigator(false);
      offlineCallback();
    });

    expect(result.current.isOnline).toBe(false);
  });

  it('should update status when going online', () => {
    mockNavigator(false);
    let onlineCallback: () => void = () => {};

    vi.stubGlobal('window', {
      addEventListener: vi.fn((event, callback) => {
        if (event === 'online') onlineCallback = callback;
      }),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      mockNavigator(true);
      onlineCallback();
    });

    expect(result.current.isOnline).toBe(true);
  });
});
