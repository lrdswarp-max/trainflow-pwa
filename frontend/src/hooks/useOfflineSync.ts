import { useState, useCallback } from 'react';
import { db } from '../lib/db';

export function useOfflineSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const syncNow = useCallback(async () => {
    setIsSyncing(true);
    try {
      // Stub for actual sync logic (e.g. POST to backend)
      const logs = await db.setLogs.toArray();
      setPendingCount(logs.length);
    } catch (e) {
      console.error('Sync failed', e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    isSyncing,
    pendingCount,
    syncNow
  };
}
