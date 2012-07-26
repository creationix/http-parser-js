/* * R E Q U E S T S * */
exports.requests = {
  CURL_GET: {
    name: "curl get",
    type: "REQUEST",
    raw: "GET /test HTTP/1.1\r\n" +
         "User-Agent: curl/7.18.0 (i486-pc-linux-gnu) libcurl/7.18.0 OpenSSL/0.9.8g zlib/1.2.3.3 libidn/1.1\r\n" +
         "Host: 0.0.0.0=5000\r\n" +
         "Accept: */*\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/test",
    headers: [
      [ "User-Agent", "curl/7.18.0 (i486-pc-linux-gnu) libcurl/7.18.0 OpenSSL/0.9.8g zlib/1.2.3.3 libidn/1.1" ],
      [ "Host", "0.0.0.0=5000" ],
      [ "Accept", "*/*" ]
    ],
    body: ""
  },

  FIREFOX_GET: {
    name: "firefox get",
    type: "REQUEST",
    raw: "GET /favicon.ico HTTP/1.1\r\n" +
         "Host: 0.0.0.0=5000\r\n" +
         "User-Agent: Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008061015 Firefox/3.0\r\n" +
         "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n" +
         "Accept-Language: en-us,en;q=0.5\r\n" +
         "Accept-Encoding: gzip,deflate\r\n" +
         "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7\r\n" +
         "Keep-Alive: 300\r\n" +
         "Connection: keep-alive\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEor: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/favicon.ico",
    headers: [
      [ "Host", "0.0.0.0=5000" ],
      [ "User-Agent", "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008061015 Firefox/3.0" ],
      [ "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" ],
      [ "Accept-Language", "en-us,en;q=0.5" ],
      [ "Accept-Encoding", "gzip,deflate" ],
      [ "Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7" ],
      [ "Keep-Alive", "300" ],
      [ "Connection", "keep-alive" ]
    ],
    body: ""
  },

  DUMMY: {
    name: "dummy",
    type: "REQUEST",
    raw: "GET /dummy HTTP/1.1\r\n" +
         "aaaaaaaaaaaaa:++++++++++\r\n" +
         "\r\n",
    should_keep_alive: true,
    message_complete_on_eof: false,
    http_major: 1,
    http_minor: 1,
    method: "GET",
    request_url: "/dummy",
    headers: [
      [ "aaaaaaaaaaaaa", "++++++++++" ]
    ],
    body: ""
  },

  FRAGMENT_IN_URI: {
    name: "fragment in url",
    type: "REQUEST",
    raw: "GET /forums/1/topics/2375?page=1#posts-17408 HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
  /* XXX request url does include fragment? */
    requestUrl: "/forums/1/topics/2375?page=1#posts-17408",
    headers: [],
    body: ""
  },

  GET_NO_HEADERS_NO_BODY: {
    name: "get no headers no body",
    type: "REQUEST",
    raw: "GET /get_no_headers_no_body/world HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false, /* would need Connection: close */
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/get_no_headers_no_body/world",
    headers: [],
    body: ""
  },

  GET_ONE_HEADER_NO_BODY: {
    name: "get one header no body",
    type: "REQUEST",
    raw: "GET /get_one_header_no_body HTTP/1.1\r\n" +
         "Accept: */*\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false, /* would need Connection: close */
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/get_one_header_no_body",
    headers: [
      [ "Accept" , "*/*" ]
    ],
    body: ""
  },

  GET_FUNKY_CONTENT_LENGTH: {
    name: "get funky content length body hello",
    type: "REQUEST",
    raw: "GET /get_funky_content_length_body_hello HTTP/1.0\r\n" +
         "conTENT-Length: 5\r\n" +
         "\r\n" +
         "HELLO",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 0,
    method: "GET",
    requestUrl: "/get_funky_content_length_body_hello",
    headers: [
      [ "conTENT-Length" , "5" ]
    ],
    body: "HELLO"
  },

  POST_IDENTITY_BODY_WORLD: {
    name: "post identity body world",
    type: "REQUEST",
    raw: "POST /post_identity_body_world?q=search#hey HTTP/1.1\r\n" +
         "Accept: */*\r\n" +
         "Transfer-Encoding: identity\r\n" +
         "Content-Length: 5\r\n" +
         "\r\n" +
         "World",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "POST",
    requestUrl: "/post_identity_body_world?q=search#hey",
    headers: [
      [ "Accept", "*/*" ],
      [ "Transfer-Encoding", "identity" ],
      [ "Content-Length", "5" ]
    ],
    body: "World"
  },

  POST_CHUNKED_ALL_YOUR_BASE: {
    name: "post - chunked body: all your base are belong to us",
    type: "REQUEST",
    raw: "POST /post_chunked_all_your_base HTTP/1.1\r\n" +
         "Transfer-Encoding: chunked\r\n" +
         "\r\n" +
         "1e\r\nall your base are belong to us\r\n" +
         "0\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "POST",
    requestUrl: "/post_chunked_all_your_base",
    headers: [
      [ "Transfer-Encoding" , "chunked" ]
    ],
    body: "all your base are belong to us"
  },

  TWO_CHUNKS_MULT_ZERO_END: {
    name: "two chunks ; triple zero ending",
    type: "REQUEST",
    raw: "POST /two_chunks_mult_zero_end HTTP/1.1\r\n" +
         "Transfer-Encoding: chunked\r\n" +
         "\r\n" +
         "5\r\nhello\r\n" +
         "6\r\n world\r\n" +
         "000\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "POST",
    requestUrl: "/two_chunks_mult_zero_end",
    headers: [
      [ "Transfer-Encoding", "chunked" ]
    ],
    body: "hello world"
  },

  CHUNKED_W_TRAILING_HEADERS: {
    name: "chunked with trailing headers. blech.",
    type: "REQUEST",
    raw: "POST /chunked_w_trailing_headers HTTP/1.1\r\n" +
         "Transfer-Encoding: chunked\r\n" +
         "\r\n" +
         "5\r\nhello\r\n" +
         "6\r\n world\r\n" +
         "0\r\n" +
         "Vary: *\r\n" +
         "Content-Type: text/plain\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "POST",
    requestUrl: "/chunked_w_trailing_headers",
    headers: [
      [ "Transfer-Encoding",  "chunked" ],
      [ "Vary", "*" ],
      [ "Content-Type", "text/plain" ]
    ],
    body: "hello world"
  },

  CHUNKED_W_STUFF_AFTER_LENGTH: {
    name: "with stuff after the length",
    type: "REQUEST",
    raw: "POST /chunked_w_stuff_after_length HTTP/1.1\r\n" +
         "Transfer-Encoding: chunked\r\n" +
         "\r\n" +
         "5; ihatew3;whatthe=aretheseparametersfor\r\nhello\r\n" +
         "6; blahblah; blah\r\n world\r\n" +
         "0\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "POST",
    requestUrl: "/chunked_w_stuff_after_length",
    headers: [
      [ "Transfer-Encoding", "chunked" ]
    ],
    body: "hello world"
  },

  WITH_QUOTES: {
    name: "with quotes",
    type: "REQUEST",
    raw: "GET /with_\"stupid\"_quotes?foo=\"bar\" HTTP/1.1\r\n\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/with_\"stupid\"_quotes?foo=\"bar\"",
    headers: [ ],
    body: ""
  },

  APACHEBENCH_GET: {
/* The server receiving this request SHOULD NOT wait for EOF
 * to know that content-length == 0.
 * How to represent this in a unit test? message_complete_on_eof
 * Compare with NO_CONTENT_LENGTH_RESPONSE.
 */
    name: "apachebench get",
    type: "REQUEST",
    raw: "GET /test HTTP/1.0\r\n" +
         "Host: 0.0.0.0:5000\r\n" +
         "User-Agent: ApacheBench/2.3\r\n" +
         "Accept: */*\r\n\r\n",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 0,
    method: "GET",
    requestUrl: "/test",
    headers: [
      [ "Host", "0.0.0.0:5000" ],
      [ "User-Agent", "ApacheBench/2.3" ],
      [ "Accept", "*/*" ]
    ],
    body: ""
  },

  QUERY_URL_WITH_QUESTION_MARK_GET: {
/* Some clients include '?' characters in query strings.
 */
    name: "query url with question mark",
    type: "REQUEST",
    raw: "GET /test.cgi?foo=bar?baz HTTP/1.1\r\n\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/test.cgi?foo=bar?baz",
    headers: [ ],
    body: ""
  },

  PREFIX_NEWLINE_GET: {
/* Some clients, especially after a POST in a keep-alive connection,
 * will send an extra CRLF before the next request
 */
    name: "newline prefix get",
    type: "REQUEST",
    raw: "\r\nGET /test HTTP/1.1\r\n\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/test",
    headers: [ ],
    body: ""
  },

  UPGRADE_REQUEST: {
    name: "upgrade request",
    type: "REQUEST",
    raw: "GET /demo HTTP/1.1\r\n" +
         "Host: example.com\r\n" +
         "Connection: Upgrade\r\n" +
         "Sec-WebSocket-Key2: 12998 5 Y3 1  .P00\r\n" +
         "Sec-WebSocket-Protocol: sample\r\n" +
         "Upgrade: WebSocket\r\n" +
         "Sec-WebSocket-Key1: 4 @1  46546xW%0l 1 5\r\n" +
         "Origin: http://example.com\r\n" +
         "\r\n" +
         "Hot diggity dogg",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/demo",
    upgrade:"Hot diggity dogg",
    headers: [
      [ "Host", "example.com" ],
      [ "Connection", "Upgrade" ],
      [ "Sec-WebSocket-Key2", "12998 5 Y3 1  .P00" ],
      [ "Sec-WebSocket-Protocol", "sample" ],
      [ "Upgrade", "WebSocket" ],
      [ "Sec-WebSocket-Key1", "4 @1  46546xW%0l 1 5" ],
      [ "Origin", "http://example.com" ]
    ],
    body: ""
  },

  CONNECT_REQUEST: {
    name: "connect request",
    type: "REQUEST",
    raw: "CONNECT 0-home0.netscape.com:443 HTTP/1.0\r\n" +
         "User-agent: Mozilla/1.1N\r\n" +
         "Proxy-authorization: basic aGVsbG86d29ybGQ=\r\n" +
         "\r\n" +
         "some data\r\n" +
         "and yet even more data",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 0,
    method: "CONNECT",
    requestUrl: "0-home0.netscape.com:443",
    upgrade:"some data\r\nand yet even more data",
    headers: [
      [ "User-agent", "Mozilla/1.1N" ],
      [ "Proxy-authorization", "basic aGVsbG86d29ybGQ=" ]
    ],
    body: ""
  },

  REPORT_REQ: {
    name: "report request",
    type: "REQUEST",
    raw: "REPORT /test HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "REPORT",
    requestUrl: "/test",
    headers: [ ],
    body: ""
  },

  NO_HTTP_VERSION: {
    name: "request with no http version",
    type: "REQUEST",
    raw: "GET /\r\n" +
         "\r\n",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 0,
    httpMinor: 9,
    method: "GET",
    requestUrl: "/",
    headers: [ ],
    body: ""
  },

  MSEARCH_REQ: {
    name: "m-search request",
    type: "REQUEST",
    raw: "M-SEARCH * HTTP/1.1\r\n" +
         "HOST: 239.255.255.250:1900\r\n" +
         "MAN: \"ssdp:discover\"\r\n" +
         "ST: \"ssdp:all\"\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "MSEARCH",
    requestUrl: "*",
    headers: [
      [ "HOST", "239.255.255.250:1900" ],
      [ "MAN", "\"ssdp:discover\"" ],
      [ "ST", "\"ssdp:all\"" ]
    ],
    body: ""
  },

  LINE_FOLDING_IN_HEADER: {
    name: "line folding in header value",
    type: "REQUEST",
    raw: "GET / HTTP/1.1\r\n" +
         "Line1:   abc\r\n" +
         "\tdef\r\n" +
         " ghi\r\n" +
         "\t\tjkl\r\n" +
         "  mno \r\n" +
         "\t \tqrs\r\n" +
         "Line2: \t line2\t\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/",
    headers: [
      [ "Line1", "abcdefghijklmno qrs" ],
      [ "Line2", "line2\t" ]
    ],
    body: ""
  },


  QUERY_TERMINATED_HOST: {
    name: "host terminated by a query string",
    type: "REQUEST",
    raw: "GET http://hypnotoad.org?hail=all HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "http://hypnotoad.org?hail=all",
    headers: [ ],
    body: ""
  },

  QUERY_TERMINATED_HOSTPORT: {
    name: "host:port terminated by a query string",
    type: "REQUEST",
    raw: "GET http://hypnotoad.org:1234?hail=all HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "http://hypnotoad.org:1234?hail=all",
    headers: [ ],
    body: ""
  },

  SPACE_TERMINATED_HOSTPORT: {
    name: "host:port terminated by a space",
    type: "REQUEST",
    raw: "GET http://hypnotoad.org:1234 HTTP/1.1\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "http://hypnotoad.org:1234",
    headers: [ ],
    body: ""
  },

  UTF8_PATH_REQ: {
    name: "utf-8 path request",
    type: "REQUEST",
    raw: "GET /δ¶/δt/pope?q=1#narf HTTP/1.1\r\n" +
         "Host: github.com\r\n" +
         "\r\n",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "GET",
    requestUrl: "/δ¶/δt/pope?q=1#narf",
    headers: [
      [ "Host", "github.com" ]
    ],
    body: ""
  },

  HOSTNAME_UNDERSCORE: {
    name: "hostname underscore",
    type: "REQUEST",
    raw: "CONNECT home_0.netscape.com:443 HTTP/1.0\r\n" +
         "User-agent: Mozilla/1.1N\r\n" +
         "Proxy-authorization: basic aGVsbG86d29ybGQ=\r\n" +
         "\r\n",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 0,
    method: "CONNECT",
    requestUrl: "home_0.netscape.com:443",
    upgrade: "",
    headers: [
      [ "User-agent", "Mozilla/1.1N" ],
      [ "Proxy-authorization", "basic aGVsbG86d29ybGQ=" ]
    ],
    body: ""
  },

  PATCH_REQ: {
    name: "PATCH request",
    type: "REQUEST",
    raw: "PATCH /file.txt HTTP/1.1\r\n" +
         "Host: www.example.com\r\n" +
         "Content-Type: application/example\r\n" +
         "If-Match: \"e0023aa4e\"\r\n" +
         "Content-Length: 10\r\n" +
         "\r\n" +
         "cccccccccc",
    shouldKeepAlive: true,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 1,
    method: "PATCH",
    requestUrl: "/file.txt",
    headers: [
      [ "Host", "www.example.com" ],
      [ "Content-Type", "application/example" ],
      [ "If-Match", "\"e0023aa4e\"" ],
      [ "Content-Length", "10" ]
    ],
    body: "cccccccccc"
  },

  CONNECT_CAPS_REQUEST: {
    name: "connect caps request",
    type: "REQUEST",
    raw: "CONNECT HOME0.NETSCAPE.COM:443 HTTP/1.0\r\n" +
         "User-agent: Mozilla/1.1N\r\n" +
         "Proxy-authorization: basic aGVsbG86d29ybGQ=\r\n" +
         "\r\n",
    shouldKeepAlive: false,
    messageCompleteOnEof: false,
    httpMajor: 1,
    httpMinor: 0,
    method: "CONNECT",
    requestUrl: "HOME0.NETSCAPE.COM:443",
    upgrade: "",
    headers: [
      [ "User-agent", "Mozilla/1.1N" ],
      [ "Proxy-authorization", "basic aGVsbG86d29ybGQ=" ]
    ],
    body: ""
  }

};

