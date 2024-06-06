const mysql = require('mysql');

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;