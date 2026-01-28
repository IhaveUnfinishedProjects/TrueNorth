import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GoalCreation from './GoalCreation.js';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mocks
const navigateMock = vi.fn();
const goBackMock = vi.fn();
const setLoadingMock = vi.fn();

vi.mock('@hooks/index.js', () => ({
    useAppNavigate: () => navigateMock,
    useGoBack: () => goBackMock,
    useLoading: {
        getState: () => ({ loading: false, setLoading: setLoadingMock })
    },
    useToggleModal: () => ({
        isOpen: false,
        onOpen: vi.fn(),
        onClose: vi.fn()
    }),
    useForm: (initialValues: any) => ({
        formValues: initialValues,
        handleChange: vi.fn(),
        resetForm: vi.fn(),
        handleFocus: vi.fn()
    })
}));

vi.mock('@features/index.js', async (importOriginal) => {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await importOriginal<any>();
    return {
        ...actual,
        InputFieldData: [
            { name: 'goalName', placeholder: 'Enter Goal Name' }
        ],
        Form: ({ InputFieldData }: any) => (
            <div data-testid="mock-form">
                {InputFieldData.map((field: any) => (
                    <input key={field.name} placeholder={field.placeholder} />
                ))}
            </div>
        ),
        getGoal: vi.fn(() => Promise.resolve({})),
        addGoal: vi.fn(),
        updateGoal: vi.fn()
    };
});

vi.mock('@components/ui/index.js', () => ({
    Card: ({ children }: any) => <div>{children}</div>,
    CardHeader: () => <div>Header</div>,
    ConfirmationModal: () => <div>Modal</div>
}));

describe('GoalCreation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the creation form', () => {
        // Need to wrap in Router because it uses useParams and location
        render(
            <MemoryRouter initialEntries={['/CreateGoal']}>
                <Routes>
                    <Route path="/CreateGoal" element={<GoalCreation />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('mock-form')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Goal Name')).toBeInTheDocument();
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    // We can add more tests for interaction if we better mocked the useForm and useToggleModal to behave real.
    // Given the mocks above are static, we mostly verify rendering and that dependencies are called.
});
