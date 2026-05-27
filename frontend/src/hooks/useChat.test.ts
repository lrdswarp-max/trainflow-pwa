import '@testing-library/jest-dom';
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useChat } from './useChat';
import { db } from '../lib/db';
import { useNetworkStatus } from './useNetworkStatus';

vi.mock('./useNetworkStatus', () => ({
  useNetworkStatus: vi.fn(),
}));

let mockWsInstance: any = null;

class MockWebSocket {
  url: string;
  onopen: any;
  onclose: any;
  onmessage: any;
  onerror: any;
  readyState = 1;

  constructor(url: string) {
    this.url = url;
    mockWsInstance = this;
    setTimeout(() => this.onopen?.(), 10);
  }
  send = vi.fn();
  close = vi.fn();
}

describe('useChat', () => {
  beforeEach(async () => {
    await db.messages.clear();
    vi.clearAllMocks();
    (global as any).WebSocket = MockWebSocket;
    mockWsInstance = null;
  });

  afterEach(() => {
    delete (global as any).WebSocket;
  });

  it('saves pending message when offline', async () => {
    (useNetworkStatus as any).mockReturnValue(false);
    const { result } = renderHook(() => useChat('user1', 'trainer1'));

    await act(async () => {
      await result.current.sendMessage('Hello Offline');
    });

    const msgs = await db.messages.toArray();
    expect(msgs.length).toBe(1);
    expect(msgs[0].content).toBe('Hello Offline');
    expect(msgs[0].status).toBe('pending');
  });

  it('sends message via websocket and saves as sent when online', async () => {
    (useNetworkStatus as any).mockReturnValue(true);
    const { result } = renderHook(() => useChat('user1', 'trainer1'));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    await act(async () => {
      await result.current.sendMessage('Hello Online');
    });

    expect(mockWsInstance.send).toHaveBeenCalled();
    const msgs = await db.messages.toArray();
    expect(msgs.length).toBe(1);
    expect(msgs[0].content).toBe('Hello Online');
    expect(msgs[0].status).toBe('sent');
  });

  it('receives messages from websocket and saves them', async () => {
    (useNetworkStatus as any).mockReturnValue(true);
    const { result } = renderHook(() => useChat('user1', 'trainer1'));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    const incomingMsg = {
      id: 'incoming1',
      senderId: 'trainer1',
      receiverId: 'user1',
      content: 'Hello from trainer',
      status: 'sent',
      timestamp: Date.now()
    };

    await act(async () => {
      mockWsInstance.onmessage({ data: JSON.stringify(incomingMsg) });
    });

    // Wait for the hook to process and save
    await waitFor(async () => {
      const msgs = await db.messages.toArray();
      expect(msgs.find(m => m.id === 'incoming1')).toBeDefined();
    });
  });
});
