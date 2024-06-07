import { Render } from "../rnd.js"
import { vec3 } from "../../mth/vec3.js"
import { mat4 } from "../../mth/mat4.js"

class _vertex {
    constructor(pos, norm) {
        this.pos = pos;
        this.norm = norm;
    }
}

export function vertex(pos, norm) {
    return new _vertex(pos, norm);
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

        rnd.gl.bindVertexArray(this.vertexArrayId);
        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
        rnd.gl.drawElements(rnd.gl.TRIANGLES, this.numOfElements, rnd.gl.UNSIGNED_INT, 0);
    }
}
