const API_BASE = "http://localhost:8000/api/signup/";

interface SignUpProps {
    username: string;
    password: string;
    email: string;
}

export const signUp = async ({username, password, email}: SignUpProps) => {

    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
        credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
    return data;
}

export default signUp;