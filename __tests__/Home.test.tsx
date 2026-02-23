import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from '../components/home/Hero';
import { ReactNode } from 'react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // 1. Destructure to remove fill and priority so they don't reach the <img> tag
    // 2. Removed the eslint-disable comments that were causing the "Unused directive" warning
    const { src, alt, fill, priority, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
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

// Define the shape of image props
interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Luminous/i);
  });
});