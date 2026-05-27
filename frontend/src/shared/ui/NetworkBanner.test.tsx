import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NetworkBanner } from './NetworkBanner';
import { useNetworkStatus } from '@/shared/hooks/useNetworkStatus';

vi.mock('../hooks/useNetworkStatus');

describe('NetworkBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when online', () => {
    vi.mocked(useNetworkStatus).mockReturnValue({ isOnline: true });
    render(<NetworkBanner />);
    expect(screen.queryByText(/offline/i)).toBeNull();
  });

  it('should render when offline', () => {
    vi.mocked(useNetworkStatus).mockReturnValue({ isOnline: false });
    render(<NetworkBanner />);
    expect(screen.getByText(/You are offline/i)).toBeDefined();
    expect(screen.getByText(/Offline Mode/i)).toBeDefined();
  });
});
