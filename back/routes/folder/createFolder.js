const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token, nomDossier } = req.body;

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

        // Insertion de nomDossier dans la table Dossier
        db.query('INSERT INTO Dossier (nomDossier, idUtilisateur) VALUES (?, ?)', [nomDossier, userId], (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: 'Erreur lors de la création du dossier'
                });
            }

            return res.status(201).json({
                message: 'Dossier créé avec succès'
            });
        });
    });
});

module.exports = router;
