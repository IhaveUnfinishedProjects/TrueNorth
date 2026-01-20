import { USER_URL } from "@root/library/constants.js";

export const fetchUser = async () => {

    const response = await fetch(USER_URL, {
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