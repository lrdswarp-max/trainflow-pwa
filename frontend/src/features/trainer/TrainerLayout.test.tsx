import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrainerLayout } from './TrainerLayout';

describe('TrainerLayout', () => {
  it('renders navigation and children', () => {
    render(
      <MemoryRouter>
        <TrainerLayout>
          <div data-testid="child-content">Dashboard Content</div>
        </TrainerLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('Trainer Panel')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Workouts')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
