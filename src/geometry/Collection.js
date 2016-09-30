U.Collection = U.Geometry.extend({
    init: function (geoms) {
        this.geometries = [];
        this.addGeometries(geoms);
    },

    addGeometries: function (geoms) {
        if (!U.Util.isArray(geoms)) {
            geoms = [geoms];
        }
        for (var i = 0, len = geoms.length; i < len; i++) {
            this.addGeometry(geoms[i]);
        }
    },

    addGeometry: function (geom, index) {
        var added = false;
        if (geom) {
            if (this.geometries == undefined || this.geometries.length == 0 || geom instanceof typeof(this.geometries[0])) {
                if (index != null && (index < this.geometries.length)) {
                    var comp1 = this.geometries.slice(0, index);
                    var comp2 = this.geometries.slice(index, this.geometries.length);
                    comp1.push(geom);
                    this.geometries = comp1.concat(comp2);
                } else {
                    this.geometries.push(geom);
                }
                this.clearBounds();
                added = true;
            }
        }
        return added;
    },

    removeGeometries: function (geoms) {
        var removed = false;

        if (!(U.Util.isArray(geoms))) {
            geoms = [geoms];
        }
        for (var i = geoms.length - 1; i >= 0; --i) {
            removed = this.removeGeometry(geoms[i]) || removed;
        }
        return removed;
    },

    removeGeometry: function (geom) {
        U.Util.removeItem(this.geometries, geom);

        this.clearBounds();
        return true;
    },

    calculateBounds: function () {
        this.bounds = null;
        var bounds = new U.Bounds();
        if (this.geometries) {
            for (var i = 0, len = this.geometries.length; i < len; i++) {
                bounds.extend(this.geometries[i].getBounds());
            }
        }

        this.bounds = bounds;
    },

    getLength: function () {
        var length = 0.0;
        for (var i = 0, len = this.geometries.length; i < len; i++) {
            length += this.geometries[i].getLength();
        }
        return length;
    },

    getArea: function () {
        var area = 0.0;
        for (var i = 0, len = this.geometries.length; i < len; i++) {
            area += this.geometries[i].getArea();
        }
        return area;
    },

    getCentroid: function () {
        var len = this.geometries.length;
        if (!len) {
            return false;
        }

        var areas = [];
        var centroids = [];
        var areaSum = 0;
        var minArea = Number.MAX_VALUE;
        var component;
        for (var i = 0; i < len; ++i) {
            component = this.geometries[i];
            var area = component.getArea();
            var centroid = component.getCentroid(true);
            if (isNaN(area) || isNaN(centroid.x) || isNaN(centroid.y)) {
                continue;
            }
            areas.push(area);
            areaSum += area;
            minArea = (area < minArea && area > 0) ? area : minArea;
            centroids.push(centroid);
        }
        len = areas.length;
        if (areaSum === 0) {
            // all the components in this collection have 0 area
            // probably a collection of points -- weight all the points the same
            for (var i = 0; i < len; ++i) {
                areas[i] = 1;
            }
            areaSum = areas.length;
        } else {
            // normalize all the areas where the smallest area will get
            // a value of 1
            for (var i = 0; i < len; ++i) {
                areas[i] /= minArea;
            }
            areaSum /= minArea;
        }

        var xSum = 0, ySum = 0, centroid, area;
        for (var i = 0; i < len; ++i) {
            centroid = centroids[i];
            area = areas[i];
            xSum += centroid.x * area;
            ySum += centroid.y * area;
        }

        return new U.Point(xSum / areaSum, ySum / areaSum);
    },

    move: function (x, y) {
        for (var i = 0, len = this.geometries.length; i < len; i++) {
            this.geometries[i].move(x, y);
        }
    },

    rotate: function (angle, origin) {
        for (var i = 0, len = this.geometries.length; i < len; ++i) {
            this.geometries[i].rotate(angle, origin);
        }
    },

    resize: function (scale, origin, ratio) {
        for (var i = 0; i < this.geometries.length; ++i) {
            this.geometries[i].resize(scale, origin, ratio);
        }
        return this;
    }
})