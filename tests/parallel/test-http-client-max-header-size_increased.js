'use strict';
require('../common');

// set max header size
require('../../../http-parser-js').HTTPParser.maxHeaderSize = 1024 * 1024; // 1MB instead of 80kb

var assert = require('assert');
var http = require('http');

var s = "x".repeat(1024 * 1024);

var header = {
  'x-custom-header': s,
  'Connection':'keep-alive',
  'Content-Length': 0,
  'Content-Type':'application/json; charset=UTF-8'
};

var server = http.createServer(function(req, res) {
  // code wouldn't come here if an error was thrown
  assert(true);
  res.end();

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
    assert(false);
  });
  r.end();
});
