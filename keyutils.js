/* keyUtils 是用js对键盘事件的监听
 * 依赖于jquery-1.7.0.js
 * 使用方法：
 *		1. 给按键绑定特定函数，例如：
 *				k.keyup("shift",function(){
 *					//your code .....
 *				});
 *		2. 在html页面元素中使用data-hotkey属性，并为该元素定义执行函数.例如：
 *			<button id="btn" data-hotkey="shift+k,click"></button>
 *          当快捷键按下时，keyButils会自动触发其绑定事件的执行函数
 *---------------------------------------------------------------------
 * @author Ryan724
 * @version 1.1.x
 */
(function(window) {	
	if(typeof window.KeyUtils != "undefined") {
	    var _KeyUtils = window.KeyUtils;
	}
	//快捷键组合按键
	var assist_key=["shift","alt","ctrl","space"];
	//读取自定义属性data-hotkey
	var  hotkeyArr = new Array;
	//$('[data-hotkey]').each(function(i, element) {hotkeyArr.push(element);});
	var key_names = {
		8: 'BACKSPACE',9: 'TAB',13: 'ENTER',16: 'SHIFT',17: 'CTRL',18: 'ALT',19: 'PAUSE',
		20: 'CAPS_LOCK',27: 'ESCAPE',32: 'SPACE',33: 'PAGE_UP',34: 'PAGE_DOWN',35: 'END',
		36: 'HOME',37: 'LEFT',38: 'UP',39: 'RIGHT',40: 'DOWN',45: 'INSERT',46: 'DELETE',
		144: 'NUM_LOCK',145: 'SCROLL_LOCK',222: "'"
	};
	//F1~F12
	function fn_name(code) {
	    return (code >= 112 && code <= 123)?'F' + (code - 111):false;
	};
	//数字键盘按键
	function num_name(code) {
	    if(code >= 96 && code < 106) return 'Num' + (code - 96);
	    switch(code) {
	        case 106: return 'Num*';
	        case 111: return 'Num/';
	        case 110: return 'Num.';
	        default: return false;
	    }
	};
	//绑定事件
	var event_list_up=new Array();
	var event_list_down=new Array();
	var event_list_press=new Array();
	document.onkeyup=function(e){
		var c = e.keyCode;
		var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
			//judge existed value in event_list_up by key_name
			if(event_list_up[key_name]!=undefined){
				event_list_up[key_name](key_name);
			}
	};
	document.onkeypress = function(e) {};
	document.onkeydown = function(e) {};

	var KeyUtils = window.KeyUtils = window.k ={
		keyUp:function(keyName,callback){
			event_list_up[keyName.toUpperCase()]=callback;	
		},
		keyDown:function(keyName,callback){
			event_list_down[keyName.toUpperCase()]=callback;
		},	
		keyPress:function(keyName,callback){
			event_list_press[keyName.toUpperCase()]=callback;
		},
		unKeyUp:function(keyName){
			event_list_up[keyName.toUpperCase()]=null;	
		},
		unKeyDown:function(keyName){
			event_list_down[keyName.toUpperCase()]=null;
		},
		unKeyPress:function(keyName){
			event_list_press[keyName.toUpperCase()]=null;
		}
	};
})(window);