U.Animation = U.Class.extend({

    initialize: function (start, end, tween) {
        this.start = start;
        this.end = end;
        this.tween = tween || U.Tween.Linear;
    },

    start: function () {
    },

    stop: function () {
    },

    //Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimFrame: (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })(),

    cancelAnimFrame: (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function (callback) {
                return window.clearTimeout(callback, 1000 / 60);
            };
    })()
});