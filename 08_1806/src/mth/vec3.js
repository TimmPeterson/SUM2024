class _vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    len2() {
        return this.dot(this);
    }

    len() {
        return Math.sqrt(this.dot(this));
    }

    norm() {
        let len = this.len();

        if (len == 0)
            return vec3(0);

        if (len == 1)
            return vec3(this);
        return this.div(len);
    }

    add(v) {
        return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) {
        return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mul(k) {
        return vec3(this.x * k, this.y * k, this.z * k);
    }

    div(k) {
        return vec3(this.x / k, this.y / k, this.z / k);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return vec3(this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x);
    }

    mulmatr(m) {
        let w = this.x * m.a[0][3] +
            this.y * m.a[1][3] +
            this.x * m.a[2][3] +
            m.a[3][3];

        return vec3(
            (this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0]) / w,
            (this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1]) / w,
            (this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]) / w,);
    }

    transform(m) {
        return vec3(
            this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0],
            this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1],
            this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2]
        );
    }

    pointTransform() {
        return vec3(
            this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0],
            this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1],
            this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]
        );
    }

    linearize() {
        return [this.x, this.y, this.z];
    }
}

export function vec3(x, y, z) {
    if (x == undefined)
        return new _vec3(0, 0, 0);
    if (typeof x == "object")
        return new _vec3(x.x, x.y, x.z);
    if (y == undefined)
        return new _vec3(x, x, x);
    return new _vec3(x, y, z);
}
