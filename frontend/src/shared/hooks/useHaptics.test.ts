import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useHaptics } from './useHaptics';

describe('useHaptics', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      vibrate: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should call navigator.vibrate when trigger is called', () => {
    const { result } = renderHook(() => useHaptics());
    
    result.current.trigger('success');
    expect(navigator.vibrate).toHaveBeenCalledWith([100, 50, 100]);
  });

  it('should call navigator.vibrate with different patterns', () => {
    const { result } = renderHook(() => useHaptics());
    
    result.current.trigger('warning');
    expect(navigator.vibrate).toHaveBeenCalledWith([200]);
  });
});
