U.Circle = U.Arc.extend({
    init: function(center, radius) {
        this.vertexes = [center];
        this.center=center;
        this.radius = radius;
    }
})