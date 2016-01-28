// This is the main setup for the server. There is only one path ('/vehicles') that needs routing

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var vehicleRouter = require('./vehicleRouter');

app.use(bodyParser.json());

app.use('/vehicles', vehicleRouter);

app.listen(3000);