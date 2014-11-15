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
 *  架构: 1. 给按键起名字
 *	  2. 编写一个判断工具,判断数组钟师傅存在某元素
 *	  3. 寻找页面中data-hotkey的元素属性
 *	  4. 定义keyup,keydown,keypress 三中事件
 * 	  5. 申明对象,将对象抛出
 * @author Ryan724
 * @version 1.1.0
 */
(function(window) {	

	if(typeof window.KeyUtils != "undefined") {
	    var _KeyUtils = window.KeyUtils;
	}
	var event_map      =new Array();
	var keyArr=[];//存储按键
	var current_keys = {};
	//快捷键组合按键--这个暂时没有用到！要考虑k,与组合k按键的调用情况，需要好好想
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
	//读取页面data-hotkey标签
	var nodeArr =$("[data-hotkey]");
	//存id ，和
	var map =[];
	for(var i = 0 ; i<nodeArr.length;i++){
		var hotDataArr = $(nodeArr[i]).attr("data-hotkey").split(",");
		if(hotDataArr[0].toUpperCase().indexOf("+")>0){
			map[hotDataArr[0].toUpperCase().split("+").sort().join("+")] =[$(nodeArr[i]).attr("id"),hotDataArr[1]];
		}
	}
	console.log(map);
	// for(var node in nodeArr){
	// 	var nodeCode =$(node).attr("id");
	// 	console.log("       "+nodeArr);
	// 	var hotDataArr = $(node).attr("data-hotkey").split(",");
	// 	//console.log(hotDataArr[0].toUpperCase());
	// 	currentName =hotDataArr[0].toUpperCase().split("+").sort().join("+");
	// 	//console.log(nodeCode+"-------"+currentName);
	// 	event_map[currentName] = function(currentName){
	// 		$("#"+nodeCode).trigger(hotDataArr[1]);
	// 	};
	// 	console.log(event_map);
	// }
	
	console.log(event_map);
	//bind事件

	document.onkeyup=function(e){
		var c = e.keyCode;
		var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
		 delete current_keys[key_name];
		 keyArr=new Array();
		 console.log(keyArr);
	};
	//onkeypress	这个事件在用户按下并放开任何字母数字键时发生。系统按钮（例如，箭头键和功能键）无法得到识别。
	document.onkeypress = function(e) {
		e.preventDefault();//取消事件的默认动作 
        return false;
	};
	
	//按下一个键，然后存储一次，放开，释放这个按键
	document.onkeydown = function(e) {
		var c = e.keyCode;
		var key_name = key_names[c] || fn_name(c) || num_name(c) || String.fromCharCode(c);
		console.log(keyArr);
		console.log("||||"+key_name);
		//如果key_name是assist_key中的任一个时，加入到keyArr当中
		if(current_keys[key_name]==null) current_keys[key_name]=key_name;
		console.log(current_keys);
		for(var m in current_keys){
			if(!isInArray(m,keyArr))keyArr.push(m);
			console.log("-------------------------");
			console.log(keyArr);
		}
		console.log(keyArr);
		//判断是否存在以keyArr.sort().join("+")为key的value
		if(keyArr.length===1){
			if(event_map[keyArr[0]]!=undefined){
				event_map[keyArr[0]](keyArr[0]);
			}
		}else{
			if(map[keyArr.sort().join("+")]!=undefined){
				var zz =map[keyArr.sort().join("+")];
				current_keys=[];
				$("#"+zz[0]).trigger(zz[1]);
			}
			if(event_map[keyArr.sort().join("+")]!=undefined){
				event_map[keyArr.sort().join("+")](keyArr.sort().join("+"));
			}
		}
		
	};

	var KeyUtils = window.KeyUtils = window.k ={
		bind:function(keyName,callback){
			event_map[keyName.toUpperCase().split("+").sort().join("+")]=callback;	
		},
		unbind:function(keyName){
			event_map[keyName.toUpperCase()]=null;
		}
	};
})(window);
