'use strict';
require('../common');

var assert = require('assert');
var http_common = require('_http_common');
var http_parser_js = require('../../http-parser.js')

if (parseInt(process.versions.node) <= 10) {
	// not exported, no easy way to check, but we know it works there
} else {
	// on newer Node versions, this is exported
	assert(http_common.HTTPParser);
	assert.equal(http_common.HTTPParser, http_parser_js.HTTPParser);
}
