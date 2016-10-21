U.Style.Image = U.Style.extend({
    init: function (options) {
        var opts = options || {};

        this.opacity = opts.opacity !== undefined ? opts.opacity : 1;
        this.rotation = opts.rotation !== undefined ? opts.rotation : 0;
        this.scale = opts.scale !== undefined ? opts.scale : 1;
    }
})