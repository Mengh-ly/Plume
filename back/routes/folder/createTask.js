const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    const { nomTache, idDossier, dateLimite } = req.body;

    // Valeurs en dur pour les autres champs
    const description = 'Description de la tâche';  // Par exemple
    const dateCreation = new Date().toISOString().slice(0, 10);  // Date du jour
    const statut = 0;  // Exemple de statut
    const recurrence = 0;  // Exemple de récurrence
    const dateDebutRecurrence = '2024-06-08';  // Exemple de début de récurrence
    const dateFinRecurrence = '2024-06-30';  // Exemple de fin de récurrence

    // Requête SQL d'insertion
    const sql = `
        INSERT INTO tache (nomTache, description, dateCreation, dateLimite, statut, recurrence, dateDebutRecurrence, dateFinRecurrence, idDossier)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nomTache, description, dateCreation, dateLimite, statut, recurrence, dateDebutRecurrence, dateFinRecurrence, idDossier];

    // Exécution de la requête
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion :', err);
            res.status(500).send('Erreur lors de l\'insertion de la tâche');
            return;
        }
        console.log('Nouvelle tâche insérée avec succès, ID :', result.insertId);
        res.status(200).send('Tâche insérée avec succès');
    });
});

module.exports = router;
