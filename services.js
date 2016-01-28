var request = require('request');

module.exports = {
  info: info,
  security : security,
  fuelBattery : fuelBattery,
  engine: engine
};

var address = 'http://gmapi.azurewebsites.net'

function info (req, res) {

  request.post({url: address + '/getVehicleInfoService', body: {'id':req.params.id, 'responseType' : 'JSON'}, json: true}, function (err, response, body) {
    if (err) {
      return console.error('something went wrong', err)
    };

    var data = body.data;

    var result = {
      vin : data.vin.value,
      color: data.color.value,
      doorCount: data.fourDoorSedan.value === 'True' ? 4 : 2,
      driveTrain: data.driveTrain.value
    };

    res.status(200).send(result);

  })
};

function security(req, res) {
  
  request.post({url:address + '/getSecurityStatusService', body: {'id':req.params.id, 'responseType' : 'JSON'}, json: true}, function (err, response, body) {
    if (err) {
      return console.error('something went wrong', err)
    };

    var data = body.data;

    var result = data.doors.values.map(function (door){
      return {
        'location' : door.location.value,
        'locked' : JSON.parse(door.locked.value.toLowerCase()) 
      };
    });

    res.status(200).send(result);

  });
};

function fuelBattery(req, res) {

  request.post({url:address + '/getEnergyService', body: {'id':req.params.id, 'responseType' : 'JSON'}, json: true}, function (err, response, body) {
    if (err) {
      return console.error('something went wrong', err)
    };

    var param = req.url.split('/')[2];
    var data = body.data;

    var tank = {
      percent: JSON.parse(data.tankLevel.value)
    };
    var battery = {
      percent: JSON.parse(data.batteryLevel.value)
    };

    if (param === 'fuel') {
      res.status(200).send(tank);
    } else if (param === 'battery') {
      res.status(200).send(battery);
    }

  });
};

function engine(req, res) {

  var postBody = {
    'id':req.params.id,
    'responseType' : 'JSON',
    'command' : req.body.action.toUpperCase() + '_VEHICLE'
  }

  request.post({url:address + '/actionEngineService', body: postBody , json: true}, function (err, response, body) {
    if (err) {
      return console.error('something went wrong', err)
    };

    var status;
    if (body.actionResult.status === 'EXECUTED') {
      status = 'success'
    } else if (body.actionResult.status === 'FAILED') {
      status = 'error'
    }

    res.status(200).send({status: status});

  });
};

