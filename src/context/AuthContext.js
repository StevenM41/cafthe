import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if(storedUser &&  storedToken) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, []);

    useEffect(() => {
        if(token && user) {
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }, [token, user]);

    const login = (jtw, userData) => { setToken(jtw); setUser(userData); }
    const logout = () => { setToken(null); setUser(null); }
    const value = { token, user, login, logout, isAuthenticated: !!token }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}