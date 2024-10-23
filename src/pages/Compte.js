import React from "react";
import '../pages/Compte.css';
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Compte = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div id="contact" class="contact-area section-padding">
	<div class="container mt-5">										

		<h7>Creez un compte</h7>
				<br/>
				<br/>

		<div class="row">

			<div class="col-lg-7">

	
				<div class="contact">
					<form class="form" name="enq" method="post" action="contact.php" onsubmit="return validation();">
						<div class="row">
							<div class="form-group col-md-6 mb-3">
								<input type="text" name="name" class="form-control" placeholder="Nom" required="required"/>
							</div>
							<div class="form-group col-md-6 mb-3">
								<input type="text" name="prenom" class="form-control" placeholder="Prenom" required="required"/>
							</div>
                            <div class="form-group col-md-12 mb-3">
								<input type="email" name="email" class="form-control" placeholder="Email" required="required"/>
							</div>

							<div class="form-group col-md-12 mb-3">
								<input type="num" name="numero" class="form-control" placeholder="Numéro" required="required"/>
							</div>

                            <div class="form-group col-md-12 mb-3">
								<input type="text" name="genre" class="form-control" placeholder="Genre" required="required"/>
							</div>

							<div class="form-group col-md-12 mb-3">
								<input type="password" name="password" class="form-control" placeholder="Mots de passe" required="required"/>
							</div>

							<div class="form-group col-md-12 mb-3">
								<input type="password" name="password" class="form-control" placeholder="Confirmer votre mots de passe" required="required"/>
							</div>


                            <div class="form-group col-md-12 mb-5 ">
								<input type="file" name="password" class="form-control" placeholder="password" required="required"/>
								<p style={{fontSize:12,marginLeft:10}}>Afin de vérifier les informations saisies ainsi que votre nationalité ,veuillez charger une copie  de la page 02  de votre passsport</p>

							</div>


							<div class="col-md-12 text-center mb-5">
								<button type="submit" value="Send message" name="submit" id="submitButton" class="btn btn-contact-bg  " title="Submit Your Message!" style={{backgroundColor:'#20247b',borderRadius:5,padding:"15px 27px", width: "100%",fontSize:15,color:"white"} }>Inscrivez Vous </button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="col-lg-5 d-none d-lg-block"> {/* Ajoutez d-none d-lg-block pour masquer sur mobile */}
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
		</div>
	</div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compte;
