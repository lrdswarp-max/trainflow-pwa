import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RestTimerOverlay } from './RestTimerOverlay';

describe('RestTimerOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders countdown and calls onComplete when finished', () => {
    const handleComplete = vi.fn();
    render(<RestTimerOverlay duration={3} onComplete={handleComplete} onSkip={vi.fn()} />);

    expect(screen.getByText('3')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('2')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(handleComplete).toHaveBeenCalled();
  });

  it('calls onSkip when skip button is clicked', () => {
    const handleSkip = vi.fn();
    render(<RestTimerOverlay duration={60} onComplete={vi.fn()} onSkip={handleSkip} />);

    const skipButton = screen.getByRole('button', { name: /skip/i });
    fireEvent.click(skipButton);

    expect(handleSkip).toHaveBeenCalled();
  });
});
