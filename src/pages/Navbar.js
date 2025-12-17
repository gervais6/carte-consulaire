import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Box, Typography, Grid, Card, CardContent, Avatar, Chip, IconButton, Modal, Fade, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  FaUser, 
  FaSearch, 
  FaPaperPlane, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaWeightHanging,
  FaCalculator,
  FaClock,
  FaWhatsapp,
  FaStar,
  FaTruck,
  FaCheckCircle,
  FaPhoneAlt,
  FaSignInAlt,
  FaEnvelope,
  FaShieldAlt,
  FaDatabase
} from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { IoAirplaneSharp, IoClose } from "react-icons/io5";
import { MdAccessTime, MdLocationOn } from "react-icons/md";

// Styles modernes et professionnels avec bordures élégantes
const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: '#FFFFFF',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1F2937 0%, #374151 100%)',
    borderRadius: '16px 16px 0 0',
  }
}));

const ResultCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  background: '#FFFFFF',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.1), rgba(31, 41, 55, 0.05))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: '#FFFFFF',
    transition: 'all 0.2s ease',
    '& fieldset': {
      border: '1px solid #E5E7EB',
      transition: 'border 0.2s ease',
    },
    '&:hover fieldset': {
      border: '1px solid #1F2937',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #1F2937',
      boxShadow: '0 0 0 3px rgba(31, 41, 55, 0.1)',
    }
  },
  '& .MuiOutlinedInput-input': {
    fontWeight: 500,
  }
}));

const ModernModalBackdrop = styled(Backdrop)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '90%', md: 520 },
  maxHeight: '90vh',
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
  borderRadius: 24,
  boxShadow: `
    0 20px 80px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset
  `,
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(31, 41, 55, 0.1), transparent)',
  }
}));

const VoyageurCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
  border: '1px solid rgba(167, 243, 208, 0.5)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(5, 150, 105, 0.2), transparent)',
  }
}));

const MessagePreviewBox = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  background: '#FFFFFF',
  border: '1px solid rgba(229, 231, 235, 0.6)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.05), transparent)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}));

const ModernChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  border: 'none',
  '&.MuiChip-outlined': {
    background: 'transparent',
    border: '1px solid rgba(31, 41, 55, 0.1)',
  }
}));

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  '&:hover::before': {
    opacity: 1,
  }
}));

const PrimaryButton = styled(ModernButton)(({ theme }) => ({
  background: '#1F2937',
  color: '#FFFFFF',
  '&:hover': {
    background: '#374151',
    boxShadow: '0 8px 24px rgba(31, 41, 55, 0.25)',
  },
}));

const WhatsAppButton = styled(ModernButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  color: '#FFFFFF',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
  },
}));

