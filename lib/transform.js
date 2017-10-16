'use strict';

let transform = module.exports = {};

transform.invert = function(data){
  let changed = data.replace('f', '0');
  return changed;
}
