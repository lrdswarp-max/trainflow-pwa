
import { Play, Clock, Calendar, MessageSquare, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomeView() {
  // Mock data for now, will be connected to Dexie.js in future tasks
  const recentSessions = [
    { id: 1, name: 'Upper Body Power', date: '2 days ago', duration: '45 min' },
    { id: 2, name: 'Leg Day Essentials', date: '4 days ago', duration: '60 min' },
  ];

  return (
    <div className="flex-1 bg-[#1A1F3A] text-white p-6 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
        <p className="text-white/60">Ready for today's session?</p>
      </header>

      {/* Today's Workout CTA */}
      <section className="mb-10">
        <div className="bg-emerald-500 rounded-3xl p-6 shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[#1A1F3A] font-bold text-xs uppercase tracking-widest bg-white/20 px-2 py-1 rounded mb-4 inline-block">Today's Plan</span>
            <h2 className="text-[#1A1F3A] text-2xl font-extrabold mb-1">Full Body Ignition</h2>
            <p className="text-[#1A1F3A]/70 font-medium mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" /> 55 mins • High Intensity
            </p>
            <button className="bg-[#1A1F3A] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-transform active:scale-95">
              <Play className="w-5 h-5 fill-current" />
              Start Workout
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Play className="w-40 h-40" />
          </div>
        </div>
      </section>

      {/* Recent Sessions */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
          Recent Sessions
          <span className="text-sm font-medium text-emerald-400">View all</span>
        </h3>
        <div className="space-y-4">
          {recentSessions.map(session => (
            <div key={session.id} className="bg-[#242B4D] rounded-2xl p-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{session.name}</h4>
                  <p className="text-xs text-white/40">{session.date} • {session.duration}</p>
                </div>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <Play className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#242B4D]/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-emerald-400">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-white/40">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Workouts</span>
        </button>
        <Link to="/chat" className="flex flex-col items-center gap-1 text-white/40 hover:text-emerald-400 transition-colors">
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Chat</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 text-white/40 hover:text-emerald-400 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
