import React, { useState } from 'react';
import './Admin.css'; 

const Admin = () => {
    const [formData, setFormData] = useState({
        company: '',
        from: '',
        to: '',
        kilos: '',
        departure_date: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await response.text(); // Obtenez la réponse sous forme de texte
            console.log('Raw response:', text); // Affichez la réponse brute

            if (!response.ok) {
                const errorData = JSON.parse(text); // Essayez de parser le texte en JSON
                throw new Error(errorData.message || 'Une erreur est survenue');
            }

            const data = JSON.parse(text); // Essayez de parser la réponse en JSON
            console.log('Success:', data);
            alert('Données enregistrées avec succès !');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erreur lors de l\'envoi des données : ' + error.message);
        }
    };

    return ( 
        <div>
            <h2 className="text-center">Contact Us</h2>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="company">Entreprise</label>
                            <input 
                                type="text" 
                                id="company" 
                                name="company" 
                                value={formData.company} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="from">De</label>
                            <input 
                                type="text" 
                                id="from" 
                                name="from" 
                                value={formData.from} 
                                onChange={handleChange} 
                                required 
                            />
                        </div >
                        
                        <div className="form-group">
                            <label htmlFor="to">À</label>
                            <input 
                                type="text" 
                                id="to" 
                                name="to" 
                                value={formData.to} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="kilos">Kilos</label>
                            <input 
                                type="number" 
                                id="kilos" 
                                name="kilos" 
                                value={formData.kilos} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="departure_date">Date de départ</label>
                            <input 
                                type="date" 
                                id="departure_date" 
                                name="departure_date" 
                                value={formData.departure_date} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Prix</label>
                            <input 
                                type="number" 
                                id="price" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Soumettre</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;