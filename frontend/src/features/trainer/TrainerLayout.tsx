import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Dumbbell, MessageSquare, LogOut } from 'lucide-react';

export function TrainerLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { label: 'Students', icon: Users, path: '/trainer/dashboard' },
    { label: 'Workouts', icon: Dumbbell, path: '/trainer/workouts' },
    { label: 'Messages', icon: MessageSquare, path: '/trainer/messages' },
  ];

  return (
    <div className="min-h-screen bg-[#111424] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1F3A] border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-emerald-400 tracking-tight">Trainer Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link 
            to="/login"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
