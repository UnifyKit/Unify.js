U.Style.Circle = U.Style.Image.extend({
    init: function (options) {
        var opts = options || {};

        this.fill = opts.fill !== undefined ? opts.fill : new U.Style.Fill({color: "#FFFFFF"});
        this.stroke = opts.stroke !== undefined ? opts.stroke : new U.Style.Stroke({color: "#000000"});
        this.radius = opts.radius !== undefined ? opts.radius : 2;
    }
})