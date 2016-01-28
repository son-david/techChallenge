var express = require('express');
var router = express.Router();
var services = require('./services');

router.get('/:id', services.info);

router.get('/:id/doors', services.security);

router.get('/:id/fuel', services.fuelBattery);

router.get('/:id/battery', services.fuelBattery);

router.post('/:id/engine', services.engine);

module.exports = router;