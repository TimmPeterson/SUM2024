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
        this.mtl = this.shader.newMaterial(
          vec3(0.1),
          vec3(1, 0.5, 1.0),
          vec3(0.3),
          90,
          0.7
        );
        this.tex = render.newTexture("./bin/textures/em.jpg");
        this.mtl.attachTexture(this.tex, 0);
        this.mtl.update();
        this.mtl1 = this.shader.newMaterial(
          vec3(0.1),
          vec3(1, 0.5, 1.0),
          vec3(0.3),
          90,
          1.0
        );
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
      //shader.update(src, "frag");
      shaderUpdateInit(shader);
      /*let material = shader.newMaterial(
        vec3(0.1),
        vec3(0, 0.5, 1.0),
        vec3(0.3),
        90,
        1.0
      );*/
      /*
      let material1 = shader.newMaterial(
        vec3(0.1),
        vec3(1, 0.5, 1.0),
        vec3(0.3),
        90,
        0.5
      );
      let prim = figure.makePrim(material);
      material1.attachTexture(tex, 0);
      material1.update();
      */
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

      /*
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
      */

      canvas.onclick = function () {
        $("#textArea").slideUp();
        $('#apply').slideUp();
        $('#mainFrame').css({ 'width': '100vw' });
        canvas.requestPointerLock();
      };

      // window.addEventListener("dblclick", e => {
      //   if (e.button == 1) {
      //     $("#textArea").slideDown();
      //     $('#apply').slideDown();
      //     $('#mainFrame').css({ 'width': '80vw' });
      //   }
      // });
      window.addEventListener("keydown", e => {
        if (e.code == 'Tab') {
          $("#textArea").slideDown();
          $('#apply').slideDown();
          $('#mainFrame').css({ 'width': '80vw' });
        }
      });
      /*$('html').on('keypress', (e) => {
        if (e.code == 'KeyZ') {
          $("#textArea").slideDown();
          $('#apply').slideDown();
          $('#mainFrame').css({ 'width': '80vw' });
          canvas.requestPointerLock();
        }
      });*/

      //let sky = render.newSkySphere("./bin/textures/space.png");
      //let sky = render.newSkySphere("./bin/textures/water.jpg");

      const draw = () => {
        let p = getPlayers();

        render.renderStart();
        for (let player in p.players) {
          if (p.id != player) {
            p.prims[player].mtl.attachTexture(p.avatars[player], 0);
            p.prims[player].render(mat4(p.players[player].coords.trans).mul(
              matrTranslate(p.players[player].coords.pos)
            ));
            /*
            pl_pr.mtl.shd = p.shaders[player];
            pl_pr.mtl.attachTexture(p.avatars[player], 0);
            pl_pr.render(
              mat4(p.players[player].coords.trans).mul(
                matrTranslate(p.players[player].coords.pos)
              )
            );*/
          }
        }

        //prim.render(
        //  matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(
        //    matrTranslate(vec3(0, 0, 0))
        //  )
        //);
        lab.render();
        render.renderEnd();
        window.requestAnimationFrame(draw);
      };
      draw();
    }

    window.onload = main;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC92ZWMzLmpzIiwiLi4vc3JjL210aC92ZWMyLmpzIiwiLi4vc3JjL210aC9tYXQ0LmpzIiwiLi4vc3JjL3JuZC9yZXMvYnVmLmpzIiwiLi4vc3JjL3RpbWVyL3RpbWVyLmpzIiwiLi4vc3JjL3JuZC9yZXMvcHJpbS5qcyIsIi4uL3NyYy9ybmQvcmVzL210bC5qcyIsIi4uL3NyYy9ybmQvcmVzL3NoZC5qcyIsIi4uL3NyYy9ybmQvcmVzL3RleC5qcyIsIi4uL3NyYy9jdHJsL2N0cmwuanMiLCIuLi9zcmMvcm5kL3JuZC5qcyIsIi4uL3NyYy9wbGF0L3BsYXQuanMiLCIuLi9zcmMvZ2VuL2dlbi5qcyIsIi4uL3NyYy93cy5qcyIsIi4uL3NyYy9nZW4vbGFiLmpzIiwiLi4vc3JjL3NoZF91cGQuanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBfdmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzMoMCk7XHJcblxyXG4gICAgICAgIGlmIChsZW4gPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2KGxlbik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHYpIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChrKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzModGhpcy54ICogaywgdGhpcy55ICogaywgdGhpcy56ICogayk7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KGspIHtcclxuICAgICAgICByZXR1cm4gdmVjMyh0aGlzLnggLyBrLCB0aGlzLnkgLyBrLCB0aGlzLnogLyBrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3Qodikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3Modikge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSxcclxuICAgICAgICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxyXG4gICAgICAgICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bG1hdHIobSkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy54ICogbS5hWzBdWzNdICtcclxuICAgICAgICAgICAgdGhpcy55ICogbS5hWzFdWzNdICtcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzJdWzNdICtcclxuICAgICAgICAgICAgbS5hWzNdWzNdO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjMyhcclxuICAgICAgICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSArIG0uYVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAodGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdICsgbS5hWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICh0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl0gKyBtLmFbM11bMl0pIC8gdywpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShtKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVswXSArIHRoaXMueSAqIG0uYVsxXVswXSArIHRoaXMueiAqIG0uYVsyXVswXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzFdICsgdGhpcy55ICogbS5hWzFdWzFdICsgdGhpcy56ICogbS5hWzJdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMl0gKyB0aGlzLnkgKiBtLmFbMV1bMl0gKyB0aGlzLnogKiBtLmFbMl1bMl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLnggKiBtLmFbMF1bMF0gKyB0aGlzLnkgKiBtLmFbMV1bMF0gKyB0aGlzLnogKiBtLmFbMl1bMF0gKyBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMueCAqIG0uYVswXVsxXSArIHRoaXMueSAqIG0uYVsxXVsxXSArIHRoaXMueiAqIG0uYVsyXVsxXSArIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy54ICogbS5hWzBdWzJdICsgdGhpcy55ICogbS5hWzFdWzJdICsgdGhpcy56ICogbS5hWzJdWzJdICsgbS5hWzNdWzJdXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lYXJpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoeCwgeSwgeikge1xyXG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoMCwgMCwgMCk7XHJcbiAgICBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMzKHgueCwgeC55LCB4LnopO1xyXG4gICAgaWYgKHkgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBuZXcgX3ZlYzMoeCwgeCwgeCk7XHJcbiAgICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59XHJcbiIsImNsYXNzIF92ZWMyIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMyKHgsIHkpIHtcclxuICAgIGlmICh5ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZWMyKHgsIHgpO1xyXG4gICAgcmV0dXJuIG5ldyBfdmVjMih4LCB5KTtcclxufSIsImNsYXNzIF9tYXQ0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcclxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXHJcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzM1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hID0gW1thMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdXTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwobSkge1xyXG4gICAgICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVswXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzBdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzBdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbMF1bM10gKiBtLmFbM11bM10sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVswXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVswXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICsgdGhpcy5hWzFdWzFdICogbS5hWzFdWzFdICsgdGhpcy5hWzFdWzJdICogbS5hWzJdWzFdICsgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gKyB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMl0gKyB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMl0gKyB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVszXSArIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVszXSArIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzBdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzBdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMV0gKyB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gKyB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMV0gKyB0aGlzLmFbMl1bM10gKiBtLmFbM11bMV0sXHJcbiAgICAgICAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVsyXSArIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsyXSArIHRoaXMuYVsyXVszXSAqIG0uYVszXVsyXSxcclxuICAgICAgICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzNdICsgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICsgdGhpcy5hWzJdWzJdICogbS5hWzJdWzNdICsgdGhpcy5hWzJdWzNdICogbS5hWzNdWzNdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMF0gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMF0gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bMF0sXHJcbiAgICAgICAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVsxXSArIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsxXSArIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArIHRoaXMuYVszXVszXSAqIG0uYVszXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzJdICsgdGhpcy5hWzNdWzFdICogbS5hWzFdWzJdICsgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICsgdGhpcy5hWzNdWzNdICogbS5hWzNdWzJdLFxyXG4gICAgICAgICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bM10gKyB0aGlzLmFbM11bMV0gKiBtLmFbMV1bM10gKyB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gKyB0aGlzLmFbM11bM10gKiBtLmFbM11bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVhcml6ZSgpIHtcclxuICAgICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMuYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXQ0KFxyXG4gICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgYTEwLCBhMTEsIGExMiwgYTEzLFxyXG4gICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxyXG4gICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbikge1xyXG4gICAgaWYgKGEwMCA9PSAxICYmIGEwMSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgICAgIGEwMC5hWzBdWzBdLCBhMDAuYVswXVsxXSwgYTAwLmFbMF1bMl0sIGEwMC5hWzBdWzNdLFxyXG4gICAgICAgICAgICBhMDAuYVsxXVswXSwgYTAwLmFbMV1bMV0sIGEwMC5hWzFdWzJdLCBhMDAuYVsxXVszXSxcclxuICAgICAgICAgICAgYTAwLmFbMl1bMF0sIGEwMC5hWzJdWzFdLCBhMDAuYVsyXVsyXSwgYTAwLmFbMl1bM10sXHJcbiAgICAgICAgICAgIGEwMC5hWzNdWzBdLCBhMDAuYVszXVsxXSwgYTAwLmFbM11bMl0sIGEwMC5hWzNdWzNdXHJcbiAgICAgICAgKTtcclxuICAgIHJldHVybiBuZXcgX21hdDQoXHJcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxyXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcclxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0clJvdGF0ZShhbmdsZSwgYXhpcykge1xyXG4gICAgbGV0XHJcbiAgICAgICAgYSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MC4wLFxyXG4gICAgICAgIHNpID0gTWF0aC5zaW4oYW5nbGUpLCBjbyA9IE1hdGguY29zKGFuZ2xlKSxcclxuICAgICAgICB2ID0gYXhpcy5ub3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgY28gKyB2LnggKiB2LnggKiAoMSAtIGNvKSxcclxuICAgICAgICB2LnggKiB2LnkgKiAoMSAtIGNvKSArIHYueiAqIHNpLFxyXG4gICAgICAgIHYueCAqIHYueiAqICgxIC0gY28pIC0gdi55ICogc2ksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB2LnkgKiB2LnggKiAoMSAtIGNvKSAtIHYueiAqIHNpLFxyXG4gICAgICAgIGNvICsgdi55ICogdi55ICogKDEgLSBjbyksXHJcbiAgICAgICAgdi55ICogdi56ICogKDEgLSBjbykgKyB2LnggKiBzaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHYueiAqIHYueCAqICgxIC0gY28pICsgdi55ICogc2ksXHJcbiAgICAgICAgdi56ICogdi55ICogKDEgLSBjbykgLSB2LnggKiBzaSxcclxuICAgICAgICBjbyArIHYueiAqIHYueiAqICgxIC0gY28pLFxyXG4gICAgICAgIDAsIDAsIDAsIDAsIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVHJhbnNsYXRlKHQpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDEsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIHQueCwgdC55LCB0LnosIDFcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyU2NhbGUocykge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcy54LCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIHMueSwgMCwgMCxcclxuICAgICAgICAwLCAwLCBzLnosIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMVxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0ckZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KFxyXG4gICAgICAgIDIgKiBuZWFyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgMiAqIG5lYXIgLyAodG9wIC0gYm90dG9tKSwgMCwgMCxcclxuICAgICAgICAocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpLCAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAtMSxcclxuICAgICAgICAwLCAwLCAtMiAqIG5lYXIgKiBmYXIgLyAoZmFyIC0gbmVhciksIDBcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyVmlldyhsb2MsIGF0LCB1cDEpIHtcclxuICAgIGxldFxyXG4gICAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm0oKSxcclxuICAgICAgICByaWdodCA9IGRpci5jcm9zcyh1cDEpLm5vcm0oKSxcclxuICAgICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybSgpO1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgICAgcmlnaHQueCwgdXAueCwgLWRpci54LCAwLFxyXG4gICAgICAgIHJpZ2h0LnksIHVwLnksIC1kaXIueSwgMCxcclxuICAgICAgICByaWdodC56LCB1cC56LCAtZGlyLnosIDAsXHJcbiAgICAgICAgLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdCh1cCksIGxvYy5kb3QoZGlyKSwgMVxyXG4gICAgKTtcclxufSIsImNsYXNzIF9idWZmZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm5kLCB0eXBlLCBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ybmQgPSBybmQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgICAgLy8gQnVmZmVyIHR5cGUgKGdsLioqKl9CVUZGRVIpXHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTsgICAgLy8gQnVmZmVyIHNpemUgaW4gYnl0ZXNcclxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgICAgICBpZiAoc2l6ZSA9PSAwIHx8IHR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pZCA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5iaW5kQnVmZmVyKHR5cGUsIHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJ1ZmZlckRhdGEodHlwZSwgc2l6ZSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucm5kLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLnJuZC5nbC5idWZmZXJTdWJEYXRhKHRoaXMudHlwZSwgMCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmlmb3JtQnVmZmVyIGV4dGVuZHMgX2J1ZmZlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIG5hbWUsIHNpemUsIGJpbmRQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKHJuZCwgcm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYmluZFBvaW50ID0gYmluZFBvaW50OyAvLyBCdWZmZXIgR1BVIGJpbmRpbmcgcG9pbnRcclxuICAgIH1cclxuXHJcbiAgICBhcHBseShzaGQpIHtcclxuICAgICAgICBpZiAodGhpcy5ybmQgPT0gdW5kZWZpbmVkIHx8IHNoZC5wcmcgPT0gdW5kZWZpbmVkIHx8IHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2hkLnJuZC5nbC51bmlmb3JtQmxvY2tCaW5kaW5nKHNoZC5wcmcsIHNoZC51bmlmb3JtQmxvY2tzW3RoaXMubmFtZV0uaW5kZXgsIHRoaXMuYmluZFBvaW50KTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXJCYXNlKHNoZC5ybmQuZ2wuVU5JRk9STV9CVUZGRVIsIHRoaXMuYmluZFBvaW50LCB0aGlzLmlkKTtcclxuICAgIH1cclxufSIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gVGltZXIgY2xhc3MgbW9kdWxlXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHRoaXMubG9jYWxUaW1lID0gdGhpcy5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5GUFMgPSAzMC4wO1xyXG4gICAgICAgIHRoaXMucGF1c2VUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBnbG9iYWwgdGltZSBmdW50aW9uXHJcbiAgICBnZXRUaW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCB0ID1cclxuICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRNaW51dGVzKCkgKiA2MDtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2V0IGN1cnJlbnQgRlBTIGZ1bmN0aW9uXHJcbiAgICBnZXRGUFMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRlBTLnRvRml4ZWQoMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VFbmJhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZURpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2VTd2l0Y2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcG9uc2UgdGltZXIgZnVuY3Rpb25cclxuICAgIHJlc3BvbnNlKHRhZ19pZCA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXMuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbFRpbWUgPSB0O1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgKz0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gdGhpcy5nbG9iYWxEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxUaW1lID0gdCAtIHRoaXMucGF1c2VUaW1lIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlcisrO1xyXG4gICAgICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xyXG4gICAgICAgICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFRpbWVGUFMgPSB0O1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ19pZCkuaW5uZXJIVE1MID0gdGhpcy5nZXRGUFMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IHQ7XHJcbiAgICB9O1xyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IHZlYzIgfSBmcm9tIFwiLi4vLi4vbXRoL3ZlYzIuanNcIlxyXG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uLy4uL210aC9tYXQ0LmpzXCJcclxuXHJcbmNsYXNzIF92ZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBub3JtLCB0ZXgpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLm5vcm0gPSBub3JtO1xyXG4gICAgICAgIHRoaXMudGV4ID0gdGV4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KHBvcywgbm9ybSwgdGV4KSB7XHJcbiAgICBpZiAodGV4ID09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbmV3IF92ZXJ0ZXgocG9zLCBub3JtLCB2ZWMyKDApKTtcclxuICAgIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0sIHRleCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgIGxldCBpO1xyXG5cclxuICAgIC8qIFNldCBhbGwgdmVydGV4IG5vcm1hbHMgdG8gemVybyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZWMzKDApO1xyXG5cclxuICAgIC8qIEV2YWwgbm9ybWFsIGZvciBldmVyeSBmYWNldCAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGluZGljaWVzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG4wID0gaW5kaWNpZXNbaV0sIG4xID0gaW5kaWNpZXNbaSArIDFdLCBuMiA9IGluZGljaWVzW2kgKyAyXTtcclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgcDAgPSB2ZXJ0ZXhlc1tuMF0ucG9zLFxyXG4gICAgICAgICAgICBwMSA9IHZlcnRleGVzW24xXS5wb3MsXHJcbiAgICAgICAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvcyxcclxuICAgICAgICAgICAgTiA9IHAxLnN1YihwMCkuY3Jvc3MocDIuc3ViKHAwKSkubm9ybSgpO1xyXG5cclxuICAgICAgICB2ZXJ0ZXhlc1tuMF0ubm9ybSA9IHZlcnRleGVzW24wXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybSA9IHZlcnRleGVzW24xXS5ub3JtLmFkZChOKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tuMl0ubm9ybSA9IHZlcnRleGVzW24yXS5ub3JtLmFkZChOKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBOb3JtYWxpemUgYWxsIHZlcnRleCBub3JtYWxzICovXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVydGV4ZXNbaV0ubm9ybS5ub3JtKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmltIHtcclxuICAgIGNyZWF0ZShzaGQsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIGxldCB0cmltYXNoID0gW10sIGkgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gWy4uLnZlcnRleGVzXTtcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gWy4uLmluZGljaWVzXTtcclxuICAgICAgICB0aGlzLnNoZCA9IHNoZDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNoZC5wcmcgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBhdXRvTm9ybWFscyh2ZXJ0ZXhlcywgaW5kaWNpZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB2IG9mIHZlcnRleGVzKSB7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLnk7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYucG9zLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYubm9ybS54O1xyXG4gICAgICAgICAgICB0cmltYXNoW2krK10gPSB2Lm5vcm0ueTtcclxuICAgICAgICAgICAgdHJpbWFzaFtpKytdID0gdi5ub3JtLno7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lng7XHJcbiAgICAgICAgICAgIHRyaW1hc2hbaSsrXSA9IHYudGV4Lnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleEFycmF5SWQgPSBzaGQucm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICB0aGlzLnZlcnRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgc2hkLnJuZC5nbC5iaW5kQnVmZmVyKHNoZC5ybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodHJpbWFzaCksIHNoZC5ybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NMb2MgIT0gLTEgJiYgdGhpcy5ub3JtTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHNoZC5ybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGQucG9zTG9jLCAzLCBzaGQucm5kLmdsLkZMT0FULCBmYWxzZSwgMzIsIDApO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5wb3NMb2MpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoc2hkLm5vcm1Mb2MsIDMsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMTIpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC5ub3JtTG9jKTtcclxuICAgICAgICAgICAgc2hkLnJuZC5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoZC50ZXhMb2MsIDIsIHNoZC5ybmQuZ2wuRkxPQVQsIGZhbHNlLCAzMiwgMjQpO1xyXG4gICAgICAgICAgICBzaGQucm5kLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHNoZC50ZXhMb2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5JbmRleEJ1ZmZlcklkID0gc2hkLnJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJpbmRCdWZmZXIoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5JbmRleEJ1ZmZlcklkKTtcclxuICAgICAgICBzaGQucm5kLmdsLmJ1ZmZlckRhdGEoc2hkLnJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQzMkFycmF5KGluZGljaWVzKSwgc2hkLnJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIHRoaXMubnVtT2ZFbGVtZW50cyA9IGluZGljaWVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtdGwsIHZlcnRleGVzLCBpbmRpY2llcykge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbWF0NCgxKTtcclxuICAgICAgICBpZiAoaW5kaWNpZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXRsID0gbXRsO1xyXG4gICAgICAgICAgICB0aGlzLnNoZCA9IG10bC5zaGQ7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbU9iaihtdGwsIHZlcnRleGVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm10bCA9IG10bDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUobXRsLnNoZCwgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXRsLlRyYW5zICE9IDEuMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQudHJhbnNwYXJlbnRzLnB1c2goeyBwcmltOiB0aGlzLCB3b3JsZDogd29ybGQgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVjcmVhdGluZyBwcmltaXRpdmUgaWYgaXQgd2Fzbid0IGNyZWF0ZWRcclxuICAgICAgICAvLyAoYmVjYXVzZSBvZiBzaGFkZXIgYXN5bmMgaW5pdGlhbGl6YXRpb24pXHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhd2luZyBwcmltaXRpdmUgaWYgc2hhZGVyIGlzIGxvYWRlZFxyXG4gICAgICAgIGlmICh0aGlzLm10bC5hcHBseSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5wcmltVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KHRoaXMudHJhbnNmb3JtLm11bCh3b3JsZCkubGluZWFyaXplKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuYmluZEJ1ZmZlcih0aGlzLnNoZC5ybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSW5kZXhCdWZmZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5kcmF3RWxlbWVudHModGhpcy5zaGQucm5kLmdsLlRSSUFOR0xFUywgdGhpcy5udW1PZkVsZW1lbnRzLCB0aGlzLnNoZC5ybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTm93KHdvcmxkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hkLnByZyAhPSBudWxsICYmIHRoaXMubG9hZGVkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKHRoaXMuc2hkLCB0aGlzLnZlcnRleGVzLCB0aGlzLmluZGljaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdGwuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQucHJpbVVCTy51cGRhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLnRyYW5zZm9ybS5tdWwod29ybGQpLmxpbmVhcml6ZSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hkLnJuZC5nbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0ZXhBcnJheUlkKTtcclxuICAgICAgICAgICAgdGhpcy5zaGQucm5kLmdsLmJpbmRCdWZmZXIodGhpcy5zaGQucm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLkluZGV4QnVmZmVySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNoZC5ybmQuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuc2hkLnJuZC5nbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtZW50cywgdGhpcy5zaGQucm5kLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZyb21PYmoobXRsLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIGxldCB2dHggPSBbXTtcclxuICAgICAgICBsZXQgZmlsZSA9IGF3YWl0IGZldGNoKGBiaW4vbW9kZWxzLyR7ZmlsZU5hbWV9Lm9iamApO1xyXG4gICAgICAgIGxldCBzcmMgPSBhd2FpdCBmaWxlLnRleHQoKTtcclxuICAgICAgICBsZXQgbGluZXMgPSBzcmMuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5pbmRpY2llcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVbMF0gPT0gJ3YnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rcyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva3NbaV0gPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB2LnB1c2gocGFyc2VGbG9hdCh0b2tzW2ldKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdnR4LnB1c2godmVjMyh2WzBdLCB2WzFdLCB2WzJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godmVydGV4KHZlYzModlswXSwgdlsxXSwgdlsyXSkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lWzBdID09ICdmJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva3MgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmVydHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMTsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdmVydGV4KHZ0eFtwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNpZXMucHVzaChwYXJzZUludCh0b2tzW3RdLnNwbGl0KCcvJylbMF0pIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnZlcnRleGVzLnB1c2godik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmluZGljaWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmluZGljaWVzLnB1c2goaSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKG10bC5zaGQsIHRoaXMudmVydGV4ZXMsIHRoaXMuaW5kaWNpZXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7IFVuaWZvcm1CdWZmZXIgfSBmcm9tIFwiLi9idWYuanNcIlxyXG5pbXBvcnQgeyBQcmltIH0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5cclxuLy8gQ2xhc3MgZm9yIGhvbGRpbmcgbWF0ZXJpYWwgcHJvcGVydGllcyBvZiBwcmltaXRpdmUuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaGQsIEthLCBLZCwgS3MsIFBoLCBUcmFucykge1xyXG4gICAgICAgIHRoaXMuc2hkID0gc2hkO1xyXG4gICAgICAgIHRoaXMuS2EgPSBLYTtcclxuICAgICAgICB0aGlzLktkID0gS2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IEtzO1xyXG4gICAgICAgIHRoaXMuUGggPSBQaDtcclxuICAgICAgICB0aGlzLlRyYW5zID0gVHJhbnM7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlcyA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuXHJcbiAgICAgICAgdGhpcy5VQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLnNoZC5ybmQsIFwidV9tYXRlcmlhbFwiLCAxNiAqIDQsIDMpO1xyXG4gICAgICAgIC8vdGhpcy5VQk8udXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IHRleF9mbGFncyA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuS2EubGluZWFyaXplKCkuY29uY2F0KFswXSwgdGhpcy5LZC5saW5lYXJpemUoKSwgW3RoaXMuVHJhbnNdLCB0aGlzLktzLmxpbmVhcml6ZSgpLCBbdGhpcy5QaF0pXHJcblxyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgNDsgdCsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1t0XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGV4X2ZsYWdzW3RdID0gMTtcclxuXHJcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRleF9mbGFncyk7XHJcblxyXG4gICAgICAgIHRoaXMuVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGQuYXBwbHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLlVCTy5hcHBseSh0aGlzLnNoZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDQ7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbdF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVzW3RdLmFwcGx5KHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaFRleHR1cmUodGV4dHVyZSwgbnVtKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IDMgfHwgbnVtIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRleHR1cmVzW251bV0gPSB0ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1ByaW1pdGl2ZSh2ZXJ0ZXhlcywgaW5kaWNpZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByaW0odGhpcywgdmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufTtcclxuXHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4vbXRsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuICBjb25zdHJ1Y3RvcihybmQsIG5hbWUpIHtcclxuICAgIHRoaXMucm5kID0gcm5kO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucHJnID0gbnVsbDtcclxuICAgIHRoaXMudG1wU291cnNlID0geyB2ZXJ0OiBudWxsLCBmcmFnOiBudWxsIH07XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfaW5pdCgpIHtcclxuICAgIHRoaXMuc2hhZGVycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIHR5cGU6IHRoaXMucm5kLmdsLlZFUlRFWF9TSEFERVIsXHJcbiAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgc3JjOiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5ybmQuZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICAgIG5hbWU6IFwiZnJhZ1wiLFxyXG4gICAgICAgIHNyYzogXCJcIixcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBmb3IgKGNvbnN0IHMgb2YgdGhpcy5zaGFkZXJzKSB7XHJcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke3RoaXMubmFtZX0vJHtzLm5hbWV9Lmdsc2xgKTtcclxuICAgICAgbGV0IHNyYyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIikgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkge1xyXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgIHMuaWQgPSB0aGlzLnJuZC5nbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5ybmQuZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcclxuICAgICAgaWYgKCF0aGlzLnJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgdGhpcy5ybmQuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMucm5kLmdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcmcgPSB0aGlzLnJuZC5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICBpZiAocy5pZCAhPSBudWxsKSB0aGlzLnJuZC5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcmcsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJuZC5nbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcbiAgICBpZiAoIXRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcmcsIHRoaXMucm5kLmdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICBsZXQgYnVmID0gdGhpcy5ybmQuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcmcpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJ2ZXJ0XCJdLCBcInZlcnRcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1widmVydFwiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdICE9IG51bGwpIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy50bXBTb3Vyc2VbXCJmcmFnXCJdLCBcImZyYWdcIik7XHJcbiAgICAgIHRoaXMudG1wU291cnNlW1wiZnJhZ1wiXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XHJcbiAgICB0aGlzLnBvc0xvYyA9IHRoaXMucm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJnLCBcIkluUG9zaXRpb25cIik7XHJcbiAgICB0aGlzLm5vcm1Mb2MgPSB0aGlzLnJuZC5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByZywgXCJJbk5vcm1hbFwiKTtcclxuICAgIHRoaXMudGV4TG9jID0gdGhpcy5ybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcmcsIFwiSW5UZXhDb29yZFwiKTtcclxuXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLnJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKFxyXG4gICAgICB0aGlzLnByZyxcclxuICAgICAgdGhpcy5ybmQuZ2wuQUNUSVZFX1VOSUZPUk1TXHJcbiAgICApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcmcsIGkpO1xyXG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XHJcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXHJcbiAgICAgICAgbG9jOiB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIGluZm8ubmFtZSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXHJcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IHRoaXMucm5kLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIoXHJcbiAgICAgIHRoaXMucHJnLFxyXG4gICAgICB0aGlzLnJuZC5nbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1NcclxuICAgICk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybUJsb2NrczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGJsb2NrX25hbWUgPSB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMucHJnLCBpKTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJuZC5nbC5nZXRVbmlmb3JtQmxvY2tJbmRleCh0aGlzLnByZywgYmxvY2tfbmFtZSk7XHJcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxyXG4gICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICBzaXplOiB0aGlzLnJuZC5nbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIoXHJcbiAgICAgICAgICB0aGlzLnByZyxcclxuICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgdGhpcy5ybmQuZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkVcclxuICAgICAgICApLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMucm5kLmdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcihcclxuICAgICAgICAgIHRoaXMucHJnLFxyXG4gICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICB0aGlzLnJuZC5nbC5VTklGT1JNX0JMT0NLX0JJTkRJTkdcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucm5kLm1hdHJpeFVCTy5hcHBseSh0aGlzKTtcclxuICAgIHRoaXMucm5kLnByaW1VQk8uYXBwbHkodGhpcyk7XHJcbiAgICB0aGlzLnJuZC50aW1lVUJPLmFwcGx5KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHkoKSB7XHJcbiAgICBpZiAodGhpcy5wcmcgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJuZC5nbC51c2VQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyB0eXBlOiBcInZlcnRcIiBvciBcImZyYWdcIlxyXG4gIHVwZGF0ZShzb3VyY2UsIHR5cGUpIHtcclxuICAgIGxldCBuO1xyXG4gICAgaWYgKHR5cGUgPT0gXCJ2ZXJ0XCIpIG4gPSAwO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcImZyYWdcIikgbiA9IDE7XHJcbiAgICBlbHNlIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFkZXJzW25dLmlkID09IG51bGwpIHtcclxuICAgICAgdGhpcy50bXBTb3Vyc2VbdHlwZV0gPSBzb3VyY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJuZC5nbC5zaGFkZXJTb3VyY2UodGhpcy5zaGFkZXJzW25dLmlkLCBzb3VyY2UpO1xyXG4gICAgICB0aGlzLnJuZC5nbC5jb21waWxlU2hhZGVyKHRoaXMuc2hhZGVyc1tuXS5pZCk7XHJcbiAgICAgIHRoaXMucm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJnKTtcclxuICAgICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXdNYXRlcmlhbChhbWJpZW50LCBkaWZmdXNlLCBzcGVjdWxhciwgcGhvbmcsIHRyYW5zKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdGVyaWFsKHRoaXMsIGFtYmllbnQsIGRpZmZ1c2UsIHNwZWN1bGFyLCBwaG9uZywgdHJhbnMpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihybmQsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gcm5kLmdsO1xyXG5cclxuICAgICAgICB0aGlzLnJuZCA9IHJuZDtcclxuICAgICAgICB0aGlzLnRleElkID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dElkKTtcclxuICAgICAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDE7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTtcclxuICAgICAgICBjb25zdCBib3JkZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XHJcbiAgICAgICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XHJcbiAgICAgICAgY29uc3QgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKTsgLy8gb3BhcXVlIGJsdWVcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICBsZXZlbCxcclxuICAgICAgICAgICAgaW50ZXJuYWxGb3JtYXQsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgc3JjRm9ybWF0LFxyXG4gICAgICAgICAgICBzcmNUeXBlLFxyXG4gICAgICAgICAgICBwaXhlbCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY0Zvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNyY1R5cGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Bvd2VyT2YyKGltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKGltYWdlLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFllcywgaXQncyBhIHBvd2VyIG9mIDIuIEdlbmVyYXRlIG1pcHMuXHJcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vLCBpdCdzIG5vdCBhIHBvd2VyIG9mIDIuIFR1cm4gb2ZmIG1pcHMgYW5kIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxyXG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCJcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkobnVtKSB7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLnJuZC5nbC5URVhUVVJFMCArIG51bSk7XHJcbiAgICAgICAgdGhpcy5ybmQuZ2wuYmluZFRleHR1cmUodGhpcy5ybmQuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXhJZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwiaW1wb3J0IHsgbWF0clJvdGF0ZSB9IGZyb20gXCIuLi9tdGgvbWF0NFwiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcikge1xyXG4gICAgICAgIHRoaXMuZm9yd2FyZCA9IHZlYzMoMCwgMCwgMSk7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IHZlYzMoMSwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy51cCA9IHZlYzMoMCwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHZlYzMoMCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSAzLjA7XHJcbiAgICAgICAgdGhpcy5zZW5zZSA9IDAuMDAyMjtcclxuICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICB0aGlzLmtleVRhYiA9IHt9O1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbWF0NCgxKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IDMwLjA7XHJcblxyXG4gICAgICAgIHJlbmRlci5jYW52YXMub25tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b25zID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvdy5vbmtleWRvd24gPSBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSAxMC4wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gXCJLZXlBXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5QVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleURcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlXXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlTXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5U1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU2hpZnRMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU2hpZnRMZWZ0XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIlNwYWNlXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd2luZG93Lm9ua2V5dXAgPSBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSBcIktleUFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlBXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVRhYltcIktleURcIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT0gXCJLZXlXXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiS2V5V1wiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJLZXlTXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU2hpZnRMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5VGFiW1wiU2hpZnRMZWZ0XCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUYWJbXCJTcGFjZVwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkID0gdGhpcy5mb3J3YXJkLm11bG1hdHIobWF0clJvdGF0ZSgtZS5tb3ZlbWVudFggKiB0aGlzLnNlbnNlLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLnJpZ2h0Lm11bG1hdHIobWF0clJvdGF0ZSgtZS5tb3ZlbWVudFggKiB0aGlzLnNlbnNlLCB2ZWMzKDAsIDEsIDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCA9IHRoaXMuZm9yd2FyZC5tdWxtYXRyKG1hdHJSb3RhdGUoZS5tb3ZlbWVudFkgKiB0aGlzLnNlbnNlLCB0aGlzLnJpZ2h0KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtLm11bChtYXRyUm90YXRlKC1lLm1vdmVtZW50WCAqIHRoaXMuc2Vuc2UsIHZlYzMoMCwgMSwgMCkpKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybS5tdWwobWF0clJvdGF0ZShlLm1vdmVtZW50WSAqIHRoaXMuc2Vuc2UsIHRoaXMucmlnaHQpKTtcclxuICAgICAgICAgICAgLy90aGlzLnVwID0gdGhpcy51cC5tdWxtYXRyKG1hdHJSb3RhdGUoZS5tb3ZlbWVudFkgKiB0aGlzLnNlbnNlLCB0aGlzLnJpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzcG9uc2UoKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSAtPSB0aGlzLmFjY2VsZXJhdGlvbiAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5ICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIC8qaWYgKHRoaXMudmVsb2NpdHkgPCAwICYmIHRoaXMucG9zaXRpb24ueSA+PSAyLjUpIHtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmVsb2NpdHkgPiAwICYmIHRoaXMucG9zaXRpb24ueSA8IDIuNSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5ICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPCAyLjUpXHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IDIuNTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMua2V5VGFiW1wiS2V5QVwiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5yaWdodC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIktleURcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc3ViKHRoaXMucmlnaHQubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfSBpZiAodGhpcy5rZXlUYWJbXCJLZXlXXCJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh2ZWMzKHRoaXMuZm9yd2FyZC54LCAwLCB0aGlzLmZvcndhcmQueikubm9ybSgpLm11bCh0aGlzLm1vdmVTcGVlZCAqIHRoaXMucmVuZGVyLnRpbWVyLmdsb2JhbERlbHRhVGltZSkpO1xyXG4gICAgICAgIH0gaWYgKHRoaXMua2V5VGFiW1wiS2V5U1wiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5zdWIodmVjMyh0aGlzLmZvcndhcmQueCwgMCwgdGhpcy5mb3J3YXJkLnopLm5vcm0oKS5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIlNoaWZ0TGVmdFwiXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5zdWIodGhpcy51cC5tdWwodGhpcy5tb3ZlU3BlZWQgKiB0aGlzLnJlbmRlci50aW1lci5nbG9iYWxEZWx0YVRpbWUpKTtcclxuICAgICAgICB9IGlmICh0aGlzLmtleVRhYltcIlNwYWNlXCJdKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMudXAubXVsKHRoaXMubW92ZVNwZWVkICogdGhpcy5yZW5kZXIudGltZXIuZ2xvYmFsRGVsdGFUaW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyLnNldENhbSh0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLmZvcndhcmQpLCB0aGlzLnVwKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL210aC92ZWMyLmpzXCJcclxuaW1wb3J0IHsgbWF0NCwgbWF0ckZydXN0dW0sIG1hdHJWaWV3IH0gZnJvbSBcIi4uL210aC9tYXQ0LmpzXCJcclxuaW1wb3J0IHsgVW5pZm9ybUJ1ZmZlciB9IGZyb20gXCIuL3Jlcy9idWYuanNcIlxyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuLi90aW1lci90aW1lci5qc1wiXHJcbmltcG9ydCB7IFNoYWRlciB9IGZyb20gXCIuL3Jlcy9zaGQuanNcIlxyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcIi4vcmVzL3RleC5qc1wiXHJcbmltcG9ydCB7IHZlcnRleCB9IGZyb20gXCIuL3Jlcy9wcmltLmpzXCJcclxuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCIuLi9jdHJsL2N0cmwuanNcIlxyXG5cclxuLy8gR2VuZXJhbCBjbGFzcyBmb3IgcmVuZGVyaW5nLlxyXG4vLyBPbmUgcmVuZGVyIHBlciBjYW52YXMuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gICAgdHJhbnNwYXJlbnRzID0gW107XHJcblxyXG4gICAgc2V0RnJ1c3R1bSgpIHtcclxuICAgICAgICBsZXQgbSA9IG1hdDQoMSk7XHJcbiAgICAgICAgbGV0IHJ4ID0gdGhpcy5wcm9qU2l6ZSwgcnkgPSB0aGlzLnByb2pTaXplO1xyXG5cclxuICAgICAgICAvKiBDb3JyZWN0IGFzcGVjdCByYXRpbyAqL1xyXG4gICAgICAgIGlmICh0aGlzLndpZHRoID49IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICByeCAqPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByeSAqPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMubWF0clByb2ogPSBtYXRyRnJ1c3R1bSgtcnggLyAyLCByeCAvIDIsIC1yeSAvIDIsIHJ5IC8gMiwgdGhpcy5wcm9qRGlzdCwgdGhpcy5mYXJDbGlwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDYW0obG9jLCBhdCwgdXApIHtcclxuICAgICAgICB0aGlzLm1hdHJWaWV3ID0gbWF0clZpZXcobG9jLCBhdCwgdXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXRyaXhlcygpIHtcclxuICAgICAgICBsZXQgcmlnaHQgPSB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMF1bMF0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsxXVswXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzJdWzBdXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgdXAgPSB2ZWMzKFxyXG4gICAgICAgICAgICB0aGlzLm1hdHJWaWV3LmFbMF1bMV0sXHJcbiAgICAgICAgICAgIHRoaXMubWF0clZpZXcuYVsxXVsxXSxcclxuICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5hWzJdWzFdKTtcclxuICAgICAgICBsZXQgZGlyID0gdmVjMygtdGhpcy5tYXRyVmlldy5hWzBdWzJdLFxyXG4gICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5hWzFdWzJdLFxyXG4gICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5hWzJdWzJdKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1hdHJQcm9qLmxpbmVhcml6ZSgpLmNvbmNhdCh0aGlzLm1hdHJWaWV3LmxpbmVhcml6ZSgpKTtcclxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZGlyLmxpbmVhcml6ZSgpLCBbMF0sIHJpZ2h0LmxpbmVhcml6ZSgpLCBbMF0sIHVwLmxpbmVhcml6ZSgpLCBbMF0pO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChbdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgdGhpcy5wcm9qU2l6ZSwgdGhpcy5wcm9qRGlzdF0pO1xyXG4gICAgICAgIHRoaXMubWF0cml4VUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sLnJlc3BvbnNlKCk7XHJcblxyXG4gICAgICAgIC8vdGhpcy50aW1lVUJPLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KFt0aGlzLnRpbWVyLmxvY2FsVGltZSwgdGhpcy50aW1lci5sb2NhbERlbHRhVGltZSwgdGhpcy50aW1lci5nbG9iYWxUaW1lLCB0aGlzLnRpbWVyLmdsb2JhbERlbHRhVGltZV0pKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnRyYW5zcGFyZW50cykge1xyXG4gICAgICAgICAgICAgICAgcC5wcmltLnJlbmRlck5vdyhwLndvcmxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5CTEVORCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IGNhbWVyYSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5wcm9qU2l6ZSA9IDAuMjtcclxuICAgICAgICB0aGlzLnByb2pEaXN0ID0gMC4xO1xyXG4gICAgICAgIHRoaXMuZmFyQ2xpcCA9IDMwMDtcclxuXHJcbiAgICAgICAgLy8gRXZhbHVhdGluZyBjYW52YXMgc2l6ZVxyXG4gICAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0ICsgMTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3AgKyAxO1xyXG5cclxuICAgICAgICAvLyBHZXR0aW5nIEdMIGNvbnRleHRcclxuICAgICAgICB0aGlzLmdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwge1xyXG4gICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbHBoYTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC45LCAwLjksIDAuOSwgMSk7XHJcbiAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuXHJcbiAgICAgICAgLy8gQ29udG9sIGluaXRcclxuICAgICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgQ29udHJvbCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIGNhbWVyYVxyXG4gICAgICAgIHRoaXMubWF0cml4VUJPID0gbmV3IFVuaWZvcm1CdWZmZXIodGhpcywgXCJ1X2NhbWVyYVwiLCAxNiAqIDQgKiAyICsgNCAqIDE2LCAwKTtcclxuICAgICAgICB0aGlzLnNldEZydXN0dW0oKTtcclxuICAgICAgICB0aGlzLnNldENhbSh2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDAsIC0xKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXhlcygpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXppbmcgcHJpbSB1Ym9cclxuICAgICAgICB0aGlzLnByaW1VQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLCBcInVfcHJpbWl0aXZlXCIsIDE2ICogNCwgMSk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemluZyB0aW1lclxyXG4gICAgICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuICAgICAgICB0aGlzLnRpbWVVQk8gPSBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLCBcInVfdGltZVwiLCAxNiwgMik7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3U2hhZGVyKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaGFkZXIodGhpcywgZmlsZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1RleHR1cmUoZmlsZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRleHR1cmUodGhpcywgZmlsZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1VuaWZvcm1CdWZmZXIoYnVmZmVyTmFtZSwgYnVmZmVyU2l6ZSwgYmluZGluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgVW5pZm9ybUJ1ZmZlcih0aGlzLCBidWZmZXJOYW1lLCBidWZmZXJTaXplLCBiaW5kaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdTa3lTcGhlcmUodGV4TmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHZlcnRleGVzID0gW3ZlcnRleCh2ZWMzKC0xLCAtMSwgMC45OTkpLCB2ZWMzKDApKSwgdmVydGV4KHZlYzMoLTEsIDMsIDAuOTk5KSwgdmVjMygwKSksIHZlcnRleCh2ZWMzKDMsIC0xLCAwLjk5OSksIHZlYzMoMCkpXTtcclxuICAgICAgICBjb25zdCBpbmRpY2llcyA9IFswLCAxLCAyXTtcclxuICAgICAgICBjb25zdCBzaGQgPSB0aGlzLm5ld1NoYWRlcihcInNreSBzcGhlcmVcIik7XHJcbiAgICAgICAgY29uc3QgbXRsID0gc2hkLm5ld01hdGVyaWFsKHZlYzMoMCksIHZlYzMoMCksIHZlYzMoMCksIDAsIDEuMCk7XHJcbiAgICAgICAgY29uc3QgdGV4ID0gdGhpcy5uZXdUZXh0dXJlKHRleE5hbWUpO1xyXG4gICAgICAgIG10bC5hdHRhY2hUZXh0dXJlKHRleCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIG10bC5uZXdQcmltaXRpdmUodmVydGV4ZXMsIGluZGljaWVzKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUHJpbSwgdmVydGV4IH0gZnJvbSBcIi4uL3JuZC9yZXMvcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uL210aC92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IHZlYzIgfSBmcm9tIFwiLi4vbXRoL3ZlYzIuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWd1cmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1YmUoKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgLTAuNSksIHZlYzMoLTAuNSwgMC41LCAtMC41KSwgdmVjMygwLjUsIDAuNSwgLTAuNSksIHZlYzMoMC41LCAtMC41LCAtMC41KV0sICAvLyBmcm9udFxyXG4gICAgICAgICAgICBbdmVjMygtMC41LCAtMC41LCAwLjUpLCB2ZWMzKC0wLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIDAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSldLCAgICAgIC8vIGJhY2tcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgLTAuNSksIHZlYzMoLTAuNSwgLTAuNSwgMC41KSwgdmVjMygtMC41LCAwLjUsIDAuNSksIHZlYzMoLTAuNSwgMC41LCAtMC41KV0sICAvLyBsZWZ0XHJcbiAgICAgICAgICAgIFt2ZWMzKDAuNSwgLTAuNSwgLTAuNSksIHZlYzMoMC41LCAtMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAwLjUpLCB2ZWMzKDAuNSwgMC41LCAtMC41KV0sICAgICAgLy8gcmlnaHRcclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgLTAuNSwgLTAuNSksIHZlYzMoLTAuNSwgLTAuNSwgMC41KSwgdmVjMygwLjUsIC0wLjUsIDAuNSksIHZlYzMoMC41LCAtMC41LCAtMC41KV0sICAvLyBib3R0b21cclxuICAgICAgICAgICAgW3ZlYzMoLTAuNSwgMC41LCAtMC41KSwgdmVjMygtMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIDAuNSksIHZlYzMoMC41LCAwLjUsIC0wLjUpXSwgICAgICAvLyB0b3BcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMudGV4Q29vcmRzID0gW1xyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgICAgICBbdmVjMigwLCAwKSwgdmVjMigwLCAxKSwgdmVjMigxLCAxKSwgdmVjMigxLCAwKV0sXHJcbiAgICAgICAgICAgIFt2ZWMyKDAsIDApLCB2ZWMyKDAsIDEpLCB2ZWMyKDEsIDEpLCB2ZWMyKDEsIDApXSxcclxuICAgICAgICAgICAgW3ZlYzIoMCwgMCksIHZlYzIoMCwgMSksIHZlYzIoMSwgMSksIHZlYzIoMSwgMCldLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGV0cmFoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHNxcnQzID0gTWF0aC5zcXJ0KDMuMCksIHNxcnQyID0gTWF0aC5zcXJ0KDIuMCk7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICB0b3AgPSB2ZWMzKDAsIHNxcnQyIC8gc3FydDMsIDApLFxyXG4gICAgICAgICAgICBmcm9udCA9IHZlYzMoMCwgMCwgc3FydDMgLyAzLjApLFxyXG4gICAgICAgICAgICBsZWZ0ID0gdmVjMygtMC41LCAwLCAtc3FydDMgLyA2LjApLFxyXG4gICAgICAgICAgICByaWdodCA9IHZlYzMoMC41LCAwLCAtc3FydDMgLyA2LjApO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRleGVzID0gW1xyXG4gICAgICAgICAgICBbbGVmdCwgZnJvbnQsIHRvcF0sIC8vIGJvdFxyXG4gICAgICAgICAgICBbbGVmdCwgcmlnaHQsIHRvcF0sXHJcbiAgICAgICAgICAgIFtyaWdodCwgZnJvbnQsIHRvcF0sXHJcbiAgICAgICAgICAgIFtmcm9udCwgcmlnaHQsIGxlZnRdXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRPY3RhaGVkcm9uKCkge1xyXG4gICAgICAgIGxldCBzcXJ0MyA9IE1hdGguc3FydCgzLjApLCBzcXJ0MiA9IE1hdGguc3FydCgyLjApO1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgdG9wID0gdmVjMygwLCAxIC8gc3FydDIsIDApLFxyXG4gICAgICAgICAgICBib3QgPSB0b3AubXVsKC0xKSxcclxuICAgICAgICAgICAgbGYgPSB2ZWMzKC0wLjUsIDAsIDAuNSksXHJcbiAgICAgICAgICAgIGxiID0gdmVjMygtMC41LCAwLCAtMC41KSxcclxuICAgICAgICAgICAgcmYgPSB2ZWMzKDAuNSwgMCwgMC41KSxcclxuICAgICAgICAgICAgcmIgPSB2ZWMzKDAuNSwgMCwgLTAuNSk7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSBbXHJcbiAgICAgICAgICAgIFtib3QsIGxmLCByZl0sXHJcbiAgICAgICAgICAgIFtib3QsIGxmLCBsYl0sXHJcbiAgICAgICAgICAgIFtib3QsIGxiLCByYl0sXHJcbiAgICAgICAgICAgIFtib3QsIHJmLCByYl0sXHJcbiAgICAgICAgICAgIFt0b3AsIGxmLCByZl0sXHJcbiAgICAgICAgICAgIFt0b3AsIGxmLCBsYl0sXHJcbiAgICAgICAgICAgIFt0b3AsIGxiLCByYl0sXHJcbiAgICAgICAgICAgIFt0b3AsIHJmLCByYl0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJY29oZWRyb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBsYXllcjEgPSBbXTtcclxuICAgICAgICBsZXQgbGF5ZXIyID0gW107XHJcblxyXG4gICAgICAgIGxldCByID0gMC41IC8gTWF0aC5zaW4oMzYgLyAxODAgKiBNYXRoLlBJKTtcclxuICAgICAgICBsZXQgZCA9IE1hdGguc3FydCgxIC0gTWF0aC5wb3coMiAqIE1hdGguc2luKDAuMSAqIE1hdGguUEkpICogciwgMikpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzYwOyBpICs9IDcyKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IGkgLyAxODAuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjMyhyICogTWF0aC5zaW4oYW5nbGUpLCByICogTWF0aC5jb3MoYW5nbGUpLCAtZCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXIxLnB1c2gocCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSA3Mikge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAoaSArIDM2KSAvIDE4MC4wICogTWF0aC5QSTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKHIgKiBNYXRoLnNpbihhbmdsZSksIHIgKiBNYXRoLmNvcyhhbmdsZSksIGQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyMi5wdXNoKHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHRvcCA9IHZlYzMoMCwgMCwgciksXHJcbiAgICAgICAgICAgIGJvdCA9IHRvcC5tdWwoLTEpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJpMSA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIxW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjJbKGkgKyA0KSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaCh0cmkxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyaTIgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyMltpXSxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIxWyhpICsgMSkgJSA1XVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2godHJpMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2FwMSA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgYm90LCBsYXllcjFbaV0sIGxheWVyMVsoaSArIDEpICUgNV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChjYXAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhcDIgPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCwgbGF5ZXIyW2ldLCBsYXllcjJbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleGVzLnB1c2goY2FwMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXREb2RlY2FoZWRyb24oKSB7XHJcbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQoNTAgKyAxMCAqIE1hdGguc3FydCg1KSkgLyAxMDtcclxuICAgICAgICBsZXQgUiA9IDAuMjUgKiAoMSArIE1hdGguc3FydCg1KSkgKiBNYXRoLnNxcnQoMyk7XHJcbiAgICAgICAgbGV0IHIwID0gciAqIDIgKiBNYXRoLmNvcygoMzYgLyAxODAgKiBNYXRoLlBJKSk7XHJcblxyXG4gICAgICAgIGxldCBlZGdlMSA9IFtdO1xyXG4gICAgICAgIGxldCBlZGdlMiA9IFtdO1xyXG4gICAgICAgIGxldCBsYXllcjEgPSBbXTtcclxuICAgICAgICBsZXQgbGF5ZXIyID0gW107XHJcblxyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KFIgKiBSIC0gciAqIHIpO1xyXG4gICAgICAgIGxldCBkMCA9IE1hdGguc3FydChSICogUiAtIHIwICogcjApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSA3Mikge1xyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgICAgIGExID0gaSAvIDE4MCAqIE1hdGguUEksXHJcbiAgICAgICAgICAgICAgICBhMiA9IChpICsgMzYpIC8gMTgwICogTWF0aC5QSTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwMSA9IHZlYzMociAqIE1hdGguc2luKGExKSwgciAqIE1hdGguY29zKGExKSwgZCk7XHJcbiAgICAgICAgICAgIGxldCBwMiA9IHZlYzMociAqIE1hdGguc2luKGEyKSwgciAqIE1hdGguY29zKGEyKSwgLWQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGwxID0gdmVjMyhyMCAqIE1hdGguc2luKGExKSwgcjAgKiBNYXRoLmNvcyhhMSksIGQwKTtcclxuICAgICAgICAgICAgbGV0IGwyID0gdmVjMyhyMCAqIE1hdGguc2luKGEyKSwgcjAgKiBNYXRoLmNvcyhhMiksIC1kMCk7XHJcblxyXG4gICAgICAgICAgICBlZGdlMS5wdXNoKHAxKTtcclxuICAgICAgICAgICAgZWRnZTIucHVzaChwMik7XHJcblxyXG4gICAgICAgICAgICBsYXllcjEucHVzaChsMSk7XHJcbiAgICAgICAgICAgIGxheWVyMi5wdXNoKGwyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMucHVzaChlZGdlMSk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKGVkZ2UyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN1cmZhY2UxID0gW1xyXG4gICAgICAgICAgICAgICAgZWRnZTFbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjFbKGkgKyAxKSAlIDVdLFxyXG4gICAgICAgICAgICAgICAgZWRnZTFbKGkgKyAxKSAlIDVdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgbGV0IHN1cmZhY2UyID0gW1xyXG4gICAgICAgICAgICAgICAgZWRnZTJbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjJbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjFbaV0sXHJcbiAgICAgICAgICAgICAgICBsYXllcjJbKGkgKyA0KSAlIDVdLFxyXG4gICAgICAgICAgICAgICAgZWRnZTJbKGkgKyA0KSAlIDVdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHN1cmZhY2UxKTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhlcy5wdXNoKHN1cmZhY2UyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnZlcnRleGVzID0gW2VkZ2UxLCBsYXllcjEsIGxheWVyMiwgZWRnZTJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXIoKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2V0RG9kZWNhaGVkcm9uKCk7XHJcblxyXG4gICAgICAgIGxldCB2ZXJ0cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGV4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHAgPSB2ZWMzKDApO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLnZlcnRleGVzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBwID0gcC5hZGQodik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcCA9IHAuZGl2KDUpO1xyXG4gICAgICAgICAgICBwID0gcC5tdWwoMyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHJpcyA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bMF0sIHRoaXMudmVydGV4ZXNbaV1bMV0sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzFdLCB0aGlzLnZlcnRleGVzW2ldWzJdLCBwXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy52ZXJ0ZXhlc1tpXVsyXSwgdGhpcy52ZXJ0ZXhlc1tpXVszXSwgcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMudmVydGV4ZXNbaV1bM10sIHRoaXMudmVydGV4ZXNbaV1bNF0sIHBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnZlcnRleGVzW2ldWzRdLCB0aGlzLnZlcnRleGVzW2ldWzBdLCBwXSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdmVydHMucHVzaCh0cmlzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4ZXMgPSB2ZXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUHJpbShtdGwpIHtcclxuICAgICAgICBsZXQgaW5kaWNpZXMgPSBbXTtcclxuICAgICAgICBsZXQgdmVydGV4ZXMgPSBbXTtcclxuICAgICAgICBsZXQgaiA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgdGhpcy52ZXJ0ZXhlcy5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICBsZXQgZWRnZSA9IHRoaXMudmVydGV4ZXNbZV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXhDb29yZHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2IGluIGVkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhlcy5wdXNoKHZlcnRleChlZGdlW3ZdLCB2ZWMzKDApLCB0aGlzLnRleENvb3Jkc1tlXVt2XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBpbiBlZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4ZXMucHVzaCh2ZXJ0ZXgoZWRnZVt2XSwgdmVjMygwKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IGVkZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGljaWVzLnB1c2goaiArIDApO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgaSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNpZXMucHVzaChqICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaiArPSBlZGdlLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJpbShtdGwsIHZlcnRleGVzLCBpbmRpY2llcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBtYXQ0LCBtYXRyVHJhbnNsYXRlIH0gZnJvbSBcIi4uL210aC9tYXQ0XCI7XHJcbmltcG9ydCB7IEZpZ3VyZSB9IGZyb20gXCIuLi9wbGF0L3BsYXQuanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjMy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvb20ge1xyXG4gIGNvbnN0cnVjdG9yKHJlbmRlciwgZmlsZU5hbWUpIHtcclxuICAgIHRoaXMubWFwO1xyXG4gICAgdGhpcy5ibG9ja3MgPSBbXTtcclxuXHJcbiAgICB0aGlzLnNoYWRlciA9IHJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gICAgdGhpcy5tdGwgPSB0aGlzLnNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgICAgdmVjMygwLjEpLFxyXG4gICAgICB2ZWMzKDEsIDAuNSwgMS4wKSxcclxuICAgICAgdmVjMygwLjMpLFxyXG4gICAgICA5MCxcclxuICAgICAgMC43XHJcbiAgICApO1xyXG4gICAgdGhpcy50ZXggPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2VtLmpwZ1wiKTtcclxuICAgIHRoaXMubXRsLmF0dGFjaFRleHR1cmUodGhpcy50ZXgsIDApO1xyXG4gICAgdGhpcy5tdGwudXBkYXRlKCk7XHJcbiAgICB0aGlzLm10bDEgPSB0aGlzLnNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgICAgdmVjMygwLjEpLFxyXG4gICAgICB2ZWMzKDEsIDAuNSwgMS4wKSxcclxuICAgICAgdmVjMygwLjMpLFxyXG4gICAgICA5MCxcclxuICAgICAgMS4wXHJcbiAgICApO1xyXG4gICAgdGhpcy50ZXgxID0gcmVuZGVyLm5ld1RleHR1cmUoXCIuL2Jpbi90ZXh0dXJlcy9sYXBpcy5qcGdcIik7XHJcbiAgICB0aGlzLm10bDEuYXR0YWNoVGV4dHVyZSh0aGlzLnRleDEsIDApO1xyXG4gICAgdGhpcy5tdGwxLnVwZGF0ZSgpO1xyXG5cclxuICAgIGxldCBmY3ViZSA9IG5ldyBGaWd1cmUoKTtcclxuICAgIGZjdWJlLnNldEN1YmUoKTtcclxuICAgIHRoaXMuY3ViZSA9IGZjdWJlLm1ha2VQcmltKHRoaXMubXRsKTtcclxuICAgIHRoaXMuY3ViZUZsb29yID0gZmN1YmUubWFrZVByaW0odGhpcy5tdGwxKTtcclxuICAgIHRoaXMubWFwID0gbnVsbDtcclxuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xyXG4gICAgSmltcC5yZWFkKGZpbGVOYW1lLCAoZXJyLCBpbWFnZSkgPT4ge1xyXG4gICAgICB0aGlzLm1hcCA9IGltYWdlLmJpdG1hcC5kYXRhO1xyXG4gICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVuZGVyKHdvcmxkKSB7XHJcbiAgICBpZiAodGhpcy5tYXAgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5ibG9ja3MpIHtcclxuICAgICAgYmxvY2sucmVuZGVyKG1hdDQoMSkpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmltYWdlLmJpdG1hcC5oZWlnaHQ7IHkrKylcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmltYWdlLmJpdG1hcC53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG5cclxuICAgICAgICBpZiAoYy5yID09IDI1NSkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoeCwgaSwgeSkpLm11bCh3b3JsZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYy5iID09IDI1NSkge1xyXG4gICAgICAgICAgdGhpcy5jdWJlRmxvb3IucmVuZGVyKG1hdHJUcmFuc2xhdGUodmVjMyh4LCAwLCB5KSkubXVsKHdvcmxkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBwdXRQaXhlbCh4LCB5LCBjKSB7XHJcbiAgICB0aGlzLmltYWdlLnNldFBpeGVsQ29sb3IoeCwgeSwgYyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1nVG9Db250ZXh0MmQoY2FudmFzLCBjb250ZXh0LCBpbWFnZSkge1xyXG4gIGxldCBmcmFjdyA9IE1hdGguZmxvb3IoY2FudmFzLndpZHRoIC8gaW1hZ2UuYml0bWFwLndpZHRoKTtcclxuICBsZXQgZnJhY2ggPSBNYXRoLmZsb29yKGNhbnZhcy5oZWlnaHQgLyBpbWFnZS5iaXRtYXAuaGVpZ2h0KTtcclxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGltYWdlLmJpdG1hcC5oZWlnaHQ7IHkrKylcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgaW1hZ2UuYml0bWFwLndpZHRoOyB4KyspIHtcclxuICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQShpbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBgcmdiYSgke2Mucn0sICR7Yy5nfSwgJHtjLmJ9LCAxLjApYDtcclxuICAgICAgY29udGV4dC5maWxsUmVjdCh4ICogZnJhY3csIHkgKiBmcmFjaCwgZnJhY3csIGZyYWNoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBGaWd1cmUgfSBmcm9tIFwiLi9wbGF0L3BsYXRcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzXCI7XHJcblxyXG5jb25zdCBob3N0ID0gXCJsb2NhbGhvc3RcIjtcclxuY29uc3QgcG9ydCA9IFwiODAwMFwiO1xyXG5sZXQgdXNlck5hbWU7XHJcbmxldCBwbGF5ZXJzUG9vbCA9IHt9O1xyXG5sZXQgbWFpblJlbmRlcjtcclxubGV0IGF2YXRhcnMgPSB7fTtcclxubGV0IHNoYWRlcnMgPSB7fTtcclxubGV0IG1hdGVyaWFscyA9IHt9O1xyXG5sZXQgcHJpbXMgPSB7fTtcclxubGV0IHdlYlNvY2tldDtcclxubGV0IHRleDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3c0luaXQocmVuZGVyKSB7XHJcbiAgICB1c2VyTmFtZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG5cclxuICAgIG1haW5SZW5kZXIgPSByZW5kZXI7XHJcbiAgICBsZXQgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcclxuICAgIHdlYlNvY2tldCA9IHNvY2tldDtcclxuXHJcbiAgICB0ZXggPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2VtLmpwZ1wiKTtcclxuXHJcbiAgICBzb2NrZXQub25vcGVuID0gZSA9PiBvbkNvbm5lY3Rpb24oc29ja2V0LCBlKTtcclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBlID0+IG9uTWVzc2FnZShzb2NrZXQsIEpTT04ucGFyc2UoZS5kYXRhKSk7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBvbkludGVydmFsKHNvY2tldCksIDEpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb25Db25uZWN0aW9uKHNvY2tldCwgbSkge1xyXG4gICAgY29uc29sZS5sb2coXCJoZWxsbyBmcm9tIGNsaWVudFwiKTtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjb25uZWN0ZWRcIiB9KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uTWVzc2FnZShzb2NrZXQsIG0pIHtcclxuICAgIGlmIChtLnR5cGUgPT0gXCJwbGF5ZXJzXCIpIHtcclxuICAgICAgICBwbGF5ZXJzUG9vbCA9IG0ucGxheWVycztcclxuICAgICAgICBmb3IgKGxldCBwIGluIG0ucGxheWVycykge1xyXG4gICAgICAgICAgICBpZiAoYXZhdGFyc1twXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMTogSGFzaCB5b3VyIGVtYWlsIGFkZHJlc3MgdXNpbmcgU0hBLTI1Ni5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hlZEVtYWlsID0gQ3J5cHRvSlMuU0hBMjU2KG0ucGxheWVyc1twXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVwIDI6IENvbnN0cnVjdCB0aGUgR3JhdmF0YXIgVVJMLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JhdmF0YXJVcmwgPSBgaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8ke2hhc2hlZEVtYWlsfWA7XHJcbiAgICAgICAgICAgICAgICBhdmF0YXJzW3BdID0gbWFpblJlbmRlci5uZXdUZXh0dXJlKGBodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaGVkRW1haWx9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNoYWRlcnNbcF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZXJzW3BdID0gbWFpblJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmltc1twXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNoYWRlcnNbcF0gPSBtYWluUmVuZGVyLm5ld1NoYWRlcihcImRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNbcF0gPSBzaGFkZXJzW3BdLm5ld01hdGVyaWFsKHZlYzMoMC4xKSxcclxuICAgICAgICAgICAgICAgICAgICB2ZWMzKDEsIDAuMSwgMC4xKSxcclxuICAgICAgICAgICAgICAgICAgICB2ZWMzKDAuMyksXHJcbiAgICAgICAgICAgICAgICAgICAgOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgMS4wXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzW3BdLmF0dGFjaFRleHR1cmUodGV4LCAwKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc1twXS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZyA9IG5ldyBGaWd1cmUoKTtcclxuICAgICAgICAgICAgICAgIGZpZy5zZXRDdWJlKCk7XHJcbiAgICAgICAgICAgICAgICBwcmltc1twXSA9IGZpZy5tYWtlUHJpbShtYXRlcmlhbHNbcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0udHlwZSA9PSBcInNoYWRlclwiKSB7XHJcbiAgICAgICAgLyppZiAoc2hhZGVyc1ttLmlkXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2hhZGVyc1ttLmlkXSA9IG1haW5SZW5kZXIubmV3U2hhZGVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICBwcmltc1ttLmlkXS5tdGwuc2hkLnVwZGF0ZShtLnNvdXJjZSwgXCJmcmFnXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25JbnRlcnZhbChzb2NrZXQpIHtcclxuICAgIC8vIFNlbmRpbmcgY29vcmRzIHRvIHRoZSBzZXJ2ZXJcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjb29yZHNcIiwgaWQ6IHVzZXJOYW1lLCBjb29yZHM6IHsgdHJhbnM6IG1haW5SZW5kZXIuY29udHJvbC50cmFuc2Zvcm0sIHBvczogbWFpblJlbmRlci5jb250cm9sLnBvc2l0aW9uIH0gfSkpO1xyXG4gICAgLy8gQXNraW5nIGZvciBnZXR0aW5nIGNvb3JkcyBmcm9tIHNlcnZlclxyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcImdldF9jb29yZHNcIiB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIHsgcGxheWVyczogcGxheWVyc1Bvb2wsIGlkOiB1c2VyTmFtZSwgYXZhdGFyczogYXZhdGFycywgcHJpbXM6IHByaW1zIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZW5kT2JqZWN0KG9iamVjdCkge1xyXG4gICAgb2JqZWN0LmlkID0gdXNlck5hbWU7XHJcbiAgICB3ZWJTb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcclxufSIsImltcG9ydCB7IG1hdDQsIG1hdHJSb3RhdGUsIG1hdHJUcmFuc2xhdGUgfSBmcm9tIFwiLi4vbXRoL21hdDRcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi9tdGgvdmVjM1wiO1xyXG5pbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4vZ2VuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFiaXJpbnQge1xyXG4gICAgY29uc3RydWN0b3IocmVuZGVyLCBmaWxlTmFtZSkge1xyXG4gICAgICAgIHRoaXMucm9vbXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMS5wbmdcIiksXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMi5wbmdcIiksXHJcbiAgICAgICAgICAgIG5ldyBSb29tKHJlbmRlciwgXCIuL2Jpbi9yb29tcy9yb29tMy5wbmdcIilcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMudmVydCA9IFtuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvdmVydC5wbmdcIildO1xyXG4gICAgICAgIHRoaXMuaG9yeiA9IFtuZXcgUm9vbShyZW5kZXIsIFwiLi9iaW4vcm9vbXMvaG9yei5wbmdcIildO1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgSmltcC5yZWFkKGZpbGVOYW1lLCAoZXJyLCBpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gaW1hZ2UuYml0bWFwLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5ICs9IDIpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHggKz0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuciA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzBdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuZyA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzFdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMuYiA9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zWzJdLnJlbmRlcihtYXRyVHJhbnNsYXRlKHZlYzMoMTAgKiB4LCAwLCAxMCAqIHkpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8IHRoaXMuaW1hZ2UuYml0bWFwLmhlaWdodDsgeSArPSAyKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2UuYml0bWFwLndpZHRoOyB4ICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gSmltcC5pbnRUb1JHQkEodGhpcy5pbWFnZS5nZXRQaXhlbENvbG9yKHgsIHkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjLnIgPT0gMjU1ICYmIGMuZyA9PSAyNTUgJiYgYy5iID09IDI1NSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRbMF0ucmVuZGVyKG1hdHJUcmFuc2xhdGUodmVjMygxMCAqIHgsIDAsIDEwICogeSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5pbWFnZS5iaXRtYXAuaGVpZ2h0OyB5ICs9IDIpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgdGhpcy5pbWFnZS5iaXRtYXAud2lkdGg7IHggKz0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBKaW1wLmludFRvUkdCQSh0aGlzLmltYWdlLmdldFBpeGVsQ29sb3IoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuciA9PSAyNTUgJiYgYy5nID09IDI1NSAmJiBjLmIgPT0gMjU1KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9yelswXS5yZW5kZXIobWF0clRyYW5zbGF0ZSh2ZWMzKDEwICogeCwgMCwgMTAgKiB5KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBzZW5kT2JqZWN0IH0gZnJvbSBcIi4vd3NcIjtcclxuXHJcbmxldCB0ZXh0QXJlYTtcclxubGV0IGJ1dHRvbkFwcGx5O1xyXG5sZXQgc2hhZGVyO1xyXG5sZXQgY29kZUFyZWE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhZGVyVXBkYXRlSW5pdChfc2hhZGVyKSB7XHJcbiAgY29kZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZGVBcmVhXCIpO1xyXG4gIHRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0QXJlYVwiKTtcclxuICBidXR0b25BcHBseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwbHlcIik7XHJcbiAgYnV0dG9uQXBwbHkub25jbGljayA9IG9uQXBwbHk7XHJcbiAgc2hhZGVyID0gX3NoYWRlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gb25BcHBseSgpIHtcclxuICBjb25zdCBzb3VyY2UgPSB0ZXh0QXJlYS52YWx1ZTtcclxuICBzaGFkZXIudXBkYXRlKHNvdXJjZSwgXCJmcmFnXCIpO1xyXG4gIHNlbmRPYmplY3QoeyB0eXBlOiBcInNoYWRlclwiLCBzb3VyY2U6IHRleHRBcmVhLnZhbHVlIH0pO1xyXG59XHJcblxyXG5gI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuXHJcbm91dCB2ZWM0IE91dENvbG9yO1xyXG5cclxuaW4gdmVjMyBEcmF3UG9zO1xyXG5pbiB2ZWMzIERyYXdOb3JtYWw7XHJcbmluIHZlYzIgRHJhd1RleENvb3JkO1xyXG5cclxudW5pZm9ybSBzYW1wbGVyMkQgdVRleDtcclxuXHJcbnVuaWZvcm0gdV9tYXRlcmlhbCB7XHJcbiAgICB2ZWM0IEthNDtcclxuICAgIHZlYzQgS2RUcmFucztcclxuICAgIHZlYzQgS3NQaDtcclxuICAgIHZlYzQgVGV4RmxhZ3M7XHJcbn07XHJcblxyXG4jZGVmaW5lIEthIEthNC54eXpcclxuI2RlZmluZSBLZCBLZFRyYW5zLnh5elxyXG4jZGVmaW5lIFRyYW5zIEtkVHJhbnMud1xyXG4jZGVmaW5lIEtzIEtzUGgueHl6XHJcbiNkZWZpbmUgUGggS3NQaC53XHJcblxyXG51bmlmb3JtIGZsb2F0IFRpbWU7XHJcblxyXG52ZWMyIENtcGxNdWxDbXBsKCB2ZWMyIEEsIHZlYzIgQiApXHJcbntcclxuICByZXR1cm4gdmVjMihBLnggKiBCLnggLSBBLnkgKiBCLnksIEEueCAqIEIueSArIEEueSAqIEIueCk7XHJcbn1cclxuXHJcbnZvaWQgbWFpbih2b2lkKSB7XHJcbiAgICBpbnQgbiA9IDA7ICBcclxuICAgIHZlYzIgWiwgWjA7XHJcblxyXG4gICAgWiA9IChEcmF3VGV4Q29vcmQgLSAwLjUpICogMi4wO1xyXG4gICAgWjAgPSBaO1xyXG5cclxuICAgIHdoaWxlIChuIDwgMjU1ICYmIGRvdChaLCBaKSA8IDQuMClcclxuICAgIHtcclxuICAgICAgWiA9IENtcGxNdWxDbXBsKFosIFopOyBcclxuICAgICAgWiA9IFogKyBaMDtcclxuICAgICAgbisrO1xyXG4gICAgfVxyXG4gICAgdmVjMyBjb2xvciA9IHZlYzModmVjMyh2ZWMzKGZsb2F0KG4pIC8gMjUwLjAsIGZsb2F0KG4pIC8gMjMwLjAsIGZsb2F0KG4pIC8gMjQwLjApKSk7XHJcbiAgICBcclxuICAgIHZlYzMgTCA9IC1ub3JtYWxpemUodmVjMygwLjVmLCAwLjdmLCAwLjNmKSk7XHJcbiAgICB2ZWMzIE4gPSBub3JtYWxpemUoRHJhd05vcm1hbCk7XHJcbiAgICB2ZWMyIHQgPSBEcmF3VGV4Q29vcmQ7XHJcblxyXG4gICAgTiA9IGZhY2Vmb3J3YXJkKE4sIG5vcm1hbGl6ZShEcmF3UG9zKSwgTik7XHJcblxyXG4gICAgZmxvYXQgayA9IGRvdChMLCBub3JtYWxpemUoTikpO1xyXG5cclxuICAgIHZlYzMgUiwgViA9IHZlYzMoMCwgMCwgLTEpO1xyXG5cclxuICAgIFIgPSByZWZsZWN0KFYsIE4pO1xyXG4gICAgY29sb3IgKz0gS3MgKiBtYXgoMC4wMWYsIHBvdyhkb3QoUiwgTCksIFBoKSk7XHJcblxyXG4gICAgLy9PdXRDb2xvciA9IHZlYzQoS2EsIDEuMGYpO1xyXG4gICAgT3V0Q29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xyXG4gICAgLy9pZihUZXhGbGFncy54ICE9IDAuMGYpXHJcbiAgICAvLyAgICBPdXRDb2xvciA9IHZlYzQodGV4dHVyZSh1VGV4LCBnbF9GcmFnQ29vcmQueHkgLyB2ZWMyKDQwMC4wZiwgNDAwLjBmKSkucmdiLCAxLjBmKTtcclxuICAgIC8vT3V0Q29sb3IgPSB2ZWM0KE4sIDEuMCk7XHJcbn1gIiwiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4vcm5kL3JuZC5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgbWF0NCwgbWF0clJvdGF0ZSwgbWF0clRyYW5zbGF0ZSwgbWF0clNjYWxlIH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIjtcclxuaW1wb3J0IHsgRmlndXJlIH0gZnJvbSBcIi4vcGxhdC9wbGF0LmpzXCI7XHJcbmltcG9ydCB7IFJvb20sIGltZ1RvQ29udGV4dDJkIH0gZnJvbSBcIi4vZ2VuL2dlbi5qc1wiO1xyXG5pbXBvcnQgeyBDb250cm9sIH0gZnJvbSBcIi4vY3RybC9jdHJsLmpzXCI7XHJcbmltcG9ydCB7IHdzSW5pdCwgb25JbnRlcnZhbCwgZ2V0UGxheWVycyB9IGZyb20gXCIuL3dzLmpzXCI7XHJcbmltcG9ydCB7IExhYmlyaW50IH0gZnJvbSBcIi4vZ2VuL2xhYi5qc1wiO1xyXG5pbXBvcnQgeyBzaGFkZXJVcGRhdGVJbml0IH0gZnJvbSBcIi4vc2hkX3VwZC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBsZXQgZmlndXJlID0gbmV3IEZpZ3VyZSgpO1xyXG4gIGZpZ3VyZS5zZXREb2RlY2FoZWRyb24oKTtcclxuXHJcbiAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZyYW1lXCIpO1xyXG4gIGxldCByZW5kZXIgPSBuZXcgUmVuZGVyKGNhbnZhcyk7XHJcbiAgd3NJbml0KHJlbmRlcik7XHJcbiAgbGV0IHNoYWRlciA9IHJlbmRlci5uZXdTaGFkZXIoXCJkZWZhdWx0XCIpO1xyXG4gIC8vc2hhZGVyLnVwZGF0ZShzcmMsIFwiZnJhZ1wiKTtcclxuICBzaGFkZXJVcGRhdGVJbml0KHNoYWRlcik7XHJcbiAgLypsZXQgbWF0ZXJpYWwgPSBzaGFkZXIubmV3TWF0ZXJpYWwoXHJcbiAgICB2ZWMzKDAuMSksXHJcbiAgICB2ZWMzKDAsIDAuNSwgMS4wKSxcclxuICAgIHZlYzMoMC4zKSxcclxuICAgIDkwLFxyXG4gICAgMS4wXHJcbiAgKTsqL1xyXG4gIC8qXHJcbiAgbGV0IG1hdGVyaWFsMSA9IHNoYWRlci5uZXdNYXRlcmlhbChcclxuICAgIHZlYzMoMC4xKSxcclxuICAgIHZlYzMoMSwgMC41LCAxLjApLFxyXG4gICAgdmVjMygwLjMpLFxyXG4gICAgOTAsXHJcbiAgICAwLjVcclxuICApO1xyXG4gIGxldCBwcmltID0gZmlndXJlLm1ha2VQcmltKG1hdGVyaWFsKTtcclxuICBtYXRlcmlhbDEuYXR0YWNoVGV4dHVyZSh0ZXgsIDApO1xyXG4gIG1hdGVyaWFsMS51cGRhdGUoKTtcclxuICAqL1xyXG4gIGxldCB0ZXggPSByZW5kZXIubmV3VGV4dHVyZShcIi4vYmluL3RleHR1cmVzL2VtLmpwZ1wiKTtcclxuICByZW5kZXIuc2V0Q2FtKHZlYzMoNSwgNSwgNSksIHZlYzMoMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIGxldCBsYWIgPSBuZXcgTGFiaXJpbnQocmVuZGVyLCBcIi4vYmluL2xhYnMvZGVmLnBuZ1wiKTtcclxuICBsZXQgcGxfbXRsID0gc2hhZGVyLm5ld01hdGVyaWFsKFxyXG4gICAgdmVjMygwLjEpLFxyXG4gICAgdmVjMygxLCAwLjEsIDAuMSksXHJcbiAgICB2ZWMzKDAuMyksXHJcbiAgICA5MCxcclxuICAgIDEuMFxyXG4gICk7XHJcbiAgcGxfbXRsLmF0dGFjaFRleHR1cmUodGV4LCAwKTtcclxuICBwbF9tdGwudXBkYXRlKCk7XHJcbiAgbGV0IGYgPSBuZXcgRmlndXJlKCk7XHJcbiAgZi5zZXRDdWJlKCk7XHJcbiAgbGV0IHBsX3ByID0gZi5tYWtlUHJpbShwbF9tdGwpO1xyXG5cclxuICAvKlxyXG4gICAgbGV0IGNhbnZhc0Zsb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb3dGcmFtZVwiKTtcclxuICBsZXQgY29udGV4dEZsb3cgPSBjYW52YXNGbG93LmdldENvbnRleHQoXCIyZFwiKTtcclxuICBjYW52YXNGbG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgaWYgKGxhYi5pbWFnZSAhPSBudWxsKSB7XHJcbiAgICAgIGxldCBmcmFjdyA9IE1hdGguZmxvb3IoY29udGV4dEZsb3cud2lkdGggLyBsYWIuaW1hZ2UuYml0bWFwLndpZHRoKTtcclxuICAgICAgbGV0IGZyYWNoID0gTWF0aC5mbG9vcihjb250ZXh0Rmxvdy5oZWlnaHQgLyBsYWIuaW1hZ2UuYml0bWFwLmhlaWdodCk7XHJcblxyXG4gICAgICBsYWIuaW1hZ2Uuc2V0UGl4ZWxDb2xvcihcIiNGRkZGRkZcIiwgZS5vZmZzZXRYIC8gZnJhY3csIGUub2Zmc2V0WSAvIGZyYWNoKTtcclxuICAgICAgaW1nVG9Db250ZXh0MmQoY2FudmFzRmxvdywgY29udGV4dEZsb3csIGxhYi5pbWFnZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgKi9cclxuXHJcbiAgY2FudmFzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiI3RleHRBcmVhXCIpLnNsaWRlVXAoKTtcclxuICAgICQoJyNhcHBseScpLnNsaWRlVXAoKTtcclxuICAgICQoJyNtYWluRnJhbWUnKS5jc3MoeyAnd2lkdGgnOiAnMTAwdncnIH0pO1xyXG4gICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gIH07XHJcblxyXG4gIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgZSA9PiB7XHJcbiAgLy8gICBpZiAoZS5idXR0b24gPT0gMSkge1xyXG4gIC8vICAgICAkKFwiI3RleHRBcmVhXCIpLnNsaWRlRG93bigpO1xyXG4gIC8vICAgICAkKCcjYXBwbHknKS5zbGlkZURvd24oKTtcclxuICAvLyAgICAgJCgnI21haW5GcmFtZScpLmNzcyh7ICd3aWR0aCc6ICc4MHZ3JyB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9KTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XHJcbiAgICBpZiAoZS5jb2RlID09ICdUYWInKSB7XHJcbiAgICAgICQoXCIjdGV4dEFyZWFcIikuc2xpZGVEb3duKCk7XHJcbiAgICAgICQoJyNhcHBseScpLnNsaWRlRG93bigpO1xyXG4gICAgICAkKCcjbWFpbkZyYW1lJykuY3NzKHsgJ3dpZHRoJzogJzgwdncnIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIC8qJCgnaHRtbCcpLm9uKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5jb2RlID09ICdLZXlaJykge1xyXG4gICAgICAkKFwiI3RleHRBcmVhXCIpLnNsaWRlRG93bigpO1xyXG4gICAgICAkKCcjYXBwbHknKS5zbGlkZURvd24oKTtcclxuICAgICAgJCgnI21haW5GcmFtZScpLmNzcyh7ICd3aWR0aCc6ICc4MHZ3JyB9KTtcclxuICAgICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gICAgfVxyXG4gIH0pOyovXHJcblxyXG4gIC8vbGV0IHNreSA9IHJlbmRlci5uZXdTa3lTcGhlcmUoXCIuL2Jpbi90ZXh0dXJlcy9zcGFjZS5wbmdcIik7XHJcbiAgLy9sZXQgc2t5ID0gcmVuZGVyLm5ld1NreVNwaGVyZShcIi4vYmluL3RleHR1cmVzL3dhdGVyLmpwZ1wiKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIGxldCBwID0gZ2V0UGxheWVycygpO1xyXG5cclxuICAgIHJlbmRlci5yZW5kZXJTdGFydCgpO1xyXG4gICAgZm9yIChsZXQgcGxheWVyIGluIHAucGxheWVycykge1xyXG4gICAgICBpZiAocC5pZCAhPSBwbGF5ZXIpIHtcclxuICAgICAgICBwLnByaW1zW3BsYXllcl0ubXRsLmF0dGFjaFRleHR1cmUocC5hdmF0YXJzW3BsYXllcl0sIDApO1xyXG4gICAgICAgIHAucHJpbXNbcGxheWVyXS5yZW5kZXIobWF0NChwLnBsYXllcnNbcGxheWVyXS5jb29yZHMudHJhbnMpLm11bChcclxuICAgICAgICAgIG1hdHJUcmFuc2xhdGUocC5wbGF5ZXJzW3BsYXllcl0uY29vcmRzLnBvcylcclxuICAgICAgICApKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHBsX3ByLm10bC5zaGQgPSBwLnNoYWRlcnNbcGxheWVyXTtcclxuICAgICAgICBwbF9wci5tdGwuYXR0YWNoVGV4dHVyZShwLmF2YXRhcnNbcGxheWVyXSwgMCk7XHJcbiAgICAgICAgcGxfcHIucmVuZGVyKFxyXG4gICAgICAgICAgbWF0NChwLnBsYXllcnNbcGxheWVyXS5jb29yZHMudHJhbnMpLm11bChcclxuICAgICAgICAgICAgbWF0clRyYW5zbGF0ZShwLnBsYXllcnNbcGxheWVyXS5jb29yZHMucG9zKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7Ki9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcHJpbS5yZW5kZXIoXHJcbiAgICAvLyAgbWF0clJvdGF0ZShyZW5kZXIudGltZXIubG9jYWxUaW1lLCB2ZWMzKDAsIDEsIDEpKS5tdWwoXHJcbiAgICAvLyAgICBtYXRyVHJhbnNsYXRlKHZlYzMoMCwgMCwgMCkpXHJcbiAgICAvLyAgKVxyXG4gICAgLy8pO1xyXG4gICAgbGFiLnJlbmRlcigpO1xyXG4gICAgcmVuZGVyLnJlbmRlckVuZCgpO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICB9O1xyXG4gIGRyYXcoKTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IG1haW47XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxNQUFNLEtBQUssQ0FBQztJQUNaLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLEtBQUs7QUFDTDtJQUNBLElBQUksSUFBSSxHQUFHO0lBQ1gsUUFBUSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsS0FBSztBQUNMO0lBQ0EsSUFBSSxHQUFHLEdBQUc7SUFDVixRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekMsS0FBSztBQUNMO0lBQ0EsSUFBSSxJQUFJLEdBQUc7SUFDWCxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3QjtJQUNBLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNwQixZQUFZLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCO0lBQ0EsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLFlBQVksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsUUFB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LEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzdGLEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRTtJQUNqQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUM7SUFDVixLQUFLO0FBQ0w7SUFDQSxJQUFJLGNBQWMsR0FBRztJQUNyQixRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FB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QUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLO0FBQ0w7SUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDWCxRQUFRLE9BQU8sSUFBSTtJQUNuQixZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckgsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySCxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILEtBQUs7QUFDTDtJQUNBLElBQUksU0FBUyxHQUFHO0lBQ2hCLFFBQVEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLEtBQUs7SUFDTCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLElBQUk7SUFDcEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdEIsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQ3RCLEVBQUU7SUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUztJQUNwQyxRQUFRLE9BQU8sSUFBSSxLQUFLO0lBQ3hCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVE7SUFDOUIsUUFBUSxPQUFPLElBQUksS0FBSztJQUN4QixZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELFNBQVMsQ0FBQztJQUNWLElBQUksT0FBTyxJQUFJLEtBQUs7SUFDcEIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLEtBQUssQ0FBQztJQUNOLENBQUM7QUFDRDtJQUNPLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDeEMsSUFDTyxJQUNDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRztBQUN4QjtJQUNBLElBQUksT0FBTyxJQUFJO0lBQ2YsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQztJQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN2QyxRQUFRLENBQUM7SUFDVCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQixLQUFLLENBQUM7SUFDTixDQUFDO0FBQ0Q7SUFDTyxTQUFTLGFBQWEsQ0FBQyxDQUFDLEVBQUU7SUFDakMsSUFBSSxPQUFPLElBQUk7SUFDZixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMs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QUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsUUFBUSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELEtBQUs7QUFDTDtJQUNBO0lBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDMUMsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkQsS0FBSztJQUNMLENBQUM7QUFDRDtJQUNPLE1BQU0sSUFBSSxDQUFDO0lBQ2xCLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQ3BDLFFBQVEsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEM7SUFDQSxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDdEMsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN2QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzVCLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJO0lBQ2hDLFlBQVksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDL0I7SUFDQSxRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEM7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFO0lBQ2hDLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFlBQVksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxTQUFTO0FBQ1Q7SUFDQSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM1RCxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsUUFBUSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3hEO0lBQ0EsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUc7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQ3JELFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUYsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RixZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RCxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxD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QUFPLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDN0MsYUFBYTtJQUNiLFNBQVMsQ0FBQztBQUNWO0lBQ0EsUUFBUSxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLO0lBQzFDLFlBQVksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLFlBQVksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLFlBQVksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xHO0lBQ0EsWUFBWSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEcsWUFBWSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEc7SUFDQSxVQUFTO0lBQ1QsS0FBSztJQUNMLElBQUksUUFBUSxHQUFHO0lBQ2YsUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQy9FLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDOUY7SUFDQTtJQUNBO0lBQ0E7SUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUNqQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsQztJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ2pDLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbEgsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNuQyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ2xILFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDbkMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3RKLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDbkMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3RKLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDeEMsWUFBWSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMvRyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBRTNCO0lBQ1QsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEYsS0FBSztJQUNMOztJQ2xGQTtJQUNBO0lBQ08sTUFBTSxNQUFNLENBQUM7SUFDcEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCO0lBQ0EsSUFBSSxVQUFVLEdBQUc7SUFDakIsUUFBZ0IsSUFBSSxDQUFDLENBQUMsRUFBRTtJQUN4QixRQUFRLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDbkQ7SUFDQTtJQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNO0lBQ3JDLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQztJQUNBLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMzQztJQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkcsS0FBSztBQUNMO0lBQ0EsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDeEIsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzlCLEtBQUs7QUFDTDtJQUNBLElBQUksY0FBYyxHQUFHO0lBQ3JCLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSTtJQUN4QixZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxTQUFTLENBQUM7SUFDVixRQUFRLElBQUksRUFBRSxHQUFHLElBQUk7SUFDckIsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEM7SUFDQSxRQUFRLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMvRSxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMs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QUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxTQUFTLENBQUM7SUFDVixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUc7SUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsU0FBUyxDQUFDO0lBQ1YsS0FBSztBQUNMO0lBQ0EsSUFBSSxj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LENBQUMsQ0FBQztJQUNuRCxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFDM0U7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxZQUFZLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUM1QyxZQUFZLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRTtJQUNBLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixTQUFTO0FBQ1Q7SUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxZQUFZLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuRCxZQUFZLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUU7SUFDQSxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMs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SUFDSCxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7SUFDaEIsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLE9BQU87SUFDakMsSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDbkMsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEtBQUs7SUFDTCxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQ3JELE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN4RCxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0Q7SUFDQSxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7SUFDeEIsVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsV0FBVztJQUNYLFNBQVMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO0lBQy9CLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFD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
