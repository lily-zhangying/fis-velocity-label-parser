var labels = require('./labels.js');

module.exports = function(content){
    for(var i = 0, i < content.length, i++){
        var char = content.charAt(i);
        console.log(char);
    }
}