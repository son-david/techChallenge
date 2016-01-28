This is a proxy server setup for a middleman API that querys GM and restructures its response data.  
  
Installation:  
In the Terminal,  
1) Run npm install to install all dependencies  
2) Run npm start, which will 'node server.js', starting up a server listening at port 3000  
3) Run npm test, which will start the testing suite 'mocha'  

Files:  
server.js - This is the main setup for the server  
services.js - This is where the interaction with GM's api occurs, as well as restructuring of the data received  
test.js - These are unit functional tests for each api endpoint  
vehicleRouter.js - This is where the routes are defined for requests to /vehicles, mapped to their respective functions in 'services'  
package.json - npm info  
  
API endpoints:  
/vehicles/:id - returns vin, color, doorCount, and driveTrain data  
/vehicles/:id/doors - returns location and locked values  
/vehicles/:id/fuel - returns fuel percentage information  
/vehicles/:id/battery - returns battery percentage information  
/vehicles/:id/engine - returns status information  
  
