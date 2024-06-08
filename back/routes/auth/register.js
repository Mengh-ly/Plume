const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { nom, prenom, email, mdp } = req.body;

    function generateToken() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Vérifier si l'email existe déjà
    db.query('SELECT * FROM utilisateur WHERE email = ?', [email], (error, results) => {
        if (results.length > 0) {
            // L'email existe déjà
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }

        // L'email n'existe pas, procéder à l'insertion de l'utilisateur
        const token = generateToken();
        db.query(
            'INSERT INTO utilisateur(nom, prenom, email, mdp, token) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, email, mdp, token],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
                }

                const idUtilisateur = results.insertId;

                // Insérer un dossier pour cet utilisateur
                db.query(
                    'INSERT INTO Dossier(nomDossier, idUtilisateur) VALUES (?, ?)',
                    ['Aucun', idUtilisateur],
                    (error, results) => {
                        if (error) {
                            return res.status(500).json({ error: 'Erreur lors de la création du dossier' });
                        }

                        res.json({
                            message: 'Utilisateur créé avec succès'
                        });
                    }
                );
            }
        );
    });
});

module.exports = router;
