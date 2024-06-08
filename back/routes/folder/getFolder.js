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

        // Requête pour obtenir les idDossier associés à l'idUtilisateur
        db.query('SELECT nomDossier FROM dossier WHERE idUtilisateur = ?', [userId], (error, dossierResults) => {
            if (error) {
                return res.status(500).json({
                    message: 'Erreur de serveur'
                });
            }

            const dossierIds = dossierResults.map(dossier => dossier.nomDossier);

            res.json({
                dossiers: dossierIds
            });
        });
    });
});

module.exports = router;
