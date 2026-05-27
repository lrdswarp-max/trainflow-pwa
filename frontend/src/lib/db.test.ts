import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from './db';

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
});
