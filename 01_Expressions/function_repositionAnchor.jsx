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