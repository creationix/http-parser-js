'use strict';

const common = require('../common');
const http = require('http');
const assert = require('assert');
const net = require("net");
process.binding('http_parser').HTTPParser.encoding = 'binary';

const server = http.createServer(common.mustCall((req, res) => {
  assert.equal(Buffer.from(req.headers.test,'binary').toString('utf8'), "😀"); 
  res.end('ok');
  server.close();
}));
server.listen(0, () => {
  var socket = net.connect({ port: server.address().port });
  socket.end("GET / HTTP/1.1\r\nHost: some\r\nConnection: close\r\nTest: 😀\r\n\r\n");
});
