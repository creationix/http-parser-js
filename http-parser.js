/*jshint node:true */

var assert = require('assert');

exports.HTTPParser = HTTPParser;
function HTTPParser(type) {
  // These fields are set once, do *not* clear on reinitialize!
  // this.onHeaders = parserOnHeaders(headers, url)
  // this.onHeadersComplete = parserOnHeadersComplete(info)
  // this.onBody = parserOnBody(b, start, len)
  // this.onMessageComplete = parserOnMessageComplete()
  // this.socket = null;
  // this.incoming = null;
  // this._headers = [];
  // this._url = '';
  assert.ok(type === 'REQUEST' || type === 'RESPONSE');
  this.state = type + '_LINE';
  this.info = {
    headers: []
  };
  this.lineState = "DATA";
  this.encoding = null;
  this.connection = null;
  this.body_bytes = null;
  this.headResponse = null;
}
HTTPParser.REQUEST = "REQUEST";
HTTPParser.RESPONSE = "RESPONSE";
var kOnHeaders = HTTPParser.kOnHeaders = 0; //unused
var kOnHeadersComplete = HTTPParser.kOnHeadersComplete = 1;
var kOnBody = HTTPParser.kOnBody = 2;
var kOnMessageComplete = HTTPParser.kOnMessageComplete = 3;
var methods = HTTPParser.methods = [
  'DELETE',
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'COPY',
  'LOCK',
  'MKCOL',
  'MOVE',
  'PROPFIND',
  'PROPPATCH',
  'SEARCH',
  'UNLOCK',
  'REPORT',
  'MKACTIVITY',
  'CHECKOUT',
  'MERGE',
  'M-SEARCH',
  'NOTIFY',
  'SUBSCRIBE',
  'UNSUBSCRIBE',
  'PATCH',
  'PURGE'
];
HTTPParser.prototype.reinitialize = HTTPParser;
HTTPParser.prototype.finish =
HTTPParser.prototype.close =
HTTPParser.prototype.pause = //TODO: pause/resume
HTTPParser.prototype.resume = function () {
};
HTTPParser.prototype._compatMode = false;
var state_handles_increment = {
  BODY_RAW: true,
  BODY_SIZED: true,
  BODY_CHUNK: true
};
HTTPParser.prototype.execute = function (chunk, offset, length) {
  // backward compat to node < 0.11.4
  offset = offset || 0;
  length = typeof length === 'number' ? length : chunk.length;

//  console.log({
//    chunk: chunk.toString("utf8", offset, length),
//    offset: offset,
//    length: length
//  });
  this.chunk = chunk;
  this.start = offset;
  this.offset = offset;
  this.end = offset + length;
  while (this.offset < this.end && this.state !== "UNINITIALIZED") {
    var state = this.state;
    this[state]();
    if (!state_handles_increment[state]) {
      this.offset++;
    }
  }
};

HTTPParser.prototype.consumeLine = function () {
  if (this.captureStart === undefined) {
    this.captureStart = this.offset;
  }
  var byte = this.chunk[this.offset];
  if (byte === 0x0d && this.lineState === "DATA") { // \r
    this.captureEnd = this.offset;
    this.lineState = "ENDING";
    return;
  }
  if (this.lineState === "ENDING") {
    this.lineState = "DATA";
    if (byte !== 0x0a) {
      return;
    }
    var line = this.chunk.toString("ascii", this.captureStart, this.captureEnd);
    this.captureStart = undefined;
    this.captureEnd = undefined;
    return line;
  }
};

var requestExp = /^([A-Z]+) (.*) HTTP\/([0-9])\.([0-9])$/;
HTTPParser.prototype.REQUEST_LINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var match = requestExp.exec(line);
  this.info.method = this._compatMode ? match[1] : methods.indexOf(match[1]);
  this.info.url = match[2];
  this.info.versionMajor = parseInt(match[3], 10);
  this.info.versionMinor = parseInt(match[4], 10);
  this.state = "HEADER";
};

