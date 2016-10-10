U.Ring = U.Line.extend({
    addVertex: function (point, index) {

        var added = false;

        //remove last point
        var lastPoint = this.geometries.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if (index != null || !point.equals(lastPoint)) {
            added = U.Collection.prototype.addGeometry.apply(this, arguments);
        }

        //append copy of first point
        var firstPoint = this.geometries[0];
        U.Collection.prototype.addGeometry.apply(this, [firstPoint]);

        return added;
    }
})