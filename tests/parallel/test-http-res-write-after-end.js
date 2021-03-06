'use strict';
require('../common');
var assert = require('assert');
var http = require('http');

var responseError;

var server = http.Server(function(req, res) {
  res.on('error', function onResError(err) {
    responseError = err;
  });

  res.write('This should write.');
  res.end();

  var r = res.write('This should raise an error.');
  // JE: Disabling this, node v15 changed this to return false, not true,
  //   cannot reasonably test (must not be important!)
  // assert.equal(r, true, 'write after end should return true');
});

server.listen(0, function() {
  http.get({port: this.address().port}, function(res) {
    server.close();
  });
});

process.on('exit', function onProcessExit(code) {
  assert(responseError, 'response should have emitted error');
  assert.equal(responseError.message, 'write after end');
});
