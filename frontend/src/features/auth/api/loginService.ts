import Cookies from 'js-cookie';
import { LOGIN_URL } from '@root/library/index.js';

interface LoginProps {
    username: string;
    password: string;
}

export const login = async ({username, password}: LoginProps) => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
    return data;
}

export default login;