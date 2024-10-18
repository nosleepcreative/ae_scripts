function getAnchor(n, layer, world, x, y, myOverride, padding) {
    // base
    var s = layer.sourceRectAtTime();
    var sp = [s.left, s.top];

    // clamp values between 1 to 9 for debugging
    var n = clamp(n - 1, 0, 8);

    // Point Coordinates
    var myPts = [sp, sp + [s.width, 0] / 2, sp + [s.width, 0], sp + [0, s.height] / 2, sp + [s.width, s.height] / 2, sp + [s.width, s.height / 2], sp + [0, s.height], sp + [s.width / 2, s.height], sp + [s.width, s.height]];

    // Padding
    var pad = [
        [s.width, s.height] * padding, [0, s.height] * padding, [-s.width, s.height] * padding, [s.width] * padding, 0, [-s.width, 0] * padding, [s.width, -s.height] * padding, [0, -s.height] * padding, -[s.width, s.height] * padding
    ]
    var result = myPts[n] + pad[n] / 100;

    // overrride with custom values
    if (myOverride) {
        result = [s.left + s.width * x / 100, s.top + s.height * y / 100]
    } else {
        result += [x, y]
    }

    // convert to world space
    if (world == 1) {
        result = layer.toWorld(result);
    }

    return result;

}
// usage
getAnchor(effect("Point Number")("Slider"), effect("Layer Control")("Layer"), effect("Convert to World")("Checkbox"), effect("Point_x override")("Slider"), effect("Point_Y override")("Slider"), effect("Override")("Checkbox").value, 20)









// ——————————————————————————
// Part 2: Switch statement

function getAnchor(n, layer) {
    s = layer.sourceRectAtTime();
    switch (n) {
        case 1:
            exp = [s.left, s.top];
            return exp;
        case 2:
            exp = [s.left, s.top] + [s.width, 0] / 2;
            return exp;
        case 3:
            exp = [s.left, s.top] + [s.width, 0];
            return exp;
        case 4:
            exp = [s.left, s.top] + [0, s.height] / 2;
            return exp;
        case 5:
            exp = [s.left, s.top] + [s.width, +s.height] / 2;
            return exp;
        case 6:
            exp = [s.left, s.top] + [s.width, +s.height / 2];
            return exp;
        case 7:
            exp = [s.left, s.top] + [0, +s.height];
            return exp;
        case 8:
            exp = [s.left, s.top] + [s.width / 2, +s.height];
            return exp;
        case 9:

            exp = [s.left, s.top] + [s.width, +s.height];
            return exp;
    }
}


///////////////////////