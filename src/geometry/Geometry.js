U.Geometry = U.Class.extend({
    init: function () {    // The element is a UI component, like Chart, Map etc.
        this.id = U.stamp(this);
        this.bounds = null;
    },

    destroy: function () {
        this.id = null;
        this.bounds = null;
    },

    clone: function () {
        return new U.Geometry();
    },

    getBounds: function () {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    },

    calculateBounds: function () {
        //
        // This should be overridden by subclasses.
        //
    },

    getLength: function () {
        return 0.0;
    },

    getArea: function () {
        return 0.0;
    },

    getCentroid: function () {
        return null;
    }
})