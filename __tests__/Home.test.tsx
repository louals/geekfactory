import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '../components/home/Hero'

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />
    },
}))

// Mock framer-motion to render children immediately
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
}))

describe('Hero', () => {
    it('renders the main heading', () => {
        render(<Hero />)

        // The Hero component has an h1 with "Luminous"
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Luminous/i)
    })
})
