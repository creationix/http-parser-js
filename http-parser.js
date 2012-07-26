exports.HTTPParser = HTTPParser;
function HTTPParser(type) {
  this["INIT_" + type]();
}
HTTPParser.REQUEST = "REQUEST";
HTTPParser.RESPONSE = "RESPONSE";
HTTPParser.prototype.reinitialize = HTTPParser;
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
    this[this.state]();
    this.offset++;
  }
};
HTTPParser.prototype.INIT_REQUEST = function () {
  this.state = "REQUEST_LINE";
  this.lineState = "DATA";
  this.info = {
    headers: {}
  };  
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
}
var requestExp = /^([A-Z]+) (.*) HTTP\/([0-9]).([0-9])$/;
HTTPParser.prototype.REQUEST_LINE = function () {
  var line = this.consumeLine();
  if (line === undefined) return;
  var match = requestExp.exec(line);
  this.info.method = match[1];
  this.info.url = match[2];
  this.info.versionMajor = match[3];
  this.info.versionMinor = match[4];
  this.state = "HEADER";
};
var headerExp = /^([^:]+): *(.*)$/;
HTTPParser.prototype.HEADER = function () {
  var line = this.consumeLine();
  if (line === undefined) return;
  if (line) {
    var match = headerExp.exec(line);
    this.info.headers[match[1].toLowerCase()] = match[2];
  }
  else {
    this.onHeadersComplete(this.info);
    this.state = "BODY";
  }
};




