U.Line = U.Curve.extend({
    getVertices: function(nodes) {
        var vertices;
        if(nodes === true) {
            vertices = [
                this.geometries[0],
                this.geometries[this.geometries.length-1]
            ];
        } else if (nodes === false) {
            vertices = this.geometries.slice(1, this.geometries.length-1);
        } else {
            vertices = this.geometries.slice();
        }
        return vertices;
    }
})