import { useGoBack } from '@hooks/index.js';
const API_BASE = "http://localhost:8000/api/goals/";

export const fetchGoals = async () => {
    const goBack = useGoBack();

    const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // This is crucial for Session Auth! 
        // It tells the browser to send your login cookies.
        credentials: "include", 
    });

    if (!response.ok) {
        console.warn("Failed to fetch goals");
        goBack();
    }
    return response.json();
};