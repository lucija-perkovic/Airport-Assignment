const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', async function (req, res) {
    var airports = (await db.query('SELECT * FROM airports'));
    res.render('airports', {
        title: 'Airports',
        linkActive: 'airports',
        airports: airports,
        
    });
});

module.exports = router;