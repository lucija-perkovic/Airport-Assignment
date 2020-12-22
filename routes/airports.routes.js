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
router.get('/add', async function (req, res) {
    res.render('airports_add', {
        title: 'Airports_add',
        linkActive: 'airports_add',
        
        
    });
});
router.get('/JSONDownload', async function(req,res){
    const airports = (await db.query('SELECT * FROM airports'));
    res.json(airports);
});
router.post('/add', async function (req, res) {
    console.log(req.body);
    console.log(req.body.airport_name);
    console.log(req.body.country_name);
    try{
        var airport_name = req.body.airport_name;
        var country_name = req.body.country_name;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var airline_name = req.body.airline_name;
        
        db.query(`INSERT INTO airports(airport_name, country_name,airline_name, latitude, longitude) VALUES($1, $2, $3, $4, $5);`, [airport_name,country_name,airline_name,latitude,longitude]);
    }catch(err){
        throw err;
    }
    res.redirect('/airports');
});
module.exports = router;