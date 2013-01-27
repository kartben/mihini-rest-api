/*
 * GET users listing.
 */


exports.list = function(req, res) {
  var bufferpack = require('bufferpack');
  var net = require('net');

  socket = net.Socket()
  socket.on('data', function(data) {
    console.log('DATA ' + socket.remoteAddress + ': ' + data);
//    res = bufferpack.unpack(">H20A", data);
//    console.log(res)
  });

  socket.connect(9999)

  commandId = 9
  commandType = 0
  requestId = 2
  payload = '"config"'

  var values = [commandId, commandType, 111, payload.length, payload]
  var format = '>HBBLS';

  var packed = bufferpack.pack(format, values);
  console.log(packed)

  socket.write(packed)





  res.send("respond with a resource");
};
