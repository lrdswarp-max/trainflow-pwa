import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing', () => {
  it('renders SVG with correct attributes', () => {
    render(<ProgressRing progress={50} size={100} strokeWidth={10} />);
    
    const svg = screen.getByTestId('progress-ring-svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('renders with 100% progress', () => {
    render(<ProgressRing progress={100} size={100} strokeWidth={10} />);
    const circle = screen.getByTestId('progress-ring-circle');
    // Assuming circumference calculation, 100% should have 0 offset
    expect(circle).toHaveAttribute('stroke-dashoffset', '0');
  });
});
