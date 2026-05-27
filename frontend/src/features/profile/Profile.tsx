import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type User } from '@/core/db/db';
import { seedDatabase } from '@/core/db/seed';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function Profile({ currentUserId = 1 }: { currentUserId?: number }) {
  const navigate = useNavigate();
  const user = useLiveQuery(() => db.users.get(currentUserId), [currentUserId]);
  
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    height: 0,
    weight: 0,
    goals: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        height: user.height || 0,
        weight: user.weight || 0,
        goals: user.goals || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'height' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.id) {
      await db.users.update(user.id, formData);
    }
  };

  if (!user) return <div className="p-4 text-white">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F3A] text-white">
      <header className="px-4 py-4 flex items-center border-b border-white/10 bg-[#242B4D]">
        <button onClick={() => navigate(-1)} className="mr-4 text-emerald-400 hover:text-emerald-300" aria-label="Go back">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center text-4xl font-bold text-emerald-400 mb-4 border-2 border-emerald-500">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-white/60">{user.email}</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full bg-[#242B4D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Height (cm)</label>
              <input 
                type="number"
                name="height"
                value={formData.height || ''}
                onChange={handleChange}
                className="w-full bg-[#242B4D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Weight (kg)</label>
              <input 
                type="number"
                name="weight"
                value={formData.weight || ''}
                onChange={handleChange}
                className="w-full bg-[#242B4D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Fitness Goals</label>
            <textarea
              name="goals"
              value={formData.goals || ''}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#242B4D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
              placeholder="E.g., Gain muscle, lose 5kg, improve stamina..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-[#1A1F3A] font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Profile
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Developer Area</p>
          <button 
            onClick={async () => {
              await seedDatabase();
              alert('Mock data seeded! Refreshing...');
              window.location.reload();
            }}
            className="text-xs font-mono bg-white/5 hover:bg-white/10 text-white/60 px-4 py-2 rounded-lg transition-colors"
          >
            🌱 Seed Database
          </button>
        </div>
      </main>
    </div>
  );
}
