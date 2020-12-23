const express = require('express');
const router = express.Router();
const db = require('../database/db');
var bodyParser = require('body-parser')

router.use(bodyParser.json());
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
    
    try{
        var airport_name = req.body.airport_name;
        var country_name = req.body.country_name;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var airline_name = req.body.airline_name;
        console.log(airport_name);
        if((airport_name || country_name || latitude || longitude || airline_name) !== ""){
            db.query(`INSERT INTO airports(airport_name, country_name,airline_name, latitude, longitude) VALUES($1, $2, $3, $4, $5);`, [airport_name,country_name,airline_name,latitude,longitude]);
            res.redirect('/airports');
        }
        else{
            throw new Error('Required');
        }
    }catch(err){
        
        res.send(err);
    }
    
});
router.delete('/delete/:airport_id', async function(req,res){
    var airport_id = req.body.airport_id;
    console.log(airport_id);
    db.query(`DELETE FROM airports WHERE airport_id = $1`, [airport_id]);

});
router.put('/edit/:airport_id', async function (req, res) {
    var airport_id = req.body.airport_id;
    console.log(airport_id);
    try{
        var airport_name = req.body.airline_name;
        var country_name = req.body.country_name;
        
        if((airline_name || country_name) !== ""){
            db.query(`UPDATE airlines SET airline_name = $1, country_name = $2 WHERE airline_id = $3`, [airline_name, country_name, airline_id]);
            res.redirect('/airlines');
        }
        else{
            throw new Error('Required');
        }
    }catch(err){
        
        res.send(err);
        
        res.end();
    }
    
});
module.exports = router;