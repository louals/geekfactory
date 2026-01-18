import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from '../components/home/Hero';
import { ReactNode } from 'react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // Use 'ComponentPropsWithoutRef' or a simple object for the mock
  default: (props: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Create a type for the motion mock
interface MotionProps {
  children: ReactNode;
  className?: string;
}

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: MotionProps) => (
      <div className={className}>{children}</div>
    ),
  },
}));

// Define the shape of image props to satisfy the linter
interface ImageProps {
  src: string;
  alt: string;
}

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Luminous/i);
  });
});