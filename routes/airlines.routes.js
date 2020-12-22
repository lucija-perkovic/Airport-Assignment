const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', async function (req, res) {
    var airlines = (await db.query('SELECT * FROM airlines'));
    res.render('airlines', {
        title: 'Airlines',
        linkActive: 'airlines',
        airlines: airlines,
        
    });
});

module.exports = router;