// /* * R E S P O N S E S * */
// const struct message responses[] =
// #define GOOGLE_301 0
// { {.name= "google 301"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 301 Moved Permanently\r\n"
//          "Location: http://www.google.com/\r\n"
//          "Content-Type: text/html; charset=UTF-8\r\n"
//          "Date: Sun, 26 Apr 2009 11:11:49 GMT\r\n"
//          "Expires: Tue, 26 May 2009 11:11:49 GMT\r\n"
//          "X-$PrototypeBI-Version: 1.6.0.3\r\n" /* $ char in header field */
//          "Cache-Control: public, max-age=2592000\r\n"
//          "Server: gws\r\n"
//          "Content-Length:  219  \r\n"
//          "\r\n"
//          "<HTML><HEAD><meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">\n"
//          "<TITLE>301 Moved</TITLE></HEAD><BODY>\n"
//          "<H1>301 Moved</H1>\n"
//          "The document has moved\n"
//          "<A HREF=\"http://www.google.com/\">here</A>.\r\n"
//          "</BODY></HTML>\r\n"
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 301

//     headers:
//     { { "Location", "http://www.google.com/" }
//     , { "Content-Type", "text/html; charset=UTF-8" }
//     , { "Date", "Sun, 26 Apr 2009 11:11:49 GMT" }
//     , { "Expires", "Tue, 26 May 2009 11:11:49 GMT" }
//     , { "X-$PrototypeBI-Version", "1.6.0.3" }
//     , { "Cache-Control", "public, max-age=2592000" }
//     , { "Server", "gws" }
//     , { "Content-Length", "219  " }
//     }
//     body: "<HTML><HEAD><meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">\n"
//           "<TITLE>301 Moved</TITLE></HEAD><BODY>\n"
//           "<H1>301 Moved</H1>\n"
//           "The document has moved\n"
//           "<A HREF=\"http://www.google.com/\">here</A>.\r\n"
//           "</BODY></HTML>\r\n"
//   }

