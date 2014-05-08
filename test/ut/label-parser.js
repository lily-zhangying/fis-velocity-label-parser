var parser = require('../../index.js'),
    fs = require('fs'),
    fis = require('fis');

var ROOT = __dirname + '/file';
fis.project.setProjectRoot(__dirname + '/file');

var f = fis.file(ROOT + '/easy.vm');
var res = parser(f.getContent());
console.log(res);