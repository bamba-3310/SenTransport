import logo from './logo.svg';
import './App.css';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='contenu'>
        <p>
          Bienvenu ! cette application vous aide a trouver
          votre ligne de bus a dakar
        </p>
      </main>
    </div>
  );
}

export default App;
