## Tests that currently fail on Node v13.0.1:

['chunked with (arguably wrong) content length'](https://github.com/creationix/http-parser-js/blob/master/tests/iojs/test-http-parser-durability.js#L1279-L1318)
* Real case from proxy servers: Should ignore `content-length` if both it and `encoding: chunked` are specified

[parallel/test-http-client-max-header-size_increased](https://github.com/creationix/http-parser-js/tree/master/tests/parallel/test-http-client-max-header-size_increased)
* Test from actual user issue: Extra large headers (configurable max setable in `http-parser-js`)

[parallel/test-http-max-headers-count](https://github.com/creationix/http-parser-js/tree/master/tests/parallel/test-http-max-headers-count)
* Test from old Node version: Exceeding Node v12's new 8KB header size limit

['200 malformed header'](https://github.com/creationix/http-parser-js/blob/master/tests/iojs/test-http-parser-durability.js#L1249-L1278)
* Getting blank headers on malformed headers (probably fine, used to crash Node)


Whitespace/trimming differences (probably fine): all in https://github.com/creationix/http-parser-js/blob/master/tests/iojs/test-http-parser-durability.js
* 'line folding in header value with CRLF'
* 'line folding in header value with LF'
* 'multiple connection header values with folding and lws and CRLF'
* 'google 301'
