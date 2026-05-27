import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { NetworkBanner } from './components/NetworkBanner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <NetworkBanner />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={<div className="p-8">Home Screen (Coming Soon)</div>} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
