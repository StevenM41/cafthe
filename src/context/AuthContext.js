import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUser = Cookies.get("user");
        const storedRole = Cookies.get("role");

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            if (storedRole) {
                setRole(storedRole);
            }
        }
    }, []);

    useEffect(() => {
        if (token && user) {
            Cookies.set("token", token, { expires: 7 }); // Expire after 7 days
            Cookies.set("user", JSON.stringify(user), { expires: 7 });
            if (role) Cookies.set('role', role, { expires: 7 });
        } else {
            Cookies.remove("token");
            Cookies.remove("user");
            Cookies.remove("role");
        }
    }, [role, token, user]);

    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
        setRole(userData.role);
        console.log(userData)
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("role");
    };

    const isAdmin = user ? user.role === 'admin' : false;
    const isVendeur = user ? user.role === 'vendeur' : false;

    const value = { token, user, login, logout, isAuthenticated: !!token, isAdmin, isVendeur };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}