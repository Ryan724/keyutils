var getKeyName = require("./KeyName");
var Events = require("./Events");
function KeyUtils(){
	this.events = Events;
	this.currentKeys = [];//存储当前按键
}
KeyUtils.prototype={
	initialize:function(){
		document.addListener("keyup",this.doKeyUp);
		document.addListener("keydown",this.doKeyUp);
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
		this.events.on(eventName,callback);
	},

	unbind:function(eventName){
		this.events.off(eventName)
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
			return data.sort().join("+");
		}
	}
}
module.exports =  new KeyUtils();
