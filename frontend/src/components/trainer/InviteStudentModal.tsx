import React, { useState } from 'react';

interface InviteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export function InviteStudentModal({ isOpen, onClose, onInvite }: InviteStudentModalProps) {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A1F3A] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-white">Invite New Student</h2>
        <p className="text-white/60 mb-6 text-sm">
          Send a magic link to onboard a new student to your roster.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="student-email" className="block text-sm font-medium text-white/60 mb-2">
              Email Address
            </label>
            <input
              id="student-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111424] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="student@example.com"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#111424] rounded-xl font-bold transition-colors"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
