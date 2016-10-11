U.Line = U.Curve.extend({
    getVertices: function (endPointsOnly) {
        var vertices;
        if (endPointsOnly === true) {
            vertices = [
                this.geometries[0],
                this.geometries[this.geometries.length - 1]
            ];
        } else if (endPointsOnly === false) {
            vertices = this.geometries.slice(1, this.geometries.length - 1);
        } else {
            vertices = this.geometries.slice();
        }
        return vertices;
    }
})