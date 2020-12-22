const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', async function (req, res) {
    var countries = (await db.query('SELECT * FROM countries'));
    
    res.render('countries', {
        title: 'Countries',
        linkActive: 'countries',
        countries: countries,
        
    });
});

module.exports = router;