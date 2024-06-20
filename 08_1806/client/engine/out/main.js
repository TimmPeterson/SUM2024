(function () {
    'use strict';

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

    function vec3(x, y, z) {
        if (x == undefined)
            return new _vec3(0, 0, 0);
        if (typeof x == "object")
            return new _vec3(x.x, x.y, x.z);
        if (y == undefined)
            return new _vec3(x, x, x);
        return new _vec3(x, y, z);
    }

    class _vec2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    function vec2(x, y) {
        if (y == undefined)
            return new _vec2(x, x);
        return new _vec2(x, y);
    }

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

    function matrFrustum(left, right, bottom, top, near, far) {
        return mat4(
            2 * near / (right - left), 0, 0, 0,
            0, 2 * near / (top - bottom), 0, 0,
            (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
            0, 0, -2 * near * far / (far - near), 0
        );
    }

    function matrView(loc, at, up1) {
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

    class _buffer {
        constructor(rnd, type, size) {
            this.rnd = rnd;
            this.type = type;    // Buffer type (gl.***_BUFFER)
            this.size = size;    // Buffer size in bytes
            this.id = null;
            if (size == 0 || type == undefined)
                return;
            this.id = rnd.gl.createBuffer();
            this.rnd.gl.bindBuffer(type, this.id);
            this.rnd.gl.bufferData(type, size, rnd.gl.STATIC_DRAW);
        }

        update(data) {
            this.rnd.gl.bindBuffer(this.type, this.id);
            this.rnd.gl.bufferSubData(this.type, 0, data);
        }
    }

    class UniformBuffer extends _buffer {
        constructor(rnd, name, size, bindPoint) {
            super(rnd, rnd.gl.UNIFORM_BUFFER, size);
            this.name = name;
            this.bindPoint = bindPoint; // Buffer GPU binding point
        }

        apply(shd) {
            if (this.rnd == undefined || shd.prg == undefined || shd.uniformBlocks[this.name] == undefined)
                return;
            shd.rnd.gl.uniformBlockBinding(shd.prg, shd.uniformBlocks[this.name].index, this.bindPoint);
            shd.rnd.gl.bindBufferBase(shd.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
        }
    }

    ////////////////////////////
    // Timer class module
    ////////////////////////////

    class Timer {
        constructor() {        
            this.globalTime = this.localTime = this.getTime();
            this.globalDeltaTime = this.localDeltaTime = 0;
            this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
            this.frameCounter = 0;
            this.isPause = false;
            this.FPS = 30.0;
            this.pauseTime = 0;
        }

        // Get current global time funtion
        getTime() {
            const date = new Date();
            let t =
                date.getMilliseconds() / 1000.0 +
                date.getSeconds() +
                date.getMinutes() * 60;
            return t;
        };

        // Get current FPS function
        getFPS() {
            return this.FPS.toFixed(3);
        }

        pauseEnbale() {
            this.isPause = true;
        }

        pauseDisable() {
            this.isPause = false;
        }

        pauseSwitch() {
            if (this.isPause == false)
                this.isPause = true;
            else
                this.isPause = false;
        }

        // Reponse timer function
        response(tag_id = null) {
            let t = this.getTime();

            this.globalTime = t;
            this.globalDeltaTime = t - this.oldTime;

            if (this.isPause) {
                this.localDeltaTime = 0;
                this.pauseTime += t - this.oldTime;
            } 
            else {
                this.localDeltaTime = this.globalDeltaTime;
                this.localTime = t - this.pauseTime - this.startTime;
            }

            this.frameCounter++;
            if (t - this.oldTimeFPS > 3) {
                this.FPS = this.frameCounter / (t - this.oldTimeFPS);
                this.oldTimeFPS = t;
                this.frameCounter = 0;
                if (tag_id != null)
                    document.getElementById(tag_id).innerHTML = this.getFPS();
            }

            this.oldTime = t;
        };
    }

    class _vertex {
        constructor(pos, norm, tex) {
            this.pos = pos;
            this.norm = norm;
            this.tex = tex;
        }
    }

    function vertex(pos, norm, tex) {
        if (tex == undefined)
            return new _vertex(pos, norm, vec2(0));
        return new _vertex(pos, norm, tex);
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
        create(shd, vertexes, indicies) {
            let trimash = [], i = 0;

            this.vertexes = [...vertexes];
            this.indicies = [...indicies];
            this.shd = shd;
            this.loaded = false;
            if (this.shd.prg != null)
                this.loaded = true;

            autoNormals(vertexes, indicies);

            for (let v of vertexes) {
                trimash[i++] = v.pos.x;
                trimash[i++] = v.pos.y;
                trimash[i++] = v.pos.z;
                trimash[i++] = v.norm.x;
                trimash[i++] = v.norm.y;
                trimash[i++] = v.norm.z;
                trimash[i++] = v.tex.x;
                trimash[i++] = v.tex.y;
            }

            this.vertexArrayId = shd.rnd.gl.createVertexArray();
            shd.rnd.gl.bindVertexArray(this.vertexArrayId);
            this.vertexBufferId = shd.rnd.gl.createBuffer();

            shd.rnd.gl.bindBuffer(shd.rnd.gl.ARRAY_BUFFER, this.vertexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ARRAY_BUFFER, new Float32Array(trimash), shd.rnd.gl.STATIC_DRAW);

            if (this.posLoc != -1 && this.normLoc != -1) {
                shd.rnd.gl.vertexAttribPointer(shd.posLoc, 3, shd.rnd.gl.FLOAT, false, 32, 0);
                shd.rnd.gl.enableVertexAttribArray(shd.posLoc);
                shd.rnd.gl.vertexAttribPointer(shd.normLoc, 3, shd.rnd.gl.FLOAT, false, 32, 12);
                shd.rnd.gl.enableVertexAttribArray(shd.normLoc);
                shd.rnd.gl.vertexAttribPointer(shd.texLoc, 2, shd.rnd.gl.FLOAT, false, 32, 24);
                shd.rnd.gl.enableVertexAttribArray(shd.texLoc);
            }

            this.IndexBufferId = shd.rnd.gl.createBuffer();
            shd.rnd.gl.bindBuffer(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
            shd.rnd.gl.bufferData(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicies), shd.rnd.gl.STATIC_DRAW);

            this.numOfElements = indicies.length;
        }

        constructor(mtl, vertexes, indicies) {
            this.transform = mat4(1);
            if (indicies == undefined) {
                this.mtl = mtl;
                this.shd = mtl.shd;
                this.fromObj(mtl, vertexes);
            } else {
                this.mtl = mtl;
                this.create(mtl.shd, vertexes, indicies);
            }
        }

        render(world) {
            if (this.mtl.Trans != 1.0) {
                this.shd.rnd.transparents.push({ prim: this, world: world });
                return;
            }
            // Recreating primitive if it wasn't created
            // (because of shader async initialization)
            if (this.shd.prg != null && this.loaded == false) {
                this.create(this.shd, this.vertexes, this.indicies);
                this.loaded = true;
            }

            // Drawing primitive if shader is loaded
            if (this.mtl.apply()) {
                this.shd.rnd.primUBO.update(new Float32Array(this.transform.mul(world).linearize()));
                this.shd.rnd.gl.bindVertexArray(this.vertexArrayId);
                this.shd.rnd.gl.bindBuffer(this.shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
                this.shd.rnd.gl.drawElements(this.shd.rnd.gl.TRIANGLES, this.numOfElements, this.shd.rnd.gl.UNSIGNED_INT, 0);
            }
        }

        renderNow(world) {
            if (this.shd.prg != null && this.loaded == false) {
                this.create(this.shd, this.vertexes, this.indicies);
                this.loaded = true;
            }
            if (this.mtl.apply()) {
                this.shd.rnd.primUBO.update(new Float32Array(this.transform.mul(world).linearize()));
                this.shd.rnd.gl.bindVertexArray(this.vertexArrayId);
                this.shd.rnd.gl.bindBuffer(this.shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
                this.shd.rnd.gl.drawElements(this.shd.rnd.gl.TRIANGLES, this.numOfElements, this.shd.rnd.gl.UNSIGNED_INT, 0);
            }
        }

        async fromObj(mtl, fileName) {
            let vtx = [];
            let file = await fetch(`bin/models/${fileName}.obj`);
            let src = await file.text();
            let lines = src.split('\n');

            this.vertexes = [];
            this.indicies = [];
            for (let line of lines) {
                if (line[0] == 'v') {
                    let toks = line.split(' ');
                    let v = [];

                    for (let i = 0; i < toks.length; i++) {
                        if (toks[i] == "") {
                            toks.splice(i, 1);
                            i--;
                        }
                    }

                    for (let i = 1; i < 4; i++)
                        v.push(parseFloat(toks[i]));

                    vtx.push(vec3(v[0], v[1], v[2]));
                    this.vertexes.push(vertex(vec3(v[0], v[1], v[2])));
                } else if (line[0] == 'f') {
                    let toks = line.split(' ');

                    for (let t = 1; t < 4; t++) {
                        vertex(vtx[parseInt(toks[t].split('/')[0]) - 1]);
                        this.indicies.push(parseInt(toks[t].split('/')[0]) - 1);
                        //this.vertexes.push(v);
                    }
                }
            }
            /*
            this.indicies = [];
            for (let i = 0; i < this.vertexes.length; i++)
                this.indicies.push(i);
            */
            this.loaded = false;
            this.create(mtl.shd, this.vertexes, this.indicies);
        }
    }

    // Class for holding material properties of primitive.
    class Material {
        constructor(shd, Ka, Kd, Ks, Ph, Trans) {
            this.shd = shd;
            this.Ka = Ka;
            this.Kd = Kd;
            this.Ks = Ks;
            this.Ph = Ph;
            this.Trans = Trans;
            this.textures = [null, null, null, null];

            this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 4, 3);
            //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
            this.update();
        }

        update() {
            let tex_flags = [0, 0, 0, 0];
            let data = this.Ka.linearize().concat([0], this.Kd.linearize(), [this.Trans], this.Ks.linearize(), [this.Ph]);

            for (let t = 0; t < 4; t++)
                if (this.textures[t] != null)
                    tex_flags[t] = 1;

            data = data.concat(tex_flags);

            this.UBO.update(new Float32Array(data));
        }

        apply() {
            if (this.shd.apply()) {
                this.UBO.apply(this.shd);

                for (let t = 0; t < 4; t++) {
                    if (this.textures[t] != null)
                        this.textures[t].apply(t);
                }
                return true;
            }

            return false;
        }

        attachTexture(texture, num) {
            if (num > 3 || num < 0)
                return;

            this.textures[num] = texture;
        }

        newPrimitive(vertexes, indicies) {
            return new Prim(this, vertexes, indicies);
        }
    }

    class Shader {
        constructor(rnd, name) {
            this.rnd = rnd;
            this.name = name;
            this.prg = null;
            this._init();
        }

        async _init() {
            this.shaders =
                [
                    {
                        id: null,
                        type: this.rnd.gl.VERTEX_SHADER,
                        name: "vert",
                        src: "",
                    },
                    {
                        id: null,
                        type: this.rnd.gl.FRAGMENT_SHADER,
                        name: "frag",
                        src: "",
                    }
                ];
            for (const s of this.shaders) {
                let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
                let src = await response.text();
                if (typeof src == "string" && src != "")
                    s.src = src;
            }
            // recompile shaders
            this.updateShadersSource();
        }

        updateShadersSource() {
            this.shaders[0].id = null;
            this.shaders[1].id = null;

            if (this.shaders[0].src == "" || this.shaders[1].src == "")
                return;
            this.shaders.forEach(s => {
                s.id = this.rnd.gl.createShader(s.type);
                this.rnd.gl.shaderSource(s.id, s.src);
                this.rnd.gl.compileShader(s.id);
                if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
                    let buf = this.rnd.gl.getShaderInfoLog(s.id);
                    console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
                }
            });
            this.prg = this.rnd.gl.createProgram();
            this.shaders.forEach(s => {
                if (s.id != null)
                    this.rnd.gl.attachShader(this.prg, s.id);
            });
            this.rnd.gl.linkProgram(this.prg);
            if (!this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.LINK_STATUS)) {
                let buf = this.rnd.gl.getProgramInfoLog(this.prg);
                console.log(`Shader program ${this.name} link fail: ${buf}`);
            }
            this.updateShaderData();
        }

        updateShaderData() {
            this.posLoc = this.rnd.gl.getAttribLocation(this.prg, "InPosition");
            this.normLoc = this.rnd.gl.getAttribLocation(this.prg, "InNormal");
            this.texLoc = this.rnd.gl.getAttribLocation(this.prg, "InTexCoord");

            // Shader uniforms
            this.uniforms = {};
            const countUniforms = this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < countUniforms; i++) {
                const info = this.rnd.gl.getActiveUniform(this.prg, i);
                this.uniforms[info.name] = {
                    name: info.name,
                    type: info.type,
                    size: info.size,
                    loc: this.rnd.gl.getUniformLocation(this.prg, info.name),
                };
            }

            // Shader uniform blocks
            this.uniformBlocks = {};
            const countUniformBlocks = this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.ACTIVE_UNIFORM_BLOCKS);
            for (let i = 0; i < countUniformBlocks; i++) {
                const block_name = this.rnd.gl.getActiveUniformBlockName(this.prg, i);
                const index = this.rnd.gl.getUniformBlockIndex(this.prg, block_name);
                this.uniformBlocks[block_name] = {
                    name: block_name,
                    index: index,
                    size: this.rnd.gl.getActiveUniformBlockParameter(this.prg, index, this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE),
                    bind: this.rnd.gl.getActiveUniformBlockParameter(this.prg, index, this.rnd.gl.UNIFORM_BLOCK_BINDING),
                };
            }

            this.rnd.matrixUBO.apply(this);
            this.rnd.primUBO.apply(this);
            this.rnd.timeUBO.apply(this);
        }

        apply() {
            if (this.prg != null) {
                this.rnd.gl.useProgram(this.prg);
                return true;
            }
            return false;
        }

        newMaterial(ambient, diffuse, specular, phong, trans) {
            return new Material(this, ambient, diffuse, specular, phong, trans);
        }
    }

    class Texture {
        constructor(rnd, url) {
            const gl = rnd.gl;

            this.rnd = rnd;
            this.texId = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.textId);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 1;
            const height = 1;
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;
            const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
            gl.texImage2D(
                gl.TEXTURE_2D,
                level,
                internalFormat,
                width,
                height,
                border,
                srcFormat,
                srcType,
                pixel,
            );

            const image = new Image();
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, this.texId);
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    level,
                    internalFormat,
                    srcFormat,
                    srcType,
                    image,
                );

                if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                    // Yes, it's a power of 2. Generate mips.
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                    // No, it's not a power of 2. Turn off mips and set
                    // wrapping to clamp to edge
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
            };
            image.crossOrigin = "anonymous";
            image.src = url;
        }

        apply(num) {
            this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + num);
            this.rnd.gl.bindTexture(this.rnd.gl.TEXTURE_2D, this.texId);
        }
    }

    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }

    class Control {
        constructor(render) {
            this.forward = vec3(0, 0, 1);
            this.right = vec3(1, 0, 0);
            this.up = vec3(0, 1, 0);
            this.position = vec3(0);
            this.moveSpeed = 3.0;
            this.sense = 0.0022;
            this.render = render;
            this.keyTab = {};
            this.transform = mat4(1);
            this.velocity = 0;
            this.acceleration = 30.0;

            render.canvas.onmousemove = (e) => {
                if (e.buttons == 1) ;
            };
            window.onkeydown = e => {
                if (e.code == "Space") {
                    this.velocity = 10.0;
                }
                if (e.code == "KeyA") {
                    this.keyTab["KeyA"] = true;
                } else if (e.code == "KeyD") {
                    this.keyTab["KeyD"] = true;
                } else if (e.code == "KeyW") {
                    this.keyTab["KeyW"] = true;
                } else if (e.code == "KeyS") {
                    this.keyTab["KeyS"] = true;
                } else if (e.code == "ShiftLeft") {
                    this.keyTab["ShiftLeft"] = true;
                } else if (e.code == "Space") {
                    this.keyTab["Space"] = true;
                }
            };
            window.onkeyup = e => {
                if (e.code == "KeyA") {
                    this.keyTab["KeyA"] = false;
                } else if (e.code == "KeyD") {
                    this.keyTab["KeyD"] = false;
                } else if (e.code == "KeyW") {
                    this.keyTab["KeyW"] = false;
                } else if (e.code == "KeyS") {
                    this.keyTab["KeyS"] = false;
                } else if (e.code == "ShiftLeft") {
                    this.keyTab["ShiftLeft"] = false;
                } else if (e.code == "Space") {
                    this.keyTab["Space"] = false;
                }
            };

            window.onmousemove = async (e) => {
                this.forward = this.forward.mulmatr(matrRotate(-e.movementX * this.sense, vec3(0, 1, 0)));
                this.right = this.right.mulmatr(matrRotate(-e.movementX * this.sense, vec3(0, 1, 0)));
                this.forward = this.forward.mulmatr(matrRotate(e.movementY * this.sense, this.right));

                this.transform = this.transform.mul(matrRotate(-e.movementX * this.sense, vec3(0, 1, 0)));
                this.transform = this.transform.mul(matrRotate(e.movementY * this.sense, this.right));
                //this.up = this.up.mulmatr(matrRotate(e.movementY * this.sense, this.right));
            };
        }
        response() {
            this.velocity -= this.acceleration * this.render.timer.globalDeltaTime;
            this.position.y = this.position.y + this.velocity * this.render.timer.globalDeltaTime;
            /*if (this.velocity < 0 && this.position.y >= 2.5) {
            } else if (this.velocity > 0 && this.position.y < 2.5) {
                this.position.y = this.position.y + this.velocity * this.render.timer.globalDeltaTime;
            }*/
            if (this.position.y < 2.5)
                this.position.y = 2.5;

            if (this.keyTab["KeyA"]) {
                this.position = this.position.add(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } if (this.keyTab["KeyD"]) {
                this.position = this.position.sub(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } if (this.keyTab["KeyW"]) {
                this.position = this.position.add(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } if (this.keyTab["KeyS"]) {
                this.position = this.position.sub(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } if (this.keyTab["ShiftLeft"]) {
                this.position = this.position.sub(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } if (this.keyTab["Space"]) ;
            this.render.setCam(this.position, this.position.add(this.forward), this.up);
        }
    }

    // General class for rendering.
    // One render per canvas.
    class Render {
        transparents = [];

        setFrustum() {
            mat4(1);
            let rx = this.projSize, ry = this.projSize;

            /* Correct aspect ratio */
            if (this.width >= this.height)
                rx *= this.width / this.height;
            else
                ry *= this.height / this.width;

            this.matrProj = matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip);
        }

        setCam(loc, at, up) {
            this.matrView = matrView(loc, at, up);
            this.updateMatrixes();
        }

        updateMatrixes() {
            let right = vec3(
                this.matrView.a[0][0],
                this.matrView.a[1][0],
                this.matrView.a[2][0]
            );
            let up = vec3(
                this.matrView.a[0][1],
                this.matrView.a[1][1],
                this.matrView.a[2][1]);
            let dir = vec3(-this.matrView.a[0][2],
                -this.matrView.a[1][2],
                -this.matrView.a[2][2]);

            let data = this.matrProj.linearize().concat(this.matrView.linearize());
            data = data.concat(dir.linearize(), [0], right.linearize(), [0], up.linearize(), [0]);
            data = data.concat([this.canvas.width, this.canvas.height, this.projSize, this.projDist]);
            this.matrixUBO.update(new Float32Array(data));
        }

        renderStart() {
            this.timer.response();
            this.control.response();

            //this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        renderEnd() {
            if (this.transparents.length != 0) {
                this.gl.enable(this.gl.BLEND);
                this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

                for (let p of this.transparents) {
                    p.prim.renderNow(p.world);
                }
                this.gl.disable(this.gl.BLEND);
                this.transparents = [];
            }
        }

        constructor(canvas) {
            this.canvas = canvas;

            // Default camera properties
            this.projSize = 0.2;
            this.projDist = 0.1;
            this.farClip = 300;

            // Evaluating canvas size
            let rect = canvas.getBoundingClientRect();
            this.width = rect.right - rect.left + 1;
            this.height = rect.bottom - rect.top + 1;

            // Getting GL context
            this.gl = canvas.getContext("webgl2", {
                premultipliedAlpha: false,
                alpha: false
            });
            this.gl.clearColor(0.9, 0.9, 0.9, 1);
            this.gl.enable(this.gl.DEPTH_TEST);

            // Contol init
            this.control = new Control(this);

            // Initializing camera
            this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2 + 4 * 16, 0);
            this.setFrustum();
            this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
            this.updateMatrixes();

            // Initializing prim ubo
            this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

            // Initializing timer
            this.timer = new Timer();
            this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
        }

        newShader(fileName) {
            return new Shader(this, fileName);
        }

        newTexture(fileName) {
            return new Texture(this, fileName);
        }

        newUniformBuffer(bufferName, bufferSize, binding) {
            return new UniformBuffer(this, bufferName, bufferSize, binding);
        }

        newSkySphere(texName) {
            const vertexes = [vertex(vec3(-1, -1, 0.999), vec3(0)), vertex(vec3(-1, 3, 0.999), vec3(0)), vertex(vec3(3, -1, 0.999), vec3(0))];
            const indicies = [0, 1, 2];
            const shd = this.newShader("sky sphere");
            const mtl = shd.newMaterial(vec3(0), vec3(0), vec3(0), 0, 1.0);
            const tex = this.newTexture(texName);
            mtl.attachTexture(tex, 0);
            return mtl.newPrimitive(vertexes, indicies);
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
            this.texCoords = [
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
                [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)],
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

        setStar() {
            this.vertexes = [];
            this.setDodecahedron();

            let verts = [];

            for (let i = 0; i < this.vertexes.length; i++) {
                let p = vec3(0);

                for (let v of this.vertexes[i]) {
                    p = p.add(v);
                }
                p = p.div(5);
                p = p.mul(3);

                let tris =
                    [
                        [this.vertexes[i][0], this.vertexes[i][1], p],
                        [this.vertexes[i][1], this.vertexes[i][2], p],
                        [this.vertexes[i][2], this.vertexes[i][3], p],
                        [this.vertexes[i][3], this.vertexes[i][4], p],
                        [this.vertexes[i][4], this.vertexes[i][0], p],
                    ];
                for (let i = 0; i < 5; i++)
                    verts.push(tris[i]);
            }

            this.vertexes = verts;
        }

        makePrim(mtl) {
            let indicies = [];
            let vertexes = [];
            let j = 0;

            for (let e = 0; e < this.vertexes.length; e++) {
                let edge = this.vertexes[e];

                if (this.texCoords != undefined) {
                    for (let v in edge) {
                        vertexes.push(vertex(edge[v], vec3(0), this.texCoords[e][v]));
                    }
                } else {
                    for (let v in edge) {
                        vertexes.push(vertex(edge[v], vec3(0)));
                    }
                }

                for (let i = 2; i < edge.length; i++) {
                    indicies.push(j + 0);
                    indicies.push(j + i - 1);
                    indicies.push(j + i);
                }
                j += edge.length;
            }

            return new Prim(mtl, vertexes, indicies);
        }
    }

    class Room {
        constructor(render, fileName) {
            this.map;
            this.blocks = [];

            this.shader = render.newShader("default");
            this.mtl = this.shader.newMaterial(vec3(0.1), vec3(1, 0.5, 1.0), vec3(0.3), 90, 0.7);
            this.tex = render.newTexture("./bin/textures/em.jpg");
            this.mtl.attachTexture(this.tex, 0);
            this.mtl.update();
            this.mtl1 = this.shader.newMaterial(vec3(0.1), vec3(1, 0.5, 1.0), vec3(0.3), 90, 1.0);
            this.tex1 = render.newTexture("./bin/textures/lapis.jpg");
            this.mtl1.attachTexture(this.tex1, 0);
            this.mtl1.update();

            let fcube = new Figure();
            fcube.setCube();
            this.cube = fcube.makePrim(this.mtl);
            this.cubeFloor = fcube.makePrim(this.mtl1);
            this.map = null;
            this.image = null;
            Jimp.read(fileName, (err, image) => {
                this.map = image.bitmap.data;
                this.image = image;
            });
        }
        render(world) {
            if (this.map == null)
                return;
            for (let block of this.blocks) {
                block.render(mat4(1));
            }
            for (let y = 0; y < this.image.bitmap.height; y++)
                for (let x = 0; x < this.image.bitmap.width; x++) {
                    let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));

                    if (c.r == 255) {
                        for (let i = 0; i < 5; i++) {
                            this.cube.render(matrTranslate(vec3(x, i, y)).mul(world));
                        }
                    } else if (c.b == 255) {
                        this.cubeFloor.render(matrTranslate(vec3(x, 0, y)).mul(world));
                    }
                }
        }

        putPixel(x, y, c) {
            this.image.setPixelColor(x, y, c);
        }
    }
    function imgToContext2d(canvas, context, image) {
        let fracw = Math.floor(canvas.width / image.bitmap.width);
        let frach = Math.floor(canvas.height / image.bitmap.height);
        for (let y = 0; y < image.bitmap.height; y++)
            for (let x = 0; x < image.bitmap.width; x++) {
                let c = Jimp.intToRGBA(image.getPixelColor(x, y));
                context.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 1.0)`;
                context.fillRect(x * fracw, y * frach, fracw, frach);
            }
    }

    const host = "localhost";
    const port = "8000";
    let userName;
    let playersPool = {};
    let mainRender;
    let avatars = {};

    function wsInit(render) {
        userName = sessionStorage.getItem("name");

        mainRender = render;
        let socket = new WebSocket(`ws://${host}:${port}`);

        socket.onopen = e => onConnection(socket);
        socket.onmessage = e => onMessage(socket, JSON.parse(e.data));
        setInterval(() => onInterval(socket), 1);
    }


    function onConnection(socket, m) {
        console.log("hello from client");
        socket.send(JSON.stringify({ type: "connected" }));
    }

    function onMessage(socket, m) {
        if (m.type == "players") {
            playersPool = m.players;
            for (let p in m.players)
                if (avatars[p] == undefined) {
                    // Step 1: Hash your email address using SHA-256.
                    const hashedEmail = CryptoJS.SHA256(m.players[p].id);
                    avatars[p] = mainRender.newTexture(`https://www.gravatar.com/avatar/${hashedEmail}`);
                }
        }
    }

    function onInterval(socket) {
        // Sending coords to the server
        socket.send(JSON.stringify({ type: "coords", id: userName, coords: { trans: mainRender.control.transform, pos: mainRender.control.position } }));
        // Asking for getting coords from server
        socket.send(JSON.stringify({ type: "get_coords" }));
    }

    function getPlayers() {
        return { players: playersPool, id: userName, avatars: avatars };
    }

    class Labirint {
        constructor(render, fileName) {
            this.rooms = [
                new Room(render, "./bin/rooms/room1.png"),
                new Room(render, "./bin/rooms/room2.png"),
                new Room(render, "./bin/rooms/room3.png")
            ];
            this.vert = [new Room(render, "./bin/rooms/vert.png")];
            this.horz = [new Room(render, "./bin/rooms/horz.png")];

            this.map = [];
            this.loaded = false;
            Jimp.read(fileName, (err, image) => {
                this.loaded = true;
                this.map = image.bitmap.data;
                this.image = image;
            });
        }

        render() {
            if (!this.loaded)
                return;
            for (let y = 0; y < this.image.bitmap.height; y += 2)
                for (let x = 0; x < this.image.bitmap.width; x += 2) {
                    let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                    if (c.r == 255) {
                        this.rooms[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                    } else if (c.g == 255) {
                        this.rooms[1].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                    } else if (c.b == 255) {
                        this.rooms[2].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                    }
                }
            for (let y = 1; y < this.image.bitmap.height; y += 2)
                for (let x = 0; x < this.image.bitmap.width; x += 2) {
                    let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                    if (c.r == 255 && c.g == 255 && c.b == 255)
                        this.vert[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                }
            for (let y = 0; y < this.image.bitmap.height; y += 2)
                for (let x = 1; x < this.image.bitmap.width; x += 2) {
                    let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                    if (c.r == 255 && c.g == 255 && c.b == 255)
                        this.horz[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                }
        }
    }

    function main() {

      let figure = new Figure();
      figure.setDodecahedron();

      let canvas = document.getElementById("mainFrame");
      let render = new Render(canvas);
      wsInit(render);
      let shader = render.newShader("default");
      let material = shader.newMaterial(vec3(0.1), vec3(0, 0.5, 1.0), vec3(0.3), 90, 1.0);
      let material1 = shader.newMaterial(vec3(0.1), vec3(1, 0.5, 1.0), vec3(0.3), 90, 0.5);
      let prim = figure.makePrim(material);
      let tex = render.newTexture("./bin/textures/em.jpg");
      material1.attachTexture(tex, 0);
      material1.update();
      render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));
      let lab = new Labirint(render, "./bin/labs/def.png");
      let pl_mtl = shader.newMaterial(vec3(0.1), vec3(1, .1, .1), vec3(0.3), 90, 1.0);
      pl_mtl.attachTexture(tex, 0);
      pl_mtl.update();
      let f = new Figure();
      f.setCube();
      let pl_pr = f.makePrim(pl_mtl);

      let canvasFlow = document.getElementById("flowFrame");
      let contextFlow = canvasFlow.getContext("2d");
      canvasFlow.addEventListener("click", (e) => {
        if (lab.image != null) {
          let fracw = Math.floor(contextFlow.width / lab.image.bitmap.width);
          let frach = Math.floor(contextFlow.height / lab.image.bitmap.height);

          lab.image.setPixelColor("#FFFFFF", e.offsetX / fracw, e.offsetY / frach);
          imgToContext2d(canvasFlow, contextFlow, lab.image);
        }
      });

      canvas.onclick = function () {
        canvas.requestPointerLock();
      };

      //let sky = render.newSkySphere("./bin/textures/space.png");
      //let sky = render.newSkySphere("./bin/textures/water.jpg");

      const draw = () => {
        let p = getPlayers();

        render.renderStart();
        for (let player in p.players) {
          if (p.id != player) {
            pl_pr.mtl.attachTexture(p.avatars[player], 0);
            pl_pr.render(mat4(p.players[player].coords.trans).mul(matrTranslate(p.players[player].coords.pos)));
          }
        }

        prim.render(matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(matrTranslate(vec3(0, 0, 0))));
        lab.render();
        render.renderEnd();
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.onload = main;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC92ZWMyLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvcHJpbS5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9jdHJsL2N0cmwuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9wbGF0L3BsYXQuanMiLCIuLi9zcmMvZ2VuL2dlbi5qcyIsIi4uL3NyYy93cy5qcyIsIi4uL3NyYy9nZW4vbGFiLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX3ZlYzMge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgeikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnogPSB6O1xyXG4gICAgfVxyXG5cclxuICAgIGxlbjIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbigpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZG90KHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtKCkge1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLmxlbigpO1xyXG5cclxuICAgICAgICBpZiAobGVuID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMzKDApO1xyXG5cclxuICAgICAgICBpZiAobGVuID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiB2ZWMzKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpdihsZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnksIHRoaXMueiArIHYueik7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwoaykge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIGssIHRoaXMueSAqIGssIHRoaXMueiAqIGspO1xyXG4gICAgfVxyXG5cclxuICAgIGRpdihrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54IC8gaywgdGhpcy55IC8gaywgdGhpcy56IC8gayk7XHJcbiAgICB9XHJcblxyXG4gICAgZG90KHYpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnkgKiB2LnogLSB0aGlzLnogKiB2LnksXHJcbiAgICAgICAgICAgIHRoaXMueiAqIHYueCAtIHRoaXMueCAqIHYueixcclxuICAgICAgICAgICAgdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54KTtcclxuICAgIH1cclxuXHJcbiAgICBtdWxtYXRyKG0pIHtcclxuICAgICAgICBsZXQgdyA9IHRoaXMueCAqIG0uYVswXVszXSArXHJcbiAgICAgICAgICAgIHRoaXMueSAqIG0uYVsxXVszXSArXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVsyXVszXSArXHJcbiAgICAgICAgICAgIG0uYVszXVszXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0pIC8gdyxcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdKSAvIHcsKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0obSkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwb2ludFRyYW5zZm9ybSgpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzBdICsgdGhpcy55ICogbS5hWzFdWzBdICsgdGhpcy56ICogbS5hWzJdWzBdICsgbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMV0gKyB0aGlzLnkgKiBtLmFbMV1bMV0gKyB0aGlzLnogKiBtLmFbMl1bMV0gKyBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsyXSArIHRoaXMueSAqIG0uYVsxXVsyXSArIHRoaXMueiAqIG0uYVsyXVsyXSArIG0uYVszXVsyXVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGluZWFyaXplKCkge1xyXG4gICAgICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMuel07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKHgsIHksIHopIHtcclxuICAgIGlmICh4ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKDAsIDAsIDApO1xyXG4gICAgaWYgKHR5cGVvZiB4ID09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMyh4LngsIHgueSwgeC56KTtcclxuICAgIGlmICh5ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHgsIHgpO1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMyh4LCB5LCB6KTtcclxufVxyXG4iLCJjbGFzcyBfdmVjMiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVjMih4LCB5KSB7XHJcbiAgICBpZiAoeSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVjMih4LCB4KTtcclxuICAgIHJldHVybiBuZXcgX3ZlYzIoeCwgeSk7XHJcbn0iLCJjbGFzcyBfbWF0NCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXHJcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcclxuICAgICAgICBhMzAsIGEzMSwgYTMyLCBhMzNcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYSA9IFtbYTAwLCBhMDEsIGEwMiwgYTAzXSxcclxuICAgICAgICBbYTEwLCBhMTEsIGExMiwgYTEzXSxcclxuICAgICAgICBbYTIwLCBhMjEsIGEyMiwgYTIzXSxcclxuICAgICAgICBbYTMwLCBhMzEsIGEzMiwgYTMzXV07XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKG0pIHtcclxuICAgICAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzNdKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdCguLi50aGlzLmEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NChcclxuICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcclxuICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4pIHtcclxuICAgIGlmIChhMDAgPT0gMSAmJiBhMDEgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDAsIDEpO1xyXG4gICAgaWYgKHR5cGVvZiBhMDAgPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgICAgICBhMDAuYVswXVswXSwgYTAwLmFbMF1bMV0sIGEwMC5hWzBdWzJdLCBhMDAuYVswXVszXSxcclxuICAgICAgICAgICAgYTAwLmFbMV1bMF0sIGEwMC5hWzFdWzFdLCBhMDAuYVsxXVsyXSwgYTAwLmFbMV1bM10sXHJcbiAgICAgICAgICAgIGEwMC5hWzJdWzBdLCBhMDAuYVsyXVsxXSwgYTAwLmFbMl1bMl0sIGEwMC5hWzJdWzNdLFxyXG4gICAgICAgICAgICBhMDAuYVszXVswXSwgYTAwLmFbM11bMV0sIGEwMC5hWzNdWzJdLCBhMDAuYVszXVszXVxyXG4gICAgICAgICk7XHJcbiAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJSb3RhdGUoYW5nbGUsIGF4aXMpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGEgPSBhbmdsZSAvIE1hdGguUEkgKiAxODAuMCxcclxuICAgICAgICBzaSA9IE1hdGguc2luKGFuZ2xlKSwgY28gPSBNYXRoLmNvcyhhbmdsZSksXHJcbiAgICAgICAgdiA9IGF4aXMubm9ybSgpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIGNvICsgdi54ICogdi54ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi54ICogdi55ICogKDEgLSBjbykgKyB2LnogKiBzaSxcclxuICAgICAgICB2LnggKiB2LnogKiAoMSAtIGNvKSAtIHYueSAqIHNpLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdi55ICogdi54ICogKDEgLSBjbykgLSB2LnogKiBzaSxcclxuICAgICAgICBjbyArIHYueSAqIHYueSAqICgxIC0gY28pLFxyXG4gICAgICAgIHYueSAqIHYueiAqICgxIC0gY28pICsgdi54ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnogKiB2LnggKiAoMSAtIGNvKSArIHYueSAqIHNpLFxyXG4gICAgICAgIHYueiAqIHYueSAqICgxIC0gY28pIC0gdi54ICogc2ksXHJcbiAgICAgICAgY28gKyB2LnogKiB2LnogKiAoMSAtIGNvKSxcclxuICAgICAgICAwLCAwLCAwLCAwLCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clRyYW5zbGF0ZSh0KSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICB0LngsIHQueSwgdC56LCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clNjYWxlKHMpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHMueCwgMCwgMCwgMCxcclxuICAgICAgICAwLCBzLnksIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgcy56LCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDFcclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJGcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAyICogbmVhciAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDIgKiBuZWFyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgLTEsXHJcbiAgICAgICAgMCwgMCwgLTIgKiBuZWFyICogZmFyIC8gKGZhciAtIG5lYXIpLCAwXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clZpZXcobG9jLCBhdCwgdXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtKCksXHJcbiAgICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtKCksXHJcbiAgICAgICAgdXAgPSByaWdodC5jcm9zcyhkaXIpLm5vcm0oKTtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHJpZ2h0LngsIHVwLngsIC1kaXIueCwgMCxcclxuICAgICAgICByaWdodC55LCB1cC55LCAtZGlyLnksIDAsXHJcbiAgICAgICAgcmlnaHQueiwgdXAueiwgLWRpci56LCAwLFxyXG4gICAgICAgIC1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFcclxuICAgICk7XHJcbn0iLCJjbGFzcyBfYnVmZmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJuZCwgdHlwZSwgc2l6ZSkge1xyXG4gICAgICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7ICAgIC8vIEJ1ZmZlciB0eXBlIChnbC4qKipfQlVGRkVSKVxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7ICAgIC8vIEJ1ZmZlciBzaXplIGluIGJ5dGVzXHJcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHNpemUgPT0gMCB8fCB0eXBlID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaWQgPSBybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0eXBlLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5idWZmZXJEYXRhKHR5cGUsIHNpemUsIHJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMudHlwZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLnR5cGUsIDAsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pZm9ybUJ1ZmZlciBleHRlbmRzIF9idWZmZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCBuYW1lLCBzaXplLCBiaW5kUG9pbnQpIHtcclxuICAgICAgICBzdXBlcihybmQsIHJuZC5nbC5VTklGT1JNX0JVRkZFUiwgc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmJpbmRQb2ludCA9IGJpbmRQb2ludDsgLy8gQnVmZmVyIEdQVSBiaW5kaW5nIHBvaW50XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkoc2hkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm5kID09IHVuZGVmaW5lZCB8fCBzaGQucHJnID09IHVuZGVmaW5lZCB8fCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wudW5pZm9ybUJsb2NrQmluZGluZyhzaGQucHJnLCBzaGQudW5pZm9ybUJsb2Nrc1t0aGlzLm5hbWVdLmluZGV4LCB0aGlzLmJpbmRQb2ludCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyQmFzZShzaGQucm5kLmdsLlVOSUZPUk1fQlVGRkVSLCB0aGlzLmJpbmRQb2ludCwgdGhpcy5pZCk7XHJcbiAgICB9XHJcbn0iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIFRpbWVyIGNsYXNzIG1vZHVsZVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmdsb2JhbFRpbWUgPSB0aGlzLmxvY2FsVGltZSA9IHRoaXMuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm9sZFRpbWUgPSB0aGlzLm9sZFRpbWVGUFMgPSB0aGlzLmdsb2JhbFRpbWU7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRlBTID0gMzAuMDtcclxuICAgICAgICB0aGlzLnBhdXNlVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGN1cnJlbnQgZ2xvYmFsIHRpbWUgZnVudGlvblxyXG4gICAgZ2V0VGltZSgpIHtcclxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgdCA9XHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwLjAgK1xyXG4gICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjA7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldCBjdXJyZW50IEZQUyBmdW5jdGlvblxyXG4gICAgZ2V0RlBTKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZQUy50b0ZpeGVkKDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlRW5iYWxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VEaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlU3dpdGNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2UgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IHRydWU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBvbnNlIHRpbWVyIGZ1bmN0aW9uXHJcbiAgICByZXNwb25zZSh0YWdfaWQgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxUaW1lID0gdDtcclxuICAgICAgICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHQgLSB0aGlzLm9sZFRpbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2UpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lICs9IHQgLSB0aGlzLm9sZFRpbWU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IHRoaXMuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsVGltZSA9IHQgLSB0aGlzLnBhdXNlVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIrKztcclxuICAgICAgICBpZiAodCAtIHRoaXMub2xkVGltZUZQUyA+IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5GUFMgPSB0aGlzLmZyYW1lQ291bnRlciAvICh0IC0gdGhpcy5vbGRUaW1lRlBTKTtcclxuICAgICAgICAgICAgdGhpcy5vbGRUaW1lRlBTID0gdDtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGFnX2lkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWdfaWQpLmlubmVySFRNTCA9IHRoaXMuZ2V0RlBTKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSB0O1xyXG4gICAgfTtcclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uLy4uL210aC92ZWMyLmpzXCJcclxuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuLi8uLi9tdGgvbWF0NC5qc1wiXHJcblxyXG5jbGFzcyBfdmVydGV4IHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgICAgICB0aGlzLnRleCA9IHRleDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0sIHRleCkge1xyXG4gICAgaWYgKHRleCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVydGV4KHBvcywgbm9ybSwgdmVjMigwKSk7XHJcbiAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB0ZXgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjcmVhdGUoc2hkLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICBsZXQgdHJpbWFzaCA9IFtdLCBpID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFsuLi52ZXJ0ZXhlc107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFsuLi5pbmRpY2llc107XHJcbiAgICAgICAgdGhpcy5zaGQgPSBzaGQ7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdiBvZiB2ZXJ0ZXhlcykge1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy55O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueDtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhBcnJheUlkID0gc2hkLnJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZEJ1ZmZlcihzaGQucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRyaW1hc2gpLCBzaGQucm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zTG9jICE9IC0xICYmIHRoaXMubm9ybUxvYyAhPSAtMSkge1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLnBvc0xvYywgMywgc2hkLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAwKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQucG9zTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC5ub3JtTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDEyKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQubm9ybUxvYyk7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQudGV4TG9jLCAyLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDI0KTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQudGV4TG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmRpY2llcyksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG1hdDQoMSk7XHJcbiAgICAgICAgaWYgKGluZGljaWVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5zaGQgPSBtdGwuc2hkO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21PYmoobXRsLCB2ZXJ0ZXhlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tdGwgPSBtdGw7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih3b3JsZCkge1xyXG4gICAgICAgIGlmICh0aGlzLm10bC5UcmFucyAhPSAxLjApIHtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLnRyYW5zcGFyZW50cy5wdXNoKHsgcHJpbTogdGhpcywgd29ybGQ6IHdvcmxkIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlY3JlYXRpbmcgcHJpbWl0aXZlIGlmIGl0IHdhc24ndCBjcmVhdGVkXHJcbiAgICAgICAgLy8gKGJlY2F1c2Ugb2Ygc2hhZGVyIGFzeW5jIGluaXRpYWxpemF0aW9uKVxyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbCAmJiB0aGlzLmxvYWRlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZSh0aGlzLnNoZCwgdGhpcy52ZXJ0ZXhlcywgdGhpcy5pbmRpY2llcyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERyYXdpbmcgcHJpbWl0aXZlIGlmIHNoYWRlciBpcyBsb2FkZWRcclxuICAgICAgICBpZiAodGhpcy5tdGwuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQucHJpbVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLnRyYW5zZm9ybS5tdWwod29ybGQpLmxpbmVhcml6ZSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5zaGQucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLkluZGV4QnVmZmVySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuc2hkLnJuZC5nbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtZW50cywgdGhpcy5zaGQucm5kLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck5vdyh3b3JsZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbCAmJiB0aGlzLmxvYWRlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZSh0aGlzLnNoZCwgdGhpcy52ZXJ0ZXhlcywgdGhpcy5pbmRpY2llcyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXRsLmFwcGx5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLnByaW1VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy50cmFuc2Zvcm0ubXVsKHdvcmxkKS5saW5lYXJpemUoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMuc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmRyYXdFbGVtZW50cyh0aGlzLnNoZC5ybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbWVudHMsIHRoaXMuc2hkLnJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmcm9tT2JqKG10bCwgZmlsZU5hbWUpIHtcclxuICAgICAgICBsZXQgdnR4ID0gW107XHJcbiAgICAgICAgbGV0IGZpbGUgPSBhd2FpdCBmZXRjaChgYmluL21vZGVscy8ke2ZpbGVOYW1lfS5vYmpgKTtcclxuICAgICAgICBsZXQgc3JjID0gYXdhaXQgZmlsZS50ZXh0KCk7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gc3JjLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5kaWNpZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lWzBdID09ICd2Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tzW2ldID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdi5wdXNoKHBhcnNlRmxvYXQodG9rc1tpXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZ0eC5wdXNoKHZlYzModlswXSwgdlsxXSwgdlsyXSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2ZWMzKHZbMF0sIHZbMV0sIHZbMl0pKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZVswXSA9PSAnZicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2tzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDE7IHQgPCA0OyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHZlcnRleCh2dHhbcGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2gocGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy52ZXJ0ZXhlcy5wdXNoKHYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2llcy5wdXNoKGkpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNyZWF0ZShtdGwuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vYnVmLmpzXCJcclxuaW1wb3J0IHsgUHJpbSB9IGZyb20gXCIuL3ByaW0uanNcIjtcclxuXHJcbi8vIENsYXNzIGZvciBob2xkaW5nIG1hdGVyaWFsIHByb3BlcnRpZXMgb2YgcHJpbWl0aXZlLlxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xyXG4gICAgY29uc3RydWN0b3Ioc2hkLCBLYSwgS2QsIEtzLCBQaCwgVHJhbnMpIHtcclxuICAgICAgICB0aGlzLnNoZCA9IHNoZDtcclxuICAgICAgICB0aGlzLkthID0gS2E7XHJcbiAgICAgICAgdGhpcy5LZCA9IEtkO1xyXG4gICAgICAgIHRoaXMuS3MgPSBLcztcclxuICAgICAgICB0aGlzLlBoID0gUGg7XHJcbiAgICAgICAgdGhpcy5UcmFucyA9IFRyYW5zO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZXMgPSBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XHJcblxyXG4gICAgICAgIHRoaXMuVUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcy5zaGQucm5kLCBcInVfbWF0ZXJpYWxcIiwgMTYgKiA0LCAzKTtcclxuICAgICAgICAvL3RoaXMuVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSkpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGxldCB0ZXhfZmxhZ3MgPSBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLkthLmxpbmVhcml6ZSgpLmNvbmNhdChbMF0sIHRoaXMuS2QubGluZWFyaXplKCksIFt0aGlzLlRyYW5zXSwgdGhpcy5Lcy5saW5lYXJpemUoKSwgW3RoaXMuUGhdKVxyXG5cclxuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDQ7IHQrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbdF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRleF9mbGFnc1t0XSA9IDE7XHJcblxyXG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdCh0ZXhfZmxhZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLlVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLmFwcGx5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5VQk8uYXBwbHkodGhpcy5zaGQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCA0OyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmVzW3RdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlc1t0XS5hcHBseSh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2hUZXh0dXJlKHRleHR1cmUsIG51bSkge1xyXG4gICAgICAgIGlmIChudW0gPiAzIHx8IG51bSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlc1tudW1dID0gdGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdQcmltaXRpdmUodmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKHRoaXMsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL210bFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucHJnID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgX2luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzID1cclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnJuZC5nbC5GUkFHTUVOVF9TSEFERVIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmcmFnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGJpbi9zaGFkZXJzLyR7dGhpcy5uYW1lfS8ke3MubmFtZX0uZ2xzbGApO1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNyYyA9PSBcInN0cmluZ1wiICYmIHNyYyAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHtcclxuICAgICAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNoYWRlcnNbMF0uc3JjID09IFwiXCIgfHwgdGhpcy5zaGFkZXJzWzFdLnNyYyA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzLmlkKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcmcgPSB0aGlzLnJuZC5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzLmlkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJuZC5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcmcsIHMuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcmcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5wb3NMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJblBvc2l0aW9uXCIpO1xyXG4gICAgICAgIHRoaXMubm9ybUxvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluTm9ybWFsXCIpO1xyXG4gICAgICAgIHRoaXMudGV4TG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5UZXhDb29yZFwiKTtcclxuXHJcbiAgICAgICAgLy8gU2hhZGVyIHVuaWZvcm1zXHJcbiAgICAgICAgdGhpcy51bmlmb3JtcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtKHRoaXMucHJnLCBpKTtcclxuICAgICAgICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgICAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIGluZm8ubmFtZSksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaGFkZXIgdW5pZm9ybSBibG9ja3NcclxuICAgICAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgICAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja05hbWUodGhpcy5wcmcsIGkpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucm5kLmdsLmdldFVuaWZvcm1CbG9ja0luZGV4KHRoaXMucHJnLCBibG9ja19uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYmxvY2tfbmFtZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgIHNpemU6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLnByZywgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcclxuICAgICAgICAgICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLnByZywgaW5kZXgsIHRoaXMucm5kLmdsLlVOSUZPUk1fQkxPQ0tfQklORElORyksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJuZC5tYXRyaXhVQk8uYXBwbHkodGhpcyk7XHJcbiAgICAgICAgdGhpcy5ybmQucHJpbVVCTy5hcHBseSh0aGlzKTtcclxuICAgICAgICB0aGlzLnJuZC50aW1lVUJPLmFwcGx5KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm5kLmdsLnVzZVByb2dyYW0odGhpcy5wcmcpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld01hdGVyaWFsKGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBwaG9uZywgdHJhbnMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdGVyaWFsKHRoaXMsIGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBwaG9uZywgdHJhbnMpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFRleHR1cmUge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCB1cmwpIHtcclxuICAgICAgICBjb25zdCBnbCA9IHJuZC5nbDtcclxuXHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy50ZXhJZCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHRJZCk7XHJcbiAgICAgICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxldmVsID0gMDtcclxuICAgICAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSAxO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDE7XHJcbiAgICAgICAgY29uc3QgYm9yZGVyID0gMDtcclxuICAgICAgICBjb25zdCBzcmNGb3JtYXQgPSBnbC5SR0JBO1xyXG4gICAgICAgIGNvbnN0IHNyY1R5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xyXG4gICAgICAgIGNvbnN0IHBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoWzAsIDAsIDI1NSwgMjU1XSk7IC8vIG9wYXF1ZSBibHVlXHJcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcclxuICAgICAgICAgICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGludGVybmFsRm9ybWF0LFxyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBib3JkZXIsXHJcbiAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgc3JjVHlwZSxcclxuICAgICAgICAgICAgcGl4ZWwsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4SWQpO1xyXG4gICAgICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICAgICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgICAgICAgICAgIGxldmVsLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBzcmNGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNQb3dlck9mMihpbWFnZS53aWR0aCkgJiYgaXNQb3dlck9mMihpbWFnZS5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBZZXMsIGl0J3MgYSBwb3dlciBvZiAyLiBHZW5lcmF0ZSBtaXBzLlxyXG4gICAgICAgICAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBObywgaXQncyBub3QgYSBwb3dlciBvZiAyLiBUdXJuIG9mZiBtaXBzIGFuZCBzZXRcclxuICAgICAgICAgICAgICAgIC8vIHdyYXBwaW5nIHRvIGNsYW1wIHRvIGVkZ2VcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiXHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KG51bSkge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRTAgKyBudW0pO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRUZXh0dXJlKHRoaXMucm5kLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4SWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1Bvd2VyT2YyKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09PSAwO1xyXG59XHJcbiIsImltcG9ydCB7IG1hdHJSb3RhdGUgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjM1wiO1xyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL210aC9tYXQ0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZW5kZXIpIHtcclxuICAgICAgICB0aGlzLmZvcndhcmQgPSB2ZWMzKDAsIDAsIDEpO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSB2ZWMzKDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudXAgPSB2ZWMzKDAsIDEsIDApO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB2ZWMzKDApO1xyXG4gICAgICAgIHRoaXMubW92ZVNwZWVkID0gMy4wO1xyXG4gICAgICAgIHRoaXMuc2Vuc2UgPSAwLjAwMjI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICAgICAgdGhpcy5rZXlUYWIgPSB7fTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG1hdDQoMSk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSAzMC4wO1xyXG5cclxuICAgICAgICByZW5kZXIuY2FudmFzLm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuYnV0dG9ucyA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3aW5kb3cub25rZXlkb3duID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTAuMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleUFcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlEXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlXXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5V1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5U1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleVNcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIlNoaWZ0TGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIlNoaWZ0TGVmdFwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJTcGFjZVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvdy5vbmtleXVwID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gXCJLZXlBXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5QVwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlEXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5V1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleVdcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlTXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5U1wiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIlNoaWZ0TGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIlNoaWZ0TGVmdFwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU3BhY2VcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCA9IHRoaXMuZm9yd2FyZC5tdWxtYXRyKG1hdHJSb3RhdGUoLWUubW92ZW1lbnRYICogdGhpcy5zZW5zZSwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gdGhpcy5yaWdodC5tdWxtYXRyKG1hdHJSb3RhdGUoLWUubW92ZW1lbnRYICogdGhpcy5zZW5zZSwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcndhcmQgPSB0aGlzLmZvcndhcmQubXVsbWF0cihtYXRyUm90YXRlKGUubW92ZW1lbnRZICogdGhpcy5zZW5zZSwgdGhpcy5yaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybS5tdWwobWF0clJvdGF0ZSgtZS5tb3ZlbWVudFggKiB0aGlzLnNlbnNlLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm0ubXVsKG1hdHJSb3RhdGUoZS5tb3ZlbWVudFkgKiB0aGlzLnNlbnNlLCB0aGlzLnJpZ2h0KSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy51cCA9IHRoaXMudXAubXVsbWF0cihtYXRyUm90YXRlKGUubW92ZW1lbnRZICogdGhpcy5zZW5zZSwgdGhpcy5yaWdodCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3BvbnNlKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgLT0gdGhpcy5hY2NlbGVyYXRpb24gKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eSAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICAvKmlmICh0aGlzLnZlbG9jaXR5IDwgMCAmJiB0aGlzLnBvc2l0aW9uLnkgPj0gMi41KSB7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZlbG9jaXR5ID4gMCAmJiB0aGlzLnBvc2l0aW9uLnkgPCAyLjUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eSAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55IDwgMi41KVxyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAyLjU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmtleVRhYltcIktleUFcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMucmlnaHQubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJLZXlEXCJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLnN1Yih0aGlzLnJpZ2h0Lm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH0gaWYgKHRoaXMua2V5VGFiW1wiS2V5V1wiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodmVjMyh0aGlzLmZvcndhcmQueCwgMCwgdGhpcy5mb3J3YXJkLnopLm5vcm0oKS5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIktleVNcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHZlYzModGhpcy5mb3J3YXJkLngsIDAsIHRoaXMuZm9yd2FyZC56KS5ub3JtKCkubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJTaGlmdExlZnRcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHRoaXMudXAubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJTcGFjZVwiXSkge1xyXG4gICAgICAgICAgICAvL3RoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnVwLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlci5zZXRDYW0odGhpcy5wb3NpdGlvbiwgdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5mb3J3YXJkKSwgdGhpcy51cCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9tdGgvdmVjMi5qc1wiXHJcbmltcG9ydCB7IG1hdDQsIG1hdHJGcnVzdHVtLCBtYXRyVmlldyB9IGZyb20gXCIuLi9tdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tIFwiLi9yZXMvYnVmLmpzXCJcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi4vdGltZXIvdGltZXIuanNcIlxyXG5pbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi9yZXMvc2hkLmpzXCJcclxuaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCIuL3Jlcy90ZXguanNcIlxyXG5pbXBvcnQgeyB2ZXJ0ZXggfSBmcm9tIFwiLi9yZXMvcHJpbS5qc1wiXHJcbmltcG9ydCB7IENvbnRyb2wgfSBmcm9tIFwiLi4vY3RybC9jdHJsLmpzXCJcclxuXHJcbi8vIEdlbmVyYWwgY2xhc3MgZm9yIHJlbmRlcmluZy5cclxuLy8gT25lIHJlbmRlciBwZXIgY2FudmFzLlxyXG5leHBvcnQgY2xhc3MgUmVuZGVyIHtcclxuICAgIHRyYW5zcGFyZW50cyA9IFtdO1xyXG5cclxuICAgIHNldEZydXN0dW0oKSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQ0KDEpO1xyXG4gICAgICAgIGxldCByeCA9IHRoaXMucHJvalNpemUsIHJ5ID0gdGhpcy5wcm9qU2l6ZTtcclxuXHJcbiAgICAgICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgICAgICBpZiAodGhpcy53aWR0aCA+PSB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgcnggKj0gdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcnkgKj0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLm1hdHJQcm9qID0gbWF0ckZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMuZmFyQ2xpcCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FtKGxvYywgYXQsIHVwKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyVmlldyA9IG1hdHJWaWV3KGxvYywgYXQsIHVwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTWF0cml4ZXMoKSB7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzBdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMV1bMF0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsyXVswXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IHVwID0gdmVjMyhcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzBdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMV1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsyXVsxXSk7XHJcbiAgICAgICAgbGV0IGRpciA9IHZlYzMoLXRoaXMubWF0clZpZXcuYVswXVsyXSxcclxuICAgICAgICAgICAgLXRoaXMubWF0clZpZXcuYVsxXVsyXSxcclxuICAgICAgICAgICAgLXRoaXMubWF0clZpZXcuYVsyXVsyXSk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5tYXRyUHJvai5saW5lYXJpemUoKS5jb25jYXQodGhpcy5tYXRyVmlldy5saW5lYXJpemUoKSk7XHJcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KGRpci5saW5lYXJpemUoKSwgWzBdLCByaWdodC5saW5lYXJpemUoKSwgWzBdLCB1cC5saW5lYXJpemUoKSwgWzBdKTtcclxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoW3RoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQsIHRoaXMucHJvalNpemUsIHRoaXMucHJvakRpc3RdKTtcclxuICAgICAgICB0aGlzLm1hdHJpeFVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lci5yZXNwb25zZSgpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbC5yZXNwb25zZSgpO1xyXG5cclxuICAgICAgICAvL3RoaXMudGltZVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbdGhpcy50aW1lci5sb2NhbFRpbWUsIHRoaXMudGltZXIubG9jYWxEZWx0YVRpbWUsIHRoaXMudGltZXIuZ2xvYmFsVGltZSwgdGhpcy50aW1lci5nbG9iYWxEZWx0YVRpbWVdKSk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJFbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnRzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xyXG4gICAgICAgICAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgb2YgdGhpcy50cmFuc3BhcmVudHMpIHtcclxuICAgICAgICAgICAgICAgIHAucHJpbS5yZW5kZXJOb3cocC53b3JsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nbC5kaXNhYmxlKHRoaXMuZ2wuQkxFTkQpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCBjYW1lcmEgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvalNpemUgPSAwLjI7XHJcbiAgICAgICAgdGhpcy5wcm9qRGlzdCA9IDAuMTtcclxuICAgICAgICB0aGlzLmZhckNsaXAgPSAzMDA7XHJcblxyXG4gICAgICAgIC8vIEV2YWx1YXRpbmcgY2FudmFzIHNpemVcclxuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdCArIDE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wICsgMTtcclxuXHJcbiAgICAgICAgLy8gR2V0dGluZyBHTCBjb250ZXh0XHJcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHtcclxuICAgICAgICAgICAgcHJlbXVsdGlwbGllZEFscGhhOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxwaGE6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuOSwgMC45LCAwLjksIDEpO1xyXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgICAgIC8vIENvbnRvbCBpbml0XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gbmV3IENvbnRyb2wodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBjYW1lcmFcclxuICAgICAgICB0aGlzLm1hdHJpeFVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9jYW1lcmFcIiwgMTYgKiA0ICogMiArIDQgKiAxNiwgMCk7XHJcbiAgICAgICAgdGhpcy5zZXRGcnVzdHVtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYW0odmVjMygwLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4ZXMoKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHByaW0gdWJvXHJcbiAgICAgICAgdGhpcy5wcmltVUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X3ByaW1pdGl2ZVwiLCAxNiAqIDQsIDEpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgdGltZXJcclxuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lVUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X3RpbWVcIiwgMTYsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1NoYWRlcihmaWxlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2hhZGVyKHRoaXMsIGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdUZXh0dXJlKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0dXJlKHRoaXMsIGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdVbmlmb3JtQnVmZmVyKGJ1ZmZlck5hbWUsIGJ1ZmZlclNpemUsIGJpbmRpbmcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgYnVmZmVyTmFtZSwgYnVmZmVyU2l6ZSwgYmluZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3U2t5U3BoZXJlKHRleE5hbWUpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0ZXhlcyA9IFt2ZXJ0ZXgodmVjMygtMSwgLTEsIDAuOTk5KSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKC0xLCAzLCAwLjk5OSksIHZlYzMoMCkpLCB2ZXJ0ZXgodmVjMygzLCAtMSwgMC45OTkpLCB2ZWMzKDApKV07XHJcbiAgICAgICAgY29uc3QgaW5kaWNpZXMgPSBbMCwgMSwgMl07XHJcbiAgICAgICAgY29uc3Qgc2hkID0gdGhpcy5uZXdTaGFkZXIoXCJza3kgc3BoZXJlXCIpO1xyXG4gICAgICAgIGNvbnN0IG10bCA9IHNoZC5uZXdNYXRlcmlhbCh2ZWMzKDApLCB2ZWMzKDApLCB2ZWMzKDApLCAwLCAxLjApO1xyXG4gICAgICAgIGNvbnN0IHRleCA9IHRoaXMubmV3VGV4dHVyZSh0ZXhOYW1lKTtcclxuICAgICAgICBtdGwuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gICAgICAgIHJldHVybiBtdGwubmV3UHJpbWl0aXZlKHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFByaW0sIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL210aC92ZWMyLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlndXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdWJlKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gZnJvbnRcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpXSwgICAgICAvLyBiYWNrXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSldLCAgLy8gbGVmdFxyXG4gICAgICAgICAgICBbdmVjMygwLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gYm90dG9tXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KV0sICAgICAgLy8gdG9wXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnRleENvb3JkcyA9IFtcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRldHJhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCBzcXJ0MyA9IE1hdGguc3FydCgzLjApLCBzcXJ0MiA9IE1hdGguc3FydCgyLjApO1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCBzcXJ0MiAvIHNxcnQzLCAwKSxcclxuICAgICAgICAgICAgZnJvbnQgPSB2ZWMzKDAsIDAsIHNxcnQzIC8gMy4wKSxcclxuICAgICAgICAgICAgbGVmdCA9IHZlYzMoLTAuNSwgMCwgLXNxcnQzIC8gNi4wKSxcclxuICAgICAgICAgICAgcmlnaHQgPSB2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNi4wKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2xlZnQsIGZyb250LCB0b3BdLCAvLyBib3RcclxuICAgICAgICAgICAgW2xlZnQsIHJpZ2h0LCB0b3BdLFxyXG4gICAgICAgICAgICBbcmlnaHQsIGZyb250LCB0b3BdLFxyXG4gICAgICAgICAgICBbZnJvbnQsIHJpZ2h0LCBsZWZ0XVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T2N0YWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgMSAvIHNxcnQyLCAwKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSksXHJcbiAgICAgICAgICAgIGxmID0gdmVjMygtMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICBsYiA9IHZlYzMoLTAuNSwgMCwgLTAuNSksXHJcbiAgICAgICAgICAgIHJmID0gdmVjMygwLjUsIDAsIDAuNSksXHJcbiAgICAgICAgICAgIHJiID0gdmVjMygwLjUsIDAsIC0wLjUpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbYm90LCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbYm90LCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbYm90LCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbYm90LCByZiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCByZiwgcmJdLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SWNvaGVkcm9uKCkge1xyXG5cclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgciA9IDAuNSAvIE1hdGguc2luKDM2IC8gMTgwICogTWF0aC5QSSk7XHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoMSAtIE1hdGgucG93KDIgKiBNYXRoLnNpbigwLjEgKiBNYXRoLlBJKSAqIHIsIDIpKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSA3Mikge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgLWQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gKGkgKyAzNikgLyAxODAuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMyhyICogTWF0aC5zaW4oYW5nbGUpLCByICogTWF0aC5jb3MoYW5nbGUpLCBkIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjIucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDAsIHIpLFxyXG4gICAgICAgICAgICBib3QgPSB0b3AubXVsKC0xKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyaTEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godHJpMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcDEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGJvdCwgbGF5ZXIxW2ldLCBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goY2FwMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB0b3AsIGxheWVyMltpXSwgbGF5ZXIyWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCByID0gTWF0aC5zcXJ0KDUwICsgMTAgKiBNYXRoLnNxcnQoNSkpIC8gMTA7XHJcbiAgICAgICAgbGV0IFIgPSAwLjI1ICogKDEgKyBNYXRoLnNxcnQoNSkpICogTWF0aC5zcXJ0KDMpO1xyXG4gICAgICAgIGxldCByMCA9IHIgKiAyICogTWF0aC5jb3MoKDM2IC8gMTgwICogTWF0aC5QSSkpO1xyXG5cclxuICAgICAgICBsZXQgZWRnZTEgPSBbXTtcclxuICAgICAgICBsZXQgZWRnZTIgPSBbXTtcclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgZCA9IE1hdGguc3FydChSICogUiAtIHIgKiByKTtcclxuICAgICAgICBsZXQgZDAgPSBNYXRoLnNxcnQoUiAqIFIgLSByMCAqIHIwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgICAgICBhMSA9IGkgLyAxODAgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICAgICAgYTIgPSAoaSArIDM2KSAvIDE4MCAqIE1hdGguUEk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcDEgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMSksIHIgKiBNYXRoLmNvcyhhMSksIGQpO1xyXG4gICAgICAgICAgICBsZXQgcDIgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMiksIHIgKiBNYXRoLmNvcyhhMiksIC1kKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsMSA9IHZlYzMocjAgKiBNYXRoLnNpbihhMSksIHIwICogTWF0aC5jb3MoYTEpLCBkMCk7XHJcbiAgICAgICAgICAgIGxldCBsMiA9IHZlYzMocjAgKiBNYXRoLnNpbihhMiksIHIwICogTWF0aC5jb3MoYTIpLCAtZDApO1xyXG5cclxuICAgICAgICAgICAgZWRnZTEucHVzaChwMSk7XHJcbiAgICAgICAgICAgIGVkZ2UyLnB1c2gocDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIxLnB1c2gobDEpO1xyXG4gICAgICAgICAgICBsYXllcjIucHVzaChsMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTEpO1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChlZGdlMik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMSA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxWyhpICsgMSkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMiA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMSk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy52ZXJ0ZXhlcyA9IFtlZGdlMSwgbGF5ZXIxLCBsYXllcjIsIGVkZ2UyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFyKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNldERvZGVjYWhlZHJvbigpO1xyXG5cclxuICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMygwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy52ZXJ0ZXhlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgcCA9IHAuYWRkKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAgPSBwLmRpdig1KTtcclxuICAgICAgICAgICAgcCA9IHAubXVsKDMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyaXMgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzBdLCB0aGlzLnZlcnRleGVzW2ldWzFdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgdGhpcy52ZXJ0ZXhlc1tpXVsyXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMl0sIHRoaXMudmVydGV4ZXNbaV1bM10sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzNdLCB0aGlzLnZlcnRleGVzW2ldWzRdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgdGhpcy52ZXJ0ZXhlc1tpXVswXSwgcF0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcclxuICAgICAgICAgICAgICAgIHZlcnRzLnB1c2godHJpc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gdmVydHM7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVByaW0obXRsKSB7XHJcbiAgICAgICAgbGV0IGluZGljaWVzID0gW107XHJcbiAgICAgICAgbGV0IHZlcnRleGVzID0gW107XHJcbiAgICAgICAgbGV0IGogPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHRoaXMudmVydGV4ZXMubGVuZ3RoOyBlKyspIHtcclxuICAgICAgICAgICAgbGV0IGVkZ2UgPSB0aGlzLnZlcnRleGVzW2VdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4Q29vcmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBpbiBlZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgoZWRnZVt2XSwgdmVjMygwKSwgdGhpcy50ZXhDb29yZHNbZV1bdl0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgaW4gZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KGVkZ2Vbdl0sIHZlYzMoMCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBlZGdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyAwKTtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIGkgLSAxKTtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGogKz0gZWRnZS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByaW0obXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgbWF0NCwgbWF0clRyYW5zbGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi4vcGxhdC9wbGF0LmpzXCJcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvb20ge1xyXG4gICAgY29uc3RydWN0b3IocmVuZGVyLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIHRoaXMubWFwO1xyXG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc2hhZGVyID0gcmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgICAgICAgdGhpcy5tdGwgPSB0aGlzLnNoYWRlci5uZXdNYXRlcmlhbCh2ZWMzKDAuMSksIHZlYzMoMSwgMC41LCAxLjApLCB2ZWMzKDAuMyksIDkwLCAwLjcpO1xyXG4gICAgICAgIHRoaXMudGV4ID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9lbS5qcGdcIik7XHJcbiAgICAgICAgdGhpcy5tdGwuYXR0YWNoVGV4dHVyZSh0aGlzLnRleCwgMCk7XHJcbiAgICAgICAgdGhpcy5tdGwudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5tdGwxID0gdGhpcy5zaGFkZXIubmV3TWF0ZXJpYWwodmVjMygwLjEpLCB2ZWMzKDEsIDAuNSwgMS4wKSwgdmVjMygwLjMpLCA5MCwgMS4wKTtcclxuICAgICAgICB0aGlzLnRleDEgPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2xhcGlzLmpwZ1wiKTtcclxuICAgICAgICB0aGlzLm10bDEuYXR0YWNoVGV4dHVyZSh0aGlzLnRleDEsIDApO1xyXG4gICAgICAgIHRoaXMubXRsMS51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGZjdWJlID0gbmV3IEZpZ3VyZSgpO1xyXG4gICAgICAgIGZjdWJlLnNldEN1YmUoKTtcclxuICAgICAgICB0aGlzLmN1YmUgPSBmY3ViZS5tYWtlUHJpbSh0aGlzLm10bCk7XHJcbiAgICAgICAgdGhpcy5jdWJlRmxvb3IgPSBmY3ViZS5tYWtlUHJpbSh0aGlzLm10bDEpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmltYWdlID0gbnVsbDtcclxuICAgICAgICBKaW1wLnJlYWQoZmlsZU5hbWUsIChlcnIsIGltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gaW1hZ2UuYml0bWFwLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcih3b3JsZCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5ibG9ja3MpIHtcclxuICAgICAgICAgICAgYmxvY2sucmVuZGVyKG1hdDQoMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSsrKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoeCwgaSwgeSkpLm11bCh3b3JsZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYy5iID09IDI1NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3ViZUZsb29yLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoeCwgMCwgeSkpLm11bCh3b3JsZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHV0UGl4ZWwoeCwgeSwgYykge1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc2V0UGl4ZWxDb2xvcih4LCB5LCBjKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbWdUb0NvbnRleHQyZChjYW52YXMsIGNvbnRleHQsIGltYWdlKSB7XHJcbiAgICBsZXQgZnJhY3cgPSBNYXRoLmZsb29yKGNhbnZhcy53aWR0aCAvIGltYWdlLmJpdG1hcC53aWR0aCk7XHJcbiAgICBsZXQgZnJhY2ggPSBNYXRoLmZsb29yKGNhbnZhcy5oZWlnaHQgLyBpbWFnZS5iaXRtYXAuaGVpZ2h0KTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaW1hZ2UuYml0bWFwLmhlaWdodDsgeSsrKVxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgaW1hZ2UuYml0bWFwLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQShpbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBgcmdiYSgke2Mucn0sICR7Yy5nfSwgJHtjLmJ9LCAxLjApYDtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCh4ICogZnJhY3csIHkgKiBmcmFjaCwgZnJhY3csIGZyYWNoKTtcclxuICAgICAgICB9XHJcbn0iLCJjb25zdCBob3N0ID0gXCJsb2NhbGhvc3RcIjtcclxuY29uc3QgcG9ydCA9IFwiODAwMFwiO1xyXG5sZXQgdXNlck5hbWU7XHJcbmxldCBwbGF5ZXJzUG9vbCA9IHt9O1xyXG5sZXQgbWFpblJlbmRlcjtcclxubGV0IGF2YXRhcnMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3c0luaXQocmVuZGVyKSB7XHJcbiAgICB1c2VyTmFtZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG5cclxuICAgIG1haW5SZW5kZXIgPSByZW5kZXI7XHJcbiAgICBsZXQgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcclxuXHJcbiAgICBzb2NrZXQub25vcGVuID0gZSA9PiBvbkNvbm5lY3Rpb24oc29ja2V0LCBlKTtcclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBlID0+IG9uTWVzc2FnZShzb2NrZXQsIEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBvbkludGVydmFsKHNvY2tldCksIDEpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb25Db25uZWN0aW9uKHNvY2tldCwgbSkge1xyXG4gICAgY29uc29sZS5sb2coXCJoZWxsbyBmcm9tIGNsaWVudFwiKTtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjb25uZWN0ZWRcIiB9KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uTWVzc2FnZShzb2NrZXQsIG0pIHtcclxuICAgIGlmIChtLnR5cGUgPT0gXCJwbGF5ZXJzXCIpIHtcclxuICAgICAgICBwbGF5ZXJzUG9vbCA9IG0ucGxheWVycztcclxuICAgICAgICBmb3IgKGxldCBwIGluIG0ucGxheWVycylcclxuICAgICAgICAgICAgaWYgKGF2YXRhcnNbcF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVwIDE6IEhhc2ggeW91ciBlbWFpbCBhZGRyZXNzIHVzaW5nIFNIQS0yNTYuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNoZWRFbWFpbCA9IENyeXB0b0pTLlNIQTI1NihtLnBsYXllcnNbcF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gU3RlcCAyOiBDb25zdHJ1Y3QgdGhlIEdyYXZhdGFyIFVSTC5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyYXZhdGFyVXJsID0gYGh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvJHtoYXNoZWRFbWFpbH1gO1xyXG4gICAgICAgICAgICAgICAgYXZhdGFyc1twXSA9IG1haW5SZW5kZXIubmV3VGV4dHVyZShgaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8ke2hhc2hlZEVtYWlsfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkludGVydmFsKHNvY2tldCkge1xyXG4gICAgLy8gU2VuZGluZyBjb29yZHMgdG8gdGhlIHNlcnZlclxyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcImNvb3Jkc1wiLCBpZDogdXNlck5hbWUsIGNvb3JkczogeyB0cmFuczogbWFpblJlbmRlci5jb250cm9sLnRyYW5zZm9ybSwgcG9zOiBtYWluUmVuZGVyLmNvbnRyb2wucG9zaXRpb24gfSB9KSk7XHJcbiAgICAvLyBBc2tpbmcgZm9yIGdldHRpbmcgY29vcmRzIGZyb20gc2VydmVyXHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IHR5cGU6IFwiZ2V0X2Nvb3Jkc1wiIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllcnMoKSB7XHJcbiAgICByZXR1cm4geyBwbGF5ZXJzOiBwbGF5ZXJzUG9vbCwgaWQ6IHVzZXJOYW1lLCBhdmF0YXJzOiBhdmF0YXJzIH07XHJcbn0iLCJpbXBvcnQgeyBtYXQ0LCBtYXRyUm90YXRlLCBtYXRyVHJhbnNsYXRlIH0gZnJvbSBcIi4uL210aC9tYXQ0XCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzNcIjtcclxuaW1wb3J0IHsgUm9vbSB9IGZyb20gXCIuL2dlblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhYmlyaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHJlbmRlciwgZmlsZU5hbWUpIHtcclxuICAgICAgICB0aGlzLnJvb21zID0gW1xyXG4gICAgICAgICAgICBuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvcm9vbTEucG5nXCIpLFxyXG4gICAgICAgICAgICBuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvcm9vbTIucG5nXCIpLFxyXG4gICAgICAgICAgICBuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvcm9vbTMucG5nXCIpXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnZlcnQgPSBbbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL3ZlcnQucG5nXCIpXTtcclxuICAgICAgICB0aGlzLmhvcnogPSBbbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL2hvcnoucG5nXCIpXTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBbXTtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIEppbXAucmVhZChmaWxlTmFtZSwgKGVyciwgaW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IGltYWdlLmJpdG1hcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tc1swXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjLmcgPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tc1sxXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjLmIgPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tc1syXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDE7IHkgPCB0aGlzLmltYWdlLmJpdG1hcC5oZWlnaHQ7IHkgKz0gMilcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmltYWdlLmJpdG1hcC53aWR0aDsgeCArPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYyA9IEppbXAuaW50VG9SR0JBKHRoaXMuaW1hZ2UuZ2V0UGl4ZWxDb2xvcih4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYy5yID09IDI1NSAmJiBjLmcgPT0gMjU1ICYmIGMuYiA9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0WzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMjU1ICYmIGMuZyA9PSAyNTUgJiYgYy5iID09IDI1NSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvcnpbMF0ucmVuZGVyKG1hdHJUcmFuc2xhdGUodmVjMygxMCAqIHgsIDAsIDEwICogeSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4vcm5kL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IG1hdDQsIG1hdHJSb3RhdGUsIG1hdHJUcmFuc2xhdGUsIG1hdHJTY2FsZSB9IGZyb20gXCIuL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgRmlndXJlIH0gZnJvbSBcIi4vcGxhdC9wbGF0LmpzXCJcclxuaW1wb3J0IHsgUm9vbSwgaW1nVG9Db250ZXh0MmQgfSBmcm9tIFwiLi9nZW4vZ2VuLmpzXCJcclxuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCIuL2N0cmwvY3RybC5qc1wiXHJcbmltcG9ydCB7IHdzSW5pdCwgb25JbnRlcnZhbCwgZ2V0UGxheWVycyB9IGZyb20gXCIuL3dzLmpzXCJcclxuaW1wb3J0IHsgTGFiaXJpbnQgfSBmcm9tIFwiLi9nZW4vbGFiLmpzXCJcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gIGxldCBmaWd1cmUgPSBuZXcgRmlndXJlKCk7XHJcbiAgZmlndXJlLnNldERvZGVjYWhlZHJvbigpO1xyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRnJhbWVcIik7XHJcbiAgbGV0IHJlbmRlciA9IG5ldyBSZW5kZXIoY2FudmFzKTtcclxuICB3c0luaXQocmVuZGVyKTtcclxuICBsZXQgc2hhZGVyID0gcmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgbGV0IG1hdGVyaWFsID0gc2hhZGVyLm5ld01hdGVyaWFsKHZlYzMoMC4xKSwgdmVjMygwLCAwLjUsIDEuMCksIHZlYzMoMC4zKSwgOTAsIDEuMCk7XHJcbiAgbGV0IG1hdGVyaWFsMSA9IHNoYWRlci5uZXdNYXRlcmlhbCh2ZWMzKDAuMSksIHZlYzMoMSwgMC41LCAxLjApLCB2ZWMzKDAuMyksIDkwLCAwLjUpO1xyXG4gIGxldCBwcmltID0gZmlndXJlLm1ha2VQcmltKG1hdGVyaWFsKTtcclxuICBsZXQgdGV4ID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9lbS5qcGdcIik7XHJcbiAgbWF0ZXJpYWwxLmF0dGFjaFRleHR1cmUodGV4LCAwKTtcclxuICBtYXRlcmlhbDEudXBkYXRlKCk7XHJcbiAgcmVuZGVyLnNldENhbSh2ZWMzKDUsIDUsIDUpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBsZXQgbGFiID0gbmV3IExhYmlyaW50KHJlbmRlciwgXCIuL2Jpbi9sYWJzL2RlZi5wbmdcIik7XHJcbiAgbGV0IHBsX210bCA9IHNoYWRlci5uZXdNYXRlcmlhbCh2ZWMzKDAuMSksIHZlYzMoMSwgLjEsIC4xKSwgdmVjMygwLjMpLCA5MCwgMS4wKTtcclxuICBwbF9tdGwuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gIHBsX210bC51cGRhdGUoKTtcclxuICBsZXQgZiA9IG5ldyBGaWd1cmUoKTtcclxuICBmLnNldEN1YmUoKTtcclxuICBsZXQgcGxfcHIgPSBmLm1ha2VQcmltKHBsX210bCk7XHJcblxyXG4gIGxldCBjYW52YXNGbG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG93RnJhbWVcIik7XHJcbiAgbGV0IGNvbnRleHRGbG93ID0gY2FudmFzRmxvdy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgY2FudmFzRmxvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGlmIChsYWIuaW1hZ2UgIT0gbnVsbCkge1xyXG4gICAgICBsZXQgZnJhY3cgPSBNYXRoLmZsb29yKGNvbnRleHRGbG93LndpZHRoIC8gbGFiLmltYWdlLmJpdG1hcC53aWR0aCk7XHJcbiAgICAgIGxldCBmcmFjaCA9IE1hdGguZmxvb3IoY29udGV4dEZsb3cuaGVpZ2h0IC8gbGFiLmltYWdlLmJpdG1hcC5oZWlnaHQpO1xyXG5cclxuICAgICAgbGFiLmltYWdlLnNldFBpeGVsQ29sb3IoXCIjRkZGRkZGXCIsIGUub2Zmc2V0WCAvIGZyYWN3LCBlLm9mZnNldFkgLyBmcmFjaCk7XHJcbiAgICAgIGltZ1RvQ29udGV4dDJkKGNhbnZhc0Zsb3csIGNvbnRleHRGbG93LCBsYWIuaW1hZ2UpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjYW52YXMub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2soKTtcclxuICB9XHJcblxyXG4gIC8vbGV0IHNreSA9IHJlbmRlci5uZXdTa3lTcGhlcmUoXCIuL2Jpbi90ZXh0dXJlcy9zcGFjZS5wbmdcIik7XHJcbiAgLy9sZXQgc2t5ID0gcmVuZGVyLm5ld1NreVNwaGVyZShcIi4vYmluL3RleHR1cmVzL3dhdGVyLmpwZ1wiKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIGxldCBwID0gZ2V0UGxheWVycygpO1xyXG5cclxuICAgIHJlbmRlci5yZW5kZXJTdGFydCgpO1xyXG4gICAgZm9yIChsZXQgcGxheWVyIGluIHAucGxheWVycykge1xyXG4gICAgICBpZiAocC5pZCAhPSBwbGF5ZXIpIHtcclxuICAgICAgICBwbF9wci5tdGwuYXR0YWNoVGV4dHVyZShwLmF2YXRhcnNbcGxheWVyXSwgMCk7XHJcbiAgICAgICAgcGxfcHIucmVuZGVyKG1hdDQocC5wbGF5ZXJzW3BsYXllcl0uY29vcmRzLnRyYW5zKS5tdWwobWF0clRyYW5zbGF0ZShwLnBsYXllcnNbcGxheWVyXS5jb29yZHMucG9zKSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpbS5yZW5kZXIobWF0clJvdGF0ZShyZW5kZXIudGltZXIubG9jYWxUaW1lLCB2ZWMzKDAsIDEsIDEpKS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIDApKSkpO1xyXG4gICAgbGFiLnJlbmRlcigpO1xyXG4gICAgcmVuZGVyLnJlbmRlckVuZCgpO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICB9O1xyXG4gIGRyYXcoKTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IG1haW47Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsS0FBSztBQUNMO0lBQ0EsSUFBSSxJQUFJLEdBQUc7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsR0FBRztJQUNWLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLElBQUksR0FBRztJQUNYLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFD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QUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUYsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDN0YsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksY0FBYyxHQUFHO0lBQ3JCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxHQUFHO0lBQ2hCLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzlCLElBQUksSUFBSSxDQUFDLElBQUksU0FBUztJQUN0QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtJQUM1QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVM7SUFDdEIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUI7O0lDN0ZBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQjs7SUNYQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVztJQUNmLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixNQUFNO0lBQ04sUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDdEMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkgsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLEdBQUc7SUFDaEIsUUFBUSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSTtJQUNwQixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxF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LEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDO0lBQ1QsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQztJQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3JCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBRTtJQUNqQyxJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4QixLQUFLLENBQUM7SUFDTixDQUFDO0FBVUQ7SUFDTyxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNqRSxJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDL0MsS0FBSyxDQUFDO0lBQ04sQ0FBQztBQUNEO0lBQ08sU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7SUFDdkMsSUFBSTtJQUNKLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFF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LENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BEO0lBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsS0FBSztBQUNMO0lBQ0E7SUFDQSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMxQyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sTUFBTSxJQUFJLENBQUM7SUFDbEIsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7SUFDcEMsUUFBUSxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDdEMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN0QyxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENB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QyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEcsWUFBWSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEcsWUFBWSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEc7SUFDQSxZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RyxZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRztJQUNBLFVBQVM7SUFDVCxLQUFLO0lBQ0wsSUFBSSxRQUFRLEdBQUc7SUFDZixRQUFRLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDL0UsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUM5RjtJQUNBO0lBQ0E7SUFDQTtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xDO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDakMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNsSCxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ25DLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbEgsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNuQyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDdEosU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNuQyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDdEosU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUN4QyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQy9HLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FFM0I7SUFDVCxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRixLQUFLO0lBQ0w7O0lDbEZBO0lBQ0E7SUFDTyxNQUFNLE1BQU0sQ0FBQztJQUNwQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEI7SUFDQSxJQUFJLFVBQVUsR0FBRztJQUNqQixRQUFnQixJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQ3hCLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNuRDtJQUNBO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU07SUFDckMsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzNDO0lBQ0EsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQzNDO0lBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRyxLQUFLO0FBQ0w7SUFDQSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUN4QixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxjQUFjLEdBQUc7SUFDckIsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJO0lBQ3hCLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLFNBQVMsQ0FBQztJQUNWLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSTtJQUNyQixZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQztJQUNBLFFBQVEsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFB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UUFBUSxDQUFDLENBQUM7SUFDcEQsS0FBSztJQUNMOztJQ2xJTyxNQUFNLE1BQU0sQ0FBQztJQUNwQixJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQUs7QUFDTDtJQUNBLElBQUksT0FBTyxHQUFHO0lBQ2QsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHO0lBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFNBQVMsQ0FBQztJQUNWLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRztJQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Q7SUFDQSxRQUFRO0lBQ1IsWUFB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QUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUMzRTtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFNBQVM7QUFDVDtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ELFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixTQUFTO0FBQ1Q7SUFDQSxRQUFRO0lBQ1IsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENB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RyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVk7SUFDWixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDdEMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7SUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEUsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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
