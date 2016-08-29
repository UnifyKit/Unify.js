// As namespace, U means Unify.js
var U = {
    version: '0.0.1'
};

// function for expose it as the global variable of window
function expose() {
    var oldU = window.U;

    U.noConflict = function () {
        window.U = oldU;
        return this;
    };

    window.U = U;
}

// define Unify.js for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = U;

// define Unify.js as an AMD module
} else if (typeof define === 'function' && define.amd) {
    define(U);
}

// define Unify.js as a global U variable, saving the original U to restore later if needed
if (typeof window !== 'undefined') {
    expose();
}