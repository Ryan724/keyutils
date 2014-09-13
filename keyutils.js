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
 *--------------------------------------------------------------------
 * @author Ryan724
 * @version 1.1.x
 */
(function(window) {	
	if(typeof window.KeyUtils != "undefined") {
	    var _KeyUtils = window.KeyUtils;
	}
	//快捷键组合按键
	var assist_key=["SHIFT","ALT","CTRL","SPACE"];
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
	//判断数组当中是否存在某元素
	var isInArray=function(str,arr){
	  var i = arr.length; 
	  while (i--) { 
	    if (arr[i] === str) { 
					 return true; 
				} 
			}
			return false;
		};
	//bind事件
	var event_map      =new Array();
	var event_map_up   =new Array();
	var event_map_down =new Array();
	var event_map_press=new Array();
	/**
	onkeypress
		这个事件在用户按下并放开任何字母数字键时发生。系统按钮（例如，箭头键和功能键）无法得到识别。
	onkeyup
		这个事件在用户放开任何先前按下的键盘键时发生。
	onkeydown
		这个事件在用户按下任何键盘键时发生。
	**/
	var keyArr=[];//存储按键
	var current_keys = {};
	document.onkeyup=function(e){
		var c = e.keyCode;
		var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
		 delete current_keys[key_name];
		 keyArr=[];
		//console.log(JSON.stringify(current_keys));
	};
	document.onkeypress = function(e) {
		e.preventDefault();//取消事件的默认动作 
        return false;
	};
	
	//按下一个键，然后存储一次，放开，释放这个按键
	document.onkeydown = function(e) {		
		var c = e.keyCode;
		var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
		//如果key_name是assist_key中的任一个时，加入到keyArr当中
		//if(isInArray(key_name.toUpperCase(),assist_key)&&!isInArray(key_name.toUpperCase(),keyArr)){
			//keyArr.push(key_name);
		//}
		if(current_keys[key_name]==null) current_keys[key_name]=key_name;
		for(var m in current_keys){
			if(!isInArray(m,keyArr))keyArr.push(m);
		}
		console.log(keyArr.join("+"));
		//判断是否存在以key_name为key的value
		if(event_map_up[key_name]!=undefined){
			event_map_up[key_name](key_name);
		}
	};

	var KeyUtils = window.KeyUtils = window.k ={
		keyUp:function(keyName,callback){
			event_map_up[keyName.toUpperCase()]=callback;	
		},
		keyDown:function(keyName,callback){
			event_map_down[keyName.toUpperCase()]=callback;
		},	
		keyPress:function(keyName,callback){
			event_map_press[keyName.toUpperCase()]=callback;
		},
		unKeyUp:function(keyName){
			event_map_up[keyName.toUpperCase()]=null;	
		},
		unKeyDown:function(keyName){
			event_map_down[keyName.toUpperCase()]=null;
		},
		unKeyPress:function(keyName){
			event_map_press[keyName.toUpperCase()]=null;
		},
		bind:function(keyName,callback){
			event_map[keyName.toUpperCase()]=callback;	
		},
		unbind:function(keyName){
			event_map[keyName.toUpperCase()]=null;
		}
	};
})(window);
