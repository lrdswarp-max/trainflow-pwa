import { useState } from 'react';
import { TrainerLayout } from '@/features/trainer/TrainerLayout';
import { Plus, GripVertical, Save } from 'lucide-react';
import type { Exercise } from '@/shared/types/workout';

export function WorkoutBuilder() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  // Mock list of available exercises
  const availableExercises: Exercise[] = [
    { id: '1', name: 'Barbell Squat', targetMuscles: ['Quads', 'Glutes'] },
    { id: '2', name: 'Bench Press', targetMuscles: ['Chest', 'Triceps'] },
    { id: '3', name: 'Deadlift', targetMuscles: ['Hamstrings', 'Back'] },
  ];

  const addExercise = (ex: Exercise) => {
    setExercises([...exercises, { ...ex, id: crypto.randomUUID() }]);
    setShowSelector(false);
  };

  return (
    <TrainerLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Workout Builder</h1>
            <p className="text-white/60">Create a new routine for your students</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#111424] font-bold px-5 py-2.5 rounded-xl transition-colors">
            <Save className="w-5 h-5" />
            Save Workout
          </button>
        </div>

        <div className="max-w-3xl">
          <div className="space-y-4 mb-6">
            {exercises.map((ex, idx) => (
              <div key={ex.id} className="bg-[#1A1F3A] rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                <div className="text-white/20 cursor-grab hover:text-white/60 transition-colors">
                  <GripVertical className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{ex.name}</h3>
                  <p className="text-white/40 text-sm text-sm">Targets: {ex.targetMuscles?.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>

          {!showSelector ? (
            <button 
              onClick={() => setShowSelector(true)}
              className="w-full border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-emerald-400 transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="font-medium">Add Exercise</span>
            </button>
          ) : (
            <div className="bg-[#1A1F3A] rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4">Select an Exercise</h3>
              <div className="grid gap-3">
                {availableExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => addExercise(ex)}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 transition-colors text-left group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{ex.name}</div>
                      <div className="text-sm text-white/40">{ex.targetMuscles?.join(', ')}</div>
                    </div>
                    <Plus className="w-5 h-5 text-white/40 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowSelector(false)}
                className="mt-6 text-white/40 hover:text-white transition-colors text-sm font-medium w-full text-center"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </TrainerLayout>
  );
}
