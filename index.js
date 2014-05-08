// var labels = require('./label.js');
var fis = require('fis');

// var states = {
//     'start_label',
//     'read_label',
//     'end_label',
//     'read_content'
// };

var none_end_lables = ['#else', '#set', '#elseif', '#stop', '#include', '#parse'];

var current_state = 'read_content';
var stack = [];
var res = [];
var END_LABEL = '#end';

var current_label = {
    start : null,
    end : null,
    content_array : [],
    content_str : []
};

module.exports = function(content){
    var reg = /(\#\#[^\r\n\f]+|\#\*[\s\S]+?(?:\*\#|$))/ig;
    var comment_array = [];
    while((result = reg.exec(content)) !== null){
        var r = [];
        r.start = result.index;
        r.end = result.index + result[0].length - 1;
        r.content = result[0];
        comment_array.push(r);
    }
    console.log(comment_array);
    for(var i = 0; i < content.length; i++){
        var char = content.toString().charAt(i);
        for(var j = 0; j < comment_array.length; j++){
            if(i == comment_array[j].start - 1){
                i = comment_array[j].end;
                break;
            }
        }
        console.log("befor : " + current_state);
        console.log(char);
        switch(char){
            case '#':
                if(current_state == 'read_content'){
                    current_state = 'start_label';
                    current_label.content_array.push(char);
                    current_label.start = i;
                } 
                break;
            case '(':
                if(current_state == 'read_label'){
                    end_label(i);
                }
                break;
            case '\s':
                if(current_state == 'read_label'){
                   end_label(i);
                }else if(current_state == 'start_label'){
                    current_state = 'read_content';
                }
                break;
            case '\n':
                if(current_state == 'read_label'){
                   end_label(i);
                } else if(current_state == 'start_label'){
                    current_state = 'read_content';
                }
                break;
            case '\r\n':
                if(current_state == 'read_label'){
                    end_label(i);
                } else if(current_state == 'start_label'){
                    current_state = 'read_content';
                }
                break;
            default:
                if(current_state == 'read_label'){
                    current_state = 'read_label';
                    current_label.content_array.push(char);
                } else if(current_state == 'start_label'){
                    current_state = 'read_label';
                    current_label.content_array.push(char);
                }else if(current_state == 'end_label'){
                    current_state = 'read_content';
                }
                break;
        }
        console.log("after : " + current_state);

    }

    return res;
}

function push(label){
    if(inArray(label.content_str, none_end_lables)){
        return;
    } else if(label.content_str == END_LABEL){
        var before_label = stack.shift();
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        console.log(stack);
        console.log(before_label);
        var r = {};
        r.start_label = before_label.content_str;
        r.end_label = END_LABEL;
        r.start_index = before_label.start;
        r.content_start_index = before_label.end + 1;
        r.content_end_index = label.start - 1;
        r.end_index = label.end;
        res.push(r);
    } else {
        console.log('&&&&&');
        stack.unshift(label);
        console.log(stack);
    }
    console.log(stack);
}

function end_label(index){
    current_state = 'end_label';
    current_label.end = index - 1;
    current_label.content_str = current_label.content_array.join('');
    push(current_label);
    revert_current_label();
}

function revert_current_label(){
    current_label.content_array = [];
    current_label.content_str = '';
    current_label.start = null;
    current_label.end = null;
}

function isStackEmpty(s){
    return s.length == 0;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}