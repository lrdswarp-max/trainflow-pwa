import { useEffect } from 'react';
import { useNetworkStatus } from '@/shared/hooks/useNetworkStatus';
import { db } from '@/core/db/db';

export function useChatSync() {
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const syncMessages = async () => {
      if (!isOnline) return;

      const pendingMessages = await db.messages
        .where('status')
        .equals('pending')
        .toArray();

      if (pendingMessages.length === 0) return;

      // In a real app, we'd send these to the backend here via fetch or WebSocket.
      // For this MVP, we simulate syncing them.
      for (const msg of pendingMessages) {
        await db.messages.update(msg.id, { status: 'sent' });
      }
    };

    syncMessages();
  }, [isOnline]);
}
