var none_end_lables = ['#else', '#set', '#elseif', '#stop', '#include', '#parse', '#require', '#widget', '#uri'];

var END_LABEL = '#end';

var label = function(){
    this.start = null;
    this.end = null;
    this.content_array = [];
    this.content_str = '';
}

module.exports = function(content, conf){
   //todo merge conf中配置的velocity中无end结尾的标签

    var reg = /(\#\#[^\r\n\f]+|\#\*[\s\S]+?(?:\*\#|$))/ig;
    var current_state = 'read_content';
    var stack = [];
    var res = [];
    var comment_array = [];
    var result;
    
    while((result = reg.exec(content)) !== null){
        var r = [];
        r.start = result.index;
        r.end = result.index + result[0].length - 1;
        r.content = result[0];
        comment_array.push(r);
    }
    for(var i = 0; i < content.length; i++){
        var char = content.toString().charAt(i);
        for(var j = 0; j < comment_array.length; j++){
            if(i == comment_array[j].start - 1){
                i = comment_array[j].end;
                break;
            }
        }

        // console.log("befor : " + current_state);
        // console.log(i + ':    '+  char);

        switch(true){
            case (char == '#'):
                if(current_state == 'read_content' || 'end_label'){
                    current_state = 'start_label';
                    var current_label = new label();
                    current_label.content_array.push(char);
                    current_label.start = i;
                } 
                break;
            case (char == '('):
                if(current_state == 'read_label'){
                    end_label(i);
                }
                break;
            case (/(\s|\t|\n|\r\n|\f)/.test(char)):
                if(current_state == 'read_label'){
                    end_label(i);
                }else if(current_state == 'start_label' || 'end_label'){
                    current_state = 'read_content';
                }
                break;
            default:
                if(current_state == 'read_label' || current_state == 'start_label'){
                    current_state = 'read_label';
                    current_label.content_array.push(char);
                } else if(current_state == 'end_label'){
                    current_state = 'read_content';
                }
                break;
        }
        // console.log("after : " + current_state);
    }

    return res;

    function push_stack(){
        if(inArray(current_label.content_str, none_end_lables)){
            return;
        } else if(current_label.content_str == END_LABEL){
            var before_label = stack.shift();
            var r = {};
            r.start_label = before_label.content_str;
            r.end_label = END_LABEL;
            r.start_index = before_label.start;
            r.content_start_index = before_label.end + 1;
            r.content_end_index = current_label.start - 1;
            r.end_index = current_label.start;
            res.push(r);
        } else {
            stack.unshift(current_label);
        }
        delete current_label;
    }

    function end_label(index){
        current_state = 'end_label';
        current_label.end = index - 1;
        current_label.content_str = current_label.content_array.join('');
        push_stack();
    }
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