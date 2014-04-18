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
}
HTTPParser.REQUEST = "REQUEST";
HTTPParser.RESPONSE = "RESPONSE";
HTTPParser.prototype.reinitialize = HTTPParser;
HTTPParser.prototype.finish = function () {
};
var state_handles_increment = {
  BODY_RAW: true,
  BODY_CHUNK: true
};
HTTPParser.prototype.execute = function (chunk, offset, length) {
//  console.log({
//    chunk: chunk.toString("utf8", offset, length),
//    offset: offset,
//    length: length
//  });
  this.chunk = chunk;
  this.start = offset;
  this.offset = offset;
  this.end = offset + length;
  while (this.offset < this.end) {
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

var requestExp = /^([A-Z]+) (.*) HTTP\/([0-9]).([0-9])$/;
HTTPParser.prototype.REQUEST_LINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var match = requestExp.exec(line);
  this.info.method = match[1];
  this.info.url = match[2];
  this.info.versionMajor = match[3];
  this.info.versionMinor = match[4];
  this.state = "HEADER";
};

var responseExp = /^HTTP\/([0-9]).([0-9]) (\d+) ([^\n\r]+)$/;
HTTPParser.prototype.RESPONSE_LINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var match = responseExp.exec(line);
  this.info.versionMajor = match[1];
  this.info.versionMinor = match[2];
  this.info.statusCode = Number(match[3]);
  this.info.statusMsg = match[4];
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
    var k = match && match[1].toLowerCase();
    var v = match && match[2];
    if (k) { // skip empty string (malformed header)
      this.info.headers.push(k);
      this.info.headers.push(v);
      if (k === 'transfer-encoding') {
        this.encoding = v;
      }
    }
  } else {
    //console.log(this.info.headers);
    this.info.upgrade = !!this.info.headers.upgrade;
    this.onHeadersComplete(this.info);
    if (this.encoding === 'chunked') {
      this.state = "BODY_CHUNKHEAD";
    } else {
      this.state = "BODY_RAW";
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
    this.onMessageComplete();
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
  this.onBody(this.chunk, this.offset, length);
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKEMPTYLINE';
  }
};

HTTPParser.prototype.BODY_RAW = function () {
  var length = this.end - this.offset;
  this.onBody(this.chunk, this.offset, length);
  this.offset += length;
};
