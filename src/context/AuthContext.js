import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUser = Cookies.get("user");

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (token && user) {
            Cookies.set("token", token, { expires: 7 }); // Expire after 7 days
            Cookies.set("user", JSON.stringify(user), { expires: 7 });
        } else {
            Cookies.remove("token");
            Cookies.remove("user");
        }
    },  [token, user]);

    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        Cookies.remove("token");
        Cookies.remove("user");
    };

    const value = { token, user, login, logout, isAuthenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}