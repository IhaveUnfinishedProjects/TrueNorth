const API_BASE = "http://localhost:8000/api/logout/";
import Cookies from 'js-cookie';

export const logout = async () => {

    const csrfToken = Cookies.get('csrftoken');
    console.log(csrfToken, 'token');

    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
        throw data;
    }

    return data;
}

export default logout;