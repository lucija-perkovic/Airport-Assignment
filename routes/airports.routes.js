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
        
        const checkAirlineName = (await db.query(`SELECT * FROM airlines WHERE airline_name = $1`, [airline_name]));
        const checkCountry = (await db.query(`SELECT * FROM countries WHERE country_name = $1`, [country_name]));
        const checkAirportName = (await db.query(`SELECT * FROM airports WHERE airport_name = $1`, [airport_name]));
        if(checkAirportName.length !== 0){
            return res.status(400).send('Airport name already exists.');
           
            
        }
        else if(checkCountry.length === 0){
            return res.status(400).send('Country not in countries.');
            

        }
        else if(checkAirlineName.length === 0){
            return res.status(400).send('Airline not in airlines');
            

        }
        
        
        if((airport_name || country_name || latitude || longitude || airline_name) !== ""){
            await db.query(`INSERT INTO airports(airport_name, country_name,airline_name, latitude, longitude) 
                    VALUES($1, $2, $3, $4, $5);`, [airport_name,country_name,airline_name,latitude,longitude]);
            return res.status(200).redirect('/airports');
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
    db.query(`DELETE FROM airports WHERE airport_id = $1`, [airport_id]);

});
router.put('/edit', async function (req, res) {
    var airport_id = req.body.airport_id;
    console.log('IM IN');
    try{
        var airport_name = req.body.airport_name;
        var country_name = req.body.country_name;
        var airline_name = req.body.airline_name;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;

        const checkAirlineName = (await db.query(`SELECT * FROM airlines WHERE airline_name = $1`, [airline_name]));
        const checkCountry = (await db.query(`SELECT * FROM countries WHERE country_name = $1`, [country_name]));
        
        if(checkCountry.length === 0){
            return res.status(400).send('Country not in countries.');
            

        }
        else if(checkAirlineName.length === 0){
            return res.status(400).send('Airline not in airlines');
            

        }
        if((airline_name || country_name) !== ""){
            db.query(`UPDATE airports 
                    SET airport_name = $1, country_name = $2, airline_name = $3, latitude = $4, longitude = $5 
                    WHERE airport_id = $6`, [airport_name, country_name, airline_name, latitude, longitude,airport_id]);
            return res.status(200);
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