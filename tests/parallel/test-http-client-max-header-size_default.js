'use strict';
require('../common');

var assert = require('assert');
var http = require('http');

// try to send a header that is bigger than the 80kb threshold
var s = "x".repeat(1024 * 1024);
var errorOccurred = false;

var header = {
  'x-custom-header': s,
  'Connection':'keep-alive',
  'Content-Length': 0,
  'Content-Type':'application/json; charset=UTF-8'
};

var server = http.createServer(function(req, res) {
  // code should not get here if the test succeeds
  res.end();

  // close the server
  server.close();
});

server.listen(0, function() {
  var options = {
    port: server.address().port,
    method: 'GET',
    headers: header
  };

  var r = http.request(options);
  r.on('error', function(err) {
    // we expect the code to get here
    // errorOccurred is set to true, which is used when the process exits
    // this way, every situation is caught
    errorOccurred = true;

    // close the server
    server.close();
  });
  r.end();
});

// when process exits, assert the 'errorOccurred' variable to see whether an error occurred or not
process.on('exit', function() { 
  assert(errorOccurred); 
});
