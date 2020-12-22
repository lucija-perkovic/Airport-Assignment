const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routes/main.routes');
const airlinesRouter = require('./routes/airlines.routes');
const airportsRouter = require('./routes/airports.routes');
const countriesRouter = require('./routes/countries.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));



app.use('/', mainRouter);
app.use('/airlines', airlinesRouter);
app.use('/airports', airportsRouter);
app.use('/countries', countriesRouter);

app.listen(3000);