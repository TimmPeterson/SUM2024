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

    function matrScale(s) {
        return mat4(
            s.x, 0, 0, 0,
            0, s.y, 0, 0,
            0, 0, s.z, 0,
            0, 0, 0, 1
        )
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

    // General class for rendering.
    // One render per canvas.
    class Render {
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
        }

        updateMatrixes() {
            this.matrixUBO.update(new Float32Array(this.matrProj.linearize().concat(this.matrView.linearize())));
        }

        renderStart() {
            //this.timer.response();
            //this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        constructor(canvas) {
            this.canvas = canvas;

            // Default camera properties
            this.projSize = 0.1;
            this.projDist = 0.1;
            this.farClip = 300;

            // Evaluating canvas size
            let rect = canvas.getBoundingClientRect();
            this.width = rect.right - rect.left + 1;
            this.height = rect.bottom - rect.top + 1;

            // Getting GL context
            this.gl = canvas.getContext("webgl2");
            this.gl.clearColor(0.9, 0.9, 0.9, 1);
            this.gl.enable(this.gl.DEPTH_TEST);

            // Initializing camera
            this.setFrustum();
            this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
            this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2, 0);
            this.updateMatrixes();

            // Initializing prim ubo
            this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

            // Initializing timer
            this.timer = new Timer();
            this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
        }
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
            this.create(mtl.shd, this.vertexes, this.indicies);
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

    // Class for holding material properties of primitive.
    class Material {
        constructor(shd, Ka, Kd, Ks, Ph) {
            this.shd = shd;
            this.Ka = Ka;
            this.Kd = Kd;
            this.Ks = Ks;
            this.Ph = Ph;
            this.textures = [null, null, null, null];

            this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 4, 3);
            //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
            this.update();
        }

        update() {
            let tex_flags = [0, 0, 0, 0];
            let data = this.Ka.linearize().concat([0], this.Kd.linearize(), [0], this.Ks.linearize(), [this.Ph]);

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
    }

    class Texture {
        constructor(rnd, url) {
            const gl = rnd.gl;

            this.rnd = rnd;
            this.texId = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.textId);

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

    function onPinch(element, onPinchStart, onPinchMove, onPinchEnd) {
        let scaling = false;
        let prev_dist = 0;

        element.addEventListener("ontouchstart", e => {
            if (e.touches.length === 2) {
                scaling = true;
                prev_dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        });
        element.addEventListener("ontouchmove", e => {
            if (scaling) {
                let dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                let delta = dist - prev_dist;
                prev_dist = dist;
                onPinchMove(dist, delta);
            }
        });
        element.addEventListener("ontouchend", e => {
            if (scaling) {
                scaling = false;
            }
        });
    }

    function main() {
      window.par = document.getElementById("p");
      console.log("MAIN LOADED");
      //tpLog("MAIN LOADED");

      let canvases = [];
      let renders = [];
      let shaders = [];
      let prims = [];
      let figures = [];
      let rots = [];
      let mtls = [];
      let scales =
        [
          matrScale(vec3(5.8)), matrScale(vec3(4.7)),
          matrScale(vec3(4)), matrScale(vec3(3.2)),
          matrScale(vec3(2.1)), matrScale(vec3(1.2)), matrScale(vec3(0.3)), matrScale(vec3(4))
        ];

      for (let i = 0; i < 6; i++)
        figures[i] = new Figure();
      figures[0].setTetrahedron();
      figures[1].setOctahedron();
      figures[2].setCube();
      figures[3].setIcohedron();
      figures[4].setDodecahedron();
      figures[5].setStar();

      let mtl_props = [
        [vec3(0.1), vec3(0, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
        [vec3(0.1), vec3(0.3, 0.35, 0.7), vec3(0.5, 0.5, 0.0), 40],
        [vec3(0.1), vec3(0.4, 0.6, 0.4), vec3(1, 1, 1), 90],
        [vec3(0.1), vec3(0.7, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
        [vec3(0.1), vec3(0.6, 0.2, 0.5), vec3(0.3, 0.3, 0.3), 40],
        [vec3(0.1), vec3(0.7, 0.7, 0), vec3(0.9, 0.9, 0.9), 90],
      ];

      canvases[6] = document.getElementById(`myCan7`);
      canvases[6].hm = Hammer(canvases[6]);
      canvases[6].hm.get("rotate").set({ enable: true });
      canvases[7] = document.getElementById(`myCan8`);
      canvases[7].hm = Hammer(canvases[7]);
      canvases[7].hm.get("rotate").set({ enable: true });

      for (let i = 0; i < 6; i++) {
        // Getting canvas from html
        canvases[i] = document.getElementById(`myCan${i + 1}`);

        // Initializing render object 
        renders[i] = new Render(canvases[i]);

        // Initializing shader for render object
        shaders[i] = new Shader(renders[i], "default");

        // Initializing material relaterd to shader
        mtls[i] = new Material(shaders[i], ...mtl_props[i]);

        // Creating primitive using material
        prims[i] = figures[i].makePrim(mtls[i]);

        // Initializing Hammer on canvas
        canvases[i].hm = Hammer(canvases[i]);
        canvases[i].hm.get("rotate").set({ enable: true });
      }
      prims[0].transform = matrTranslate(vec3(0, -0.3, 0));

      // Timer creation
      let timer = new Timer();
      // Test material and primitive 
      let render_model = new Render(canvases[6]);
      let shader_model = new Shader(render_model, "default");
      let mtl = new Material(shader_model, ...mtl_props[0]);
      let test_pr = new Prim(mtl, "cow");
      test_pr.transform = matrTranslate(vec3(0, -4.5, 0));

      let render_texture = new Render(canvases[7]);
      let shader_texture = new Shader(render_texture, "default");
      let mtl_texture = new Material(shader_texture, ...mtl_props[0]);
      //let tex = new Texture(render_texture, "bin/textures/PNG.PNG");
      let tex = new Texture(render_texture, "./bin/textures/em.jpg");
      mtl_texture.attachTexture(tex, 0);
      mtl_texture.update();
      let f = new Figure();
      f.setCube();
      let prim_tex = f.makePrim(mtl_texture);
      let ss = [1, 1, 1, 1, 1, 1, 1, 1];
      let scales1 = [];
      for (let i = 0; i < 8; i++) {
        rots[i] = mat4(1);
        scales1[i] = mat4(1);
        let f2 = e => {
          if (e.deltaY > 0)
            scales[i] = scales[i].mul(matrScale(vec3(0.9)));
          else
            scales[i] = scales[i].mul(matrScale(vec3(1.1)));
        };
        let f3 = (dist, delta) => {
          d = delta / 20.0;
          if (ss[i] + d > 0)
            ss[i] += d;
          scales1[i] = matrScale(vec3(ss[i]));
        };
        let f4 = e => {
          rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityX, vec3(0, 1, 0)));
          rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityY, vec3(1, 0, 0)));
        };
        let onTap = e => {
          if (canvases[i].style.width == "35%") {
            canvases[i].style.width = "20%";
            canvases[i].style.position = "static";
            canvases[i].style.top = "auto";
            canvases[i].style.left = "auto";
            return;
          }

          canvases[i].style.width = "35%";
          canvases[i].style.position = "fixed";
          canvases[i].style.top = "0";
          canvases[i].style.left = "0";
          canvases[i].style.position = "absolute";
          canvases[i].style.top = "5%";
          canvases[i].style.left = "32%";

          for (let c = 0; c < canvases.length; c++) {
            if (c != i) {
              canvases[c].style.width = "20%";
              canvases[c].style.position = "static";
              canvases[c].style.top = "auto";
              canvases[c].style.left = "auto";  
            }
          }
        };

        //canvases[i].addEventListener("mousemove", f1);
        canvases[i].addEventListener("wheel", f2);
        canvases[i].hm.on("rotate", f3);
        canvases[i].hm.on("pan", f4);
        canvases[i].hm.on("tap", onTap);
        onPinch(canvases[i], () => {}, f3);
      }

      // Each frame rendering function declaration
      const draw = () => {

        // Timer reponse
        //timer.response();

        let t = timer.getTime();

        // Frame render
        for (let i = 0; i < 6; i++) {
          //  Starting posting cringe 
          renders[i].renderStart();

          // Rendering [i] primitive
          prims[i].render(scales1[i].mul(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10)))))));
        }

        render_model.renderStart();
        test_pr.render(scales1[6].mul(scales[6].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[6].mul(matrTranslate(vec3(0, 0, -10)))))));
        render_texture.renderStart();
        prim_tex.render(scales1[7].mul(scales[7].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[7].mul(matrTranslate(vec3(0, 0, -10)))))));

        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.addEventListener("load", () => {
      main();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvc2hkLmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9ybmQuanMiLCIuLi9zcmMvbXRoL3ZlYzIuanMiLCIuLi9zcmMvcm5kL3Jlcy9wcmltLmpzIiwiLi4vc3JjL3BsYXQvcGxhdC5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9pbnB1dC90Y2guanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMoMCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGxlbik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogaywgdGhpcy55ICogaywgdGhpcy56ICogayk7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLyBrLCB0aGlzLnkgLyBrLCB0aGlzLnogLyBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICAgICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bG1hdHIobSkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy54ICogbS5hWzBdWzNdICtcclxuICAgICAgICAgICAgdGhpcy55ICogbS5hWzFdWzNdICtcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzJdWzNdICtcclxuICAgICAgICAgICAgbS5hWzNdWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl0pIC8gdywpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShtKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoMCwgMCwgMCk7XHJcbiAgICBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgueCwgeC55LCB4LnopO1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59XHJcbiIsImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwobSkge1xyXG4gICAgICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMuYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KFxyXG4gICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbikge1xyXG4gICAgaWYgKGEwMCA9PSAxICYmIGEwMSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIGEwMFswXVswXSwgYTAwWzBdWzFdLCBhMDBbMF1bMl0sIGEwMFswXVszXSxcclxuICAgICAgICAgICAgYTAwWzFdWzBdLCBhMDBbMV1bMV0sIGEwMFsxXVsyXSwgYTAwWzFdWzNdLFxyXG4gICAgICAgICAgICBhMDBbMl1bMF0sIGEwMFsyXVsxXSwgYTAwWzJdWzJdLCBhMDBbMl1bM10sXHJcbiAgICAgICAgICAgIGEwMFszXVswXSwgYTAwWzNdWzFdLCBhMDBbM11bMl0sIGEwMFszXVszXVxyXG4gICAgICAgICk7XHJcbiAgICByZXR1cm4gbmV3IF9tYXQ0KFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJSb3RhdGUoYW5nbGUsIGF4aXMpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGEgPSBhbmdsZSAvIE1hdGguUEkgKiAxODAuMCxcclxuICAgICAgICBzaSA9IE1hdGguc2luKGFuZ2xlKSwgY28gPSBNYXRoLmNvcyhhbmdsZSksXHJcbiAgICAgICAgdiA9IGF4aXMubm9ybSgpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIGNvICsgdi54ICogdi54ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi54ICogdi55ICogKDEgLSBjbykgKyB2LnogKiBzaSxcclxuICAgICAgICB2LnggKiB2LnogKiAoMSAtIGNvKSAtIHYueSAqIHNpLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdi55ICogdi54ICogKDEgLSBjbykgLSB2LnogKiBzaSxcclxuICAgICAgICBjbyArIHYueSAqIHYueSAqICgxIC0gY28pLFxyXG4gICAgICAgIHYueSAqIHYueiAqICgxIC0gY28pICsgdi54ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnogKiB2LnggKiAoMSAtIGNvKSArIHYueSAqIHNpLFxyXG4gICAgICAgIHYueiAqIHYueSAqICgxIC0gY28pIC0gdi54ICogc2ksXHJcbiAgICAgICAgY28gKyB2LnogKiB2LnogKiAoMSAtIGNvKSxcclxuICAgICAgICAwLCAwLCAwLCAwLCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clRyYW5zbGF0ZSh0KSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAxLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICB0LngsIHQueSwgdC56LCAxXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clNjYWxlKHMpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHMueCwgMCwgMCwgMCxcclxuICAgICAgICAwLCBzLnksIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgcy56LCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDFcclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJGcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICAyICogbmVhciAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDIgKiBuZWFyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgLShmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSwgLTEsXHJcbiAgICAgICAgMCwgMCwgLTIgKiBuZWFyICogZmFyIC8gKGZhciAtIG5lYXIpLCAwXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clZpZXcobG9jLCBhdCwgdXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtKCksXHJcbiAgICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtKCksXHJcbiAgICAgICAgdXAgPSByaWdodC5jcm9zcyhkaXIpLm5vcm0oKTtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIHJpZ2h0LngsIHVwLngsIC1kaXIueCwgMCxcclxuICAgICAgICByaWdodC55LCB1cC55LCAtZGlyLnksIDAsXHJcbiAgICAgICAgcmlnaHQueiwgdXAueiwgLWRpci56LCAwLFxyXG4gICAgICAgIC1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFcclxuICAgICk7XHJcbn0iLCJleHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNoYWRlcnMgPVxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgICAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBzLnNyYyA9IHNyYztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlcnNTb3VyY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkZXJzU291cmNlKCkge1xyXG4gICAgICAgIHRoaXMuc2hhZGVyc1swXS5pZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgcy5pZCA9IHRoaXMucm5kLmdsLmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2Uocy5pZCwgcy5zcmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHMuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm5kLmdsLmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLnJuZC5nbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByZyA9IHRoaXMucm5kLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMucm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByZywgcy5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wubGlua1Byb2dyYW0odGhpcy5wcmcpO1xyXG4gICAgICAgIGlmICghdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByZywgdGhpcy5ybmQuZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgcHJvZ3JhbSAke3RoaXMubmFtZX0gbGluayBmYWlsOiAke2J1Zn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2hhZGVyRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICAgICAgdGhpcy5ub3JtTG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5Ob3JtYWxcIik7XHJcbiAgICAgICAgdGhpcy50ZXhMb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJblRleENvb3JkXCIpO1xyXG5cclxuICAgICAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgICAgICB0aGlzLnVuaWZvcm1zID0ge307XHJcbiAgICAgICAgY29uc3QgY291bnRVbmlmb3JtcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcmcsIGkpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgICAgICAgICBsb2M6IHRoaXMucm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByZywgaW5mby5uYW1lKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgICAgIHRoaXMudW5pZm9ybUJsb2NrcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkFDVElWRV9VTklGT1JNX0JMT0NLUyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1CbG9ja3M7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBibG9ja19uYW1lID0gdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrTmFtZSh0aGlzLnByZywgaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ybmQuZ2wuZ2V0VW5pZm9ybUJsb2NrSW5kZXgodGhpcy5wcmcsIGJsb2NrX25hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1CbG9ja3NbYmxvY2tfbmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMucHJnLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgICAgICAgICAgYmluZDogdGhpcy5ybmQuZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMucHJnLCBpbmRleCwgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucm5kLm1hdHJpeFVCTy5hcHBseSh0aGlzKTtcclxuICAgICAgICB0aGlzLnJuZC5wcmltVUJPLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgIHRoaXMucm5kLnRpbWVVQk8uYXBwbHkodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5ybmQuZ2wudXNlUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi9zaGQuanNcIlxyXG5cclxuY2xhc3MgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHR5cGUsIHNpemUpIHtcclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyAgICAvLyBCdWZmZXIgdHlwZSAoZ2wuKioqX0JVRkZFUilcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplOyAgICAvLyBCdWZmZXIgc2l6ZSBpbiBieXRlc1xyXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzaXplID09IDAgfHwgdHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmlkID0gcm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodHlwZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYnVmZmVyRGF0YSh0eXBlLCBzaXplLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlclN1YkRhdGEodGhpcy50eXBlLCAwLCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVuaWZvcm1CdWZmZXIgZXh0ZW5kcyBfYnVmZmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJuZCwgbmFtZSwgc2l6ZSwgYmluZFBvaW50KSB7XHJcbiAgICAgICAgc3VwZXIocm5kLCBybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHNpemUpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5iaW5kUG9pbnQgPSBiaW5kUG9pbnQ7IC8vIEJ1ZmZlciBHUFUgYmluZGluZyBwb2ludFxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KHNoZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJuZCA9PSB1bmRlZmluZWQgfHwgc2hkLnByZyA9PSB1bmRlZmluZWQgfHwgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzaGQucm5kLmdsLnVuaWZvcm1CbG9ja0JpbmRpbmcoc2hkLnByZywgc2hkLnVuaWZvcm1CbG9ja3NbdGhpcy5uYW1lXS5pbmRleCwgdGhpcy5iaW5kUG9pbnQpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZEJ1ZmZlckJhc2Uoc2hkLnJuZC5nbC5VTklGT1JNX0JVRkZFUiwgdGhpcy5iaW5kUG9pbnQsIHRoaXMuaWQpO1xyXG4gICAgfVxyXG59IiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBUaW1lciBjbGFzcyBtb2R1bGVcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nbG9iYWxUaW1lID0gdGhpcy5sb2NhbFRpbWUgPSB0aGlzLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmdsb2JhbERlbHRhVGltZSA9IHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5vbGRUaW1lID0gdGhpcy5vbGRUaW1lRlBTID0gdGhpcy5nbG9iYWxUaW1lO1xyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkZQUyA9IDMwLjA7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBjdXJyZW50IGdsb2JhbCB0aW1lIGZ1bnRpb25cclxuICAgIGdldFRpbWUoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IHQgPVxyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMC4wICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBGUFMgZnVuY3Rpb25cclxuICAgIGdldEZQUygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GUFMudG9GaXhlZCgzKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZUVuYmFsZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlRGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZVN3aXRjaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlID09IGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVwb25zZSB0aW1lciBmdW5jdGlvblxyXG4gICAgcmVzcG9uc2UodGFnX2lkID0gbnVsbCkge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcy5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHQ7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZSArPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSB0aGlzLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbFRpbWUgPSB0IC0gdGhpcy5wYXVzZVRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKHQgLSB0aGlzLm9sZFRpbWVGUFMgPiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRlBTID0gdGhpcy5mcmFtZUNvdW50ZXIgLyAodCAtIHRoaXMub2xkVGltZUZQUyk7XHJcbiAgICAgICAgICAgIHRoaXMub2xkVGltZUZQUyA9IHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgaWYgKHRhZ19pZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnX2lkKS5pbm5lckhUTUwgPSB0aGlzLmdldEZQUygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdDtcclxuICAgIH07XHJcbn0iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0sIG1hdHJWaWV3IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgVW5pZm9ybUJ1ZmZlciB9IGZyb20gXCIuL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuLi90aW1lci90aW1lci5qc1wiXHJcblxyXG4vLyBHZW5lcmFsIGNsYXNzIGZvciByZW5kZXJpbmcuXHJcbi8vIE9uZSByZW5kZXIgcGVyIGNhbnZhcy5cclxuZXhwb3J0IGNsYXNzIFJlbmRlciB7XHJcbiAgICBzZXRGcnVzdHVtKCkge1xyXG4gICAgICAgIGxldCBtID0gbWF0NCgxKTtcclxuICAgICAgICBsZXQgcnggPSB0aGlzLnByb2pTaXplLCByeSA9IHRoaXMucHJvalNpemU7XHJcblxyXG4gICAgICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPj0gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHJ4ICo9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJ5ICo9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyUHJvaiA9IG1hdHJGcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLmZhckNsaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbShsb2MsIGF0LCB1cCkge1xyXG4gICAgICAgIHRoaXMubWF0clZpZXcgPSBtYXRyVmlldyhsb2MsIGF0LCB1cCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTWF0cml4ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhVQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tYXRyUHJvai5saW5lYXJpemUoKS5jb25jYXQodGhpcy5tYXRyVmlldy5saW5lYXJpemUoKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGFydCgpIHtcclxuICAgICAgICAvL3RoaXMudGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgICAvL3RoaXMudGltZVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbdGhpcy50aW1lci5sb2NhbFRpbWUsIHRoaXMudGltZXIubG9jYWxEZWx0YVRpbWUsIHRoaXMudGltZXIuZ2xvYmFsVGltZSwgdGhpcy50aW1lci5nbG9iYWxEZWx0YVRpbWVdKSk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCBjYW1lcmEgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucHJvalNpemUgPSAwLjE7XHJcbiAgICAgICAgdGhpcy5wcm9qRGlzdCA9IDAuMTtcclxuICAgICAgICB0aGlzLmZhckNsaXAgPSAzMDA7XHJcblxyXG4gICAgICAgIC8vIEV2YWx1YXRpbmcgY2FudmFzIHNpemVcclxuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdCArIDE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wICsgMTtcclxuXHJcbiAgICAgICAgLy8gR2V0dGluZyBHTCBjb250ZXh0XHJcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjksIDAuOSwgMC45LCAxKTtcclxuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgY2FtZXJhXHJcbiAgICAgICAgdGhpcy5zZXRGcnVzdHVtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYW0odmVjMygwLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHRoaXMubWF0cml4VUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X2NhbWVyYVwiLCAxNiAqIDQgKiAyLCAwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeGVzKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBwcmltIHVib1xyXG4gICAgICAgIHRoaXMucHJpbVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9wcmltaXRpdmVcIiwgMTYgKiA0LCAxKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHRpbWVyXHJcbiAgICAgICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV90aW1lXCIsIDE2LCAyKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiY2xhc3MgX3ZlYzIge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzIoeCwgeSkge1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzIoeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMyKHgsIHkpO1xyXG59IiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4uL3JuZC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uLy4uL210aC92ZWMyLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0gfSBmcm9tIFwiLi4vLi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi4vcmVzL3NoZC5qc1wiXHJcblxyXG5jbGFzcyBfdmVydGV4IHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICAgICAgICB0aGlzLnRleCA9IHRleDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcnRleChwb3MsIG5vcm0sIHRleCkge1xyXG4gICAgaWYgKHRleCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfdmVydGV4KHBvcywgbm9ybSwgdmVjMigwKSk7XHJcbiAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB0ZXgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVjMygwKTtcclxuXHJcbiAgICAvKiBFdmFsIG5vcm1hbCBmb3IgZXZlcnkgZmFjZXQgKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbmRpY2llcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBuMCA9IGluZGljaWVzW2ldLCBuMSA9IGluZGljaWVzW2kgKyAxXSwgbjIgPSBpbmRpY2llc1tpICsgMl07XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcyxcclxuICAgICAgICAgICAgcDEgPSB2ZXJ0ZXhlc1tuMV0ucG9zLFxyXG4gICAgICAgICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3MsXHJcbiAgICAgICAgICAgIE4gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm0oKTtcclxuXHJcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQoTik7XHJcbiAgICAgICAgdmVydGV4ZXNbbjJdLm5vcm0gPSB2ZXJ0ZXhlc1tuMl0ubm9ybS5hZGQoTik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICBjcmVhdGUoc2hkLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICBsZXQgdHJpbWFzaCA9IFtdLCBpID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFsuLi52ZXJ0ZXhlc107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFsuLi5pbmRpY2llc107XHJcbiAgICAgICAgdGhpcy5zaGQgPSBzaGQ7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYXV0b05vcm1hbHModmVydGV4ZXMsIGluZGljaWVzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdiBvZiB2ZXJ0ZXhlcykge1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy55O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnBvcy56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueDtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS56O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2LnRleC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhBcnJheUlkID0gc2hkLnJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgIHNoZC5ybmQuZ2wuYmluZEJ1ZmZlcihzaGQucm5kLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRyaW1hc2gpLCBzaGQucm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zTG9jICE9IC0xICYmIHRoaXMubm9ybUxvYyAhPSAtMSkge1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLnBvc0xvYywgMywgc2hkLnJuZC5nbC5GTE9BVCwgZmFsc2UsIDMyLCAwKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQucG9zTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC5ub3JtTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDEyKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQubm9ybUxvYyk7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQudGV4TG9jLCAyLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDI0KTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShzaGQudGV4TG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5kZXhCdWZmZXJJZCA9IHNoZC5ybmQuZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5idWZmZXJEYXRhKHNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmRpY2llcyksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICB0aGlzLm51bU9mRWxlbWVudHMgPSBpbmRpY2llcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG1hdDQoMSk7XHJcbiAgICAgICAgaWYgKGluZGljaWVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5zaGQgPSBtdGwuc2hkO1xyXG4gICAgICAgICAgICB0aGlzLmZyb21PYmoobXRsLCB2ZXJ0ZXhlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tdGwgPSBtdGw7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih3b3JsZCkge1xyXG5cclxuICAgICAgICAvLyBSZWNyZWF0aW5nIHByaW1pdGl2ZSBpZiBpdCB3YXNuJ3QgY3JlYXRlZFxyXG4gICAgICAgIC8vIChiZWNhdXNlIG9mIHNoYWRlciBhc3luYyBpbml0aWFsaXphdGlvbilcclxuICAgICAgICBpZiAodGhpcy5zaGQucHJnICE9IG51bGwgJiYgdGhpcy5sb2FkZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUodGhpcy5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEcmF3aW5nIHByaW1pdGl2ZSBpZiBzaGFkZXIgaXMgbG9hZGVkXHJcbiAgICAgICAgaWYgKHRoaXMubXRsLmFwcGx5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLnByaW1VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy50cmFuc2Zvcm0ubXVsKHdvcmxkKS5saW5lYXJpemUoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXlJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHRoaXMuc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmRyYXdFbGVtZW50cyh0aGlzLnNoZC5ybmQuZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbWVudHMsIHRoaXMuc2hkLnJuZC5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmcm9tT2JqKG10bCwgZmlsZU5hbWUpIHtcclxuICAgICAgICBsZXQgdnR4ID0gW107XHJcbiAgICAgICAgbGV0IGZpbGUgPSBhd2FpdCBmZXRjaChgYmluL21vZGVscy8ke2ZpbGVOYW1lfS5vYmpgKTtcclxuICAgICAgICBsZXQgc3JjID0gYXdhaXQgZmlsZS50ZXh0KCk7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gc3JjLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5kaWNpZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lWzBdID09ICd2Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tzW2ldID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdi5wdXNoKHBhcnNlRmxvYXQodG9rc1tpXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZ0eC5wdXNoKHZlYzModlswXSwgdlsxXSwgdlsyXSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHZlcnRleCh2ZWMzKHZbMF0sIHZbMV0sIHZbMl0pKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZVswXSA9PSAnZicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2tzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDE7IHQgPCA0OyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHZlcnRleCh2dHhbcGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2gocGFyc2VJbnQodG9rc1t0XS5zcGxpdCgnLycpWzBdKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy52ZXJ0ZXhlcy5wdXNoKHYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2llcy5wdXNoKGkpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jcmVhdGUobXRsLnNoZCwgdGhpcy52ZXJ0ZXhlcywgdGhpcy5pbmRpY2llcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9tdGgvdmVjMi5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3ViZSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGZyb250XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KV0sICAgICAgLy8gYmFja1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpXSwgIC8vIGxlZnRcclxuICAgICAgICAgICAgW3ZlYzMoMC41LCAtMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGJvdHRvbVxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHRvcFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy50ZXhDb29yZHMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXRyYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgc3FydDIgLyBzcXJ0MywgMCksXHJcbiAgICAgICAgICAgIGZyb250ID0gdmVjMygwLCAwLCBzcXJ0MyAvIDMuMCksXHJcbiAgICAgICAgICAgIGxlZnQgPSB2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYuMCksXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gdmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtsZWZ0LCBmcm9udCwgdG9wXSwgLy8gYm90XHJcbiAgICAgICAgICAgIFtsZWZ0LCByaWdodCwgdG9wXSxcclxuICAgICAgICAgICAgW3JpZ2h0LCBmcm9udCwgdG9wXSxcclxuICAgICAgICAgICAgW2Zyb250LCByaWdodCwgbGVmdF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDEgLyBzcXJ0MiwgMCksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpLFxyXG4gICAgICAgICAgICBsZiA9IHZlYzMoLTAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgbGIgPSB2ZWMzKC0wLjUsIDAsIC0wLjUpLFxyXG4gICAgICAgICAgICByZiA9IHZlYzMoMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICByYiA9IHZlYzMoMC41LCAwLCAtMC41KTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2JvdCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW2JvdCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW2JvdCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW2JvdCwgcmYsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgcmYsIHJiXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEljb2hlZHJvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHIgPSAwLjUgLyBNYXRoLnNpbigzNiAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdygyICogTWF0aC5zaW4oMC4xICogTWF0aC5QSSkgKiByLCAyKSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gaSAvIDE4MC4wICogTWF0aC5QSTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKHIgKiBNYXRoLnNpbihhbmdsZSksIHIgKiBNYXRoLmNvcyhhbmdsZSksIC1kIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjEucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChpICsgMzYpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgZCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCAwLCByKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJpMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh0cmkyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBib3QsIGxheWVyMVtpXSwgbGF5ZXIxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FwMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLCBsYXllcjJbaV0sIGxheWVyMlsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChjYXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldERvZGVjYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydCg1MCArIDEwICogTWF0aC5zcXJ0KDUpKSAvIDEwO1xyXG4gICAgICAgIGxldCBSID0gMC4yNSAqICgxICsgTWF0aC5zcXJ0KDUpKSAqIE1hdGguc3FydCgzKTtcclxuICAgICAgICBsZXQgcjAgPSByICogMiAqIE1hdGguY29zKCgzNiAvIDE4MCAqIE1hdGguUEkpKTtcclxuXHJcbiAgICAgICAgbGV0IGVkZ2UxID0gW107XHJcbiAgICAgICAgbGV0IGVkZ2UyID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoUiAqIFIgLSByICogcik7XHJcbiAgICAgICAgbGV0IGQwID0gTWF0aC5zcXJ0KFIgKiBSIC0gcjAgKiByMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICAgICAgYTEgPSBpIC8gMTgwICogTWF0aC5QSSxcclxuICAgICAgICAgICAgICAgIGEyID0gKGkgKyAzNikgLyAxODAgKiBNYXRoLlBJO1xyXG5cclxuICAgICAgICAgICAgbGV0IHAxID0gdmVjMyhyICogTWF0aC5zaW4oYTEpLCByICogTWF0aC5jb3MoYTEpLCBkKTtcclxuICAgICAgICAgICAgbGV0IHAyID0gdmVjMyhyICogTWF0aC5zaW4oYTIpLCByICogTWF0aC5jb3MoYTIpLCAtZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbDEgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTEpLCByMCAqIE1hdGguY29zKGExKSwgZDApO1xyXG4gICAgICAgICAgICBsZXQgbDIgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTIpLCByMCAqIE1hdGguY29zKGEyKSwgLWQwKTtcclxuXHJcbiAgICAgICAgICAgIGVkZ2UxLnB1c2gocDEpO1xyXG4gICAgICAgICAgICBlZGdlMi5wdXNoKHAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKGwxKTtcclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gobDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGVkZ2UxKTtcclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTEgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTIgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTEpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudmVydGV4ZXMgPSBbZWRnZTEsIGxheWVyMSwgbGF5ZXIyLCBlZGdlMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZXREb2RlY2FoZWRyb24oKTtcclxuXHJcbiAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMoMCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMudmVydGV4ZXNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHAgPSBwLmFkZCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwID0gcC5kaXYoNSk7XHJcbiAgICAgICAgICAgIHAgPSBwLm11bCgzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmlzID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVswXSwgdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMV0sIHRoaXMudmVydGV4ZXNbaV1bMl0sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzJdLCB0aGlzLnZlcnRleGVzW2ldWzNdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVszXSwgdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bNF0sIHRoaXMudmVydGV4ZXNbaV1bMF0sIHBdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspXHJcbiAgICAgICAgICAgICAgICB2ZXJ0cy5wdXNoKHRyaXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IHZlcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmltKG10bCkge1xyXG4gICAgICAgIGxldCBpbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIGxldCBqID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZGdlID0gdGhpcy52ZXJ0ZXhlc1tlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleENvb3JkcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgaW4gZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KGVkZ2Vbdl0sIHZlYzMoMCksIHRoaXMudGV4Q29vcmRzW2VdW3ZdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IGluIGVkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChlZGdlW3ZdLCB2ZWMzKDApKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgMCk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqICs9IGVkZ2UubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKG10bCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vYnVmLmpzXCJcclxuXHJcbi8vIENsYXNzIGZvciBob2xkaW5nIG1hdGVyaWFsIHByb3BlcnRpZXMgb2YgcHJpbWl0aXZlLlxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xyXG4gICAgY29uc3RydWN0b3Ioc2hkLCBLYSwgS2QsIEtzLCBQaCkge1xyXG4gICAgICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgICAgIHRoaXMuS2EgPSBLYTtcclxuICAgICAgICB0aGlzLktkID0gS2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgICAgIHRoaXMuUGggPSBQaDtcclxuICAgICAgICB0aGlzLnRleHR1cmVzID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG5cclxuICAgICAgICB0aGlzLlVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMuc2hkLnJuZCwgXCJ1X21hdGVyaWFsXCIsIDE2ICogNCwgMyk7XHJcbiAgICAgICAgLy90aGlzLlVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBsZXQgdGV4X2ZsYWdzID0gWzAsIDAsIDAsIDBdO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5LYS5saW5lYXJpemUoKS5jb25jYXQoWzBdLCB0aGlzLktkLmxpbmVhcml6ZSgpLCBbMF0sIHRoaXMuS3MubGluZWFyaXplKCksIFt0aGlzLlBoXSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCA0OyB0KyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmVzW3RdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0ZXhfZmxhZ3NbdF0gPSAxO1xyXG5cclxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQodGV4X2ZsYWdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVUJPLmFwcGx5KHRoaXMuc2hkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgNDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1t0XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZXNbdF0uYXBwbHkodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNoVGV4dHVyZSh0ZXh0dXJlLCBudW0pIHtcclxuICAgICAgICBpZiAobnVtID4gMyB8fCBudW0gPCAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGV4dHVyZXNbbnVtXSA9IHRleHR1cmU7XHJcbiAgICB9XHJcbn07XHJcblxyXG4iLCJleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gcm5kLmdsO1xyXG5cclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnRleElkID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dElkKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDE7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTtcclxuICAgICAgICBjb25zdCBib3JkZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XHJcbiAgICAgICAgY29uc3QgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKTsgLy8gb3BhcXVlIGJsdWVcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICBsZXZlbCxcclxuICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgc3JjRm9ybWF0LFxyXG4gICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICBwaXhlbCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY1R5cGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Bvd2VyT2YyKGltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKGltYWdlLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFllcywgaXQncyBhIHBvd2VyIG9mIDIuIEdlbmVyYXRlIG1pcHMuXHJcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vLCBpdCdzIG5vdCBhIHBvd2VyIG9mIDIuIFR1cm4gb2ZmIG1pcHMgYW5kIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkobnVtKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIG51bSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIG9uUGluY2goZWxlbWVudCwgb25QaW5jaFN0YXJ0LCBvblBpbmNoTW92ZSwgb25QaW5jaEVuZCkge1xyXG4gICAgbGV0IHNjYWxpbmcgPSBmYWxzZTtcclxuICAgIGxldCBwcmV2X2Rpc3QgPSAwO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm9udG91Y2hzdGFydFwiLCBlID0+IHtcclxuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzY2FsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJldl9kaXN0ID0gTWF0aC5oeXBvdChcclxuICAgICAgICAgICAgICAgIGUudG91Y2hlc1swXS5wYWdlWCAtIGUudG91Y2hlc1sxXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIGUudG91Y2hlc1swXS5wYWdlWSAtIGUudG91Y2hlc1sxXS5wYWdlWVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvblBpbmNoU3RhcnQoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvbnRvdWNobW92ZVwiLCBlID0+IHtcclxuICAgICAgICBpZiAoc2NhbGluZykge1xyXG4gICAgICAgICAgICBsZXQgZGlzdCA9IE1hdGguaHlwb3QoXHJcbiAgICAgICAgICAgICAgICBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRvdWNoZXNbMV0ucGFnZVgsXHJcbiAgICAgICAgICAgICAgICBlLnRvdWNoZXNbMF0ucGFnZVkgLSBlLnRvdWNoZXNbMV0ucGFnZVlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGlzdCAtIHByZXZfZGlzdDtcclxuICAgICAgICAgICAgcHJldl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgb25QaW5jaE1vdmUoZGlzdCwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwib250b3VjaGVuZFwiLCBlID0+IHtcclxuICAgICAgICBpZiAoc2NhbGluZykge1xyXG4gICAgICAgICAgICBvblBpbmNoRW5kKGUpO1xyXG4gICAgICAgICAgICBzY2FsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJpbXBvcnQgeyBSZW5kZXIgfSBmcm9tIFwiLi9ybmQvcm5kLmpzXCJcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSwgbWF0clNjYWxlIH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi9ybmQvcmVzL3ByaW0uanNcIlxyXG5pbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi9wbGF0L3BsYXQuanNcIlxyXG5pbXBvcnQgeyBTaGFkZXIgfSBmcm9tIFwiLi9ybmQvcmVzL3NoZC5qc1wiXHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSBcIi4vdGltZXIvdGltZXIuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vcm5kL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL3JuZC9yZXMvbXRsLmpzXCJcclxuaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCIuL3JuZC9yZXMvdGV4LmpzXCJcclxuaW1wb3J0IHsgb25QaW5jaCB9IGZyb20gXCIuL2lucHV0L3RjaC5qc1wiXHJcblxyXG5mdW5jdGlvbiB0cExvZyh0ZXh0KSB7XHJcbiAgd2luZG93LnBhci5pbm5lckhUTUwgKz0gdGV4dCArIFwiPGJyIC8+XCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgd2luZG93LnBhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicFwiKTtcclxuICBjb25zb2xlLmxvZyhcIk1BSU4gTE9BREVEXCIpO1xyXG4gIC8vdHBMb2coXCJNQUlOIExPQURFRFwiKTtcclxuXHJcbiAgbGV0IGNhbnZhc2VzID0gW107XHJcbiAgbGV0IHJlbmRlcnMgPSBbXTtcclxuICBsZXQgc2hhZGVycyA9IFtdO1xyXG4gIGxldCBwcmltcyA9IFtdO1xyXG4gIGxldCBVQk9zID0gW107XHJcbiAgbGV0IGZpZ3VyZXMgPSBbXTtcclxuICBsZXQgcm90cyA9IFtdO1xyXG4gIGxldCBtdGxzID0gW107XHJcbiAgbGV0IHNjYWxlcyA9XHJcbiAgICBbXHJcbiAgICAgIG1hdHJTY2FsZSh2ZWMzKDUuOCkpLCBtYXRyU2NhbGUodmVjMyg0LjcpKSxcclxuICAgICAgbWF0clNjYWxlKHZlYzMoNCkpLCBtYXRyU2NhbGUodmVjMygzLjIpKSxcclxuICAgICAgbWF0clNjYWxlKHZlYzMoMi4xKSksIG1hdHJTY2FsZSh2ZWMzKDEuMikpLCBtYXRyU2NhbGUodmVjMygwLjMpKSwgbWF0clNjYWxlKHZlYzMoNCkpXHJcbiAgICBdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKylcclxuICAgIGZpZ3VyZXNbaV0gPSBuZXcgRmlndXJlKCk7XHJcbiAgZmlndXJlc1swXS5zZXRUZXRyYWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMV0uc2V0T2N0YWhlZHJvbigpO1xyXG4gIGZpZ3VyZXNbMl0uc2V0Q3ViZSgpO1xyXG4gIGZpZ3VyZXNbM10uc2V0SWNvaGVkcm9uKCk7XHJcbiAgZmlndXJlc1s0XS5zZXREb2RlY2FoZWRyb24oKTtcclxuICBmaWd1cmVzWzVdLnNldFN0YXIoKTtcclxuXHJcbiAgbGV0IG10bF9wcm9wcyA9IFtcclxuICAgIFt2ZWMzKDAuMSksIHZlYzMoMCwgMC43LCAwLjcpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCA5MF0sXHJcbiAgICBbdmVjMygwLjEpLCB2ZWMzKDAuMywgMC4zNSwgMC43KSwgdmVjMygwLjUsIDAuNSwgMC4wKSwgNDBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjQsIDAuNiwgMC40KSwgdmVjMygxLCAxLCAxKSwgOTBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjcsIDAuNywgMC43KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgOTBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjYsIDAuMiwgMC41KSwgdmVjMygwLjMsIDAuMywgMC4zKSwgNDBdLFxyXG4gICAgW3ZlYzMoMC4xKSwgdmVjMygwLjcsIDAuNywgMCksIHZlYzMoMC45LCAwLjksIDAuOSksIDkwXSxcclxuICBdO1xyXG5cclxuICBjYW52YXNlc1s2XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBteUNhbjdgKTtcclxuICBjYW52YXNlc1s2XS5obSA9IEhhbW1lcihjYW52YXNlc1s2XSk7XHJcbiAgY2FudmFzZXNbNl0uaG0uZ2V0KFwicm90YXRlXCIpLnNldCh7IGVuYWJsZTogdHJ1ZSB9KTtcclxuICBjYW52YXNlc1s3XSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBteUNhbjhgKTtcclxuICBjYW52YXNlc1s3XS5obSA9IEhhbW1lcihjYW52YXNlc1s3XSk7XHJcbiAgY2FudmFzZXNbN10uaG0uZ2V0KFwicm90YXRlXCIpLnNldCh7IGVuYWJsZTogdHJ1ZSB9KTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgIC8vIEdldHRpbmcgY2FudmFzIGZyb20gaHRtbFxyXG4gICAgY2FudmFzZXNbaV0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbXlDYW4ke2kgKyAxfWApO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemluZyByZW5kZXIgb2JqZWN0IFxyXG4gICAgcmVuZGVyc1tpXSA9IG5ldyBSZW5kZXIoY2FudmFzZXNbaV0pO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemluZyBzaGFkZXIgZm9yIHJlbmRlciBvYmplY3RcclxuICAgIHNoYWRlcnNbaV0gPSBuZXcgU2hhZGVyKHJlbmRlcnNbaV0sIFwiZGVmYXVsdFwiKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXppbmcgbWF0ZXJpYWwgcmVsYXRlcmQgdG8gc2hhZGVyXHJcbiAgICBtdGxzW2ldID0gbmV3IE1hdGVyaWFsKHNoYWRlcnNbaV0sIC4uLm10bF9wcm9wc1tpXSk7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgcHJpbWl0aXZlIHVzaW5nIG1hdGVyaWFsXHJcbiAgICBwcmltc1tpXSA9IGZpZ3VyZXNbaV0ubWFrZVByaW0obXRsc1tpXSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6aW5nIEhhbW1lciBvbiBjYW52YXNcclxuICAgIGNhbnZhc2VzW2ldLmhtID0gSGFtbWVyKGNhbnZhc2VzW2ldKTtcclxuICAgIGNhbnZhc2VzW2ldLmhtLmdldChcInJvdGF0ZVwiKS5zZXQoeyBlbmFibGU6IHRydWUgfSk7XHJcbiAgfVxyXG4gIHByaW1zWzBdLnRyYW5zZm9ybSA9IG1hdHJUcmFuc2xhdGUodmVjMygwLCAtMC4zLCAwKSk7XHJcblxyXG4gIC8vIFRpbWVyIGNyZWF0aW9uXHJcbiAgbGV0IHRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgLy8gVGVzdCBtYXRlcmlhbCBhbmQgcHJpbWl0aXZlIFxyXG4gIGxldCByZW5kZXJfbW9kZWwgPSBuZXcgUmVuZGVyKGNhbnZhc2VzWzZdKTtcclxuICBsZXQgc2hhZGVyX21vZGVsID0gbmV3IFNoYWRlcihyZW5kZXJfbW9kZWwsIFwiZGVmYXVsdFwiKTtcclxuICBsZXQgbXRsID0gbmV3IE1hdGVyaWFsKHNoYWRlcl9tb2RlbCwgLi4ubXRsX3Byb3BzWzBdKTtcclxuICBsZXQgdGVzdF9wciA9IG5ldyBQcmltKG10bCwgXCJjb3dcIik7XHJcbiAgdGVzdF9wci50cmFuc2Zvcm0gPSBtYXRyVHJhbnNsYXRlKHZlYzMoMCwgLTQuNSwgMCkpO1xyXG5cclxuICBsZXQgcmVuZGVyX3RleHR1cmUgPSBuZXcgUmVuZGVyKGNhbnZhc2VzWzddKTtcclxuICBsZXQgc2hhZGVyX3RleHR1cmUgPSBuZXcgU2hhZGVyKHJlbmRlcl90ZXh0dXJlLCBcImRlZmF1bHRcIik7XHJcbiAgbGV0IG10bF90ZXh0dXJlID0gbmV3IE1hdGVyaWFsKHNoYWRlcl90ZXh0dXJlLCAuLi5tdGxfcHJvcHNbMF0pO1xyXG4gIC8vbGV0IHRleCA9IG5ldyBUZXh0dXJlKHJlbmRlcl90ZXh0dXJlLCBcImJpbi90ZXh0dXJlcy9QTkcuUE5HXCIpO1xyXG4gIGxldCB0ZXggPSBuZXcgVGV4dHVyZShyZW5kZXJfdGV4dHVyZSwgXCIuL2Jpbi90ZXh0dXJlcy9lbS5qcGdcIik7XHJcbiAgbXRsX3RleHR1cmUuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gIG10bF90ZXh0dXJlLnVwZGF0ZSgpO1xyXG4gIGxldCBmID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGYuc2V0Q3ViZSgpO1xyXG4gIGxldCBwcmltX3RleCA9IGYubWFrZVByaW0obXRsX3RleHR1cmUpO1xyXG5cclxuICAvL3Rlc3RfcHIudHJhbnNmb3JtID0gbWF0clRyYW5zbGF0ZSh2ZWMzKDAsIC01LjAsIDApKTtcclxuICAvL2NhbnZhc2VzWzZdLnN0eWxlLndpZHRoID0gXCI1MCVcIjtcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBNb3VzZSBldmVudCBoYW5kbGVycyBzZXR0aW5nXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgbGV0IHJvdFNwZWVkID0gMC4wMTtcclxuICBsZXQgc3MgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV07XHJcbiAgbGV0IHNjYWxlczEgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgcm90c1tpXSA9IG1hdDQoMSk7XHJcbiAgICBzY2FsZXMxW2ldID0gbWF0NCgxKTtcclxuXHJcbiAgICBsZXQgZjEgPSBlID0+IHtcclxuICAgICAgcm90c1tpXSA9IHJvdHNbaV0ubXVsKG1hdHJSb3RhdGUocm90U3BlZWQgKiBlLm1vdmVtZW50WCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICByb3RzW2ldID0gcm90c1tpXS5tdWwobWF0clJvdGF0ZShyb3RTcGVlZCAqIGUubW92ZW1lbnRZLCB2ZWMzKDEsIDAsIDApKSk7XHJcbiAgICB9O1xyXG4gICAgbGV0IGYyID0gZSA9PiB7XHJcbiAgICAgIGlmIChlLmRlbHRhWSA+IDApXHJcbiAgICAgICAgc2NhbGVzW2ldID0gc2NhbGVzW2ldLm11bChtYXRyU2NhbGUodmVjMygwLjkpKSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBzY2FsZXNbaV0gPSBzY2FsZXNbaV0ubXVsKG1hdHJTY2FsZSh2ZWMzKDEuMSkpKTtcclxuICAgIH07XHJcbiAgICBsZXQgZjMgPSAoZGlzdCwgZGVsdGEpID0+IHtcclxuICAgICAgZCA9IGRlbHRhIC8gMjAuMDtcclxuICAgICAgaWYgKHNzW2ldICsgZCA+IDApXHJcbiAgICAgICAgc3NbaV0gKz0gZDtcclxuICAgICAgc2NhbGVzMVtpXSA9IG1hdHJTY2FsZSh2ZWMzKHNzW2ldKSk7XHJcbiAgICB9O1xyXG4gICAgbGV0IGY0ID0gZSA9PiB7XHJcbiAgICAgIHJvdHNbaV0gPSByb3RzW2ldLm11bChtYXRyUm90YXRlKDAuMjIgKiBlLnZlbG9jaXR5WCwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICByb3RzW2ldID0gcm90c1tpXS5tdWwobWF0clJvdGF0ZSgwLjIyICogZS52ZWxvY2l0eVksIHZlYzMoMSwgMCwgMCkpKTtcclxuICAgIH07XHJcbiAgICBsZXQgb25UYXAgPSBlID0+IHtcclxuICAgICAgaWYgKGNhbnZhc2VzW2ldLnN0eWxlLndpZHRoID09IFwiMzUlXCIpIHtcclxuICAgICAgICBjYW52YXNlc1tpXS5zdHlsZS53aWR0aCA9IFwiMjAlXCI7XHJcbiAgICAgICAgY2FudmFzZXNbaV0uc3R5bGUucG9zaXRpb24gPSBcInN0YXRpY1wiO1xyXG4gICAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLnRvcCA9IFwiYXV0b1wiO1xyXG4gICAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLmxlZnQgPSBcImF1dG9cIjtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLndpZHRoID0gXCIzNSVcIjtcclxuICAgICAgY2FudmFzZXNbaV0uc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgICBjYW52YXNlc1tpXS5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICBjYW52YXNlc1tpXS5zdHlsZS50b3AgPSBcIjUlXCI7XHJcbiAgICAgIGNhbnZhc2VzW2ldLnN0eWxlLmxlZnQgPSBcIjMyJVwiO1xyXG5cclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjYW52YXNlcy5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgIGlmIChjICE9IGkpIHtcclxuICAgICAgICAgIGNhbnZhc2VzW2NdLnN0eWxlLndpZHRoID0gXCIyMCVcIjtcclxuICAgICAgICAgIGNhbnZhc2VzW2NdLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcclxuICAgICAgICAgIGNhbnZhc2VzW2NdLnN0eWxlLnRvcCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgY2FudmFzZXNbY10uc3R5bGUubGVmdCA9IFwiYXV0b1wiOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY2FudmFzZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmMSk7XHJcbiAgICBjYW52YXNlc1tpXS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZjIpO1xyXG4gICAgY2FudmFzZXNbaV0uaG0ub24oXCJyb3RhdGVcIiwgZjMpO1xyXG4gICAgY2FudmFzZXNbaV0uaG0ub24oXCJwYW5cIiwgZjQpO1xyXG4gICAgY2FudmFzZXNbaV0uaG0ub24oXCJ0YXBcIiwgb25UYXApO1xyXG4gICAgb25QaW5jaChjYW52YXNlc1tpXSwgKCkgPT4ge30sIGYzLCAoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvLyBFYWNoIGZyYW1lIHJlbmRlcmluZyBmdW5jdGlvbiBkZWNsYXJhdGlvblxyXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcblxyXG4gICAgLy8gVGltZXIgcmVwb25zZVxyXG4gICAgLy90aW1lci5yZXNwb25zZSgpO1xyXG5cclxuICAgIGxldCB0ID0gdGltZXIuZ2V0VGltZSgpO1xyXG5cclxuICAgIC8vIEZyYW1lIHJlbmRlclxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgLy8gIFN0YXJ0aW5nIHBvc3RpbmcgY3JpbmdlIFxyXG4gICAgICByZW5kZXJzW2ldLnJlbmRlclN0YXJ0KCk7XHJcblxyXG4gICAgICAvLyBSZW5kZXJpbmcgW2ldIHByaW1pdGl2ZVxyXG4gICAgICBwcmltc1tpXS5yZW5kZXIoc2NhbGVzMVtpXS5tdWwoc2NhbGVzW2ldLm11bChtYXRyUm90YXRlKHQsIHZlYzMoMCwgMSwgMCkpLm11bChyb3RzW2ldLm11bChtYXRyVHJhbnNsYXRlKHZlYzMoMCwgMCwgLTEwKSkpKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJfbW9kZWwucmVuZGVyU3RhcnQoKTtcclxuICAgIHRlc3RfcHIucmVuZGVyKHNjYWxlczFbNl0ubXVsKHNjYWxlc1s2XS5tdWwobWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwocm90c1s2XS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0xMCkpKSkpKSk7XHJcbiAgICByZW5kZXJfdGV4dHVyZS5yZW5kZXJTdGFydCgpO1xyXG4gICAgcHJpbV90ZXgucmVuZGVyKHNjYWxlczFbN10ubXVsKHNjYWxlc1s3XS5tdWwobWF0clJvdGF0ZSh0LCB2ZWMzKDAsIDEsIDApKS5tdWwocm90c1s3XS5tdWwobWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIC0xMCkpKSkpKSk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICB9O1xyXG4gIGRyYXcoKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBtYWluKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLEtBQUs7QUFDTDtJQUNBLElBQUksSUFBSSxHQUFHO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLEdBQUc7SUFDVixRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekMsS0FBSztBQUNMO0lBQ0EsSUFBSSxJQUFJLEdBQUc7SUFDWCxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3QjtJQUNBLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNwQixZQUFZLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCO0lBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLFlBQVksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsUUFBUSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hELEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLO0FBQ0w7SUFDQSxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDYixRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9DLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsS0FBSztBQUNMO0lBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ2YsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCO0lBQ0EsUUFBUSxPQUFPLElBQUk7SUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLFNBQVMsR0FBRztJQUNoQixRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVM7SUFDdEIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVE7SUFDNUIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCOztJQzdGQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVztJQUNmLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixNQUFNO0lBQ04sUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDdEMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkgsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLEdBQUc7SUFDaEIsUUFBUSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSTtJQUNwQixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsRUFBRTtJQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTO0lBQ3BDLFFBQVEsT0FBTyxJQUFJLEtBQUs7SUFDeEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLElBQUksT0FBTyxHQUFHLElBQUksUUFBUTtJQUM5QixRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxTQUFTLENBQUM7SUFDVixJQUFJLE9BQU8sSUFBSSxLQUFLO0lBQ3BCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixLQUFLLENBQUM7SUFDTixDQUFDO0FBQ0Q7SUFDTyxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLElBQ08sSUFDQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUc7QUFDeEI7SUFDQSxJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUM7SUFDVCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDO0lBQ1QsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckIsS0FBSyxDQUFDO0lBQ04sQ0FBQztBQUNEO0lBQ08sU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFFO0lBQ2pDLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtJQUM3QixJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixLQUFLO0lBQ0wsQ0FBQztBQUNEO0lBQ08sU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDakUsSUFBSSxPQUFPLElBQUk7SUFDZixRQUFRLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQy9DLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUk7SUFDSixRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNoQyxRQUFRLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNyQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENB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RUFBRSxDQUFDLENBQUMsR0FBRztJQUNqQyxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztJQUNqQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEQ7SUFDQSxRQUFRLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxLQUFLO0FBQ0w7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzFDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxNQUFNLElBQUksQ0FBQztJQUNsQixJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtJQUNwQyxRQUFRLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDO0lBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN0QyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM1QixRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSTtJQUNoQyxZQUFZLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQy9CO0lBQ0EsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDO0lBQ0EsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtJQUNoQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsU0FBUztBQUNUO0lBQ0EsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUQsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELFFBQVEsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN4RDtJQUNBLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUUsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFHO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsRUFBRTtJQUNyRCxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFGLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNELFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUYsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRixZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkQsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25GLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xIO0lBQ0EsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDN0MsS0FBSztBQUNMO0lBQ0EsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7SUFDekMsUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxRQUFRLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTtJQUNuQyxZQUFZLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzNCLFlBQVksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQy9CLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsU0FBUyxNQUFNO0lBQ2YsWUFBWSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUMzQixZQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckQsU0FBUztJQUNULEtBQUs7QUFDTDtJQUNBLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtBQUNsQjtJQUNBO0lBQ0E7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFO0lBQzFELFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLFlBQVksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDL0IsU0FBUztBQUNUO0lBQ0E7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUM5QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEUsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakcsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pILFNBQVM7SUFDVCxLQUFLO0FBQ0w7SUFDQSxJQUFJLE1BQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7SUFDakMsUUFBUSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDckIsUUFBUSxJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RCxRQUFRLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BDLFFBQVEsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDM0IsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUMzQixRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO0lBQ2hDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO0lBQ2hDLGdCQUFnQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLGdCQUFnQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDM0I7SUFDQSxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEQsb0JBQW9CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUN2Qyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDO0lBQzVCLHFCQUFxQjtJQUNyQixpQkFBaUI7QUFDakI7SUFDQSxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQ7SUFDQSxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGdCQUFnQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGFBQWEsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7SUFDdkMsZ0JBQWdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFM0M7SUFDQSxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1QyxvQkFBNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzdFLG9CQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVFO0lBQ0EsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELEtBQUs7SUFDTDs7SUNwS08sTUFBTSxNQUFNLENBQUM7SUFDcEIsSUFBSSxXQUFXLEdBQUc7SUFDbEIsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUMzQixLQUFLO0FBQ0w7SUFDQSxJQUFJLE9BQU8sR0FBRztJQUNkLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRztJQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxTQUFTLENBQUM7SUFDVixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUc7SUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsU0FBUyxDQUFDO0lBQ1YsS0FBSztBQUNMO0lBQ0EsSUFBSSxjQUFjLEdBQUc7SUFDckIsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNEO0lBQ0EsUUFBUTtJQUNSLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0MsWUFBWSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUMzQyxZQUFZLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUM5QyxZQUFZLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztBQUMvQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRztJQUN4QixZQUFZLENB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LEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzlDO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakUsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRTtJQUNBLFlBQVksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLFlBQVksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckU7SUFDQSxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsWUFBWSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xD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QUFFLENBQUM7SUFDckIsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNyQixRQUFRLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pEO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVFO0lBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsS0FBSztBQUNMO0lBQ0EsSUFBSSxNQUFNLEdBQUc7SUFDYixRQUFRLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQzVHO0lBQ0EsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNsQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJO0lBQ3hDLGdCQUFnQixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDO0lBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FB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Q0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsS0FBSyxDQUFDO0FBQ047SUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVCLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7SUFDOUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDOUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDL0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkI7SUFDQSxFQUFFLElBQUksU0FBUyxHQUFHO0lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzNELEdBQUcsQ0FBQztBQUNKO0lBQ0EsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEQsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNyRDtJQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5QjtJQUNBLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRDtJQUNBO0lBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekM7SUFDQTtJQUNBLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNuRDtJQUNBO0lBQ0EsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQ7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUM7SUFDQTtJQUNBLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RCxHQUFHO0lBQ0gsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQ7SUFDQTtJQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUMxQjtJQUNBLEVBQUUsSUFBSSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsRUFBRSxJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekQsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxFQUFFLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RDtJQUNBLEVBQUUsSUFBSSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsRUFBRSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsRUFBRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRTtJQUNBLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDakUsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7SUFDdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZCxFQUFFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFRekMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQU16QixJQUFJLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtJQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBQ3RCLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQ7SUFDQSxRQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELEtBQUssQ0FBQztJQUNOLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFLO0lBQzlCLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdkIsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN2QixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEtBQUssQ0FBQztJQUNOLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0lBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsS0FBSyxDQUFDO0lBQ04sSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUk7SUFDckIsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtJQUM1QyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN4QyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM5QyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUN2QyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN4QyxRQUFRLE9BQU87SUFDZixPQUFPO0FBQ1A7SUFDQSxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN0QyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMzQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNsQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNuQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUM5QyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUNuQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNyQztJQUNBLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDcEIsVUFBVSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDMUMsVUFBVSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDaEQsVUFBVSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDekMsVUFBVSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDMUMsU0FBUztJQUNULE9BQU87SUFDUCxLQUFLLENBQUM7QUFDTjtJQUNBO0lBQ0EsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFZLENBQUMsQ0FBQztJQUNqRCxHQUFHO0FBQ0g7SUFDQTtJQUNBLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTTtBQUNyQjtJQUNBO0lBQ0E7QUFDQTtJQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzVCO0lBQ0E7SUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDaEM7SUFDQSxNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQjtJQUNBO0lBQ0EsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEksS0FBSztBQUNMO0lBQ0EsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakksSUFBSSxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEk7SUFDQSxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUM7SUFDSixFQUFFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztBQUNEO0lBQ0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0lBQ3RDLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUM7Ozs7OzsifQ==
