U.Style.Stroke = U.Style.extend({
    init: function (options) {
        var opts = options || {};

        this.color = opts.color !== undefined ? opts.color : null;
        this.lineCap = opts.lineCap !== undefined ? opts.lineCap : 'round';
        this.lineDash = opts.lineDash !== undefined ? opts.lineDash : null;
        this.lineJoin = opts.lineJoin !== undefined ? opts.lineJoin : 'round';
        this.miterLimit = opts.miterLimit !== undefined ? opts.miterLimit : 10;
        this.width = opts.width;
    }
})