# HTTP Parser

## 0.5.1

Add TravisCI Nodejs 10 and 8.
Improved/fixed unit tests for running on Node.js 10.

## 0.4.4

Made 'maxHeaderSize' configurable.

```js
// Monkey patch before you require http for the first time.
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
require('http-parser-js').HTTPParser.maxHeaderSize = 1024 * 1024; // 1MB instead of 80kb

var http = require('http');
// ...
```
