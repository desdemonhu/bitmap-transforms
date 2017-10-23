'use strict';

let transform = module.exports = {};



transform.invert = function(data){
  let header = seperateHeader(data);
  let colorCode = seperateColorCode(data);

  let hexArray = seperateHexValues(colorCode);

  let inverted = hexArray.map(function(code){
    let hexValues = createHexCodeArray(code);
    let b = (255 - convertHextoInt(hexValues[0])).toString(16);
    let g = (255 - convertHextoInt(hexValues[1])).toString(16);
    let r = (255 - convertHextoInt(hexValues[2])).toString(16);

    return padZero(b) + padZero(g) + padZero(r);
  });

  let changed = inverted.join('');
  return header+changed;
}

transform.greyscale = function(data){
  let header = seperateHeader(data);
  let colorCode = seperateColorCode(data);

  let hexArray = seperateHexValues(colorCode);

  let inverted = hexArray.map(function(code){
    let hexValues = createHexCodeArray(code);
    let b = (convertHextoInt(hexValues[0]));
    let g = (convertHextoInt(hexValues[1]));
    let r = (convertHextoInt(hexValues[2]));

    let grey = ((r+b+g)/3).toString(16);

    return padZero(grey) + padZero(grey) + padZero(grey);
  });

  let changed = inverted.join('');

  return header+changed;
}

transform.colorShift = function(data){
  ///add all the colors up together and divide by three?
  let header = seperateHeader(data);
  let palette = header.slice(92,100);

  ///green shift
  let paletteChanged = palette.replace('000000', '0f0000');

  return header+ paletteChanged + seperateColorCode(data);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

///bitmap header is 54 bytes
let seperateHeader = function(data){
    return data.slice(0,109);
}

let seperateColorCode = function(data){
  return data.slice(109);
}

let seperateHexValues = function(colorCode){
  return colorCode.match(/.{1,6}/g);
}

let createHexCodeArray = function(code){
  return code.match(/.{1,2}/g);
}

let convertHextoInt = function(hexValue){
  return parseInt(hexValue, 16);
}
