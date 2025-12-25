import { create } from 'zustand'

interface UseLoadingProps {
    loading: boolean;
    setLoading: (state: boolean) => void;
}

export const useLoading = create<UseLoadingProps>((set) => ({
    loading: true,
    setLoading: (state: boolean) => set({ loading: state })
}))

export default useLoading;