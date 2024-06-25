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
        this.tmpSourse = { vert: null, frag: null };
        this._init();
      }

      async _init() {
        this.shaders = [
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
          },
        ];
        for (const s of this.shaders) {
          let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
          let src = await response.text();
          if (typeof src == "string" && src != "") s.src = src;
        }
        // recompile shaders
        this.updateShadersSource();
      }

      updateShadersSource() {
        this.shaders[0].id = null;
        this.shaders[1].id = null;

        if (this.shaders[0].src == "" || this.shaders[1].src == "") return;
        this.shaders.forEach((s) => {
          s.id = this.rnd.gl.createShader(s.type);
          this.rnd.gl.shaderSource(s.id, s.src);
          this.rnd.gl.compileShader(s.id);
          if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
            let buf = this.rnd.gl.getShaderInfoLog(s.id);
            console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
          }
        });
        this.prg = this.rnd.gl.createProgram();
        this.shaders.forEach((s) => {
          if (s.id != null) this.rnd.gl.attachShader(this.prg, s.id);
        });
        this.rnd.gl.linkProgram(this.prg);
        if (!this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.LINK_STATUS)) {
          let buf = this.rnd.gl.getProgramInfoLog(this.prg);
          console.log(`Shader program ${this.name} link fail: ${buf}`);
        }
        if (this.tmpSourse["vert"] != null) {
          this.update(this.tmpSourse["vert"], "vert");
          this.tmpSourse["vert"] = null;
        }
        if (this.tmpSourse["frag"] != null) {
          this.update(this.tmpSourse["frag"], "frag");
          this.tmpSourse["frag"] = null;
        }
        this.updateShaderData();
      }

      updateShaderData() {
        this.posLoc = this.rnd.gl.getAttribLocation(this.prg, "InPosition");
        this.normLoc = this.rnd.gl.getAttribLocation(this.prg, "InNormal");
        this.texLoc = this.rnd.gl.getAttribLocation(this.prg, "InTexCoord");

        // Shader uniforms
        this.uniforms = {};
        const countUniforms = this.rnd.gl.getProgramParameter(
          this.prg,
          this.rnd.gl.ACTIVE_UNIFORMS
        );
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
        const countUniformBlocks = this.rnd.gl.getProgramParameter(
          this.prg,
          this.rnd.gl.ACTIVE_UNIFORM_BLOCKS
        );
        for (let i = 0; i < countUniformBlocks; i++) {
          const block_name = this.rnd.gl.getActiveUniformBlockName(this.prg, i);
          const index = this.rnd.gl.getUniformBlockIndex(this.prg, block_name);
          this.uniformBlocks[block_name] = {
            name: block_name,
            index: index,
            size: this.rnd.gl.getActiveUniformBlockParameter(
              this.prg,
              index,
              this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE
            ),
            bind: this.rnd.gl.getActiveUniformBlockParameter(
              this.prg,
              index,
              this.rnd.gl.UNIFORM_BLOCK_BINDING
            ),
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

      // type: "vert" or "frag"
      update(source, type) {
        let n;
        if (type == "vert") n = 0;
        else if (type == "frag") n = 1;
        else return;

        if (this.shaders[n].id == null) {
          this.tmpSourse[type] = source;
        } else {
          this.rnd.gl.shaderSource(this.shaders[n].id, source);
          this.rnd.gl.compileShader(this.shaders[n].id);
          this.rnd.gl.linkProgram(this.prg);
          this.updateShaderData();
        }
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
            this.position = vec3(22, 0, 22);
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
            // this.velocity -= this.acceleration * this.render.timer.globalDeltaTime;
            // this.position.y = this.position.y + this.velocity * this.render.timer.globalDeltaTime;
            // /*if (this.velocity < 0 && this.position.y >= 2.5) {
            // } else if (this.velocity > 0 && this.position.y < 2.5) {
            //     this.position.y = this.position.y + this.velocity * this.render.timer.globalDeltaTime;
            // }*/
            // if (this.position.y < 2.5)
            //     this.position.y = 2.5;

            // if (this.keyTab["KeyA"]) {
            //     this.position = this.position.add(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // } if (this.keyTab["KeyD"]) {
            //     this.position = this.position.sub(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // } if (this.keyTab["KeyW"]) {
            //     this.position = this.position.add(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // } if (this.keyTab["KeyS"]) {
            //     this.position = this.position.sub(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // } if (this.keyTab["ShiftLeft"]) {
            //     this.position = this.position.sub(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // } if (this.keyTab["Space"]) {
            //     //this.position = this.position.add(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            // }
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
            canvas.getBoundingClientRect();
            this.width = 1920;//rect.right - rect.left + 1;
            this.height = 1080;//rect.bottom - rect.top + 1;

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
        this.mtl = this.shader.newMaterial(
          vec3(0.1),
          vec3(1, 0.5, 1.0),
          vec3(0.3),
          90,
          1.0
        );
        this.tex = render.newTexture("./bin/textures/wallpaper.png ");
        this.mtl.attachTexture(this.tex, 0);
        this.mtl.update();
        this.mtl1 = this.shader.newMaterial(
          vec3(0.1),
          vec3(1, 0.5, 1.0),
          vec3(0.3),
          90,
          1.0
        );
        this.tex1 = render.newTexture("./bin/textures/p.png");
        this.mtl1.attachTexture(this.tex1, 0);
        this.mtl1.update();
        this.mtlCail = this.shader.newMaterial(
          vec3(0.1),
          vec3(1, 0.5, 1.0),
          vec3(0.3),
          90,
          1.0
        );
        this.texCail = render.newTexture("./bin/textures/cail.png");
        this.mtlCail.attachTexture(this.texCail, 0);
        this.mtlCail.update();

        let fcube = new Figure();
        fcube.setCube();
        this.cube = fcube.makePrim(this.mtl);
        this.cubeFloor = fcube.makePrim(this.mtl1);
        this.cubeCail = fcube.makePrim(this.mtlCail);
        this.map = null;
        this.image = null;
        Jimp.read(fileName, (err, image) => {
          this.map = image.bitmap.data;
          this.image = image;
        });
      }
      render(world) {
        if (this.map == null) return;
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
              this.cubeCail.render(matrTranslate(vec3(x, 5, y)).mul(world));
            }
          }
      }

      putPixel(x, y, c) {
        this.image.setPixelColor(x, y, c);
      }
    }

    const host = "localhost";
    const port = "8000";
    let userName;
    let playersPool = {};
    let mainRender;
    let avatars = {};
    let shaders = {};
    let materials = {};
    let prims = {};
    let webSocket;
    let tex;

    function wsInit(render) {
        userName = sessionStorage.getItem("name");

        mainRender = render;
        let socket = new WebSocket(`ws://${host}:${port}`);
        webSocket = socket;

        tex = render.newTexture("./bin/textures/em.jpg");

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
            for (let p in m.players) {
                if (avatars[p] == undefined) {
                    // Step 1: Hash your email address using SHA-256.
                    const hashedEmail = CryptoJS.SHA256(m.players[p].id);
                    avatars[p] = mainRender.newTexture(`https://www.gravatar.com/avatar/${hashedEmail}`);
                }
                if (shaders[p] == undefined) {
                    shaders[p] = mainRender.newShader("default");
                }
                if (prims[p] == undefined) {
                    shaders[p] = mainRender.newShader("default");
                    materials[p] = shaders[p].newMaterial(vec3(0.1),
                        vec3(1, 0.1, 0.1),
                        vec3(0.3),
                        90,
                        1.0
                    );
                    materials[p].attachTexture(tex, 0);
                    materials[p].update();
                    const fig = new Figure();
                    fig.setCube();
                    prims[p] = fig.makePrim(materials[p]);
                }
            }
        }
        if (m.type == "shader") {
            /*if (shaders[m.id] == undefined) {
                shaders[m.id] = mainRender.newShader("default");
            }*/
            prims[m.id].mtl.shd.update(m.source, "frag");
        }
    }

    function onInterval(socket) {
        // Sending coords to the server
        socket.send(JSON.stringify({ type: "coords", id: userName, coords: { trans: mainRender.control.transform, pos: mainRender.control.position } }));
        // Asking for getting coords from server
        socket.send(JSON.stringify({ type: "get_coords" }));
    }

    function getPlayers() {
        return { players: playersPool, id: userName, avatars: avatars, prims: prims };
    }

    function sendObject(object) {
        object.id = userName;
        webSocket.send(JSON.stringify(object));
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
            this.end = [new Room(render, "./bin/rooms/end.png")];

            this.map = [];
            this.loaded = false;
            this.image = null;
            Jimp.read(fileName, (err, image) => {
                this.loaded = true;
                this.map = image.bitmap.data;
                this.image = image;
            });
            this.rnd = render;
        }

        render() {
            this.prevPos = vec3(this.position);
            this.velocity = this.rnd.control.velocity;
            this.acceleration = this.rnd.control.acceleration;
            this.position = this.rnd.control.position;
            this.velocity = this.rnd.control.velocity;
            this.keyTab = this.rnd.control.keyTab;
            this.forward = this.rnd.control.forward;
            this.right = this.rnd.control.right;
            this.up = this.rnd.control.up;
            this.moveSpeed = this.rnd.control.moveSpeed;

            this.velocity -= this.acceleration * this.rnd.timer.globalDeltaTime;
            this.position.y = this.position.y + this.velocity * this.rnd.timer.globalDeltaTime;
            if (this.position.y < 2.5)
                this.position.y = 2.5;
            this.rnd.control.velocity = this.velocity;
            this.rnd.control.acceleration = this.acceleration;
            this.rnd.control.position.y = this.position.y;

            if (this.keyTab["KeyA"]) {
                this.position = this.position.add(this.right.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
            } if (this.keyTab["KeyD"]) {
                this.position = this.position.sub(this.right.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
            } if (this.keyTab["KeyW"]) {
                this.position = this.position.add(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
            } if (this.keyTab["KeyS"]) {
                this.position = this.position.sub(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
            } if (this.keyTab["ShiftLeft"]) {
                this.position = this.position.sub(this.up.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
            } if (this.keyTab["Space"]) ;

            if (this.image != null) {
                let xz = this.rnd.control.position.div(10);
                xz = vec3(Math.floor(xz.x), 0.5, Math.floor(xz.z));
                let xz10 = vec3(xz);
                xz10.x = Math.floor(0.5 + this.position.x) % 10;
                xz10.z = Math.floor(0.5 + this.position.z) % 10;
                let c = Jimp.intToRGBA(this.image.getPixelColor(xz.x, xz.z));
                let room;
                if (xz.x % 2 == 0 && xz.z % 2 != 0) {
                    room = this.vert[0];
                } else if (xz.x % 2 != 0 && xz.z % 2 == 0) {
                    room = this.horz[0];
                } else if (c.r == 255) {
                    room = this.rooms[0];
                } else if (c.g == 255) {
                    room = this.rooms[1];
                } else if (c.b == 255) {
                    room = this.rooms[2];
                }
                let res;

                if (room != undefined)
                    res = Jimp.intToRGBA(room.image.getPixelColor(xz10.x, xz10.z));

                if (res == undefined || !(res.r == 255 && res.b == 255 && res.g == 255)) {
                    this.rnd.control.position = this.position;
                }
            } else
                this.rnd.control.position = this.position;
            ///////////////
            ///////////////
            ///////////////
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
                    if (c.r == 128 && c.g == 128 && c.b == 128)
                        this.end[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                    else if (c.r == 255 && c.g == 255 && c.b == 255)
                        this.vert[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                }
            for (let y = 0; y < this.image.bitmap.height; y += 2)
                for (let x = 1; x < this.image.bitmap.width; x += 2) {
                    let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                    if (c.r == 128 && c.g == 128 && c.b == 128)
                        this.end[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                    else if (c.r == 255 && c.g == 255 && c.b == 255)
                        this.horz[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                }
        }
    }

    let textArea;
    let buttonApply;
    let shader;

    function shaderUpdateInit(_shader) {
      document.getElementById("codeArea");
      textArea = document.getElementById("textArea");
      buttonApply = document.getElementById("apply");
      buttonApply.onclick = onApply;
      shader = _shader;
    }

    function onApply() {
      const source = textArea.value;
      shader.update(source, "frag");
      sendObject({ type: "shader", source: textArea.value });
    }

    class Cows {
        constructor(lab) {
            this.lab = lab;
            this.poses = [];
            for (let i = 0; i < 10; i++) {
                let rx = (Math.floor(Math.random() * 4) * 2) * 10 + 10 - 5.5;
                let ry = (Math.floor(Math.random() * 4) * 2 + 1) * 10 + 10 - 5.5;
                this.poses.push(vec3(rx, 0, ry));
            }
            let shd = this.lab.rnd.newShader("default");
            let mtl = shd.newMaterial(
                vec3(0.1),
                vec3(1, 0.8, 0),
                vec3(0.3),
                90,
                0.5
            );
            this.cow = mtl.newPrimitive("cow");
        }

        render() {
            for (let i in this.poses) {
                let d = this.poses[i].sub(this.lab.rnd.control.position).len();
                if (d < 3) {
                    let rx = (Math.floor(Math.random() * 4) * 2) * 10 - 5.5;
                    let ry = (Math.floor(Math.random() * 4) * 2 + 1) * 10 - 5.5;
                    this.poses[i] = vec3(rx, 0, ry);
                }
                this.cow.render(matrScale(vec3(0.05)).mul(matrRotate(this.lab.rnd.timer.globalTime, vec3(0, 1, 0)).mul(matrTranslate(vec3(this.poses[i].x, 1.3, this.poses[i].z)))));
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
      shaderUpdateInit(shader);
      let tex = render.newTexture("./bin/textures/em.jpg");
      render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));
      let lab = new Labirint(render, "./bin/labs/def1.png");
      let pl_mtl = shader.newMaterial(
        vec3(0.1),
        vec3(1, 0.1, 0.1),
        vec3(0.3),
        90,
        1.0
      );
      pl_mtl.attachTexture(tex, 0);
      pl_mtl.update();
      let f = new Figure();
      f.setCube();
      f.makePrim(pl_mtl);
      let cows = new Cows(lab);

      canvas.onclick = function () {
        $("#textArea").slideUp();
        $('#apply').slideUp();
        $('#mainFrame').css({ 'width': '100vw' });
        canvas.requestPointerLock();
      };

      window.addEventListener("keydown", e => {
        if (e.code == 'Tab') {
          $("#textArea").slideDown();
          $('#apply').slideDown();
          $('#mainFrame').css({ 'width': '80vw' });
        }
      });

      //let sky = render.newSkySphere("./bin/textures/space.png");
      render.newSkySphere("./bin/textures/water.jpg");

      const draw = () => {
        let p = getPlayers();

        render.renderStart();
        for (let player in p.players) {
          if (p.id != player) {
            p.prims[player].mtl.attachTexture(p.avatars[player], 0);
            p.prims[player].render(mat4(p.players[player].coords.trans).mul(
              matrTranslate(p.players[player].coords.pos)
            ));
          }
        }

        //prim.render(
        //  matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(
        //    matrTranslate(vec3(0, 0, 0))
        //  )
        //);
        //sky.render(mat4(1));
        lab.render();
        cows.render();
        render.renderEnd();
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.onload = main;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC92ZWMyLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvcHJpbS5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9jdHJsL2N0cmwuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9wbGF0L3BsYXQuanMiLCIuLi9zcmMvZ2VuL2dlbi5qcyIsIi4uL3NyYy93cy5qcyIsIi4uL3NyYy9nZW4vbGFiLmpzIiwiLi4vc3JjL3NoZF91cGQuanMiLCIuLi9zcmMvZ2VuL2Nvd3MuanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMoMCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGxlbik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogaywgdGhpcy55ICogaywgdGhpcy56ICogayk7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLyBrLCB0aGlzLnkgLyBrLCB0aGlzLnogLyBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICAgICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bG1hdHIobSkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy54ICogbS5hWzBdWzNdICtcclxuICAgICAgICAgICAgdGhpcy55ICogbS5hWzFdWzNdICtcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzJdWzNdICtcclxuICAgICAgICAgICAgbS5hWzNdWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl0pIC8gdywpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShtKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoMCwgMCwgMCk7XHJcbiAgICBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgueCwgeC55LCB4LnopO1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59XHJcbiIsImNsYXNzIF92ZWMyIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMyKHgsIHkpIHtcclxuICAgIGlmICh5ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMyKHgsIHgpO1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMih4LCB5KTtcclxufSIsImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwobSkge1xyXG4gICAgICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMuYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KFxyXG4gICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbikge1xyXG4gICAgaWYgKGEwMCA9PSAxICYmIGEwMSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIGEwMC5hWzBdWzBdLCBhMDAuYVswXVsxXSwgYTAwLmFbMF1bMl0sIGEwMC5hWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDAuYVsxXVswXSwgYTAwLmFbMV1bMV0sIGEwMC5hWzFdWzJdLCBhMDAuYVsxXVszXSxcclxuICAgICAgICAgICAgYTAwLmFbMl1bMF0sIGEwMC5hWzJdWzFdLCBhMDAuYVsyXVsyXSwgYTAwLmFbMl1bM10sXHJcbiAgICAgICAgICAgIGEwMC5hWzNdWzBdLCBhMDAuYVszXVsxXSwgYTAwLmFbM11bMl0sIGEwMC5hWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyU2NhbGUocykge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcy54LCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIHMueSwgMCwgMCxcclxuICAgICAgICAwLCAwLCBzLnosIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMVxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0ckZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDIgKiBuZWFyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMCxcclxuICAgICAgICAocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAtMSxcclxuICAgICAgICAwLCAwLCAtMiAqIG5lYXIgKiBmYXIgLyAoZmFyIC0gbmVhciksIDBcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgICByaWdodCA9IGRpci5jcm9zcyh1cDEpLm5vcm0oKSxcclxuICAgICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcmlnaHQueCwgdXAueCwgLWRpci54LCAwLFxyXG4gICAgICAgIHJpZ2h0LnksIHVwLnksIC1kaXIueSwgMCxcclxuICAgICAgICByaWdodC56LCB1cC56LCAtZGlyLnosIDAsXHJcbiAgICAgICAgLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMVxyXG4gICAgKTtcclxufSIsImNsYXNzIF9idWZmZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgICAgLy8gQnVmZmVyIHR5cGUgKGdsLioqKl9CVUZGRVIpXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTsgICAgLy8gQnVmZmVyIHNpemUgaW4gYnl0ZXNcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICBpZiAoc2l6ZSA9PSAwIHx8IHR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmlmb3JtQnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIG5hbWUsIHNpemUsIGJpbmRQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYmluZFBvaW50ID0gYmluZFBvaW50OyAvLyBCdWZmZXIgR1BVIGJpbmRpbmcgcG9pbnRcclxuICAgIH1cclxuXHJcbiAgICBhcHBseShzaGQpIHtcclxuICAgICAgICBpZiAodGhpcy5ybmQgPT0gdW5kZWZpbmVkIHx8IHNoZC5wcmcgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2hkLnJuZC5nbC51bmlmb3JtQmxvY2tCaW5kaW5nKHNoZC5wcmcsIHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0uaW5kZXgsIHRoaXMuYmluZFBvaW50KTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXJCYXNlKHNoZC5ybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHRoaXMuYmluZFBvaW50LCB0aGlzLmlkKTtcclxuICAgIH1cclxufSIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gVGltZXIgY2xhc3MgbW9kdWxlXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHRoaXMubG9jYWxUaW1lID0gdGhpcy5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5GUFMgPSAzMC4wO1xyXG4gICAgICAgIHRoaXMucGF1c2VUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBnbG9iYWwgdGltZSBmdW50aW9uXHJcbiAgICBnZXRUaW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCB0ID1cclxuICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2V0IGN1cnJlbnQgRlBTIGZ1bmN0aW9uXHJcbiAgICBnZXRGUFMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRlBTLnRvRml4ZWQoMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VFbmJhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZURpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VTd2l0Y2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcG9uc2UgdGltZXIgZnVuY3Rpb25cclxuICAgIHJlc3BvbnNlKHRhZ19pZCA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXMuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbFRpbWUgPSB0O1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gdGhpcy5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxUaW1lID0gdCAtIHRoaXMucGF1c2VUaW1lIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlcisrO1xyXG4gICAgICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xyXG4gICAgICAgICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ19pZCkuaW5uZXJIVE1MID0gdGhpcy5nZXRGUFMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IHQ7XHJcbiAgICB9O1xyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzIuanNcIlxyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtLCB0ZXgpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLm5vcm0gPSBub3JtO1xyXG4gICAgICAgIHRoaXMudGV4ID0gdGV4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICBpZiAodGV4ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB2ZWMyKDApKTtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0sIHRleCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgIGxldCBpO1xyXG5cclxuICAgIC8qIFNldCBhbGwgdmVydGV4IG5vcm1hbHMgdG8gemVybyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZWMzKDApO1xyXG5cclxuICAgIC8qIEV2YWwgbm9ybWFsIGZvciBldmVyeSBmYWNldCAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGluZGljaWVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG4wID0gaW5kaWNpZXNbaV0sIG4xID0gaW5kaWNpZXNbaSArIDFdLCBuMiA9IGluZGljaWVzW2kgKyAyXTtcclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgcDAgPSB2ZXJ0ZXhlc1tuMF0ucG9zLFxyXG4gICAgICAgICAgICBwMSA9IHZlcnRleGVzW24xXS5wb3MsXHJcbiAgICAgICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvcyxcclxuICAgICAgICAgICAgTiA9IHAxLnN1YihwMCkuY3Jvc3MocDIuc3ViKHAwKSkubm9ybSgpO1xyXG5cclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybSA9IHZlcnRleGVzW24wXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybSA9IHZlcnRleGVzW24xXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMl0ubm9ybSA9IHZlcnRleGVzW24yXS5ub3JtLmFkZChOKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBOb3JtYWxpemUgYWxsIHZlcnRleCBub3JtYWxzICovXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVydGV4ZXNbaV0ubm9ybS5ub3JtKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmltIHtcclxuICAgIGNyZWF0ZShzaGQsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIGxldCB0cmltYXNoID0gW10sIGkgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gWy4uLnZlcnRleGVzXTtcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gWy4uLmluZGljaWVzXTtcclxuICAgICAgICB0aGlzLnNoZCA9IHNoZDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBzaGQucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICB0aGlzLnZlcnRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NMb2MgIT0gLTEgJiYgdGhpcy5ub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQucG9zTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDApO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLm5vcm1Mb2MsIDMsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMTIpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5ub3JtTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC50ZXhMb2MsIDIsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMjQpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC50ZXhMb2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5JbmRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXIoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQzMkFycmF5KGluZGljaWVzKSwgc2hkLnJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIHRoaXMubnVtT2ZFbGVtZW50cyA9IGluZGljaWVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtdGwsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbWF0NCgxKTtcclxuICAgICAgICBpZiAoaW5kaWNpZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXRsID0gbXRsO1xyXG4gICAgICAgICAgICB0aGlzLnNoZCA9IG10bC5zaGQ7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbU9iaihtdGwsIHZlcnRleGVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUobXRsLnNoZCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXRsLlRyYW5zICE9IDEuMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQudHJhbnNwYXJlbnRzLnB1c2goeyBwcmltOiB0aGlzLCB3b3JsZDogd29ybGQgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVjcmVhdGluZyBwcmltaXRpdmUgaWYgaXQgd2Fzbid0IGNyZWF0ZWRcclxuICAgICAgICAvLyAoYmVjYXVzZSBvZiBzaGFkZXIgYXN5bmMgaW5pdGlhbGl6YXRpb24pXHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhd2luZyBwcmltaXRpdmUgaWYgc2hhZGVyIGlzIGxvYWRlZFxyXG4gICAgICAgIGlmICh0aGlzLm10bC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5wcmltVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KHRoaXMudHJhbnNmb3JtLm11bCh3b3JsZCkubGluZWFyaXplKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy5zaGQucm5kLmdsLlRSSUFOR0xFUywgdGhpcy5udW1PZkVsZW1lbnRzLCB0aGlzLnNoZC5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTm93KHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdGwuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQucHJpbVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLnRyYW5zZm9ybS5tdWwod29ybGQpLmxpbmVhcml6ZSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5zaGQucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLkluZGV4QnVmZmVySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuc2hkLnJuZC5nbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtZW50cywgdGhpcy5zaGQucm5kLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZyb21PYmoobXRsLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIGxldCB2dHggPSBbXTtcclxuICAgICAgICBsZXQgZmlsZSA9IGF3YWl0IGZldGNoKGBiaW4vbW9kZWxzLyR7ZmlsZU5hbWV9Lm9iamApO1xyXG4gICAgICAgIGxldCBzcmMgPSBhd2FpdCBmaWxlLnRleHQoKTtcclxuICAgICAgICBsZXQgbGluZXMgPSBzcmMuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVbMF0gPT0gJ3YnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rcyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva3NbaV0gPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB2LnB1c2gocGFyc2VGbG9hdCh0b2tzW2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdnR4LnB1c2godmVjMyh2WzBdLCB2WzFdLCB2WzJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVydGV4KHZlYzModlswXSwgdlsxXSwgdlsyXSkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lWzBdID09ICdmJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMTsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdmVydGV4KHZ0eFtwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNpZXMucHVzaChwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnZlcnRleGVzLnB1c2godik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2goaSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tIFwiLi9idWYuanNcIlxyXG5pbXBvcnQgeyBQcmltIH0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5cclxuLy8gQ2xhc3MgZm9yIGhvbGRpbmcgbWF0ZXJpYWwgcHJvcGVydGllcyBvZiBwcmltaXRpdmUuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaGQsIEthLCBLZCwgS3MsIFBoLCBUcmFucykge1xyXG4gICAgICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgICAgIHRoaXMuS2EgPSBLYTtcclxuICAgICAgICB0aGlzLktkID0gS2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgICAgIHRoaXMuUGggPSBQaDtcclxuICAgICAgICB0aGlzLlRyYW5zID0gVHJhbnM7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlcyA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuXHJcbiAgICAgICAgdGhpcy5VQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLnNoZC5ybmQsIFwidV9tYXRlcmlhbFwiLCAxNiAqIDQsIDMpO1xyXG4gICAgICAgIC8vdGhpcy5VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IHRleF9mbGFncyA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuS2EubGluZWFyaXplKCkuY29uY2F0KFswXSwgdGhpcy5LZC5saW5lYXJpemUoKSwgW3RoaXMuVHJhbnNdLCB0aGlzLktzLmxpbmVhcml6ZSgpLCBbdGhpcy5QaF0pXHJcblxyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgNDsgdCsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1t0XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGV4X2ZsYWdzW3RdID0gMTtcclxuXHJcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRleF9mbGFncyk7XHJcblxyXG4gICAgICAgIHRoaXMuVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGQuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLlVCTy5hcHBseSh0aGlzLnNoZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbdF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVzW3RdLmFwcGx5KHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaFRleHR1cmUodGV4dHVyZSwgbnVtKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IDMgfHwgbnVtIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHR1cmVzW251bV0gPSB0ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1ByaW1pdGl2ZSh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByaW0odGhpcywgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufTtcclxuXHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vbXRsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuICBjb25zdHJ1Y3RvcihybmQsIG5hbWUpIHtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucHJnID0gbnVsbDtcclxuICAgIHRoaXMudG1wU291cnNlID0geyB2ZXJ0OiBudWxsLCBmcmFnOiBudWxsIH07XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfaW5pdCgpIHtcclxuICAgIHRoaXMuc2hhZGVycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICAgIG5hbWU6IFwiZnJhZ1wiLFxyXG4gICAgICAgIHNyYzogXCJcIixcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zaGFkZXJzKSB7XHJcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke3RoaXMubmFtZX0vJHtzLm5hbWV9Lmdsc2xgKTtcclxuICAgICAgbGV0IHNyYyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIikgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkge1xyXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcmcgPSB0aGlzLnJuZC5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICBpZiAocy5pZCAhPSBudWxsKSB0aGlzLnJuZC5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcmcsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcmcpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdLCBcInZlcnRcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1widmVydFwiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdLCBcImZyYWdcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1wiZnJhZ1wiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICB0aGlzLnBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICB0aGlzLm5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJbk5vcm1hbFwiKTtcclxuICAgIHRoaXMudGV4TG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5UZXhDb29yZFwiKTtcclxuXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKFxyXG4gICAgICB0aGlzLnByZyxcclxuICAgICAgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1TXHJcbiAgICApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcmcsIGkpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXHJcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIoXHJcbiAgICAgIHRoaXMucHJnLFxyXG4gICAgICB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1NcclxuICAgICk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybUJsb2NrczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGJsb2NrX25hbWUgPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMucHJnLCBpKTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtQmxvY2tJbmRleCh0aGlzLnByZywgYmxvY2tfbmFtZSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICBzaXplOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIoXHJcbiAgICAgICAgICB0aGlzLnByZyxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkVcclxuICAgICAgICApLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcihcclxuICAgICAgICAgIHRoaXMucHJnLFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0JJTkRJTkdcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm5kLm1hdHJpeFVCTy5hcHBseSh0aGlzKTtcclxuICAgIHRoaXMucm5kLnByaW1VQk8uYXBwbHkodGhpcyk7XHJcbiAgICB0aGlzLnJuZC50aW1lVUJPLmFwcGx5KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICBpZiAodGhpcy5wcmcgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJuZC5nbC51c2VQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyB0eXBlOiBcInZlcnRcIiBvciBcImZyYWdcIlxyXG4gIHVwZGF0ZShzb3VyY2UsIHR5cGUpIHtcclxuICAgIGxldCBuO1xyXG4gICAgaWYgKHR5cGUgPT0gXCJ2ZXJ0XCIpIG4gPSAwO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcImZyYWdcIikgbiA9IDE7XHJcbiAgICBlbHNlIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFkZXJzW25dLmlkID09IG51bGwpIHtcclxuICAgICAgdGhpcy50bXBTb3Vyc2VbdHlwZV0gPSBzb3VyY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2UodGhpcy5zaGFkZXJzW25dLmlkLCBzb3VyY2UpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHRoaXMuc2hhZGVyc1tuXS5pZCk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXdNYXRlcmlhbChhbWJpZW50LCBkaWZmdXNlLCBzcGVjdWxhciwgcGhvbmcsIHRyYW5zKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdGVyaWFsKHRoaXMsIGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBwaG9uZywgdHJhbnMpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gcm5kLmdsO1xyXG5cclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnRleElkID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dElkKTtcclxuICAgICAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDE7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTtcclxuICAgICAgICBjb25zdCBib3JkZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XHJcbiAgICAgICAgY29uc3QgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKTsgLy8gb3BhcXVlIGJsdWVcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICBsZXZlbCxcclxuICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgc3JjRm9ybWF0LFxyXG4gICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICBwaXhlbCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY1R5cGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Bvd2VyT2YyKGltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKGltYWdlLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFllcywgaXQncyBhIHBvd2VyIG9mIDIuIEdlbmVyYXRlIG1pcHMuXHJcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vLCBpdCdzIG5vdCBhIHBvd2VyIG9mIDIuIFR1cm4gb2ZmIG1pcHMgYW5kIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCJcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkobnVtKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIG51bSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwiaW1wb3J0IHsgbWF0clJvdGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcikge1xyXG4gICAgICAgIHRoaXMuZm9yd2FyZCA9IHZlYzMoMCwgMCwgMSk7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IHZlYzMoMSwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy51cCA9IHZlYzMoMCwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHZlYzMoMjIsIDAsIDIyKTtcclxuICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IDMuMDtcclxuICAgICAgICB0aGlzLnNlbnNlID0gMC4wMDIyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIHRoaXMua2V5VGFiID0ge307XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBtYXQ0KDEpO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gMzAuMDtcclxuXHJcbiAgICAgICAgcmVuZGVyLmNhbnZhcy5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbnMgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93Lm9ua2V5ZG93biA9IGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDEwLjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSBcIktleUFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlBXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlEXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5RFwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5V1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleVdcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlTXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJTaGlmdExlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJTaGlmdExlZnRcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU3BhY2VcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3aW5kb3cub25rZXl1cCA9IGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleUFcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlEXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5RFwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlXXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5U1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleVNcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJTaGlmdExlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJTaGlmdExlZnRcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIlNwYWNlXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZvcndhcmQgPSB0aGlzLmZvcndhcmQubXVsbWF0cihtYXRyUm90YXRlKC1lLm1vdmVtZW50WCAqIHRoaXMuc2Vuc2UsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHRoaXMucmlnaHQubXVsbWF0cihtYXRyUm90YXRlKC1lLm1vdmVtZW50WCAqIHRoaXMuc2Vuc2UsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkID0gdGhpcy5mb3J3YXJkLm11bG1hdHIobWF0clJvdGF0ZShlLm1vdmVtZW50WSAqIHRoaXMuc2Vuc2UsIHRoaXMucmlnaHQpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm0ubXVsKG1hdHJSb3RhdGUoLWUubW92ZW1lbnRYICogdGhpcy5zZW5zZSwgdmVjMygwLCAxLCAwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtLm11bChtYXRyUm90YXRlKGUubW92ZW1lbnRZICogdGhpcy5zZW5zZSwgdGhpcy5yaWdodCkpO1xyXG4gICAgICAgICAgICAvL3RoaXMudXAgPSB0aGlzLnVwLm11bG1hdHIobWF0clJvdGF0ZShlLm1vdmVtZW50WSAqIHRoaXMuc2Vuc2UsIHRoaXMucmlnaHQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNwb25zZSgpIHtcclxuICAgICAgICAvLyB0aGlzLnZlbG9jaXR5IC09IHRoaXMuYWNjZWxlcmF0aW9uICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIC8vIHRoaXMucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24ueSArIHRoaXMudmVsb2NpdHkgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgLy8gLyppZiAodGhpcy52ZWxvY2l0eSA8IDAgJiYgdGhpcy5wb3NpdGlvbi55ID49IDIuNSkge1xyXG4gICAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy52ZWxvY2l0eSA+IDAgJiYgdGhpcy5wb3NpdGlvbi55IDwgMi41KSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24ueSArIHRoaXMudmVsb2NpdHkgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgLy8gfSovXHJcbiAgICAgICAgLy8gaWYgKHRoaXMucG9zaXRpb24ueSA8IDIuNSlcclxuICAgICAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi55ID0gMi41O1xyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5rZXlUYWJbXCJLZXlBXCJdKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnJpZ2h0Lm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIC8vIH0gaWYgKHRoaXMua2V5VGFiW1wiS2V5RFwiXSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5zdWIodGhpcy5yaWdodC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICAvLyB9IGlmICh0aGlzLmtleVRhYltcIktleVdcIl0pIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHZlYzModGhpcy5mb3J3YXJkLngsIDAsIHRoaXMuZm9yd2FyZC56KS5ub3JtKCkubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgLy8gfSBpZiAodGhpcy5rZXlUYWJbXCJLZXlTXCJdKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLnN1Yih2ZWMzKHRoaXMuZm9yd2FyZC54LCAwLCB0aGlzLmZvcndhcmQueikubm9ybSgpLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIC8vIH0gaWYgKHRoaXMua2V5VGFiW1wiU2hpZnRMZWZ0XCJdKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLnN1Yih0aGlzLnVwLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIC8vIH0gaWYgKHRoaXMua2V5VGFiW1wiU3BhY2VcIl0pIHtcclxuICAgICAgICAvLyAgICAgLy90aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy51cC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIuc2V0Q2FtKHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuZm9yd2FyZCksIHRoaXMudXApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IHZlYzIgfSBmcm9tIFwiLi4vbXRoL3ZlYzIuanNcIlxyXG5pbXBvcnQgeyBtYXQ0LCBtYXRyRnJ1c3R1bSwgbWF0clZpZXcgfSBmcm9tIFwiLi4vbXRoL21hdDQuanNcIlxyXG5pbXBvcnQgeyBVbmlmb3JtQnVmZmVyIH0gZnJvbSBcIi4vcmVzL2J1Zi5qc1wiXHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSBcIi4uL3RpbWVyL3RpbWVyLmpzXCJcclxuaW1wb3J0IHsgU2hhZGVyIH0gZnJvbSBcIi4vcmVzL3NoZC5qc1wiXHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiLi9yZXMvdGV4LmpzXCJcclxuaW1wb3J0IHsgdmVydGV4IH0gZnJvbSBcIi4vcmVzL3ByaW0uanNcIlxyXG5pbXBvcnQgeyBDb250cm9sIH0gZnJvbSBcIi4uL2N0cmwvY3RybC5qc1wiXHJcblxyXG4vLyBHZW5lcmFsIGNsYXNzIGZvciByZW5kZXJpbmcuXHJcbi8vIE9uZSByZW5kZXIgcGVyIGNhbnZhcy5cclxuZXhwb3J0IGNsYXNzIFJlbmRlciB7XHJcbiAgICB0cmFuc3BhcmVudHMgPSBbXTtcclxuXHJcbiAgICBzZXRGcnVzdHVtKCkge1xyXG4gICAgICAgIGxldCBtID0gbWF0NCgxKTtcclxuICAgICAgICBsZXQgcnggPSB0aGlzLnByb2pTaXplLCByeSA9IHRoaXMucHJvalNpemU7XHJcblxyXG4gICAgICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXHJcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPj0gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHJ4ICo9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJ5ICo9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyUHJvaiA9IG1hdHJGcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLCB0aGlzLnByb2pEaXN0LCB0aGlzLmZhckNsaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbShsb2MsIGF0LCB1cCkge1xyXG4gICAgICAgIHRoaXMubWF0clZpZXcgPSBtYXRyVmlldyhsb2MsIGF0LCB1cCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXhlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1hdHJpeGVzKCkge1xyXG4gICAgICAgIGxldCByaWdodCA9IHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVswXVswXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzFdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMl1bMF1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCB1cCA9IHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVswXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzFdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMl1bMV0pO1xyXG4gICAgICAgIGxldCBkaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3LmFbMF1bMl0sXHJcbiAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3LmFbMV1bMl0sXHJcbiAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3LmFbMl1bMl0pO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMubWF0clByb2oubGluZWFyaXplKCkuY29uY2F0KHRoaXMubWF0clZpZXcubGluZWFyaXplKCkpO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChkaXIubGluZWFyaXplKCksIFswXSwgcmlnaHQubGluZWFyaXplKCksIFswXSwgdXAubGluZWFyaXplKCksIFswXSk7XHJcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KFt0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0LCB0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0XSk7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhVQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudGltZXIucmVzcG9uc2UoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2wucmVzcG9uc2UoKTtcclxuXHJcbiAgICAgICAgLy90aGlzLnRpbWVVQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoW3RoaXMudGltZXIubG9jYWxUaW1lLCB0aGlzLnRpbWVyLmxvY2FsRGVsdGFUaW1lLCB0aGlzLnRpbWVyLmdsb2JhbFRpbWUsIHRoaXMudGltZXIuZ2xvYmFsRGVsdGFUaW1lXSkpO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcclxuICAgICAgICAgICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwIG9mIHRoaXMudHJhbnNwYXJlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBwLnByaW0ucmVuZGVyTm93KHAud29ybGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2wuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgY2FtZXJhIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnByb2pTaXplID0gMC4yO1xyXG4gICAgICAgIHRoaXMucHJvakRpc3QgPSAwLjE7XHJcbiAgICAgICAgdGhpcy5mYXJDbGlwID0gMzAwO1xyXG5cclxuICAgICAgICAvLyBFdmFsdWF0aW5nIGNhbnZhcyBzaXplXHJcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDE5MjA7Ly9yZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0ICsgMTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDEwODA7Ly9yZWN0LmJvdHRvbSAtIHJlY3QudG9wICsgMTtcclxuXHJcbiAgICAgICAgLy8gR2V0dGluZyBHTCBjb250ZXh0XHJcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHtcclxuICAgICAgICAgICAgcHJlbXVsdGlwbGllZEFscGhhOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxwaGE6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuOSwgMC45LCAwLjksIDEpO1xyXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgICAgIC8vIENvbnRvbCBpbml0XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gbmV3IENvbnRyb2wodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBjYW1lcmFcclxuICAgICAgICB0aGlzLm1hdHJpeFVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9jYW1lcmFcIiwgMTYgKiA0ICogMiArIDQgKiAxNiwgMCk7XHJcbiAgICAgICAgdGhpcy5zZXRGcnVzdHVtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYW0odmVjMygwLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4ZXMoKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHByaW0gdWJvXHJcbiAgICAgICAgdGhpcy5wcmltVUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X3ByaW1pdGl2ZVwiLCAxNiAqIDQsIDEpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgdGltZXJcclxuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lVUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X3RpbWVcIiwgMTYsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1NoYWRlcihmaWxlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2hhZGVyKHRoaXMsIGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdUZXh0dXJlKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0dXJlKHRoaXMsIGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdVbmlmb3JtQnVmZmVyKGJ1ZmZlck5hbWUsIGJ1ZmZlclNpemUsIGJpbmRpbmcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgYnVmZmVyTmFtZSwgYnVmZmVyU2l6ZSwgYmluZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3U2t5U3BoZXJlKHRleE5hbWUpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0ZXhlcyA9IFt2ZXJ0ZXgodmVjMygtMSwgLTEsIDAuOTk5KSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKC0xLCAzLCAwLjk5OSksIHZlYzMoMCkpLCB2ZXJ0ZXgodmVjMygzLCAtMSwgMC45OTkpLCB2ZWMzKDApKV07XHJcbiAgICAgICAgY29uc3QgaW5kaWNpZXMgPSBbMCwgMSwgMl07XHJcbiAgICAgICAgY29uc3Qgc2hkID0gdGhpcy5uZXdTaGFkZXIoXCJza3kgc3BoZXJlXCIpO1xyXG4gICAgICAgIGNvbnN0IG10bCA9IHNoZC5uZXdNYXRlcmlhbCh2ZWMzKDApLCB2ZWMzKDApLCB2ZWMzKDApLCAwLCAxLjApO1xyXG4gICAgICAgIGNvbnN0IHRleCA9IHRoaXMubmV3VGV4dHVyZSh0ZXhOYW1lKTtcclxuICAgICAgICBtdGwuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gICAgICAgIHJldHVybiBtdGwubmV3UHJpbWl0aXZlKHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFByaW0sIHZlcnRleCB9IGZyb20gXCIuLi9ybmQvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL210aC92ZWMyLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlndXJlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdWJlKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gZnJvbnRcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpXSwgICAgICAvLyBiYWNrXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgLTAuNSldLCAgLy8gbGVmdFxyXG4gICAgICAgICAgICBbdmVjMygwLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgLTAuNSldLCAgLy8gYm90dG9tXHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIDAuNSwgLTAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KV0sICAgICAgLy8gdG9wXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnRleENvb3JkcyA9IFtcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRldHJhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCBzcXJ0MyA9IE1hdGguc3FydCgzLjApLCBzcXJ0MiA9IE1hdGguc3FydCgyLjApO1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCBzcXJ0MiAvIHNxcnQzLCAwKSxcclxuICAgICAgICAgICAgZnJvbnQgPSB2ZWMzKDAsIDAsIHNxcnQzIC8gMy4wKSxcclxuICAgICAgICAgICAgbGVmdCA9IHZlYzMoLTAuNSwgMCwgLXNxcnQzIC8gNi4wKSxcclxuICAgICAgICAgICAgcmlnaHQgPSB2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNi4wKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2xlZnQsIGZyb250LCB0b3BdLCAvLyBib3RcclxuICAgICAgICAgICAgW2xlZnQsIHJpZ2h0LCB0b3BdLFxyXG4gICAgICAgICAgICBbcmlnaHQsIGZyb250LCB0b3BdLFxyXG4gICAgICAgICAgICBbZnJvbnQsIHJpZ2h0LCBsZWZ0XVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T2N0YWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgMSAvIHNxcnQyLCAwKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSksXHJcbiAgICAgICAgICAgIGxmID0gdmVjMygtMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICBsYiA9IHZlYzMoLTAuNSwgMCwgLTAuNSksXHJcbiAgICAgICAgICAgIHJmID0gdmVjMygwLjUsIDAsIDAuNSksXHJcbiAgICAgICAgICAgIHJiID0gdmVjMygwLjUsIDAsIC0wLjUpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbYm90LCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbYm90LCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbYm90LCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbYm90LCByZiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgcmZdLFxyXG4gICAgICAgICAgICBbdG9wLCBsZiwgbGJdLFxyXG4gICAgICAgICAgICBbdG9wLCBsYiwgcmJdLFxyXG4gICAgICAgICAgICBbdG9wLCByZiwgcmJdLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SWNvaGVkcm9uKCkge1xyXG5cclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgciA9IDAuNSAvIE1hdGguc2luKDM2IC8gMTgwICogTWF0aC5QSSk7XHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoMSAtIE1hdGgucG93KDIgKiBNYXRoLnNpbigwLjEgKiBNYXRoLlBJKSAqIHIsIDIpKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSA3Mikge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgLWQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gKGkgKyAzNikgLyAxODAuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMyhyICogTWF0aC5zaW4oYW5nbGUpLCByICogTWF0aC5jb3MoYW5nbGUpLCBkIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjIucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDAsIHIpLFxyXG4gICAgICAgICAgICBib3QgPSB0b3AubXVsKC0xKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyaTEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godHJpMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcDEgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGJvdCwgbGF5ZXIxW2ldLCBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goY2FwMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAyID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB0b3AsIGxheWVyMltpXSwgbGF5ZXIyWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RG9kZWNhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCByID0gTWF0aC5zcXJ0KDUwICsgMTAgKiBNYXRoLnNxcnQoNSkpIC8gMTA7XHJcbiAgICAgICAgbGV0IFIgPSAwLjI1ICogKDEgKyBNYXRoLnNxcnQoNSkpICogTWF0aC5zcXJ0KDMpO1xyXG4gICAgICAgIGxldCByMCA9IHIgKiAyICogTWF0aC5jb3MoKDM2IC8gMTgwICogTWF0aC5QSSkpO1xyXG5cclxuICAgICAgICBsZXQgZWRnZTEgPSBbXTtcclxuICAgICAgICBsZXQgZWRnZTIgPSBbXTtcclxuICAgICAgICBsZXQgbGF5ZXIxID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMiA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgZCA9IE1hdGguc3FydChSICogUiAtIHIgKiByKTtcclxuICAgICAgICBsZXQgZDAgPSBNYXRoLnNxcnQoUiAqIFIgLSByMCAqIHIwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgICAgICBhMSA9IGkgLyAxODAgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICAgICAgYTIgPSAoaSArIDM2KSAvIDE4MCAqIE1hdGguUEk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcDEgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMSksIHIgKiBNYXRoLmNvcyhhMSksIGQpO1xyXG4gICAgICAgICAgICBsZXQgcDIgPSB2ZWMzKHIgKiBNYXRoLnNpbihhMiksIHIgKiBNYXRoLmNvcyhhMiksIC1kKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsMSA9IHZlYzMocjAgKiBNYXRoLnNpbihhMSksIHIwICogTWF0aC5jb3MoYTEpLCBkMCk7XHJcbiAgICAgICAgICAgIGxldCBsMiA9IHZlYzMocjAgKiBNYXRoLnNpbihhMiksIHIwICogTWF0aC5jb3MoYTIpLCAtZDApO1xyXG5cclxuICAgICAgICAgICAgZWRnZTEucHVzaChwMSk7XHJcbiAgICAgICAgICAgIGVkZ2UyLnB1c2gocDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIxLnB1c2gobDEpO1xyXG4gICAgICAgICAgICBsYXllcjIucHVzaChsMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTEpO1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChlZGdlMik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMSA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxWyhpICsgMSkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIGxldCBzdXJmYWNlMiA9IFtcclxuICAgICAgICAgICAgICAgIGVkZ2UyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIyWyhpICsgNCkgJSA1XSxcclxuICAgICAgICAgICAgICAgIGVkZ2UyWyhpICsgNCkgJSA1XVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMSk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChzdXJmYWNlMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy52ZXJ0ZXhlcyA9IFtlZGdlMSwgbGF5ZXIxLCBsYXllcjIsIGVkZ2UyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFyKCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNldERvZGVjYWhlZHJvbigpO1xyXG5cclxuICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMygwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy52ZXJ0ZXhlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgcCA9IHAuYWRkKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAgPSBwLmRpdig1KTtcclxuICAgICAgICAgICAgcCA9IHAubXVsKDMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyaXMgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzBdLCB0aGlzLnZlcnRleGVzW2ldWzFdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgdGhpcy52ZXJ0ZXhlc1tpXVsyXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMl0sIHRoaXMudmVydGV4ZXNbaV1bM10sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzNdLCB0aGlzLnZlcnRleGVzW2ldWzRdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgdGhpcy52ZXJ0ZXhlc1tpXVswXSwgcF0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcclxuICAgICAgICAgICAgICAgIHZlcnRzLnB1c2godHJpc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gdmVydHM7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVByaW0obXRsKSB7XHJcbiAgICAgICAgbGV0IGluZGljaWVzID0gW107XHJcbiAgICAgICAgbGV0IHZlcnRleGVzID0gW107XHJcbiAgICAgICAgbGV0IGogPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHRoaXMudmVydGV4ZXMubGVuZ3RoOyBlKyspIHtcclxuICAgICAgICAgICAgbGV0IGVkZ2UgPSB0aGlzLnZlcnRleGVzW2VdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4Q29vcmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBpbiBlZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgoZWRnZVt2XSwgdmVjMygwKSwgdGhpcy50ZXhDb29yZHNbZV1bdl0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgaW4gZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KGVkZ2Vbdl0sIHZlYzMoMCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBlZGdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyAwKTtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIGkgLSAxKTtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGogKz0gZWRnZS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByaW0obXRsLCB2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgbWF0NCwgbWF0clRyYW5zbGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi4vcGxhdC9wbGF0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb29tIHtcclxuICBjb25zdHJ1Y3RvcihyZW5kZXIsIGZpbGVOYW1lKSB7XHJcbiAgICB0aGlzLm1hcDtcclxuICAgIHRoaXMuYmxvY2tzID0gW107XHJcblxyXG4gICAgdGhpcy5zaGFkZXIgPSByZW5kZXIubmV3U2hhZGVyKFwiZGVmYXVsdFwiKTtcclxuICAgIHRoaXMubXRsID0gdGhpcy5zaGFkZXIubmV3TWF0ZXJpYWwoXHJcbiAgICAgIHZlYzMoMC4xKSxcclxuICAgICAgdmVjMygxLCAwLjUsIDEuMCksXHJcbiAgICAgIHZlYzMoMC4zKSxcclxuICAgICAgOTAsXHJcbiAgICAgIDEuMFxyXG4gICAgKTtcclxuICAgIHRoaXMudGV4ID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy93YWxscGFwZXIucG5nIFwiKTtcclxuICAgIHRoaXMubXRsLmF0dGFjaFRleHR1cmUodGhpcy50ZXgsIDApO1xyXG4gICAgdGhpcy5tdGwudXBkYXRlKCk7XHJcbiAgICB0aGlzLm10bDEgPSB0aGlzLnNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgICAgdmVjMygwLjEpLFxyXG4gICAgICB2ZWMzKDEsIDAuNSwgMS4wKSxcclxuICAgICAgdmVjMygwLjMpLFxyXG4gICAgICA5MCxcclxuICAgICAgMS4wXHJcbiAgICApO1xyXG4gICAgdGhpcy50ZXgxID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9wLnBuZ1wiKTtcclxuICAgIHRoaXMubXRsMS5hdHRhY2hUZXh0dXJlKHRoaXMudGV4MSwgMCk7XHJcbiAgICB0aGlzLm10bDEudXBkYXRlKCk7XHJcbiAgICB0aGlzLm10bENhaWwgPSB0aGlzLnNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgICAgdmVjMygwLjEpLFxyXG4gICAgICB2ZWMzKDEsIDAuNSwgMS4wKSxcclxuICAgICAgdmVjMygwLjMpLFxyXG4gICAgICA5MCxcclxuICAgICAgMS4wXHJcbiAgICApO1xyXG4gICAgdGhpcy50ZXhDYWlsID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9jYWlsLnBuZ1wiKTtcclxuICAgIHRoaXMubXRsQ2FpbC5hdHRhY2hUZXh0dXJlKHRoaXMudGV4Q2FpbCwgMCk7XHJcbiAgICB0aGlzLm10bENhaWwudXBkYXRlKCk7XHJcblxyXG4gICAgbGV0IGZjdWJlID0gbmV3IEZpZ3VyZSgpO1xyXG4gICAgZmN1YmUuc2V0Q3ViZSgpO1xyXG4gICAgdGhpcy5jdWJlID0gZmN1YmUubWFrZVByaW0odGhpcy5tdGwpO1xyXG4gICAgdGhpcy5jdWJlRmxvb3IgPSBmY3ViZS5tYWtlUHJpbSh0aGlzLm10bDEpO1xyXG4gICAgdGhpcy5jdWJlQ2FpbCA9IGZjdWJlLm1ha2VQcmltKHRoaXMubXRsQ2FpbCk7XHJcbiAgICB0aGlzLm1hcCA9IG51bGw7XHJcbiAgICB0aGlzLmltYWdlID0gbnVsbDtcclxuICAgIEppbXAucmVhZChmaWxlTmFtZSwgKGVyciwgaW1hZ2UpID0+IHtcclxuICAgICAgdGhpcy5tYXAgPSBpbWFnZS5iaXRtYXAuZGF0YTtcclxuICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJlbmRlcih3b3JsZCkge1xyXG4gICAgaWYgKHRoaXMubWFwID09IG51bGwpIHJldHVybjtcclxuICAgIGZvciAobGV0IGJsb2NrIG9mIHRoaXMuYmxvY2tzKSB7XHJcbiAgICAgIGJsb2NrLnJlbmRlcihtYXQ0KDEpKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5KyspXHJcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHgrKykge1xyXG4gICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuXHJcbiAgICAgICAgaWYgKGMuciA9PSAyNTUpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKHgsIGksIHkpKS5tdWwod29ybGQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGMuYiA9PSAyNTUpIHtcclxuICAgICAgICAgIHRoaXMuY3ViZUZsb29yLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoeCwgMCwgeSkpLm11bCh3b3JsZCkpO1xyXG4gICAgICAgICAgdGhpcy5jdWJlQ2FpbC5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKHgsIDUsIHkpKS5tdWwod29ybGQpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHB1dFBpeGVsKHgsIHksIGMpIHtcclxuICAgIHRoaXMuaW1hZ2Uuc2V0UGl4ZWxDb2xvcih4LCB5LCBjKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbWdUb0NvbnRleHQyZChjYW52YXMsIGNvbnRleHQsIGltYWdlKSB7XHJcbiAgbGV0IGZyYWN3ID0gTWF0aC5mbG9vcihjYW52YXMud2lkdGggLyBpbWFnZS5iaXRtYXAud2lkdGgpO1xyXG4gIGxldCBmcmFjaCA9IE1hdGguZmxvb3IoY2FudmFzLmhlaWdodCAvIGltYWdlLmJpdG1hcC5oZWlnaHQpO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgaW1hZ2UuYml0bWFwLmhlaWdodDsgeSsrKVxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBpbWFnZS5iaXRtYXAud2lkdGg7IHgrKykge1xyXG4gICAgICBsZXQgYyA9IEppbXAuaW50VG9SR0JBKGltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7Yy5yfSwgJHtjLmd9LCAke2MuYn0sIDEuMClgO1xyXG4gICAgICBjb250ZXh0LmZpbGxSZWN0KHggKiBmcmFjdywgeSAqIGZyYWNoLCBmcmFjdywgZnJhY2gpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZpZ3VyZSB9IGZyb20gXCIuL3BsYXQvcGxhdFwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzNcIjtcclxuXHJcbmNvbnN0IGhvc3QgPSBcImxvY2FsaG9zdFwiO1xyXG5jb25zdCBwb3J0ID0gXCI4MDAwXCI7XHJcbmxldCB1c2VyTmFtZTtcclxubGV0IHBsYXllcnNQb29sID0ge307XHJcbmxldCBtYWluUmVuZGVyO1xyXG5sZXQgYXZhdGFycyA9IHt9O1xyXG5sZXQgc2hhZGVycyA9IHt9O1xyXG5sZXQgbWF0ZXJpYWxzID0ge307XHJcbmxldCBwcmltcyA9IHt9O1xyXG5sZXQgd2ViU29ja2V0O1xyXG5sZXQgdGV4O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdzSW5pdChyZW5kZXIpIHtcclxuICAgIHVzZXJOYW1lID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVcIik7XHJcblxyXG4gICAgbWFpblJlbmRlciA9IHJlbmRlcjtcclxuICAgIGxldCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KGB3czovLyR7aG9zdH06JHtwb3J0fWApO1xyXG4gICAgd2ViU29ja2V0ID0gc29ja2V0O1xyXG5cclxuICAgIHRleCA9IHJlbmRlci5uZXdUZXh0dXJlKFwiLi9iaW4vdGV4dHVyZXMvZW0uanBnXCIpO1xyXG5cclxuICAgIHNvY2tldC5vbm9wZW4gPSBlID0+IG9uQ29ubmVjdGlvbihzb2NrZXQsIGUpO1xyXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IGUgPT4gb25NZXNzYWdlKHNvY2tldCwgSlNPTi5wYXJzZShlLmRhdGEpKTtcclxuICAgIHNldEludGVydmFsKCgpID0+IG9uSW50ZXJ2YWwoc29ja2V0KSwgMSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvbkNvbm5lY3Rpb24oc29ja2V0LCBtKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvIGZyb20gY2xpZW50XCIpO1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcImNvbm5lY3RlZFwiIH0pKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25NZXNzYWdlKHNvY2tldCwgbSkge1xyXG4gICAgaWYgKG0udHlwZSA9PSBcInBsYXllcnNcIikge1xyXG4gICAgICAgIHBsYXllcnNQb29sID0gbS5wbGF5ZXJzO1xyXG4gICAgICAgIGZvciAobGV0IHAgaW4gbS5wbGF5ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChhdmF0YXJzW3BdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3RlcCAxOiBIYXNoIHlvdXIgZW1haWwgYWRkcmVzcyB1c2luZyBTSEEtMjU2LlxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzaGVkRW1haWwgPSBDcnlwdG9KUy5TSEEyNTYobS5wbGF5ZXJzW3BdLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMjogQ29uc3RydWN0IHRoZSBHcmF2YXRhciBVUkwuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmF2YXRhclVybCA9IGBodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaGVkRW1haWx9YDtcclxuICAgICAgICAgICAgICAgIGF2YXRhcnNbcF0gPSBtYWluUmVuZGVyLm5ld1RleHR1cmUoYGh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvJHtoYXNoZWRFbWFpbH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2hhZGVyc1twXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNoYWRlcnNbcF0gPSBtYWluUmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaW1zW3BdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2hhZGVyc1twXSA9IG1haW5SZW5kZXIubmV3U2hhZGVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc1twXSA9IHNoYWRlcnNbcF0ubmV3TWF0ZXJpYWwodmVjMygwLjEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzMoMSwgMC4xLCAwLjEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzMoMC4zKSxcclxuICAgICAgICAgICAgICAgICAgICA5MCxcclxuICAgICAgICAgICAgICAgICAgICAxLjBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNbcF0uYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzW3BdLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlnID0gbmV3IEZpZ3VyZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlnLnNldEN1YmUoKTtcclxuICAgICAgICAgICAgICAgIHByaW1zW3BdID0gZmlnLm1ha2VQcmltKG1hdGVyaWFsc1twXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobS50eXBlID09IFwic2hhZGVyXCIpIHtcclxuICAgICAgICAvKmlmIChzaGFkZXJzW20uaWRdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzaGFkZXJzW20uaWRdID0gbWFpblJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHByaW1zW20uaWRdLm10bC5zaGQudXBkYXRlKG0uc291cmNlLCBcImZyYWdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkludGVydmFsKHNvY2tldCkge1xyXG4gICAgLy8gU2VuZGluZyBjb29yZHMgdG8gdGhlIHNlcnZlclxyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcImNvb3Jkc1wiLCBpZDogdXNlck5hbWUsIGNvb3JkczogeyB0cmFuczogbWFpblJlbmRlci5jb250cm9sLnRyYW5zZm9ybSwgcG9zOiBtYWluUmVuZGVyLmNvbnRyb2wucG9zaXRpb24gfSB9KSk7XHJcbiAgICAvLyBBc2tpbmcgZm9yIGdldHRpbmcgY29vcmRzIGZyb20gc2VydmVyXHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IHR5cGU6IFwiZ2V0X2Nvb3Jkc1wiIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllcnMoKSB7XHJcbiAgICByZXR1cm4geyBwbGF5ZXJzOiBwbGF5ZXJzUG9vbCwgaWQ6IHVzZXJOYW1lLCBhdmF0YXJzOiBhdmF0YXJzLCBwcmltczogcHJpbXMgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRPYmplY3Qob2JqZWN0KSB7XHJcbiAgICBvYmplY3QuaWQgPSB1c2VyTmFtZTtcclxuICAgIHdlYlNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xyXG59IiwiaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzXCI7XHJcbmltcG9ydCB7IFJvb20gfSBmcm9tIFwiLi9nZW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMYWJpcmludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZW5kZXIsIGZpbGVOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5yb29tcyA9IFtcclxuICAgICAgICAgICAgbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL3Jvb20xLnBuZ1wiKSxcclxuICAgICAgICAgICAgbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL3Jvb20yLnBuZ1wiKSxcclxuICAgICAgICAgICAgbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL3Jvb20zLnBuZ1wiKVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy52ZXJ0ID0gW25ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy92ZXJ0LnBuZ1wiKV07XHJcbiAgICAgICAgdGhpcy5ob3J6ID0gW25ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9ob3J6LnBuZ1wiKV07XHJcbiAgICAgICAgdGhpcy5lbmQgPSBbbmV3IFJvb20ocmVuZGVyLCBcIi4vYmluL3Jvb21zL2VuZC5wbmdcIildO1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG51bGw7XHJcbiAgICAgICAgSmltcC5yZWFkKGZpbGVOYW1lLCAoZXJyLCBpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gaW1hZ2UuYml0bWFwLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJuZCA9IHJlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2UG9zID0gdmVjMyh0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5ybmQuY29udHJvbC52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMucm5kLmNvbnRyb2wuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnJuZC5jb250cm9sLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnJuZC5jb250cm9sLnZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMua2V5VGFiID0gdGhpcy5ybmQuY29udHJvbC5rZXlUYWI7XHJcbiAgICAgICAgdGhpcy5mb3J3YXJkID0gdGhpcy5ybmQuY29udHJvbC5mb3J3YXJkO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLnJuZC5jb250cm9sLnJpZ2h0O1xyXG4gICAgICAgIHRoaXMudXAgPSB0aGlzLnJuZC5jb250cm9sLnVwO1xyXG4gICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5ybmQuY29udHJvbC5tb3ZlU3BlZWQ7XHJcblxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgLT0gdGhpcy5hY2NlbGVyYXRpb24gKiB0aGlzLnJuZC50aW1lci5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eSAqIHRoaXMucm5kLnRpbWVyLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55IDwgMi41KVxyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAyLjU7XHJcbiAgICAgICAgdGhpcy5ybmQuY29udHJvbC52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5ybmQuY29udHJvbC5hY2NlbGVyYXRpb24gPSB0aGlzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLnJuZC5jb250cm9sLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmtleVRhYltcIktleUFcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMucmlnaHQubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5ybmQudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJLZXlEXCJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLnN1Yih0aGlzLnJpZ2h0Lm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucm5kLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH0gaWYgKHRoaXMua2V5VGFiW1wiS2V5V1wiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodmVjMyh0aGlzLmZvcndhcmQueCwgMCwgdGhpcy5mb3J3YXJkLnopLm5vcm0oKS5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJuZC50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIktleVNcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHZlYzModGhpcy5mb3J3YXJkLngsIDAsIHRoaXMuZm9yd2FyZC56KS5ub3JtKCkubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5ybmQudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJTaGlmdExlZnRcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHRoaXMudXAubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5ybmQudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJTcGFjZVwiXSkge1xyXG4gICAgICAgICAgICAvL3RoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnVwLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgeHogPSB0aGlzLnJuZC5jb250cm9sLnBvc2l0aW9uLmRpdigxMCk7XHJcbiAgICAgICAgICAgIHh6ID0gdmVjMyhNYXRoLmZsb29yKHh6LngpLCAwLjUsIE1hdGguZmxvb3IoeHoueikpO1xyXG4gICAgICAgICAgICBsZXQgeHoxMCA9IHZlYzMoeHopO1xyXG4gICAgICAgICAgICB4ejEwLnggPSBNYXRoLmZsb29yKDAuNSArIHRoaXMucG9zaXRpb24ueCkgJSAxMDtcclxuICAgICAgICAgICAgeHoxMC56ID0gTWF0aC5mbG9vcigwLjUgKyB0aGlzLnBvc2l0aW9uLnopICUgMTA7XHJcbiAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHh6LngsIHh6LnopKTtcclxuICAgICAgICAgICAgbGV0IHJvb207XHJcbiAgICAgICAgICAgIGlmICh4ei54ICUgMiA9PSAwICYmIHh6LnogJSAyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnZlcnRbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeHoueCAlIDIgIT0gMCAmJiB4ei56ICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5ob3J6WzBdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMuciA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMuZyA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMuYiA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zWzJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAocm9vbSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXMgPSBKaW1wLmludFRvUkdCQShyb29tLmltYWdlLmdldFBpeGVsQ29sb3IoeHoxMC54LCB4ejEwLnopKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMgPT0gdW5kZWZpbmVkIHx8ICEocmVzLnIgPT0gMjU1ICYmIHJlcy5iID09IDI1NSAmJiByZXMuZyA9PSAyNTUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJuZC5jb250cm9sLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBuID0gdmVjMyhNYXRoLmZsb29yKHRoaXMucHJldlBvcy54ICsgMC41KSwgMCwgTWF0aC5mbG9vcih0aGlzLnByZXZQb3MueiArIDAuNSkpLnN1YihcclxuICAgICAgICAgICAgICAgIC8vICAgICB2ZWMzKE1hdGguZmxvb3IodGhpcy5wb3NpdGlvbi54ICsgMC41KSwgMCwgTWF0aC5mbG9vcih0aGlzLnBvc2l0aW9uLnogKyAwLjUpKVxyXG4gICAgICAgICAgICAgICAgLy8gKS5ub3JtKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChuLnogPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMucm5kLmNvbnRyb2wucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb24uejtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAobi54ID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnJuZC5jb250cm9sLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdGhpcy5ybmQuY29udHJvbC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5ICs9IDIpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHggKz0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuciA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuZyA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzFdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuYiA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzJdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMTI4ICYmIGMuZyA9PSAxMjggJiYgYy5iID09IDEyOClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFswXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYy5yID09IDI1NSAmJiBjLmcgPT0gMjU1ICYmIGMuYiA9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0WzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMTI4ICYmIGMuZyA9PSAxMjggJiYgYy5iID09IDEyOClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFswXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYy5yID09IDI1NSAmJiBjLmcgPT0gMjU1ICYmIGMuYiA9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3J6WzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IHNlbmRPYmplY3QgfSBmcm9tIFwiLi93c1wiO1xyXG5cclxubGV0IHRleHRBcmVhO1xyXG5sZXQgYnV0dG9uQXBwbHk7XHJcbmxldCBzaGFkZXI7XHJcbmxldCBjb2RlQXJlYTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFkZXJVcGRhdGVJbml0KF9zaGFkZXIpIHtcclxuICBjb2RlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29kZUFyZWFcIik7XHJcbiAgdGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRBcmVhXCIpO1xyXG4gIGJ1dHRvbkFwcGx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBseVwiKTtcclxuICBidXR0b25BcHBseS5vbmNsaWNrID0gb25BcHBseTtcclxuICBzaGFkZXIgPSBfc2hhZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkFwcGx5KCkge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHRleHRBcmVhLnZhbHVlO1xyXG4gIHNoYWRlci51cGRhdGUoc291cmNlLCBcImZyYWdcIik7XHJcbiAgc2VuZE9iamVjdCh7IHR5cGU6IFwic2hhZGVyXCIsIHNvdXJjZTogdGV4dEFyZWEudmFsdWUgfSk7XHJcbn1cclxuXHJcbmAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG5cclxub3V0IHZlYzQgT3V0Q29sb3I7XHJcblxyXG5pbiB2ZWMzIERyYXdQb3M7XHJcbmluIHZlYzMgRHJhd05vcm1hbDtcclxuaW4gdmVjMiBEcmF3VGV4Q29vcmQ7XHJcblxyXG51bmlmb3JtIHNhbXBsZXIyRCB1VGV4O1xyXG5cclxudW5pZm9ybSB1X21hdGVyaWFsIHtcclxuICAgIHZlYzQgS2E0O1xyXG4gICAgdmVjNCBLZFRyYW5zO1xyXG4gICAgdmVjNCBLc1BoO1xyXG4gICAgdmVjNCBUZXhGbGFncztcclxufTtcclxuXHJcbiNkZWZpbmUgS2EgS2E0Lnh5elxyXG4jZGVmaW5lIEtkIEtkVHJhbnMueHl6XHJcbiNkZWZpbmUgVHJhbnMgS2RUcmFucy53XHJcbiNkZWZpbmUgS3MgS3NQaC54eXpcclxuI2RlZmluZSBQaCBLc1BoLndcclxuXHJcbnVuaWZvcm0gZmxvYXQgVGltZTtcclxuXHJcbnZlYzIgQ21wbE11bENtcGwoIHZlYzIgQSwgdmVjMiBCIClcclxue1xyXG4gIHJldHVybiB2ZWMyKEEueCAqIEIueCAtIEEueSAqIEIueSwgQS54ICogQi55ICsgQS55ICogQi54KTtcclxufVxyXG5cclxudm9pZCBtYWluKHZvaWQpIHtcclxuICAgIGludCBuID0gMDsgIFxyXG4gICAgdmVjMiBaLCBaMDtcclxuXHJcbiAgICBaID0gKERyYXdUZXhDb29yZCAtIDAuNSkgKiAyLjA7XHJcbiAgICBaMCA9IFogKyBzaW4oVGltZSk7XHJcblxyXG4gICAgd2hpbGUgKG4gPCAyNTUgJiYgZG90KFosIFopIDwgNC4wKVxyXG4gICAge1xyXG4gICAgICBaID0gQ21wbE11bENtcGwoWiwgWik7IFxyXG4gICAgICBaID0gWiArIFowO1xyXG4gICAgICBuKys7XHJcbiAgICB9XHJcbiAgICB2ZWMzIGNvbG9yID0gdmVjMyh2ZWMzKHZlYzMoZmxvYXQobikgLyAyNTAuMCwgZmxvYXQobikgLyAyMzAuMCwgZmxvYXQobikgLyAyNDAuMCkpKTtcclxuICAgIE91dENvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcclxufWAiLCJpbXBvcnQgeyBtYXQ0LCBtYXRyVHJhbnNsYXRlLCBtYXRyUm90YXRlLCBtYXRyU2NhbGUgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9tdGgvdmVjMlwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ293cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihsYWIpIHtcclxuICAgICAgICB0aGlzLmxhYiA9IGxhYjtcclxuICAgICAgICB0aGlzLnBvc2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByeCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSAqIDIpICogMTAgKyAxMCAtIDUuNTtcclxuICAgICAgICAgICAgbGV0IHJ5ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICogMiArIDEpICogMTAgKyAxMCAtIDUuNTtcclxuICAgICAgICAgICAgdGhpcy5wb3Nlcy5wdXNoKHZlYzMocngsIDAsIHJ5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaGQgPSB0aGlzLmxhYi5ybmQubmV3U2hhZGVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICBsZXQgbXRsID0gc2hkLm5ld01hdGVyaWFsKFxyXG4gICAgICAgICAgICB2ZWMzKDAuMSksXHJcbiAgICAgICAgICAgIHZlYzMoMSwgMC44LCAwKSxcclxuICAgICAgICAgICAgdmVjMygwLjMpLFxyXG4gICAgICAgICAgICA5MCxcclxuICAgICAgICAgICAgMC41XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmNvdyA9IG10bC5uZXdQcmltaXRpdmUoXCJjb3dcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5wb3Nlcykge1xyXG4gICAgICAgICAgICBsZXQgZCA9IHRoaXMucG9zZXNbaV0uc3ViKHRoaXMubGFiLnJuZC5jb250cm9sLnBvc2l0aW9uKS5sZW4oKTtcclxuICAgICAgICAgICAgaWYgKGQgPCAzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcnggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkgKiAyKSAqIDEwIC0gNS41O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJ5ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICogMiArIDEpICogMTAgLSA1LjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2VzW2ldID0gdmVjMyhyeCwgMCwgcnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY293LnJlbmRlcihtYXRyU2NhbGUodmVjMygwLjA1KSkubXVsKG1hdHJSb3RhdGUodGhpcy5sYWIucm5kLnRpbWVyLmdsb2JhbFRpbWUsIHZlYzMoMCwgMSwgMCkpLm11bChtYXRyVHJhbnNsYXRlKHZlYzModGhpcy5wb3Nlc1tpXS54LCAxLjMsIHRoaXMucG9zZXNbaV0ueikpKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlbmRlciB9IGZyb20gXCIuL3JuZC9ybmQuanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQsIG1hdHJSb3RhdGUsIG1hdHJUcmFuc2xhdGUsIG1hdHJTY2FsZSB9IGZyb20gXCIuL210aC9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IEZpZ3VyZSB9IGZyb20gXCIuL3BsYXQvcGxhdC5qc1wiO1xyXG5pbXBvcnQgeyBSb29tLCBpbWdUb0NvbnRleHQyZCB9IGZyb20gXCIuL2dlbi9nZW4uanNcIjtcclxuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCIuL2N0cmwvY3RybC5qc1wiO1xyXG5pbXBvcnQgeyB3c0luaXQsIG9uSW50ZXJ2YWwsIGdldFBsYXllcnMgfSBmcm9tIFwiLi93cy5qc1wiO1xyXG5pbXBvcnQgeyBMYWJpcmludCB9IGZyb20gXCIuL2dlbi9sYWIuanNcIjtcclxuaW1wb3J0IHsgc2hhZGVyVXBkYXRlSW5pdCB9IGZyb20gXCIuL3NoZF91cGQuanNcIjtcclxuaW1wb3J0IHsgQ293cyB9IGZyb20gXCIuL2dlbi9jb3dzLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG4gIGxldCBmaWd1cmUgPSBuZXcgRmlndXJlKCk7XHJcbiAgZmlndXJlLnNldERvZGVjYWhlZHJvbigpO1xyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRnJhbWVcIik7XHJcbiAgbGV0IHJlbmRlciA9IG5ldyBSZW5kZXIoY2FudmFzKTtcclxuICB3c0luaXQocmVuZGVyKTtcclxuICBsZXQgc2hhZGVyID0gcmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgc2hhZGVyVXBkYXRlSW5pdChzaGFkZXIpO1xyXG4gIGxldCB0ZXggPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2VtLmpwZ1wiKTtcclxuICByZW5kZXIuc2V0Q2FtKHZlYzMoNSwgNSwgNSksIHZlYzMoMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIGxldCBsYWIgPSBuZXcgTGFiaXJpbnQocmVuZGVyLCBcIi4vYmluL2xhYnMvZGVmMS5wbmdcIik7XHJcbiAgbGV0IHBsX210bCA9IHNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgIHZlYzMoMC4xKSxcclxuICAgIHZlYzMoMSwgMC4xLCAwLjEpLFxyXG4gICAgdmVjMygwLjMpLFxyXG4gICAgOTAsXHJcbiAgICAxLjBcclxuICApO1xyXG4gIHBsX210bC5hdHRhY2hUZXh0dXJlKHRleCwgMCk7XHJcbiAgcGxfbXRsLnVwZGF0ZSgpO1xyXG4gIGxldCBmID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGYuc2V0Q3ViZSgpO1xyXG4gIGxldCBwbF9wciA9IGYubWFrZVByaW0ocGxfbXRsKTtcclxuICBsZXQgY293cyA9IG5ldyBDb3dzKGxhYik7XHJcblxyXG4gIGNhbnZhcy5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIiN0ZXh0QXJlYVwiKS5zbGlkZVVwKCk7XHJcbiAgICAkKCcjYXBwbHknKS5zbGlkZVVwKCk7XHJcbiAgICAkKCcjbWFpbkZyYW1lJykuY3NzKHsgJ3dpZHRoJzogJzEwMHZ3JyB9KTtcclxuICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2soKTtcclxuICB9O1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XHJcbiAgICBpZiAoZS5jb2RlID09ICdUYWInKSB7XHJcbiAgICAgICQoXCIjdGV4dEFyZWFcIikuc2xpZGVEb3duKCk7XHJcbiAgICAgICQoJyNhcHBseScpLnNsaWRlRG93bigpO1xyXG4gICAgICAkKCcjbWFpbkZyYW1lJykuY3NzKHsgJ3dpZHRoJzogJzgwdncnIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvL2xldCBza3kgPSByZW5kZXIubmV3U2t5U3BoZXJlKFwiLi9iaW4vdGV4dHVyZXMvc3BhY2UucG5nXCIpO1xyXG4gIGxldCBza3kgPSByZW5kZXIubmV3U2t5U3BoZXJlKFwiLi9iaW4vdGV4dHVyZXMvd2F0ZXIuanBnXCIpO1xyXG5cclxuICBjb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgbGV0IHAgPSBnZXRQbGF5ZXJzKCk7XHJcblxyXG4gICAgcmVuZGVyLnJlbmRlclN0YXJ0KCk7XHJcbiAgICBmb3IgKGxldCBwbGF5ZXIgaW4gcC5wbGF5ZXJzKSB7XHJcbiAgICAgIGlmIChwLmlkICE9IHBsYXllcikge1xyXG4gICAgICAgIHAucHJpbXNbcGxheWVyXS5tdGwuYXR0YWNoVGV4dHVyZShwLmF2YXRhcnNbcGxheWVyXSwgMCk7XHJcbiAgICAgICAgcC5wcmltc1twbGF5ZXJdLnJlbmRlcihtYXQ0KHAucGxheWVyc1twbGF5ZXJdLmNvb3Jkcy50cmFucykubXVsKFxyXG4gICAgICAgICAgbWF0clRyYW5zbGF0ZShwLnBsYXllcnNbcGxheWVyXS5jb29yZHMucG9zKVxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcmltLnJlbmRlcihcclxuICAgIC8vICBtYXRyUm90YXRlKHJlbmRlci50aW1lci5sb2NhbFRpbWUsIHZlYzMoMCwgMSwgMSkpLm11bChcclxuICAgIC8vICAgIG1hdHJUcmFuc2xhdGUodmVjMygwLCAwLCAwKSlcclxuICAgIC8vICApXHJcbiAgICAvLyk7XHJcbiAgICAvL3NreS5yZW5kZXIobWF0NCgxKSk7XHJcbiAgICBsYWIucmVuZGVyKCk7XHJcbiAgICBjb3dzLnJlbmRlcigpO1xyXG4gICAgcmVuZGVyLnJlbmRlckVuZCgpO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICB9O1xyXG4gIGRyYXcoKTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IG1haW47XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENB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LENBQUM7SUFDekMsS0FBSztBQUNMO0lBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ2YsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCO0lBQ0EsUUFBUSxPQUFPLElBQUk7SUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLFNBQVMsR0FBRztJQUNoQixRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVM7SUFDdEIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVE7SUFDNUIsUUFBUSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTO0lBQ3RCLFFBQVEsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCOztJQzdGQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzNCLElBQUksSUFBSSxDQUFDLElBQUksU0FBUztJQUN0QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0I7O0lDWEEsTUFBTSxLQUFLLENBQUM7SUFDWixJQUFJLFdBQVc7SUFDZixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsTUFBTTtJQUNOLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3RDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxHQUFHO0lBQ2hCLFFBQVEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUk7SUFDcEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLEVBQUU7SUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUztJQUNwQyxRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVE7SUFDOUIsUUFBUSxPQUFPLElBQUksS0FBSztJQUN4QixZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELFNBQVMsQ0FBQztJQUNWLElBQUksT0FBTyxJQUFJLEtBQUs7SUFDcEIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDeEMsSUFDTyxJQUNDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRztBQUN4QjtJQUNBLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQztJQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUM7SUFDVCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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LENBQUM7QUFDVjtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ3hDLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkM7SUFDQTtJQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDN0MsUUFBUTtJQUNSLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RSxRQUFRO0lBQ1IsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUc7SUFDakMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BEO0lBQ0EsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELFFBQVEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMs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LFFBQVEsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSztJQUMxQyxZQUFZLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RyxZQUFZLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxZQUFZLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNsRztJQUNBLFlBQVksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLFlBQVksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xHO0lBQ0EsVUFBUztJQUNULEtBQUs7SUFDTCxJQUFJLFFBQVEsR0FBRztJQUNmO0lBQ0E7SUFD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Q0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxTQUFTLENBQUM7SUFDVixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUc7SUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMs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RSxDQUFDO0FBQ3hCO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRCxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFDM0U7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxZQUFZLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUM1QyxZQUFZLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixTQUFTO0FBQ1Q7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxZQUFZLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuRCxZQUFZLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUU7SUFDQSxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsU0FBUztBQUNUO0lBQ0EsUUFBUTtJQUNSLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixZQUFZLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUI7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsWUFBWSxJQUFJLElBQUk7SUFDcEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdCLG9CQUFvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxrQkFBaUI7SUFDakIsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxTQUFTO0lBQ1QsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLFlBQVksSUFBSSxJQUFJO0lBQ3BCLGdCQUFnQjtJQUNoQixvQkFBb0IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QixvQkFBb0IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QixvQkFBb0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsa0JBQWlCO0lBQ2pCLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsU0FBUztBQUNUO0lBQ0EsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLFlBQVksSUFBSSxJQUFJO0lBQ3BCLGdCQUFnQjtJQUNoQixvQkFBb0IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxpQkFBaUIsQ0FBQztJQUNsQixZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLFNBQVM7SUFDVCxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsWUFBWSxJQUFJLElBQUk7SUFDcEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQixHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELGlCQUFpQixDQUFDO0lBQ2xCLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsU0FBUztBQUNUO0lBQ0EsS0FBSztBQUNMO0lBQ0EsSUFBSSxlQUFlLEdBQUc7SUFDdEIsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2RCxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsUUFBUSxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDeEQ7SUFDQSxRQUFRLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUN2QixRQUFRLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUN2QixRQUFRLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUN4QixRQUFRLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN4QjtJQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QyxRQUFRLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDNUM7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxZQUFZO0lBQ1osZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQ3RDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzlDO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakUsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRTtJQUNBLFlBQVksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLFlBQVksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckU7SUFDQSxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsWUFBWSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEM7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsWUFBWSxJQUFJLFFBQVEsR0FBRztJQUMzQixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4QixnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6QixnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6QixnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7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UUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN0RDtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDL0csU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNuQyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQy9HLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDbkMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ25KLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDbkMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElB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
