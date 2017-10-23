'use strict';

const fs = require('fs');
const transform = require('./transform.js');
///gets file, applies transformation from module, spits out new file

module.exports = function(filePath, output, transform){
  fs.readFile(filePath, (err, data)=>{
    if(err){
      console.log(err);
    }
    let newHex = transform(data.toString('hex'));

    ///bitmap headers start with 42
    if(newHex.startsWith('42')){
      let newImage = Buffer.from(newHex, 'hex');
      fs.writeFile(output, newImage, 'utf8', (err) => {
        if(err){
          console.log(err);
        }
      });
    }else {
      console.log('Not a bitmap file');
    }
  })


};
