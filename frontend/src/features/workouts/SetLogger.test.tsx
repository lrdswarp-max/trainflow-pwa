import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SetLogger } from './SetLogger';

describe('SetLogger', () => {
  it('allows user to input weight and reps and click confirm', () => {
    const handleConfirm = vi.fn();
    render(<SetLogger onConfirm={handleConfirm} previousWeight={50} previousReps={10} />);

    const weightInput = screen.getByLabelText(/weight/i);
    const repsInput = screen.getByLabelText(/reps/i);
    const button = screen.getByRole('button', { name: /confirm set/i });

    // Initial values should be previous ones
    expect(weightInput).toHaveValue(50);
    expect(repsInput).toHaveValue(10);

    // Change values
    fireEvent.change(weightInput, { target: { value: '55' } });
    fireEvent.change(repsInput, { target: { value: '12' } });

    // Confirm
    fireEvent.click(button);

    expect(handleConfirm).toHaveBeenCalledWith(55, 12);
  });
});
