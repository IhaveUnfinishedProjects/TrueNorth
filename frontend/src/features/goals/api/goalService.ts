const API_BASE = "http://localhost:8000/api/goals/";

export const fetchGoals = async () => {

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
        throw new Error("Failed to fetch goals");
    }
    return response.json();
};