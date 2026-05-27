import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MessageBubble } from './MessageBubble';

describe('MessageBubble', () => {
  it('renders a sent message correctly', () => {
    render(<MessageBubble content="Hello" status="sent" isOwn={true} />);
    const msg = screen.getByText('Hello');
    expect(msg).toBeInTheDocument();
  });

  it('renders a pending message with a visual indicator', () => {
    render(<MessageBubble content="Offline message" status="pending" isOwn={true} />);
    const msg = screen.getByText('Offline message');
    expect(msg).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('renders a received message correctly', () => {
    render(<MessageBubble content="Hi there" status="sent" isOwn={false} />);
    const msg = screen.getByText('Hi there');
    expect(msg).toBeInTheDocument();
  });
});
