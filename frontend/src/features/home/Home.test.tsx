import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomeView } from './Home';
import { MemoryRouter } from 'react-router-dom';

describe('HomeView', () => {
  it('renders welcome message and basic sections', () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Welcome back/i)).toBeDefined();
    expect(screen.getByText(/Full Body Ignition/i)).toBeDefined();
    expect(screen.getByText(/Recent Sessions/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Start Workout/i })).toBeDefined();
  });

  it('renders bottom navigation', () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>
    );
    
    // Check for navigation items using *AllBy* variant to handle duplicates if any
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Workouts/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Chat/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Profile/i).length).toBeGreaterThan(0);
  });
});
