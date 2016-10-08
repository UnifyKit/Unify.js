U.Ring = U.Line.extend({
    addVertex:function (point, index) {

        var added = false;

        //remove last point
        var lastPoint = this.components.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if(index != null || !point.equals(lastPoint)) {
            added = OpenLayers.Geometry.Collection.prototype.addComponent.apply(this,
                arguments);
        }

        //append copy of first point
        var firstPoint = this.components[0];
        OpenLayers.Geometry.Collection.prototype.addComponent.apply(this,
            [firstPoint]);

        return added;
    }
})