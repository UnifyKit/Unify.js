U.Size = U.Class.extend({
    init: function (w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },

    toString: function () {
        return ("w=" + this.w + ",h=" + this.h);
    },

    clone: function () {
        return new OpenLayers.Size(this.w, this.h);
    },

    equals: function (size) {
        var equals = false;
        if (size != null) {
            equals = ((this.w == size.w && this.h == size.h) ||
            (isNaN(this.w) && isNaN(this.h) && isNaN(size.w) && isNaN(size.h)));
        }
        return equals;
    }
})