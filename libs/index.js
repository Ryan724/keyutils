(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var keyutils = __webpack_require__(1);
	module.exports ={keyutils:keyutils};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var getKeyName = __webpack_require__(2);
	var Events = __webpack_require__(3);
	function KeyUtils(){
		this.events = Events;
		this.currentKeys = [];//存储当前按键
		return this.initialize();
	}
	KeyUtils.prototype={
		initialize:function(){
			var self =this;
			document.addEventListener("keyup",function(){
				self.doKeyUp.apply(self,arguments)
			});
			document.addEventListener("keydown",function(){
				self.doKeyDown.apply(self,arguments)
			});
			return this;
		},

		doKeyUp:function(e){
			var keyName =getKeyName(e.keyCode);
			this.removeUpkey(keyName);
		},

		doKeyDown:function(e){
			var keyName =getKeyName(e.keyCode);
			var currentKeys=this.getCurrentKeys();
			var index = currentKeys.indexOf(keyName);
			if(index===-1) currentKeys.push(keyName);
			this.events.trigger(this.bulidKeyName(currentKeys));
		},

		bind:function (eventName,callback) {
			this.events.on(this.bulidKeyName(eventName),callback);
		},

		unbind:function(eventName){
			this.events.off(this.bulidKeyName(eventName))
		},

		removeUpkey:function(keyName){
			var currentKeys=this.getCurrentKeys();
			var index = currentKeys.indexOf(keyName);
			if(index!==-1) currentKeys.splice(index, 1);
		},

		getCurrentKeys:function(){
			return this._currentKeys||(this._currentKeys=[])
		},

		bulidKeyName:function(name){
			if(typeof name === "string"){
				return name.toUpperCase().split("+").sort().join("+");
			}
			if(name instanceof  Array){
				for(var i=0;i<name.length;i++) name[i]=name[i].toUpperCase();
				return name.sort().join("+");
			}
		}
	}
	module.exports =  new KeyUtils();


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(code){
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
			//字母和数字键的键码值
		var num1_name = {
			48: '0',
			49: '1',
			50: '2',
			51: '3',
			52: '4',
			53: '5',
			54: '6',
			55: '7',
			56: '8',
			57: '9'
		};
		var letter_name = {
			65: 'A',
			66: 'B',
			67: 'C',
			68: 'D',
			69: 'E',
			70: 'F',
			71: 'G',
			72: 'H',
			73: 'I',
			74: 'J',
			75: 'K',
			76: 'L',
			77: 'M',
			78: 'N',
			79: 'O',
			80: 'P',
			81: 'Q',
			82: 'R',
			83: 'S',
			84: 'T',
			85: 'U',
			86: 'V',
			87: 'W',
			88: 'X',
			89: 'Y',
			90: 'Z'
		};
		// 数字键盘上的键的键码值
		var num_name = {
			96: 'NUM0',
			97: 'NUM1',
			98: 'NUM2',
			99: 'NUM3',
			100: 'NUM4',
			101: 'NUM5',
			102: 'NUM6',
			103: 'NUM7',
			104: 'NUM8',
			105: 'NUM9',
			106: 'NUM*',
			107: 'NUM+',
			108: 'NUMENTER',
			109: 'NUM-',
			110: 'NUM.',
			111: 'NUM/'
		};
		//功能键键码值
		var fn_name = {
			112: 'F1',
			113: 'F2',
			114: 'F3',
			115: 'F4',
			116: 'F5',
			117: 'F6',
			118: 'F7',
			119: 'F8',
			120: 'F9',
			121: 'F10',
			122: 'F11',
			123: 'F12'
		};
		//控制键键码值
		var cont_name = {
			8: 'BACKSPACE',
			9: 'TAB',
			12: 'CLEAR',
			13: 'ENTER',
			16: 'SHIFT',
			17: 'CTRL',
			18: 'ALT',
			20: 'CAPE_LOCK',
			27: 'ESC',
			32: 'SPACEBAR',
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
			186: ';',
			187: '=',
			188: ',',
			189: '-',
			190: '.',
			191: '/',
			192: '`',
			219: '[',
			220: "\\",
			221: ']',
			222: "'"
		};
		if (code > 47 && code < 58) {
			return num1_name[code];
		} else if (code > 64 && code < 91) {
			return letter_name[code];
		} else if (code > 95 && code < 112) {
			return num_name[code];
		} else if (code > 111 && code < 124) {
			return fn_name[code];
		} else {
			return cont_name[code]
		};
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = new Events();
	/**
	 * The data structure is used to  manager event and callback
	 * events:{
	 * 		eventName:[listener,listener....]
	 * }
	 */
	function Events(){};

	var proto = Events.prototype;

	function alias(name){
		return function aliasClosure(){
			this[name].apply(this,arguments);
		}
	};

	proto.getListeners = function(eventName){
		var events = this.getEvents();
		return events[eventName] ||(events[eventName] = []);
	};

	proto.addListener = function(eventName,listener){
		var listeners = this.getListeners(eventName);
		listeners.push(listener);
	};

	proto.removeListener =function(eventName,listener) {
		var listeners = this.getListeners(eventName);
		index = indexOfListener(listeners, listener);
	    if (index !== -1) listeners[key].splice(index, 1);
	};

	proto.removeEvents = function(eventName){
		var events = this.getEvents();
		delete events[eventName];
	};

	proto.getEvents = function(){
		return this._events||(this._events={});
	};

	proto.emitEvent = function(eventName,args){
		var listeners = this.getListeners(eventName);
		var i = listeners.length;
		while(i--){
			listeners[i].apply(this,args);
		}
	};

	proto.trigger=alias("emitEvent");
	proto.on = alias("addListener");
	proto.off =alias("removeEvents")

/***/ }
/******/ ])
});
;