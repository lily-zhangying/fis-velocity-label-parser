var parser = require('../../index.js'),
    fs = require('fs'),
    fis = require('fis-kernel');

var ROOT = __dirname + '/file';
fis.project.setProjectRoot(__dirname + '/file');

var f = fis.file(ROOT + '/index.vm');
var res = parser(f.getContent());
console.log(res);