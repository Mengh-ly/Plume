const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token } = req.body;

    // Requête pour obtenir l'idUtilisateur à partir du token
    db.query('SELECT idUtilisateur FROM utilisateur WHERE token = ?', [token], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: 'Erreur de serveur'
            });
        }
        if (results.length === 0) {
            return res.status(401).json({
                message: 'Token incorrect'
            });
        }

        const userId = results[0].idUtilisateur;

        // Requête pour obtenir les idDossier et nomDossier associés à l'idUtilisateur
        db.query('SELECT nomDossier, idDossier FROM dossier WHERE idUtilisateur = ?', [userId], (error, dossierResults) => {
            if (error) {
                return res.status(500).json({
                    message: 'Erreur de serveur'
                });
            }

            // Construction de la réponse attendue
            const dossiers = dossierResults.map(dossier => ({
                idDossier: dossier.idDossier,
                nomDossier: dossier.nomDossier
            }));

            res.json({
                dossiers: dossiers
            });
        });
    });
});

module.exports = router;
