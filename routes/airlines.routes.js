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
router.get('/add', async function (req, res) {
    res.render('airlines_add', {
        title: 'Airlines_add',
        linkActive: 'airlines_add',
        
        
    });
});
router.get('/JSONDownload', async function(req,res){
    const airlines = (await db.query('SELECT * FROM airlines'));
    res.json(airlines);
    
});
router.post('/add', async function (req, res) {
    console.log(req.body);
    console.log(req.body.airline_name);
    console.log(req.body.country_name);
    
    try{
        var airline_name = req.body.airline_name;
        var country_name = req.body.country_name;
        
        db.query(`INSERT INTO airlines(airline_name, country_name) VALUES($1, $2);`, [airline_name, country_name]);
    }catch(err){
        throw err;
    }
    res.redirect('/airlines');
});



module.exports = router;