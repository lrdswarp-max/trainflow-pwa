import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const magicLinkMutation = useMutation({
    mutationFn: (email: string) => {
      return api.post('/auth/magic-link', { email });
    },
    onSuccess: () => {
      setSent(true);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (token: string) => {
      return api.post('/auth/verify', { token });
    },
    onSuccess: (response) => {
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      // Redirect to home (which will be implemented later)
      navigate('/home');
    },
  });

  useEffect(() => {
    if (token) {
      verifyMutation.mutate(token);
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      magicLinkMutation.mutate(email);
    }
  };

  if (token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1F3A] text-white p-6">
        <div className="w-full max-w-md bg-[#242B4D] rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
          {verifyMutation.isPending ? (
            <>
              <Loader2 className="animate-spin w-12 h-12 mx-auto mb-6 text-emerald-400" />
              <h1 className="text-2xl font-bold mb-2">Authenticating...</h1>
              <p className="text-white/60">Verifying your magic link.</p>
            </>
          ) : verifyMutation.isError ? (
            <>
              <div className="w-12 h-12 mx-auto mb-6 text-red-400">⚠️</div>
              <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
              <p className="text-white/60 mb-6">The link is invalid or has expired.</p>
              <button 
                onClick={() => navigate('/login')}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl transition-colors"
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-12 h-12 mx-auto mb-6 text-emerald-400" />
              <h1 className="text-2xl font-bold mb-2">Success!</h1>
              <p className="text-white/60">Redirecting to your dashboard...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1F3A] text-white p-6">
        <div className="w-full max-w-md bg-[#242B4D] rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full text-emerald-400">
            <Send className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Check your email</h1>
          <p className="text-white/60 mb-8">
            We've sent a magic link to <span className="text-white font-medium">{email}</span>. 
            Click the link to log in instantly.
          </p>
          <button 
            onClick={() => setSent(false)}
            className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
          >
            Try another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1F3A] text-white p-6 font-sans">
      <div className="w-full max-w-md bg-[#242B4D] rounded-3xl p-8 shadow-2xl border border-white/10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">TrainFlow</h1>
          <p className="text-white/60">Your journey to peak performance starts here.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2 px-1">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1A1F3A] border border-white/10 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-white/20"
            />
          </div>

          <button
            type="submit"
            disabled={magicLinkMutation.isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-[#1A1F3A] font-bold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
          >
            {magicLinkMutation.isPending ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                Send Magic Link
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <a 
            href="/trainer-login" 
            className="text-sm font-medium text-white/30 hover:text-white/60 transition-colors"
          >
            Trainer access
          </a>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-white/20 uppercase tracking-widest font-bold">
        Secure & Passwordless
      </p>
    </div>
  );
}
