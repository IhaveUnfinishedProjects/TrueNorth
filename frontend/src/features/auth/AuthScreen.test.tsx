import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthScreen from './AuthScreen.js';
import * as authApi from './index.js'; // Importing to mock

// Mock the API functions
vi.mock('./index.js', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await importOriginal<any>(); 
    return {
        ...actual,
        login: vi.fn(),
        signUp: vi.fn(),
        demoSignUp: vi.fn(),
    };
});

// Mock the hooks
// We need to mock the full path or use the alias if configured in Vitest
// The component uses: import { useInput, useUser, useLoading } from "@hooks/index.js";
vi.mock('@hooks/index.js', () => ({
    useInput: () => {
        // Simple mock implementation of useInput hook logic for the test
        // We can't use useState here directly easily unless we are careful, 
        // but since this is called inside the component, we can just return objects 
        // controlled by the test or let the component handle standard inputs.
        // Better: mock the hook to return a state and setter we can control or 
        // just let it be a controlled input simulation.
        // Actually, if we mock it, we need to replicate the behavior or the inputs won't update.
        // So we might rely on the real hook if possible, OR mock it to just behave.
        // For simplicity, let's try to NOT mock useInput if it's a simple hook, 
        // but we MUST mock useUser and useLoading because of .getState() usage.
        
        // Wait, if we mock the module, we mock all exports.
        // Let's implement a simple version.
        let val = "";
        return {
            selected: val,
            onChange: (e: any) => { val = e.target.value; }
        };
    },
    useUser: {
        getState: () => ({ login: vi.fn() })
    },
    useLoading: {
        getState: () => ({ setLoading: vi.fn() })
    }
}));

// Re-mocking useInput properly requires state management if we want inputs to type.
// If the mock above is used, 'val' is a local variable in the closure, 
// but it won't trigger re-renders in the component using it.
// So the input value prop won't update.
// Solution: Use a more sophisticated mock or don't mock @hooks/index.js and only mock the stores if possible.
// But useUser and useLoading arezustand stores, and the component calls .getState().
// The real hooks might work if we can mock the store behavior. 
// But mocking the module is safer for isolation.
// Let's try to mock useInput by using React.useState inside the mock? 
// No, vi.mock runs outside.
// Let's use `vi.fn()` for specific hooks if we can?
// Alternative: Mock the whole module but export a manual mock for useInput that uses `React.useState`.
// But `vi.mock` is hoisted.

// Let's try to PARTIALLY mock @hooks/index.js? 
// Vitest: vi.mock(path, async (importOriginal) => { ... })
// But useInput is likely a default export or named.
// Let's assume useInput works fine and try to use `importOriginal` for it?
// The component uses named imports.

// Revised mock strategy:
vi.mock('@hooks/index.js', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await importOriginal<any>();
    return {
        ...actual,
        useUser: {
            getState: () => ({ login: vi.fn() })
        },
        useLoading: {
            getState: () => ({ setLoading: vi.fn() })
        }
    }
});


describe('AuthScreen', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form by default', () => {
        render(<AuthScreen />);
        expect(screen.getByRole('heading', { name: /Welcome Back/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/name@example.com/i)).not.toBeInTheDocument();
    });

    it('toggles to sign up form', () => {
        render(<AuthScreen />);
        const toggleButton = screen.getByRole('button', { name: 'Sign Up' }); // The small toggle button
        fireEvent.click(toggleButton);
        
        expect(screen.getByRole('heading', { name: /Create Account/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
    });
});
