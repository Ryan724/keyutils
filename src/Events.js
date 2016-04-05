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