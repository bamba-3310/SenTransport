import './Recherche.css';

function Recherche({ valeur, onChange }) {
  return (
    <div className="recherche-container">
      <input
        type="text"
        className="recherche-input"
        placeholder="Rechercher une ligne (ex: 1, Parcelles...)"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Recherche;