//   NO_CONTENT_LENGTH_RESPONSE: {
// /* The client should wait for the server's EOF. That is, when content-length
//  * is not specified, and "Connection: close", the end of body is specified
//  * by the EOF.
//  * Compare with APACHEBENCH_GET
//  */
//     name: "no content-length response"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Date: Tue, 04 Aug 2009 07:59:32 GMT\r\n"
//          "Server: Apache\r\n"
//          "X-Powered-By: Servlet/2.5 JSP/2.1\r\n"
//          "Content-Type: text/xml; charset=utf-8\r\n"
//          "Connection: close\r\n"
//          "\r\n"
//          "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
//          "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\n"
//          "  <SOAP-ENV:Body>\n"
//          "    <SOAP-ENV:Fault>\n"
//          "       <faultcode>SOAP-ENV:Client</faultcode>\n"
//          "       <faultstring>Client Error</faultstring>\n"
//          "    </SOAP-ENV:Fault>\n"
//          "  </SOAP-ENV:Body>\n"
//          "</SOAP-ENV:Envelope>"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: true,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 200

//     headers:
//     { { "Date", "Tue, 04 Aug 2009 07:59:32 GMT" }
//     , { "Server", "Apache" }
//     , { "X-Powered-By", "Servlet/2.5 JSP/2.1" }
//     , { "Content-Type", "text/xml; charset=utf-8" }
//     , { "Connection", "close" }
//     }
//     body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
//           "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\n"
//           "  <SOAP-ENV:Body>\n"
//           "    <SOAP-ENV:Fault>\n"
//           "       <faultcode>SOAP-ENV:Client</faultcode>\n"
//           "       <faultstring>Client Error</faultstring>\n"
//           "    </SOAP-ENV:Fault>\n"
//           "  </SOAP-ENV:Body>\n"
//           "</SOAP-ENV:Envelope>"
//   }

// #define NO_HEADERS_NO_BODY_404 2
//     name: "404 no headers no body"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 404 Not Found\r\n\r\n"
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 404

//     headers: {}
//   ,.body_size= 0
//     body: ""
//   }

//   NO_REASON_PHRASE: {
//     name: "301 no response phrase"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 301\r\n\r\n"
//   ,.should_keep_alive = TRUE
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 301

//     headers: {}
//     body: ""
//   }

//   TRAILING_SPACE_ON_CHUNKED_BODY: {
//     name:"200 trailing space on chunked body"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Content-Type: text/plain\r\n"
//          "Transfer-Encoding: chunked\r\n"
//          "\r\n"
//          "25  \r\n"
//          "This is the data in the first chunk\r\n"
//          "\r\n"
//          "1C\r\n"
//          "and this is the second one\r\n"
//          "\r\n"
//          "0  \r\n"
//          "\r\n"
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 200

//     headers:
//     { {"Content-Type", "text/plain" }
//     , {"Transfer-Encoding", "chunked" }
//     }
//   ,.body_size = 37+28
//   ,.body =
//          "This is the data in the first chunk\r\n"
//          "and this is the second one\r\n"

//   }

//   NO_CARRIAGE_RET: {
//     name:"no carriage ret"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\n"
//          "Content-Type: text/html; charset=utf-8\n"
//          "Connection: close\n"
//          "\n"
//          "these headers are from http://news.ycombinator.com/"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: true,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 200

//     headers:
//     { {"Content-Type", "text/html; charset=utf-8" }
//     , {"Connection", "close" }
//     }
//     body: "these headers are from http://news.ycombinator.com/"
//   }

//   PROXY_CONNECTION: {
//     name:"proxy connection"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Content-Type: text/html; charset=UTF-8\r\n"
//          "Content-Length: 11\r\n"
//          "Proxy-Connection: close\r\n"
//          "Date: Thu, 31 Dec 2009 20:55:48 +0000\r\n"
//          "\r\n"
//          "hello world"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 200

//     headers:
//     { {"Content-Type", "text/html; charset=UTF-8" }
//     , {"Content-Length", "11" }
//     , {"Proxy-Connection", "close" }
//     , {"Date", "Thu, 31 Dec 2009 20:55:48 +0000"}
//     }
//     body: "hello world"
//   }

//   UNDERSTORE_HEADER_KEY: {
//   // shown by
//   // curl -o /dev/null -v "http://ad.doubleclick.net/pfadx/DARTSHELLCONFIGXML;dcmt=text/xml;"
//     name:"underscore header key"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Server: DCLK-AdSvr\r\n"
//          "Content-Type: text/xml\r\n"
//          "Content-Length: 0\r\n"
//          "DCLK_imp: v7;x;114750856;0-0;0;17820020;0/0;21603567/21621457/1;;~okv=;dcmt=text/xml;;~cs=o\r\n\r\n"
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 200

//     headers:
//     { {"Server", "DCLK-AdSvr" }
//     , {"Content-Type", "text/xml" }
//     , {"Content-Length", "0" }
//     , {"DCLK_imp", "v7;x;114750856;0-0;0;17820020;0/0;21603567/21621457/1;;~okv=;dcmt=text/xml;;~cs=o" }
//     }
//     body: ""
//   }

//   BONJOUR_MADAME_FR: {
// /* The client should not merge two headers fields when the first one doesn't
//  * have a value.
//  */
//     name: "bonjourmadame.fr"
//     type: "RESPONSE",
//     raw: "HTTP/1.0 301 Moved Permanently\r\n"
//          "Date: Thu, 03 Jun 2010 09:56:32 GMT\r\n"
//          "Server: Apache/2.2.3 (Red Hat)\r\n"
//          "Cache-Control: public\r\n"
//          "Pragma: \r\n"
//          "Location: http://www.bonjourmadame.fr/\r\n"
//          "Vary: Accept-Encoding\r\n"
//          "Content-Length: 0\r\n"
//          "Content-Type: text/html; charset=UTF-8\r\n"
//          "Connection: keep-alive\r\n"
//          "\r\n"
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 0
//     statusCode: 301

