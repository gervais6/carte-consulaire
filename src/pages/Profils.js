import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCheckCircle, FaHourglassHalf, FaClock, FaCamera } from 'react-icons/fa';
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('demande'); // Gère l'onglet actif

    return (
        <div>
            <Header />
            <div className="container">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"></div>
                        <div className="profile-header-content">
                            <div className="profile-header-img">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                            </div>
                            <ul className="profile-header-tab nav nav-tabs nav-tabs-v2 ms-5">
                                <li className="nav-item">
                                    <a
                                        href="#profile-post"
                                        className={`nav-link ${activeTab === 'demande' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('demande')}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <div className="nav-field" style={{ fontSize: 14, color: "black" }}>Demande de carte consulaire</div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#profile-followers"
                                        className={`nav-link ${activeTab === 'suivi' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('suivi')}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <div className="nav-field" style={{ fontSize: 14, color: "black" }}>Suivi carte consulaire</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="profile-container">
                        <div className="profile-sidebar">
                            <div className="desktop-sticky-top">
                                <h4>John Smith</h4>
                                <div className="font-weight-600 mb-3 text-muted mt-n2">@johnsmith</div>
                                <div className="font-weight-600 mb-3 text-muted mt-n2">@Liberté 6</div>
                                <hr className="mt-4 mb-4" />
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="container mt-5">
                                        {/* Affichage conditionnel selon l'onglet actif */}
                                        {activeTab === 'demande' && (
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="nom" className="form-label">Nom complet</label>
                                                    <input type="text" className="form-control" id="nom" placeholder="Entrez votre nom complet" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_naissance" className="form-label">Date de naissance</label>
                                                    <input type="date" className="form-control" id="date_naissance" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="lieu_naissance" className="form-label">Lieu de naissance</label>
                                                    <input type="text" className="form-control" id="lieu_naissance" placeholder="Entrez votre lieu de naissance" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nationalite" className="form-label">Nationalité</label>
                                                    <input type="text" className="form-control" id="nationalite" placeholder="Entrez votre nationalité" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="adresse" className="form-label">Adresse actuelle</label>
                                                    <input type="text" className="form-control" id="adresse" placeholder="Entrez votre adresse actuelle" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Adresse e-mail</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Entrez votre e-mail" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="telephone" className="form-label">Numéro de téléphone</label>
                                                    <input type="tel" className="form-control" id="telephone" placeholder="Entrez votre numéro de téléphone" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="numero_piece_identite" className="form-label">Numéro de pièce d'identité</label>
                                                    <input type="text" className="form-control" id="numero_piece_identite" placeholder="Entrez le numéro de votre pièce d'identité" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date_expiration_piece" className="form-label">Date d'expiration de la pièce d'identité</label>
                                                    <input type="date" className="form-control" id="date_expiration_piece" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="photo_identite" className="form-label">Photo d'identité (format JPG ou PNG)</label>
                                                    <input type="file" className="form-control" id="photo_identite" accept=".jpg, .png" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="justificatif_domicile" className="form-label">Justificatif de domicile</label>
                                                    <input type="file" className="form-control" id="justificatif_domicile" accept=".pdf, .jpg, .png" required />
                                                </div>
                                                <button type="submit" className="btn btn-primary" style={{ fontSize: "17px", backgroundColor: '#20247b' }}>Soumettre la demande</button>
                                            </form>
                                        )}

                                       {activeTab === 'suivi' && (
    <div className="container">
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"/>
<div class="container bootstrap snippets bootdey">
    <section id="news" class="white-bg padding-top-bottom">
        <div class="container bootstrap snippets bootdey">
            <div class="timeline">
                <div class="date-title">
                    <span>March 2014</span>
                </div>
                <div class="row">
                    <div class="col-sm-6 news-item">
                        <div class="news-content">
                            <div class="date">
                                <p>28</p>
                                <small>Fri</small>
                            </div>
                            <h2 class="news-title">Title 1</h2>
                            <div class="news-media">
                                <a class="colorbox cboxElement" href="#">
                                </a>
                            </div>
                            <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure…</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>

                    <div class="col-sm-6 news-item right">
                        <div class="news-content">
                            <div class="date">
                                <p>27</p>
                                <small>Thu</small>
                            </div>
                            <h2 class="news-title">Title 2</h2>
                            <div class="news-media gallery">
                                <a class="colorbox cboxElement" href="#">
                                </a>
                                <a class="colorbox cboxElement" href="#"></a>
                            </div>
                            <p>But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure…</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6 news-item">
                        <div class="news-content">
                            <div class="date">
                                <p>26</p>
                                <small>Wen</small>
                            </div>
                            <h2 class="news-title">Title 3</h2>
                            <div class="news-media video">
                                <a class="colorbox-video cboxElement" href="#">
                                </a>
                            </div>
                            <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized…</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>

                    <div class="col-sm-6 news-item right">
                        <div class="news-content">
                            <div class="date">
                                <p>25</p>
                                <small>Tue</small>
                            </div>
                            <h2 class="news-title">Title 4</h2>
                            <div class="news-media gallery">
                                <a class="colorbox cboxElement" href="#">
                                </a>
                                <a class="colorbox cboxElement" href="#"></a>
                            </div>
                            <p>The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains…</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>
                </div>

                <div class="date-title">
                    <span>February 2014</span>
                </div>
                <div class="row">
                    <div class="col-sm-6 news-item">
                        <div class="news-content">
                            <div class="date">
                                <p>27</p>
                                <small>Thu</small>
                            </div>
                            <h2 class="news-title">Title 5</h2>
                            <div class="news-media video">
                                <a class="colorbox-video cboxElement" href="#">
                                </a>
                            </div>
                            <p>But who has any right to find fault with a man who chooses to enjoy a pleasure…</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>

                    <div class="col-sm-6 news-item right">
                        <div class="news-content">
                            <div class="date">
                                <p>24</p>
                                <small>Mon</small>
                            </div>
                            <h2 class="news-title">Title 6</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <a class="read-more" href="#">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </div>
    </div>
                                        )}

                                    </div>
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

export default Profile;
