// Define the class as function to make sure we can create instance using 'new'
U.Class = function () {
};

// Used for inherit
U.Class.extend = function (props) {

    // Returns a Javascript function that is a class constructor (to be called with `new`).
    var NewClass = function () {
        if (this.init) {
            this.init.apply(this, arguments);
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
    for (i in this) {
        if (this.hasOwnProperty(i) && i != 'prototype' && i != '__base__') {
            NewClass[i] = this[i];
        }
    }

    // mix static properties into the class
    if (props.statics) {
        U.Obj.extend(NewClass, props.statics);
        delete props.statics;
    }

    // merge options
    if (proto.options) {
        proto.options = U.Obj.extend(U.Obj.create(proto.options), props.options);
        delete props.options;
    }

    // merge options
    U.Obj.extend(proto, props);

    return NewClass;
};

U.Class.apply = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        var sourceIsEvt = typeof window.Event == "function"
            && source instanceof window.Event;

        if (!sourceIsEvt
            && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
}