//     headers:
//     { { "Date", "Thu, 03 Jun 2010 09:56:32 GMT" }
//     , { "Server", "Apache/2.2.3 (Red Hat)" }
//     , { "Cache-Control", "public" }
//     , { "Pragma", "" }
//     , { "Location", "http://www.bonjourmadame.fr/" }
//     , { "Vary",  "Accept-Encoding" }
//     , { "Content-Length", "0" }
//     , { "Content-Type", "text/html; charset=UTF-8" }
//     , { "Connection", "keep-alive" }
//     }
//     body: ""
//   }

//   SPACE_IN_FIELD_RES: {
// /* Should handle spaces in header fields */
//     name: "field space"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Server: Microsoft-IIS/6.0\r\n"
//          "X-Powered-By: ASP.NET\r\n"
//          "en-US Content-Type: text/xml\r\n" /* this is the problem */
//          "Content-Type: text/xml\r\n"
//          "Content-Length: 16\r\n"
//          "Date: Fri, 23 Jul 2010 18:45:38 GMT\r\n"
//          "Connection: keep-alive\r\n"
//          "\r\n"
//          "<xml>hello</xml>" /* fake body */
//     shouldKeepAlive: true,
//     messageCompleteOnEof: false,
//     httpMajor: 1,
//     httpMajor: 1,
//     statusCode: 200
//     headers:
//     { { "Server",  "Microsoft-IIS/6.0" }
//     , { "X-Powered-By", "ASP.NET" }
//     , { "en-US Content-Type", "text/xml" }
//     , { "Content-Type", "text/xml" }
//     , { "Content-Length", "16" }
//     , { "Date", "Fri, 23 Jul 2010 18:45:38 GMT" }
//     , { "Connection", "keep-alive" }
//     }
//     body: "<xml>hello</xml>"
//   }


//   RES_FIELD_UNDERSCORE: {
// /* Should handle spaces in header fields */
//     name: "field underscore"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 200 OK\r\n"
//          "Date: Tue, 28 Sep 2010 01:14:13 GMT\r\n"
//          "Server: Apache\r\n"
//          "Cache-Control: no-cache, must-revalidate\r\n"
//          "Expires: Mon, 26 Jul 1997 05:00:00 GMT\r\n"
//          ".et-Cookie: PlaxoCS=1274804622353690521; path=/; domain=.plaxo.com\r\n"
//          "Vary: Accept-Encoding\r\n"
//          "_eep-Alive: timeout=45\r\n" /* semantic value ignored */
//          "_onnection: Keep-Alive\r\n" /* semantic value ignored */
//          "Transfer-Encoding: chunked\r\n"
//          "Content-Type: text/html\r\n"
//          "Connection: close\r\n"
//          "\r\n"
//          "0\r\n\r\n"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: false,
//     httpMajor: 1,
//     httpMajor: 1,
//     statusCode: 200,

//     headers: [
//       [ "Date", "Tue, 28 Sep 2010 01:14:13 GMT" ],
//       [ "Server", "Apache" ],
//       [ "Cache-Control", "no-cache, must-revalidate" ],
//       [ "Expires", "Mon, 26 Jul 1997 05:00:00 GMT" ],
//       [ ".et-Cookie", "PlaxoCS=1274804622353690521; path=/; domain=.plaxo.com" ],
//       [ "Vary", "Accept-Encoding" ],
//       [ "_eep-Alive", "timeout=45" ],
//       [ "_onnection", "Keep-Alive" ],
//       [ "Transfer-Encoding", "chunked" ],
//       [ "Content-Type", "text/html" ],
//       [ "Connection", "close" ]
//     ],
//     body: ""
//   }

//   NON_ASCII_IN_STATUS_LINE: {
// /* Should handle non-ASCII in status line */
//     name: "non-ASCII in status line"
//     type: "RESPONSE",
//     raw: "HTTP/1.1 500 Oriëntatieprobleem\r\n"
//          "Date: Fri, 5 Nov 2010 23:07:12 GMT+2\r\n"
//          "Content-Length: 0\r\n"
//          "Connection: close\r\n"
//          "\r\n"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: false,
//     httpMajor: 1
//     httpMajor: 1
//     statusCode: 500

//     headers:
//     { { "Date", "Fri, 5 Nov 2010 23:07:12 GMT+2" }
//     , { "Content-Length", "0" }
//     , { "Connection", "close" }
//     }
//     body: ""
//   }

// #define HTTP_VERSION_0_9 12
// /* Should handle HTTP/0.9 */
//     name: "http version 0.9"
//     type: "RESPONSE",
//     raw: "HTTP/0.9 200 OK\r\n"
//          "\r\n"
//     shouldKeepAlive: false,
//     messageCompleteOnEof: true,
//     httpMajor: 0
//     httpMajor: 9
//     statusCode: 200

//     headers:
//     {}
//     body: ""
//   }
//     name: NULL } /* sentinel */

// };

// int
// request_url_cb (http_parser *p, const char *buf, size_t len)
// {
//   assert(p == parser);
//   strncat(messages[num_messages].request_url, buf, len);
//   return 0;
// }

// int
// header_field_cb (http_parser *p, const char *buf, size_t len)
// {
//   assert(p == parser);
//   struct message *m = &messages[num_messages];

//   if (m->last_header_element != FIELD)
//     m->num_headers++;

//   strncat(m->headers[m->num_headers-1][0], buf, len);

//   m->last_header_element = FIELD;

//   return 0;
// }

// int
// header_value_cb (http_parser *p, const char *buf, size_t len)
// {
//   assert(p == parser);
//   struct message *m = &messages[num_messages];

//   strncat(m->headers[m->num_headers-1][1], buf, len);

//   m->last_header_element = VALUE;

//   return 0;
// }

// int
// body_cb (http_parser *p, const char *buf, size_t len)
// {
//   assert(p == parser);
//   strncat(messages[num_messages].body, buf, len);
//   messages[num_messages].body_size += len;
//  // printf("body_cb: '%s'\n", requests[num_messages].body);
//   return 0;
// }

// int
// count_body_cb (http_parser *p, const char *buf, size_t len)
// {
//   assert(p == parser);
//   assert(buf);
//   messages[num_messages].body_size += len;
//   return 0;
// }

// int
// message_begin_cb (http_parser *p)
// {
//   assert(p == parser);
//   messages[num_messages].message_begin_cb_called = TRUE;
//   return 0;
// }

// int
// headers_complete_cb (http_parser *p)
// {
//   assert(p == parser);
//   messages[num_messages].method = parser->method;
//   messages[num_messages].status_code = parser->status_code;
//   messages[num_messages].http_major = parser->http_major;
//   messages[num_messages].http_minor = parser->http_minor;
//   messages[num_messages].headers_complete_cb_called = TRUE;
//   messages[num_messages].should_keep_alive = http_should_keep_alive(parser);
//   return 0;
// }

// int
// message_complete_cb (http_parser *p)
// {
//   assert(p == parser);
//   if (messages[num_messages].should_keep_alive != http_should_keep_alive(parser))
//   {
//     fprintf(stderr, "\n\n *** Error http_should_keep_alive() should have same "
//                     "value in both on_message_complete and on_headers_complete "
//                     "but it doesn't! ***\n\n");
//     assert(0);
//     exit(1);
//   }
//   messages[num_messages].message_complete_cb_called = TRUE;

//   messages[num_messages].message_complete_on_eof = currently_parsing_eof;

//   num_messages++;
//   return 0;
// }

// static http_parser_settings settings =
//   {.on_message_begin = message_begin_cb
//   ,.on_header_field = header_field_cb
//   ,.on_header_value = header_value_cb
//   ,.on_url = request_url_cb
//   ,.on_body = body_cb
//   ,.on_headers_complete = headers_complete_cb
//   ,.on_message_complete = message_complete_cb
//   };

