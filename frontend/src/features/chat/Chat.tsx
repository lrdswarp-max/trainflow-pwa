import React, { useState } from 'react';
import { useChat } from '@/features/chat/useChat';
import { MessageBubble } from '@/features/chat/MessageBubble';
import { NetworkBanner } from '@/shared/ui/NetworkBanner';

export default function Chat({ currentUserId = "student1", otherUserId = "trainer1" }: { currentUserId?: string, otherUserId?: string }) {
  const { messages, sendMessage, isConnected } = useChat(currentUserId, otherUserId);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <NetworkBanner />
      <header className="px-4 py-3 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Chat
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        <div className="mt-auto">
          {messages.map(msg => (
            <MessageBubble 
              key={msg.id}
              content={msg.content}
              status={msg.status}
              isOwn={msg.senderId === currentUserId}
            />
          ))}
        </div>
      </main>

      <footer className="p-4 border-t bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
          <button 
            type="submit"
            className="bg-primary text-primary-foreground rounded-full px-6 py-2 font-medium transition-transform active:scale-95"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
