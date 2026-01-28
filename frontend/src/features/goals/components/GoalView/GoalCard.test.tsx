import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoalCard } from './GoalCard.js';
import type { CompleteGoal } from '@features/index.js';

const { navigateMock } = vi.hoisted(() => {
    return { navigateMock: vi.fn() };
});

// Mock hooks
vi.mock('@hooks/index.js', () => ({
    useAppNavigate: () => navigateMock,
    useFormatDate: () => ({
        formatISO8601: ({ dateObj }: any) => `Formatted ${dateObj}`
    })
}));

// Mock components utils
vi.mock('./components/index.js', () => ({
    getBreadCrumb: () => 'Bread > Crumb',
    getColour: () => 'bg-red-500' 
}));

describe('GoalCard', () => {
    
    beforeEach(() => {
        navigateMock.mockClear();
    });

    const mockGoal: CompleteGoal = {
        id: '1',
        goalName: 'Test Goal 1',
        desiredAchievement: 'Achieve X',
        achievementDate: '2023-12-31',
        importance: 'High',
        measurement: 'Measured by Y',
        // steps: [],
        // completeSteps: []
    };

    it('renders list of goals', () => {
        render(<GoalCard goals={[mockGoal]} />);
        
        expect(screen.getByText('Goals Overview')).toBeInTheDocument();
        expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
        expect(screen.getByText('Achieve X')).toBeInTheDocument();
        expect(screen.getByText('Bread > Crumb')).toBeInTheDocument();
    });

    it('navigates when clicked', () => {
        render(<GoalCard goals={[mockGoal]} />);
        
        const card = screen.getByText('Test Goal 1').closest('.GoalViewCard');
        if (card) {
            fireEvent.click(card);
            expect(navigateMock).toHaveBeenCalledWith(`/GoalDetail/1`);
        } else {
            throw new Error('Card not found');
        }
    });
});
