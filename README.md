# HTTP Parser

This library parses HTTP protocol for requests and responses.  It was created to replace `http_parser.c` since calling C++ function from JS is really slow in V8.

This is packaged as a standalone npm module.  To use in node, monkeypatch HTTPParser.

```js
// Monkey patch before you require http for the first time.
process.binding("http_parser").HTTPParser = require('http-parser-js').HTTPParser;

var http = require('http');
// ...
```

## Status

This is still in early development.  It can respond to basic HTTP GET requests like the standard HTTP hello-world.  In initial testing it's 8% faster for non-keepalive requests.

The plan is to port the unit tests from the http-parser.  Once we have all tests passing the node http tests can be run using the monkey-patch method above.  Once all those pass, we're good to go.  Hopefully this will still be faster by then.
