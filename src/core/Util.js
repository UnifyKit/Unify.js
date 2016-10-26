U.Util = {
    // Last unique ID
    uId: 0,

    EPSILON: Number.EPSILON || 1e-14,

    // Creates a unique ID of an object, assiging it one if it doesn't have it.
    stamp: function (obj) {
        obj._unify_id = obj._unify_id || ++U.Util.uId;
        return obj._unify_id;
    },

    noop: function () {
    },

    getValueOrDefault: function (value, defaultValue) {
        return value === undefined ? defaultValue : value;
    },

    // Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
    formatNum: function (num, digits) {
        var pow = Math.pow(10, digits || 5);
        return Math.round(num * pow) / pow;
    },

    // Removes the specific 'str' from both ends of a string.
    trim: function (str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    },

    // Trims and splits the string on whitespace and returns the array of parts.
    splitWords: function (str) {
        return U.Util.trim(str).split(/\s+/);
    },

    //-- Math methods
    isArray: Array.isArray || function (obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    },

    removeItem: function (array, item) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] == item) {
                array.splice(i, 1);
            }
        }
        return array;
    },

    indexOf: function (array, el) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === el) {
                return i;
            }
        }
        return -1;
    },

    isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    almostEquals: function (x, y, epsilon) {
        return Math.abs(x - y) < epsilon;
    },

    max: function (array) {
        return array.reduce(function (max, value) {
            if (!isNaN(value)) {
                return Math.max(max, value);
            } else {
                return max;
            }
        }, Number.NEGATIVE_INFINITY);
    },

    min: function (array) {
        return array.reduce(function (min, value) {
            if (!isNaN(value)) {
                return Math.min(min, value);
            } else {
                return min;
            }
        }, Number.POSITIVE_INFINITY);
    },

    sign: Math.sign ? function (x) {
        return Math.sign(x);
    } : function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    },

    log10: Math.log10 ? function (x) {
        return Math.log10(x);
    } : function (x) {
        return Math.log(x) / Math.LN10;
    },

    toRadians: function (degrees) {
        return degrees * (Math.PI / 180);
    },

    toDegrees: function (radians) {
        return radians * (180 / Math.PI);
    },

    // Gets the angle from vertical upright to the point about a centre.
    getAngleFromPoint: function (centrePoint, anglePoint) {
        var distanceFromXCenter = anglePoint.x - centrePoint.x,
            distanceFromYCenter = anglePoint.y - centrePoint.y,
            radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

        var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

        if (angle < (-0.5 * Math.PI)) {
            angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
        }

        return {
            angle: angle,
            distance: radialDistanceFromCenter
        };
    },

    getElement: function () {
        var elements = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = arguments[i];
            if (typeof element == 'string') {
                element = document.getElementById(element);
            }
            if (arguments.length == 1) {
                return element;
            }
            elements.push(element);
        }
        return elements;
    },

    // Data URI string containing a base64-encoded empty png image.
    // Used as a hack to free memory from unused images on WebKit-powered
    // mobile devices (by setting image `src` to this string).
    emptyImageUrl: 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};