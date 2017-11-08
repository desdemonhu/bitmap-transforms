'use strict';

const fileChange = require('./lib/file-exchange.js');
const transform = require('./lib/transform.js');

fileChange('./test/assets/hunt-you-down.bmp', './test/assets/hunt-redo.bmp', transform.invert);

fileChange('./test/assets/hunt-you-down.bmp', './test/assets/hunt-greyscale.bmp', transform.greyscale);

fileChange('./test/assets/hunt-you-down.bmp', './test/assets/hunt-colorshift.bmp', transform.colorShift);

fileChange('./test/assets/house.bmp', './test/assets/house-greyscale.bmp', transform.greyscale);

fileChange('./test/assets/house.bmp', './test/assets/house-colorshift.bmp', transform.colorShift);

fileChange('./test/assets/bitmap.bmp', './test/assets/bitmap-greyscale.bmp', transform.greyscale);
