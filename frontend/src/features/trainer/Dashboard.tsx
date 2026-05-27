
import { TrainerLayout } from '@/features/trainer/TrainerLayout';
import { Users, Activity } from 'lucide-react';

export function Dashboard() {
  return (
    <TrainerLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A1F3A] rounded-2xl p-6 border border-white/5 flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium mb-1">Active Students</p>
              <h3 className="text-4xl font-bold">12</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          
          <div className="bg-[#1A1F3A] rounded-2xl p-6 border border-white/5 flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium mb-1">Recent Activity</p>
              <h3 className="text-4xl font-bold">8</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1F3A] rounded-2xl p-6 border border-white/5">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <p className="text-white/60 text-sm">Select an option from the sidebar to manage students or build workouts.</p>
        </div>
      </div>
    </TrainerLayout>
  );
}
