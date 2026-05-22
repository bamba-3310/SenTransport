import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les données depuis le fichier JSON
with open("lignes_ddd.json", "r", encoding="utf-8") as f:
    lignes = json.load(f)

@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>"]
    })

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )

    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvée"}), 404

    return jsonify(ligne)



@app.route("/arrets")
def get_arrets():
    ensemble_arrets = set()
    
    # Parcourir chaque ligne et ajouter ses arrêts à l'ensemble
    for ligne in lignes:
        for arret in ligne["listeArrets"]:
            ensemble_arrets.add(arret)
            
    # Convertir le set en liste triée (optionnel mais plus propre) et retourner le JSON
    return jsonify({"message" : " voici la liste des arrets!!"},sorted(list(ensemble_arrets)))

@app.route("/stats")
def get_stats():
    total_lignes = len(lignes)
    total_arrets = sum(ligne["arrets"] for ligne in lignes)
    
    # Trouver la ligne qui a le maximum d'arrêts
    ligne_max = max(lignes, key=lambda x: x["arrets"])
    numero_ligne_max = ligne_max["numero"]
    
    stats = {
        "total_lignes": total_lignes,
        "total_arrets": total_arrets,
        "ligne_avec_le_plus_d_arrets": numero_ligne_max
    }
    
    return jsonify(stats)

from flask import request

@app.route("/lignes/recherche")
def recherche_lignes():
    # Récupérer le paramètre 'q' (chaîne vide par défaut si absent)
    query = request.args.get("q", "")
    
    # Si aucun terme n'est fourni, on peut retourner toutes les lignes ou une liste vide
    if not query:
        return jsonify([])
        
    resultat = []
    # Convertir en minuscules pour rendre la recherche insensible à la casse
    query_lower = query.lower()
    
    for ligne in lignes:
        depart = ligne["depart"].lower()
        arrivee = ligne["arrivee"].lower()
        
        # Vérifier si le terme est inclus dans le départ ou l'arrivée
        if query_lower in depart or query_lower in arrivee:
            resultat.append(ligne)
            
    return jsonify(resultat)

if __name__ == "__main__":
    app.run(debug=True, port=5000)