U.Color = U.Class.extend({
    init: function (color) {
        this.value = '#000000';
        switch (arguments.length) {
            //Color Hex or Named or rgb()
            case 1:
                this.value = arguments[0];
                break;
            //RGB Color
            case 3:
                var red = arguments[0];
                var green = arguments[1];
                var blue = arguments[2];
                this.value = U.Color.rgbToHex(red, green, blue);
                break;
        }
    }
});

U.Color.rgbToHex = function (red, green, blue) {
    //Check argument values
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
        return false;
    }

    var colorDec = Math.round(blue) + 256 * Math.round(green) + 65536 * Math.round(red);
    return '#' + zeroPad(colorDec.toString(16), 6);

    //Internal method, add zero padding to the left. Used for building hexa-decimal string.
    function zeroPad(val, count) {
        var valZeropad = val + '';
        while (valZeropad.length < count) {
            valZeropad = '0' + valZeropad;
        }
        return valZeropad;
    }
};

U.Color.hexToRgb = function (hex) {
    var redValue, greenValue, blueValue;
    if (hex.charAt(0) == '#') {
        hex = hex.substring(1, 7);
    }

    redValue = parseInt(hex.substring(0, 2), 16);
    greenValue = parseInt(hex.substring(2, 4), 16);
    blueValue = parseInt(hex.substring(4, 6), 16);

    //Check argument values
    if (redValue < 0 || redValue > 255 || greenValue < 0 || greenValue > 255 || blueValue < 0 || blueValue > 255) {
        return false;
    }

    return new Array(redValue, greenValue, blueValue);
};

U.Color.randomColors = function (options) {
    var options = options || {};

    var seed = null;
    if (options.seed != undefined && options.seed !== null && options.seed == parseInt(options.seed, 10)) {
        seed = options.seed;
    } else if (typeof options.seed === 'string') {
        seed = 0
        for (var i = 0; i !== options.seed.length; i++) {
            if (seed >= Number.MAX_VALUE) {
                break;
            }

            seed += options.seed.charCodeAt(i)
        }
    }

    var colors = []
    if (options.count !== null && options.count !== undefined) {

        var totalColors = options.count;
        options.count = null;

        while (totalColors > colors.length) {

            if (seed && options.seed) options.seed += 1;

            colors.push(U.Color.randomColors(options));
        }

        options.count = totalColors;
    }

    return colors;
};