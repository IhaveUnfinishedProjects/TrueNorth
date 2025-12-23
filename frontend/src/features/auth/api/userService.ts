const API_BASE = "http://localhost:8000/api/user/";

export const fetchUser = async () => {

    const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    return response.json();
};

export default fetchUser;