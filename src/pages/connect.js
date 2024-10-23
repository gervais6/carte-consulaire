import React, { useEffect, useState } from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

const Connect = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

        <div id="contact" className="contact-area section-padding">
          <div className="container">										
            <div className="section-title text-center mt-5">
            </div>					
            <div className="row">
              <div className="col-lg-7">
                <br/>
                <br/>

                <div className="contact">
                  <form className="form" name="enq" method="post" action="contact.php" onsubmit="return validation();">
                    <div className="row">
                      <div className="form-group col-md-12 mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" required="required"/>
                      </div>

                      <div className="form-group col-md-12 mb-5">
                        <input type="password" name="password" className="form-control" placeholder="Mots de passe" required="required"/>
                      </div>

                      <div className="col-md-12 text-center mb-5">
                        <button type="submit" value="Send message" name="submit" id="submitButton" className="btn btn-contact-bg" title="Submit Your Message!" style={{backgroundColor:'#20247b',borderRadius: 5,padding:"15px 27px", width: "100%",fontSize:15,color:"white"}}>Connexion</button>
                      </div>
                    </div>
                  </form>
                  <div className="" style={{float:"right"}}>
                    <Link to="/mdp" style={{color:"black",fontSize:12}}>Mots de passe oublié</Link>
                  </div>
                </div>
              </div>

              {/* Section d'adresse et contact - masquée sur mobile */}
              {windowWidth >= 768 && (
                <div className="col-lg-5">
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
                    <p>Du lundi au vendredi : de 8h00 à 16h00. <br/>Samedi : 10h00 - 14h00</p>
                  </div>					
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Connect;