'use strict';

const fileChange = require('./lib/file-exchange.js');
const transform = require('./lib/transform.js');

fileChange('./test/assets/hunt-you-down.bmp', './test/assets/hunt-redo.bmp', transform.invert);
