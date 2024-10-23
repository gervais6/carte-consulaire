import React from "react";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import '../pages/Mdp.css';  // Ajout du fichier CSS pour la mise en page

const MotsDePasseOublier = () => {
    return (
        <div className="page-container"> {/* Conteneur qui prend toute la page */}
            <Header />

            <div className="content-wrap"> {/* Conteneur pour le contenu */}
                <div className="container padding-bottom-3x mb-2 mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <h2 className="text-center mb-4">Vous avez oublié votre mot de passe ?</h2>
                            <form className="card mt-4 shadow-sm">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email-for-pass" style={{marginLeft:-15}}>Entrez votre adresse e-mail</label>
                                        <input className="form-control mb-2" type="email" id="email-for-pass" required style={{ fontSize: 15 }} />
                                        <small className="form-text text-muted"style={{fontSize:10}}>
                                            Saisissez l'adresse e-mail que vous avez utilisée lors de votre inscription. Ensuite, nous enverrons un code par e-mail à cette adresse.
                                        </small>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                <button className="btn btn-primary" style={{ background: "#20247b", fontSize: 14, float: "left" }} type="submit">
    Obtenir un nouveau mot de passe
</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer /> {/* Footer toujours en bas */}
        </div>
    );
}

export default MotsDePasseOublier;