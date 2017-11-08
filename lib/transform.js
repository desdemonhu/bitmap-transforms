'use strict';

let transform = module.exports = {};



transform.invert = function(data){
  let header = seperateHeader(data);
  let colorCode = seperateColorCode(data);

  let width = getWidthOfFile(data);
  let hexArray = seperateHexValues(width, colorCode);

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
  let offset = getOffset(data);

  let colorCode = data.slice(offset);
  let width = getWidthOfFile(data);
  let paddingOffset = bytesofPadding(getWidthOfFile(data));
  let offsetData = data.slice(paddingOffset, data.length-1)

  let hexArray = seperateHexValues(width, colorCode);

  let inverted = hexArray.map(function(code){
    let hexValues = createHexCodeArray(code);
    let b = (convertHextoInt(hexValues[0]));
    let g = (convertHextoInt(hexValues[1]));
    let r = (convertHextoInt(hexValues[2]));

    let grey = ((b+g+r)/3).toString(16);

    return padZero(grey) + padZero(grey) + padZero(grey);
  });

  let changed = inverted.join('');

  return header+changed //+ offsetData;

}

transform.colorShift = function(data){
  let headerInfo = seperateHeader(data);
  let header = headerInfo.slice(0,92);

  let palette = headerInfo.slice(92,100);
  let ender = headerInfo.slice(100);

  ///green shift
  let paletteChanged = '0f0000';

  return header + palette + ender + paletteChanged +  seperateColorCode(data);
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

let seperateHexValues = function(width, colorCode){
  // let color = [];
  // let colorRows = seperateRows(width, colorCode);
  // colorRows.forEach(function(row){
  //   // let rowString = row.slice(bytesofPadding(width));
  //   let rowData = row.match(/.{1,6}/g);
  //   rowData.forEach(function(data){
  //     color.push(data);
  //   })
  // })
  // return color;
  return colorCode.match(/.{1,6}/g)
}

let seperateRows = function(width, colorCode){
  let blah = bytesofPadding(width);
  let paddingOffset = `.{1,32}`;
  var re = new RegExp(paddingOffset, 'g');
  let colorRow = colorCode.match(re);
  //let colorRow = colorCode.match(/.{1,32}/g);
  return colorRow;
}

let createHexCodeArray = function(code){
  return code.match(/.{1,2}/g);
}

let convertHextoInt = function(hexValue){
  return parseInt(hexValue, 16);
}

///header for offset starts at offset 10 and goes for 4bytes
let getOffset = function(header){
  return header.slice(10,14)
}

///header position for file width starts at offset 18 and goes for 4 bytes
let getWidthOfFile = function(header){
  return header.slice(18,22);
}

let bytesofPadding = function(width){
  let ofFour = width % 4;
  switch(ofFour){
    case 0:
      return width - 0;
      break;
    case 1:
      return width -(1 *2);
      break;
    case 2:
      return width - (2*2);
      break;
    case 3:
      return width - (3*2);
      break;
    default: width;
  }
}
