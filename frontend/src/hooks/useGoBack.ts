import { useLocation, type Location } from "react-router-dom";
import { useAppNavigate } from "@hooks/index.js";

/**
 * Navigates the user to their last internal page, 
 * or to the home page if there is none. 
 */
export function useGoBack() {
    const navigate = useAppNavigate();
    const location: Location = useLocation();

    const goBack = () => {
        const state = location.state as { fromApp? : boolean } | null;
        if (state?.fromApp) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return { goBack };
}

export default useGoBack;