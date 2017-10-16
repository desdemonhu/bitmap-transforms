'use strict';

const fs = require('fs');
///gets file, applies transformation from module, spits out new file

module.exports = function(filePath, transform, output){
  fs.readFile(__dirname + filePath, 'bmp', (err, data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
  })


};
