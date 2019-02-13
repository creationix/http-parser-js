'use strict';
require('../common');
var assert = require('assert');
var http = require('http');

var server = http.Server(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello world\n');
});
server.listen(0, function() {
  var req = http.get({port: this.address().port}, function(res) {
    res.on('end', function() {
    	if (parseInt(process.versions.node) < 10) {
    		assert.ok(!req.end());
    	} else {
    		assert.equal(req.end(), req);
    	}
      server.close();
    });
    res.resume();
  });
});

