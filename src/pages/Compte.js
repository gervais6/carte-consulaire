import React, { useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { FaCamera } from "react-icons/fa6";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const Compte = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    numero: '',
    genre: '',
    password: '',
    confirmPassword: '',
    photo: null
  });

  const navigate = useNavigate(); // Initialiser useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si tous les champs sont remplis
    if (!formData.name || !formData.prenom || !formData.email || !formData.numero || !formData.genre || !formData.password || !formData.confirmPassword) {
        alert("Tous les champs sont requis.");
        return;
    }

    // Vérifiez si l'email est valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert("L'adresse e-mail est invalide.");
        return;
    }

    // Vérifiez si le numéro est numérique
    const numero = Number(formData.numero);
    if (isNaN(numero)) {
        alert("Le numéro doit être numérique.");
        return;
    }

    // Vérifiez si le genre est rempli
    if (!formData.genre) {
        alert("Le genre est requis.");
        return;
    }

    // Vérifiez si le mot de passe contient au moins 6 caractères
    if (formData.password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    // Vérifiez si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    // Create a FormData object to send the file
    const data = new FormData();
    for (const key in formData) {
        data.append(key, formData[key]);
    }

    console.log("Données envoyées :", formData); // Log des données pour débogage

    try {
        const response = await axios.post('http://localhost:4000/api/auth/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        // Rediriger vers la page Navbar.js après une inscription réussie
        navigate('/navbar'); // Remplacez '/navbar' par le chemin de votre page Navbar
    } catch (error) {
        console.error('Error submitting form:', error);
        // Afficher les erreurs de validation
        if (error.response && error.response.data.errors) {
            const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
            alert(`Erreur de validation : ${errorMessages}`);
        } else {
            alert("Une erreur s'est produite lors de l'inscription.");
        }
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div id="contact" className="contact-area section-padding">
          <div className="container mt-5">
            <br />
            <br />
            <div className="row">
              <div className="col-lg-7">
                <div className="contact">
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Nom" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <input type="text" name="prenom" className="form-control" placeholder="Prenom" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3">
                        <input type="number" name="numero" className="form-control" placeholder="Numéro" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3">
                        <input type="text" name="genre" className="form-control" placeholder="Genre" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3 ">
                        <input type="password" name="password" className="form-control" placeholder="Mots de passe" required onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12 mb-3">
                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirmer votre mots de passe" required onChange={handleChange} />
                      </div>
                      <div className="row gutters mt-4">
                        <div className="col-12 mb-3">
                          <div
                            className="photo-upload-container d-flex flex-column justify-content-center align-items-center"
                            style={{
                              border: "2px dashed gray",
                              height: 150,
                              borderRadius: 10,
                              cursor: "pointer",
                              position: "relative",
                              transition: "border-color 0.3s",
                              backgroundColor: "#f9f9f9",
                              width : "102%",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#20247b")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "gray")}
                          >
                            <input
                              type="file"
                              className="form-control-file"
                              id="photo"
                              name="photo"
                              style={{
                                position: "absolute",
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer"
                              }}
                              onChange={handleFileChange}
                            />
                            <FaCamera size={40} style={{ color: "#20247b", marginBottom: 5 }} />
                            <span style={{ color: "gray", textAlign: "center" }}>
                              Afin de vérifier les informations saisies ainsi que votre nationalité ,Veuillez charger une copie de la page 02 de votre Passport
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 text-center mt-5 mb-5">
                        <button type="submit" value="Send message" name="submit" id="submitButton" className="btn btn-contact-bg " title="Submit Your Message!" style={{
                          backgroundColor: '#20247b',
                          borderRadius: 5,
                          padding: "15px 27px",
                          width: "100%",
                          fontSize: 15,
                          color: "white"
                        }}>
                          Inscrivez Vous
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="single_address">
                  <i className="fa fa-map-marker"></i>
                  <h4>Notre adresse</h4>
                  <p>Zone Captage, Dakar</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-envelope"></i>
                  <h4>Envoyez votre message</h4>
                  <p>Info@example.com</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-phone"></i>
                  <h4>Appelez-nous au</h4>
                  <p>(+221) 771001897</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-clock-o"></i>
                  <h4>Temps de travail</h4>
                  <p>Du lundi au vendredi : de 8h00 à 16h00 . <br />Samedi : 10h00 - 14h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compte;