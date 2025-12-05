const express = require('express');
const app = express();
const cors = require('cors');

// 1. Configuration de base (Sécurité et format des données)
app.use(cors()); 
app.use(express.json()); // Indispensable pour recevoir des scores plus tard
app.use(express.urlencoded({ extended: true }));

// 2. LE PLUS IMPORTANT : Servir votre jeu
// Cela dit : "Quand on va sur le site, affiche le contenu du dossier 'public'"
// C'est grâce à cette ligne que votre index.html va s'afficher.
app.use(express.static('public'));


// 3. VOS FUTURES ROUTES (API)
// Pour l'instant, c'est vide, mais c'est ici que vous ajouterez la logique
// pour sauvegarder. Je vous mets un exemple prêt pour plus tard.

// Exemple : Route pour sauvegarder (À utiliser plus tard avec fetch)
app.post('/api/save', (req, res) => {
    const donneesRecues = req.body;
    console.log("Sauvegarde reçue du jeu :", donneesRecues);
    
    // Ici, plus tard, on enregistrera dans une base de données
    
    res.json({ status: "success", message: "Bien reçu chef !" });
});


// 4. Démarrage du serveur
app.listen(8080, () => {
    console.log("------------------------------------------------");
    console.log("LE SERVEUR EST PRÊT !");
    console.log("Pour jouer, ouvrez votre navigateur ici :");
    console.log("http://localhost:8080");
    console.log("------------------------------------------------");
});