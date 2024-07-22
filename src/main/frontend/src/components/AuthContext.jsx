// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/session');
                if (response.status === 200 && response.data.status === 'success') {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkSession();
    }, []);



    const logout = async () => {
        await axios.post('http://localhost:8082/api/logout');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