// static http_parser_settings settings_count_body =
//   {.on_message_begin = message_begin_cb
//   ,.on_header_field = header_field_cb
//   ,.on_header_value = header_value_cb
//   ,.on_url = request_url_cb
//   ,.on_body = count_body_cb
//   ,.on_headers_complete = headers_complete_cb
//   ,.on_message_complete = message_complete_cb
//   };

// static http_parser_settings settings_null =
//   {.on_message_begin = 0
//   ,.on_header_field = 0
//   ,.on_header_value = 0
//   ,.on_url = 0
//   ,.on_body = 0
//   ,.on_headers_complete = 0
//   ,.on_message_complete = 0
//   };

// void
// parser_init (enum http_parser_type type)
// {
//   num_messages = 0;

//   assert(parser == NULL);

//   parser = malloc(sizeof(http_parser));

//   http_parser_init(parser, type);

//   memset(&messages, 0, sizeof messages);

// }

// void
// parser_free ()
// {
//   assert(parser);
//   free(parser);
//   parser = NULL;
// }

// size_t parse (const char *buf, size_t len)
// {
//   size_t nparsed;
//   currently_parsing_eof = (len == 0);
//   nparsed = http_parser_execute(parser, &settings, buf, len);
//   return nparsed;
// }

// size_t parse_count_body (const char *buf, size_t len)
// {
//   size_t nparsed;
//   currently_parsing_eof = (len == 0);
//   nparsed = http_parser_execute(parser, &settings_count_body, buf, len);
//   return nparsed;
// }

// static inline int
// check_str_eq (const struct message *m,
//               const char *prop,
//               const char *expected,
//               const char *found) {
//   if ((expected == NULL) != (found == NULL)) {
//     printf("\n*** Error: %s in '%s' ***\n\n", prop, m->name);
//     printf("expected %s\n", (expected == NULL) ? "NULL" : expected);
//     printf("   found %s\n", (found == NULL) ? "NULL" : found);
//     return 0;
//   }
//   if (expected != NULL && 0 != strcmp(expected, found)) {
//     printf("\n*** Error: %s in '%s' ***\n\n", prop, m->name);
//     printf("expected '%s'\n", expected);
//     printf("   found '%s'\n", found);
//     return 0;
//   }
//   return 1;
// }

// static inline int
// check_num_eq (const struct message *m,
//               const char *prop,
//               int expected,
//               int found) {
//   if (expected != found) {
//     printf("\n*** Error: %s in '%s' ***\n\n", prop, m->name);
//     printf("expected %d\n", expected);
//     printf("   found %d\n", found);
//     return 0;
//   }
//   return 1;
// }

// #define MESSAGE_CHECK_STR_EQ(expected, found, prop) \
//   if (!check_str_eq(expected, #prop, expected->prop, found->prop)) return 0

// #define MESSAGE_CHECK_NUM_EQ(expected, found, prop) \
//   if (!check_num_eq(expected, #prop, expected->prop, found->prop)) return 0


// int
// message_eq (int index, const struct message *expected)
// {
//   int i;
//   struct message *m = &messages[index];

//   MESSAGE_CHECK_NUM_EQ(expected, m, http_major);
//   MESSAGE_CHECK_NUM_EQ(expected, m, http_minor);

//   if (expected->type == HTTP_REQUEST) {
//     MESSAGE_CHECK_NUM_EQ(expected, m, method);
//   } else {
//     MESSAGE_CHECK_NUM_EQ(expected, m, status_code);
//   }

//   MESSAGE_CHECK_NUM_EQ(expected, m, should_keep_alive);
//   MESSAGE_CHECK_NUM_EQ(expected, m, message_complete_on_eof);

//   assert(m->message_begin_cb_called);
//   assert(m->headers_complete_cb_called);
//   assert(m->message_complete_cb_called);


//   MESSAGE_CHECK_STR_EQ(expected, m, request_url);
//   if (expected->body_size) {
//     MESSAGE_CHECK_NUM_EQ(expected, m, body_size);
//   } else {
//     MESSAGE_CHECK_STR_EQ(expected, m, body);
//   }

//   MESSAGE_CHECK_NUM_EQ(expected, m, num_headers);

//   int r;
//   for (i = 0; i < m->num_headers; i++) {
//     r = check_str_eq(expected, "header field", expected->headers[i][0], m->headers[i][0]);
//     if (!r) return 0;
//     r = check_str_eq(expected, "header value", expected->headers[i][1], m->headers[i][1]);
//     if (!r) return 0;
//   }

//   MESSAGE_CHECK_STR_EQ(expected, m, upgrade);

//   return 1;
// }

// /* Given a sequence of varargs messages, return the number of them that the
//  * parser should successfully parse, taking into account that upgraded
//  * messages prevent all subsequent messages from being parsed.
//  */
// size_t
// count_parsed_messages(const size_t nmsgs, ...) {
//   size_t i;
//   va_list ap;

//   va_start(ap, nmsgs);

//   for (i = 0; i < nmsgs; i++) {
//     struct message *m = va_arg(ap, struct message *);

//     if (m->upgrade) {
//       va_end(ap);
//       return i + 1;
//     }
//   }

//   va_end(ap);
//   return nmsgs;
// }

// /* Given a sequence of bytes and the number of these that we were able to
//  * parse, verify that upgrade bodies are correct.
//  */
// void
// upgrade_message_fix(char *body, const size_t nread, const size_t nmsgs, ...) {
//   va_list ap;
//   size_t i;
//   size_t off = 0;
 
//   va_start(ap, nmsgs);

//   for (i = 0; i < nmsgs; i++) {
//     struct message *m = va_arg(ap, struct message *);

//     off += strlen(m->raw);

//     if (m->upgrade) {
//       off -= strlen(m->upgrade);

//       /* Check the portion of the response after its specified upgrade */
//       if (!check_str_eq(m, "upgrade", body + off, body + nread)) {
//         exit(1);
//       }

//       /* Fix up the response so that message_eq() will verify the beginning
//        * of the upgrade */
//       *(body + nread + strlen(m->upgrade)) = '\0';
//       messages[num_messages -1 ].upgrade = body + nread;

//       va_end(ap);
//       return;
//     }
//   }

//   va_end(ap);
//   printf("\n\n*** Error: expected a message with upgrade ***\n");

//   exit(1);
// }

// static void
// print_error (const char *raw, size_t error_location)
// {
//   fprintf(stderr, "\n*** %s:%d -- %s ***\n\n",
//           "http_parser.c", HTTP_PARSER_ERRNO_LINE(parser),
//           http_errno_description(HTTP_PARSER_ERRNO(parser)));

//   int this_line = 0, char_len = 0;
//   size_t i, j, len = strlen(raw), error_location_line = 0;
//   for (i = 0; i < len; i++) {
//     if (i == error_location) this_line = 1;
//     switch (raw[i]) {
//       case '\r':
//         char_len = 2;
//         fprintf(stderr, "\\r");
//         break;

//       case '\n':
//         char_len = 2;
//         fprintf(stderr, "\\n\n");

//         if (this_line) goto print;

//         error_location_line = 0;
//         continue;

//       default:
//         char_len = 1;
//         fputc(raw[i], stderr);
//         break;
//     }
//     if (!this_line) error_location_line += char_len;
//   }

//   fprintf(stderr, "[eof]\n");

//  print:
//   for (j = 0; j < error_location_line; j++) {
//     fputc(' ', stderr);
//   }
//   fprintf(stderr, "^\n\nerror location: %u\n", (unsigned int)error_location);
// }


// void
// test_message (const struct message *message)
// {
//   size_t raw_len = strlen(message->raw);
//   size_t msg1len;
//   for (msg1len = 0; msg1len < raw_len; msg1len++) {
//     parser_init(message->type);

//     size_t read;
//     const char *msg1 = message->raw;
//     const char *msg2 = msg1 + msg1len;
//     size_t msg2len = raw_len - msg1len;

