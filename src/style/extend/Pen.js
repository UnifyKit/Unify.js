U.Pen = U.Class.extend({
    init: function (color, width, dashStyle) {
        this.color = color ? color : new U.Color('#000000');
        this.width = width ? width : '1px';
        this.dashStyle = dashStyle ? dashStyle : null;
    },

    applyToCanvas: function (context) {
        if (this.dashStyle) {
            var w = parseInt(this.width);
            switch (this.dashStyle.toLowerCase()) {
                case 'shortdash':
                    context.setLineDash('[' + w * 3 + ',' + w + ']');
                    break;
                case 'shortdot':
                    context.setLineDash('[' +w + ',' + w + ']');
                    break;
                case 'shortdashdot':
                    context.setLineDash('[' +w * 3 + ',' + w + ',' + w + ',' + w + ']');
                    break;
                case 'shortdashdotdot':
                    context.setLineDash('[' +w * 3 + ',' + w + ',' + w + ',' + w + ',' + w + ',' + w + ']');
                    break;
                case 'dot':
                    context.setLineDash('[' +w + ',' + w * 3 + ']');
                    break;
                case 'dash':
                    context.setLineDash('[' +w * 4 + ',' + w * 3 + ']');
                    break;
                case 'longdash':
                    context.setLineDash('[' +w * 8 + ',' + w * 3 + ']');
                    break;
                case 'dashdot':
                    context.setLineDash('[' +w * 4 + ',' + w * 3 + ',' + w + ',' + w * 3 + ']');
                    break;
                case 'longdashdot':
                    context.setLineDash('[' +w * 8 + ',' + w * 3 + ',' + w + ',' + w * 3 + ']');
                    break;
                case 'longdashdotdot':
                    context.setLineDash('[' +w * 8 + ',' + w * 3 + ',' + w + ',' + w * 3 + ',' + w + ',' + w * 3 + ']');
                    break;
                default:
                    context.setLineDash(this.dashStyle);
                    break;
            }
        }
    }
})