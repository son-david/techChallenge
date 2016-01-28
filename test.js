var expect = require('chai').expect;
var request = require('request');

describe('Smartcar api: ', function() {

  describe('a GET request for vehicle info', function(){

    it('should return vin, color, doorCount, and driveTrain data', function(done){

      request.get('http://localhost:3000/vehicles/1234', function(err, response, body) {
        var dataReturned = JSON.parse(body);

        expect(dataReturned).to.be.an('object');
        expect(dataReturned).to.have.property('vin').that.is.a('string');
        expect(dataReturned).to.have.property('color').that.is.a('string');
        expect(dataReturned).to.have.property('doorCount').that.is.a('number');
        expect(dataReturned).to.have.property('driveTrain').that.is.a('string');

        done();

      });
    });
  });

  describe('a get request for vehicle security', function(){

    it('should return location and locked values', function(done){

      request.get('http://localhost:3000/vehicles/1234/doors', function(err, response, body) {
        var dataReturned = JSON.parse(body);

        expect(dataReturned).to.be.an('array').with.length(2);
        expect(dataReturned[0]).to.be.an('object').with.property('location').that.is.a('string');
        expect(dataReturned[0]).to.have.property('locked').that.is.a('boolean');
        expect(dataReturned[1]).to.be.an('object').with.property('location').that.is.a('string');
        expect(dataReturned[1]).to.have.property('locked').that.is.a('boolean');

        done();

      });
    });
    
  });

  describe('a get request for fuel/battery range', function(){

    it('should return fuel info at /fuel', function(done){

      request.get('http://localhost:3000/vehicles/1234/fuel', function(err, response, body) {
        
        var dataReturned = JSON.parse(body);
        expect(dataReturned).to.be.an('object').with.property('percent').that.is.a('number');
        done();

      });
    });

    it('should return no fuel info if not applicable', function(done){

      request.get('http://localhost:3000/vehicles/1234/battery', function(err, response, body) {
        
        var dataReturned = JSON.parse(body);
        expect(dataReturned).to.be.an('object').with.property('percent').that.is.a('null');
        done();

      });
    });

    it('should return battery info at /battery', function(done){

      request.get('http://localhost:3000/vehicles/1235/battery', function(err, response, body) {
        
        var dataReturned = JSON.parse(body);
        expect(dataReturned).to.be.an('object').with.property('percent').that.is.a('number');
        done();

      });
    });

    it('should return no battery info if not applicable', function(done){

      request.get('http://localhost:3000/vehicles/1235/fuel', function(err, response, body) {
        
        var dataReturned = JSON.parse(body);
        expect(dataReturned).to.be.an('object').with.property('percent').that.is.a('null');
        done();

      });
    });
    
  });

  describe('a post request for engine control', function(){

    it('should return a status response (START)', function(done){

      request.post({url:'http://localhost:3000/vehicles/1234/engine', body: {'action':'START'}, json:true}, function(err, response, body) {

        expect(body).to.be.an('object').with.property('status').that.is.a('string');
        done();

      });
    });
    
    it('should return a status response (STOP)', function(done){

      request.post({url:'http://localhost:3000/vehicles/1234/engine', body: {'action':'STOP'}, json:true}, function(err, response, body) {

        expect(body).to.be.an('object').with.property('status').that.is.a('string');
        done();

      });
    });

  });

})