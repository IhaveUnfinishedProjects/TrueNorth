import { useNavigate, type NavigateOptions } from 'react-router-dom';

export const useAppNavigate = () => {
    // Get the original navigation function
    const originalNavigate = useNavigate();

    // Return a new function with your default behavior
    const navigate = (to: string | number, options?: NavigateOptions) => {
        
        if (typeof to === 'number') {
            originalNavigate(to);
            return;
        }
        // Get existing state or start fresh
        const existingState = options?.state || {};

        // Merge the default flag (fromApp: true) with any other state passed in
        const newState = {
        ...existingState,
        fromApp: true,
        };

        // Calling the original function with the modified options
        originalNavigate(to, {
        ...options,
        state: newState,
        });
  };

  return navigate;
};

export default useAppNavigate;