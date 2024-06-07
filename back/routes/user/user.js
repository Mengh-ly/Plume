const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {

    const{token}= req.body;

    db.query('SELECT nom,prenom,email FROM utilisateur WHERE token = ?',[token], (error, results) => {
        if(results.length === 0){
            return res.status(401).json({
                message: 'Token incorrect'
            })
        }
        const userLastname = results[0].nom;
        const userFirstname = results[0].prenom;
        const userEmail = results[0].email;
        res.json({
            nom: userLastname,
            prenom: userFirstname,
            email: userEmail,
        });
    });
});

module.exports = router;
