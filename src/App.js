import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import StatReseau from './StatReseau';
import { useState } from 'react';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import { useEffect } from 'react';

function App() {
  // 1. Trois etats
  const [ lignes , setLignes ] = useState ([]) ;
  const [ chargement , setChargement ] = useState ( true ) ;
  const [ erreur , setErreur ] = useState ( null ) ;
  const [ recherche , setRecherche ] = useState ("") ;
  const [ ligneSelectionnee , setLigneSelectionnee ] = useState ( null ) ;

// 2. Charger les donnees au demarrage
  useEffect (() => {
    fetch (" http://localhost:5000/lignes")
      . then ( response => {
        if (!response.ok) {
          throw new Error(
            "Erreur serveur : " + response.status);
        }
        return response.json() ;
      })
      . then ( data => {
        setLignes (data) ;
        setChargement (false) ;
      })
      . catch ( error => {
        setErreur ( error.message ) ;
        setChargement ( false ) ;
      }) ;
  } , []) ;


// Filtrer les lignes selon le texte tapé
  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
        // re-clic = désélectionner
        setLigneSelectionnee(null);
    } else {
        // premier clic = sélectionner
        setLigneSelectionnee(ligne);
    }
}

  const [compteur, setCompteur] = useState(0);

  // Ecran de chargement
  if ( chargement ) {
    return (
      < div className ="App">
        < Header / >
        < main className =" contenu ">
          Chargement des lignes ...
        </ main >
      </ div >
    ) ;
  }

  // Ecran d'erreur
  if ( erreur ) {
    return (
      < div className ="App">
        < Header / >
        < main className =" contenu ">
          < div className =" message - erreur "> Impossible de charger les lignes . 
            { erreur } 
             Verifiez que le serveur Flask est lance ( python api / app . py ) . 
          </ div >
        </ main >
      </ div >
    ) ;
  }

  // Ecran normal ( inchange par rapport au Lab 3)

  return (
    <div className="App">
      <Header />
      
      <main className="contenu">

        <StatReseau lignes={lignes}/>

        <Recherche 
          valeur={recherche} 
          onChange={(val) => {
            setRecherche(val);
            setCompteur(prev => prev + 1);
          }} 
        />

        <div className="resultats-recherche">
          {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
        </div>

        <p>Vous avez effectué {compteur} recherche(s)</p>

        <div className="liste-lignes">
          
          {lignesFiltrees.length === 0 && (
            <p>Aucune ligne trouvée</p>
          )}

         {lignesFiltrees.map(ligne => ( 
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={
                          ligneSelectionnee &&
                          ligneSelectionnee.id === ligne.id
           }
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        </div>
        {ligneSelectionnee && (
            <DetailLigne ligne={ligneSelectionnee} />
        )}
      </main>

      <Footer />
    </div>
  );
}
export default App;