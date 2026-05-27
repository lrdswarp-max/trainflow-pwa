import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chat from './Chat';
import { useChat } from '../hooks/useChat';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useChat', () => ({
  useChat: vi.fn()
}));

describe('Chat Page', () => {
  it('renders chat messages', () => {
    (useChat as any).mockReturnValue({
      messages: [
        { id: '1', content: 'Msg 1', senderId: 'trainer1', receiverId: 'student1', status: 'sent', timestamp: 123 },
        { id: '2', content: 'Msg 2', senderId: 'student1', receiverId: 'trainer1', status: 'pending', timestamp: 124 },
      ],
      sendMessage: vi.fn(),
      isConnected: true
    });

    render(
      <MemoryRouter>
        <Chat currentUserId="student1" otherUserId="trainer1" />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Msg 1')).toBeInTheDocument();
    expect(screen.getByText('Msg 2')).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });
});