// Composant Simulateur de Poids
const SimulateurPoids = () => {
  const [poids, setPoids] = useState('');
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [resultat, setResultat] = useState(null);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [selectedVoyageur, setSelectedVoyageur] = useState(null);
  const [whatsappForm, setWhatsappForm] = useState({
    nom: '',
    messagePerso: '',
    kilos: ''
  });
  const [reservationId, setReservationId] = useState(null);
  const [backendLoading, setBackendLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/submissions');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);

  // Extraire les destinations uniques depuis les soumissions
  const destinationsUniques = [...new Set(submissions.map(s => s.to))];
  const departsUniques = [...new Set(submissions.map(s => s.from))];

  // Fonction de recherche automatique
  const rechercherOffres = () => {
    if (!poids || poids <= 0 || poids > 30) {
      setResultat(null);
      setOffres([]);
      return;
    }

    setLoading(true);
    
    const timer = setTimeout(() => {
      let offresFiltrees = [...submissions];

      if (depart) {
        offresFiltrees = offresFiltrees.filter(offre => 
          offre.from.toLowerCase().includes(depart.toLowerCase())
        );
      }

      if (destination) {
        offresFiltrees = offresFiltrees.filter(offre => 
          offre.to.toLowerCase().includes(destination.toLowerCase())
        );
      }

      offresFiltrees.sort((a, b) => {
        const prixA = parseInt(a.price) || 0;
        const prixB = parseInt(b.price) || 0;
        return prixA - prixB;
      });

      const meilleuresOffres = offresFiltrees.slice(0, 5);

      if (meilleuresOffres.length === 0) {
        setResultat({ 
          error: 'Aucune offre disponible pour vos critères.',
          type: 'no_offers'
        });
        setOffres([]);
        setLoading(false);
        return;
      }

      const prixLePlusBas = parseInt(meilleuresOffres[0].price) || 0;
      const prixLePlusHaut = parseInt(meilleuresOffres[meilleuresOffres.length - 1].price) || 0;
      
      const sommePrix = meilleuresOffres.reduce((total, offre) => {
        return total + (parseInt(offre.price) || 0);
      }, 0);
      const prixMoyen = Math.round(sommePrix / meilleuresOffres.length);
      
      const meilleureOffre = meilleuresOffres[0];
      const tarifParKilo = prixLePlusBas;
      const totalMeilleur = poids * tarifParKilo;
      
      const totalPlusCher = poids * prixLePlusHaut;
      const economieVsPlusCher = totalPlusCher - totalMeilleur;
      
      const totalMoyen = poids * prixMoyen;
      const economieVsMoyenne = totalMoyen - totalMeilleur;
      
      const offresAvecCalculs = meilleuresOffres.map((offre, index) => {
        const prixOffre = parseInt(offre.price) || 0;
        const totalOffre = poids * prixOffre;
        const kilosDispo = parseInt(offre.kilos) || 0;
        
        const economieVsPlusCherOffre = totalPlusCher - totalOffre;
        const economieVsMoyenneOffre = totalMoyen - totalOffre;
        
        return {
          ...offre,
          totalOffre,
          tarifParKilo: prixOffre,
          economieVsPlusCher: economieVsPlusCherOffre,
          economieVsMoyenne: economieVsMoyenneOffre,
          kilosDispo,
          suffisant: kilosDispo >= poids,
          estMeilleurPrix: index === 0,
          estPlusCherPrix: index === meilleuresOffres.length - 1
        };
      });

      setOffres(offresAvecCalculs);
      setResultat({
        totalMeilleur,
        totalPlusCher,
        totalMoyen,
        tarifParKilo,
        prixMoyen,
        prixLePlusBas,
        prixLePlusHaut,
        economieVsPlusCher,
        economieVsMoyenne,
        destination: destination || meilleureOffre.to,
        depart: depart || meilleureOffre.from,
        poids,
        meilleureOffre: meilleuresOffres[0],
        plusChereOffre: meilleuresOffres[meilleuresOffres.length - 1],
        nombreOffres: meilleuresOffres.length,
        trajetSpecifique: depart && destination
      });
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (poids && poids > 0 && poids <= 30) {
      rechercherOffres();
    } else {
      setResultat(null);
      setOffres([]);
    }
  }, [poids, depart, destination, submissions]);

  // Fonction pour enregistrer la réservation dans le backend
  const enregistrerReservationBackend = async (voyageur, formData) => {
    setBackendLoading(true);
    try {
      const reservationData = {
        // Informations voyageur
        voyageurId: voyageur._id || voyageur.id || null,
        voyageurCompany: voyageur.company || 'Voyageur',
        voyageurWhatsapp: voyageur.whatsapp || voyageur.phone || '',
        voyageurFrom: voyageur.from || '',
        voyageurTo: voyageur.to || '',
        voyageurDepartureDate: voyageur.departure_date || '',
        voyageurPrixParKg: voyageur.tarifParKilo || voyageur.price || 0,
        voyageurKilosDispo: voyageur.kilos || voyageur.kilosDispo || 0,
        
        // Informations client
        clientNom: formData.nom || '',
        clientKilosReserves: formData.kilos || poids || 0,
        clientMessage: formData.messagePerso || '',
        
        // Calculs financiers
        prixParKg: voyageur.tarifParKilo || voyageur.price || 0,
        totalMontant: (voyageur.tarifParKilo || 0) * parseFloat(formData.kilos || poids || 0),
        
        // Statut et suivi
        status: 'pending',
        source: 'whatsapp_simulateur',
        reservationSource: 'website',
        
        // Métadonnées
        ipAddress: 'captured_in_backend', // À capturer côté backend
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      console.log('Envoi des données au backend:', reservationData);

      const response = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Réponse du backend:', result);
      
      setReservationId(result.reservationId);
      
      setSnackbar({
        open: true,
        message: 'Réservation enregistrée dans notre système',
        severity: 'success'
      });
      
      setBackendLoading(false);
      return result.reservationId;
    } catch (error) {
      console.error('Erreur backend:', error);
      
      // Générer un ID local en cas d'échec
      const localId = `LOCAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setReservationId(localId);
      
      setSnackbar({
        open: true,
        message: 'Connexion au serveur échouée, ID local généré',
        severity: 'warning'
      });
      
      setBackendLoading(false);
      return localId;
    }
  };

  // Fonction pour ouvrir la modal WhatsApp
  const handleOpenWhatsappReservation = (offre) => {
    if (!offre) return;
    
    const whatsappNumber = offre.whatsapp || offre.phone || "+221778599418";
    const cleanedWhatsapp = whatsappNumber.replace(/\s+/g, '').replace(/^\+/, '');
    
    setSelectedVoyageur({
      ...offre,
      whatsapp: cleanedWhatsapp
    });
    
    setWhatsappForm({
      nom: '',
      messagePerso: '',
      kilos: poids
    });
    
    setReservationId(null);
    setWhatsappModalOpen(true);
  };

  // Fonction pour générer le message WhatsApp avec données backend
  const generateWhatsappMessage = async (voyageur, formData) => {
    if (!voyageur) return '';
    
    // 1. D'abord, enregistrer dans le backend
    const reservationId = await enregistrerReservationBackend(voyageur, formData);
    
    const kilosReserves = formData.kilos || poids;
    const total = (voyageur.tarifParKilo || 0) * parseFloat(kilosReserves || 0);
    
    let message = `Bonjour ${voyageur.company || 'voyageur'} !\n\n`;
    
    if (formData.nom) {
      message += `Je m'appelle ${formData.nom}.\n\n`;
    }
    
    message += `📍 **RÉSERVATION #${reservationId}**\n`;
    message += `(Enregistrée dans le système Yónnee)\n\n`;
    
    message += `Je souhaite réserver ${kilosReserves} kg pour votre trajet :\n`;
    message += `📍 ${voyageur.from || ''} → ${voyageur.to || ''}\n`;
    message += `📅 ${voyageur.departure_date || ''}\n`;
    message += `💰 ${voyageur.tarifParKilo || 0} F CFA/kg\n`;
    message += `   (Total: ${total.toLocaleString()} F CFA)\n\n`;
    
    // Données structurées pour le voyageur
    message += `--- DONNÉES DE RÉSERVATION ---\n`;
    message += `ID Réservation: ${reservationId}\n`;
    message += `Nom: ${formData.nom || 'Non spécifié'}\n`;
    message += `Kilos: ${kilosReserves}\n`;
    message += `Trajet: ${voyageur.from || ''} → ${voyageur.to || ''}\n`;
    message += `Date: ${voyageur.departure_date || ''}\n`;
    message += `Prix/kg: ${voyageur.tarifParKilo || 0} F CFA\n`;
    message += `Total: ${total.toLocaleString()} F CFA\n`;
    message += `Compagnie: ${voyageur.company || ''}\n`;
    message += `Statut: En attente de confirmation\n\n`;
    
    if (formData.messagePerso) {
      message += `Message du client:\n${formData.messagePerso}\n\n`;
    }
    
    message += `✅ Cette réservation est enregistrée dans notre système.\n`;
    message += `📋 Pourriez-vous confirmer la disponibilité ?\n`;
    message += `🔄 Répondez avec "CONFIRMÉ" si disponible.\n\n`;
    message += `Merci !`;
    
    return encodeURIComponent(message);
  };

  // Fonction pour ouvrir WhatsApp avec le message
  const handleOpenWhatsApp = async () => {
    if (!selectedVoyageur) return;
    
    const message = await generateWhatsappMessage(selectedVoyageur, whatsappForm);
    const whatsappUrl = `https://wa.me/${selectedVoyageur.whatsapp}?text=${message}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Fermer la modal après un court délai
    setTimeout(() => {
      setWhatsappModalOpen(false);
      setSnackbar({
        open: true,
        message: 'WhatsApp ouvert avec les données de réservation',
        severity: 'success'
      });
    }, 500);
  };

  return (
    <>
      <ModernCard sx={{ mb: { xs: 4, md: 6 } }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FaCalculator style={{ fontSize: 24, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                color: '#1F2937',
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}>
                Simulateur d'économies
              </Typography>
              <Typography sx={{ 
                color: '#6B7280', 
                fontSize: { xs: '0.8rem', md: '0.9rem' } 
              }}>
                Comparez les offres et économisez jusqu'à 70%
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Typography variant="body2" sx={{ 
                  mb: 1, 
                  color: '#374151',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <FaWeightHanging style={{ color: '#1F2937' }} />
                  Poids de votre colis (kg)
                </Typography>
                <ModernTextField
                  fullWidth
                  type="number"
                  placeholder="Ex: 5"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  inputProps={{ 
                    min: "0.1", 
                    max: "30",
                    step: "0.1"
                  }}
                />
                <Typography variant="caption" sx={{ 
                  mt: 1, 
                  color: '#6B7280',
                  display: 'block'
                }}>
                  Maximum: 30kg par colis
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Typography variant="body2" sx={{ 
                  mb: 1, 
                  color: '#374151',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <MdLocationOn style={{ color: '#1F2937' }} />
                  Départ (optionnel)
                </Typography>
                <ModernTextField
                  fullWidth
                  select
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">
                    Tous les départs
                  </option>
                  {departsUniques.map((ville, index) => (
                    <option key={index} value={ville}>
                      {ville}
                    </option>
                  ))}
                </ModernTextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Typography variant="body2" sx={{ 
                  mb: 1, 
                  color: '#374151',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <FaMapMarkerAlt style={{ color: '#1F2937' }} />
                  Destination (optionnel)
                </Typography>
                <ModernTextField
                  fullWidth
                  select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">
                    Toutes les destinations
                  </option>
                  {destinationsUniques.map((ville, index) => (
                    <option key={index} value={ville}>
                      {ville}
                    </option>
                  ))}
                </ModernTextField>
              </Box>
            </Grid>
          </Grid>

          {loading && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={20} />
                <Typography sx={{ color: '#1F2937', fontSize: '0.9rem' }}>
                  Recherche des meilleures offres...
                </Typography>
              </Box>
            </Box>
          )}

          {resultat && !resultat.error && (
            <Fade in={true}>
              <Box sx={{ mt: 4 }}>
                {/* Résumé principal */}
                <ResultCard sx={{ p: 3, mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700,
                      color: '#1F2937'
                    }}>
                      Économie maximale : {resultat.economieVsPlusCher.toLocaleString()} F CFA
                    </Typography>
                    <ModernChip 
                      label={`${resultat.nombreOffres} offres comparées`} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(229, 231, 235, 0.3)',
                        color: '#374151',
                        border: '1px solid rgba(55, 65, 81, 0.1)',
                      }} 
                    />
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <ResultCard sx={{ 
                        p: 3, 
                        height: '100%'
                      }}>
                        <Typography sx={{ 
                          color: '#6B7280', 
                          mb: 1,
                          fontSize: '0.9rem'
                        }}>
                          Meilleure offre
                        </Typography>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700,
                          color: '#059669',
                          mb: 2
                        }}>
                          {resultat.totalMeilleur.toLocaleString()} F CFA
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <GiPriceTag style={{ color: '#1F2937' }} />
                          <Typography sx={{ color: '#374151', fontSize: '0.9rem' }}>
                            {resultat.tarifParKilo.toLocaleString()} F CFA / kg
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          mb: 2,
                          p: 1.5,
                          borderRadius: 2,
                          background: 'rgba(243, 244, 246, 0.5)'
                        }}>
                          <IoAirplaneSharp style={{ color: '#1F2937' }} />
                          <Box>
                            <Typography sx={{ color: '#1F2937', fontWeight: 600, fontSize: '0.9rem' }}>
                              {resultat.meilleureOffre.from} → {resultat.meilleureOffre.to}
                            </Typography>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                              Par {resultat.meilleureOffre.company}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <ModernChip 
                            label="Offre vérifiée" 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(209, 250, 229, 0.3)',
                              color: '#059669',
                              border: '1px solid rgba(5, 150, 105, 0.2)',
                            }} 
                          />
                          {resultat.meilleureOffre.kilos >= poids && (
                            <ModernChip 
                              label="Kilos suffisants" 
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(209, 250, 229, 0.3)',
                                color: '#059669',
                                border: '1px solid rgba(5, 150, 105, 0.2)',
                              }} 
                            />
                          )}
                        </Box>
                      </ResultCard>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <ResultCard sx={{ 
                        p: 3, 
                        height: '100%'
                      }}>
                        <Typography sx={{ 
                          color: '#6B7280', 
                          mb: 2,
                          fontSize: '0.9rem'
                        }}>
                          Comparaison des prix
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box sx={{ 
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(236, 253, 245, 0.5)',
                            border: '1px solid rgba(209, 250, 229, 0.5)'
                          }}>
                            <Typography sx={{ color: '#059669', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                              Économie réalisée
                            </Typography>
                            <Typography sx={{ color: '#065F46', fontWeight: 700, fontSize: '1.2rem' }}>
                              {resultat.economieVsPlusCher.toLocaleString()} F CFA
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                                Prix le plus bas:
                              </Typography>
                              <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '0.9rem' }}>
                                {resultat.prixLePlusBas.toLocaleString()} F CFA/kg
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                                Prix le plus haut:
                              </Typography>
                              <Typography sx={{ color: '#DC2626', fontWeight: 600, fontSize: '0.9rem' }}>
                                {resultat.prixLePlusHaut.toLocaleString()} F CFA/kg
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                                Différence:
                              </Typography>
                              <Typography sx={{ color: '#1F2937', fontWeight: 700, fontSize: '1rem' }}>
                                {resultat.economieVsPlusCher.toLocaleString()} F CFA
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </ResultCard>
                    </Grid>
                  </Grid>
                </ResultCard>
                
                {/* Liste des offres */}
                {offres.length > 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      color: '#1F2937'
                    }}>
                      Offres disponibles
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {offres.map((offre, index) => (
                        <ModernCard key={index}>
                          <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar sx={{ 
                                    width: 40, 
                                    height: 40,
                                    bgcolor: 'rgba(243, 244, 246, 0.8)',
                                    color: '#1F2937',
                                    fontWeight: 600,
                                    border: '1px solid rgba(31, 41, 55, 0.1)'
                                  }}>
                                    {offre.company?.charAt(0) || 'V'}
                                  </Avatar>
                                  <Box>
                                    <Typography sx={{ color: '#1F2937', fontWeight: 600, fontSize: '0.95rem' }}>
                                      {offre.company || 'Voyageur'}
                                    </Typography>
                                    <Typography sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                                      {offre.from} → {offre.to}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} md={3}>
                                <Box>
                                  <Typography sx={{ color: '#1F2937', fontWeight: 700, fontSize: '1.1rem' }}>
                                    {offre.totalOffre?.toLocaleString() || '0'} F CFA
                                  </Typography>
                                  <Typography sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
                                    {offre.tarifParKilo?.toLocaleString() || '0'} F CFA/kg
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} md={3}>
                                <Box>
                                  <ModernChip 
                                    label={`${offre.kilosDispo || 0} kg disponibles`}
                                    size="small"
                                    sx={{ 
                                      bgcolor: offre.suffisant ? 'rgba(167, 243, 208, 0.2)' : 'rgba(254, 243, 199, 0.2)',
                                      color: offre.suffisant ? '#059669' : '#92400E',
                                      border: offre.suffisant ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid rgba(146, 64, 14, 0.2)',
                                      mb: 1
                                    }} 
                                  />
                                  {offre.economieVsPlusCher > 0 && (
                                    <Typography sx={{ color: '#059669', fontSize: '0.8rem' }}>
                                      Économie: {offre.economieVsPlusCher.toLocaleString()} F CFA
                                    </Typography>
                                  )}
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} md={2}>
                                <WhatsAppButton
                                  fullWidth
                                  size="small"
                                  onClick={() => handleOpenWhatsappReservation(offre)}
                                  startIcon={<FaWhatsapp />}
                                >
                                  Réserver
                                </WhatsAppButton>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </ModernCard>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Fade>
          )}

          {resultat && resultat.error && (
            <Fade in={true}>
              <ResultCard sx={{ 
                mt: 4,
                p: 3,
                textAlign: 'center',
                border: '1px solid rgba(254, 202, 202, 0.5)',
                background: 'rgba(254, 242, 242, 0.5)'
              }}>
                <Typography sx={{ color: '#DC2626', fontWeight: 600, mb: 1 }}>
                  {resultat.error}
                </Typography>
              </ResultCard>
            </Fade>
          )}

          {!poids && !loading && (
            <Fade in={true}>
              <ResultCard sx={{ 
                mt: 4,
                p: 3,
                textAlign: 'center'
              }}>
                <Typography sx={{ color: '#1F2937', fontWeight: 600, mb: 1 }}>
                  Comment utiliser le simulateur
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                  1. Entrez le poids de votre colis
                  <br />
                  2. Comparez automatiquement toutes les offres
                  <br />
                  3. Contactez directement le voyageur  via WhatsApp
                 
                </Typography>
              </ResultCard>
            </Fade>
          )}
        </CardContent>
      </ModernCard>

      {/* MODAL WHATSAPP */}
      <Modal
        open={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        closeAfterTransition
        BackdropComponent={ModernModalBackdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={whatsappModalOpen}>
          <ModalContent>
            {/* En-tête fixe */}
            <Box sx={{ 
              p: { xs: 3, md: 4 },
              pb: 2,
              borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
              background: '#FFFFFF',
              flexShrink: 0
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaWhatsapp style={{ color: '#25D366' }} />
                  Réserver via WhatsApp
                </Typography>
                <IconButton 
                  onClick={() => setWhatsappModalOpen(false)} 
                  sx={{ 
                    color: '#6B7280',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    borderRadius: 2
                  }}
                >
                  <IoClose />
                </IconButton>
              </Box>
            </Box>
            
            {/* Contenu scrollable */}
            <Box sx={{ 
              flex: 1,
              overflow: 'auto',
              p: { xs: 3, md: 4 },
              pt: 3
            }}>
              {selectedVoyageur ? (
                <>
               
                  
                  {/* Informations du voyageur */}
                  <VoyageurCard sx={{ mb: 4, p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ 
                            width: 50, 
                            height: 50,
                            bgcolor: '#1F2937',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            border: '2px solid rgba(255, 255, 255, 0.2)'
                          }}>
                            {selectedVoyageur.company?.charAt(0) || 'V'}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                              {selectedVoyageur.company || 'Voyageur'}
                            </Typography>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                              Voyageur vérifié
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IoAirplaneSharp style={{ color: '#6B7280', fontSize: 16 }} />
                            <Typography sx={{ color: '#374151' }}>
                              {selectedVoyageur.from || ''} → {selectedVoyageur.to || ''}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MdAccessTime style={{ color: '#6B7280', fontSize: 16 }} />
                            <Typography sx={{ color: '#374151' }}>
                              Départ: {selectedVoyageur.departure_date || ''}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaWeightHanging style={{ color: '#6B7280', fontSize: 14 }} />
                            <Typography sx={{ color: '#374151' }}>
                              {selectedVoyageur.kilosDispo || 0} kg disponibles - {selectedVoyageur.tarifParKilo || 0} F CFA/kg
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700,
                          color: '#059669',
                          mb: 1
                        }}>
                          {selectedVoyageur.tarifParKilo || 0} F CFA
                          <Typography component="span" sx={{ fontSize: '0.875rem', ml: 0.5 }}>
                            /kg
                          </Typography>
                        </Typography>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                          Total: {((selectedVoyageur.tarifParKilo || 0) * (whatsappForm.kilos || poids || 0)).toLocaleString()} F CFA
                        </Typography>
                      </Grid>
                    </Grid>
                  </VoyageurCard>
                  
                  {/* Formulaire WhatsApp */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: '#1F2937'
                    }}>
                      Personnalisez votre réservation
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <ModernTextField
                        fullWidth
                        label="Votre nom (optionnel)"
                        placeholder="Ex: Jean Dupont"
                        value={whatsappForm.nom}
                        onChange={(e) => setWhatsappForm({...whatsappForm, nom: e.target.value})}
                      />
                      
                      <ModernTextField
                        fullWidth
                        label={`Kilos à réserver (max: ${selectedVoyageur.kilosDispo || 0} kg)`}
                        type="number"
                        value={whatsappForm.kilos}
                        onChange={(e) => {
                          const value = e.target.value;
                          const maxKilos = selectedVoyageur.kilosDispo || 0;
                          if (value === '' || (parseFloat(value) >= 0.1 && parseFloat(value) <= maxKilos)) {
                            setWhatsappForm({...whatsappForm, kilos: value});
                          }
                        }}
                        inputProps={{ 
                          min: "0.1", 
                          max: selectedVoyageur.kilosDispo || 0,
                          step: "0.1"
                        }}
                      />
                      
                      <ModernTextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Message supplémentaire (optionnel)"
                        placeholder="Ajoutez des détails spécifiques, questions, etc..."
                        value={whatsappForm.messagePerso}
                        onChange={(e) => setWhatsappForm({...whatsappForm, messagePerso: e.target.value})}
                      />
                    </Box>
                  </Box>
                  
                  {/* Aperçu du message */}
                  <MessagePreviewBox sx={{ mb: 4, p: 3 }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: '#1F2937'
                    }}>
                      Aperçu du message WhatsApp
                    </Typography>
                    
                    <Box sx={{ 
                      p: 2,
                      borderRadius: 1,
                      background: '#F9FAFB',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: '#374151',
                      whiteSpace: 'pre-line',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}>
                      {`Bonjour ${selectedVoyageur.company || 'voyageur'} !\n\n`}
                      {whatsappForm.nom && `Je m'appelle ${whatsappForm.nom}.\n\n`}
                      {`**RÉSERVATION #${reservationId || '[ID-GÉNÉRÉ]'}**\n`}
                      {`(Enregistrée dans le système Yónnee)\n\n`}
                      {`Je souhaite réserver ${whatsappForm.kilos || poids || 0} kg pour votre trajet :\n`}
                      {` ${selectedVoyageur.from || ''} → ${selectedVoyageur.to || ''}\n`}
                      {` ${selectedVoyageur.departure_date || ''}\n`}
                      {` ${selectedVoyageur.tarifParKilo || 0} F CFA/kg\n`}
                      {`   (Total: ${((selectedVoyageur.tarifParKilo || 0) * parseFloat(whatsappForm.kilos || poids || 0)).toLocaleString()} F CFA)\n\n`}
                      {`--- DONNÉES DE RÉSERVATION ---\n`}
                      {`ID Réservation: ${reservationId || '[ID-GÉNÉRÉ]'}\n`}
                      {`Nom: ${whatsappForm.nom || 'Non spécifié'}\n`}
                      {`Kilos: ${whatsappForm.kilos || poids || 0}\n`}
                      {`Trajet: ${selectedVoyageur.from || ''} → ${selectedVoyageur.to || ''}\n`}
                      {`Date: ${selectedVoyageur.departure_date || ''}\n`}
                      {`Prix/kg: ${selectedVoyageur.tarifParKilo || 0} F CFA\n`}
                      {`Total: ${((selectedVoyageur.tarifParKilo || 0) * parseFloat(whatsappForm.kilos || poids || 0)).toLocaleString()} F CFA\n`}
                      {`Compagnie: ${selectedVoyageur.company || ''}\n`}
                      {`Statut: En attente de confirmation\n\n`}
                      {whatsappForm.messagePerso && `Message du client:\n${whatsappForm.messagePerso}\n\n`}
                      {` Cette réservation est enregistrée dans notre système.\n`}
                      {` Pourriez-vous confirmer la disponibilité ?\n`}
                      {` Répondez avec "CONFIRMÉ" si disponible.\n\n`}
                      {`Merci !`}
                    </Box>
                  </MessagePreviewBox>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress size={40} sx={{ mb: 2 }} />
                  <Typography sx={{ color: '#6B7280' }}>
                    Chargement des informations du voyageur...
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* Boutons fixes en bas */}
            <Box sx={{ 
              p: { xs: 3, md: 4 },
              pt: 3,
              borderTop: '1px solid rgba(229, 231, 235, 0.5)',
              background: '#FFFFFF',
              flexShrink: 0
            }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setWhatsappModalOpen(false)}
                  sx={{
                    flex: 1,
                    border: '1px solid rgba(229, 231, 235, 0.8)',
                    color: '#374151',
                    borderRadius: 12,
                    fontWeight: 600,

                    '&:hover': {
                      border: '1px solid rgba(209, 213, 219, 0.8)',
                      background: 'rgba(249, 250, 251, 0.5)'
                    }
                  }}
                >
                  Annuler
                </Button>
                
                <Button
                  onClick={handleOpenWhatsApp}
                  disabled={backendLoading}
                  sx={{
                    flex: 2,
                    background: backendLoading ? 
                      'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)' : 
                      'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    borderRadius: 12,
                
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                      background: backendLoading ? 
                        'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)' : 
                        'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    }
                  }}
                >
                  {backendLoading ? (
                    <>
                      <CircularProgress size={20} color="inherit" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp />
                      {reservationId ? 'Ouvrir WhatsApp' : 'WhatsApp'}
                    </>
                  )}
                </Button>
              </Box>
              
            
            </Box>
          </ModalContent>
        </Fade>
      </Modal>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

// NAVBAR COMPOSANT
const Navbar = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        const handlePopState = (event) => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <Box sx={{ 
            background: '#FFFFFF',
            color: '#1F2937',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", sans-serif',
        }}>
            {/* Navigation Bar */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                background: '#FFFFFF',
                borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
                py: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
            }}>
                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                        <Grid item xs={6} md="auto">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <IoAirplaneSharp style={{ 
                                        color: '#FFFFFF',
                                        fontSize: 20,
                                    }} />
                                </Box>
                                
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700,
                                    color: '#1F2937',
                                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                                }}>
                                    Yónnee
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md="auto">
                            <Box sx={{ 
                                display: 'flex', 
                                gap: { xs: 1, md: 2 }, 
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                <Link to="connect" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        variant="outlined"
                                        sx={{
                                            border: '1px solid rgba(31, 41, 55, 0.2)',
                                            color: '#1F2937',
                                            borderRadius: 12,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                            px: { xs: 2, sm: 3 },
                                            py: 1,
                                            '&:hover': {
                                                border: '1px solid rgba(31, 41, 55, 0.4)',
                                                background: 'rgba(249, 250, 251, 0.5)',
                                            },
                                        }}
                                    >
                                        Connexion
                                    </Button>
                                </Link>
                                
                               
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Hero Section avec Simulateur */}
            <Box sx={{ 
                pt: { xs: 12, md: 15 }, 
                pb: { xs: 6, md: 10 },
                background: '#F9FAFB'
            }}>
                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <SimulateurPoids />
                </Container>
            </Box>

            {/* Bouton WhatsApp flottant */}
            <Box
                component="a"
                href="https://wa.me/+221778599418"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    width: 60,
                    height: 60,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    boxShadow: '0 4px 24px rgba(37, 211, 102, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
                    }
                }}
            >
                <FaWhatsapp style={{ fontSize: 28, color: 'white' }} />
            </Box>

            {/* Footer */}
            <Box sx={{ 
                py: { xs: 6, md: 8 },
                background: '#1F2937',
                color: '#FFFFFF',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Grid container spacing={{ xs: 4, md: 6 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <IoAirplaneSharp style={{ color: '#FFFFFF' }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        Yónnee
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: '#D1D5DB' }}>
                                    Plateforme de mise en relation entre voyageurs et expéditeurs.
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Contact
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <FaEnvelope style={{ color: '#9CA3AF' }} />
                                <Typography sx={{ color: '#D1D5DB' }}>
                                    contact@yonnee.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FaWhatsapp style={{ color: '#9CA3AF' }} />
                                <Typography sx={{ color: '#D1D5DB' }}>
                                    +221 77 859 94 18
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Suivi des réservations
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <FaDatabase style={{ color: '#9CA3AF' }} />
                                <Typography sx={{ color: '#D1D5DB' }}>
                                    Toutes les réservations sont sauvegardées
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FaShieldAlt style={{ color: '#9CA3AF' }} />
                                <Typography sx={{ color: '#D1D5DB' }}>
                                    Données sécurisées et suivies
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    
                    {/* Footer bas */}
                    <Box sx={{ 
                        mt: { xs: 6, md: 8 }, 
                        pt: { xs: 4, md: 5 }, 
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center'
                    }}>
                        <Typography sx={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                            © {new Date().getFullYear()} Yónnee. Tous droits réservés.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Navbar;