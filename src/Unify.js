var Unify = {
    version: '0.0.1'
}; //As namespace


function expose() {
    var oldU = window.U;

    U.noConflict = function () {
        window.U = oldU;
        return this;
    };

    window.U = U;
}

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = U;

// define Leaflet as an AMD module
} else if (typeof define === 'function' && define.amd) {
    define(U);
}

// define Leaflet as a global U variable, saving the original U to restore later if needed
if (typeof window !== 'undefined') {
    expose();
}