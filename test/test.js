'use strict';

const expect = require('expect');
const fileChange = require('../lib/file-exchange.js');

describe('read file', function(){
  it('Just trying to read a file', function(){
    let output = fileChange('/assets/hunt-you-down.bmp');
    expect(output).toBe(!null);
  })
})
