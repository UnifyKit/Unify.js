U.Polygon = U.Collection.extend({
    init: function (outRing, innerRings) {
        this.outRing = outRing;
        this.innerRings = innerRings;

        // add it to the geometries collection for maintain.
        if (this.outRing) {
            this.addGeometry(this.outRing, 0);
        }

        if (this.innerRings) {
            this.addGeometries(this.innerRings);
        }
    },

    getArea: function () {
        var area = 0.0;
        if (this.geometries && (this.geometries.length > 0)) {
            area += Math.abs(this.geometries[0].getArea());
            for (var i = 1, len = this.geometries.length; i < len; i++) {
                area -= Math.abs(this.geometries[i].getArea());
            }
        }
        return area;
    },

    containsPoint: function (point) {
        var numRings = this.geometries.length;
        var contained = false;
        if (numRings > 0) {
            // check exterior ring - 1 means on edge, boolean otherwise
            contained = this.geometries[0].containsPoint(point);
            if (contained !== 1) {
                if (contained && numRings > 1) {
                    // check interior rings
                    var hole;
                    for (var i = 1; i < numRings; ++i) {
                        hole = this.geometries[i].containsPoint(point);
                        if (hole) {
                            if (hole === 1) {
                                // on edge
                                contained = 1;
                            } else {
                                // in hole
                                contained = false;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return contained;
    },

    intersects: function (geometry) {
        var intersect = false;
        var i, len;
        if (geometry instanceof U.Point) {
            intersect = this.containsPoint(geometry);
        } else if (geometry instanceof U.Line || geometry instanceof U.Ring) {
            // check if rings/Line intersect
            for (i = 0, len = this.geometries.length; i < len; ++i) {
                intersect = geometry.intersects(this.geometries[i]);
                if (intersect) {
                    break;
                }
            }
            if (!intersect) {
                // check if this poly contains points of the ring/linestring
                for (i = 0, len = geometry.geometries.length; i < len; ++i) {
                    intersect = this.containsPoint(geometry.geometries[i]);
                    if (intersect) {
                        break;
                    }
                }
            }
        } else {
            for (i = 0, len = geometry.geometries.length; i < len; ++i) {
                intersect = this.intersects(geometry.geometries[i]);
                if (intersect) {
                    break;
                }
            }
        }
        // check case where this poly is wholly contained by another
        if (!intersect && geometry instanceof U.Polygon) {
            // exterior ring points will be contained in the other geometry
            var ring = this.geometries[0];
            for (i = 0, len = ring.geometries.length; i < len; ++i) {
                intersect = geometry.containsPoint(ring.geometries[i]);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    }
})

U.Polygon.createRegularPolygon = function (origin, radius, sides, rotation) {
    var angle = Math.PI * ((1 / sides) - (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / sides);
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new U.Point(x, y));
    }
    var ring = new U.Line(points);

    return new U.Polygon([ring]);
};