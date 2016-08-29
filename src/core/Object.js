U.Obj = {
    // Create a new function as object.
    create: Object.create || function(proto) {
        function F() {};
        F.prototype = proto;
        return new F();
    },

    // Combines the properties of the `src` object (or multiple objects) into `dest` object and returns the latter.
    extend: function(dist) {
        var i, j, len, src;

        // Add the second and later arguments' properties to the first argument.
        for(i = 1, len = arguments.length; i < len; i++) {
            src = arguments[i];

            for(j in src) {
                dist[j] = src[j];
            }
        }

        return dist;
    },

    // Binds the input 'obj' arguments to the specific function, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
    bind: function (fn, obj) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    },

    // Combines the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `U.setOptions` shortcut.
    setOptions: function (obj, options) {
        if (!obj.hasOwnProperty('options')) {
            obj.options = obj.options ? U.Util.create(obj.options) : {};
        }
        for (var i in options) {
            obj.options[i] = options[i];
        }
        return obj.options;
    }
};