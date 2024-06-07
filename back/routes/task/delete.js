const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { token, idTaches } = req.body;

    if (!token || !idTaches || !Array.isArray(idTaches)) {
        return res.status(400).json({ error: 'Token et idTaches (array) sont nécessaires' });
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

        // Deuxième requête : vérifier les tâches et supprimer celles qui sont valides
        const deletePromises = idTaches.map(idTache => {
            return new Promise((resolve, reject) => {
                db.query(`
                    SELECT t.idTache, t.statut, d.idDossier 
                    FROM tache t
                    JOIN dossier d ON t.idDossier = d.idDossier
                    WHERE t.idTache = ? AND d.idUtilisateur = ?`,
                    [idTache, userId], (error, tacheResults) => {
                        if (error) {
                            reject({ idTache, error: 'Erreur du serveur' });
                        } else if (tacheResults.length === 0) {
                            reject({ idTache, error: 'Tâche non trouvée ou accès non autorisé' });
                        } else {
                            const tache = tacheResults[0];
                            const dossierId = tache.idDossier;

                            if (tache.statut === 1) {
                                db.query('DELETE FROM tache WHERE idTache = ?', [idTache], (error, deleteResults) => {
                                    if (error) {
                                        reject({ idTache, error: 'Erreur lors de la suppression de la tâche' });
                                    } else {
                                        // Troisième requête : vérifier s'il reste des tâches dans le dossier
                                        db.query('SELECT COUNT(*) AS count FROM tache WHERE idDossier = ?', [dossierId], (error, countResults) => {
                                            if (error) {
                                                reject({ idTache, error: 'Erreur lors de la vérification du nombre de tâches restantes' });
                                            } else {
                                                const count = countResults[0].count;
                                                if (count === 0) {
                                                    // Quatrième requête : supprimer le dossier s'il n'y a plus de tâches
                                                    db.query('DELETE FROM dossier WHERE idDossier = ?', [dossierId], (error, deleteDossierResults) => {
                                                        if (error) {
                                                            reject({ idTache, error: 'Erreur lors de la suppression du dossier' });
                                                        } else {
                                                            resolve({ idTache, message: 'Tâche et dossier supprimés avec succès' });
                                                        }
                                                    });
                                                } else {
                                                    resolve({ idTache, message: 'Tâche supprimée avec succès' });
                                                }
                                            }
                                        });
                                    }
                                });
                            } else {
                                resolve({ idTache, message: 'La tâche n\'a pas été supprimée car son statut n\'est pas égal à 1' });
                            }
                        }
                    });
            });
        });

        Promise.all(deletePromises)
            .then(results => {
                res.json(results);
            })
            .catch(error => {
                res.status(500).json({ error: 'Erreur lors de la suppression des tâches', details: error });
            });
    });
});

module.exports = router;
