import './StatReseau.css';

function StatReseau({ lignes }) {
  // 1. Nombre total de lignes
  const totalLignes = lignes.length;

  // 2. Somme totale des arrêts
  const totalArrets = lignes.reduce((cumul, ligne) => cumul + ligne.arrets, 0);

  // 3. Trouver la ligne ayant le plus d'arrêts
  const lignePlusLongue = lignes.reduce((max, ligne) => 
    (ligne.arrets > max.arrets) ? ligne : max
  , lignes[0]);

  return (
    <div className="stat-reseau">
      <div className="stat-card">
        <span className="stat-label">Total Lignes</span>
        <span className="stat-value">{totalLignes}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Total Arrêts</span>
        <span className="stat-value">{totalArrets}</span>
      </div>
      <div className="stat-card highlight">
        <span className="stat-label">Ligne la plus longue</span>
        <span className="stat-value">
          N°{lignePlusLongue.numero} ({lignePlusLongue.arrets} arrêts)
        </span>
      </div>
    </div>
  );
}

export default StatReseau;