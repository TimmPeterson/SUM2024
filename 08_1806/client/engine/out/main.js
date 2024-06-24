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
      let lab = new Labirint(render, "./bin/labs/def.png");
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
      let sky = render.newSkySphere("./bin/textures/water.jpg");

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
        sky.render(mat4(1));
        lab.render();
        render.renderEnd();
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.onload = main;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC92ZWMyLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvcHJpbS5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9jdHJsL2N0cmwuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9wbGF0L3BsYXQuanMiLCIuLi9zcmMvZ2VuL2dlbi5qcyIsIi4uL3NyYy93cy5qcyIsIi4uL3NyYy9nZW4vbGFiLmpzIiwiLi4vc3JjL3NoZF91cGQuanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMoMCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGxlbik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogaywgdGhpcy55ICogaywgdGhpcy56ICogayk7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLyBrLCB0aGlzLnkgLyBrLCB0aGlzLnogLyBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICAgICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bG1hdHIobSkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy54ICogbS5hWzBdWzNdICtcclxuICAgICAgICAgICAgdGhpcy55ICogbS5hWzFdWzNdICtcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzJdWzNdICtcclxuICAgICAgICAgICAgbS5hWzNdWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl0pIC8gdywpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShtKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoMCwgMCwgMCk7XHJcbiAgICBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgueCwgeC55LCB4LnopO1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59XHJcbiIsImNsYXNzIF92ZWMyIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMyKHgsIHkpIHtcclxuICAgIGlmICh5ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMyKHgsIHgpO1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMih4LCB5KTtcclxufSIsImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwobSkge1xyXG4gICAgICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMuYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KFxyXG4gICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbikge1xyXG4gICAgaWYgKGEwMCA9PSAxICYmIGEwMSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIGEwMC5hWzBdWzBdLCBhMDAuYVswXVsxXSwgYTAwLmFbMF1bMl0sIGEwMC5hWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDAuYVsxXVswXSwgYTAwLmFbMV1bMV0sIGEwMC5hWzFdWzJdLCBhMDAuYVsxXVszXSxcclxuICAgICAgICAgICAgYTAwLmFbMl1bMF0sIGEwMC5hWzJdWzFdLCBhMDAuYVsyXVsyXSwgYTAwLmFbMl1bM10sXHJcbiAgICAgICAgICAgIGEwMC5hWzNdWzBdLCBhMDAuYVszXVsxXSwgYTAwLmFbM11bMl0sIGEwMC5hWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyU2NhbGUocykge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcy54LCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIHMueSwgMCwgMCxcclxuICAgICAgICAwLCAwLCBzLnosIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMVxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0ckZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDIgKiBuZWFyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMCxcclxuICAgICAgICAocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAtMSxcclxuICAgICAgICAwLCAwLCAtMiAqIG5lYXIgKiBmYXIgLyAoZmFyIC0gbmVhciksIDBcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgICByaWdodCA9IGRpci5jcm9zcyh1cDEpLm5vcm0oKSxcclxuICAgICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcmlnaHQueCwgdXAueCwgLWRpci54LCAwLFxyXG4gICAgICAgIHJpZ2h0LnksIHVwLnksIC1kaXIueSwgMCxcclxuICAgICAgICByaWdodC56LCB1cC56LCAtZGlyLnosIDAsXHJcbiAgICAgICAgLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMVxyXG4gICAgKTtcclxufSIsImNsYXNzIF9idWZmZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgICAgLy8gQnVmZmVyIHR5cGUgKGdsLioqKl9CVUZGRVIpXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTsgICAgLy8gQnVmZmVyIHNpemUgaW4gYnl0ZXNcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICBpZiAoc2l6ZSA9PSAwIHx8IHR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmlmb3JtQnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIG5hbWUsIHNpemUsIGJpbmRQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYmluZFBvaW50ID0gYmluZFBvaW50OyAvLyBCdWZmZXIgR1BVIGJpbmRpbmcgcG9pbnRcclxuICAgIH1cclxuXHJcbiAgICBhcHBseShzaGQpIHtcclxuICAgICAgICBpZiAodGhpcy5ybmQgPT0gdW5kZWZpbmVkIHx8IHNoZC5wcmcgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2hkLnJuZC5nbC51bmlmb3JtQmxvY2tCaW5kaW5nKHNoZC5wcmcsIHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0uaW5kZXgsIHRoaXMuYmluZFBvaW50KTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXJCYXNlKHNoZC5ybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHRoaXMuYmluZFBvaW50LCB0aGlzLmlkKTtcclxuICAgIH1cclxufSIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gVGltZXIgY2xhc3MgbW9kdWxlXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHRoaXMubG9jYWxUaW1lID0gdGhpcy5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5GUFMgPSAzMC4wO1xyXG4gICAgICAgIHRoaXMucGF1c2VUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBnbG9iYWwgdGltZSBmdW50aW9uXHJcbiAgICBnZXRUaW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCB0ID1cclxuICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2V0IGN1cnJlbnQgRlBTIGZ1bmN0aW9uXHJcbiAgICBnZXRGUFMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRlBTLnRvRml4ZWQoMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VFbmJhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZURpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VTd2l0Y2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcG9uc2UgdGltZXIgZnVuY3Rpb25cclxuICAgIHJlc3BvbnNlKHRhZ19pZCA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXMuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbFRpbWUgPSB0O1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gdGhpcy5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxUaW1lID0gdCAtIHRoaXMucGF1c2VUaW1lIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlcisrO1xyXG4gICAgICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xyXG4gICAgICAgICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ19pZCkuaW5uZXJIVE1MID0gdGhpcy5nZXRGUFMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IHQ7XHJcbiAgICB9O1xyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzIuanNcIlxyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtLCB0ZXgpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLm5vcm0gPSBub3JtO1xyXG4gICAgICAgIHRoaXMudGV4ID0gdGV4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICBpZiAodGV4ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB2ZWMyKDApKTtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0sIHRleCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgIGxldCBpO1xyXG5cclxuICAgIC8qIFNldCBhbGwgdmVydGV4IG5vcm1hbHMgdG8gemVybyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZWMzKDApO1xyXG5cclxuICAgIC8qIEV2YWwgbm9ybWFsIGZvciBldmVyeSBmYWNldCAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGluZGljaWVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG4wID0gaW5kaWNpZXNbaV0sIG4xID0gaW5kaWNpZXNbaSArIDFdLCBuMiA9IGluZGljaWVzW2kgKyAyXTtcclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgcDAgPSB2ZXJ0ZXhlc1tuMF0ucG9zLFxyXG4gICAgICAgICAgICBwMSA9IHZlcnRleGVzW24xXS5wb3MsXHJcbiAgICAgICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvcyxcclxuICAgICAgICAgICAgTiA9IHAxLnN1YihwMCkuY3Jvc3MocDIuc3ViKHAwKSkubm9ybSgpO1xyXG5cclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybSA9IHZlcnRleGVzW24wXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybSA9IHZlcnRleGVzW24xXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMl0ubm9ybSA9IHZlcnRleGVzW24yXS5ub3JtLmFkZChOKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBOb3JtYWxpemUgYWxsIHZlcnRleCBub3JtYWxzICovXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVydGV4ZXNbaV0ubm9ybS5ub3JtKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmltIHtcclxuICAgIGNyZWF0ZShzaGQsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIGxldCB0cmltYXNoID0gW10sIGkgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gWy4uLnZlcnRleGVzXTtcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gWy4uLmluZGljaWVzXTtcclxuICAgICAgICB0aGlzLnNoZCA9IHNoZDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBzaGQucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICB0aGlzLnZlcnRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NMb2MgIT0gLTEgJiYgdGhpcy5ub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQucG9zTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDApO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLm5vcm1Mb2MsIDMsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMTIpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5ub3JtTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC50ZXhMb2MsIDIsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMjQpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC50ZXhMb2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5JbmRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXIoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQzMkFycmF5KGluZGljaWVzKSwgc2hkLnJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIHRoaXMubnVtT2ZFbGVtZW50cyA9IGluZGljaWVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtdGwsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbWF0NCgxKTtcclxuICAgICAgICBpZiAoaW5kaWNpZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXRsID0gbXRsO1xyXG4gICAgICAgICAgICB0aGlzLnNoZCA9IG10bC5zaGQ7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbU9iaihtdGwsIHZlcnRleGVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUobXRsLnNoZCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXRsLlRyYW5zICE9IDEuMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQudHJhbnNwYXJlbnRzLnB1c2goeyBwcmltOiB0aGlzLCB3b3JsZDogd29ybGQgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVjcmVhdGluZyBwcmltaXRpdmUgaWYgaXQgd2Fzbid0IGNyZWF0ZWRcclxuICAgICAgICAvLyAoYmVjYXVzZSBvZiBzaGFkZXIgYXN5bmMgaW5pdGlhbGl6YXRpb24pXHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhd2luZyBwcmltaXRpdmUgaWYgc2hhZGVyIGlzIGxvYWRlZFxyXG4gICAgICAgIGlmICh0aGlzLm10bC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5wcmltVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KHRoaXMudHJhbnNmb3JtLm11bCh3b3JsZCkubGluZWFyaXplKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy5zaGQucm5kLmdsLlRSSUFOR0xFUywgdGhpcy5udW1PZkVsZW1lbnRzLCB0aGlzLnNoZC5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTm93KHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdGwuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQucHJpbVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLnRyYW5zZm9ybS5tdWwod29ybGQpLmxpbmVhcml6ZSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5zaGQucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLkluZGV4QnVmZmVySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuc2hkLnJuZC5nbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtZW50cywgdGhpcy5zaGQucm5kLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZyb21PYmoobXRsLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIGxldCB2dHggPSBbXTtcclxuICAgICAgICBsZXQgZmlsZSA9IGF3YWl0IGZldGNoKGBiaW4vbW9kZWxzLyR7ZmlsZU5hbWV9Lm9iamApO1xyXG4gICAgICAgIGxldCBzcmMgPSBhd2FpdCBmaWxlLnRleHQoKTtcclxuICAgICAgICBsZXQgbGluZXMgPSBzcmMuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVbMF0gPT0gJ3YnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rcyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva3NbaV0gPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB2LnB1c2gocGFyc2VGbG9hdCh0b2tzW2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdnR4LnB1c2godmVjMyh2WzBdLCB2WzFdLCB2WzJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVydGV4KHZlYzModlswXSwgdlsxXSwgdlsyXSkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lWzBdID09ICdmJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMTsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdmVydGV4KHZ0eFtwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNpZXMucHVzaChwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnZlcnRleGVzLnB1c2godik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2goaSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tIFwiLi9idWYuanNcIlxyXG5pbXBvcnQgeyBQcmltIH0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5cclxuLy8gQ2xhc3MgZm9yIGhvbGRpbmcgbWF0ZXJpYWwgcHJvcGVydGllcyBvZiBwcmltaXRpdmUuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaGQsIEthLCBLZCwgS3MsIFBoLCBUcmFucykge1xyXG4gICAgICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgICAgIHRoaXMuS2EgPSBLYTtcclxuICAgICAgICB0aGlzLktkID0gS2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgICAgIHRoaXMuUGggPSBQaDtcclxuICAgICAgICB0aGlzLlRyYW5zID0gVHJhbnM7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlcyA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuXHJcbiAgICAgICAgdGhpcy5VQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLnNoZC5ybmQsIFwidV9tYXRlcmlhbFwiLCAxNiAqIDQsIDMpO1xyXG4gICAgICAgIC8vdGhpcy5VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IHRleF9mbGFncyA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuS2EubGluZWFyaXplKCkuY29uY2F0KFswXSwgdGhpcy5LZC5saW5lYXJpemUoKSwgW3RoaXMuVHJhbnNdLCB0aGlzLktzLmxpbmVhcml6ZSgpLCBbdGhpcy5QaF0pXHJcblxyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgNDsgdCsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1t0XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGV4X2ZsYWdzW3RdID0gMTtcclxuXHJcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRleF9mbGFncyk7XHJcblxyXG4gICAgICAgIHRoaXMuVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGQuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLlVCTy5hcHBseSh0aGlzLnNoZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbdF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVzW3RdLmFwcGx5KHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaFRleHR1cmUodGV4dHVyZSwgbnVtKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IDMgfHwgbnVtIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHR1cmVzW251bV0gPSB0ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1ByaW1pdGl2ZSh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByaW0odGhpcywgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufTtcclxuXHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vbXRsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuICBjb25zdHJ1Y3RvcihybmQsIG5hbWUpIHtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucHJnID0gbnVsbDtcclxuICAgIHRoaXMudG1wU291cnNlID0geyB2ZXJ0OiBudWxsLCBmcmFnOiBudWxsIH07XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfaW5pdCgpIHtcclxuICAgIHRoaXMuc2hhZGVycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICAgIG5hbWU6IFwiZnJhZ1wiLFxyXG4gICAgICAgIHNyYzogXCJcIixcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zaGFkZXJzKSB7XHJcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke3RoaXMubmFtZX0vJHtzLm5hbWV9Lmdsc2xgKTtcclxuICAgICAgbGV0IHNyYyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIikgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkge1xyXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcmcgPSB0aGlzLnJuZC5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICBpZiAocy5pZCAhPSBudWxsKSB0aGlzLnJuZC5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcmcsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcmcpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdLCBcInZlcnRcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1widmVydFwiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdLCBcImZyYWdcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1wiZnJhZ1wiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICB0aGlzLnBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICB0aGlzLm5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJbk5vcm1hbFwiKTtcclxuICAgIHRoaXMudGV4TG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5UZXhDb29yZFwiKTtcclxuXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKFxyXG4gICAgICB0aGlzLnByZyxcclxuICAgICAgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1TXHJcbiAgICApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcmcsIGkpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXHJcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIoXHJcbiAgICAgIHRoaXMucHJnLFxyXG4gICAgICB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1NcclxuICAgICk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybUJsb2NrczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGJsb2NrX25hbWUgPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMucHJnLCBpKTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtQmxvY2tJbmRleCh0aGlzLnByZywgYmxvY2tfbmFtZSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICBzaXplOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIoXHJcbiAgICAgICAgICB0aGlzLnByZyxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkVcclxuICAgICAgICApLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcihcclxuICAgICAgICAgIHRoaXMucHJnLFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0JJTkRJTkdcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm5kLm1hdHJpeFVCTy5hcHBseSh0aGlzKTtcclxuICAgIHRoaXMucm5kLnByaW1VQk8uYXBwbHkodGhpcyk7XHJcbiAgICB0aGlzLnJuZC50aW1lVUJPLmFwcGx5KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICBpZiAodGhpcy5wcmcgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJuZC5nbC51c2VQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyB0eXBlOiBcInZlcnRcIiBvciBcImZyYWdcIlxyXG4gIHVwZGF0ZShzb3VyY2UsIHR5cGUpIHtcclxuICAgIGxldCBuO1xyXG4gICAgaWYgKHR5cGUgPT0gXCJ2ZXJ0XCIpIG4gPSAwO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcImZyYWdcIikgbiA9IDE7XHJcbiAgICBlbHNlIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFkZXJzW25dLmlkID09IG51bGwpIHtcclxuICAgICAgdGhpcy50bXBTb3Vyc2VbdHlwZV0gPSBzb3VyY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2UodGhpcy5zaGFkZXJzW25dLmlkLCBzb3VyY2UpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHRoaXMuc2hhZGVyc1tuXS5pZCk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXdNYXRlcmlhbChhbWJpZW50LCBkaWZmdXNlLCBzcGVjdWxhciwgcGhvbmcsIHRyYW5zKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdGVyaWFsKHRoaXMsIGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBwaG9uZywgdHJhbnMpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gcm5kLmdsO1xyXG5cclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnRleElkID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dElkKTtcclxuICAgICAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDE7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTtcclxuICAgICAgICBjb25zdCBib3JkZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XHJcbiAgICAgICAgY29uc3QgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKTsgLy8gb3BhcXVlIGJsdWVcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICBsZXZlbCxcclxuICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgc3JjRm9ybWF0LFxyXG4gICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICBwaXhlbCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY1R5cGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Bvd2VyT2YyKGltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKGltYWdlLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFllcywgaXQncyBhIHBvd2VyIG9mIDIuIEdlbmVyYXRlIG1pcHMuXHJcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vLCBpdCdzIG5vdCBhIHBvd2VyIG9mIDIuIFR1cm4gb2ZmIG1pcHMgYW5kIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCJcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkobnVtKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIG51bSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwiaW1wb3J0IHsgbWF0clJvdGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcikge1xyXG4gICAgICAgIHRoaXMuZm9yd2FyZCA9IHZlYzMoMCwgMCwgMSk7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IHZlYzMoMSwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy51cCA9IHZlYzMoMCwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHZlYzMoMCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSAzLjA7XHJcbiAgICAgICAgdGhpcy5zZW5zZSA9IDAuMDAyMjtcclxuICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICB0aGlzLmtleVRhYiA9IHt9O1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbWF0NCgxKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IDMwLjA7XHJcblxyXG4gICAgICAgIHJlbmRlci5jYW52YXMub25tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b25zID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvdy5vbmtleWRvd24gPSBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSAxMC4wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gXCJLZXlBXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5QVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleURcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlXXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlTXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5U1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU2hpZnRMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU2hpZnRMZWZ0XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIlNwYWNlXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93Lm9ua2V5dXAgPSBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSBcIktleUFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlBXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleURcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlXXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5V1wiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlTXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU2hpZnRMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU2hpZnRMZWZ0XCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJTcGFjZVwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkID0gdGhpcy5mb3J3YXJkLm11bG1hdHIobWF0clJvdGF0ZSgtZS5tb3ZlbWVudFggKiB0aGlzLnNlbnNlLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLnJpZ2h0Lm11bG1hdHIobWF0clJvdGF0ZSgtZS5tb3ZlbWVudFggKiB0aGlzLnNlbnNlLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCA9IHRoaXMuZm9yd2FyZC5tdWxtYXRyKG1hdHJSb3RhdGUoZS5tb3ZlbWVudFkgKiB0aGlzLnNlbnNlLCB0aGlzLnJpZ2h0KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtLm11bChtYXRyUm90YXRlKC1lLm1vdmVtZW50WCAqIHRoaXMuc2Vuc2UsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybS5tdWwobWF0clJvdGF0ZShlLm1vdmVtZW50WSAqIHRoaXMuc2Vuc2UsIHRoaXMucmlnaHQpKTtcclxuICAgICAgICAgICAgLy90aGlzLnVwID0gdGhpcy51cC5tdWxtYXRyKG1hdHJSb3RhdGUoZS5tb3ZlbWVudFkgKiB0aGlzLnNlbnNlLCB0aGlzLnJpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzcG9uc2UoKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSAtPSB0aGlzLmFjY2VsZXJhdGlvbiAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5ICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIC8qaWYgKHRoaXMudmVsb2NpdHkgPCAwICYmIHRoaXMucG9zaXRpb24ueSA+PSAyLjUpIHtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmVsb2NpdHkgPiAwICYmIHRoaXMucG9zaXRpb24ueSA8IDIuNSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5ICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPCAyLjUpXHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDIuNTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMua2V5VGFiW1wiS2V5QVwiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5yaWdodC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIktleURcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHRoaXMucmlnaHQubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJLZXlXXCJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh2ZWMzKHRoaXMuZm9yd2FyZC54LCAwLCB0aGlzLmZvcndhcmQueikubm9ybSgpLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH0gaWYgKHRoaXMua2V5VGFiW1wiS2V5U1wiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5zdWIodmVjMyh0aGlzLmZvcndhcmQueCwgMCwgdGhpcy5mb3J3YXJkLnopLm5vcm0oKS5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIlNoaWZ0TGVmdFwiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5zdWIodGhpcy51cC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIlNwYWNlXCJdKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMudXAubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyLnNldENhbSh0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLmZvcndhcmQpLCB0aGlzLnVwKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL210aC92ZWMyLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0sIG1hdHJWaWV3IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgVW5pZm9ybUJ1ZmZlciB9IGZyb20gXCIuL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuLi90aW1lci90aW1lci5qc1wiXHJcbmltcG9ydCB7IFNoYWRlciB9IGZyb20gXCIuL3Jlcy9zaGQuanNcIlxyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcIi4vcmVzL3RleC5qc1wiXHJcbmltcG9ydCB7IHZlcnRleCB9IGZyb20gXCIuL3Jlcy9wcmltLmpzXCJcclxuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCIuLi9jdHJsL2N0cmwuanNcIlxyXG5cclxuLy8gR2VuZXJhbCBjbGFzcyBmb3IgcmVuZGVyaW5nLlxyXG4vLyBPbmUgcmVuZGVyIHBlciBjYW52YXMuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gICAgdHJhbnNwYXJlbnRzID0gW107XHJcblxyXG4gICAgc2V0RnJ1c3R1bSgpIHtcclxuICAgICAgICBsZXQgbSA9IG1hdDQoMSk7XHJcbiAgICAgICAgbGV0IHJ4ID0gdGhpcy5wcm9qU2l6ZSwgcnkgPSB0aGlzLnByb2pTaXplO1xyXG5cclxuICAgICAgICAvKiBDb3JyZWN0IGFzcGVjdCByYXRpbyAqL1xyXG4gICAgICAgIGlmICh0aGlzLndpZHRoID49IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICByeCAqPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByeSAqPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMubWF0clByb2ogPSBtYXRyRnJ1c3R1bSgtcnggLyAyLCByeCAvIDIsIC1yeSAvIDIsIHJ5IC8gMiwgdGhpcy5wcm9qRGlzdCwgdGhpcy5mYXJDbGlwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDYW0obG9jLCBhdCwgdXApIHtcclxuICAgICAgICB0aGlzLm1hdHJWaWV3ID0gbWF0clZpZXcobG9jLCBhdCwgdXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXRyaXhlcygpIHtcclxuICAgICAgICBsZXQgcmlnaHQgPSB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMF1bMF0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsxXVswXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzJdWzBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgdXAgPSB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMF1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsxXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzJdWzFdKTtcclxuICAgICAgICBsZXQgZGlyID0gdmVjMygtdGhpcy5tYXRyVmlldy5hWzBdWzJdLFxyXG4gICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5hWzFdWzJdLFxyXG4gICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5hWzJdWzJdKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1hdHJQcm9qLmxpbmVhcml6ZSgpLmNvbmNhdCh0aGlzLm1hdHJWaWV3LmxpbmVhcml6ZSgpKTtcclxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZGlyLmxpbmVhcml6ZSgpLCBbMF0sIHJpZ2h0LmxpbmVhcml6ZSgpLCBbMF0sIHVwLmxpbmVhcml6ZSgpLCBbMF0pO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChbdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgdGhpcy5wcm9qU2l6ZSwgdGhpcy5wcm9qRGlzdF0pO1xyXG4gICAgICAgIHRoaXMubWF0cml4VUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sLnJlc3BvbnNlKCk7XHJcblxyXG4gICAgICAgIC8vdGhpcy50aW1lVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KFt0aGlzLnRpbWVyLmxvY2FsVGltZSwgdGhpcy50aW1lci5sb2NhbERlbHRhVGltZSwgdGhpcy50aW1lci5nbG9iYWxUaW1lLCB0aGlzLnRpbWVyLmdsb2JhbERlbHRhVGltZV0pKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnRyYW5zcGFyZW50cykge1xyXG4gICAgICAgICAgICAgICAgcC5wcmltLnJlbmRlck5vdyhwLndvcmxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IGNhbWVyYSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9qU2l6ZSA9IDAuMjtcclxuICAgICAgICB0aGlzLnByb2pEaXN0ID0gMC4xO1xyXG4gICAgICAgIHRoaXMuZmFyQ2xpcCA9IDMwMDtcclxuXHJcbiAgICAgICAgLy8gRXZhbHVhdGluZyBjYW52YXMgc2l6ZVxyXG4gICAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAxOTIwOy8vcmVjdC5yaWdodCAtIHJlY3QubGVmdCArIDE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMDgwOy8vcmVjdC5ib3R0b20gLSByZWN0LnRvcCArIDE7XHJcblxyXG4gICAgICAgIC8vIEdldHRpbmcgR0wgY29udGV4dFxyXG4gICAgICAgIHRoaXMuZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7XHJcbiAgICAgICAgICAgIHByZW11bHRpcGxpZWRBbHBoYTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFscGhhOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLjksIDAuOSwgMC45LCAxKTtcclxuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG5cclxuICAgICAgICAvLyBDb250b2wgaW5pdFxyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDb250cm9sKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgY2FtZXJhXHJcbiAgICAgICAgdGhpcy5tYXRyaXhVQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLCBcInVfY2FtZXJhXCIsIDE2ICogNCAqIDIgKyA0ICogMTYsIDApO1xyXG4gICAgICAgIHRoaXMuc2V0RnJ1c3R1bSgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FtKHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMCwgLTEpLCB2ZWMzKDAsIDEsIDApKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeGVzKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBwcmltIHVib1xyXG4gICAgICAgIHRoaXMucHJpbVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV9wcmltaXRpdmVcIiwgMTYgKiA0LCAxKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHRpbWVyXHJcbiAgICAgICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVVCTyA9IG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIFwidV90aW1lXCIsIDE2LCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdTaGFkZXIoZmlsZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNoYWRlcih0aGlzLCBmaWxlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3VGV4dHVyZShmaWxlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dHVyZSh0aGlzLCBmaWxlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3VW5pZm9ybUJ1ZmZlcihidWZmZXJOYW1lLCBidWZmZXJTaXplLCBiaW5kaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVbmlmb3JtQnVmZmVyKHRoaXMsIGJ1ZmZlck5hbWUsIGJ1ZmZlclNpemUsIGJpbmRpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1NreVNwaGVyZSh0ZXhOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4ZXMgPSBbdmVydGV4KHZlYzMoLTEsIC0xLCAwLjk5OSksIHZlYzMoMCkpLCB2ZXJ0ZXgodmVjMygtMSwgMywgMC45OTkpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoMywgLTEsIDAuOTk5KSwgdmVjMygwKSldO1xyXG4gICAgICAgIGNvbnN0IGluZGljaWVzID0gWzAsIDEsIDJdO1xyXG4gICAgICAgIGNvbnN0IHNoZCA9IHRoaXMubmV3U2hhZGVyKFwic2t5IHNwaGVyZVwiKTtcclxuICAgICAgICBjb25zdCBtdGwgPSBzaGQubmV3TWF0ZXJpYWwodmVjMygwKSwgdmVjMygwKSwgdmVjMygwKSwgMCwgMS4wKTtcclxuICAgICAgICBjb25zdCB0ZXggPSB0aGlzLm5ld1RleHR1cmUodGV4TmFtZSk7XHJcbiAgICAgICAgbXRsLmF0dGFjaFRleHR1cmUodGV4LCAwKTtcclxuICAgICAgICByZXR1cm4gbXRsLm5ld1ByaW1pdGl2ZSh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQcmltLCB2ZXJ0ZXggfSBmcm9tIFwiLi4vcm5kL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9tdGgvdmVjMi5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3ViZSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGZyb250XHJcbiAgICAgICAgICAgIFt2ZWMzKC0wLjUsIC0wLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KV0sICAgICAgLy8gYmFja1xyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIC0wLjUpXSwgIC8vIGxlZnRcclxuICAgICAgICAgICAgW3ZlYzMoMC41LCAtMC41LCAtMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAtMC41KSwgdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIC0wLjUpXSwgIC8vIGJvdHRvbVxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAwLjUsIC0wLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSldLCAgICAgIC8vIHRvcFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy50ZXhDb29yZHMgPSBbXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUZXRyYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgc3FydDMgPSBNYXRoLnNxcnQoMy4wKSwgc3FydDIgPSBNYXRoLnNxcnQoMi4wKTtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgc3FydDIgLyBzcXJ0MywgMCksXHJcbiAgICAgICAgICAgIGZyb250ID0gdmVjMygwLCAwLCBzcXJ0MyAvIDMuMCksXHJcbiAgICAgICAgICAgIGxlZnQgPSB2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYuMCksXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gdmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtsZWZ0LCBmcm9udCwgdG9wXSwgLy8gYm90XHJcbiAgICAgICAgICAgIFtsZWZ0LCByaWdodCwgdG9wXSxcclxuICAgICAgICAgICAgW3JpZ2h0LCBmcm9udCwgdG9wXSxcclxuICAgICAgICAgICAgW2Zyb250LCByaWdodCwgbGVmdF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9jdGFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIDEgLyBzcXJ0MiwgMCksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpLFxyXG4gICAgICAgICAgICBsZiA9IHZlYzMoLTAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgbGIgPSB2ZWMzKC0wLjUsIDAsIC0wLjUpLFxyXG4gICAgICAgICAgICByZiA9IHZlYzMoMC41LCAwLCAwLjUpLFxyXG4gICAgICAgICAgICByYiA9IHZlYzMoMC41LCAwLCAtMC41KTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW2JvdCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW2JvdCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW2JvdCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW2JvdCwgcmYsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIHJmXSxcclxuICAgICAgICAgICAgW3RvcCwgbGYsIGxiXSxcclxuICAgICAgICAgICAgW3RvcCwgbGIsIHJiXSxcclxuICAgICAgICAgICAgW3RvcCwgcmYsIHJiXSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEljb2hlZHJvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHIgPSAwLjUgLyBNYXRoLnNpbigzNiAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdygyICogTWF0aC5zaW4oMC4xICogTWF0aC5QSSkgKiByLCAyKSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjA7IGkgKz0gNzIpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gaSAvIDE4MC4wICogTWF0aC5QSTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKHIgKiBNYXRoLnNpbihhbmdsZSksIHIgKiBNYXRoLmNvcyhhbmdsZSksIC1kIC8gMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjEucHVzaChwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChpICsgMzYpIC8gMTgwLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMociAqIE1hdGguc2luKGFuZ2xlKSwgciAqIE1hdGguY29zKGFuZ2xlKSwgZCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCAwLCByKSxcclxuICAgICAgICAgICAgYm90ID0gdG9wLm11bCgtMSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmkxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHRyaTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJpMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIyW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh0cmkyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXAxID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBib3QsIGxheWVyMVtpXSwgbGF5ZXIxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGNhcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FwMiA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLCBsYXllcjJbaV0sIGxheWVyMlsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChjYXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldERvZGVjYWhlZHJvbigpIHtcclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydCg1MCArIDEwICogTWF0aC5zcXJ0KDUpKSAvIDEwO1xyXG4gICAgICAgIGxldCBSID0gMC4yNSAqICgxICsgTWF0aC5zcXJ0KDUpKSAqIE1hdGguc3FydCgzKTtcclxuICAgICAgICBsZXQgcjAgPSByICogMiAqIE1hdGguY29zKCgzNiAvIDE4MCAqIE1hdGguUEkpKTtcclxuXHJcbiAgICAgICAgbGV0IGVkZ2UxID0gW107XHJcbiAgICAgICAgbGV0IGVkZ2UyID0gW107XHJcbiAgICAgICAgbGV0IGxheWVyMSA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjIgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoUiAqIFIgLSByICogcik7XHJcbiAgICAgICAgbGV0IGQwID0gTWF0aC5zcXJ0KFIgKiBSIC0gcjAgKiByMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICAgICAgYTEgPSBpIC8gMTgwICogTWF0aC5QSSxcclxuICAgICAgICAgICAgICAgIGEyID0gKGkgKyAzNikgLyAxODAgKiBNYXRoLlBJO1xyXG5cclxuICAgICAgICAgICAgbGV0IHAxID0gdmVjMyhyICogTWF0aC5zaW4oYTEpLCByICogTWF0aC5jb3MoYTEpLCBkKTtcclxuICAgICAgICAgICAgbGV0IHAyID0gdmVjMyhyICogTWF0aC5zaW4oYTIpLCByICogTWF0aC5jb3MoYTIpLCAtZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbDEgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTEpLCByMCAqIE1hdGguY29zKGExKSwgZDApO1xyXG4gICAgICAgICAgICBsZXQgbDIgPSB2ZWMzKHIwICogTWF0aC5zaW4oYTIpLCByMCAqIE1hdGguY29zKGEyKSwgLWQwKTtcclxuXHJcbiAgICAgICAgICAgIGVkZ2UxLnB1c2gocDEpO1xyXG4gICAgICAgICAgICBlZGdlMi5wdXNoKHAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMS5wdXNoKGwxKTtcclxuICAgICAgICAgICAgbGF5ZXIyLnB1c2gobDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGVkZ2UxKTtcclxuICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goZWRnZTIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTEgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVsoaSArIDEpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBsZXQgc3VyZmFjZTIgPSBbXHJcbiAgICAgICAgICAgICAgICBlZGdlMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMVtpXSxcclxuICAgICAgICAgICAgICAgIGxheWVyMlsoaSArIDQpICUgNV0sXHJcbiAgICAgICAgICAgICAgICBlZGdlMlsoaSArIDQpICUgNV1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTEpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goc3VyZmFjZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudmVydGV4ZXMgPSBbZWRnZTEsIGxheWVyMSwgbGF5ZXIyLCBlZGdlMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcigpIHtcclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zZXREb2RlY2FoZWRyb24oKTtcclxuXHJcbiAgICAgICAgbGV0IHZlcnRzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZlYzMoMCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMudmVydGV4ZXNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHAgPSBwLmFkZCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwID0gcC5kaXYoNSk7XHJcbiAgICAgICAgICAgIHAgPSBwLm11bCgzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmlzID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVswXSwgdGhpcy52ZXJ0ZXhlc1tpXVsxXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMV0sIHRoaXMudmVydGV4ZXNbaV1bMl0sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzJdLCB0aGlzLnZlcnRleGVzW2ldWzNdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVszXSwgdGhpcy52ZXJ0ZXhlc1tpXVs0XSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bNF0sIHRoaXMudmVydGV4ZXNbaV1bMF0sIHBdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspXHJcbiAgICAgICAgICAgICAgICB2ZXJ0cy5wdXNoKHRyaXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IHZlcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmltKG10bCkge1xyXG4gICAgICAgIGxldCBpbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIGxldCBqID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZGdlID0gdGhpcy52ZXJ0ZXhlc1tlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleENvb3JkcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgaW4gZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleGVzLnB1c2godmVydGV4KGVkZ2Vbdl0sIHZlYzMoMCksIHRoaXMudGV4Q29vcmRzW2VdW3ZdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IGluIGVkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChlZGdlW3ZdLCB2ZWMzKDApKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgMCk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2llcy5wdXNoKGogKyBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqICs9IGVkZ2UubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltKG10bCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IG1hdDQsIG1hdHJUcmFuc2xhdGUgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuaW1wb3J0IHsgRmlndXJlIH0gZnJvbSBcIi4uL3BsYXQvcGxhdC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9vbSB7XHJcbiAgY29uc3RydWN0b3IocmVuZGVyLCBmaWxlTmFtZSkge1xyXG4gICAgdGhpcy5tYXA7XHJcbiAgICB0aGlzLmJsb2NrcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuc2hhZGVyID0gcmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgICB0aGlzLm10bCA9IHRoaXMuc2hhZGVyLm5ld01hdGVyaWFsKFxyXG4gICAgICB2ZWMzKDAuMSksXHJcbiAgICAgIHZlYzMoMSwgMC41LCAxLjApLFxyXG4gICAgICB2ZWMzKDAuMyksXHJcbiAgICAgIDkwLFxyXG4gICAgICAxLjBcclxuICAgICk7XHJcbiAgICB0aGlzLnRleCA9IHJlbmRlci5uZXdUZXh0dXJlKFwiLi9iaW4vdGV4dHVyZXMvd2FsbHBhcGVyLnBuZyBcIik7XHJcbiAgICB0aGlzLm10bC5hdHRhY2hUZXh0dXJlKHRoaXMudGV4LCAwKTtcclxuICAgIHRoaXMubXRsLnVwZGF0ZSgpO1xyXG4gICAgdGhpcy5tdGwxID0gdGhpcy5zaGFkZXIubmV3TWF0ZXJpYWwoXHJcbiAgICAgIHZlYzMoMC4xKSxcclxuICAgICAgdmVjMygxLCAwLjUsIDEuMCksXHJcbiAgICAgIHZlYzMoMC4zKSxcclxuICAgICAgOTAsXHJcbiAgICAgIDEuMFxyXG4gICAgKTtcclxuICAgIHRoaXMudGV4MSA9IHJlbmRlci5uZXdUZXh0dXJlKFwiLi9iaW4vdGV4dHVyZXMvcC5wbmdcIik7XHJcbiAgICB0aGlzLm10bDEuYXR0YWNoVGV4dHVyZSh0aGlzLnRleDEsIDApO1xyXG4gICAgdGhpcy5tdGwxLnVwZGF0ZSgpO1xyXG5cclxuICAgIGxldCBmY3ViZSA9IG5ldyBGaWd1cmUoKTtcclxuICAgIGZjdWJlLnNldEN1YmUoKTtcclxuICAgIHRoaXMuY3ViZSA9IGZjdWJlLm1ha2VQcmltKHRoaXMubXRsKTtcclxuICAgIHRoaXMuY3ViZUZsb29yID0gZmN1YmUubWFrZVByaW0odGhpcy5tdGwxKTtcclxuICAgIHRoaXMubWFwID0gbnVsbDtcclxuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xyXG4gICAgSmltcC5yZWFkKGZpbGVOYW1lLCAoZXJyLCBpbWFnZSkgPT4ge1xyXG4gICAgICB0aGlzLm1hcCA9IGltYWdlLmJpdG1hcC5kYXRhO1xyXG4gICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVuZGVyKHdvcmxkKSB7XHJcbiAgICBpZiAodGhpcy5tYXAgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5ibG9ja3MpIHtcclxuICAgICAgYmxvY2sucmVuZGVyKG1hdDQoMSkpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmltYWdlLmJpdG1hcC5oZWlnaHQ7IHkrKylcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmltYWdlLmJpdG1hcC53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG5cclxuICAgICAgICBpZiAoYy5yID09IDI1NSkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoeCwgaSwgeSkpLm11bCh3b3JsZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYy5iID09IDI1NSkge1xyXG4gICAgICAgICAgdGhpcy5jdWJlRmxvb3IucmVuZGVyKG1hdHJUcmFuc2xhdGUodmVjMyh4LCAwLCB5KSkubXVsKHdvcmxkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBwdXRQaXhlbCh4LCB5LCBjKSB7XHJcbiAgICB0aGlzLmltYWdlLnNldFBpeGVsQ29sb3IoeCwgeSwgYyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1nVG9Db250ZXh0MmQoY2FudmFzLCBjb250ZXh0LCBpbWFnZSkge1xyXG4gIGxldCBmcmFjdyA9IE1hdGguZmxvb3IoY2FudmFzLndpZHRoIC8gaW1hZ2UuYml0bWFwLndpZHRoKTtcclxuICBsZXQgZnJhY2ggPSBNYXRoLmZsb29yKGNhbnZhcy5oZWlnaHQgLyBpbWFnZS5iaXRtYXAuaGVpZ2h0KTtcclxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGltYWdlLmJpdG1hcC5oZWlnaHQ7IHkrKylcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgaW1hZ2UuYml0bWFwLndpZHRoOyB4KyspIHtcclxuICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQShpbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBgcmdiYSgke2Mucn0sICR7Yy5nfSwgJHtjLmJ9LCAxLjApYDtcclxuICAgICAgY29udGV4dC5maWxsUmVjdCh4ICogZnJhY3csIHkgKiBmcmFjaCwgZnJhY3csIGZyYWNoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi9wbGF0L3BsYXRcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzXCI7XHJcblxyXG5jb25zdCBob3N0ID0gXCJsb2NhbGhvc3RcIjtcclxuY29uc3QgcG9ydCA9IFwiODAwMFwiO1xyXG5sZXQgdXNlck5hbWU7XHJcbmxldCBwbGF5ZXJzUG9vbCA9IHt9O1xyXG5sZXQgbWFpblJlbmRlcjtcclxubGV0IGF2YXRhcnMgPSB7fTtcclxubGV0IHNoYWRlcnMgPSB7fTtcclxubGV0IG1hdGVyaWFscyA9IHt9O1xyXG5sZXQgcHJpbXMgPSB7fTtcclxubGV0IHdlYlNvY2tldDtcclxubGV0IHRleDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3c0luaXQocmVuZGVyKSB7XHJcbiAgICB1c2VyTmFtZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG5cclxuICAgIG1haW5SZW5kZXIgPSByZW5kZXI7XHJcbiAgICBsZXQgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcclxuICAgIHdlYlNvY2tldCA9IHNvY2tldDtcclxuXHJcbiAgICB0ZXggPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2VtLmpwZ1wiKTtcclxuXHJcbiAgICBzb2NrZXQub25vcGVuID0gZSA9PiBvbkNvbm5lY3Rpb24oc29ja2V0LCBlKTtcclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBlID0+IG9uTWVzc2FnZShzb2NrZXQsIEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBvbkludGVydmFsKHNvY2tldCksIDEpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb25Db25uZWN0aW9uKHNvY2tldCwgbSkge1xyXG4gICAgY29uc29sZS5sb2coXCJoZWxsbyBmcm9tIGNsaWVudFwiKTtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjb25uZWN0ZWRcIiB9KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uTWVzc2FnZShzb2NrZXQsIG0pIHtcclxuICAgIGlmIChtLnR5cGUgPT0gXCJwbGF5ZXJzXCIpIHtcclxuICAgICAgICBwbGF5ZXJzUG9vbCA9IG0ucGxheWVycztcclxuICAgICAgICBmb3IgKGxldCBwIGluIG0ucGxheWVycykge1xyXG4gICAgICAgICAgICBpZiAoYXZhdGFyc1twXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMTogSGFzaCB5b3VyIGVtYWlsIGFkZHJlc3MgdXNpbmcgU0hBLTI1Ni5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hlZEVtYWlsID0gQ3J5cHRvSlMuU0hBMjU2KG0ucGxheWVyc1twXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVwIDI6IENvbnN0cnVjdCB0aGUgR3JhdmF0YXIgVVJMLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JhdmF0YXJVcmwgPSBgaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8ke2hhc2hlZEVtYWlsfWA7XHJcbiAgICAgICAgICAgICAgICBhdmF0YXJzW3BdID0gbWFpblJlbmRlci5uZXdUZXh0dXJlKGBodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaGVkRW1haWx9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNoYWRlcnNbcF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZXJzW3BdID0gbWFpblJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmltc1twXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNoYWRlcnNbcF0gPSBtYWluUmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNbcF0gPSBzaGFkZXJzW3BdLm5ld01hdGVyaWFsKHZlYzMoMC4xKSxcclxuICAgICAgICAgICAgICAgICAgICB2ZWMzKDEsIDAuMSwgMC4xKSxcclxuICAgICAgICAgICAgICAgICAgICB2ZWMzKDAuMyksXHJcbiAgICAgICAgICAgICAgICAgICAgOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgMS4wXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzW3BdLmF0dGFjaFRleHR1cmUodGV4LCAwKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc1twXS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZyA9IG5ldyBGaWd1cmUoKTtcclxuICAgICAgICAgICAgICAgIGZpZy5zZXRDdWJlKCk7XHJcbiAgICAgICAgICAgICAgICBwcmltc1twXSA9IGZpZy5tYWtlUHJpbShtYXRlcmlhbHNbcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0udHlwZSA9PSBcInNoYWRlclwiKSB7XHJcbiAgICAgICAgLyppZiAoc2hhZGVyc1ttLmlkXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2hhZGVyc1ttLmlkXSA9IG1haW5SZW5kZXIubmV3U2hhZGVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICBwcmltc1ttLmlkXS5tdGwuc2hkLnVwZGF0ZShtLnNvdXJjZSwgXCJmcmFnXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25JbnRlcnZhbChzb2NrZXQpIHtcclxuICAgIC8vIFNlbmRpbmcgY29vcmRzIHRvIHRoZSBzZXJ2ZXJcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjb29yZHNcIiwgaWQ6IHVzZXJOYW1lLCBjb29yZHM6IHsgdHJhbnM6IG1haW5SZW5kZXIuY29udHJvbC50cmFuc2Zvcm0sIHBvczogbWFpblJlbmRlci5jb250cm9sLnBvc2l0aW9uIH0gfSkpO1xyXG4gICAgLy8gQXNraW5nIGZvciBnZXR0aW5nIGNvb3JkcyBmcm9tIHNlcnZlclxyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcImdldF9jb29yZHNcIiB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIHsgcGxheWVyczogcGxheWVyc1Bvb2wsIGlkOiB1c2VyTmFtZSwgYXZhdGFyczogYXZhdGFycywgcHJpbXM6IHByaW1zIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZW5kT2JqZWN0KG9iamVjdCkge1xyXG4gICAgb2JqZWN0LmlkID0gdXNlck5hbWU7XHJcbiAgICB3ZWJTb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcclxufSIsImltcG9ydCB7IG1hdDQsIG1hdHJSb3RhdGUsIG1hdHJUcmFuc2xhdGUgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjM1wiO1xyXG5pbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4vZ2VuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFiaXJpbnQge1xyXG4gICAgY29uc3RydWN0b3IocmVuZGVyLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIHRoaXMucm9vbXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMS5wbmdcIiksXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMi5wbmdcIiksXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMy5wbmdcIilcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMudmVydCA9IFtuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvdmVydC5wbmdcIildO1xyXG4gICAgICAgIHRoaXMuaG9yeiA9IFtuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvaG9yei5wbmdcIildO1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgSmltcC5yZWFkKGZpbGVOYW1lLCAoZXJyLCBpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gaW1hZ2UuYml0bWFwLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5ICs9IDIpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHggKz0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuciA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuZyA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzFdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuYiA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzJdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMjU1ICYmIGMuZyA9PSAyNTUgJiYgYy5iID09IDI1NSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRbMF0ucmVuZGVyKG1hdHJUcmFuc2xhdGUodmVjMygxMCAqIHgsIDAsIDEwICogeSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5ICs9IDIpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHggKz0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuciA9PSAyNTUgJiYgYy5nID09IDI1NSAmJiBjLmIgPT0gMjU1KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9yelswXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBzZW5kT2JqZWN0IH0gZnJvbSBcIi4vd3NcIjtcclxuXHJcbmxldCB0ZXh0QXJlYTtcclxubGV0IGJ1dHRvbkFwcGx5O1xyXG5sZXQgc2hhZGVyO1xyXG5sZXQgY29kZUFyZWE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhZGVyVXBkYXRlSW5pdChfc2hhZGVyKSB7XHJcbiAgY29kZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZGVBcmVhXCIpO1xyXG4gIHRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0QXJlYVwiKTtcclxuICBidXR0b25BcHBseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwbHlcIik7XHJcbiAgYnV0dG9uQXBwbHkub25jbGljayA9IG9uQXBwbHk7XHJcbiAgc2hhZGVyID0gX3NoYWRlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gb25BcHBseSgpIHtcclxuICBjb25zdCBzb3VyY2UgPSB0ZXh0QXJlYS52YWx1ZTtcclxuICBzaGFkZXIudXBkYXRlKHNvdXJjZSwgXCJmcmFnXCIpO1xyXG4gIHNlbmRPYmplY3QoeyB0eXBlOiBcInNoYWRlclwiLCBzb3VyY2U6IHRleHRBcmVhLnZhbHVlIH0pO1xyXG59XHJcblxyXG5gI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuXHJcbm91dCB2ZWM0IE91dENvbG9yO1xyXG5cclxuaW4gdmVjMyBEcmF3UG9zO1xyXG5pbiB2ZWMzIERyYXdOb3JtYWw7XHJcbmluIHZlYzIgRHJhd1RleENvb3JkO1xyXG5cclxudW5pZm9ybSBzYW1wbGVyMkQgdVRleDtcclxuXHJcbnVuaWZvcm0gdV9tYXRlcmlhbCB7XHJcbiAgICB2ZWM0IEthNDtcclxuICAgIHZlYzQgS2RUcmFucztcclxuICAgIHZlYzQgS3NQaDtcclxuICAgIHZlYzQgVGV4RmxhZ3M7XHJcbn07XHJcblxyXG4jZGVmaW5lIEthIEthNC54eXpcclxuI2RlZmluZSBLZCBLZFRyYW5zLnh5elxyXG4jZGVmaW5lIFRyYW5zIEtkVHJhbnMud1xyXG4jZGVmaW5lIEtzIEtzUGgueHl6XHJcbiNkZWZpbmUgUGggS3NQaC53XHJcblxyXG51bmlmb3JtIGZsb2F0IFRpbWU7XHJcblxyXG52ZWMyIENtcGxNdWxDbXBsKCB2ZWMyIEEsIHZlYzIgQiApXHJcbntcclxuICByZXR1cm4gdmVjMihBLnggKiBCLnggLSBBLnkgKiBCLnksIEEueCAqIEIueSArIEEueSAqIEIueCk7XHJcbn1cclxuXHJcbnZvaWQgbWFpbih2b2lkKSB7XHJcbiAgICBpbnQgbiA9IDA7ICBcclxuICAgIHZlYzIgWiwgWjA7XHJcblxyXG4gICAgWiA9IChEcmF3VGV4Q29vcmQgLSAwLjUpICogMi4wO1xyXG4gICAgWjAgPSBaO1xyXG5cclxuICAgIHdoaWxlIChuIDwgMjU1ICYmIGRvdChaLCBaKSA8IDQuMClcclxuICAgIHtcclxuICAgICAgWiA9IENtcGxNdWxDbXBsKFosIFopOyBcclxuICAgICAgWiA9IFogKyBaMDtcclxuICAgICAgbisrO1xyXG4gICAgfVxyXG4gICAgdmVjMyBjb2xvciA9IHZlYzModmVjMyh2ZWMzKGZsb2F0KG4pIC8gMjUwLjAsIGZsb2F0KG4pIC8gMjMwLjAsIGZsb2F0KG4pIC8gMjQwLjApKSk7XHJcbiAgICBcclxuICAgIHZlYzMgTCA9IC1ub3JtYWxpemUodmVjMygwLjVmLCAwLjdmLCAwLjNmKSk7XHJcbiAgICB2ZWMzIE4gPSBub3JtYWxpemUoRHJhd05vcm1hbCk7XHJcbiAgICB2ZWMyIHQgPSBEcmF3VGV4Q29vcmQ7XHJcblxyXG4gICAgTiA9IGZhY2Vmb3J3YXJkKE4sIG5vcm1hbGl6ZShEcmF3UG9zKSwgTik7XHJcblxyXG4gICAgZmxvYXQgayA9IGRvdChMLCBub3JtYWxpemUoTikpO1xyXG5cclxuICAgIHZlYzMgUiwgViA9IHZlYzMoMCwgMCwgLTEpO1xyXG5cclxuICAgIFIgPSByZWZsZWN0KFYsIE4pO1xyXG4gICAgY29sb3IgKz0gS3MgKiBtYXgoMC4wMWYsIHBvdyhkb3QoUiwgTCksIFBoKSk7XHJcblxyXG4gICAgLy9PdXRDb2xvciA9IHZlYzQoS2EsIDEuMGYpO1xyXG4gICAgT3V0Q29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xyXG4gICAgLy9pZihUZXhGbGFncy54ICE9IDAuMGYpXHJcbiAgICAvLyAgICBPdXRDb2xvciA9IHZlYzQodGV4dHVyZSh1VGV4LCBnbF9GcmFnQ29vcmQueHkgLyB2ZWMyKDQwMC4wZiwgNDAwLjBmKSkucmdiLCAxLjBmKTtcclxuICAgIC8vT3V0Q29sb3IgPSB2ZWM0KE4sIDEuMCk7XHJcbn1gIiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4vcm5kL3JuZC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSwgbWF0clNjYWxlIH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIjtcclxuaW1wb3J0IHsgRmlndXJlIH0gZnJvbSBcIi4vcGxhdC9wbGF0LmpzXCI7XHJcbmltcG9ydCB7IFJvb20sIGltZ1RvQ29udGV4dDJkIH0gZnJvbSBcIi4vZ2VuL2dlbi5qc1wiO1xyXG5pbXBvcnQgeyBDb250cm9sIH0gZnJvbSBcIi4vY3RybC9jdHJsLmpzXCI7XHJcbmltcG9ydCB7IHdzSW5pdCwgb25JbnRlcnZhbCwgZ2V0UGxheWVycyB9IGZyb20gXCIuL3dzLmpzXCI7XHJcbmltcG9ydCB7IExhYmlyaW50IH0gZnJvbSBcIi4vZ2VuL2xhYi5qc1wiO1xyXG5pbXBvcnQgeyBzaGFkZXJVcGRhdGVJbml0IH0gZnJvbSBcIi4vc2hkX3VwZC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBsZXQgZmlndXJlID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGZpZ3VyZS5zZXREb2RlY2FoZWRyb24oKTtcclxuXHJcbiAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZyYW1lXCIpO1xyXG4gIGxldCByZW5kZXIgPSBuZXcgUmVuZGVyKGNhbnZhcyk7XHJcbiAgd3NJbml0KHJlbmRlcik7XHJcbiAgbGV0IHNoYWRlciA9IHJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gIHNoYWRlclVwZGF0ZUluaXQoc2hhZGVyKTtcclxuICBsZXQgdGV4ID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9lbS5qcGdcIik7XHJcbiAgcmVuZGVyLnNldENhbSh2ZWMzKDUsIDUsIDUpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBsZXQgbGFiID0gbmV3IExhYmlyaW50KHJlbmRlciwgXCIuL2Jpbi9sYWJzL2RlZi5wbmdcIik7XHJcbiAgbGV0IHBsX210bCA9IHNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgIHZlYzMoMC4xKSxcclxuICAgIHZlYzMoMSwgMC4xLCAwLjEpLFxyXG4gICAgdmVjMygwLjMpLFxyXG4gICAgOTAsXHJcbiAgICAxLjBcclxuICApO1xyXG4gIHBsX210bC5hdHRhY2hUZXh0dXJlKHRleCwgMCk7XHJcbiAgcGxfbXRsLnVwZGF0ZSgpO1xyXG4gIGxldCBmID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGYuc2V0Q3ViZSgpO1xyXG4gIGxldCBwbF9wciA9IGYubWFrZVByaW0ocGxfbXRsKTtcclxuXHJcbiAgY2FudmFzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiI3RleHRBcmVhXCIpLnNsaWRlVXAoKTtcclxuICAgICQoJyNhcHBseScpLnNsaWRlVXAoKTtcclxuICAgICQoJyNtYWluRnJhbWUnKS5jc3MoeyAnd2lkdGgnOiAnMTAwdncnIH0pO1xyXG4gICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gIH07XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcclxuICAgIGlmIChlLmNvZGUgPT0gJ1RhYicpIHtcclxuICAgICAgJChcIiN0ZXh0QXJlYVwiKS5zbGlkZURvd24oKTtcclxuICAgICAgJCgnI2FwcGx5Jykuc2xpZGVEb3duKCk7XHJcbiAgICAgICQoJyNtYWluRnJhbWUnKS5jc3MoeyAnd2lkdGgnOiAnODB2dycgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vbGV0IHNreSA9IHJlbmRlci5uZXdTa3lTcGhlcmUoXCIuL2Jpbi90ZXh0dXJlcy9zcGFjZS5wbmdcIik7XHJcbiAgbGV0IHNreSA9IHJlbmRlci5uZXdTa3lTcGhlcmUoXCIuL2Jpbi90ZXh0dXJlcy93YXRlci5qcGdcIik7XHJcblxyXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICBsZXQgcCA9IGdldFBsYXllcnMoKTtcclxuXHJcbiAgICByZW5kZXIucmVuZGVyU3RhcnQoKTtcclxuICAgIGZvciAobGV0IHBsYXllciBpbiBwLnBsYXllcnMpIHtcclxuICAgICAgaWYgKHAuaWQgIT0gcGxheWVyKSB7XHJcbiAgICAgICAgcC5wcmltc1twbGF5ZXJdLm10bC5hdHRhY2hUZXh0dXJlKHAuYXZhdGFyc1twbGF5ZXJdLCAwKTtcclxuICAgICAgICBwLnByaW1zW3BsYXllcl0ucmVuZGVyKG1hdDQocC5wbGF5ZXJzW3BsYXllcl0uY29vcmRzLnRyYW5zKS5tdWwoXHJcbiAgICAgICAgICBtYXRyVHJhbnNsYXRlKHAucGxheWVyc1twbGF5ZXJdLmNvb3Jkcy5wb3MpXHJcbiAgICAgICAgKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3ByaW0ucmVuZGVyKFxyXG4gICAgLy8gIG1hdHJSb3RhdGUocmVuZGVyLnRpbWVyLmxvY2FsVGltZSwgdmVjMygwLCAxLCAxKSkubXVsKFxyXG4gICAgLy8gICAgbWF0clRyYW5zbGF0ZSh2ZWMzKDAsIDAsIDApKVxyXG4gICAgLy8gIClcclxuICAgIC8vKTtcclxuICAgIHNreS5yZW5kZXIobWF0NCgxKSk7XHJcbiAgICBsYWIucmVuZGVyKCk7XHJcbiAgICByZW5kZXIucmVuZGVyRW5kKCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gIH07XHJcbiAgZHJhdygpO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gbWFpbjtcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sS0FBSyxDQUFDO0lBQ1osSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsS0FBSztBQUNMO0lBQ0EsSUFBSSxJQUFJLEdBQUc7SUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsR0FBRztJQUNWLFFBQVEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxLQUFLO0FBQ0w7SUFDQSxJQUFJLElBQUksR0FBRztJQUNYLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCO0lBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLFlBQVksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7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QyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUYsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDN0YsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLFNBQVMsQ0FBQztJQUNWLEtBQUs7QUFDTDtJQUNBLElBQUksY0FBYyxHQUFHO0lBQ3JCLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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QUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDdEMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEtBQUs7QUFDTDtJQUNBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNYLFFBQVEsT0FBTyxJQUFJO0lBQ25CLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkgsS0FBSztBQUNMO0lBQ0EsSUFBSSxTQUFTLEdBQUc7SUFDaEIsUUFBUSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLFNBQVMsSUFBSTtJQUNwQixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsRUFBRTtJQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTO0lBQ3BDLFFBQVEsT0FBTyxJQUFJLEtBQUs7SUFDeEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLElBQUksT0FBTyxHQUFHLElBQUksUUFBUTtJQUM5QixRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELFlB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Q0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4QixLQUFLLENBQUM7SUFDTixDQUFDO0FBVUQ7SUFDTyxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNqRSxJQUFJLE9BQU8sSUFBSTtJQUNmLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDL0MsS0FBSyxDQUFDO0lBQ04sQ0FBQztBQUNEO0lBQ08sU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7SUFDdkMsSUFBSTtJQUNKLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ2hDLFFBQVEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3JDLFFBQVEs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LENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRztJQUNBLFVBQVM7SUFDVCxLQUFLO0lBQ0wsSUFBSSxRQUFRLEdBQUc7SUFDZixRQUFRLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDL0UsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUM5RjtJQUNBO0lBQ0E7SUFDQTtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2xDO0lBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDakMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNsSCxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ25DLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxD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QUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsUUFBUSxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxRQUFRLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsS0FBSztJQUNMOztJQ2xJTyxNQUFNLE1BQU0sQ0FBQztJQUNwQixJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQUs7QUFDTDtJQUNBLElBQUksT0FBTyxHQUFHO0lBQ2QsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHO0lBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BHLFNBQVMsQ0FBQztJQUNWLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRztJQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNy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Q25ELFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUMzRTtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFO0lBQ0EsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFNBQVM7QUFDVDtJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ELFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FB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SUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3hCO0lBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QztJQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLFlBQVk7SUFDWixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDdEMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7SUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0lBQ0EsWUFBWSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxH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
