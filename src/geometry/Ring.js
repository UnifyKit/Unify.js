U.Ring = U.Line.extend({
    addGeometry: function (point, index) {

        var added = false;

        //remove last point
        var lastPoint = this.geometries.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if (index != null || !point.equals(lastPoint)) {
            added = U.Collection.Collection.prototype.addGeometry.apply(this, arguments);
        }

        //append copy of first point
        var firstPoint = this.geometries[0];
        U.Collection.Collection.prototype.addGeometry.apply(this, [firstPoint]);

        return added;
    },

    removeGeometry: function (point) {
        var removed = this.geometries && (this.geometries.length > 3);
        if (removed) {
            //remove last point
            this.geometries.pop();

            //remove our point
            U.Collection.prototype.removeGeometry.apply(this, arguments);
            //append copy of first point
            var firstPoint = this.geometries[0];
            U.Collection.prototype.addGeometry.apply(this, [firstPoint]);
        }
        return removed;
    },

    move: function (x, y) {
        for (var i = 0, len = this.geometries.length; i < len - 1; i++) {
            this.geometries[i].move(x, y);
        }
    },

    rotate: function (angle, origin) {
        for (var i = 0, len = this.geometries.length; i < len - 1; ++i) {
            this.geometries[i].rotate(angle, origin);
        }
    },

    resize: function (scale, origin, ratio) {
        for (var i = 0, len = this.geometries.length; i < len - 1; ++i) {
            this.geometries[i].resize(scale, origin, ratio);
        }
        return this;
    },

    getCentroid: function () {
        if (this.geometries) {
            var len = this.geometries.length;
            if (len > 0 && len <= 2) {
                return this.geometries[0].clone();
            } else if (len > 2) {
                var sumX = 0.0;
                var sumY = 0.0;
                var x0 = this.geometries[0].x;
                var y0 = this.geometries[0].y;
                var area = -1 * this.getArea();
                if (area != 0) {
                    for (var i = 0; i < len - 1; i++) {
                        var b = this.geometries[i];
                        var c = this.geometries[i + 1];
                        sumX += (b.x + c.x - 2 * x0) * ((b.x - x0) * (c.y - y0) - (c.x - x0) * (b.y - y0));
                        sumY += (b.y + c.y - 2 * y0) * ((b.x - x0) * (c.y - y0) - (c.x - x0) * (b.y - y0));
                    }
                    var x = x0 + sumX / (6 * area);
                    var y = y0 + sumY / (6 * area);
                } else {
                    for (var i = 0; i < len - 1; i++) {
                        sumX += this.geometries[i].x;
                        sumY += this.geometries[i].y;
                    }
                    var x = sumX / (len - 1);
                    var y = sumY / (len - 1);
                }
                return new U.Point(x, y);
            } else {
                return null;
            }
        }
    },

    getArea: function () {
        var area = 0.0;
        if (this.geometries && (this.geometries.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.geometries.length; i < len - 1; i++) {
                var b = this.geometries[i];
                var c = this.geometries[i + 1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = -sum / 2.0;
        }
        return area;
    },

    containsPoint: function (point) {
        var approx = U.Number.limitSigDigs;
        var digs = 14;
        var px = approx(point.x, digs);
        var py = approx(point.y, digs);

        function getX(y, x1, y1, x2, y2) {
            return (y - y2) * ((x2 - x1) / (y2 - y1)) + x2;
        }

        var numSeg = this.geometries.length - 1;
        var start, end, x1, y1, x2, y2, cx, cy;
        var crosses = 0;
        for (var i = 0; i < numSeg; ++i) {
            start = this.geometries[i];
            x1 = approx(start.x, digs);
            y1 = approx(start.y, digs);
            end = this.geometries[i + 1];
            x2 = approx(end.x, digs);
            y2 = approx(end.y, digs);

            if (y1 == y2) {
                // horizontal edge
                if (py == y1) {
                    // point on horizontal line
                    if (x1 <= x2 && (px >= x1 && px <= x2) ||
                        x1 >= x2 && (px <= x1 && px >= x2)) {
                        // point on edge
                        crosses = -1;
                        break;
                    }
                }
                // ignore other horizontal edges
                continue;
            }
            cx = approx(getX(py, x1, y1, x2, y2), digs);
            if (cx == px) {
                // point on line
                if (y1 < y2 && (py >= y1 && py <= y2) || // upward
                    y1 > y2 && (py <= y1 && py >= y2)) { // downward
                    // point on edge
                    crosses = -1;
                    break;
                }
            }
            if (cx <= px) {
                // no crossing to the right
                continue;
            }
            if (x1 != x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
                // no crossing
                continue;
            }
            if (y1 < y2 && (py >= y1 && py < y2) || // upward
                y1 > y2 && (py < y1 && py >= y2)) { // downward
                ++crosses;
            }
        }
        var contained = (crosses == -1) ? // on edge
            1 :
            // even (out) or odd (in)
            !!(crosses & 1);

        return contained;
    },

    intersects: function (geometry) {
        var intersect = false;
        if (geometry instanceof U.Point) {
            intersect = this.containsPoint(geometry);
        } else if (geometry instanceof U.Line) {
            intersect = geometry.intersects(this);
        } else if (geometry instanceof U.Ring) {
            intersect = U.Line.prototype.intersects.apply(this, [geometry]);
        } else {
            // check for component intersections
            for (var i = 0, len = geometry.geometries.length; i < len; ++i) {
                intersect = geometry.geometries[i].intersects(this);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    },

    getVertices: function (endPointsOnly) {
        return (endPointsOnly === true) ? [] : this.geometries.slice(0, this.geometries.length - 1);
    }
})