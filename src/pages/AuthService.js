// src/services/AuthService.js
export const saveToken = (token) => {
    localStorage.setItem('authToken', token); // ou sessionStorage
};

export const getToken = () => {
    return localStorage.getItem('authToken'); // ou sessionStorage
};

export const clearToken = () => {
    localStorage.removeItem('authToken'); // ou sessionStorage
};