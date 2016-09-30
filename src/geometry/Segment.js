U.Segment = U.Line.extend({
    init: function (x1, y1, x2, y2) {
        this.start = new U.Point(x1, y1);
        this.end = new U.Point(x2, y2);

        this.addGeometry(this.start);
        this.addGeometry(this.end);
    }
})