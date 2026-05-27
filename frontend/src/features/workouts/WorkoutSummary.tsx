
import type { Workout } from '@/shared/types/workout';

interface WorkoutSummaryProps {
  workout: Workout;
  onFinish: () => void;
}

export function WorkoutSummary({ workout, onFinish }: WorkoutSummaryProps) {
  const durationMs = (workout.endTime?.getTime() || 0) - (workout.startTime?.getTime() || 0);
  const minutes = Math.floor(durationMs / 60000);
  
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold mb-2 tracking-tight text-blue-500">Workout Complete</h1>
      <p className="text-gray-400 mb-12 text-lg">{workout.name}</p>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm mb-12">
        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-800">
          <span className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Time</span>
          <span className="text-4xl font-bold">{minutes}m</span>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-800">
          <span className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Volume</span>
          <span className="text-4xl font-bold">{workout.totalVolume || 0}kg</span>
        </div>
      </div>

      <button 
        onClick={onFinish}
        className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
      >
        Finish Workout
      </button>
    </div>
  );
}
