import React, {createContext, useState, useEffect, use} from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token.toString());
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [token, user]);


    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const value = { token, user, login, logout, isAuthenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}