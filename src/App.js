import './App.css';
import Header from './Header';
import Footer from './Footer'
import Statistique from './Statistique';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='contenu'>
        <p>
          Bienvenu ! cette application vous aide a trouver
          votre ligne de bus a dakar
        </p>
        <Statistique num="13" libele="lignes"/>
        <Statistique num="3" libele="bus"/>
        <Statistique num="24" libele="arret"/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
