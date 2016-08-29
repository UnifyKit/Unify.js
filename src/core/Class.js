

U.Class = function() {};

U.Class.extend = function(props) {

    // Returns a Javascript function that is a class constructor (to be called with `new`).
    var NewClass = function() {
        if(this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };

    /*
     * NewClass.__root__ points to Object's prototype
     * NewClass__base__ points to its parent's prototype
     */
    var parentProto = NewClass.__root__ = NewClass.__base__ = this.prototype;
    var proto = U.Obj.create(parentProto);
    proto.constructor = NewClass;
    NewClass.prototype = proto;

    // inherit parent's statics
    var i;
    for(i in this) {
        if(this.hasOwnProperty(i) && i != 'prototype' && i != '__base__') {
            NewClass[i] = this[i];
        }
    }

    // mix static properties into the class
    if(props.statics) {
        U.Obj.extend(NewClass, props.statics);
        delete props.statics;
    }

    // merge options
    if(proto.options) {
        proto.options = U.Obj.extend(U.Obj.create(proto.options), props.options);
        delete props.options;
    }

    // merge options
    U.Obj.extend(proto, props);

    return NewClass;
};