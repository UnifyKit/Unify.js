U.Renderer = U.Class.extend({
    init: function (containerId, options) {
        this.container = U.getElement(containerId);

        this.size = options.size !== undefined ? options.size : new U.Size(500, 390);
        this.resolution = options.resolution !== undefined ? options.resolution : 96;
    },
    
    destroy:function () {
        this.container = null;
        this.size =  null;
        this.resolution = null;
    },

    supported:function () {
        return false;
    }


})