'use strict';

let transform = module.exports = {};

///bitmap header is 54 bytes

transform.invert = function(data){
  let header = data.slice(0,109);
  let colorCode = data.slice(109);

  let hexArray = colorCode.match(/.{1,6}/g);
  let inverted = hexArray.map(function(code){
    let b = (255 - parseInt(code.slice(0,2), 16)).toString(16);
    let g = (255 - parseInt(code.slice(2,4), 16)).toString(16);
    let r = (255 - parseInt(code.slice(4,6), 16)).toString(16);

    return padZero(b) + padZero(g) + padZero(r);
  });

  let changed = inverted.join('');
  return header+changed;
}

transform.greyscale = function(data){
  ///add all the colors up together and divide by three?
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
