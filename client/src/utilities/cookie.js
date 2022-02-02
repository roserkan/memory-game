
export function setCookie(key, value) {
    document.cookie = `${key}=${value}`;
}

export function getCookie(key) {
    let cookie = document.cookie.split(";");
    cookie = cookie.filter(res => {
        return res.trim().startsWith(key);
    });
    if (cookie.length === 0) return null;

    return cookie[0].split("=")[1];
}
