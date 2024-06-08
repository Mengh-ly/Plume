const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {

    const{email,mdp}= req.body;

    db.query('SELECT token FROM utilisateur WHERE email = ? AND mdp = ?',[email,mdp], (error, results) => {
        if(results.length === 0){
            return res.status(401).json({
                message: 'Identifiant incorrect'
            })
        }
        const usertoken = results[0].token;
        res.json({
            token: usertoken
        });
    });
});

module.exports = router;