//     if (msg1len) {
//       read = parse(msg1, msg1len);

//       if (message->upgrade && parser->upgrade) {
//         messages[num_messages - 1].upgrade = msg1 + read;
//         goto test;
//       }

//       if (read != msg1len) {
//         print_error(msg1, read);
//         exit(1);
//       }
//     }


//     read = parse(msg2, msg2len);

//     if (message->upgrade && parser->upgrade) {
//       messages[num_messages - 1].upgrade = msg2 + read;
//       goto test;
//     }

//     if (read != msg2len) {
//       print_error(msg2, read);
//       exit(1);
//     }

//     read = parse(NULL, 0);

//     if (read != 0) {
//       print_error(message->raw, read);
//       exit(1);
//     }

//   test:

//     if (num_messages != 1) {
//       printf("\n*** num_messages != 1 after testing '%s' ***\n\n", message->name);
//       exit(1);
//     }

//     if(!message_eq(0, message)) exit(1);

//     parser_free();
//   }
// }

// void
// test_message_count_body (const struct message *message)
// {
//   parser_init(message->type);

//   size_t read;
//   size_t l = strlen(message->raw);
//   size_t i, toread;
//   size_t chunk = 4024;

//   for (i = 0; i < l; i+= chunk) {
//     toread = MIN(l-i, chunk);
//     read = parse_count_body(message->raw + i, toread);
//     if (read != toread) {
//       print_error(message->raw, read);
//       exit(1);
//     }
//   }


//   read = parse_count_body(NULL, 0);
//   if (read != 0) {
//     print_error(message->raw, read);
//     exit(1);
//   }

//   if (num_messages != 1) {
//     printf("\n*** num_messages != 1 after testing '%s' ***\n\n", message->name);
//     exit(1);
//   }

//   if(!message_eq(0, message)) exit(1);

//   parser_free();
// }

// void
// test_simple (const char *buf, enum http_errno err_expected)
// {
//   parser_init(HTTP_REQUEST);

//   size_t parsed;
//   int pass;
//   enum http_errno err;

//   parsed = parse(buf, strlen(buf));
//   pass = (parsed == strlen(buf));
//   err = HTTP_PARSER_ERRNO(parser);
//   parsed = parse(NULL, 0);
//   pass &= (parsed == 0);

//   parser_free();

//   /* In strict mode, allow us to pass with an unexpected HPE_STRICT as
//    * long as the caller isn't expecting success.
//    */
// #if HTTP_PARSER_STRICT
//   if (err_expected != err && err_expected != HPE_OK && err != HPE_STRICT) {
// #else
//   if (err_expected != err) {
// #endif
//     fprintf(stderr, "\n*** test_simple expected %s, but saw %s ***\n\n%s\n",
//         http_errno_name(err_expected), http_errno_name(err), buf);
//     exit(1);
//   }
// }

// void
// test_header_overflow_error (int req)
// {
//   http_parser parser;
//   http_parser_init(&parser, req ? HTTP_REQUEST : HTTP_RESPONSE);
//   size_t parsed;
//   const char *buf;
//   buf = req ? "GET / HTTP/1.1\r\n" : "HTTP/1.0 200 OK\r\n";
//   parsed = http_parser_execute(&parser, &settings_null, buf, strlen(buf));
//   assert(parsed == strlen(buf));

//   buf = "header-key: header-value\r\n";
//   size_t buflen = strlen(buf);

//   int i;
//   for (i = 0; i < 10000; i++) {
//     parsed = http_parser_execute(&parser, &settings_null, buf, buflen);
//     if (parsed != buflen) {
//       //fprintf(stderr, "error found on iter %d\n", i);
//       assert(HTTP_PARSER_ERRNO(&parser) == HPE_HEADER_OVERFLOW);
//       return;
//     }
//   }

//   fprintf(stderr, "\n*** Error expected but none in header overflow test ***\n");
//   exit(1);
// }

// void
// test_no_overflow_long_body (int req, size_t length)
// {
//   http_parser parser;
//   http_parser_init(&parser, req ? HTTP_REQUEST : HTTP_RESPONSE);
//   size_t parsed;
//   size_t i;
//   char buf1[3000];
//   size_t buf1len = sprintf(buf1, "%s\r\nConnection: Keep-Alive\r\nContent-Length: %zu\r\n\r\n",
//       req ? "POST / HTTP/1.0" : "HTTP/1.0 200 OK", length);
//   parsed = http_parser_execute(&parser, &settings_null, buf1, buf1len);
//   if (parsed != buf1len)
//     goto err;

//   for (i = 0; i < length; i++) {
//     char foo = 'a';
//     parsed = http_parser_execute(&parser, &settings_null, &foo, 1);
//     if (parsed != 1)
//       goto err;
//   }

//   parsed = http_parser_execute(&parser, &settings_null, buf1, buf1len);
//   if (parsed != buf1len) goto err;
//   return;

//  err:
//   fprintf(stderr,
//           "\n*** error in test_no_overflow_long_body %s of length %zu ***\n",
//           req ? "REQUEST" : "RESPONSE",
//           length);
//   exit(1);
// }

// void
// test_multiple3 (const struct message *r1, const struct message *r2, const struct message *r3)
// {
//   int message_count = count_parsed_messages(3, r1, r2, r3);

//   char total[ strlen(r1->raw)
//             + strlen(r2->raw)
//             + strlen(r3->raw)
//             + 1
//             ];
//   total[0] = '\0';

//   strcat(total, r1->raw);
//   strcat(total, r2->raw);
//   strcat(total, r3->raw);

//   parser_init(r1->type);

//   size_t read;

//   read = parse(total, strlen(total));

//   if (parser->upgrade) {
//     upgrade_message_fix(total, read, 3, r1, r2, r3);
//     goto test;
//   }

//   if (read != strlen(total)) {
//     print_error(total, read);
//     exit(1);
//   }

//   read = parse(NULL, 0);

//   if (read != 0) {
//     print_error(total, read);
//     exit(1);
//   }

// test:

//   if (message_count != num_messages) {
//     fprintf(stderr, "\n\n*** Parser didn't see 3 messages only %d *** \n", num_messages);
//     exit(1);
//   }

//   if (!message_eq(0, r1)) exit(1);
//   if (message_count > 1 && !message_eq(1, r2)) exit(1);
//   if (message_count > 2 && !message_eq(2, r3)) exit(1);

//   parser_free();
// }

// /* SCAN through every possible breaking to make sure the
//  * parser can handle getting the content in any chunks that
//  * might come from the socket
//  */
// void
// test_scan (const struct message *r1, const struct message *r2, const struct message *r3)
// {
//   char total[80*1024] = "\0";
//   char buf1[80*1024] = "\0";
//   char buf2[80*1024] = "\0";
//   char buf3[80*1024] = "\0";

//   strcat(total, r1->raw);
//   strcat(total, r2->raw);
//   strcat(total, r3->raw);

//   size_t read;

//   int total_len = strlen(total);

//   int total_ops = 2 * (total_len - 1) * (total_len - 2) / 2;
//   int ops = 0 ;

//   size_t buf1_len, buf2_len, buf3_len;
//   int message_count = count_parsed_messages(3, r1, r2, r3);

//   int i,j,type_both;
//   for (type_both = 0; type_both < 2; type_both ++ ) {
//     for (j = 2; j < total_len; j ++ ) {
//       for (i = 1; i < j; i ++ ) {

//         if (ops % 1000 == 0)  {
//           printf("\b\b\b\b%3.0f%%", 100 * (float)ops /(float)total_ops);
//           fflush(stdout);
//         }
//         ops += 1;

//         parser_init(type_both ? HTTP_BOTH : r1->type);

//         buf1_len = i;
//         strncpy(buf1, total, buf1_len);
//         buf1[buf1_len] = 0;

