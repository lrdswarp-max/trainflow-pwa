import React, { useState } from 'react';
import { TrainerLayout } from '@/features/trainer/TrainerLayout';
import { InviteStudentModal } from '@/features/trainer/InviteStudentModal';
import { UserPlus, MoreVertical, Mail } from 'lucide-react';

export function StudentsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Invited' },
  ]);

  const handleInvite = (email: string) => {
    setStudents([...students, { id: Date.now(), name: 'Pending', email, status: 'Invited' }]);
    setIsModalOpen(false);
  };

  return (
    <TrainerLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Students</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#111424] font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Invite Student
          </button>
        </div>

        <div className="bg-[#1A1F3A] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 font-medium text-white/60">Name</th>
                <th className="p-4 font-medium text-white/60">Email</th>
                <th className="p-4 font-medium text-white/60">Status</th>
                <th className="p-4 font-medium text-white/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-white">{student.name}</div>
                  </td>
                  <td className="p-4 text-white/60 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {student.email}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <InviteStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onInvite={handleInvite} 
      />
    </TrainerLayout>
  );
}
