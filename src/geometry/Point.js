U.Point = U.Geometry.extend({
    init: function (x, y, round) {
        if (x instanceof U.Point) {
            return x;
        }
        if (U.Util.isArray(x)) {
            this._init(x[0], x[1]);
        }
        if (x === undefined || x === null) {
            return x;
        }
        if (typeof x === 'object' && 'x' in x && 'y' in x) {
            this._init(x.x, x.y);
        }
        this._init(x, y, round);
    },

    _init: function (x, y, round) {
        this.x = (round ? Math.round(x) : x);
        this.y = (round ? Math.round(y) : y);
    },

    clone: function () {
        return new U.Point(this.x, this.y);
    },

    calculateBounds: function () {
        return new U.Bounds(this);
    },

    getCentroid: function () {
        return this;
    },

    add: function (point) {
        point = new U.Point(point);
        this.x += point.x;
        this.y += point.y;

        return this;
    },

    subtract: function (point) {
        point = new U.Point(point);
        this.x -= point.x;
        this.y -= point.y;

        return this;
    },

    divideBy: function (num) {
        this.x /= num;
        this.y /= num;

        return this;
    },

    multiplyBy: function (num) {
        this.x *= num;
        this.y *= num;

        return this;
    },

    scaleUp: function (point) {
        point = new U.Point(point);
        this.x *= point.x;
        this.y *= point.y;

        return this;
    },

    scaleDown: function (point) {
        point = new U.Point(point);
        this.x /= point.x;
        this.y /= point.y;

        return this;
    },

    move: function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    },

    rotate: function (angle, origin) {
        angle *= Math.PI / 180;
        var radius = this.distanceTo(origin);
        var theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
        this.x = origin.x + (radius * Math.cos(theta));
        this.y = origin.y + (radius * Math.sin(theta));
    },

    resize: function (scale, origin, ratio) {
        ratio = (ratio == undefined) ? 1 : ratio;
        this.x = origin.x + (scale * ratio * (this.x - origin.x));
        this.y = origin.y + (scale * (this.y - origin.y));
        return this;
    },

    round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    },

    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    },

    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    },

    distanceTo: function (point) {
        point = new U.Point(point);

        var x = point.x - this.x,
            y = point.y - this.y;

        return Math.sqrt(x * x + y * y);
    },

    distanceToSegment:function (segment) {
        return Math.sqrt(this._closestPointOnSegment(p1, p2, true));
    },

    closestPointOnSegment:function (segment) {
        return Math.sqrt(this._closestPointOnSegment(p1, p2, false));
    },

    equals: function (point) {
        point = new U.Point(point);

        return point.x - this.x < U.Util.EPSILON && point.y - this.y < U.Util.EPSILON;
    },

    contains: function (point) {
        point = new U.Point(point);

        return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
    },

    toString: function () {
        return 'Point(' + U.Util.formatNum(this.x) + ', ' + U.Util.formatNum(this.y) + ')';
    },

    _closestPointOnSegment: function (p, p1, p2, sqDist) {
        var x = p1.x,
            y = p1.y,
            dx = p2.x - x,
            dy = p2.y - y,
            dot = dx * dx + dy * dy,
            t;

        if (dot > 0) {
            t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

            if (t > 1) {
                x = p2.x;
                y = p2.y;
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p.x - x;
        dy = p.y - y;

        return sqDist ? dx * dx + dy * dy : new U.Point(x, y);
    }
})