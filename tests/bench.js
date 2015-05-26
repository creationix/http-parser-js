//var HTTPParser = process.binding('http_parser').HTTPParser
var HTTPParser = require('../http-parser.js').HTTPParser;

var n = 40000;
var request = new Buffer([
  'GET /favicon.ico HTTP/1.1',
  'Host: 0.0.0.0=5000',
  'User-Agent: Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) '
    + 'Gecko/2008061015 Firefox/3.0',
  'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language: en-us,en;q=0.5',
  'Accept-Encoding: gzip,deflate',
  'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7',
  'Keep-Alive: 300',
  'Connection: keep-alive',
  '', ''
].join('\r\n'));
var response = new Buffer([
  'HTTP/1.1 301 Moved Permanently',
  'Location: http://www.google.com/',
  'Content-Type: text/html; charset=UTF-8',
  'Date: Sun, 26 Apr 2009 11:11:49 GMT',
  'Expires: Tue, 26 May 2009 11:11:49 GMT',
  'X-$PrototypeBI-Version: 1.6.0.3',
  'Cache-Control: public, max-age=2592000',
  'Server: gws',
  'Content-Length:  219  ',
  '',
  '<HTML><HEAD><meta http-equiv="content-type" content="text/html;'
    + 'charset=utf-8">\n<TITLE>301 Moved</TITLE></HEAD><BODY>\n<H1>301 '
    + 'Moved</H1>\nThe document has moved\n<A HREF="http://www.google.com/'
    + '">here</A>.\r\n</BODY></HTML>\r\n'
].join('\r\n'));


var noop = function () {};
var res = [];
setInterval(function () {
  var before = Date.now();
  
  for (var parser, i = 0; i < n; i++) {
    parser = new HTTPParser(HTTPParser.REQUEST);
    parser[0] = parser[1] = parser[2] = parser[3] = noop;
    parser.execute(request);
    parser.finish();
    parser.close();
    
    parser = new HTTPParser(HTTPParser.RESPONSE);
    parser[0] = parser[1] = parser[2] = parser[3] = noop;
    parser.execute(response);
    parser.finish();
    parser.close();
  }
  
  var now = Date.now();
  var delta = now - before;
  var rps = Math.round(n / delta * 1000);
  res.push(rps);
  res.sort(function(a, b) { return a - b; });
  var median = res[res.length >> 1];
  console.log('median: %s req/second   (now: %s req/second (%s reqs in %s ms))', median, rps, n, delta);
}, 200);
