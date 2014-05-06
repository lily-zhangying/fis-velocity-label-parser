// var labels = require('./label.js');
var fis = require('fis');

var states = {

};

var init_states = '';

module.exports = function(content){
    for(var i = 0; i < content.length; i++){
        var char = content.toString().charAt(i);
        console.log(char);
    }
}