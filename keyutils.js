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
	//1. 传入key的code，返回确定的字符
	var getKeyName =function(code){
		var key_names = {
			8: 'BACKSPACE',9: 'TAB',13: 'ENTER',16: 'SHIFT',17: 'CTRL',18: 'ALT',19: 'PAUSE',
			20: 'CAPS_LOCK',27: 'ESCAPE',32: 'SPACE',33: 'PAGE_UP',34: 'PAGE_DOWN',35: 'END',
			36: 'HOME',37: 'LEFT',38: 'UP',39: 'RIGHT',40: 'DOWN',45: 'INSERT',46: 'DELETE',
			144: 'NUM_LOCK',145: 'SCROLL_LOCK',222: "'"
		};
		//字母和数字键的键码值
		var num1_name={48:'0',49:'1', 50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9'};
		var letter_name={65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H', 73:'I',74:'J',
	        	  		 75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',
	        	  		 85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z'};
	    // 数字键盘上的键的键码值
	    var num_name={96:'NUM0',97:'NUM1',98:'NUM2',99:'NUM3',100:'NUM4',101:'NUM5',102:'NUM6',		 	 	 	 
					  103:'NUM7',104:'NUM8',105:'NUM9',106:'NUM*',107:'NUM+',108:'NUMENTER',	
					  109:'NUM-',110:'NUM.',111:'NUM/'};
		//功能键键码值
		var fn_name={112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',118:'F7',	
					 119:'F8',120:'F9',121:'F10',122:'F11',123:'F12'};
		//控制键键码值
		var cont_name={8:'BACKSPACE',9:'TAB',12:'CLEAR',13:'ENTER',16:'SHIFT',17:'CTRL',		
					   18:'ALT',20:'CAPE_LOCK',27:'ESC',32:'SPACEBAR',33:'PAGE_UP',34:'PAGE_DOWN',		
					   35:'END',36:'HOME',37:'LEFT',38:'UP',39:'RIGHT',40:'DOWN',45:'INSERT',	
					   46:'DELETE',144	:'NUM_LOCK',	
					   186:';',187:'=',188:',',189:'-',190:'.',191:'/',192:'`',219:'[',220:"\\",	
					   221:']',222:"'"};
		if(code>47&&code<58){return num1_name[code];}
		else if(code>64&&code<91){return letter_name[code];}
		else if(code>95&&code<112){return num_name[code];}
		else if(code>111&&code<124){return fn_name[code];}
		else {return cont_name[code]};
	};
	var event_map      =new Array();
	var keyArr=[];//存储按键
	var current_keys = {};
	//快捷键组合按键--这个暂时没有用到！要考虑k,与组合k按键的调用情况，需要好好想
	var assist_key=["SHIFT","ALT","CTRL","SPACE"];
	//读取自定义属性data-hotkey
	var  hotkeyArr = new Array;
	//$('[data-hotkey]').each(function(i, element) {hotkeyArr.push(element);});
	
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
