U.Style.RegularShape = U.Style.Image.extend({
    init:function (options) {
        var opts = options || {};

        this.points = opts.points !== undefined ? opts.points : [];
        this.innerRadius = options.innerRadius;
        this.radius = options.radius !== undefined ? options.radius : options.innerRadius;
        this.outerRadius = options.outerRadius !== undefined ? options.outerRadius : this.radius;
    }
})