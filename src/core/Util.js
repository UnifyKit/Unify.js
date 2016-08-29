U.Util = {
    // Last unique ID
    lastId: 0,

    // Creates a unique ID of an object, assiging it one if it doesn't have it.
    stamp: function (obj) {
        obj._unify_id = obj._unify_id || ++U.Util.lastId;
        return obj._unify_id;
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

    isArray: Array.isArray || function (obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    },

    indexOf: function (array, el) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === el) { return i; }
        }
        return -1;
    },

    // Data URI string containing a base64-encoded empty GIF image.
    // Used as a hack to free memory from unused images on WebKit-powered
    // mobile devices (by setting image `src` to this string).
    emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};