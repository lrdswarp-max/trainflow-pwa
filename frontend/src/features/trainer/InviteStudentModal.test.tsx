import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InviteStudentModal } from './InviteStudentModal';

describe('InviteStudentModal', () => {
  it('renders modal and handles submission', () => {
    const handleClose = vi.fn();
    const handleInvite = vi.fn();

    render(<InviteStudentModal isOpen={true} onClose={handleClose} onInvite={handleInvite} />);
    
    expect(screen.getByText('Invite New Student')).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'student@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /Send Invite/i });
    fireEvent.click(submitButton);

    expect(handleInvite).toHaveBeenCalledWith('student@example.com');
  });

  it('does not render when closed', () => {
    render(<InviteStudentModal isOpen={false} onClose={vi.fn()} onInvite={vi.fn()} />);
    expect(screen.queryByText('Invite New Student')).not.toBeInTheDocument();
  });
});
