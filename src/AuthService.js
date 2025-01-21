import Cookies from 'js-cookie';

// Sauvegarder un token avec l'attribut SameSite
export const saveToken = (token) => {
    Cookies.set('token', token, { 
        expires: 7, // Le cookie expire après 7 jours
        sameSite: 'None', // Définit SameSite à None
        secure: true // Assurez-vous que votre site utilise HTTPS
    });
};

// Récupérer un token
export const getToken = () => {
    return Cookies.get('token'); // Récupère le token
};

// Effacer un token
export const clearToken = () => {
    Cookies.remove('token'); // Supprime le cookie
};