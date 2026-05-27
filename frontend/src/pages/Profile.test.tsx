import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';
import { db } from '../lib/db';

describe('Profile Page', () => {
  beforeEach(async () => {
    await db.users.clear();
    await db.users.add({
      id: 1,
      email: 'test@example.com',
      name: 'John Doe',
      height: 180,
      weight: 80,
      goals: 'Gain muscle'
    });
  });

  it('renders profile data from database', async () => {
    render(
      <MemoryRouter>
        <Profile currentUserId={1} />
      </MemoryRouter>
    );
    
    expect(await screen.findByDisplayValue('John Doe')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('180')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('80')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Gain muscle')).toBeInTheDocument();
  });

  it('allows editing and saves to database', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Profile currentUserId={1} />
      </MemoryRouter>
    );
    
    const weightInput = await screen.findByDisplayValue('80');
    await act(async () => {
      await user.clear(weightInput);
      await user.type(weightInput, '82');
    });

    const saveButton = screen.getByText(/save/i);
    await act(async () => {
      await user.click(saveButton);
    });

    const updatedUser = await db.users.get(1);
    expect(updatedUser?.weight).toBe(82);
  });
});
