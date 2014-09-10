(function(window) {
if(typeof window.KeyUtils != "undefined") {
    var _KeyUtils = window.KeyUtils;
}
var key_names = {
	8: 'BACKSPACE',
	9: 'TAB',
	13: 'ENTER',
	16: 'SHIFT',
	17: 'CTRL',
	18: 'ALT',
	19: 'PAUSE',
	20: 'CAPS_LOCK',
	27: 'ESCAPE',
	32: 'SPACE',
	33: 'PAGE_UP',
	34: 'PAGE_DOWN',
	35: 'END',
	36: 'HOME',
	37: 'LEFT',
	38: 'UP',
	39: 'RIGHT',
	40: 'DOWN',
	45: 'INSERT',
	46: 'DELETE',
	144: 'NUM_LOCK',
	145: 'SCROLL_LOCK',
	222: "'"
};
//F1~F12
function fn_name(code) {
    return (code >= 112 && code <= 123)?'F' + (code - 111):false;
};
//the key of numeric keyboard
function num_name(code) {
    if(code >= 96 && code < 106) return 'Num' + (code - 96);
    switch(code) {
        case 106: return 'Num*';
        case 111: return 'Num/';
        case 110: return 'Num.';
        default: return false;
    }
};
var event_list=new Array();
document.onkeyup=function(e){
	var c = e.keyCode;
	var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
		//judge existed value in event_list by key_name
		if(event_list[key_name]!=undefined){
			event_list[key_name](key_name);
		}
}

var KeyUtils = window.KeyUtils = window.k ={
	up:function(keyName,callback){
		event_list[keyName.toUpperCase()]=callback;	
	},
	down:function(keyName,callback){
		document.onkeyup=function(e){
			//.......
		}
	}
};

})(window);