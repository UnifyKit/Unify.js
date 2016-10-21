U.Style = U.Class.extend({
    init: function (options) {
        var opts = options || {};

        this.geometry = opts.geometry !== undefined ? opts.geometry : null;
        this.fill = opts.fill !== undefined ? opts.fill : null;
        this.image = opts.image !== undefined ? opts.image : null;
        this.stroke = opts.stroke !== undefined ? opts.stroke : null;
        this.text = opts.text !== undefined ? opts.text : null;
        this.zIndex = opts.zIndex;
    }
})