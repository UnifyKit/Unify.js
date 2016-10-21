U.Style.Text = U.Style.extend({
    init: function (options) {
        var opts = options || {};

        this.text = opts.text;
        this.font = opts.font;
        this.rotation = opts.rotation;
        this.scale = opts.scale;
        this.textAlign = opts.textAlign;
        this.textBaseline = opts.textBaseline;
        this.fill = opts.fill !== undefined ? opts.fill : new U.Style.Fill({color: '#333'});
        this.offsetX = opts.offsetX !== undefined ? opts.offsetX : 0;
        this.offsetY = opts.offsetY !== undefined ? opts.offsetY : 0;
    }
})