const API_BASE = "http://localhost:8000/api/login/";

interface LoginProps {
    username: string;
    password: string;
}

export const login = async ({username, password}: LoginProps) => {

    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Failed to log user in");
    }

    return response.json();
}

export default login;