import React, { useState } from 'react';

interface SetLoggerProps {
  onConfirm: (weight: number, reps: number) => void;
  previousWeight?: number;
  previousReps?: number;
}

export function SetLogger({ onConfirm, previousWeight = 0, previousReps = 0 }: SetLoggerProps) {
  const [weight, setWeight] = useState<number | string>(previousWeight);
  const [reps, setReps] = useState<number | string>(previousReps);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(Number(weight), Number(reps));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-900 rounded-2xl">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-400 mb-1 text-center">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            min="0"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-gray-800 text-white text-3xl font-bold text-center py-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="reps" className="block text-sm font-medium text-gray-400 mb-1 text-center">Reps</label>
          <input
            id="reps"
            type="number"
            min="0"
            step="1"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full bg-gray-800 text-white text-3xl font-bold text-center py-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg active:scale-95"
      >
        Confirm Set
      </button>
    </form>
  );
}
