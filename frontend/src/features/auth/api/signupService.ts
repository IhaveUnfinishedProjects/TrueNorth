import Cookies from 'js-cookie';
import { SIGNUP_URL, GUEST_URL } from '@root/library/constants.js';

interface SignUpProps {
    username: string;
    password: string;
    email: string;
}

export const signUp = async ({username, password, email}: SignUpProps) => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw data;

    return data;
}

export const demoSignUp = async () => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(GUEST_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw data;

    return data;
}

export default signUp;