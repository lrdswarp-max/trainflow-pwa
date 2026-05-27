import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from '@/features/auth/Login';
import { HomeView } from '@/features/home/Home';
import { NetworkBanner } from '@/shared/ui/NetworkBanner';
import { Dashboard } from '@/features/trainer/Dashboard';
import { StudentsList } from '@/features/trainer/StudentsList';
import { WorkoutBuilder } from '@/features/trainer/WorkoutBuilder';
import Chat from '@/features/chat/Chat';
import Profile from '@/features/profile/Profile';
import '@/app/styles/App.css';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#1A1F3A]">
        <NetworkBanner />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={<HomeView />} />
            <Route path="/trainer/dashboard" element={<Dashboard />} />
            <Route path="/trainer/students" element={<StudentsList />} />
            <Route path="/trainer/workouts" element={<WorkoutBuilder />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}
