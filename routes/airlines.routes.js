const express = require('express');
const { event } = require('jquery');
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
    try{
        var airline_name = req.body.airline_name;
        var country_name = req.body.country_name;
        const checkAirlineName = (await db.query(`SELECT * FROM airlines WHERE airline_name = $1`, [airline_name]));
        const checkCountry = (await db.query(`SELECT * FROM countries WHERE country_name = $1`, [country_name]));

        
        if(checkAirlineName.length !== 0){
           return res.status(400).send('Airline name already exists.');
           
        }
        if(checkCountry.length === 0){
            return res.status(400).send('Country not in countries.');
            
        }
        if((airline_name || country_name) !== ""){
            db.query(`INSERT INTO airlines(airline_name, country_name) VALUES($1, $2);`, [airline_name, country_name]);
            return res.status(200).redirect('/airlines');
        }
        else{
            throw new Error('Required');
        }
        
    }catch(err){
        
        res.send(err);
        res.end();
    }
    
});
router.delete('/delete/:airline_id', async function(req,res){
    var airline_id = req.body.airline_id;
    db.query(`DELETE FROM airlines WHERE airline_id = $1`, [airline_id]);

});
router.put('/edit/:airline_id', async function (req, res) {
    var airline_id = req.body.airline_id;
    try{
        var airline_name = req.body.airline_name;
        var country_name = req.body.country_name;
        
        const checkCountry = (await db.query(`SELECT * FROM countries WHERE country_name = $1`, [country_name]));

        
        
        if(checkCountry.length === 0){
            return res.status(400).send('Country not in countries.');
            
        }
        if((airline_name || country_name) !== ""){
            db.query(`UPDATE airlines SET airline_name = $1, country_name = $2 WHERE airline_id = $3`, [airline_name, country_name, airline_id]);
            res.status(200);
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