//         buf2_len = j - i;
//         strncpy(buf2, total+i, buf2_len);
//         buf2[buf2_len] = 0;

//         buf3_len = total_len - j;
//         strncpy(buf3, total+j, buf3_len);
//         buf3[buf3_len] = 0;

//         read = parse(buf1, buf1_len);

//         if (parser->upgrade) goto test;

//         if (read != buf1_len) {
//           print_error(buf1, read);
//           goto error;
//         }

//         read += parse(buf2, buf2_len);

//         if (parser->upgrade) goto test;

//         if (read != buf1_len + buf2_len) {
//           print_error(buf2, read);
//           goto error;
//         }

//         read += parse(buf3, buf3_len);

//         if (parser->upgrade) goto test;

//         if (read != buf1_len + buf2_len + buf3_len) {
//           print_error(buf3, read);
//           goto error;
//         }

//         parse(NULL, 0);

// test:
//         if (parser->upgrade) {
//           upgrade_message_fix(total, read, 3, r1, r2, r3);
//         }

//         if (message_count != num_messages) {
//           fprintf(stderr, "\n\nParser didn't see %d messages only %d\n",
//             message_count, num_messages);
//           goto error;
//         }

//         if (!message_eq(0, r1)) {
//           fprintf(stderr, "\n\nError matching messages[0] in test_scan.\n");
//           goto error;
//         }

//         if (message_count > 1 && !message_eq(1, r2)) {
//           fprintf(stderr, "\n\nError matching messages[1] in test_scan.\n");
//           goto error;
//         }

//         if (message_count > 2 && !message_eq(2, r3)) {
//           fprintf(stderr, "\n\nError matching messages[2] in test_scan.\n");
//           goto error;
//         }

//         parser_free();
//       }
//     }
//   }
//   puts("\b\b\b\b100%");
//   return;

//  error:
//   fprintf(stderr, "i=%d  j=%d\n", i, j);
//   fprintf(stderr, "buf1 (%u) %s\n\n", (unsigned int)buf1_len, buf1);
//   fprintf(stderr, "buf2 (%u) %s\n\n", (unsigned int)buf2_len , buf2);
//   fprintf(stderr, "buf3 (%u) %s\n", (unsigned int)buf3_len, buf3);
//   exit(1);
// }

// // user required to free the result
// // string terminated by \0
// char *
// create_large_chunked_message (int body_size_in_kb, const char* headers)
// {
//   int i;
//   size_t wrote = 0;
//   size_t headers_len = strlen(headers);
//   size_t bufsize = headers_len + (5+1024+2)*body_size_in_kb + 6;
//   char * buf = malloc(bufsize);

//   memcpy(buf, headers, headers_len);
//   wrote += headers_len;

//   for (i = 0; i < body_size_in_kb; i++) {
//     // write 1kb chunk into the body.
//     memcpy(buf + wrote, "400\r\n", 5);
//     wrote += 5;
//     memset(buf + wrote, 'C', 1024);
//     wrote += 1024;
//     strcpy(buf + wrote, "\r\n");
//     wrote += 2;
//   }

//   memcpy(buf + wrote, "0\r\n\r\n", 6);
//   wrote += 6;
//   assert(wrote == bufsize);

//   return buf;
// }


// int
// main (void)
// {
//   parser = NULL;
//   int i, j, k;
//   int request_count;
//   int response_count;

//   printf("sizeof(http_parser) = %u\n", (unsigned int)sizeof(http_parser));

//   for (request_count = 0; requests[request_count].name; request_count++);
//   for (response_count = 0; responses[response_count].name; response_count++);

//   //// OVERFLOW CONDITIONS

//   test_header_overflow_error(HTTP_REQUEST);
//   test_no_overflow_long_body(HTTP_REQUEST, 1000);
//   test_no_overflow_long_body(HTTP_REQUEST, 100000);

//   test_header_overflow_error(HTTP_RESPONSE);
//   test_no_overflow_long_body(HTTP_RESPONSE, 1000);
//   test_no_overflow_long_body(HTTP_RESPONSE, 100000);

//   //// RESPONSES

//   for (i = 0; i < response_count; i++) {
//     test_message(&responses[i]);
//   }

//   for (i = 0; i < response_count; i++) {
//     if (!responses[i].should_keep_alive) continue;
//     for (j = 0; j < response_count; j++) {
//       if (!responses[j].should_keep_alive) continue;
//       for (k = 0; k < response_count; k++) {
//         test_multiple3(&responses[i], &responses[j], &responses[k]);
//       }
//     }
//   }

//   test_message_count_body(&responses[NO_HEADERS_NO_BODY_404]);
//   test_message_count_body(&responses[TRAILING_SPACE_ON_CHUNKED_BODY]);

//   // test very large chunked response
//   {
//     char * msg = create_large_chunked_message(31337,
//       "HTTP/1.0 200 OK\r\n"
//       "Transfer-Encoding: chunked\r\n"
//       "Content-Type: text/plain\r\n"
//       "\r\n");
//     struct message large_chunked =
//       {.name= "large chunked"
//         type: "RESPONSE",
//         raw: msg
//         shouldKeepAlive: false,
//         messageCompleteOnEof: false,
//         httpMajor: 1
//         httpMajor: 0
//         statusCode: 200
    
//         headers:
//         { { "Transfer-Encoding", "chunked" }
//         , { "Content-Type", "text/plain" }
//         }
//       ,.body_size= 31337*1024
//       };
//     test_message_count_body(&large_chunked);
//     free(msg);
//   }



//   printf("response scan 1/2      ");
//   test_scan( &responses[TRAILING_SPACE_ON_CHUNKED_BODY]
//            , &responses[NO_HEADERS_NO_BODY_404]
//            , &responses[NO_REASON_PHRASE]
//            );

//   printf("response scan 2/2      ");
//   test_scan( &responses[BONJOUR_MADAME_FR]
//            , &responses[UNDERSTORE_HEADER_KEY]
//            , &responses[NO_CARRIAGE_RET]
//            );

//   puts("responses okay");


//   /// REQUESTS

//   test_simple("hello world", HPE_INVALID_METHOD);
//   test_simple("GET / HTP/1.1\r\n\r\n", HPE_INVALID_VERSION);


//   test_simple("ASDF / HTTP/1.1\r\n\r\n", HPE_INVALID_METHOD);
//   test_simple("PROPPATCHA / HTTP/1.1\r\n\r\n", HPE_INVALID_METHOD);
//   test_simple("GETA / HTTP/1.1\r\n\r\n", HPE_INVALID_METHOD);

//   // Well-formed but incomplete
//   test_simple("GET / HTTP/1.1\r\n"
//               "Content-Type: text/plain\r\n"
//               "Content-Length: 6\r\n"
//               "\r\n"
//               "fooba",
//               HPE_OK);

//   static const char *all_methods[] = {
//     "DELETE",
//     "GET",
//     "HEAD",
//     "POST",
//     "PUT",
//     //"CONNECT", //CONNECT can't be tested like other methods, it's a tunnel
//     "OPTIONS",
//     "TRACE",
//     "COPY",
//     "LOCK",
//     "MKCOL",
//     "MOVE",
//     "PROPFIND",
//     "PROPPATCH",
//     "UNLOCK",
//     "REPORT",
//     "MKACTIVITY",
//     "CHECKOUT",
//     "MERGE",
//     "M-SEARCH",
//     "NOTIFY",
//     "SUBSCRIBE",
//     "UNSUBSCRIBE",
//     "PATCH",
//     0 };
//   const char **this_method;
//   for (this_method = all_methods; *this_method; this_method++) {
//     char buf[200];
//     sprintf(buf, "%s / HTTP/1.1\r\n\r\n", *this_method);
//     test_simple(buf, HPE_OK);
//   }

//   static const char *bad_methods[] = {
//       "C******",
//       "M****",
//       0 };
//   for (this_method = bad_methods; *this_method; this_method++) {
//     char buf[200];
//     sprintf(buf, "%s / HTTP/1.1\r\n\r\n", *this_method);
//     test_simple(buf, HPE_UNKNOWN);
//   }

