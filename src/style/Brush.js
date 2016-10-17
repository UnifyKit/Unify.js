U.Brush = U.Class.extend({
    init: function (color, brushType) { // Color here can be a real color (name, argb, hex etc.) or a gradient object.
        this.color = color ? color : new U.Color("#000000");
        this.brushType = brushType ? brushType : U.BrushType.Solid;
    },

    applyToCanvas: function (context) {
        context.fillStyle = this.color;
    }
})