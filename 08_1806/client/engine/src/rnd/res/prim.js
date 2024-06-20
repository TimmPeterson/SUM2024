import { vec3 } from "../../mth/vec3.js"
import { vec2 } from "../../mth/vec2.js"
import { mat4 } from "../../mth/mat4.js"

class _vertex {
    constructor(pos, norm, tex) {
        this.pos = pos;
        this.norm = norm;
        this.tex = tex;
    }
}

export function vertex(pos, norm, tex) {
    if (tex == undefined)
        return new _vertex(pos, norm, vec2(0));
    return new _vertex(pos, norm, tex);
}

export function autoNormals(vertexes, indicies) {
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

export class Prim {
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
                let verts = [];

                for (let t = 1; t < 4; t++) {
                    let v = vertex(vtx[parseInt(toks[t].split('/')[0]) - 1]);
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