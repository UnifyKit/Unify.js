
(function () {
    var jsFiles = [
        "src/Unify.js",
        "src/core/Class.js"
    ];

    var scriptTags = new Array(jsFiles.length);
    var host = "../src/";
    for (var i = 0, len = jsFiles.length; i < len; i++) {
        scriptTags[i] = "<script src='" + host + jsFiles[i] +
            "'></script>";
    }
    if (scriptTags.length > 0) {
        document.write(scriptTags.join(""));
    }
})();