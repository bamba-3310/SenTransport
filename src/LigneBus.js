import './LigneBus.css';

function LigneBus({ numero, depart, arrivee, arrets }) {
  return (
    <div className="ligne-bus">
      <div className="numero">{numero}</div>
      <div className="trajet">
        {depart} → {arrivee}
      </div>
      <div className="arrets">{arrets} arrets</div>
    </div>
  );
}

export default LigneBus;
