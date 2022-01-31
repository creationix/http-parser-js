/*
  The following is an example of how to use the parser as a standalone module.
  Both parseRequest and parseResponse can be used to parse a raw HTTP request/response from a Buffer.
*/

const { deepStrictEqual, throws } = require('assert');
// Replace the require when using the module from npm.
//const { HTTPParser } = require('http-parser-js');
const { HTTPParser } = require('./http-parser.js');

function parseRequest(input) {
  const parser = new HTTPParser(HTTPParser.REQUEST);
  let complete = false;
  let shouldKeepAlive;
  let upgrade;
  let method;
  let url;
  let versionMajor;
  let versionMinor;
  let headers = [];
  let trailers = [];
  let bodyChunks = [];

  parser[HTTPParser.kOnHeadersComplete] = function (req) {
    shouldKeepAlive = req.shouldKeepAlive;
    upgrade = req.upgrade;
    method = HTTPParser.methods[req.method];
    url = req.url;
    versionMajor = req.versionMajor;
    versionMinor = req.versionMinor;
    headers = req.headers;
  };

  parser[HTTPParser.kOnBody] = function (chunk, offset, length) {
    bodyChunks.push(chunk.slice(offset, offset + length));
  };

  // This is actually the event for trailers, go figure.
  parser[HTTPParser.kOnHeaders] = function (t) {
    trailers = t;
  };

  parser[HTTPParser.kOnMessageComplete] = function () {
    complete = true;
  };

  // Since we are sending the entire Buffer at once here all callbacks above happen synchronously.
  // The parser does not do _anything_ asynchronous.
  // However, you can of course call execute() multiple times with multiple chunks, e.g. from a stream.
  // But then you have to refactor the entire logic to be async (e.g. resolve a Promise in kOnMessageComplete and add timeout logic).
  parser.execute(input);
  parser.finish();

  if (!complete) {
    throw new Error('Could not parse request');
  }

  let body = Buffer.concat(bodyChunks);

  return {
    shouldKeepAlive,
    upgrade,
    method,
    url,
    versionMajor,
    versionMinor,
    headers,
    body,
    trailers,
  };
}

function parseResponse(input) {
  const parser = new HTTPParser(HTTPParser.RESPONSE);
  let complete = false;
  let shouldKeepAlive;
  let upgrade;
  let statusCode;
  let statusMessage;
  let versionMajor;
  let versionMinor;
  let headers = [];
  let trailers = [];
  let bodyChunks = [];

  parser[HTTPParser.kOnHeadersComplete] = function (res) {
    shouldKeepAlive = res.shouldKeepAlive;
    upgrade = res.upgrade;
    statusCode = res.statusCode;
    statusMessage = res.statusMessage;
    versionMajor = res.versionMajor;
    versionMinor = res.versionMinor;
    headers = res.headers;
  };

  parser[HTTPParser.kOnBody] = function (chunk, offset, length) {
    bodyChunks.push(chunk.slice(offset, offset + length));
  };

  // This is actually the event for trailers, go figure.
  parser[HTTPParser.kOnHeaders] = function (t) {
    trailers = t;
  };

  parser[HTTPParser.kOnMessageComplete] = function () {
    complete = true;
  };

  // Since we are sending the entire Buffer at once here all callbacks above happen synchronously.
  // The parser does not do _anything_ asynchronous.
  // However, you can of course call execute() multiple times with multiple chunks, e.g. from a stream.
  // But then you have to refactor the entire logic to be async (e.g. resolve a Promise in kOnMessageComplete and add timeout logic).
  parser.execute(input);
  parser.finish();

  if (!complete) {
    throw new Error('Could not parse');
  }

  let body = Buffer.concat(bodyChunks);

  return {
    shouldKeepAlive,
    upgrade,
    statusCode,
    statusMessage,
    versionMajor,
    versionMinor,
    headers,
    body,
    trailers,
  };
}

let parsed;

console.log('Example: basic GET request:');

parsed = parseRequest(
  Buffer.from(`GET / HTTP/1.1
Host: www.example.com

`)
);

console.log(parsed);

deepStrictEqual(parsed.shouldKeepAlive, true);
deepStrictEqual(parsed.upgrade, false);
deepStrictEqual(parsed.method, 'GET');
deepStrictEqual(parsed.url, '/');
deepStrictEqual(parsed.versionMajor, 1);
deepStrictEqual(parsed.versionMinor, 1);
deepStrictEqual(parsed.headers, ['Host', 'www.example.com']);
deepStrictEqual(parsed.body.toString(), '');
deepStrictEqual(parsed.trailers, []);

console.log('Example: POST request with body:');

parsed = parseRequest(
  Buffer.from(`POST /memes HTTP/1.1
Host: www.example.com
Content-Length: 7
Content-Type: text/plain

foo bar
`)
);

console.log(parsed);

deepStrictEqual(parsed.shouldKeepAlive, true);
deepStrictEqual(parsed.upgrade, false);
deepStrictEqual(parsed.method, 'POST');
deepStrictEqual(parsed.url, '/memes');
deepStrictEqual(parsed.versionMajor, 1);
deepStrictEqual(parsed.versionMinor, 1);
deepStrictEqual(parsed.headers, ['Host', 'www.example.com', 'Content-Length', '7', 'Content-Type', 'text/plain']);
deepStrictEqual(parsed.body.toString(), 'foo bar');
deepStrictEqual(parsed.trailers, []);

console.log('Example: basic HTML response');

parsed = parseResponse(
  Buffer.from(`HTTP/1.1 404 Not Found
Content-Type: text/html
Content-Length: 33

<strong>Computer says no</strong>
`)
);

console.log(parsed);

deepStrictEqual(parsed.shouldKeepAlive, true);
deepStrictEqual(parsed.upgrade, false);
deepStrictEqual(parsed.statusCode, 404);
deepStrictEqual(parsed.statusMessage, 'Not Found');
deepStrictEqual(parsed.versionMajor, 1);
deepStrictEqual(parsed.versionMinor, 1);
deepStrictEqual(parsed.headers, ['Content-Type', 'text/html', 'Content-Length', '33']);
deepStrictEqual(parsed.body.toString(), '<strong>Computer says no</strong>');
deepStrictEqual(parsed.trailers, []);

console.log('Example: chunked response with trailers');

parsed = parseResponse(
  Buffer.from(`HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked
Trailer: Expires

7
Mozilla
9
Developer
7
Network
0
Expires: Wed, 21 Oct 2015 07:28:00 GMT

`)
);

console.log(parsed);

deepStrictEqual(parsed.shouldKeepAlive, true);
deepStrictEqual(parsed.upgrade, false);
deepStrictEqual(parsed.statusCode, 200);
deepStrictEqual(parsed.statusMessage, 'OK');
deepStrictEqual(parsed.versionMajor, 1);
deepStrictEqual(parsed.versionMinor, 1);
deepStrictEqual(parsed.headers, ['Content-Type', 'text/plain', 'Transfer-Encoding', 'chunked', 'Trailer', 'Expires']);
deepStrictEqual(parsed.body.toString(), 'MozillaDeveloperNetwork');
deepStrictEqual(parsed.trailers, ['Expires', 'Wed, 21 Oct 2015 07:28:00 GMT']);

throws(function () {
  parseResponse(
    Buffer.from(`HTTP/1.1 200 OK
Content-Length: 1

`)
  );
});
