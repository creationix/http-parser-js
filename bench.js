if (process.env.USE_JS) {
  process.binding("http_parser").HTTPParser = require('./http_parser').HTTPParser;
}

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Length": 12,
    "Content-Type": "text/plain"
  });
  res.end("Hello World\n");
});
server.listen(8080, function () {
  var port = server.address().port;
  var url = "http://127.0.0.1:" + port + "/";
  console.log(url);
  
  var params = {
    method: "GET",
    host: "127.0.0.1",
    path: "/",
    port: 8080
  };
  if (process.env.NODE_CLIENT) {
  
    function request() {
      var req = http.request(params, function (res) {
        count++;
        request();
      });
      req.end();
    }   
    request(); 
    var count = 0;
    var before = Date.now();
    setInterval(function () {
      var now = Date.now();
      var delta = now - before;
      before = now;
      var rps = Math.round(count / delta * 1000);
      console.log("%s req/second (%s reqs in %s ms)", rps, count, delta);
      count = 0;
    }, 1000);
  }  
  
});
