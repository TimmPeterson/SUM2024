class _mat4 {
    constructor(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
    ) {
        this.a = [[a00, a01, a02, a03],
        [a10, a11, a12, a13],
        [a20, a21, a22, a23],
        [a30, a31, a32, a33]];
    }

    mul(m) {
        return mat4(
            this.a[0][0] * m.a[0][0] + this.a[0][1] * m.a[1][0] + this.a[0][2] * m.a[2][0] + this.a[0][3] * m.a[3][0],
            this.a[0][0] * m.a[0][1] + this.a[0][1] * m.a[1][1] + this.a[0][2] * m.a[2][1] + this.a[0][3] * m.a[3][1],
            this.a[0][0] * m.a[0][2] + this.a[0][1] * m.a[1][2] + this.a[0][2] * m.a[2][2] + this.a[0][3] * m.a[3][2],
            this.a[0][0] * m.a[0][3] + this.a[0][1] * m.a[1][3] + this.a[0][2] * m.a[2][3] + this.a[0][3] * m.a[3][3],
            this.a[1][0] * m.a[0][0] + this.a[1][1] * m.a[1][0] + this.a[1][2] * m.a[2][0] + this.a[1][3] * m.a[3][0],
            this.a[1][0] * m.a[0][1] + this.a[1][1] * m.a[1][1] + this.a[1][2] * m.a[2][1] + this.a[1][3] * m.a[3][1],
            this.a[1][0] * m.a[0][2] + this.a[1][1] * m.a[1][2] + this.a[1][2] * m.a[2][2] + this.a[1][3] * m.a[3][2],
            this.a[1][0] * m.a[0][3] + this.a[1][1] * m.a[1][3] + this.a[1][2] * m.a[2][3] + this.a[1][3] * m.a[3][3],
            this.a[2][0] * m.a[0][0] + this.a[2][1] * m.a[1][0] + this.a[2][2] * m.a[2][0] + this.a[2][3] * m.a[3][0],
            this.a[2][0] * m.a[0][1] + this.a[2][1] * m.a[1][1] + this.a[2][2] * m.a[2][1] + this.a[2][3] * m.a[3][1],
            this.a[2][0] * m.a[0][2] + this.a[2][1] * m.a[1][2] + this.a[2][2] * m.a[2][2] + this.a[2][3] * m.a[3][2],
            this.a[2][0] * m.a[0][3] + this.a[2][1] * m.a[1][3] + this.a[2][2] * m.a[2][3] + this.a[2][3] * m.a[3][3],
            this.a[3][0] * m.a[0][0] + this.a[3][1] * m.a[1][0] + this.a[3][2] * m.a[2][0] + this.a[3][3] * m.a[3][0],
            this.a[3][0] * m.a[0][1] + this.a[3][1] * m.a[1][1] + this.a[3][2] * m.a[2][1] + this.a[3][3] * m.a[3][1],
            this.a[3][0] * m.a[0][2] + this.a[3][1] * m.a[1][2] + this.a[3][2] * m.a[2][2] + this.a[3][3] * m.a[3][2],
            this.a[3][0] * m.a[0][3] + this.a[3][1] * m.a[1][3] + this.a[3][2] * m.a[2][3] + this.a[3][3] * m.a[3][3]);
    }

    linearize() {
        return [].concat(...this.a);
    }
}

export function mat4(
    a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23,
    a30, a31, a32, a33
) {
    if (a00 == 1 && a01 == undefined)
        return new _mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1);
    if (typeof a00 == "object")
        return new _mat4(
            a00.a[0][0], a00.a[0][1], a00.a[0][2], a00.a[0][3],
            a00.a[1][0], a00.a[1][1], a00.a[1][2], a00.a[1][3],
            a00.a[2][0], a00.a[2][1], a00.a[2][2], a00.a[2][3],
            a00.a[3][0], a00.a[3][1], a00.a[3][2], a00.a[3][3]
        );
    return new _mat4(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
    );
}

export function matrRotate(angle, axis) {
    let
        a = angle / Math.PI * 180.0,
        si = Math.sin(angle), co = Math.cos(angle),
        v = axis.norm();

    return mat4(
        co + v.x * v.x * (1 - co),
        v.x * v.y * (1 - co) + v.z * si,
        v.x * v.z * (1 - co) - v.y * si,
        0,
        v.y * v.x * (1 - co) - v.z * si,
        co + v.y * v.y * (1 - co),
        v.y * v.z * (1 - co) + v.x * si,
        0,
        v.z * v.x * (1 - co) + v.y * si,
        v.z * v.y * (1 - co) - v.x * si,
        co + v.z * v.z * (1 - co),
        0, 0, 0, 0, 1
    );
}

export function matrTranslate(t) {
    return mat4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        t.x, t.y, t.z, 1
    );
}

export function matrScale(s) {
    return mat4(
        s.x, 0, 0, 0,
        0, s.y, 0, 0,
        0, 0, s.z, 0,
        0, 0, 0, 1
    )
}

export function matrFrustum(left, right, bottom, top, near, far) {
    return mat4(
        2 * near / (right - left), 0, 0, 0,
        0, 2 * near / (top - bottom), 0, 0,
        (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
        0, 0, -2 * near * far / (far - near), 0
    );
}

export function matrView(loc, at, up1) {
    let
        dir = at.sub(loc).norm(),
        right = dir.cross(up1).norm(),
        up = right.cross(dir).norm();
    return mat4(
        right.x, up.x, -dir.x, 0,
        right.y, up.y, -dir.y, 0,
        right.z, up.z, -dir.z, 0,
        -loc.dot(right), -loc.dot(up), loc.dot(dir), 1
    );
}