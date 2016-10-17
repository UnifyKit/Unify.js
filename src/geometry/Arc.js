U.Arc = U.Geometry.extend({
    init: function (center, radius, startAngle, endAngle, counterclockwise) {
        this.vertexes = [center];
        this.center = center;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.counterclockwise = counterclockwise;
    },

    getPerimeter: function () {
        return 2 * Math.PI * this.radius;
    },

    getArea: function () {
        return Math.PI * Math.pow(this.radius, 2);
    },

    resize: function (multiple) {
        this.radius *= multiple;
    }
})