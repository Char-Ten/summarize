(function(root, fn) {
    if (typeof define === 'function' && define.amd) {
        define(fn);
    } else if (typeof exports === 'object') {
        module.exports = fn();
    } else {
        root.Ent = fn();
    }
})(this, function() {
    /*
     * Ent
     * var ENT=new Ent();
     * ENT.on(str,fn);
     * ENT.emit(str,arg);
     * ENT.set(str,data);
     * ENT.get(str);
     */
    function Main() {
        this.events = {};
        this.data = {};
    }
    Main.prototype = {
        constructor: Main,
        on: function(eventName, handle) {
            if (typeof eventName !== 'string') {
                console.error('The EventName mast be String!');
                return this;
            }
            if (typeof handle !== 'function') {
                console.error('The EventHandle mast be Function!');
                return this;
            }
            if (this.events[eventName]) {
                this.events[eventName].push(handle);
            } else {
                this.events[eventName] = [handle];
            }
            return this;
        },
        emit: function(eventName) {
            var self = this;
            var arg = [];
            if (this.events[eventName]) {
                for (var i = 1; i < arguments.length; i++) {
                    arg.push(arguments[i]);
                }
                this.events[eventName].forEach(function(handle) {
                    handle.apply(self, arg);
                })
            }
        }
    }
})