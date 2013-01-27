/*
 * GET users listing.
 */

var EmpClient = require ('../lib/emp-client')

exports.list = function(req, res) {
  console.log(req.params[0].replace(/\//g, '.'))

  
  var e = new EmpClient();

  command = {}
  command.id = 9
  command.type = 0
  command.requestId = 1
  
  if(req.params[0]) {
    command.payload = '"' + req.params[0].replace(/\//g, '.') + '"'
  }
  else {
    command.payload = '""'
  }
  
  e.on('resp', function(response) { 
    res.send(JSON.parse(response.payload))
  })
  
  e.sendCommand(command)
  
};
