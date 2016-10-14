U.Brush = U.Class.extend({
    init:function (color, fillType) {
        this.color = color?color:new U.Color("#000000");
        this.fileType = fillType?fillType:'solid';
    }

})