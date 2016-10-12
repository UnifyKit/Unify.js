U.MultiPoint = U.Collection.extend({
    addPoint: function (point, index) {
        this.addGeometry(point, index);
    },

    removePoint: function (point) {
        this.removeGeometry(point);
    }
})