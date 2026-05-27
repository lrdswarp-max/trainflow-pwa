import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '@/api/client';

// Mock the API client
vi.mock('@/api/client', () => ({
  api: {
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  },
}));

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

describe('Login Page', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /magic link/i })).toBeDefined();
  });

  it('shows trainer link', () => {
    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText(/Trainer access/i)).toBeDefined();
  });
    
  it('shows success message after sending magic link', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: { message: 'Link sent' } });

    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send magic link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Check your email/i)).toBeDefined();
      expect(screen.getByText(/test@example.com/i)).toBeDefined();
    });

    expect(api.post).toHaveBeenCalledWith('/auth/magic-link', { email: 'test@example.com' });
  });

  it('verifies token when present in URL', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: { access_token: 'fake-jwt-token' } });

    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter initialEntries={['/login?token=valid-token']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/verify', { token: 'valid-token' });
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(screen.getByText(/Home Page/i)).toBeDefined();
    });
  });

  it('shows error message if token verification fails', async () => {
    vi.mocked(api.post).mockRejectedValueOnce(new Error('Invalid token'));

    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter initialEntries={['/login?token=invalid-token']}>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Verification Failed/i)).toBeDefined();
      expect(screen.getByText(/link is invalid or has expired/i)).toBeDefined();
    });
  });
});
