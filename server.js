var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var vehicleRouter = require('./vehicleRouter');

app.use(bodyParser.json());

app.use('/vehicles', vehicleRouter);

app.listen(3000);