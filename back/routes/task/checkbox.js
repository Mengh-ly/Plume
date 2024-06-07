const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token, idTache } = req.body;

    if (!token || !idTache) {
        return res.status(400).json({ error: 'Token et idTache sont nécessaires' });
    }

    // Première requête : obtenir l'ID utilisateur à partir du token
    db.query('SELECT idUtilisateur FROM utilisateur WHERE token = ?', [token], (error, userResults) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur du serveur' });
        }

        if (userResults.length === 0) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        const userId = userResults[0].idUtilisateur;

        // Deuxième requête : vérifier si l'utilisateur a accès à la tâche
        db.query(`
            SELECT t.idTache, t.statut 
            FROM tache t
            JOIN dossier d ON t.idDossier = d.idDossier
            WHERE t.idTache = ? AND d.idUtilisateur = ?`,
            [idTache, userId], (error, tacheResults) => {
                if (error) {
                    return res.status(500).json({ error: 'Erreur du serveur' });
                }

                if (tacheResults.length === 0) {
                    return res.status(404).json({ message: 'Tâche non trouvée ou accès non autorisé' });
                }

                const tache = tacheResults[0];
                const newStatut = tache.statut === 0 ? 1 : 0;

                // Troisième requête : mettre à jour le statut de la tâche
                db.query('UPDATE tache SET statut = ? WHERE idTache = ?', [newStatut, idTache], (error, updateResults) => {
                    if (error) {
                        return res.status(500).json({ error: 'Erreur du serveur' });
                    }

                    res.json({ message: 'Statut de la tâche mis à jour', newStatut });
                });
            });
    });
});

module.exports = router;
