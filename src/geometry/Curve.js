U.Curve = U.Collection.extend({
    getLength: function () {
        var length = 0.0;
        if (this.geometries && (this.geometries.length > 1)) {
            for (var i = 1, len = this.geometries.length; i < len; i++) {
                length += this.geometries[i - 1].distanceTo(this.geometries[i]);
            }
        }
        return length;
    },

    simplify: function (tolerance) {
        if (!tolerance || !this.geometries.length) {
            return this.geometries.slice();
        }

        var sqTolerance = tolerance * tolerance;
        // stage 1: vertex reduction
        this.geometries = this._reducePoints(this.geometries, sqTolerance);
    },

    _reducePoints: function (points, sqTolerance) {
        var filterPoints = [];
        for (var i = 0; i < points.length; i++) {
            if (points[i] instanceof U.Point) {
                filterPoints.push(points[i]);
            }
        }

        var reducedPoints = [filterPoints[0]];
        for (var i = 1, prev = 0, len = filterPoints.length; i < len; i++) {
            if (this._sqDist(filterPoints[i], filterPoints[prev]) > sqTolerance) {
                reducedPoints.push(filterPoints[i]);
                prev = i;
            }
        }
        if (prev < len - 1) {
            reducedPoints.push(filterPoints[len - 1]);
        }

        return reducedPoints;
    },

    _sqDist: function (p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;

        return dx * dx + dy * dy;
    }
})