//   const char *dummy2 =
//     "GET / HTTP/1.1\r\n"
//     "X-SSL-Stuff:   -----BEGIN CERTIFICATE-----\r\n"
//     "\tMIIFbTCCBFWgAwIBAgICH4cwDQYJKoZIhvcNAQEFBQAwcDELMAkGA1UEBhMCVUsx\r\n"
//     "\tETAPBgNVBAoTCGVTY2llbmNlMRIwEAYDVQQLEwlBdXRob3JpdHkxCzAJBgNVBAMT\r\n"
//     "\tAkNBMS0wKwYJKoZIhvcNAQkBFh5jYS1vcGVyYXRvckBncmlkLXN1cHBvcnQuYWMu\r\n"
//     "\tdWswHhcNMDYwNzI3MTQxMzI4WhcNMDcwNzI3MTQxMzI4WjBbMQswCQYDVQQGEwJV\r\n"
//     "\tSzERMA8GA1UEChMIZVNjaWVuY2UxEzARBgNVBAsTCk1hbmNoZXN0ZXIxCzAJBgNV\r\n"
//     "\tBAcTmrsogriqMWLAk1DMRcwFQYDVQQDEw5taWNoYWVsIHBhcmQYJKoZIhvcNAQEB\r\n"
//     "\tBQADggEPADCCAQoCggEBANPEQBgl1IaKdSS1TbhF3hEXSl72G9J+WC/1R64fAcEF\r\n"
//     "\tW51rEyFYiIeZGx/BVzwXbeBoNUK41OK65sxGuflMo5gLflbwJtHBRIEKAfVVp3YR\r\n"
//     "\tgW7cMA/s/XKgL1GEC7rQw8lIZT8RApukCGqOVHSi/F1SiFlPDxuDfmdiNzL31+sL\r\n"
//     "\t0iwHDdNkGjy5pyBSB8Y79dsSJtCW/iaLB0/n8Sj7HgvvZJ7x0fr+RQjYOUUfrePP\r\n"
//     "\tu2MSpFyf+9BbC/aXgaZuiCvSR+8Snv3xApQY+fULK/xY8h8Ua51iXoQ5jrgu2SqR\r\n"
//     "\twgA7BUi3G8LFzMBl8FRCDYGUDy7M6QaHXx1ZWIPWNKsCAwEAAaOCAiQwggIgMAwG\r\n"
//     "\tA1UdEwEB/wQCMAAwEQYJYIZIAYb4QgHTTPAQDAgWgMA4GA1UdDwEB/wQEAwID6DAs\r\n"
//     "\tBglghkgBhvhCAQ0EHxYdVUsgZS1TY2llbmNlIFVzZXIgQ2VydGlmaWNhdGUwHQYD\r\n"
//     "\tVR0OBBYEFDTt/sf9PeMaZDHkUIldrDYMNTBZMIGaBgNVHSMEgZIwgY+AFAI4qxGj\r\n"
//     "\tloCLDdMVKwiljjDastqooXSkcjBwMQswCQYDVQQGEwJVSzERMA8GA1UEChMIZVNj\r\n"
//     "\taWVuY2UxEjAQBgNVBAsTCUF1dGhvcml0eTELMAkGA1UEAxMCQ0ExLTArBgkqhkiG\r\n"
//     "\t9w0BCQEWHmNhLW9wZXJhdG9yQGdyaWQtc3VwcG9ydC5hYy51a4IBADApBgNVHRIE\r\n"
//     "\tIjAggR5jYS1vcGVyYXRvckBncmlkLXN1cHBvcnQuYWMudWswGQYDVR0gBBIwEDAO\r\n"
//     "\tBgwrBgEEAdkvAQEBAQYwPQYJYIZIAYb4QgEEBDAWLmh0dHA6Ly9jYS5ncmlkLXN1\r\n"
//     "\tcHBvcnQuYWMudmT4sopwqlBWsvcHViL2NybC9jYWNybC5jcmwwPQYJYIZIAYb4QgEDBDAWLmh0\r\n"
//     "\tdHA6Ly9jYS5ncmlkLXN1cHBvcnQuYWMudWsvcHViL2NybC9jYWNybC5jcmwwPwYD\r\n"
//     "\tVR0fBDgwNjA0oDKgMIYuaHR0cDovL2NhLmdyaWQt5hYy51ay9wdWIv\r\n"
//     "\tY3JsL2NhY3JsLmNybDANBgkqhkiG9w0BAQUFAAOCAQEAS/U4iiooBENGW/Hwmmd3\r\n"
//     "\tXCy6Zrt08YjKCzGNjorT98g8uGsqYjSxv/hmi0qlnlHs+k/3Iobc3LjS5AMYr5L8\r\n"
//     "\tUO7OSkgFFlLHQyC9JzPfmLCAugvzEbyv4Olnsr8hbxF1MbKZoQxUZtMVu29wjfXk\r\n"
//     "\thTeApBv7eaKCWpSp7MCbvgzm74izKhu3vlDk9w6qVrxePfGgpKPqfHiOoGhFnbTK\r\n"
//     "\twTC6o2xq5y0qZ03JonF7OJspEd3I5zKY3E+ov7/ZhW6DqT8UFvsAdjvQbXyhV8Eu\r\n"
//     "\tYhixw1aKEPzNjNowuIseVogKOLXxWI5vAi5HgXdS0/ES5gDGsABo4fqovUKlgop3\r\n"
//     "\tRA==\r\n"
//     "\t-----END CERTIFICATE-----\r\n"
//     "\r\n";
//   test_simple(dummy2, HPE_OK);

// #if 0
//   // NOTE(Wed Nov 18 11:57:27 CET 2009) this seems okay. we just read body
//   // until EOF.
//   //
//   // no content-length
//   // error if there is a body without content length
//   const char *bad_get_no_headers_no_body = "GET /bad_get_no_headers_no_body/world HTTP/1.1\r\n"
//                                            "Accept: */*\r\n"
//                                            "\r\n"
//                                            "HELLO";
//   test_simple(bad_get_no_headers_no_body, 0);
// #endif
//   /* TODO sending junk and large headers gets rejected */


//   /* check to make sure our predefined requests are okay */
//   for (i = 0; requests[i].name; i++) {
//     test_message(&requests[i]);
//   }



//   for (i = 0; i < request_count; i++) {
//     if (!requests[i].should_keep_alive) continue;
//     for (j = 0; j < request_count; j++) {
//       if (!requests[j].should_keep_alive) continue;
//       for (k = 0; k < request_count; k++) {
//         test_multiple3(&requests[i], &requests[j], &requests[k]);
//       }
//     }
//   }

//   printf("request scan 1/4      ");
//   test_scan( &requests[GET_NO_HEADERS_NO_BODY]
//            , &requests[GET_ONE_HEADER_NO_BODY]
//            , &requests[GET_NO_HEADERS_NO_BODY]
//            );

//   printf("request scan 2/4      ");
//   test_scan( &requests[POST_CHUNKED_ALL_YOUR_BASE]
//            , &requests[POST_IDENTITY_BODY_WORLD]
//            , &requests[GET_FUNKY_CONTENT_LENGTH]
//            );

//   printf("request scan 3/4      ");
//   test_scan( &requests[TWO_CHUNKS_MULT_ZERO_END]
//            , &requests[CHUNKED_W_TRAILING_HEADERS]
//            , &requests[CHUNKED_W_STUFF_AFTER_LENGTH]
//            );

//   printf("request scan 4/4      ");
//   test_scan( &requests[QUERY_URL_WITH_QUESTION_MARK_GET]
//            , &requests[PREFIX_NEWLINE_GET ]
//            , &requests[CONNECT_REQUEST]
//            );

//   puts("requests okay");

//   return 0;
// }