var responseExp = /^HTTP\/([0-9])\.([0-9]) (\d+) ([^\n\r]+)$/;
HTTPParser.prototype.RESPONSE_LINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var match = responseExp.exec(line);
  var versionMajor = this.info.versionMajor = parseInt(match[1], 10);
  var versionMinor = this.info.versionMinor = parseInt(match[2], 10);
  var statusCode = this.info.statusCode = Number(match[3]);
  this.info.statusMsg = match[4];
  // Implied zero length.
  if ((statusCode / 100 | 0) === 1 || statusCode === 204 || statusCode === 304) {
    this.body_bytes = 0;
  }
  if (versionMajor === 1 && versionMinor === 0) {
    this.connection = 'close';
  }
  this.state = "HEADER";
};
var headerExp = /^([^:]*): *(.*)$/;
HTTPParser.prototype.HEADER = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  if (line) {
    var match = headerExp.exec(line);
    var k = match && match[1];
    var v = match && match[2];
    if (k) { // skip empty string (malformed header)
      if (!this.preserveCase) {
        k = k.toLowerCase();
      }
      this.info.headers.push(k);
      this.info.headers.push(v);
      if (this.preserveCase) {
        k = k.toLowerCase();
      }
      if (k === 'transfer-encoding') {
        this.encoding = v;
      } else if (k === 'content-length') {
        this.body_bytes = parseInt(v, 10);
      } else if (k === 'connection') {
        this.connection = v;
      }
    }
  } else {
    //console.log(this.info.headers);
    this.info.upgrade = !!this.info.headers.upgrade ||
      this.info.method === 5 || // index of 'CONNECT' in HTTPParser.methods
      this.info.method === 'CONNECT';
    this.info.shouldKeepAlive = false; //TODO
    this[kOnHeadersComplete](this.info);
    // Set ``this.headResponse = true;`` to ignore Content-Length.
    if (this.headResponse) {
      this[kOnMessageComplete]();
      this.state = 'UNINITIALIZED';
    } else if (this.encoding === 'chunked') {
      this.state = "BODY_CHUNKHEAD";
    } else if (this.body_bytes === null) {
      //if (this.connection !== 'close') throw new Error('Unkown body length');
      this.state = "BODY_RAW";
    } else {
      this.state = "BODY_SIZED";
    }
  }
};

HTTPParser.prototype.BODY_CHUNKHEAD = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  this.body_bytes = parseInt(line, 16);
  //console.log('BODY BYTES', this.body_bytes, {s:line});
  //console.log({chunk: this.chunk.toString('utf8', this.offset-4, this.offset+4)});
  if (!this.body_bytes) {
    //console.log(this.offset, this.end);
    this[kOnMessageComplete]();
    this.state = 'BODY_CHUNKEMPTYLINEDONE';
  } else {
    this.state = 'BODY_CHUNK';
  }
};

HTTPParser.prototype.BODY_CHUNKEMPTYLINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  assert.equal(line, '');
  this.state = 'BODY_CHUNKHEAD';
};

HTTPParser.prototype.BODY_CHUNKEMPTYLINEDONE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  assert.equal(line, '');
  this.state = 'UNINITIALIZED';
};

HTTPParser.prototype.BODY_CHUNK = function () {
  // console.log({offs: this.offset, chunk: this.chunk.toString('utf8', this.offset, this.offset+4),
  //   next: this.chunk.toString("utf8", this.offset + this.body_bytes, this.offset + this.body_bytes+4)});
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this[kOnBody](this.chunk, this.offset, length);
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKEMPTYLINE';
  }
};

HTTPParser.prototype.BODY_RAW = function () {
  var length = this.end - this.offset;
  this[kOnBody](this.chunk, this.offset, length);
  this.offset += length;
};

HTTPParser.prototype.BODY_SIZED = function () {
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this[kOnBody](this.chunk, this.offset, length);
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this[kOnMessageComplete]();
    this.state = 'UNINITIALIZED';
  }
};

// backward compat to node < 0.11.6
Object.defineProperty(HTTPParser.prototype, 'onHeadersComplete', {
  get: function() {
    return this[kOnHeadersComplete];
  },
  set: function(to) {
    // hack for backward compatibility
    this._compatMode = true;
    return (this[kOnHeadersComplete] = to);
  }
});
Object.defineProperty(HTTPParser.prototype, 'onBody', {
  get: function() {
    return this[kOnBody];
  },
  set: function(to) {
    return (this[kOnBody] = to);
  }
});
Object.defineProperty(HTTPParser.prototype, 'onMessageComplete', {
  get: function() {
    return this[kOnMessageComplete];
  },
  set: function(to) {
    return (this[kOnMessageComplete] = to);
  }
});
