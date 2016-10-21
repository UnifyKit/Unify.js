U.Style.Icon = U.Style.Image.extend({
    init: function (options) {
        var opts = options || {};

        this.src = opts.src !== undefined ? opts.src : null;
        this.imgSize = options.imgSize !== undefined ? options.imgSize : null;
        this.offset = options.offset !== undefined ? options.offset : [0, 0];
    }
})