import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WorkoutBuilder } from './WorkoutBuilder';

describe('WorkoutBuilder', () => {
  it('renders builder and can add exercise', () => {
    render(
      <MemoryRouter>
        <WorkoutBuilder />
      </MemoryRouter>
    );

    expect(screen.getByText('Workout Builder')).toBeInTheDocument();
    
    // Add exercise flow
    const addButton = screen.getByRole('button', { name: /Add Exercise/i });
    fireEvent.click(addButton);

    // Mock exercise addition
    expect(screen.getByText('Select an Exercise')).toBeInTheDocument();
  });
});
