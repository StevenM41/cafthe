import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        console.log("Token récupéré depuis localStorage :", storedToken);
        console.log("Utilisateur récupéré :", storedUser);

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (token) {
            const decoded = JSON.parse(atob(token.split(".")[1])); // Décodage base64
            console.log("Token expire à :", new Date(decoded.exp * 1000).toLocaleString());
        }
    }, [token]);

    useEffect(() => {
        if(token && user) {
            localStorage.setItem("token", token.toString())
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }, [token, user]);

    const login = (jwt, userData) => {
        console.log("Token reçu au login :", jwt);
        setToken(jwt);
        setUser(userData);
    };
    const logout = () => { setToken(null); setUser(null); }
    const value = { token, user, login, logout, isAuthenticated: !!token }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}