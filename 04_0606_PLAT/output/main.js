(function () {
    'use strict';

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

        frustum(left, right, bottom, top, near, far) {
            this.a = [[2 * near / (right - left), 0, 0, 0],
            [0, 2 * near / (top - bottom), 0, 0],
            [(right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1],
            [0, 0, -2 * near * far / (far - near), 0]];
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
    }

    function mat4(
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
                a00[0][0], a00[0][1], a00[0][2], a00[0][3],
                a00[1][0], a00[1][1], a00[1][2], a00[1][3],
                a00[2][0], a00[2][1], a00[2][2], a00[2][3],
                a00[3][0], a00[3][1], a00[3][2], a00[3][3]
            );
        return new _mat4(
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33
        );
    }

    function matrRotate(angle, axis) {
        let si = Math.sin(angle), co = Math.cos(angle),
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

    function matrTranslate(t) {
        return mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            t.x, t.y, t.z, 1
        );
    }

    class Render {
        // Load and compile shader function
        loadShader(shaderType, shaderSource) {
            const shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, shaderSource);
            this.gl.compileShader(shader);
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                let buf = this.gl.getShaderInfoLog(shader);
                console.log("Shader compile fail: " + buf);
            }
            return shader;
        } // End of 'loadShader' function

        renderStart() {
            // console.log(`Frame ${x++}`);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);

            if (this.timeLoc != -1) {
                const date = new Date();
                let t =
                    date.getMinutes() * 60 +
                    date.getSeconds() +
                    date.getMilliseconds() / 1000;

                this.gl.uniform1f(this.timeLoc, t);
            }

            //}
        } // End of 'render' function

        constructor(canvas) {
            this.canvas = canvas;

            this.projSize = 0.1;
            this.projDist = 0.1;
            this.farClip = 300;

            let rect = canvas.getBoundingClientRect();
            this.width = rect.right - rect.left + 1;
            this.height = rect.bottom - rect.top + 1;

            this.gl = canvas.getContext("webgl2");
            this.gl.clearColor(0.9, 0.9, 0.9, 1);

            this.gl.enable(this.gl.DEPTH_TEST);
            // Shader creation
            let vs_txt = `#version 300 es
        precision highp float;
        in vec3 InPosition;
        in vec3 InNormal;
            
        out vec3 DrawPos;
        out vec3 DrawNormal;

        uniform float Time;
        uniform mat4 MatrProj;
        uniform mat4 MatrW;
        
        void main( void )
        {
            gl_Position = MatrProj * vec4(InPosition, 1);
            DrawPos = vec3(MatrW * vec4(InPosition.xyz, 1.0));
            DrawNormal = mat3(transpose(inverse(MatrW))) * InNormal;
        }
        `;

            let fs_txt = `#version 300 es
        precision highp float;
        
        out vec4 OutColor;
        
        in vec3 DrawPos;
        in vec3 DrawNormal;

        uniform float Time;

        void main( void )
        {
            vec3 L = normalize(vec3(0, 0.5, 1));
            vec3 N = normalize(DrawNormal);
            
            N = faceforward(N, normalize(DrawPos), N);
            
            float k = dot(L, normalize(N));

            OutColor = vec4(k * vec3(1, 0.5, 0.5), 1.0);
            //OutColor = vec4(N, 1.0);
        }
        `;

            let vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
                fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt),
                prg = this.gl.createProgram();

            this.gl.attachShader(prg, vs);
            this.gl.attachShader(prg, fs);
            this.gl.linkProgram(prg);

            this.prg = prg;

            if (!this.gl.getProgramParameter(prg, this.gl.LINK_STATUS)) {
                let buf = this.gl.getProgramInfoLog(prg);
                console.log("Shader program link fail: " + buf);
            }

            // Uniform data
            this.timeLoc = this.gl.getUniformLocation(prg, "Time");
            this.matrProjLoc = this.gl.getUniformLocation(prg, "MatrProj");
            this.matrWLoc = this.gl.getUniformLocation(prg, "MatrW");
            this.gl.useProgram(prg);

            this.posLoc = this.gl.getAttribLocation(prg, "InPosition");
            this.normLoc = this.gl.getAttribLocation(prg, "InNormal");
        }
    }

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
    }

    function vec3(x, y, z) {
        if (x == undefined)
            return new _vec3(0, 0, 0);
        if (typeof x == "object")
            return new _vec3(x.x, x.y, x.z);
        if (y == undefined)
            return new _vec3(x, x, x);
        return new _vec3(x, y, z);
    }

    class _vertex {
        constructor(pos, norm) {
            this.pos = pos;
            this.norm = norm;
        }
    }

    function vertex(pos, norm) {
        return new _vertex(pos, norm);
    }

    function autoNormals(vertexes, indicies) {
        let i;

        /* Set all vertex normals to zero */
        for (i = 0; i < vertexes.length; i++)
            vertexes[i].norm = vec3(0);

        /* Eval normal for every facet */
        for (i = 0; i < indicies.length; i += 3) {
            let
                n0 = indicies[i], n1 = indicies[i + 1], n2 = indicies[i + 2];
            let
                p0 = vertexes[n0].pos,
                p1 = vertexes[n1].pos,
                p2 = vertexes[n2].pos,
                N = p1.sub(p0).cross(p2.sub(p0)).norm();

            vertexes[n0].norm = vertexes[n0].norm.add(N);
            vertexes[n1].norm = vertexes[n1].norm.add(N);
            vertexes[n2].norm = vertexes[n2].norm.add(N);
        }

        /* Normalize all vertex normals */
        for (i = 0; i < vertexes.length; i++) {
            vertexes[i].norm = vertexes[i].norm.norm();
        }
    }

    class Prim {
        constructor(rnd, vertexes, indicies) {
            let trimash = [], i = 0;

            autoNormals(vertexes, indicies);

            for (let v of vertexes) {
                trimash[i++] = v.pos.x;
                trimash[i++] = v.pos.y;
                trimash[i++] = v.pos.z;
                trimash[i++] = v.norm.x;
                trimash[i++] = v.norm.y;
                trimash[i++] = v.norm.z;
            }

            this.vertexArrayId = rnd.gl.createVertexArray();

            rnd.gl.bindVertexArray(this.vertexArrayId);
            this.vertexBufferId = rnd.gl.createBuffer();

            rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBufferId);
            rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, new Float32Array(trimash), rnd.gl.STATIC_DRAW);

            if (rnd.posLoc != -1) {
                rnd.gl.vertexAttribPointer(rnd.posLoc, 3, rnd.gl.FLOAT, false, 24, 0);
                rnd.gl.enableVertexAttribArray(rnd.posLoc);
                rnd.gl.vertexAttribPointer(rnd.normLoc, 3, rnd.gl.FLOAT, false, 24, 12);
                rnd.gl.enableVertexAttribArray(rnd.normLoc);
            }

            this.IndexBufferId = rnd.gl.createBuffer();
            rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicies), rnd.gl.STATIC_DRAW);

            this.numOfElements = indicies.length;
        }

        render(rnd, world) {
            let m = mat4(1);

            let rx = rnd.projSize, ry = rnd.projSize;

            /* Correct aspect ratio */
            if (rnd.width >= rnd.height)
                rx *= rnd.width / rnd.height;
            else
                ry *= rnd.height / rnd.width;

            m.frustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
                rnd.projDist, rnd.farClip);

            m = world.mul(m);

            rnd.gl.uniformMatrix4fv(rnd.matrProjLoc, false, new Float32Array([].concat(...m.a)));
            rnd.gl.uniformMatrix4fv(rnd.matrWLoc, false, new Float32Array([].concat(...world.a)));

            rnd.gl.bindVertexArray(this.vertexArrayId);
            rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            rnd.gl.drawElements(rnd.gl.TRIANGLES, this.numOfElements, rnd.gl.UNSIGNED_INT, 0);
        }
    }

    class Figure {
        constructor() {
            this.vertexes = [];
        }

        setCube() {
            this.vertexes = [
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.5, -0.5, -0.5)],  // front
                [vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, -0.5, 0.5)],      // back
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5)],  // left
                [vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)],      // right
                [vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5)],  // bottom
                [vec3(-0.5, 0.5, -0.5), vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5)],      // top
            ];
        }

        setTetrahedron() {
            let sqrt3 = Math.sqrt(3.0), sqrt2 = Math.sqrt(2.0);

            let
                top = vec3(0, sqrt2 / sqrt3, 0),
                front = vec3(0, 0, sqrt3 / 3.0),
                left = vec3(-0.5, 0, -sqrt3 / 6.0),
                right = vec3(0.5, 0, -sqrt3 / 6.0);

            this.vertexes = [
                [left, front, top], // bot
                [left, right, top],
                [right, front, top],
                [front, right, left]
            ];
        }

        setOctahedron() {
            let sqrt2 = Math.sqrt(2.0);

            let
                top = vec3(0, 1 / sqrt2, 0),
                bot = top.mul(-1),
                lf = vec3(-0.5, 0, 0.5),
                lb = vec3(-0.5, 0, -0.5),
                rf = vec3(0.5, 0, 0.5),
                rb = vec3(0.5, 0, -0.5);

            this.vertexes = [
                [bot, lf, rf],
                [bot, lf, lb],
                [bot, lb, rb],
                [bot, rf, rb],
                [top, lf, rf],
                [top, lf, lb],
                [top, lb, rb],
                [top, rf, rb],
            ];
        }

        setIcohedron() {

            let layer1 = [];
            let layer2 = [];

            let r = 0.5 / Math.sin(36 / 180 * Math.PI);
            let d = Math.sqrt(1 - Math.pow(2 * Math.sin(0.1 * Math.PI) * r, 2));

            for (let i = 0; i < 360; i += 72) {
                let angle = i / 180.0 * Math.PI;
                let p = vec3(r * Math.sin(angle), r * Math.cos(angle), -d / 2);

                layer1.push(p);
            }

            for (let i = 0; i < 360; i += 72) {
                let angle = (i + 36) / 180.0 * Math.PI;
                let p = vec3(r * Math.sin(angle), r * Math.cos(angle), d / 2);

                layer2.push(p);
            }

            let
                top = vec3(0, 0, r),
                bot = top.mul(-1);

            for (let i = 0; i < 5; i++) {
                let tri1 =
                    [
                        layer1[i],
                        layer2[i],
                        layer2[(i + 4) % 5]
                    ];
                this.vertexes.push(tri1);
            }
            for (let i = 0; i < 5; i++) {
                let tri2 =
                    [
                        layer2[i],
                        layer1[i],
                        layer1[(i + 1) % 5]
                    ];
                this.vertexes.push(tri2);
            }

            for (let i = 0; i < 5; i++) {
                let cap1 =
                    [
                        bot, layer1[i], layer1[(i + 1) % 5]
                    ];
                this.vertexes.push(cap1);
            }
            for (let i = 0; i < 5; i++) {
                let cap2 =
                    [
                        top, layer2[i], layer2[(i + 1) % 5]
                    ];
                this.vertexes.push(cap2);
            }

        }

        setDodecahedron() {
            let r = Math.sqrt(50 + 10 * Math.sqrt(5)) / 10;
            let R = 0.25 * (1 + Math.sqrt(5)) * Math.sqrt(3);
            let r0 = r * 2 * Math.cos((36 / 180 * Math.PI));

            let edge1 = [];
            let edge2 = [];
            let layer1 = [];
            let layer2 = [];

            let d = Math.sqrt(R * R - r * r);
            let d0 = Math.sqrt(R * R - r0 * r0);

            for (let i = 0; i < 360; i += 72) {
                let
                    a1 = i / 180 * Math.PI,
                    a2 = (i + 36) / 180 * Math.PI;

                let p1 = vec3(r * Math.sin(a1), r * Math.cos(a1), d);
                let p2 = vec3(r * Math.sin(a2), r * Math.cos(a2), -d);

                let l1 = vec3(r0 * Math.sin(a1), r0 * Math.cos(a1), d0);
                let l2 = vec3(r0 * Math.sin(a2), r0 * Math.cos(a2), -d0);

                edge1.push(p1);
                edge2.push(p2);

                layer1.push(l1);
                layer2.push(l2);
            }

            this.vertexes.push(edge1);
            this.vertexes.push(edge2);

            for (let i = 0; i < 5; i++) {
                let surface1 = [
                    edge1[i],
                    layer1[i],
                    layer2[i],
                    layer1[(i + 1) % 5],
                    edge1[(i + 1) % 5]
                ];
                let surface2 = [
                    edge2[i],
                    layer2[i],
                    layer1[i],
                    layer2[(i + 4) % 5],
                    edge2[(i + 4) % 5]
                ];
                this.vertexes.push(surface1);
                this.vertexes.push(surface2);
            }
            //this.vertexes = [edge1, layer1, layer2, edge2];
        }

        makePrim(rnd) {
            let indicies = [];
            let vertexes = [];
            let j = 0;

            for (let edge of this.vertexes) {
                for (let v of edge) {
                    vertexes.push(vertex(v, vec3(0)));
                }

                for (let i = 2; i < edge.length; i++) {
                    indicies.push(j + 0);
                    indicies.push(j + i - 1);
                    indicies.push(j + i);
                }
                j += edge.length;
            }

            return new Prim(rnd, vertexes, indicies);
        }
    }

    console.log("MAIN LOADED");

    let rnd1, rnd2, rnd3, rnd4, rnd5;

    function main() {

      let canvas1 = document.getElementById("myCan1");
      let canvas2 = document.getElementById("myCan2");
      let canvas3 = document.getElementById("myCan3");
      let canvas4 = document.getElementById("myCan4");
      let canvas5 = document.getElementById("myCan5");

      let x = vec3(1, 3, 5);
      let v = vec3(x);

      console.log(v);

      rnd1 = new Render(canvas1);
      rnd2 = new Render(canvas2);
      rnd3 = new Render(canvas3);
      rnd4 = new Render(canvas4);
      rnd5 = new Render(canvas5);

      /*
      let z = 0;
      let vertixes = [
        vertex(vec3(-1, -1, -1), vec3(0)), vertex(vec3(-1, 1, -1), vec3(0)), vertex(vec3(1, 1, -1), vec3(0)), vertex(vec3(1, -1, -1), vec3(0)),
        vertex(vec3(-1, -1, 1), vec3(0)), vertex(vec3(-1, 1, 1), vec3(0)), vertex(vec3(1, 1, 1), vec3(0)), vertex(vec3(1, -1, 1), vec3(0))
      ];
      let indicies = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 1, 4, 1, 4, 5, 2, 6, 7, 2, 7, 3, 1, 5, 6, 1, 6, 2, 0, 4, 7, 0, 7, 3];
      */

      [
        vertex(vec3(-1, -1, 0), vec3(0, 0, 1)),
        vertex(vec3(-1, 1, 0), vec3(0, 0, 1)),
        vertex(vec3(1, 1, 0), vec3(0, 0, 1)),
        vertex(vec3(1, -1, 0), vec3(0, 0, 1))
      ];

      //let prim = new Prim(rnd1, vertexes, indicies);

      let fig = new Figure();
      let fig1 = new Figure();

      fig.setOctahedron();
      let prim1 = fig.makePrim(rnd1);
      fig1.setDodecahedron();
      let prim2 = fig1.makePrim(rnd2);
      fig.setIcohedron();
      let prim3 = fig.makePrim(rnd3);
      fig.setCube();
      let prim4 = fig.makePrim(rnd4);
      fig.setTetrahedron();
      let prim5 = fig.makePrim(rnd5);
      //let prim3 = fig.makePrim(rnd1);


      const draw = () => {
        // drawing

        const date = new Date();
        let t =
          date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

        rnd1.renderStart();
        prim1.render(rnd1, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
        rnd2.renderStart();
        prim2.render(rnd2, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -5))));//matrRotate(t, vec3(0, 1, 0)));
        rnd3.renderStart();
        prim3.render(rnd3, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
        rnd4.renderStart();
        prim4.render(rnd4, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
        rnd5.renderStart();
        prim5.render(rnd5, matrRotate(6, vec3(0, 0, 1)).mul(matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, -0.3, -2.2)))));

        // animation register
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.addEventListener("load", () => {
      main();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvbXRoL3ZlYzMuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3BsYXQvcGxhdC5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBmcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1syICogbmVhciAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMF0sXHJcbiAgICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIC0xXSxcclxuICAgICAgICBbMCwgMCwgLTIgKiBuZWFyICogZmFyIC8gKGZhciAtIG5lYXIpLCAwXV07XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKG0pIHtcclxuICAgICAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzNdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoXHJcbiAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXHJcbiAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICBhMzAsIGEzMSwgYTMyLCBhMzNcclxuKSB7XHJcbiAgICBpZiAoYTAwID09IDEgJiYgYTAxID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAxLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICAgIGlmICh0eXBlb2YgYTAwID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgYTAwWzBdWzBdLCBhMDBbMF1bMV0sIGEwMFswXVsyXSwgYTAwWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDBbMV1bMF0sIGEwMFsxXVsxXSwgYTAwWzFdWzJdLCBhMDBbMV1bM10sXHJcbiAgICAgICAgICAgIGEwMFsyXVswXSwgYTAwWzJdWzFdLCBhMDBbMl1bMl0sIGEwMFsyXVszXSxcclxuICAgICAgICAgICAgYTAwWzNdWzBdLCBhMDBbM11bMV0sIGEwMFszXVsyXSwgYTAwWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn0iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gICAgLy8gTG9hZCBhbmQgY29tcGlsZSBzaGFkZXIgZnVuY3Rpb25cclxuICAgIGxvYWRTaGFkZXIoc2hhZGVyVHlwZSwgc2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIoc2hhZGVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gdGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hhZGVyIGNvbXBpbGUgZmFpbDogXCIgKyBidWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hhZGVyO1xyXG4gICAgfSAvLyBFbmQgb2YgJ2xvYWRTaGFkZXInIGZ1bmN0aW9uXHJcblxyXG4gICAgcmVuZGVyU3RhcnQoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEZyYW1lICR7eCsrfWApO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVMb2MgIT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGxldCB0ID1cclxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnRpbWVMb2MsIHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy99XHJcbiAgICB9IC8vIEVuZCBvZiAncmVuZGVyJyBmdW5jdGlvblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgICAgICB0aGlzLnByb2pTaXplID0gMC4xO1xyXG4gICAgICAgIHRoaXMucHJvakRpc3QgPSAwLjE7XHJcbiAgICAgICAgdGhpcy5mYXJDbGlwID0gMzAwO1xyXG5cclxuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdCArIDE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wICsgMTtcclxuXHJcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjksIDAuOSwgMC45LCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuICAgICAgICAvLyBTaGFkZXIgY3JlYXRpb25cclxuICAgICAgICBsZXQgdnNfdHh0ID0gYCN2ZXJzaW9uIDMwMCBlc1xyXG4gICAgICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuICAgICAgICBpbiB2ZWMzIEluUG9zaXRpb247XHJcbiAgICAgICAgaW4gdmVjMyBJbk5vcm1hbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgb3V0IHZlYzMgRHJhd1BvcztcclxuICAgICAgICBvdXQgdmVjMyBEcmF3Tm9ybWFsO1xyXG5cclxuICAgICAgICB1bmlmb3JtIGZsb2F0IFRpbWU7XHJcbiAgICAgICAgdW5pZm9ybSBtYXQ0IE1hdHJQcm9qO1xyXG4gICAgICAgIHVuaWZvcm0gbWF0NCBNYXRyVztcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIG1haW4oIHZvaWQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSBNYXRyUHJvaiAqIHZlYzQoSW5Qb3NpdGlvbiwgMSk7XHJcbiAgICAgICAgICAgIERyYXdQb3MgPSB2ZWMzKE1hdHJXICogdmVjNChJblBvc2l0aW9uLnh5eiwgMS4wKSk7XHJcbiAgICAgICAgICAgIERyYXdOb3JtYWwgPSBtYXQzKHRyYW5zcG9zZShpbnZlcnNlKE1hdHJXKSkpICogSW5Ob3JtYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGxldCBmc190eHQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbiAgICAgICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIG91dCB2ZWM0IE91dENvbG9yO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGluIHZlYzMgRHJhd1BvcztcclxuICAgICAgICBpbiB2ZWMzIERyYXdOb3JtYWw7XHJcblxyXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgVGltZTtcclxuXHJcbiAgICAgICAgdm9pZCBtYWluKCB2b2lkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZlYzMgTCA9IG5vcm1hbGl6ZSh2ZWMzKDAsIDAuNSwgMSkpO1xyXG4gICAgICAgICAgICB2ZWMzIE4gPSBub3JtYWxpemUoRHJhd05vcm1hbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBOID0gZmFjZWZvcndhcmQoTiwgbm9ybWFsaXplKERyYXdQb3MpLCBOKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZsb2F0IGsgPSBkb3QoTCwgbm9ybWFsaXplKE4pKTtcclxuXHJcbiAgICAgICAgICAgIE91dENvbG9yID0gdmVjNChrICogdmVjMygxLCAwLjUsIDAuNSksIDEuMCk7XHJcbiAgICAgICAgICAgIC8vT3V0Q29sb3IgPSB2ZWM0KE4sIDEuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGxldCB2cyA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZzX3R4dCksXHJcbiAgICAgICAgICAgIGZzID0gdGhpcy5sb2FkU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSLCBmc190eHQpLFxyXG4gICAgICAgICAgICBwcmcgPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuXHJcbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIocHJnLCB2cyk7XHJcbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIocHJnLCBmcyk7XHJcbiAgICAgICAgdGhpcy5nbC5saW5rUHJvZ3JhbShwcmcpO1xyXG5cclxuICAgICAgICB0aGlzLnByZyA9IHByZztcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJnLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gdGhpcy5nbC5nZXRQcm9ncmFtSW5mb0xvZyhwcmcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNoYWRlciBwcm9ncmFtIGxpbmsgZmFpbDogXCIgKyBidWYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVW5pZm9ybSBkYXRhXHJcbiAgICAgICAgdGhpcy50aW1lTG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIlRpbWVcIik7XHJcbiAgICAgICAgdGhpcy5tYXRyUHJvakxvYyA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZywgXCJNYXRyUHJvalwiKTtcclxuICAgICAgICB0aGlzLm1hdHJXTG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnLCBcIk1hdHJXXCIpO1xyXG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcmcpO1xyXG5cclxuICAgICAgICB0aGlzLnBvc0xvYyA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICAgICAgdGhpcy5ub3JtTG9jID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImNsYXNzIF92ZWMzIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy56ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBsZW4yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybSgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMygwKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbiA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdmVjMyh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXYobGVuKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yih2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBrLCB0aGlzLnkgKiBrLCB0aGlzLnogKiBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXYoaykge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIGssIHRoaXMueSAvIGssIHRoaXMueiAvIGspO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdCh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICAgICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgICAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsbWF0cihtKSB7XHJcbiAgICAgICAgbGV0IHcgPSB0aGlzLnggKiBtLmFbMF1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnkgKiBtLmFbMV1bM10gK1xyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMl1bM10gK1xyXG4gICAgICAgICAgICBtLmFbM11bM107XHJcblxyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdICsgbS5hWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0gKyBtLmFbM11bMV0pIC8gdyxcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXSArIG0uYVszXVsyXSkgLyB3LCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKG0pIHtcclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMyh4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMygwLCAwLCAwKTtcclxuICAgIGlmICh0eXBlb2YgeCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeC54LCB4LnksIHgueik7XHJcbiAgICBpZiAoeSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMyh4LCB4LCB4KTtcclxuICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeSwgeik7XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4uL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0pIHtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIGxldCB0cmltYXNoID0gW10sIGkgPSAwO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBybmQuZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgIHRoaXMudmVydGV4QnVmZmVySWQgPSBybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgIHJuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVySWQpO1xyXG4gICAgICAgIHJuZC5nbC5idWZmZXJEYXRhKHJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIGlmIChybmQucG9zTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHJuZC5wb3NMb2MsIDMsIHJuZC5nbC5GTE9BVCwgZmFsc2UsIDI0LCAwKTtcclxuICAgICAgICAgICAgcm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJuZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihybmQubm9ybUxvYywgMywgcm5kLmdsLkZMT0FULCBmYWxzZSwgMjQsIDEyKTtcclxuICAgICAgICAgICAgcm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJuZC5ub3JtTG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgcm5kLmdsLmJ1ZmZlckRhdGEocm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkoaW5kaWNpZXMpLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHJuZCwgd29ybGQpIHtcclxuICAgICAgICBsZXQgbSA9IG1hdDQoMSk7XHJcblxyXG4gICAgICAgIGxldCByeCA9IHJuZC5wcm9qU2l6ZSwgcnkgPSBybmQucHJvalNpemU7XHJcblxyXG4gICAgICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICAgICAgaWYgKHJuZC53aWR0aCA+PSBybmQuaGVpZ2h0KVxyXG4gICAgICAgICAgICByeCAqPSBybmQud2lkdGggLyBybmQuaGVpZ2h0O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcnkgKj0gcm5kLmhlaWdodCAvIHJuZC53aWR0aDtcclxuXHJcbiAgICAgICAgbS5mcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLFxyXG4gICAgICAgICAgICBybmQucHJvakRpc3QsIHJuZC5mYXJDbGlwKTtcclxuXHJcbiAgICAgICAgbSA9IHdvcmxkLm11bChtKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLnVuaWZvcm1NYXRyaXg0ZnYocm5kLm1hdHJQcm9qTG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShbXS5jb25jYXQoLi4ubS5hKSkpO1xyXG4gICAgICAgIHJuZC5nbC51bmlmb3JtTWF0cml4NGZ2KHJuZC5tYXRyV0xvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLndvcmxkLmEpKSk7XHJcblxyXG4gICAgICAgIHJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgcm5kLmdsLmRyYXdFbGVtZW50cyhybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbWVudHMsIHJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFByaW0sIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3ViZSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGZyb250XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KV0sICAgICAgLy8gYmFja1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpXSwgIC8vIGxlZnRcclxuICAgICAgICAgICAgW3ZlYzMoMC41LCAtMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGJvdHRvbVxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHRvcFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXRyYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgc3FydDIgLyBzcXJ0MywgMCksXHJcbiAgICAgICAgICAgIGZyb250ID0gdmVjMygwLCAwLCBzcXJ0MyAvIDMuMCksXHJcbiAgICAgICAgICAgIGxlZnQgPSB2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYuMCksXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gdmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtsZWZ0LCBmcm9udCwgdG9wXSwgLy8gYm90XHJcbiAgICAgICAgICAgIFtsZWZ0LCByaWdodCwgdG9wXSxcclxuICAgICAgICAgICAgW3JpZ2h0LCBmcm9udCwgdG9wXSxcclxuICAgICAgICAgICAgW2Zyb250LCByaWdodCwgbGVmdF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDEgLyBzcXJ0MiwgMCksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpLFxyXG4gICAgICAgICAgICBsZiA9IHZlYzMoLTAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgbGIgPSB2ZWMzKC0wLjUsIDAsIC0wLjUpLFxyXG4gICAgICAgICAgICByZiA9IHZlYzMoMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICByYiA9IHZlYzMoMC41LCAwLCAtMC41KTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2JvdCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW2JvdCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW2JvdCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW2JvdCwgcmYsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgcmYsIHJiXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEljb2hlZHJvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHIgPSAwLjUgLyBNYXRoLnNpbigzNiAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdygyICogTWF0aC5zaW4oMC4xICogTWF0aC5QSSkgKiByLCAyKSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gaSAvIDE4MC4wICogTWF0aC5QSTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKHIgKiBNYXRoLnNpbihhbmdsZSksIHIgKiBNYXRoLmNvcyhhbmdsZSksIC1kIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjEucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChpICsgMzYpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgZCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCAwLCByKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJpMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh0cmkyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBib3QsIGxheWVyMVtpXSwgbGF5ZXIxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FwMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLCBsYXllcjJbaV0sIGxheWVyMlsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChjYXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldERvZGVjYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydCg1MCArIDEwICogTWF0aC5zcXJ0KDUpKSAvIDEwO1xyXG4gICAgICAgIGxldCBSID0gMC4yNSAqICgxICsgTWF0aC5zcXJ0KDUpKSAqIE1hdGguc3FydCgzKTtcclxuICAgICAgICBsZXQgcjAgPSByICogMiAqIE1hdGguY29zKCgzNiAvIDE4MCAqIE1hdGguUEkpKTtcclxuXHJcbiAgICAgICAgbGV0IGVkZ2UxID0gW107XHJcbiAgICAgICAgbGV0IGVkZ2UyID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoUiAqIFIgLSByICogcik7XHJcbiAgICAgICAgbGV0IGQwID0gTWF0aC5zcXJ0KFIgKiBSIC0gcjAgKiByMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICAgICAgYTEgPSBpIC8gMTgwICogTWF0aC5QSSxcclxuICAgICAgICAgICAgICAgIGEyID0gKGkgKyAzNikgLyAxODAgKiBNYXRoLlBJO1xyXG5cclxuICAgICAgICAgICAgbGV0IHAxID0gdmVjMyhyICogTWF0aC5zaW4oYTEpLCByICogTWF0aC5jb3MoYTEpLCBkKTtcclxuICAgICAgICAgICAgbGV0IHAyID0gdmVjMyhyICogTWF0aC5zaW4oYTIpLCByICogTWF0aC5jb3MoYTIpLCAtZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbDEgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTEpLCByMCAqIE1hdGguY29zKGExKSwgZDApO1xyXG4gICAgICAgICAgICBsZXQgbDIgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTIpLCByMCAqIE1hdGguY29zKGEyKSwgLWQwKTtcclxuXHJcbiAgICAgICAgICAgIGVkZ2UxLnB1c2gocDEpO1xyXG4gICAgICAgICAgICBlZGdlMi5wdXNoKHAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKGwxKTtcclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gobDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGVkZ2UxKTtcclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTEgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTIgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTEpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudmVydGV4ZXMgPSBbZWRnZTEsIGxheWVyMSwgbGF5ZXIyLCBlZGdlMl07XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVByaW0ocm5kKSB7XHJcbiAgICAgICAgbGV0IGluZGljaWVzID0gW107XHJcbiAgICAgICAgbGV0IHZlcnRleGVzID0gW107XHJcbiAgICAgICAgbGV0IGogPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlZGdlIG9mIHRoaXMudmVydGV4ZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBlZGdlKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2LCB2ZWMzKDApKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgMCk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqICs9IGVkZ2UubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKHJuZCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlbmRlciB9IGZyb20gXCIuL3JuZC9ybmQuanNcIlxyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBtYXQ0LCBtYXRyUm90YXRlLCBtYXRyVHJhbnNsYXRlIH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi9ybmQvcmVzL3ByaW0uanNcIlxyXG5pbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi9wbGF0L3BsYXQuanNcIlxyXG5cclxuY29uc29sZS5sb2coXCJNQUlOIExPQURFRFwiKTtcclxuXHJcbmxldCBybmQxLCBybmQyLCBybmQzLCBybmQ0LCBybmQ1O1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuXHJcbiAgbGV0IGNhbnZhczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FuMVwiKTtcclxuICBsZXQgY2FudmFzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW4yXCIpO1xyXG4gIGxldCBjYW52YXMzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbjNcIik7XHJcbiAgbGV0IGNhbnZhczQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FuNFwiKTtcclxuICBsZXQgY2FudmFzNSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW41XCIpO1xyXG5cclxuICBsZXQgeCA9IHZlYzMoMSwgMywgNSk7XHJcbiAgbGV0IHYgPSB2ZWMzKHgpO1xyXG5cclxuICBjb25zb2xlLmxvZyh2KTtcclxuXHJcbiAgcm5kMSA9IG5ldyBSZW5kZXIoY2FudmFzMSk7XHJcbiAgcm5kMiA9IG5ldyBSZW5kZXIoY2FudmFzMik7XHJcbiAgcm5kMyA9IG5ldyBSZW5kZXIoY2FudmFzMyk7XHJcbiAgcm5kNCA9IG5ldyBSZW5kZXIoY2FudmFzNCk7XHJcbiAgcm5kNSA9IG5ldyBSZW5kZXIoY2FudmFzNSk7XHJcblxyXG4gIC8qXHJcbiAgbGV0IHogPSAwO1xyXG4gIGxldCB2ZXJ0aXhlcyA9IFtcclxuICAgIHZlcnRleCh2ZWMzKC0xLCAtMSwgLTEpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoLTEsIDEsIC0xKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIDEsIC0xKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIC0xLCAtMSksIHZlYzMoMCkpLFxyXG4gICAgdmVydGV4KHZlYzMoLTEsIC0xLCAxKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKC0xLCAxLCAxKSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDEsIDEsIDEpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoMSwgLTEsIDEpLCB2ZWMzKDApKVxyXG4gIF07XHJcbiAgbGV0IGluZGljaWVzID0gWzAsIDEsIDIsIDAsIDIsIDMsIDQsIDUsIDYsIDQsIDYsIDcsIDAsIDEsIDQsIDEsIDQsIDUsIDIsIDYsIDcsIDIsIDcsIDMsIDEsIDUsIDYsIDEsIDYsIDIsIDAsIDQsIDcsIDAsIDcsIDNdO1xyXG4gICovXHJcblxyXG4gIGxldCB2ZXJ0ZXhlcyA9IFtcclxuICAgIHZlcnRleCh2ZWMzKC0xLCAtMSwgMCksIHZlYzMoMCwgMCwgMSkpLFxyXG4gICAgdmVydGV4KHZlYzMoLTEsIDEsIDApLCB2ZWMzKDAsIDAsIDEpKSxcclxuICAgIHZlcnRleCh2ZWMzKDEsIDEsIDApLCB2ZWMzKDAsIDAsIDEpKSxcclxuICAgIHZlcnRleCh2ZWMzKDEsIC0xLCAwKSwgdmVjMygwLCAwLCAxKSlcclxuICBdXHJcblxyXG4gIGxldCBpbmRpY2llcyA9IFtcclxuICAgIDAsIDEsIDIsIDIsIDMsIDBcclxuICBdXHJcblxyXG4gIC8vbGV0IHByaW0gPSBuZXcgUHJpbShybmQxLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICBsZXQgZmlnID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGxldCBmaWcxID0gbmV3IEZpZ3VyZSgpO1xyXG5cclxuICBmaWcuc2V0T2N0YWhlZHJvbigpO1xyXG4gIGxldCBwcmltMSA9IGZpZy5tYWtlUHJpbShybmQxKTtcclxuICBmaWcxLnNldERvZGVjYWhlZHJvbigpO1xyXG4gIGxldCBwcmltMiA9IGZpZzEubWFrZVByaW0ocm5kMik7XHJcbiAgZmlnLnNldEljb2hlZHJvbigpO1xyXG4gIGxldCBwcmltMyA9IGZpZy5tYWtlUHJpbShybmQzKTtcclxuICBmaWcuc2V0Q3ViZSgpO1xyXG4gIGxldCBwcmltNCA9IGZpZy5tYWtlUHJpbShybmQ0KTtcclxuICBmaWcuc2V0VGV0cmFoZWRyb24oKTtcclxuICBsZXQgcHJpbTUgPSBmaWcubWFrZVByaW0ocm5kNSk7XHJcbiAgLy9sZXQgcHJpbTMgPSBmaWcubWFrZVByaW0ocm5kMSk7XHJcblxyXG5cclxuICBjb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgLy8gZHJhd2luZ1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IHQgPVxyXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICBybmQxLnJlbmRlclN0YXJ0KCk7XHJcbiAgICBwcmltMS5yZW5kZXIocm5kMSwgbWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0zKSkpKTsvL21hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgcm5kMi5yZW5kZXJTdGFydCgpO1xyXG4gICAgcHJpbTIucmVuZGVyKHJuZDIsIG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKG1hdHJUcmFuc2xhdGUodmVjMygwLCAwLCAtNSkpKSk7Ly9tYXRyUm90YXRlKHQsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgIHJuZDMucmVuZGVyU3RhcnQoKTtcclxuICAgIHByaW0zLnJlbmRlcihybmQzLCBtYXRyUm90YXRlKHQsIHZlYzMoMCwgMSwgMCkpLm11bChtYXRyVHJhbnNsYXRlKHZlYzMoMCwgMCwgLTMpKSkpOy8vbWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICBybmQ0LnJlbmRlclN0YXJ0KCk7XHJcbiAgICBwcmltNC5yZW5kZXIocm5kNCwgbWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0zKSkpKTsvL21hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgcm5kNS5yZW5kZXJTdGFydCgpO1xyXG4gICAgcHJpbTUucmVuZGVyKHJuZDUsIG1hdHJSb3RhdGUoNiwgdmVjMygwLCAwLCAxKSkubXVsKG1hdHJSb3RhdGUodCwgdmVjMygwLCAxLCAwKSkubXVsKG1hdHJUcmFuc2xhdGUodmVjMygwLCAtMC4zLCAtMi4yKSkpKSk7XHJcblxyXG4gICAgLy8gYW5pbWF0aW9uIHJlZ2lzdGVyXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gIH07XHJcbiAgZHJhdygpO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIG1haW4oKTtcclxufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXO0lBQ2YsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLE1BQU07SUFDTixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN0QyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDakQsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUcsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUk7SUFDcEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLEVBQUU7SUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUztJQUNwQyxRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVE7SUFDOUIsUUFBUSxPQUFPLElBQUksS0FBSztJQUN4QixZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsU0FBUyxDQUFDO0lBQ1YsSUFBSSxPQUFPLElBQUksS0FBSztJQUNwQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsS0FBSyxDQUFDO0lBQ04sQ0FBQztBQUNEO0lBQ08sU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtJQUN4QyxJQUNPLElBQ0MsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHO0FBQ3hCO0lBQ0EsSUFBSSxPQUFPLElBQUk7SUFDZixRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDO0lBQ1QsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQztJQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUs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R0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNsRCxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoRCxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNqRDtJQUNBLFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0M7SUFDQSxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0M7SUFDQSxRQUFRLElBQUksTUFBTSxHQUFHLENBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQyxDQUFDO0FBQ1Y7SUFDQSxRQUFRLElBQUksTUFBTSxHQUFHLENBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDLENBQUM7QUFDVjtJQUNBLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7SUFDL0QsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFN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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMs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QUNqQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEQ7SUFDQSxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxLQUFLO0FBQ0w7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzFDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxNQUFNLElBQUksQ0FBQztJQUNsQixJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtJQUN6QyxRQUFRLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDO0lBQ0EsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDO0lBQ0EsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtJQUNoQyxZQUFZ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QUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFVBQVM7SUFDVCxLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FB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QUFDO0lBQ25ELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUMzRTtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFNBQVM7QUFDVDtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ELFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixTQUFTO0FBQ1Q7SUFDQSxRQUFRO0lBQ1IsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QjtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxZQUFZLElBQUksSUFBSTtJQUNwQixnQkFBZ0I7SUFDaEIsb0JBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0Isb0JBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0Isb0JBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLGtCQUFpQjtJQUNqQixZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLFNBQVM7SUFDVCxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsWUFBWSxJQUFJLElBQUk7SUFDcEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxrQkFBaUI7SUFDakIsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxTQUFTO0FBQ1Q7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsWUFBWSxJQUFJLElBQUk7SUFDcEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQixHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELGlCQUFpQixDQUFDO0lBQ2xCLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsU0FBUztJQUNULFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxZQUFZLElBQUksSUFBSTtJQUNwQixnQkFBZ0I7SUFDaEIsb0JBQW9CLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsaUJBQWlCLENBQUM7SUFDbEIsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxTQUFTO0FBQ1Q7SUFDQSxLQUFLO0FBQ0w7SUFDQSxJQUFJLGVBQWUsR0FBRztJQUN0QixRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxRQUFRLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN4RDtJQUNBLFFBQVEsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3hCO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVk7SUFDWixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDdEMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7SUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUs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
