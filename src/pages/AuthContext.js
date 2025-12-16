import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || localStorage.getItem('adminToken'));

    useEffect(() => {
        // Récupérer l'utilisateur depuis localStorage
        const savedUser = localStorage.getItem('user') || localStorage.getItem('adminUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Erreur parsing user:', error);
            }
        }

        // Vérifier aussi le token
        if (token) {
            // Pourrait décoder le JWT ici si nécessaire
            console.log('Token présent, utilisateur connecté');
        }
    }, [token]);

    const login = (newToken, userData) => {
        // Stocker selon le rôle
        if (userData.role === 'admin') {
            localStorage.setItem('adminToken', newToken);
            localStorage.setItem('adminUser', JSON.stringify(userData));
        } else {
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!token;
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthenticated,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};