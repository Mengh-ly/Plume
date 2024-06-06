const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    // Première requête : obtenir l'ID utilisateur à partir du token
    db.query('SELECT idUtilisateur FROM utilisateur WHERE token = ?', [token], (error, userResults) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur du serveur' });
        }

        if (userResults.length === 0) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        const userId = userResults[0].idUtilisateur;

        // Deuxième requête : obtenir les dossiers associés à l'utilisateur
        db.query('SELECT idDossier, nomDossier FROM dossier WHERE idUtilisateur = ?', [userId], (error, dossierResults) => {
            if (error) {
                return res.status(500).json({ error: 'Erreur du serveur' });
            }

            if (dossierResults.length === 0) {
                return res.status(404).json({ message: 'Aucun dossier trouvé' });
            }

            // Préparer les dossiers et leurs tâches
            const dossiers = [];
            let completedQueries = 0;

            dossierResults.forEach(dossier => {
                // Troisième requête : obtenir les tâches associées à chaque dossier
                db.query('SELECT * FROM tache WHERE idDossier = ?', [dossier.idDossier], (error, tacheResults) => {
                    if (error) {
                        return res.status(500).json({ error: 'Erreur du serveur' });
                    }

                    dossiers.push({
                        idDossier: dossier.idDossier,
                        nomDossier: dossier.nomDossier,
                        taches: tacheResults
                    });

                    completedQueries++;
                    if (completedQueries === dossierResults.length) {
                        res.json(dossiers);
                    }
                });
            });
        });
    });
});

module.exports = router;
