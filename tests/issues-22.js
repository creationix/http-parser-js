var HTTPParser = require('../').HTTPParser;
process.binding('http_parser').HTTPParser = HTTPParser;

var assert = require("assert");
var http = require("http");

http.get("http://www.rockbox.org/" , function(res) {

    //console.log(res.headers);
    var bb = [];

    res.on('data',function(b){
        bb.push(b);
    });
    res.on('end',function(){
        //console.log("end");
        var b = Buffer.concat(bb) + '';
        assert.notEqual(b,'');
    });
});