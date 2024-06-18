class _vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function vec2(x, y) {
    if (y == undefined)
        return new _vec2(x, x);
    return new _vec2(x, y);
}