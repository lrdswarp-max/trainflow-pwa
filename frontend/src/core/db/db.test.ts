import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '@/core/db/db';

describe('Database', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('should have users and workouts tables', () => {
    expect(db.tables.map(t => t.name)).toContain('users');
    expect(db.tables.map(t => t.name)).toContain('workouts');
  });

  it('should be able to add a user', async () => {
    const id = await db.users.add({ name: 'Test User', email: 'test@example.com' });
    const user = await db.users.get(id);
    expect(user?.name).toBe('Test User');
  });

  it('should have a messages table and support offline queue querying', async () => {
    expect(db.tables.map(t => t.name)).toContain('messages');
    
    await db.messages.add({
      id: 'msg1',
      senderId: 'u1',
      receiverId: 'u2',
      content: 'Pending message',
      status: 'pending',
      timestamp: Date.now()
    });

    const pending = await db.messages.where('status').equals('pending').toArray();
    expect(pending.length).toBe(1);
    expect(pending[0].content).toBe('Pending message');
  });
});
