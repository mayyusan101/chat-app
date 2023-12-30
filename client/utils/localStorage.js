const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));

const setToken = (token) => localStorage.setItem("token", JSON.stringify(token));

const removeToken = () => localStorage.getItem("token")? localStorage.removeItem("token") : null;

const removeUser = () => localStorage.getItem("user")? localStorage.removeItem("user") : null;

const getUser = () => localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null;

const getToken = () => localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : undefined;

export {
    setUser,
    setToken,
    removeToken,
    getUser,
    getToken,
    removeUser
};