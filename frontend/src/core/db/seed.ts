import { db } from '@/core/db/db';

export async function seedDatabase() {
  await db.transaction('rw', db.users, db.workouts, db.setLogs, db.messages, async () => {
    // Clear existing
    await db.users.clear();
    await db.workouts.clear();
    await db.setLogs.clear();
    await db.messages.clear();

    // 1. Add Trainer
    const trainerId = await db.users.add({
      name: 'Alex Trainer',
      email: 'alex@trainflow.app',
      role: 'trainer'
    });

    // 2. Add Students
    const student1 = await db.users.add({
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      role: 'student',
      height: 165,
      weight: 62,
      goals: 'Increase core strength and agility'
    });

    const student2 = await db.users.add({
      name: 'John Smith',
      email: 'john@example.com',
      role: 'student',
      height: 180,
      weight: 85,
      goals: 'Gain muscle mass'
    });

    if (!student1 || !student2 || !trainerId) return;

    // 3. Add Workouts
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    const workout1Id = await db.workouts.add({
      studentId: student1.toString(),
      trainerId: trainerId.toString(),
      name: 'Full Body Ignition',
      date: today,
      exercises: [],
      status: 'planned'
    });

    const workout2Id = await db.workouts.add({
      studentId: student2.toString(),
      trainerId: trainerId.toString(),
      name: 'Upper Body Power',
      date: yesterday,
      exercises: [],
      status: 'completed'
    });

    // 4. Add Set Logs
    await db.setLogs.bulkAdd([
      { workoutId: workout1Id.toString(), exerciseId: 'squat', reps: 10, weight: 60, completedAt: new Date() },
      { workoutId: workout2Id.toString(), exerciseId: 'bench', reps: 8, weight: 80, completedAt: new Date(Date.now() - 86400000) }
    ]);

    // 5. Add Chat Messages
    const now = Date.now();
    await db.messages.bulkAdd([
      {
        id: crypto.randomUUID(),
        senderId: trainerId.toString(),
        receiverId: student1.toString(),
        content: 'Hey Sarah, ready for today\'s session? We are focusing on legs.',
        timestamp: now - 3600000, // 1 hour ago
        status: 'sent'
      },
      {
        id: crypto.randomUUID(),
        senderId: student1.toString(),
        receiverId: trainerId.toString(),
        content: 'Yes! Let\'s do it.',
        timestamp: now - 3500000,
        status: 'sent'
      }
    ]);
  });
}
