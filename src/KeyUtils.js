var EventEmitter = require('wolfy87-eventemitter');
var KeyName = require("./KeyName");
function KeyUtils(node){
	var node = node||document,
	eventMap   =[],
	current_keys = [];//存储当前按键
	keyArr=[];//存储按键
}
KeyUtils.prototype={
	initialize:function(){
		this.event = new EventEmitter();
	},
	doKeyUp:function(){},
	doKeyDown:function(){},
	bind:function () {

	},
	unbind:function(){

	},
	bulidKeyName:function(name){
		if(typeof name === "string"){
			return name.toUpperCase().split("+").sort().join("+");
		}
		if(name instanceof  Array){
			for(var i=0;i<name.length;i++) name[i]=name[i].toUpperCase();
			return data.sort().join("+");
		}
	}
}
module.exports = (function(node){
	return new KeyUtils(node);
})(node)