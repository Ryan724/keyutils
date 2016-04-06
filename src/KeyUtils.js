var getKeyName = require("./KeyName");
var Events = require("./Events");
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
