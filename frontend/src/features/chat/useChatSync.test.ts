import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChatSync } from '@/features/chat/useChatSync';
import { db } from '@/core/db/db';
import { useNetworkStatus } from '@/shared/hooks/useNetworkStatus';

vi.mock('./useNetworkStatus', () => ({
  useNetworkStatus: vi.fn(),
}));

describe('useChatSync', () => {
  beforeEach(async () => {
    await db.messages.clear();
    vi.clearAllMocks();
  });

  it('flushes pending messages when online', async () => {
    // Add a pending message
    await db.messages.add({
      id: 'msg-1',
      senderId: 'student-1',
      receiverId: 'trainer-1',
      content: 'Hello',
      timestamp: Date.now(),
      status: 'pending',
    });

    (useNetworkStatus as any).mockReturnValue(true); // Online

    renderHook(() => useChatSync());

    await waitFor(async () => {
      const msg = await db.messages.get('msg-1');
      expect(msg?.status).toBe('sent');
    });
  });

  it('does nothing when offline', async () => {
    await db.messages.add({
      id: 'msg-2',
      senderId: 'student-1',
      receiverId: 'trainer-1',
      content: 'Offline msg',
      timestamp: Date.now(),
      status: 'pending',
    });

    (useNetworkStatus as any).mockReturnValue(false); // Offline

    renderHook(() => useChatSync());

    // Give it some time to ensure it didn't do anything
    await new Promise(r => setTimeout(r, 100));

    const msg = await db.messages.get('msg-2');
    expect(msg?.status).toBe('pending');
  });
});
