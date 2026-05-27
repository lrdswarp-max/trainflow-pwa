import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StudentsList } from './StudentsList';

describe('StudentsList', () => {
  it('renders the students page with invite button', () => {
    render(
      <MemoryRouter>
        <StudentsList />
      </MemoryRouter>
    );

    expect(screen.getByText('My Students')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Invite Student/i })).toBeInTheDocument();
  });
});
