var parser = require('../../index.js'),
    fs = require('fs'),
    fis = require('fis');
var assert = require("assert");
var ROOT = __dirname + '/file';
fis.project.setProjectRoot(__dirname + '/file');

var f = fis.file(ROOT + '/index.vm');
var res = parser(f.getContent());
var arr = new Array(
    { start_label: '#if',
    end_label: '#end',
    start_index: 105,
    content_start_index: 108,
    content_end_index: 258,
    end_index: 259 },
    { start_label: '#head',
        end_label: '#end',
        start_index: 40,
        content_start_index: 45,
        content_end_index: 287,
        end_index: 288 },
    { start_label: '#script',
        end_label: '#end',
        start_index: 597,
        content_start_index: 604,
        content_end_index: 1018,
        end_index: 1019 },
    { start_label: '#style',
        end_label: '#end',
        start_index: 1041,
        content_start_index: 1047,
        content_end_index: 1282,
        end_index: 1283 },
    { start_label: '#if',
        end_label: '#end',
        start_index: 1305,
        content_start_index: 1308,
        content_end_index: 1449,
        end_index: 1450 },
    { start_label: '#foreach',
        end_label: '#end',
        start_index: 1473,
        content_start_index: 1481,
        content_end_index: 1636,
        end_index: 1637 },
    { start_label: '#body',
        end_label: '#end',
        start_index: 302,
        content_start_index: 307,
        content_end_index: 1651,
        end_index: 1652 },
    { start_label: '#html',
        end_label: '#end',
        start_index: 0,
        content_start_index: 5,
        content_end_index: 1657,
        end_index: 1658 }
);
describe('label-parser',function(){
    it('test',function(){
        assert.equal(arr.toString(),res.toString());
    })
})