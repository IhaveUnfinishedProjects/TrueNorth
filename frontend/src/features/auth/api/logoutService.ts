import { LOGOUT_URL } from '@root/library/index.js';
import Cookies from 'js-cookie';

export const logout = async () => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        console.warn(data);
        throw data;
    }

    return data;
}

export default logout;