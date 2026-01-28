import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePageContent from './Home.js';

// Mock mocks
vi.mock('@hooks/index.js', () => ({
    useUser: (selector: any) => selector({ user: { username: 'TestUser' } })
}));

vi.mock('./components/config.js', () => ({
    featureCardData: [
        { title: 'Feature 1', details: 'Details 1', link: '/link1', buttonText: 'Go 1' },
        { title: 'Feature 2', details: 'Details 2', link: '/link2', buttonText: 'Go 2' }
    ]
}));

vi.mock('./components/FeatureCard.js', () => ({
    default: ({ title }: any) => <div data-testid="feature-card">{title}</div>
}));

describe('HomePageContent', () => {
    it('renders welcome message with username', () => {
        render(<HomePageContent />);
        expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
        expect(screen.getByText('TestUser')).toBeInTheDocument();
    });

    it('renders feature cards', () => {
        render(<HomePageContent />);
        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByText('Feature 2')).toBeInTheDocument();
        expect(screen.getAllByTestId('feature-card')).toHaveLength(2);
    });
});
