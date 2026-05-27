import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { HomeView } from './pages/Home';
import { NetworkBanner } from './components/NetworkBanner';
import { Dashboard } from './pages/trainer/Dashboard';
import { StudentsList } from './pages/trainer/StudentsList';
import { WorkoutBuilder } from './pages/trainer/WorkoutBuilder';
import Chat from './pages/Chat';
import './App.css';

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
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}
