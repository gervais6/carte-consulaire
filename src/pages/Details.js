const details = () => {
    return ( 
        <div>
            <section id="about" className="py-5 " style={{ background: '#2575fc' }}>
    <div className="container ">
            <div className="row align-items-center m-5 bg-dark pt-5 pb-3  rounded-4"style={{ paddingBottom: 60, paddingTop: 40, paddingRight: 20, paddingLeft: 20, color: 'white', background: '#2575fc', }}>
            <h3 className="title text-light"style={{marginTop:-30,marginLeft:10,fontFamily: 'Poppins, sans-serif', fontWeight: 500 ,marginBottom:20}}>Samba transit</h3>
                <hr style={{border:"2px solid #FFFFFF"}}/>
                <div className="col-lg-6 order-lg-2  " style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                <p>
                       Envoyer depuis   :
                    </p> 
                    <br/>                    
                     <br/>                    
                   
                     <p>
                     Envoyer vers   :

                    </p>
                    <br/>                    
                    <br/>                    

                    <p>Date limite des dépots :</p>

                    <br />                    
                     <br/>   
                     <p>Date de départ :</p>

                     <br />                    
                     <br/>   
                     <p>Date d'Arrivée :</p>

                     <br />                    
                     <br/>   
                     <p>Prix :</p>
                 

                </div>




            </div>
        
    </div>
</section>
        </div>
     );
}
 
export default details;