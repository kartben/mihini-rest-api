var bufferpack = require('bufferpack');
var net = require('net');
var prettyjson = require('prettyjson');

var events = require('events'),
	util = require('util');
  
var EmpClient = function() {
  events.EventEmitter.call(this);
}

util.inherits(EmpClient, events.EventEmitter);

// returns the object corresponding to the unserialized command
EmpClient.prototype.decodeEmpResponse = function(responseBuffer) {
  // append a '\0' to the buffer
  b = new Buffer(responseBuffer.length + 1)
  b.fill(0)
  responseBuffer.copy(b)
  console.log(b.toString('hex'))
  var format = '>H(id)B(type)B(requestId)L(length)h(status)S(payload)'
  var command = bufferpack.unpack(format, b, 0)
  
  return command
}

// returns the Buffer corresponding to the serialized command
EmpClient.prototype.encodeEmpCommand = function(command) {
  var values = [command.id, command.type, 1, command.payload.length, command.payload]
  var format = '>HBBLS'
  var packed = bufferpack.pack(format, values)  
  return packed
}

EmpClient.prototype.sendCommand = function(command) {
  socket = net.Socket()
  var self = this;
  socket.on('data', function(data) {
    self.emit('resp', self.decodeEmpResponse(data))
  });

  socket.connect(9999)
  socket.write(this.encodeEmpCommand(command))  
}

module.exports = EmpClient

