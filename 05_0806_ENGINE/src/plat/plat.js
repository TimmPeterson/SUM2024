import { Prim, vertex } from "../rnd/res/prim.js";
import { vec3 } from "../mth/vec3.js";
import { vec2 } from "../mth/vec2.js";

export class Figure {
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
        let sqrt3 = Math.sqrt(3.0), sqrt2 = Math.sqrt(2.0);

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
        let d = Math.sqrt(1 - Math.pow(2 * Math.sin(0.1 * Math.PI) * r, 2))

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
                ]
            this.vertexes.push(tri1);
        }
        for (let i = 0; i < 5; i++) {
            let tri2 =
                [
                    layer2[i],
                    layer1[i],
                    layer1[(i + 1) % 5]
                ]
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
            ]
            let surface2 = [
                edge2[i],
                layer2[i],
                layer1[i],
                layer2[(i + 4) % 5],
                edge2[(i + 4) % 5]
            ]
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