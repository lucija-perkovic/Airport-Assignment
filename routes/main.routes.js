const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', async function (req, res) {
    
    res.render('main', {
        title: 'Main',
        linkActive: 'main',
        
        
    });
});

module.exports = router;