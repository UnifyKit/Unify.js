U.Bounds = U.Class.extend({
    init: function (a, b) {    // The element is a UI component, like Chart, Map etc.
        if (!a || a instanceof U.Bounds) {
            return a;
        }

        if (!a) {
            return;
        }

        var points = b ? [a, b] : a;

        for (var i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
        }
    },

    extend: function (point) {
        point = new U.Point(point);

        if (!this.min && !this.max) {
            this.min = point.clone();
            this.max = point.clone();
        } else {
            this.min.x = Math.min(point.x, this.min.x);
            this.max.x = Math.max(point.x, this.max.x);
            this.min.y = Math.min(point.y, this.min.y);
            this.max.y = Math.max(point.y, this.max.y);
        }
        return this;
    },

    getCenter: function (round) {
        return new U.Point(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2, round);
    },

    getBottomLeft: function () {
        return new U.Point(this.min.x, this.max.y);
    },

    getTopRight: function () {
        return new U.Point(this.max.x, this.min.y);
    },

    getSize: function () {
        return this.max.subtract(this.min);
    },

    contains: function (obj) {
        var min, max;

        if (typeof obj[0] === 'number' || obj instanceof U.Point) {
            obj = new U.Point(obj);
        } else {
            obj = new U.Bounds(obj);
        }

        if (obj instanceof U.Bounds) {
            min = obj.min;
            max = obj.max;
        } else {
            min = max = obj;
        }

        return (min.x >= this.min.x) && (max.x <= this.max.x) &&
            (min.y >= this.min.y) && (max.y <= this.max.y);
    },

    intersects: function (bounds) {
        bounds = new U.Bounds(bounds);

        var min = this.min,
            max = this.max,
            min2 = bounds.min,
            max2 = bounds.max,
            xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
            yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

        return xIntersects && yIntersects;
    },

    overlaps: function (bounds) {
        bounds = new U.Bounds(bounds);

        var min = this.min,
            max = this.max,
            min2 = bounds.min,
            max2 = bounds.max,
            xOverlaps = (max2.x > min.x) && (min2.x < max.x),
            yOverlaps = (max2.y > min.y) && (min2.y < max.y);

        return xOverlaps && yOverlaps;
    },

    isValid: function () {
        return !!(this.min && this.max);
    }
})