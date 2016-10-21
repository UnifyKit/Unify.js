U.Font = U.Class.extend({
    init: function (family, size, style, weight, variant) {
        this.family = family ? family : null;
        this.size = size ? size : null;
        this.style = style ? style : null;
        this.weight = weight ? weight : null;
        this.variant = variant ? variant : null;
    },
    
    applyToCanvas:function (context) { // not canvas object, but the context of the canvas.

        var font = '';
        if (this.family)
            font +=  ' ' + this.family;

        if (this.weight)
            font +=  ' ' + this.weight;

        if (this.size)
            font +=  ' ' + this.size;

        if (this.style)
            font +=  ' ' + this.style;

        if (this.variant)
            font +=  ' ' + this.variant;

        context.font = font;
    }
})