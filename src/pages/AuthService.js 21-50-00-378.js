// src/pages/AuthService.js
import Cookies from 'js-cookie';

export const saveToken = (token) => {
    Cookies.set('token', token, { expires: 7 }); // Le cookie expire après 7 jours
};

export const getToken = () => {
    return Cookies.get('token');
};

export const clearToken = () => {
    Cookies.remove('token');
};