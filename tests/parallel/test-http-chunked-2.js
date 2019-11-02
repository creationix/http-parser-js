'use strict';

require('../common');
var assert = require('assert');
var http = require('http');
var url = require('url');

var responses_sent = 0;
var responses_recvd = 0;
var body0 = '';
var body1 = '';

var server = http.Server(function(req, res) {
  this.close();
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked'});
    res.write('some');
    res.write('chunked');
    res.write('data');
    res.end();
  });
  req.resume();
});
server.listen(0);

server.on('listening', function() {
  var agent = new http.Agent({ port: this.address().port, maxSockets: 1 });
  http.get({
    port: this.address().port,
    path: '/hello',
    headers: {'Accept': '*/*', 'Foo': 'bar'},
    agent: agent
  }, function(res) {
    assert.equal(200, res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function(chunk) { body0 += chunk; });
    res.on('end', function () {
      console.error('Got /hello response', body0);
    });
  });
});

process.on('exit', function() {
  assert.equal('somechunkeddata', body0);
});
